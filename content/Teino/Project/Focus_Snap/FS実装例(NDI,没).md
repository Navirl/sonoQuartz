# 実装（OBS → NDI ストリーム受信を前提にリライト）

前提条件（今回の仕様）

- 目的：**スナップショット（1回目の録画から作ったノーツ）と画面全体一致のみ**で判定（最終一致のみ評価）
    
- 比較：**ahash（average hash）** を最初に実装（ユーザーは後で比較方法を選択・組合せ可能）
    
- サンプリング：**10fps に間引き**して比較（元は 60fps）
    
- フレーム供給元：**OBS が NDI 出力（同一PCまたは LAN）**を出す → アプリ側で NDI を受信して比較処理
    
- フレームワーク：フロントは **Wails**、バックエンドは **Go**（将来マルチOS対応を想定）
    

以下、設計・実装手順（実務でそのまま使えるレベルの具体策）を示します。重要な外部参照は本文末に注記します。

---

# 要点サマリ（1行で）

OBS で NDI 出力を行い、Go 側で NDI SDK（もしくは Go ラッパー）を使ってフレームを受信 → 10fps にサンプリング → 低解像度化 → ahash を作成 → Hamming 距離で閾値判定 → 最終一致が確認できたら「ノーツ消化（Perfect/Great 等は不要）」という流れ。

（NDI はローカル LAN 向けで低遅延かつメタデータ併搬が得意。帯域目安等は NDI ドキュメント参照を推奨します。）([NDI](https://ndi.video/for-developers/ndi-sdk/download/?utm_source=chatgpt.com "NDI SDK – Download and Integrate in Your Software Today"))

---

# 具体的実装（ステップ別）

## 1) OBS 側：NDI 出力設定

- OBS に NDI 出力（Tools → NDI Output／Main Output）を有効化して、ストリーム名を付与。プレビュー出力を使うか Program 出力を使うか選択。これでローカルに NDI ソースが公開されます。([streamlabs.com](https://streamlabs.com/content-hub/post/create-ndi-stream-output-with-obs-studio?srsltid=AfmBOooPxuZt4cQdlqnsV25LhE0AoQyKMcpHNfH0gkp-Qqmq0JRuWTec&utm_source=chatgpt.com "Create NDI Stream Output with OBS Studio"))
    
- **運用メモ**：NDI の検出は mDNS を使うが、サブネットやファイアウォールの制限がある環境は Discovery Service の導入を検討（サブネット越えの問題）。([docs.ndi.video](https://docs.ndi.video/all/using-ndi/utilities/discovery-service?utm_source=chatgpt.com "Discovery Service"))
    

## 2) 受信方法選択（アプリ側）

選択肢（実装候補）：

- A. Go の NDI ラッパー（例：gondi など）を使う（簡単）([Go Packages](https://pkg.go.dev/github.com/benitogf/gondi?utm_source=chatgpt.com "gondi - NDI Library wrapper for golang"))
    
- B. 公式 NDI SDK を動的にロードして使う（柔軟／最新機能が取りやすい）([docs.ndi.video](https://docs.ndi.video/all/developing-with-ndi/sdk/dynamic-loading-of-ndi-libraries?utm_source=chatgpt.com "Dynamic Loading of NDI Libraries"))
    

> 開発時は「gondi で素早く動作確認 → 必要なら NDI SDK を直接（動的ロード）」が現実的です。

## 3) NDI フレーム受信パイプライン（Go 側概略）

1. NDI 受信ソースを列挙・接続（発見・選択UIを Wails 側で提供）
    
2. 受信フレームを **デコード／RGBA バッファ**で取得（NDI SDK が提供）
    
3. フレームは受信スレッドでキューに入れる（リングバッファ、固定長）
    
4. 別ワーカーがキューからフレームをポップし、**10fps に間引き**（例：受信が 30/60fps → 3/6 枚に間引き）
    
5. 間引かれたフレームを低解像度化（例：32×32 グレースケール）→ ahash を計算（Go の imagehash 実装などを利用）。([Go Packages](https://pkg.go.dev/github.com/devedge/imagehash?utm_source=chatgpt.com "imagehash package - github.com/devedge ..."))
    
6. スナップショットノーツ（あらかじめ作成しておく ahash 値列）と比較（Hamming 距離 ≤ 閾値なら「一致」）
    
7. 「一致」が確認されたノーツは消化扱い。ユーザーにリアルタイムでスコア／進捗を返す（Wails 経由で UI 更新）。
    

### サンプリングの実装ポイント

- 間引き方式：**単純 decimation**（n フレームに 1 枚）で OK（10fps を目指すなら `skip = floor(input_fps / 10)`）。
    
- より安定させたい場合は「時間ベースでのサンプリング」(`if now - last_sample_time >= 100ms then sample`) を推奨（入力fps が不安定でも 10fps 規定を守れる）。
    

### スレッド設計（推奨）

- NDI 受信スレッド（low-latency） → ローカルリングバッファ
    
- サンプル/比較ワーカー（CPU負荷の高い hash 演算を担当、複数 goroutine で回せる）
    
- UI 更新スレッド（Wails 経由でメインスレッドに結果送出）
    

## 4) ahash 判定パラメータ（初期値案）

- 低解像度化サイズ：32×32 → AHASH の安定性が良い
    
- Hamming 閾値（一致とみなす）：**例： <= 8 （画像 hash が 64 ビットなら）** — 実環境でチューニング必須。
    
- ユーザー設定にして調整可能にする（UI で閾値スライダを用意）。
    

## 5) ノーツ管理（スナップショット列）

- 1回目録画から抽出したノーツ（各ノーツ：タイムスタンプ、ahash 値、メタ情報）を JSON などで保存。
    
- 2回目実行中はノーツ列を先頭から順に処理し、「一致したら次のノーツへ」ルール（最終一致のみ要件）。
    
- 「最終一致のみ」とするため、各ノーツは**最終一致まで消えない**（途中一致で消さない）。ただし、時間切れ（ユーザーが遷移した／長時間一致しない）で Miss 判定を入れて次へ進める仕様も要る。
    

## 6) 遅延・同期対策

- NDI は低遅延だが **ネットワーク負荷や Windows の更新・ドライバの影響**で stuttering が出る場合がある（実運用では Receive Mode 等の設定変更が必要になるケースがある）。（参考：NDI/OBS の互換問題や Receive Mode の変更が推奨される事例あり）([PC Gamer](https://www.pcgamer.com/software/windows/a-recent-windows-11-update-broke-a-popular-streaming-method-on-obs-but-a-temporary-fix-is-now-here/?utm_source=chatgpt.com "A recent Windows 11 update broke a popular streaming method on OBS but a temporary fix is now here"))
    
- アプリ側で **フレーム到着からのタイムスタンプ管理** を行い、サンプルが古すぎたり飛び飛びの場合は補正（skip/補正）ロジックを入れる。
    
- NDI の帯域目安を考慮して、同一 LAN ではギガビット推奨（1080p60 は ~150Mbps/stream の目安）。複数ストリームの想定があるならネットワーク容量を確認。([docs.ndi.video](https://docs.ndi.video/all/getting-started/white-paper/bandwidth?utm_source=chatgpt.com "Bandwidth"))
    

## 7) ユーザー側設定・拡張設計

- 比較方法を選べる UI（ahash / phash / difference / low-res pixel）を用意。最初は ahash のみ実装。
    
- サンプリングレート（5/10/15fps）と閾値を UI で選べるようにする。
    
- 受信モード（直接 NDI SDK / NDI over TCP/UDP / Discovery の切替）を設定可能にする（高度ユーザー向け）。([docs.ndi.video](https://docs.ndi.video/all/developing-with-ndi/sdk/dynamic-loading-of-ndi-libraries?utm_source=chatgpt.com "Dynamic Loading of NDI Libraries"))
    

---

# 実装スニペット（概念的・Go pseudocode）

```go
// イメージは概念実装。実際は gondi / NDI SDK の API に合わせて
func receiveLoop(ndiReceiver *gondi.Receiver, frameQueue chan ImageFrame) {
  for {
    frame := ndiReceiver.ReadFrame()
    frameQueue <- frame // non-blocking with select or ring buffer
  }
}

func samplerWorker(frameQueue chan ImageFrame, sampleQueue chan ImageFrame) {
  ticker := time.NewTicker(time.Duration(100) * time.Millisecond) // 10fps
  var lastFrame ImageFrame
  for {
    select {
    case f := <-frameQueue:
      lastFrame = f
    case <-ticker.C:
      if lastFrame != nil {
         sampleQueue <- lastFrame
      }
    }
  }
}

func compareWorker(sampleQueue chan ImageFrame, notes []Note) {
  for frame := range sampleQueue {
    small := resizeTo32x32Gray(frame.Image)
    h := ahash(small) // use imagehash lib
    if notes[current].Match(h, threshold) {
      notes[current].Matched = true
      // 最終一致のみ評価なので、ここで完了扱いにする
      current++
    }
  }
}
```

- ahash 実装は既存パッケージ（例：`github.com/devedge/imagehash` や他の Go 実装）を使うと早いです。([Go Packages](https://pkg.go.dev/github.com/devedge/imagehash?utm_source=chatgpt.com "imagehash package - github.com/devedge ..."))
    

---

# 実運用上の注意・落とし穴（必ずテストする点）

1. **NDI 検出の不安定さ**：mDNS に依存する環境では発見されないケースがある → Discovery Service や固定アドレス方式の検討を。([docs.ndi.video](https://docs.ndi.video/all/using-ndi/utilities/discovery-service?utm_source=chatgpt.com "Discovery Service"))
    
2. **帯域と CPU**：NDI による高解像度多数ストリームはネットワークを圧迫する。単一ストリームでも 1080p60 で 100〜150Mbps を想定。([docs.ndi.video](https://docs.ndi.video/all/getting-started/white-paper/bandwidth?utm_source=chatgpt.com "Bandwidth"))
    
3. **Windows 環境アップデートの影響**：OS 更新で NDI/OBS の組合せに不具合が出る報告あり。Receive Mode の切替（RUDP/TCP/UDP）で回避できることがある。([PC Gamer](https://www.pcgamer.com/software/windows/a-recent-windows-11-update-broke-a-popular-streaming-method-on-obs-but-a-temporary-fix-is-now-here/?utm_source=chatgpt.com "A recent Windows 11 update broke a popular streaming method on OBS but a temporary fix is now here"))
    
4. **ハッシュ閾値のチューニング**：ahash の閾値は画面構成・縮小方法で大きく変わる。実機で多数ケースを試して最適閾値を決めること。([PyImageSearch](https://pyimagesearch.com/2017/11/27/image-hashing-opencv-python/?utm_source=chatgpt.com "Image hashing with OpenCV and Python"))
    

---

# 推奨開発フロー（段階的）

1. **プロトタイプ**：OBS を NDI 出力に設定。Go で gondi 等の wrapper を使い、受信 → 10fps 抽出 → ahash 比較で「一致/不一致」をコンソール表示。([Go Packages](https://pkg.go.dev/github.com/benitogf/gondi?utm_source=chatgpt.com "gondi - NDI Library wrapper for golang"))
    
2. **UI 統合**：Wails 上に受信ソース選択・閾値調整 UI・進捗表示を実装。
    
3. **安定化**：リングバッファ／バックプレッシャ制御／NDI Receive Mode テスト（TCP/UDP/RUDP）を実機で評価。([PC Gamer](https://www.pcgamer.com/software/windows/a-recent-windows-11-update-broke-a-popular-streaming-method-on-obs-but-a-temporary-fix-is-now-here/?utm_source=chatgpt.com "A recent Windows 11 update broke a popular streaming method on OBS but a temporary fix is now here"))
    
4. **性能改善**：ahash 計算を goroutine プールにして CPU を並列利用。必要なら GPU を使った縮小（外部ライブラリ）を検討。
    
5. **多OS対応**：gondi がサポートしない Windows 部分は公式 NDI SDK を動的ロードして対応、または各 OS 用の実装（動的ローダブル）を段階的に追加。([docs.ndi.video](https://docs.ndi.video/all/developing-with-ndi/sdk/dynamic-loading-of-ndi-libraries?utm_source=chatgpt.com "Dynamic Loading of NDI Libraries"))
    

---

# 参考（主要ソース）

- NDI SDK（ダウンロード／開発者ページ） — NDI（NewTek）. ([NDI](https://ndi.video/for-developers/ndi-sdk/download/?utm_source=chatgpt.com "NDI SDK – Download and Integrate in Your Software Today"))
    
- OBS で NDI 出力を作る手順（OBS/Streamlabs 解説）. ([streamlabs.com](https://streamlabs.com/content-hub/post/create-ndi-stream-output-with-obs-studio?srsltid=AfmBOooPxuZt4cQdlqnsV25LhE0AoQyKMcpHNfH0gkp-Qqmq0JRuWTec&utm_source=chatgpt.com "Create NDI Stream Output with OBS Studio"))
    
- Go 用 NDI ラッパー（gondi 等） — Go ラッパー例（Linux/macOS 対応）. ([Go Packages](https://pkg.go.dev/github.com/benitogf/gondi?utm_source=chatgpt.com "gondi - NDI Library wrapper for golang"))
    
- NDI 白書（帯域・ネットワーク設計） — NDI White Paper. ([NDI](https://ndi.video/wp-content/uploads/2023/09/NDI-5.6-White-Paper-2023.pdf?utm_source=chatgpt.com "NDI 5.6 White Paper"))
    
- NDI ライブラリの動的読み込みに関するガイド（公式ドキュメント）. ([docs.ndi.video](https://docs.ndi.video/all/developing-with-ndi/sdk/dynamic-loading-of-ndi-libraries?utm_source=chatgpt.com "Dynamic Loading of NDI Libraries"))
    
- Go 用 imagehash 実装（ahash 等） — `github.com/devedge/imagehash` 等. ([Go Packages](https://pkg.go.dev/github.com/devedge/imagehash?utm_source=chatgpt.com "imagehash package - github.com/devedge ..."))
    
- 画像ハッシュ（概念・実装の参考） — PyImageSearch / imagehash リポジトリ. ([PyImageSearch](https://pyimagesearch.com/2017/11/27/image-hashing-opencv-python/?utm_source=chatgpt.com "Image hashing with OpenCV and Python"))
    


いいですね。「過剰な部分は後回し／低優先度にする」という方針で、設計を整理しましょう。以下のように、**実装フロー（リライト）**＋**優先度付きタスクリスト**を出しておきます。

---

## 実装リライト：最低限動作する版

前提を踏まえたうえで、シンプルかつ拡張可能な構成にします。

### 実装概要（簡潔版）

1. **ノーツ列生成（初回録画取り込み）**  
     - OBS 等で通常動画 (例: mp4) を録画  
     - アプリに動画を読み込ませ、10fps（または元 fps）でフレーム抽出  
     - 各フレームを低解像度化 → ahash を算出 → ノーツ列（時系列の ahash 列）を保存
    
2. **OBS 側設定（チャレンジ時）**  
     - OBS で NDI 出力を有効  
     - 出力フレームレートを 10fps に設定（可能なら）  
     - 出力ストリーム名／ソース名を明示的に設定
    
3. **受信・比較パイプライン（Go 側）**  
     - NDI 受信ライブラリ（Go ラッパー or NDI SDK 動的ロード）を使ってストリームを受信  
     - 受信されたフレーム（10fps 出力前提） → 低解像度化 → ahash 計算  
     - ノーツ列の最後ノーツを比較対象とし、一致したら「成功」と判断  
     - UI に途中経過（現在ノーツ未達か／検出成功時点）を反映
    
4. **UI / フロントエンド（Wails）**  
     - ストリーム受信元選択画面  
     - ノーツ進捗表示（例：何枚目ノーツか、成功／未成功表示）  
     - 比較方式・ahash 閾値設定（後で拡張）
    
5. **最低限の安定化処理**  
     - 受信フレーム遅延・古いフレームスキップ処理  
     - フレーム取得／比較ループのバックプレッシャ制御  
     - 異常発生時のフェイルセーフ（受信切断再試行、UI 表示）
    
6. **拡張余地（後回し可能）**  
     - Discovery 切り替え機能（mDNS ⇔ Discovery Server）  
     - 他の比較方式（pHash, 差分比較, グレースケール差分など）  
     - フレーム補間・補正（受信フレーム飛び補正）  
     - 複数ストリーム対応 / ソース切替  
     - スコア／リプレイ機能／履歴保存機能
    

---

この設計なら、まずは「録画を取り込んでノーツ作成 → OBS→NDI 出力 → 受信 → ahash 比較 → 合致確認」までを動かすことができます。

---

## タスク一覧（優先度付き）

以下、**必要最低限タスク**（このアプリが動くために必須）と、**拡張／将来機能タスク**に分けて書きます。優先度は「高／中／低」で付与しています。

### 必須タスク（高優先度）

|タスク名|説明|優先度|
|---|---|---|
|動画読み込み・フレーム抽出|mp4 等の録画ファイルを開き、フレーム列を抽出（10fps 等）できる機能|高|
|ノーツ列生成（ahash）|抽出フレームを低解像度化 → ahash を算出 → ノーツ列（順序付きリスト）に格納|高|
|OBS NDI 出力設定|OBS 側で NDI 出力を有効化・設定する手順のドキュメント化 &検証|高|
|NDI 受信機能|Go 側で NDI ストリームを受信可能にする（Go ラッパー／SDK 組込）|高|
|フレーム → ahash 比較ループ|受信されたフレームを比較対象ノーツと比較し、一致を検出するロジック|高|
|UI：受信元選択、進捗表示|Wails 側に受信ソースを選ぶ画面、ノーツ進捗表示画面を作成|高|
|バックプレッシャ／異常処理|フレームドロップ、遅延、切断時の例外処理を入れる|高|
|低解像度変換ユーティリティ|RGB→グレースケール変換、リサイズ機能|高|

### 拡張／将来機能（中〜低優先度）

|タスク名|説明|優先度|
|---|---|---|
|比較方式の選択肢追加|ahash 以外（pHash、dHash、構造比較、差分比較など）をオプション化|中|
|ahash 閾値調整 UI|ユーザーが閾値をスライダー等でチューニングできるように|中|
|フレーム補正・補間|フレームが飛んだときの補間処理や補正アルゴリズム（前後補正など）|中|
|複数ストリーム対応|複数 NDI ストリーム入力に対応、切替／同時比較可能に|中|
|スコアリング・リアルタイム表示強化|ノーツ成功率、遅延測定、グレード評価（Perfect/Great 等）を UI 表示|中|
|リプレイ／履歴保存機能|受信したフレーム／一致データを保存して再生閲覧できるように|中|
|Discovery 切替 UI|mDNS モード／Discovery Server モード切替オプションを隠し UI で実装|低|
|Discovery Server 接続機能|将来的に Discovery サーバを使えるように設定可能にする実装|低|
|多 OS 対応キャプチャ実装|将来 macOS / Linux で NDI 受信やキャプチャ機能を加える|中〜低|
|最適化（並列化、GPU 利用等）|ahash 計算や変換部分を高速化、並列化、ハードウェア支援化|中|
|フレーム形式変換最適化|フレームフォーマット（色空間・圧縮）最適化・変換最小化|中|

---

もしよければ、このタスク一覧を元に **マイルストーン形式（バージョン 0.1、0.2、1.0 段階）** を設計することもできます。それで順番を意識しながら進めやすくなると思いますが、やりますか？
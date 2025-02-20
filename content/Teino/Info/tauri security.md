---
date: 2024-12-30
tags:
  - Info
---

up:: [Tauri](<../Bar/Framework/Tauri.md>)


[アプリ開発者のにとっての Tauri v2 のセキュリティ構造を読み解く Tauri - Qiita](https://qiita.com/takavfx/items/314a4a79afc38cb4e174)

## トラスト境界
**トラスト境界**という物が存在する。
プログラムデータや実行が「信頼」のレベルを変更する境界、
または異なる機能を持つ2つのプリンシパルが
データまたはコマンドを変換する境界のこと。

2つのプリンシパルとはフロントエンドやバックエンドのそれぞれのプロセス。
通信をこの境界で監査するため、Application CoreからSystem Webviewに入り、バックエンドで悪意のあるコードを実行！
みたいなことが出来なくなる。

あくまで境界の話であり、
境界内、例えばバックエンド内に悪意を仕込まれると通る。

これを考えると、境界で監査するために
たいていの操作を境界に通すという操作が浮かんでくる。


実際に境界をコントロールする権限は以下4つ。
- Permissions（権限）
- Command Scope(コマンドスコープ)
- Capabilities（能力）
- Runtime Authority（ランタイム支配権）

これらの設定はTauriで作業する限り強制される。
逆に言うとこれを設定しとけばある程度のセキュリティを確保できる。

### Permissions（権限）
フロントエンドで呼び出すコマンドに対するアクセス権。
フロントエンドから仕事するなら。

プラグインやTauriが提供し、
ユーザーが提示されたPermissionを選んでアプリに設定する。

AndroidのPermissionとほぼ同じっぽい。

実質はTOMLで定義する。tauri.conf.jsonのCapabilityセクションにも書ける？
プラグインの場合は/permissionsに配置する。
名前は適当なID。

特殊な名前としてdefaultがある。
これはtauriコマンドを通してプラグインをインストールした時、/capabilities（アプリケーションのコンフィグ）に配置される。

### Command Scopes（コマンドスコープ）
Permissionの粒度小さめ版。
特定のアクションを通したり通さなかったりする。

実質はcapabilitiesのpermissionsの中に置く？
pluginの場合はそれごとの/permissions以下に置かれるtoml。

allowとdenyの設定。deny優先。

### Capabilities（能力）
WebViewのアクセス権限調整。

フロントエンドはWebViewを通して動く。
Capabilitiesを通してPermissionを設定するという関係らしい。

実質はTOML。jsonも使える。
`src-tauri/capabilities`で管理。

最初は`default.json`を配置する。
設定した`Capability`は`tauri.conf.json`で参照する。
直接`tauri.conf.json`に入れることもできる。プラットフォームで分ける必要が出なければ。

その他、Capabilitiesでは**APIへのアクセス権限設定**が出来る。というかやらないと動かないっぽい。

### Runtime Authority（ランタイム支配権）
Permissions, Capabilities, Scopesをランタイム時に扱うシステム。
アプリやプラグインでTauriを使うならあまり使わない。調査用。

## トラスト境界以外
### Content Security Policy(CSP)
クロスサイトスクリプティング（XSS）やデータインジェクションといった攻撃を軽減するセキュリティレイヤー。
問題になりがちな部分の機能を制限できる。

[意外と奥深いContent Security Policy（CSP） Apache - Qiita](https://qiita.com/buttakyou/items/d797d8fe932191a316bb#デフォルトポリシー)

**tauri.conf.jsonで設定しないと有効化されない。**

### HTTP Headers
ブラウザとウェブサイトの通信を制御する。
CSPも定義的にはここに入るが、Tauriでは別設定。

[HTTPセキュリティヘッダーでWEBサイトの安全性を高める方法｜サイバーセキュリティ.com](https://cybersecurity-jp.com/column/102306)

これもtauri.conf.json。

## 設定外のセキュリティ
### Application Lifecycle Threats（アプリケーションライフサイクルの脅威）

脅威はライフサイクルごとに入り込みやすい。
ライフサイクルは大きく分けて以下5つ。

- Upstream（上流工程）
- Development（開発）
- Building（ビルド）
- Distribution（配布）
- Runtime（ランタイム）

#### Upstream（上流工程）
- アプリは最新に
    - Tauriを使うと、Tauriライブラリもリリースしていることになる
    - rustcやnodejsも最新に
- 依存関係を評価
    - npmやcrate.ioのパッケージの責任は使用者
    - メンテ無しや期限切れは危険レベルUP
    - auditで調べる

#### Development（開発）
- 開発サーバーに注意
    - TauriのWebviewに対するフロントエンドフレームワークは自由、どういった開発環境に置いて動いているかは注意
    - 開発サーバーとの通信は暗号化されているはずだが、そうでない可能性
    - サーバーに悪意が無くてもライブラリが悪用する可能性
    - Tauriは現時点（2024/12/30）相互認証とトランスポート暗号化をサポートしていない。信頼できないネットワークでは使用しない。
- 堅牢な開発マシンの使用
    - 管理者アカウントは使用しない
    - 開発マシンでプロダクションの機密は扱わない
    - VCSに秘密情報を混ぜない
    - セキュリティハードウェアトークン等使用し、侵害されたシステムの影響は軽減する
    - システムは最新
    - アプリはメンテされてるものだけ入れる
- ソース管理の認証と承認を確実に
    - 人が多いほど利用はセキュアに

#### Building（ビルド）
- CI/CDは信頼できるものを
- バイナリサインはプラットフォームごとに
    - どこから流出したのかを調べる効果に期待、コストかかるが
- 悪意あるリリースへの署名は、暗号秘密情報が使われてしまう
    - ハードウェアトークンに入ってれば署名キーの漏洩はできない、が悪意あるリリースに使われる可能性はある
- ビルド環境を再現可能に
    - 別環境のビルドとアセットを一致比較
    - Rustもフロントエンドもあまり再現可能な出力ではないとか
    - 現状はビルドシステムを信頼するしかない

#### distribution（配布）
- マニフェストサーバー、ビルドサーバー、もしくはバイナリホスティングサーバーの制御を心掛ける

#### Runtime（ランタイム）
- Webviewはそもそも基本安全でない
    - だからTauriはデフォルトで制限を掛けている
    - その一環がCSPとかCapabilities
    - なので活用すること

## 協調開示
セキュリティインシデントを見つけたら、公に出さない。
Github Vulnerability Disclosureを使用するか、開発者に直メール。
TauriのSecurityの欄にある。

## 補足
tauri.conf.json -> capabilities -> permissions -> scope

この順でセキュリティを掘ると分かりやすい。
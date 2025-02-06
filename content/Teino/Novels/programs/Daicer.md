---
tags:
  - Info
---

daily:: [2024-08-09](/Daily_Note/2024-08-09.md)
up:: [Idea](../../Bar/Idea.md)

[Tauri](../../Bar/Framework/Tauri.md)

リアルタイム動画
Riveエディタ

すぐに編集できる画面(LiveEditor)
画像生成ゾーン、そこに素材を入れると全て画風を合わせて画像を生成する
画像ならキャプションを付けておけばいい感じに生成する

背景の上、Mistolineを使用し線画を入力
ASCii Photo

背景を文脈から推測し出力
背景をちょっとした指定から出力
指定する単語に事前準備（他の単語セットを呼ぶトリガーワード、もしくはトリガーに近い単語ならそのベクトル加算）

素材保存場所みたいなのが欲しい（ImageVault）


- LiveEditor
    - 画像生成のメインタブ
        - Itemを配置し、雑コラを作る
            - Itemを読むクラス
        - 最後に画像生成を掛けることで、一つの絵にする
            - 画像生成を掛けるクラス
                - ComfyUIへのアクセスを持つクラス
            - 一つの絵を保存するクラス
- ImageVault
    - 既にできた画像を置いておく
        - フォルダーを開くクラス
    - AdobeのBinみたいなシステム付き
        - フォルダーを別にまとめるクラス
    - 平置きシステム付き
        - 纏めるクラス+平置きクラス
- Search
    - 画像を検索する（キャプション、ファイル名）
        - 検索クラス（フォルダ纏めクラス、タグクラスへのアクセス）
    - 独自タグづけシステム付き
        - タグクラス

- Item
    - ImageVaultにある全て
    - ItemをImageVaultからLiveEditorに移すことで画面を作成する

- ComfyUI

- 全ての操作についてUndo、Redoを付けたいので、これらを纏める親クラスが必要

[Drawing 2024-08-12 22.16.39.excalidraw](../../Excalidraw/Drawing%202024-08-12%2022.16.39.excalidraw.md)

[Daicer 技術選定](Daicer%20技術選定.md)

[Daicer LiveEditor](Daicer%20LiveEditor.md)

[Daicer ImageVault](Daicer%20ImageVault.md)

疑似コード
```tsx
<DndContext>
<SplitGrid

<Droppable>
LiveEditor
</Droppable>

Vault
結果を入れとくState=openFolderDialog()
<Draggable>
<Image>map(結果を入れとくState)</Image>
</Draggable>

/>
</DndContext>
```

[Daicer Search](Daicer%20Search.md)

[Daicer Item](Daicer%20Item.md)

[Drawing 2024-08-17 14.27.45.excalidraw](../../Excalidraw/Drawing%202024-08-17%2014.27.45.excalidraw.md)


こまけえこと考えるのはリリースしてから
最初はNext.jsでもSupabaseでもbolt.newでも使って小さく作る



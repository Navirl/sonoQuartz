機械の背景、夕景、キャラクタ
機械背景、キャラクタ前景
機械背景はループとブラー、キャラクタ前景は髪揺らし
ある点で機械背景途切れ、夕景背景に入れ替え
夕景背景は少しずつカメラ下ろし、キャラクタ前景は髪揺らしはそのまま夕景に合わせ影動かし

機械背景
ループ画像と、ループ途切れ部分持ち画像（上下）
OutPaintで伸ばすだけ

夕景背景

カメラ下ろし
デプスと合わせてVertical視差を作る
[GitHub - akatz-ai/ComfyUI-Depthflow-Nodes: An implementation of Depthflow in ComfyUI](https://github.com/akatz-ai/ComfyUI-Depthflow-Nodes)
太陽の光
出てきた瞬間IC-Light
ただこれリアル調っぽい……もう少し情報を集めよう
[GitHub - kijai/ComfyUI-IC-Light: Using IC-LIght models in ComfyUI](https://github.com/kijai/ComfyUI-IC-Light)

やっぱりというか、環境光しか出せない。

仮にIC無しで光を作る場合
hunyuanで動画
始点、中間、終了Fをdepanyv2でdepth取って、2値化で切り合成
再度動画化


キャラクタ前景
落ちながら髪を揺らすだけ
framepackで可能不可能を見る


model
- sudachixl
    - [すだち XL (イラストリアス) - v1 | イラストリアスチェックポイント | Civitai](https://civitai.com/models/1288125?modelVersionId=1453425)
- obsession
    - [Obsession (Illustrious-XL) - v-pred_v1.1 | Illustrious Checkpoint | Civitai](https://civitai.com/models/820208/obsession-illustrious-xl)


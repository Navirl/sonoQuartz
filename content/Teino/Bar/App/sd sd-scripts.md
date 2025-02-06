---
tags:
 - Bar
 - App
---

daily:: [2023-05-10](Daily_Note/2023-05-10.md)
up:: [sd LoRA 学習](../../Info/sd%20LoRA%20学習.md)
up:: [Stable Diffusion](../Stable%20Diffusion.md)

[GitHub - kohya-ss/sd-scripts](https://github.com/kohya-ss/sd-scripts/tree/main)

追加学習を行うためのpythonスクリプト集合。
venvで切り分けてあるので安心。

これで指定できる追加学習法はfine tuning、DreamBooth、LoRA、Textual Inversionの四つ。他がやりたいならLyCORISを拡張機能的に導入する。
[GitHub - KohakuBlueleaf/LyCORIS: Lora beYond Conventional methods, Other Rank adaptation Implementations for Stable diffusion.](https://github.com/KohakuBlueleaf/LyCORIS)

それぞれがどういうものなのかのザックリ解説はここで。
ファインチューニングだけないが、まああれ別のモデル作るための機能だし。
[【AIイラスト】8つの追加学習の方法と違い紹介【キャラ似せ/人工知能】 | しぐにゃもブログ](https://signyamo.blog/ai_add_learning/)

Howtoはこれ。
[sd-scripts/train\_README-ja.md at main · kohya-ss/sd-scripts · GitHub](https://github.com/kohya-ss/sd-scripts/blob/main/docs/train_README-ja.md)

## Fine-tuning
新しくモデル作る人向け機能。

## DreamBooth
VRAM24GBくらい、メモリ20GBくらい使ってゴリゴリ学習する。
画像8枚もあれば精度高く学習できるので、マシンが許すならおすすめ。
Colabも検討。

[正規化画像不要！たった数枚の画像でDreamBoothのキャラ学習。ローカル(Windows)で実行する方法 | 経済的生活日誌](https://economylife.net/dreambooth-windows-local/)

### LoRA
いつもの。実はLow-Rankの略語。
民生化されすぎて[webuiで動かせる拡張機能](stable-diffusion-webui#sd-webui-train-tools)が出たので、それを使ってしまうのもいいかも。

[【保存版】Kohya版LoRAインストール＆設定、WebUIでの使用法まで解説 キャラ学習手順備忘録 | 経済的生活日誌](https://economylife.net/kohya-lora-install-use/)
[LoRAを使った学習のやり方まとめ！好きな絵柄・キャラクターのイラストを生成しよう【Stable Diffusion】 | くろくまそふと](https://kurokumasoft.com/2023/02/24/stable-diffusion-lora/)


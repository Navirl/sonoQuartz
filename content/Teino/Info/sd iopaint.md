---
tags:
  - Info
---

daily:: [2024-06-04](/Daily_Note/2024-06-04.md)
up:: [sd](../Bar/Stable%20Diffusion.md)

所謂ローカル消しゴムマジック。pythonとgitで動く。
昔の名称はLamaCleaner。というか、IOPaintの一部の機能がLamaCleanerという名称らしい。

[GitHub - Sanster/IOPaint: Image inpainting tool powered by SOTA AI Model. Remove any unwanted object, defect, people from your pictures or erase and replace(powered by stable diffusion) any thing on your pictures.](https://github.com/Sanster/IOPaint)
[SdWebUiTutorial/\_/doc/LamaCleaner/LamaCleaner.md at main · Zuntan03/SdWebUiTutorial · GitHub](https://github.com/Zuntan03/SdWebUiTutorial/blob/main/_/doc/LamaCleaner/LamaCleaner.md)
[邪魔な部分を簡単除去 - Lama Cleaner｜るぺったん](https://note.com/rupettan/n/n15f957e81591)

LamaCleaner機能だけならSDから呼べる拡張機能がある。

### Erase
- Lama
  基本。早い。Large Maskの略。
- MAT
  フォトリアリスティック。Mask-Aware Transformer。
- MIGAN
  小さく高速。
- LDM
  詳細で調整可能。遅く重い。Latent Diffusion Models。
- ZITS
  全体的なバランスが取れる。CPUだと遅い。
- FcF
  テクスチャ構造としてヨシ。512x512のみ。
- Manga
  高精細な漫画用。
### Diffusion
- PowerPaint
  マスクしたとこにテキストのものを生み出せる。形でも生み出せる。消去やoutpaintingも可能。
- Any-Text
  テキストをその場に合った表現で表示できる。
- InstructPix2Pix
  画像構成を保ったままスタイルを適用できる。紙の色変えなど。
- Paint by Example
  雑じゃないコラージュ。
- Kandinsky

### Plugin
- Interactive Segmentation
  ワンクリックで対象を選択してマスクにする。
- GFPGA
  顔特化高解像度化。
- RealESRGAN
  高解像度化。アニメ対応もあり。
- Remove Background
  背景削除。
- RestoreFormer
  顔復元。
- Anime Segmentation
  キャラ用背景削除。透明度もちゃんと切り抜いてくれる。おすすめ。
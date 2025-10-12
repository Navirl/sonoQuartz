---
date: 2024-05-31
tags:
  - Info
---

up:: [Stable Diffusion](<./Stable Diffusion.md>)
up:: [sdwebui](<../Bar/GUI/stable-diffusion-webui.md>)
up:: [ComfyUI](<../Bar/GUI/ComfyUI.md>)

sdwebuiとcomfyuiで情報の保存場所が違う。
sdwebuiはpng:parametersを使うが、comfyuiはpng:promptとpng:workflowを使う。

comfyuiのprompt-reader-nodeでwebp保存すると、EXIF:UserCommentに入る。
この位置はcomfyuiがwebpでワークフローを入れる場所と同じなので、webpの場合はa1111とcomfyuiを選ばなければならない。

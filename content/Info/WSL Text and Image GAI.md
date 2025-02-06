---
tags:
 - Info
---

daily:: [2023-05-08](/Daily_Note/2023-05-08.md)
up:: [WSL](../Bar/App/WSL.md)
up:: [GAI](<../Bar/AI/AI_local.md>)
up:: [AIl local textchatbot](<./AIl local textchatbot.md>)
up:: [sdwebui docker](<./sdwebui docker.md>)
up:: [stable-diffusion-webui](../Bar/App/stable-diffusion-webui.md)
up:: [text-generation-webui](../Bar/App/text-generation-webui.md)


windowsで動かすのが一番早いが、別々に環境あるとめんどいなと思って。

- AUTOMATIC1111
    - python
        - 3.10.6
    - pytorch
        - 2.0.0+cu118
    - torchvision
        - 0.15.1+cu118

- Oobabooga
    - python
        - 3.10.9
    - pytorch
        - 2.0.0
        - ただしGPTQモデルはCuda118を要求する
    - torchvision
        - 0.15.0



pytorchのバージョンは`import torch`と`print(torch.__version__)`で出る。
torchvisionも同様に。

[PyTorchのバージョンを確認 （version） | 日々、学ぶ](https://take-tech-engineer.com/pytorch-version/)

めんどいと思ってたけど、メモリの関係で結局Linuxに移行した。
---
date: 2024-03-12
tags:
  - Info
---

up:: [Python](<../Bar/Program/Python.md>)


[GitHub - pyenv/pyenv: Simple Python version management](https://github.com/pyenv/pyenv)

pythonのバージョン管理ツール。

scoopから入れると` error installing "core" component MSI.`みたいなエラーが出るので、`scoop install pyenv@2.64.11 && scoop hold pyenv`で2.x系を入れるといい。
マニフェストは3.x系と変わらない模様。
2024/10/28では大丈夫。

[[Bug]: Pyenv broken? · Issue #4143 · ScoopInstaller/Main · GitHub](https://github.com/ScoopInstaller/Main/issues/4143)

pipが無い場合は`python -m ensurepip --upgrade`で入れるかget-pip.pyを使う。
[Installation - pip documentation v23.1.2](https://pip.pypa.io/en/stable/installation/)


…だったのだがそれだとうまくpython3.10.6がインストールできない。
なので手動でインストールして手動でパスを通した。あとで困るけどしゃあなし。
公式手順に従うとPYTHONが通らず[sdwebui](<../Bar/App/stable-diffusion-webui.md>)で詰む。webui-userに直接exeを書き込んで設定。

ソースからビルドしているらしい。
その為最適化オプションがついてなく遅い。[mise](<../Bar/Tools/mise.md>)だと最適化済みpythonを落とす。

[pyenvを初心者に薦めるのはもうやめよう - methaneのブログ](https://methane.hatenablog.jp/entry/2024/05/26/pyenvを初心者に薦めるのはもうやめよう)
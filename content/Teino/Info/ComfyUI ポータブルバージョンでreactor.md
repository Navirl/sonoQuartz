---
date: 2024-07-27
tags:
  - Info
---

up:: [ComfyUI](<../Bar/GUI/ComfyUI.md>)

[ログイン | クラウドソーシング「ランサーズ」](https://www.lancers.jp/project_board/86514?ref=finish)
ランサーズでやったやつ。

[Error: expected string or bytes-like object, got 'NoneType'. While installing. · Issue 86 · Gourieff/comfyui-reactor-node · GitHub](https://github.com/Gourieff/comfyui-reactor-node/issues/86)
[cuda not found?  · Issue 331 · Gourieff/comfyui-reactor-node · GitHub](https://github.com/Gourieff/comfyui-reactor-node/issues/331)
[Having an error with insightface · Issue 344 · Gourieff/comfyui-reactor-node · GitHub](https://github.com/Gourieff/comfyui-reactor-node/issues/344)

---

再発防止と書きましたが、よく考えたら防止は無理なので正しくは再発対処策になります。
（どのライブラリがconflictするかの予測は不可能なためです）
ですので**今実行する必要はありません。**

## 対処
結論から申し上げますと、対処は二つになります。

1. ComfyUI関係でpipコマンドを使う場合、全て`F:\ComfyUI_windows_portable_nvidia\ComfyUI_windows_portable\python_embed\python.exe -m pip`に変更する
2. ComfyUI → ComfyUI-Manager → comfyui-reactor-node → insightface の順でライブラリをinstallする

これ以降は理由です。お時間がある時にお読みください。

## 理由
1. は現在そちらのPCに**pythonが二つある**ためです。（正常な動作です）
通常のpythonと、`F:\ComfyUI_windows_portable_nvidia\ComfyUI_windows_portable\python_embed\python.exe`があります。
そしてそれぞれにpipというコマンドがついています。
ComfyUIが使用しているのは後者のpython及びpipであるため、前者の方にライブラリがinstallされてもComfyUIからは使えません。
そのため、**どちらを使用するかを明確にする**ことでライブラリ問題を解決します。
F~が長いと感じる場合、ComfyUI_windows_portableフォルダから右クリック→ターミナルを起動 を選択し、`.\python_embed\python.exe -m pip`としても同じ意味になります。（.は現在のフォルダという意味です）

2. はinstallにスキップ処理があるためです。
ComfyUIの自動ライブラリinstallは、初回起動時とComfyUI-Managerからのinstall時に行われます。
この際、既にinstallされているライブラリはスキップされます。
しかし、ライブラリによってはinstallされていても、**バージョンが違うために使用できない**といったことが起きます。

この問題は、大きなライブラリを先にinstallし、それから小さなライブラリをinstallしていくことで抑えることが出来ます。（小さなライブラリは、大きなライブラリのことを考えて大体用意されているためです）
そのため、ComfyUI → ComfyUI-Manager → comfyui-reactor-node → insightfaceの順が一番良いです。

ちなみに、参考までですが今回こちらが行ったのは、問題を起こしていたライブラリ毎の手動再installです。
この順に従ったのに上手くいかなかった、という場合は以下のコマンドを使用すると動くかと思います。
（**非保証**です）
```
.\python_embed\python.exe -m pip uninstall -y onnxruntime scikit-image lazy_loader albumentations albucore pydantic annotated_types matplotlib cycler kiwisolver ultralytics
.\python_embed\python.exe -m pip install onnxruntime scikit-image lazy_loader albumentations albucore pydantic annotated_types matplotlib cycler kiwisolver ultralytics
```
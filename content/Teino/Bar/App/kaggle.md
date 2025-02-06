---
tags:
  - Bar
---

daily:: [2024-10-10](Daily_Note/2024-10-10.md)
up::

分析手法関連プラットフォーム。
Jupyterのコードノートがついており、GPUを週30時間利用可能。つよい。
kaggleで見たコツなので、他のjupyterでも使えるはず。

## ifでシェル処理を分けたい
`get_ipython().system('文字列')`でpython上でシェルを実行できる。
なので以下のようにifを使える。

```python
if update:
    get_ipython().system('git pull')
```

…が、ifで分けた後で`!`コマンドを使用しても問題なく使える模様。

## シェルで定義した変数を使いたい
`$文字列`で読み込める。

## no module einops
torchのモジュールの問題っぽい？
後からインストールしようとするとfastaiと競合し止められるので、最初に以下のコマンドを入力する。
fastaiがtourch<2.4とエラー吐くが一応動く。

```sh
!conda uninstall -y aiohttp
!conda install -y aiohttp conda-forge::glib
!pip uninstall torch torchvision torchaudio -y  
!pip install torch torchvision torchaudio --extra-index-url https://download.pytorch.org/whl/cu121
```

## wgetでDL済みのファイルはDLしない
`wget -nc`。no clobberの略。
clobberは殴り倒すとか打ち負かすとかの俗語。名詞だと所持品とか衣服。
ここでは壊すの意味を持ち、既存のファイルを壊さない的な意味。

(でも`-nc`無しで実行すると.1、.2…とファイルが増えていくので、壊す感じではない)

## 容量制限
永続化される`/kaggle/working`は20GB。
それ以外の場所は60GB程度らしい。
[Can we increase Kaggle Output directory size? | Kaggle](https://www.kaggle.com/discussions/product-feedback/372506)
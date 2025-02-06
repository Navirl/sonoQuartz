---
tags:
  - Bar
---

daily:: [2024-10-10](Daily_Note/2024-10-10.md)
up:: [py](../Bar/Program/Python.md)

python3.4から使えるパス操作。
オブジェクト指向に基づき、os.pathを置き換えることができるらしい。
[Is pathlib a viable replacement for os.path?](https://python-forum.io/thread-7491.html)

`/`でパスを結合できたり、`open()`なしでファイルに書き込み出来たりする。(`path.write_text()`)
画像も`write_bytes()`でいける。


[pathlibが便利すぎてもうos.pathは使えない件 #Python - Qiita](https://qiita.com/nano-sudo/items/59e3bbcd90d103f4c753)

## os書き換え
```
from pathlib import Path

Path('path')
```

でパスオブジェクトを作る。

### os.makedirs
`Path.mkdir(parents=True, exist_ok=True)`。
パスオブジェクトを作成してメソッドを実行。

### os.path.join
`Path.joinpath(a,b)`もしくは`/`演算子。

## Streamingでファイルが1kbくらいしかない

```python
  response_image = requests.get(image_url, stream=True)
  response_image.raise_for_status()  # レスポンスのステータスコードをチェック
  for chunk in response_image.iter_content(chunk_size=8192):
      image_path.write_bytes(chunk)
```

こんな感じの処理にしててなったやつ。
requestsでstreamにしていて、それを愚直にforで回すとforのたびに新たなファイルに書き込まれてしまう。
その場合は`.open()`を使用し、追記モードでファイルを開く。

```python
response_image = requests.get(image_url, stream=True)
response_image.raise_for_status()  # レスポンスのステータスコードをチェック
with image_path.open("wb") as f:  # "wb"モードでファイルを開く
    for chunk in response_image.iter_content(chunk_size=8192):
        f.write(chunk)  # チャンクごとに追記
```
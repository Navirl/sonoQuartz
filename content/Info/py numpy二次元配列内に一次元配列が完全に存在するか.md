---
tags:
 - Info
---

daily:: [2023-06-09](/Daily_Note/2023-06-09.md)
up:: [Python](<../Bar/Program/Python.md>)

## numpy二次元配列内に一次元配列が完全に存在するか
```python
import numpy as np

a = np.array([[1, 2], [3, 4]])
b = np.array([2, 3])

result = np.any(np.apply_along_axis(lambda x: np.array_equal(x, b), 1, a))
print(result)
```

二次元配列を回して一次元配列ごとに判定するコード。

`np.apply_along_axis()`を使用。第二引数`1`に従い、第二次元ごとに第三引数`a`を分割して、第一引数に指定した関数を適用する。
今回指定している関数は`np.array_equal()`。numpy配列が完全に同一かどうかを調べる。これで調べたい奴と比較する。
外側の`np.any`は一個でも`true`があると`true`を返す関数。ちなみに全部trueの時trueを返すのは`np.all`。

注意点として、以下のコードは間違い。
以下の`np.isin`は要素ごとに比較して比較対象と同じタプルを返すので、`b = np.array([2, 3])`でもtrueになってしまう。

```python
import numpy as np

a = np.array([[1, 2], [3, 4]])
b = np.array([3, 4])

result = np.all(np.isin(b, a))
print(result)
```


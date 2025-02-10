---
date: 2023-06-09
tags:
 - Info
---

up:: [Python](<../Bar/Program/Python.md>)

## py 辞書逆検索
```python
mydict = {'george': 16, 'amber': 19}
print(list(mydict.keys())[list(mydict.values()).index(16)])  # Prints george
```

それぞれリスト化するとインデックスは同じであることを利用する。
リスト化した`mydict.values()`から`.index(16)`でインデックスを抜き、リスト化した`mydict.keys()`からそのインデックスの値を取り出す。

```python
for name, age in mydict.items():
    if age == search_age:
        print name
```

小さくて重複無いなら最初のでいいが、大きい辞書なら単純にまとめてforで回す方法が早かったりする。
また、重複する値があってもprint可能。

```python
p = dict(zip(i.values(),i.keys()))
```

被ってないなら逆順辞書を作っておくのも有効。
zipにまとめて放り込むだけ。



[python - Get key by value in dictionary - Stack Overflow](https://stackoverflow.com/questions/8023306/get-key-by-value-in-dictionary/13149770#13149770)
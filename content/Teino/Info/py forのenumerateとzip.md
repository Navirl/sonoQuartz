---
date: 2022-08-02
tags:
 - Info
---

up:: [Python](<../Bar/Program_lang/Python.md>)
source:: [Pythonのfor文によるループ処理（range, enumerate, zipなど） | note.nkmk.me](https://note.nkmk.me/python-for-usage/)

forを回すときに便利な関数。

## enumerate
インデックスを取得できる関数。**インデックスの**開始値も設定可能。
インデックスをfor内でいじるとその数に飛んじゃうので注意。

```python
l = ['Alice', 'Bob', 'Charlie']

for name in l:
    print(name)
# Alice
# Bob
# Charlie

for i, name in enumerate(l):
    print(i, name)
# 0 Alice
# 1 Bob
# 2 Charlie
```

## zip
複数リストを一気に回せる関数。3つ以上でも可能。
要素数が合わない場合は少ない方に合わせて終了する。

```python
names = ['Alice', 'Bob', 'Charlie']
ages = [24, 50, 18]

for name, age in zip(names, ages):
    print(name, age)
# Alice 24
# Bob 50
# Charlie 18
```

長い方に合わせる関数も存在する。

また、単体で使うとタプルでまとめたイテレータになる。

```python
names = ['Alice', 'Bob', 'Charlie']
ages = (24, 50, 18)

z = zip(names, ages)
print(z)
print(type(z))
# <zip object at 0x10b57b888>
# <class 'zip'>
```

source:: [Python, zip関数の使い方: 複数のリストの要素をまとめて取得 | note.nkmk.me](https://note.nkmk.me/python-zip-usage-for/)
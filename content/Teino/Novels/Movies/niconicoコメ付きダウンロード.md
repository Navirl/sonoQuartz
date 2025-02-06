---
tags:
  - Info
---

daily:: [2024-10-11](/Daily_Note/2024-10-11.md)
up:: [Termux](<../../Bar/App/Termux.md>)
up:: [Shellscript](<../../Bar/Program/Shellscript.md>)

nndownloadが第一候補。yt-dlpは大抵役に立たない。
(2024/12/06)pypyだとうまく動かないので、テストするときはcpythonで。

[GitHub - AlexAplin/nndownload: Download and process links from Niconico (nicovideo.jp)](https://github.com/AlexAplin/nndownload)

コメントはjsonで保存される。
DanmakuFactoryでは直接変換できない。

nicojson2xmlをかませる。旧形式のxmlに変換する。
[GitHub - kagekiyo7/nicojson2xml: Convert new comment file (json) to old comment file (xml) of niconico](https://github.com/kagekiyo7/nicojson2xml)

あとはnicoxml2assで直変換するなり、
[GitHub - kumaneru/nicoxml2ass](https://github.com/kumaneru/nicoxml2ass)

nico_xml_to_biliでビリビリ形式にするなり。buggyだが。
[GitHub - aorinngoDo/nico\_xml\_to\_bili: \[⚠Buggy\] Convert niconico (nicovideo.jp) comments xml to bilibili danmaku xml / ニコニコ形式のコメントxmlを、bilibili形式の弾幕xmlに変換します](https://github.com/aorinngoDo/nico_xml_to_bili)

ビリビリにすればdanmaku2assが使えるはず。
[GitHub - m13253/danmaku2ass: Convert comments from Niconico/AcFun/bilibili to ASS format](https://github.com/m13253/danmaku2ass)

なんかbilibiliにすらdanmaku2assが使えないので（2024/10/11）nicoxml2assがよさそう。

できた。[niconicoをコメント付きでダウンロードしてass変換](<../../Bar/App/Termux.md#niconicoをコメント付きでダウンロードしてass変換>)
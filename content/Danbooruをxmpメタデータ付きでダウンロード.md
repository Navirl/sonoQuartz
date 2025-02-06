---
tags:
 - Info
---

daily:: [2022-08-11](Daily_Note/2022-08-11.md)
up:: [Organize\_Image](<../../Teino/Bar/Organize_Image.md>)
source:: [Embedding image tags as actual Windows "tag" metadata · Issue #2258 · Bionus/imgbrd-grabber · GitHub](https://github.com/Bionus/imgbrd-grabber/issues/2258)
source:: [Imgbrd-Grabber - Booru browsing made easy](https://bionus.github.io/imgbrd-grabber/docs/metadata.html)
source:: [Imgbrd-Grabber - Booru browsing made easy](https://bionus.github.io/imgbrd-grabber/docs/filename.html)
source:: [I have difficulties with creating xmp/xml files that contain the tags · Issue #1446 · Bionus/imgbrd-grabber · GitHub](https://github.com/Bionus/imgbrd-grabber/issues/1446)
source:: [Storing tags in IPTC Keywords · Issue #2081 · Bionus/imgbrd-grabber · GitHub](https://github.com/Bionus/imgbrd-grabber/issues/2081)
source:: [exiftool Application Documentation](https://exiftool.org/exiftool_pod.html#Tag-operations)
source:: [XMP Tags](https://exiftool.org/TagNames/XMP.html#dc)

Imgbrd_Grabberを使用。
ExifToolを同じ階層かPATHに入れる。
xmpのタグであるxmp:subjectに、grabberのタグ%all%を入れる。そのままだと全部入ってしまうので、separator=;を入れて分割。
sourceだけはそのままxmp:sourceとするとdcではなくphotoshopのsourceになってしまう（exiftoolの仕様）ので、xmp-dc:sourceとして回避する。
タグ自体のスペースはunderscoreを入れればたぶん埋まる。
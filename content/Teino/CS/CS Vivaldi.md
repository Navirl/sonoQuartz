---
date: 2021-12-14 11:45:28
tags:
 - App/Vivaldi
 - CheatSheet
---

## Scoopからアップデートしたら既定で開かなくなった
レジストリエディタからパスを修正すること。

### 仕組み
既定のアプリはprogidというものを通してアプリを起動している。
これは拡張子ごとに仕込まれており、例えばhtmlなら
`\HKEY_CLASSES_ROOT\.html\OpenWithProgids`
に入っている。このリストに入っているアプリは、設定で既定のアプリを変更しようとしたときに聞かれるアプリと一致する。

ではprogidの設定はどこにあるかというと、たとえばchromeなら
`HKEY_CLASSES_ROOT\ChromeHTML`
に入っている。まんまprogidがディレクトリ名。

progidが呼ばれると、ここの`\shell\open\command`のパスが呼ばれることになる。なので試してないけどここにfirefoxへのパスを張れば、chromeのアイコンでfirefoxを起動できる。

### おまけ
- progidは識別子でしかないので、**中身を好き勝手に変えても動く。**

- httpsで現在選んでいるアプリは、
`HKEY_CURRENT_USER\Software\Microsoft\Windows\Shell\Associations\UrlAssociations\https`。

[ファイル拡張子とプログラムの関連付け - Windows 徹底解説 - Web/DB プログラミング徹底解説](https://www.keicode.com/windows/associate-app-with-file.php)
[PowershellからChromeをデフォルトのブラウザーとして設定できません \| 2021](https://jpn.clearwatergardenclub.org/840542-cant-set-chrome-as-default-ETMEJF)

[Can't Set Vivaldi as Default Browser \| Vivaldi Forum](https://forum.vivaldi.net/topic/68004/can-t-set-vivaldi-as-default-browser/3)
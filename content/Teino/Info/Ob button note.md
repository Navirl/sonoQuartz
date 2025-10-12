---
date: 2023-02-16
tags:
 - Info
---

up:: [Obsidian](<../Bar/GUI/Obsidian.md>)

目的：
	手動でテンプレートが置いてあるフォルダーを指定すること

手段：
	フォルダーをtfolderとし、insertTemplate関数に渡すTFile変数を作る際に、getAbstructFileByPathに渡すstringファイルパスに上手く追加する
	createNoteについた時にはtemplateFile引数の中身が既にtemplateフォルダーの中から選んだ状態なので、もっと前
	buttonTypesのtemplate関数、file変数を渡してるので弄るならここ
		file変数では全部のファイルを変数に突っ込んでからfilterとforeachでテンプレートを探している
		目的：指定フォルダー以下のファイルを変数に突っ込んでから探す
		
参考、Templaterではreadしてparseしてテンプレートの内容を変数に入れ、それをinsertしてる
じゃあそのテンプレートは何処から得てるのかというと、どうもsettingsからフォルダー取ってModalから直接手に入れてるっぽい
buttonだと真似できない

問題、Templateのフォルダーパスはなんて名前
単にFolderだと「createしたファイルのフォルダ」と「Templateが入ってるフォルダ」の区別がつかない。つくっちゃつくけど分かりにくい。
tfolder

template関数の一部
allFilesに全てのファイル
file変数にallFilesをフィルタリングして[0]を入れる
	テンプレートフォルダ/テンプレートファイル.mdと、allFilesの全てのファイルのパスを比較し、一致したらそのファイルを返す
	そして一個目をfileへ

どう見ても力技。しかもこれ、templater使いたいときでもtemplateからマッチング始める。templateとtemplaterに同名ファイルが入ってた場合動かないのが目に見える。
if(args.tfolder){
	folder = args.tfolder
}else if(args.templater){
	folder = templaterのフォルダ
}else{
	folder = templateのフォルダ
}
}
みたいなのがいると思う。&&と||を使って書き直す。

folder = args.tfolder || args.templater && templaterフォルダ || templateフォルダ


templateParentFolder
templatePath
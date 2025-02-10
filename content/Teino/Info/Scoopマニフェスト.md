---
date: 2022-09-14
tags:
 - Info
---

up:: [Scoop](<../Bar/App/Scoop.md>)
source:: [App Manifest Autoupdate · ScoopInstaller/Scoop Wiki](https://github.com/ScoopInstaller/Scoop/wiki/App-Manifest-Autoupdate)
source:: [Scoopを使ったWindows環境構築のススメ - Super!! - Qiita](https://qiita.com/Dooteeen/items/12dc8fb14042888113d0)


## 最小構成
```json
{
    "version": "2.0",
    "url": "http://download.sysinternals.com/files/Ctrl2Cap.zip",

    "##": "ctrl2cap.exeへパスを通す",
    "bin": "ctrl2cap.exe"
}
```

基本的に、versionとurlさえあればインストールは可能。
加えてhashがあれば怒られない。

### version
バージョン。

### url
ダウンロードパス。
当然だが、zipなどの直リンクを張る。バージョン違いでパスが変わる場合は正規表現を使う。

### hash
ハッシュ値。
分からなくても、hashをつけてない状態で実行すれば教えてくれる。

### \#\#
コメント用。

### bin
pathを通し、ターミナルで名前を入力することで起動できる。

## その他

```json
{
    "version": "20230105",
    "description": "Download images from Pixiv and more!",
    "homepage": "https://nandaka.devnull.zone/",
    "license": "BSD-2-Clause",
    "url": "https://github.com/Nandaka/PixivUtil2/archive/refs/tags/v20230105.zip",
    "hash": "f919df9a1c54c6336e0b29bf15d13b9e69af23e9cbb9f3ed467e3406cebd634e",
    "extract_dir": "PixivUtil2-20230105",
    "pre_install": [
        "if (-not (Test-Path \"$persist_dir\")){",
        "   New-Item \"$dir\\config.ini\" | Out-Null",
        "   New-Item \"$dir\\list.txt\" | Out-Null",
        "   }"
    ],
    "persist": [
        "config.ini",
        "list.txt"
    ],
    "bin": "PixivUtil2.py",
    "shortcuts": [
        [
            "PixivUtil2.py",
            "PixivUtil2"
        ]
    ],
    "checkver": {
        "github": "https://github.com/Nandaka/PixivUtil2"
    },
    "autoupdate": {
        "url": "https://github.com/Nandaka/PixivUtil2/archive/refs/tags/v$version.zip",
        "hash": "$url.sha256",
        "extract_dir": "PixivUtil2-$version"
    }
}

```

### description
パッケージの概要。

### homepage
ホームページ。
scoop homeで開くurl。

### license
ライセンス。
文字列でMITとか書いてもいいけど、"identifier"でfreewareとか書いたり、"url"としてライセンスファイルURLに飛ばしてもいい。

### persist
永続ファイルをscoop専用フォルダに移す。
ここだけに書いても意味は無く、pre_installでファイルやフォルダを作る必要がある。

## オートアップデート
```json
{
    "homepage": "https://github.com/koron/vim-kaoriya",
    "description": "Vim + kaoriya build system, without gvim.",

    "version": "8.1.0005.20180520",
    "architecture": {
        "32bit": {
            "url": "https://github.com/koron/vim-kaoriya/releases/download/v8.1.0005-20180520/vim81-kaoriya-win32-8.1.0005-20180520.zip",
            "hash": "afacd6e27304136f5ebae3edddf6e747f410880fa6a986d80be772e03ef56d36",
            "extract_dir": "vim81-kaoriya-win32"
        },
        "64bit": {
            "url": "https://github.com/koron/vim-kaoriya/releases/download/v8.1.0005-20180520/vim81-kaoriya-win64-8.1.0005-20180520.zip",
            "hash": "53e8dd08e2249ce8a54784e16469151a7bf9857ac9acf3a1b341ac4e7da26fb2",
            "extract_dir": "vim81-kaoriya-win64"
        }
    },

    "bin": "vim.exe"
}
```

### architecture
32bit、64bitによって以下の属性を書き分けられる要素。
-   url
-   hash
-   bin
-   shortcuts
-   pre_install
-   post_install
-   installer
-   uninstaller
-   extract_dir

### extract_dir
ディレクトリ指定。
ここで指定したフォルダやファイルを、extract_toで指定したフォルダ以下に展開する。もちろんzipファイル以下にあるフォルダやファイルも問題なく指定できる。

### checkver
GitHub、HTML、JSONに検索をかけ、**version要素に代入するバージョンの取得**を行える。
上手く動いてるかはcheckver.ps1でわかる。

#### GitHub
homepageにgithubへのURLを割り当ててる場合は、そのまま"github"を渡せばいい。
そうでない場合、そのままgithubリポジトリへのurlを{"github"}として渡す。別にリリースページでなくていい。自動的にlatestのタグからバージョンを取得する。

**プレリリース版は使えない。**
また、タグが正規表現外の記号を使ってるとダメらしい。その時はおとなしく

#### HTML

```json
"checkver": {
    "re": "<td nowrap=\"\">(?<v1>[\\d]+.[\\d]+.[\\d]+)+-jp-(?<v2>[\\d]+)</td>",
    "replace": "${v1}.${v2}"
},
```

##### re
regexでも表現可。"url"とセットで渡す。正規表現により、一致する情報を抜き出す。
ヒットした要素には名前を付けられる。()の内部の先頭に?<VAR_NAME>とすることで、その名前がつく。()が一つしかないと自動的にそれがversionになる。
つまりマッチではなくグループの方でバージョンをヒットさせないと処理されない。
[Reguler Expression](<../Bar/Program/Reguler Expression.md>)

##### replace
reで見つけた要素を繋げる。
$によって変数を呼びくっつけよう。

#### JSON
一応。"jp"にJSONPathで指定すればいい。

### autoupdate
checkverで取得したバージョンをもとに、

-   url
-   hash
-   extract_dir
-   notes(バージョン情報の使用不可)

を更新する雛形の定義ができる。

基本的に、urlさえ指定しておけば怒られない。
サイトでhash値が公開されている場合はそれを拾う正規表現を書くことになる。

#### $version
ここでは$versionが.区切りだった場合のみ、前から

- `$majorVersion`
- `$minorVersion`
- `$patchVersion`
- `$buildVersion`

としてそれぞれの数字を使える。

#### architecture
architectureが分かれている場合は、autoupdate内でもarchitecture属性を作る。

#### checkverで指定した変数
autoupdateでも使える。ただし、たとえばclickという変数名なら**matchClick**と、matchがついてUppercaseになるので注意。

#### 実際の更新
checkver.ps1というものを実行すると自動的に更新してくれる。
めんどいならGitHub Actionがあるのでそれを使う。

```json
{
    "version": "2.0",
    "url": "http://download.sysinternals.com/files/Ctrl2Cap.zip",

    "##": "ctrl2cap.exeへパスを通し、スタートメニューにも表示させる",
    "bin": "ctrl2cap.exe",
    "shortcuts": [
        [
            "ctrl2cap.exe",
            "ctrl2cap"
        ]
    ],
    "notes": [
        "NOTE: まだキーの置換は完了していません!!",
        "スタートメニューからctrl2capで検索、管理者権限で実行してください。"
    ]
}
```


### shortcuts
始めに実体ファイル名、次にショートカットの名前を指定した2次元配列で**スタートメニュー**にショートカットを作る。

### notes
ターミナルからつけた時の実行後文章。
1次元配列で、改行したいときに要素を区切る。

### depends
依存関係を記述する。
これだけでscoop上で依存関係をインストールしてくれる。

source:: [Pre Post (un)install scripts · ScoopInstaller/Scoop Wiki · GitHub](https://github.com/ScoopInstaller/Scoop/wiki/Pre-Post-(un)install-scripts)

```JSON
{
    "version": "2.0",
    "url": "http://download.sysinternals.com/files/Ctrl2Cap.zip",

     "##": "自動でcapsをctrlに置き換える(要 管理者権限)",

    "pre_install": {
        "script": "scoop install sudo"
    },
    "installer": {
        "script": [
            "sudo $dir\\ctrl2cap.exe /install",
            "if ($? == $false) {",
            "    Write-Host '===================================' -Foreground Red",
            "    Write-Host 'ctrl2capの実行に失敗しました。' -Foreground Red",
            "    Write-Host 'スタートメニューから再度起動してください。' -Foreground Red",
            "    Write-Host '===================================' -Foreground Red",
            "}"
        ]
    },

    "bin": "ctrl2cap.exe",
    "shortcuts": [
        [
            "ctrl2cap.exe",
            "ctrl2cap"
        ]
    ]
}
```

### script
powershellでの処理を記述できる。文字列として渡し、改行が必要なら要素を区切る。
installerの中で使う。

### pre_install
インストール前に行う処理を記述する。
\[\]で区切り、powershellでの入力を一文ずつ記述する。

### installer
インストーラーとして実行する。

#### $dir
解凍されている圧縮ファイルのディレクトリパス。
scriptで自分についてコマンドを実行したいときなどに。
ほかにも$versionなんてのもあるが、これはどっちかって言うとurlに記述する印象。

### sudo
scoopの要素ではなく、mainバケットのコマンド。powershellの中で管理者権限をスキップできる。
script要素の中で使う。



---
date: 2022-04-28
tags:
  - Bar
  - App
aliases:
  - ps
  - cmd
---

up:: [Programming](<../Program/Programming.md>)


環境変数はターミナル再起動しないと反映されない。

## カレントディレクトリをエクスプローラーで開く
`Invoke-Item .`。`ii .`が一番早い。

## 環境変数
`echo $Env:名前`
Get-Itemと等価。
直接`$Env:名前`でも出るっぽい。

[WindowsのPowerShellで環境変数の確認 #PowerShell - Qiita](https://qiita.com/zabu/items/85b01ec14e697cb2ff35)

全部見る場合は以下。
プロセス。
`Get-ChildItem Env:`
永続。
`[Environment]::GetEnvironmentVariables('User') | Format-Table -AutoSize -Wrap`

ただし`Get-ChildItem Env:`はプロセスの再起動後でないと設定が反映されないことに注意。


### 一時追加
powershellを開いている間しか反映されない。

`$Env:名前 = "パス"`

+=にすると追加できる。
名前変更ならRename-Item。

### 永続
`[Environment]::SetEnvironmentVariable("環境変数の名前", '環境変数の値', 'User')`
システム環境変数に書き込む場合はUserをMachineにする。
その場合は管理者権限が必要。
[PowerShellでWindows環境変数を“一覧確認・作成・変更・削除”する方法](https://zenn.dev/haretokidoki/articles/e2a6c521035d94)

### 余談
powershellは`$PROFILE`のスクリプトを起動時に読んでいる。`.bashrc`みたいな。
権限により置き場所が違うので`$PROFILE | Format-List -Force`で確認。

ここに一時追加のコードを書いておけば、powershellの中でだけ特定の環境変数を扱える。

### パス
表示
一時
`$Env:Path.split(";")`
永続
`[Environment]::GetEnvironmentVariables('User').Path.split(";")`

追加
`$ENV:Path+=";追加したいパス"
`Set-Item Env:Path $Env:Path";追加したいパス"`

永続
```powershell
$new_dir = "パス"

$new_path = [Environment]::GetEnvironmentVariable("Path", "User")
$new_path += ";$new_dir"
[Environment]::SetEnvironmentVariable("Path", $new_path, "User")
```

[Windows10/11でPowerShellからパスを通す (環境変数PATHの変更) #Windows - Qiita](https://qiita.com/zakuroishikuro/items/754e44e4b59580ca451d)

長い場合は`＄PROFILE`に関数を追加する手がある。

```powershell
function add_path {
    param ([string]$new_path)

    $new_path = $new_path -replace '/', '\'

    # フォルダが存在しないなら終了
    if (-not (Test-Path -Path $new_path -PathType Container)) {
        Write-Output  "指定されたパスのフォルダは存在しません: $new_path"
        return
    }

    # 環境変数Pathを取得 (ユーザー)
    $user_path = [Environment]::GetEnvironmentVariable("Path", [EnvironmentVariableTarget]::User)

    # すでに追加済みであれば終了
    if ($user_path -like "*$new_path*") {
        Write-Output  "パスはすでに環境変数に存在します: $new_path"
        return
    }

    # パスを追加
    if (-not $user_path.EndsWith(";")) {
      $user_path += ";"
    }
    $user_path += $new_path
    [Environment]::SetEnvironmentVariable("Path", $user_path, [EnvironmentVariableTarget]::User)

    Write-Output "新しいパスをユーザー環境変数に追加しました: $new_path"
}

function show_path {
  [Environment]::GetEnvironmentVariable("Path", [EnvironmentVariableTarget]::User).Split(";")
}

```


[Windowsの環境変数にパスを追加する関数(PowerShell) #Windows - Qiita](https://qiita.com/zakuroishikuro/items/291d10fb87565e0e0e10)

## アプリにファイルを開かせる
`& "アプリのパス" "対象ファイルのパス"`

## コメント
`#`か`<# #>`。
[PowerShell: コメントの記述方法](https://step-learn.com/article/powershell/001-comment.html)

## Grepと前後表示
`Select-String`が相当。あるいは`sls`。
`-Context 上,下`で前後表示。

[PowerShell/Select-Stringで検索した前後の行を表示する方法 - Windowsと暮らす](https://win.just4fun.biz/?PowerShell/Select-Stringで検索した前後の行を表示する方法)

## コマンドについて調べる
`Get-help`。エイリアスが分かるので便利。
これ自体を調べるとエイリアスは無いと言われるが`help`が通った。

## wget
`Invoke-WebRequest`,`iwr`
`-OutFile`を付けないとファイルとして保存できない。

## ファイルハッシュ
`Get-FileHash`。`-Algorithm md5`でmd5を出せる。
デフォはSHA256。

## コマンドの場所（which）
`Get-Command`。`gcm`
そのままだと見切れるので`| fl`でフォーマットリストにする。

[PowerShellでwhichコマンド #PowerShell - Qiita](https://qiita.com/Hiraku/items/e42bc5756157949a9742)

一応、`(gcm command).path`としてパスを取ることもできる。

`Where-Ovject`というのがあるが、これはオブジェクトコレクションのフィルター用。
[Where-Object - PowerShellコマンドレット虎の巻](https://powershell.command-ref.com/cmdlet-where-object.html)
`where.exe`というので場所を調べることもできるが、これはcmd用。


## Write-HostとWrite-Output
Write-Hostはコンソール表示用。Write-Outputはパイプ用。

## 文字化けする
UTF-8のBOM付きでセーブ。

## foreach
`foreach (a in b){}`で回せるが、パイプ使って`a | ForEach-Object {command $_}`という手もある。

## exe実行
`Invoke-Expression`と`Start-Process`がある。
`Invoke-Expression`は`&`という簡単なエイリアスがある。
`Start-Process`は`-Wait`で同期実行できる。代わりに`-FilePath`を付けてパスを指定しないといけない。引数も`-ArgumentList`が要る。
[【PowerShell】他プロセスの実行方法まとめ - Tumbling Dice](https://outofmem.hatenablog.com/entry/2015/07/12/161527)
[【PowerShell】外部プログラムを実行する方法 #PowerShell - Qiita](https://qiita.com/nkojima/items/2a0d588782530cbf6669)

## powershell実行
`pwsh`。

## プロセス止める
`Stop-Process`。
プロセス自体は`Get-Process`で探せる。
[【Stop-Process】PowerShellでプロセスを強制終了させる方法とは？ | チェシャわら](https://cheshire-wara.com/powershell/ps-cmdlets/system-service/stop-process/)

## Host
powershellエンジンを動かしているインターフェース。
通常のHostはConsoleHost。例えばリモートセッションで使用するホストはServerRemoteHost。

アプリが使用するインターフェースも含むので、LinuxのTerminalより少し広めの概念。

[Felo（フェロー）- 無料のAI検索エンジン](https://felo.ai/ja/search/7DwcjcCMvxvFwWxAC2oNVZ)

## ファイルのフルパスがほしい
`$(Get-Item file).FullName`

## PSScriptTools
便利なPowershellのコマンド詰め合わせ。
`Show-Tree`目当て。

Powershellギャラリーというところからインストールできる。
`Install-Module PSScriptTools`。

消すときは若干面倒。
```powershell
Get-Module PSScriptTools | Remove-Module
Uninstall-Module PSScriptTools -AllVersions
```

[GitHub - jdhitsolutions/PSScriptTools: :wrench: A set of PowerShell functions you might use to enhance your own functions and scripts or to facilitate working in the console. Most should work in both Windows PowerShell and PowerShell 7, even cross-platform. Any operating system limitations should be handled on a per command basis. The Samples folder contains demonstration script files](https://github.com/jdhitsolutions/PSScriptTools)

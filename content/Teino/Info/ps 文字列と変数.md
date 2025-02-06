---
tags:
 - Info
---

daily:: [2023-06-28](/Daily_Note/2023-06-28.md)
up:: [PowerShell\_and\_Command-Line](<../Bar/App/PowerShell_and_Command-Line.md>)

`$()`で囲む。これ自体は文字列内でコマンドを実行するための記法。

```powershell
$videos = Get-ChildItem -Path "$PSScriptRoot\Test" -Filter *.mp4
$outputPath = "C:\output\"
New-Item -ItemType Directory -Force -Path $outputPath
foreach ($video in $videos) {
    $name = $video.BaseName
    ffmpeg -i $video.FullName -vf fps=1/60 "$outputPath\$($name)_%04d.png"
}

```

[How do I concatenate strings and variables in PowerShell? - Stack Overflow](https://stackoverflow.com/questions/15113413/how-do-i-concatenate-strings-and-variables-in-powershell)




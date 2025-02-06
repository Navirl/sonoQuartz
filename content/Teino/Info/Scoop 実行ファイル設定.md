---
tags:
 - Info
---

daily:: [2022-11-25](/Daily_Note/2022-11-25.md)
up:: [Scoop](Bar/App/Scoop.md)

`$env:SCOOP='C:\Scoop'`
`environment:setEnvironmentVariable('SCOOP',$env:SCOOP,'User')`
このコマンドを実行するとCドライブのScoopがscoopコマンドで呼べるようになる。

2023/04/17
なんか動かなくなってたので、下の関数だけ更新。
` [System.Environment]::SetEnvironmentVariable('SCOOP',$env:SCOOP,'User')`
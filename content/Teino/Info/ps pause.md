---
date: 2024-03-29
tags:
  - Info
---

up:: [PowerShell\_and\_Command-Line](<../Bar/CLI/PowerShell_and_Command-Line.md>)

`Read-Host`。これ自体は入力を受け付ける奴。
`pause`でも動くが、内部的に`cmd pause`を実行している。

Enterしか受けたくないなら`Console.ReadKey().Key != ConsoleKey.Enter`とする方法がある。


[PowerShellを一時停止する方法（ステップバイステップのガイドライン） – Tech News](https://greenluffa.com/jp/powershell%E3%82%92%E4%B8%80%E6%99%82%E5%81%9C%E6%AD%A2%E3%81%99%E3%82%8B%E6%96%B9%E6%B3%95%EF%BC%88%E3%82%B9%E3%83%86%E3%83%83%E3%83%97%E3%83%90%E3%82%A4%E3%82%B9%E3%83%86%E3%83%83%E3%83%97%E3%81%AE/)


---
date: 2025-01-08
tags:
  - Bar
---

up:: [Programming](<./Programming.md>)

プログラミング言語。
write once, run everywhereを信条としている。

コードをコンパイラでバイトコード（.class）にし、環境ごとに用意したJVM - Java Visual Machineのインタプリタで1行ずつ解釈する。
この時、頻出する表現などはJITコンパイラで纏めてOSの機械語に翻訳してから解釈するらしい。

[GraalVMを学びながら動した (Windows) - Qiita](https://qiita.com/yitakura731/items/4a7812542f2a6d12d0cf)

openjdkというオーブンソース開発キットを元に、いろんな企業がディストリビューションを作っている。
普通にopenjdkと言って指すのはOracleがビルドしたやつっぽい。これにエンタープライズ向け機能を追加したのがoracle jdk。

バージョンの+nはビルド番号。ビルド回数と思われるが、ともかく利用者にはあまり関係ないらしい。
[Javaのバージョン番号の形式を理解する - Magnolia Tech](https://blog.magnolia.tech/entry/2021/11/14/213822?felosearch_translate=1)

- AdoptOpenJDK
    - OpenJDKにいろいろ追加したコミュニティエディション
    - 商業ライセンスとかマルチプラットフォーム対応とか
    - これの後継がtemurin
    - [r/java - Reddit](https://www.reddit.com/r/java/comments/oxcb2c/adoptium_celebrates_first_release_eclipse_temurin/)
    - [Adoptium](https://en.wikipedia.org/wiki/Adoptium)
- Corretto
    - Amazon
    - AWSとの連携に向いてる
- dragonwell
    - Alibaba
    - アリババ内部、分散システムなど
- graalvm
    - Oracle
    - JIT採用、ネイティブコンパイル、多言語対応などで早い
    - こいつだけディストリビューションじゃなく仮想マシン、JVMをこれに入れ替える
        - サーバーコンパイラ、C2コンパイラをGraalコンパイラに替える
        - [GraalVMを使ってみる Java - Qiita](https://qiita.com/kinshotomoya/items/39a821dd6a6a52202c0a)
        - [GraalVMを学びながら動した (Windows) Java - Qiita](https://qiita.com/yitakura731/items/4a7812542f2a6d12d0cf)
    - [mise](<../Tools/mise.md>)でインストールするときは`mise use -g java@graalvm-22.3.3+java17`ぐらいいる
    - [Java | mise-en-place](https://mise.jdx.dev/lang/java.html)
- Kona
    - Azul Systems
    - エンタープライズ向け
- Liberica
    - BellSoft
    - Dockerやコンテナ向け
- SapMachine
    - SAP
    - SAP製品向け
- Semeru
    - IBM
    - IBM製品向け
- Temurin
    - Eclipse Adoptium
    - 商用向けに安定とサポートを取った無償ビルド
- Trava
    - Alibaba
    - Alibaba Cloud
- Zulu
    - Azul Systems
    - 多くのプラットフォームとアーキテクチャ、LTS

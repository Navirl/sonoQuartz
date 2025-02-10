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

openjdkというオーブンソース開発キットを元に、いろんな企業がディストリビューションを作っている。

- AdoptOpenJDK
    - OpenJDKにいろいろ追加したコミュニティエディション
    - 商業ライセンスとかマルチプラットフォーム対応とか
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
        - [GraalVMを使ってみる #Java - Qiita](https://qiita.com/kinshotomoya/items/39a821dd6a6a52202c0a)
        - [GraalVMを学びながら動した (Windows) #Java - Qiita](https://qiita.com/yitakura731/items/4a7812542f2a6d12d0cf)
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
- Trava
    - Alibaba
    - Alibaba Cloud
- Zulu
    - Azul Systems
    - 多くのプラットフォームとアーキテクチャ、LTS

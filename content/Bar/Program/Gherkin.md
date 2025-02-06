---
tags:
  - Bar
---

daily:: [2024-08-10](Daily_Note/2024-08-10.md)
up:: [Programming](<./Programming.md>)

[Gherkin記法はじめました #テスト - Qiita](https://qiita.com/jyoppomu/items/8f9f8980c8364dc50909)

テスト駆動開発をより実際の機能に近づけて説明した概念、Behavior Driven Developmentにおいて、補足的に用いられるフレームワークのうち、ソフトウェアの機能性についての振る舞いをユーザー視点からシナリオとして表現するStoryBDDという物を、実現するために使われる実際のフレームワークCucumberで使われるシナリオ記述用記法。

```gherkin
Feature: きゅうりを食べる
  # description
  人がきゅうりを食べるときの振る舞い
  Scenario: 数十本のきゅうりを食べるとお腹が満たさせる
    Given: 太郎は空腹である
    When: 太郎はきゅうりを50本食べる
    Then: 太郎は満腹になる
```


状態、動作、期待の三つをまとめて記述する。Markdownと同じく自然言語。
仕様は書かない。仕様はBDDの補足フレームワーク、SpecBDDにおいて記述する。
Extensionは.feature。

公式リファレンスの日本語訳。
[Karateを始めるので、Gherkin記法を理解する #API - Qiita](https://qiita.com/hideshis/items/b853f2a0ff4769f24cfb)


ちなみにCucumberはほとんどの主要言語をサポートするテストフレームワーク。
[Installation - Cucumber Documentation](https://cucumber.io/docs/installation/)

APIテストをGherkinで書けるフレームワークもある。
[APIテスト自動化ツール「Karate」のまとめ #bdd - Qiita](https://qiita.com/takanorig/items/46098b066f1216e3ca89)
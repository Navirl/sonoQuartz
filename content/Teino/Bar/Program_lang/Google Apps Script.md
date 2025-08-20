---
date: 2022-07-28
tags:
  - Bar
aliases:
  - GAS
---

up:: [Programming](<./Programming.md>)

## Web app, API Executable, Add-on, Library
APIはGCPが無いと使えない。

### Web App

- スタンドアロンのウェブアプリケーションとして動作します[](https://satori.marketing/marketing-blog/gas-introduction/)[](https://blog.css-net.co.jp/entry/gas/about)。
- HTMLインターフェースを持ち、ブラウザからアクセス可能です。
- 特定のGoogleサービスに依存せず、独立して実行できます。
- ユーザー認証やアクセス制御が可能です。

### API Executable

- 外部アプリケーションから呼び出し可能なAPIとして機能します。
- RESTful APIエンドポイントを提供し、HTTP要求を処理します。
- 他のアプリケーションやサービスと連携するのに適しています。
- 認証やアクセストークンの管理が必要です。

### Add-on

- 特定のGoogleサービス（スプレッドシート、ドキュメントなど）に機能を追加します[](https://qiita.com/shikumiya_hata/items/5e11ff875a9dd050a722)[](https://satori.marketing/marketing-blog/gas-introduction/)。
- ホストアプリケーション内で直接実行されます。
- ユーザーインターフェースを持ち、メニューやサイドバーに統合できます。
- Google Workspaceマーケットプレイスで公開・配布が可能です。

### Library

- 再利用可能なコードをパッケージ化したものです[](https://qiita.com/shikumiya_hata/items/5e11ff875a9dd050a722)。
- 他のGASプロジェクトから呼び出して使用できます。
- 共通の機能や複雑なロジックをカプセル化するのに適しています。
- バージョン管理が可能で、複数のプロジェクトで共有できます。

### Web App

- ウェブブラウザを通じてアクセス可能なユーザーインターフェースを提供します[](https://colorwhistle.com/api-vs-web-application/)[](https://developers.google.com/apps-script/manifest/web-app-api-executable)。
- HTMLやJavaScriptを使用して、対話的なウェブページを作成できます[](https://colorwhistle.com/api-vs-web-application/)。
- 人間のユーザーが直接操作することを想定しています[](https://www.haproxy.com/blog/web-app-security-vs-api-security-unified-approaches-reign-supreme)。
- アクセス設定により、誰がアプリにアクセスできるかを制御できます（例：ANYONE、DOMAIN、ユーザー指定など）[](https://developers.google.com/apps-script/manifest/web-app-api-executable)。

### API Executable

- プログラムによるアクセスを目的としており、他のアプリケーションやサービスから呼び出されることを想定しています[](https://intellipaat.com/community/1183/what-is-the-difference-between-an-api-app-and-a-web-app)[](https://developers.google.com/apps-script/manifest/web-app-api-executable)。
- RESTful APIエンドポイントを提供し、HTTP要求を処理します[](https://developers.google.com/apps-script/manifest/web-app-api-executable)。
- JSONやXMLなどの形式でデータを返します[](https://colorwhistle.com/api-vs-web-application/)。
- アクセス設定により、APIを呼び出せるユーザーを制御できます[](https://developers.google.com/apps-script/manifest/web-app-api-executable)。

主な違いは以下の通りです：

1. **用途**: Web Appは主に人間のユーザーのためのインターフェースを提供し、API Executableは他のプログラムやサービスとの連携のためのインターフェースを提供します[](https://colorwhistle.com/api-vs-web-application/)[](https://www.haproxy.com/blog/web-app-security-vs-api-security-unified-approaches-reign-supreme)。
2. **アクセス方法**: Web Appはブラウザを通じてアクセスされ、API Executableはコードやコマンドラインインターフェースを通じてアクセスされます[](https://colorwhistle.com/api-vs-web-application/)[](https://intellipaat.com/community/1183/what-is-the-difference-between-an-api-app-and-a-web-app)。
3. **返すデータの形式**: Web Appは通常HTMLページを返しますが、API Executableは構造化されたデータ（JSONやXMLなど）を返します[](https://colorwhistle.com/api-vs-web-application/)。
4. **セキュリティ考慮事項**: API Executableは通常、認証トークンやAPIキーを使用してアクセスを制御します。一方、Web Appはユーザー認証やセッション管理を必要とする場合があります[](https://www.haproxy.com/blog/web-app-security-vs-api-security-unified-approaches-reign-supreme)[](https://stackoverflow.com/questions/57325575/is-this-setup-of-using-a-webapp-and-api-executable-secure-and-reasonable)。

これらの違いを理解することで、プロジェクトの要件に応じて適切なデプロイメントタイプを選択できます。Web Appはユーザー向けのインターフェースが必要な場合に適しており、API Executableは他のシステムとの統合や自動化が必要な場合に適しています。


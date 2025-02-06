---
tags:
 - Info
---

daily:: [2022-07-28](Daily_Note/2022-07-28.md)
up:: [Google Apps Script](../Bar/Program/Google%20Apps%20Script.md)
source:: [Class UrlFetchApp  |  Apps Script  |  Google Developers](https://developers.google.com/apps-script/reference/url-fetch/url-fetch-app)

Httpを経由して情報を取る関数。
- fetch
	- 基本。URLの中身を取り出す。
	- getContentText()でstringで中身が返る。
- fetchAll
	- 複数のURL結果を配列に格納して返す。
- getRequest
	- URLやヘッダーなどを取得する。

Returns the request / that is made / if the operation was invoked.
操作が呼び出された場合に行われた要求を返します。
操作された場合のリクエストを返す。

リクエストを返す　行われた　もし操作が実行されたら
make
実行する
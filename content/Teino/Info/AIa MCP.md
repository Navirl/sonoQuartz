---
date: 2025-01-30
tags:
  - Info
---

up:: [AI\_agent](<../Bar/AI/AI_agent.md>)

Model Context Protocol, 略してMCP。
提唱はAnthoropicっぽい。

[GitHub - modelcontextprotocol/servers: Model Context Protocol Servers](https://github.com/modelcontextprotocol/servers)
[All-in-one AI workspace](https://glama.ai/#about)
[Sourcegraph](https://sourcegraph.com/blog/cody-supports-anthropic-model-context-protocol)

どのソースもAIモデル用のコンテキストに変換したり、ツールとして扱えるようにしたり、プロンプトを提供できたりするサーバーにするプロトコルっぽい。
以下の三つの概念で出来てる。

- ホスト
    - 接続されるLLMアプリ
- クライアント
    - ホストとサーバーの１：１接続の維持
- サーバー
    - クライアントにコンテキストやツールを渡す

## サーバー
アクセスできるツールの定義と、その説明になるオブジェクトを用意する。
さらにリクエスト用のハンドラーを公開し、受け取ったリクエストを関連付けれらている機能に紐づける。

## クライアント
どのサーバーに接続できるかを定義。
及び、接続の為のメソッドを準備。

接続後のメッセージ送信。

クライアントがプロトコルバージョンと機能を元に初期化要求を送信
サーバーがプロトコルバージョンと機能を元に応答
クライアントが応答の証人として初期化された通知を送信
その後メッセージ交換を行う。

メッセージは以下の4つが定義されている。
- Request
    - 応答を期待
- Notify
    - 応答を期待しない
- Result
    - Requestに対する成功した応答
- Error
    - Requestに対する障害応答

## Transport
アプリとインターネットの間、実際通信に使うトランスポート部分は2つの手法が用意されている。
- stdio transport
    - 標準の入出力
    - ローカルに最適
- HTTP with SSE transport
    - サーバーからクライアントへのメッセージ、Server Sent Event
    - クライアントからサーバーへのHTTP Post

また、データ構造はJSON-RPC 2.0に従う。

## ホスト
サーバーへの接続を開始っするアプリケーション。
プロトコル上では曖昧。

## OSS Component
pythonとtypescript用のOSS、fastmcpというフレームワークが出てる。
SDKもある。
開発者ツールもある。

[Introducing Model Context Protocol (MCP) \| Glama](https://glama.ai/blog/2024-11-25-model-context-protocol-quickstart#transport)
[Cody supports additional context through Anthropic's Model Context Protocol \| Sourcegraph Blog](https://sourcegraph.com/blog/cody-supports-anthropic-model-context-protocol)
[servers/src/everything at main · modelcontextprotocol/servers · GitHub](https://github.com/modelcontextprotocol/servers/tree/main/src/everything)


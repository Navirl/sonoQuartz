---
tags:
  - Info
---

daily:: [2025-01-30](<../Daily_Note/2025-01-30.md>)
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
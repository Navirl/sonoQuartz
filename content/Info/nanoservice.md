---
tags:
 - Info
---

daily:: [2023-04-26](Daily_Note/2023-04-26.md)
up:: [Docker](<../../../Teino/Bar/App/Docker.md>)

cloudflareのnanoservice

マイクロサービス
API渡してhttpsとかで読み出しつつ、まるで一つのように振る舞う

ネットワークごしなのでとても遅い
それを関数呼び出しくらいまで高速化したnanoservice

これは同一のインフラストラクチャで分解して、共通できるCPUとかは共通させているから
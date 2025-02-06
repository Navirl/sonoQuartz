---
tags:
  - Info
---

daily:: [2025-01-21](<../Daily_Note/2025-01-21.md>)
up:: [mc](<../Bar/App/minecraft.md>)

Nuro10gにしたら、デュアルスタックからMAP-Eという方式に変わったらしい。ZXHN F2886S。
つまりIPv4はIPv4、IPv6はIPv6というのだったのが、IPv4 over IPv6 トンネリング技術で4をカプセル化して6に流す、つまり全部6で流す方式になった。

それと同時にルーターのUPnP、パケットフィルター、ポートなどの設定がグレーアウトして触れなくなっていた。

MAP-EはIPv4グローバルアドレスにポート番号を付与し、他のユーザーと使いまわしているという状態らしい。なのでポートを自由に開放は出来ない。

ただシステム的に付与されたポートも加味で開放は出来るはず。つまり付与番号が仮に8080ならそのポートを使って接続できてもおかしくない。
でもこの規格に機械がついていってなさそうというか……
[【公式】IPv6アドレス対応およびMAP-E方式について \| NURO 光 - インターネット・光回線](https://www.nuro.jp/ipv6.html)

ちなみにプロバイダ側でこのポート処理を行う方式はDS-Liteというらしい。
[IPv6のIPoE接続「MAP-E」と「transix」の違い【V6プラスとDS-Lite、ステートレスとステートフル】 \| ヘルニアクソ野郎エンジニアblog](https://denkenmusic.com/ipv6のipoe接続「map-e」と「transix」の違い【v6プラスとds-lite、ステ/)
[IPv4 over IPv6 の主役たち：MAP-E方式とDS-Lite方式を分かりやすく解説！ - 光回線 節約裏技 光回線どれがいい？ キャッシュバック裏技、月額料金割引の裏技、工事残債、立ち合い問題裏技](https://cocsperhikari.hatenablog.jp/entry/2024/09/04/194549)

なので代替案、TunnelとVPNの検討。
どっちも間に別のサーバーを挟むので、地域が問題になる。

v6直繋ぎはパケットフィルターがいるので……
[IPv6でサーバーを外部に公開する方法 \| Novaの日記](https://novablog.work/ipv6-server/)

VPSはコストかかるので……

VPNはP2PVPN、あるいはdVPN(分散型VPN)でつなぐ。
["P2P VPN"とは何か？ #初心者 - Qiita](https://qiita.com/pseudonym2/items/c4f2411e21a5fb842961)
[トンネリングって分かりづらいよね #Network - Qiita](https://qiita.com/na-777/items/ab73b903bd476e24789c)
[is e4mc safe/safer than essential? : feedthebeast](https://www.redditmedia.com/r/feedthebeast/comments/1e95gbh/is_e4mc_safesafer_than_essential/?ref=readnext)

SoftEtherVPNって、VPNシステムを作るだけでサーバー貸してくれるわけじゃなさそう。
[YAMAHA RTXルーターとSoftEtherでVPNを構築する #kagoya - Qiita](https://qiita.com/CIB-MC/items/0e708ab3e94c791339fe)



## CloudFlare Tunnel
domain持ってないのでquick tunnelでやろうとしたが、tcpトンネルをサポートしていない模様。（quickじゃないならできる）
なのでzrok。
[Cloudflare Tunnel を使って自宅サーバを公開する - hoge な blog](https://akkyorz.hatenablog.com/entry/2022/12/15/012728)
[はじめてのCloudflare Tunnel その３ Quick Tunnel を試してみる＆必要アウトバウンド通信の整理](https://zenn.dev/kameoncloud/articles/ba7e1d4800dc4b)
[Cloudflare Tunnelを利用したMinecraftサーバーの公開 #minecraft - Qiita](https://qiita.com/zypr/items/997afdb487b4ead2eb11#クライアント側の設定)
## Zrok
普通に通った。
[Sharing TCP and UDP Servers \| Zrok](https://docs.zrok.io/docs/concepts/tunnels/)

一応日に5GBの制限がある。
[Pricing - zrok](https://zrok.io/pricing/)

ただサーバーを選べないので重い。
Tailscaleを採用する。

## TailScale
通信を受け渡し直につないでくれるTailscaleというのがあるらしい。
[【OpenWrt】tailscale VPNを使って自宅ネットワークへVPN接続する \| Wi-Fiマニュアル](https://wifi-manual.net/openwrt-use-tailscale-vpn/#toc18)
[外出先から家庭内のネットワークにアクセスするには、Tailscaleが最高に便利｜NeoYume](https://note.com/neoyum675/n/naae9287adbb0)
[【TailScale使用】外から自宅サーバーにVPN経由でアクセスをしたい](https://zenn.dev/tochiman/articles/f7c4027280170e)

同じアカウントにログインして繋ぐのがデフォっぽいが、アカウント共有はなんか嫌なので他を考える。
一応直じゃなく間にサーバー挟むのもあるらしい。DERP。
[厄介な環境から Tailscale に接続する (プロキシなど)](https://zenn.dev/nzws/articles/connect-tailscale-via-troublesome-environment)

他のアカウントにマシンを一つ共有する設定が出来る。
---
tags:
  - Info
aliases:
  - sd ngrok
---

daily:: [2024-05-22](/Daily_Note/2024-05-22.md)
up:: [ComfyUI](<../Bar/App/ComfyUI.md>)

ngrokを使っていたが、上限がすぐ来るので。
画面上から直接DLとかするからでは。

## Cloudflare Tunnel
ngrokの代替として使えるはずのもの。

cloudflaredをDLして、`cloudflared tunnel --url http://127.0.0.1:8118`で動くはずなのだが、なんかpingがuser100に許可されてないとかでエラー。
許可されてるのは65534。

許可を出すのはadminじゃないとできないけどSMSLは管理者ログイン出来ない。

調べていくとドメインを登録する必要があるらしい。いったん保留。

[Reddit - Dive into anything](https://www.reddit.com/r/StableDiffusion/comments/18kkox8/access_your_local_sd_ui_over_the_internet_host/)


ratholeという物で回避できるらしい。
ただ自分のサーバーが必要。無くても出来そうではあるが。


トンネル方法が詰まったやつ発見。

[GitHub - anderspitman/awesome-tunneling: List of ngrok/Cloudflare Tunnel alternatives and other tunneling software and services. Focus on self-hosting.](https://github.com/anderspitman/awesome-tunneling)

sdwebuiはBoreを使った報告がある。

[Use ngrok in the Colab version to avoid problems with disconnecting the webui interface after 30s. · Issue #344 · AUTOMATIC1111/stable-diffusion-webui · GitHub](https://github.com/AUTOMATIC1111/stable-diffusion-webui/issues/344)

ただSMSLだとだめでした。


## zrok
[Getting Started with zrok | Zrok](https://docs.zrok.io/docs/getting-started/)
普通に使える。いちにち10GB制限。
ただし遅い。pnginfoは露骨に止まる。

Generate時にConnection Timed Outとかinvalid jsonとか良く出るが、裏で回っていれば問題ない。
回ってないと思って連打するとむしろ全部エラーで止まるので、Generate Foreverを使うのがいい。

プロンプトの変更など、変化を読み込んでいるときにGenerateは押せない。たぶん遅いから。
ちょっと待つ。

コンソールの/run/predictが生成中のしるし。

PATH=~/bin:$PATH
zrok enable zlEnpqRSSezG
zrok share public http://127.0.0.1:8188
zrok share public http://127.0.0.1:7860

コンソールをつけ直すたびにPATHは消滅する。

## ZeroTier
[Pricing – ZeroTier](https://www.zerotier.com/pricing/)

## Kaggle
R18用途でないならここを使用できる。

[Stable-Diffusion/Tutorials/How-To-Use-Automatic1111-Web-UI-On-A-Free-Kaggle-Notebook-Like-Google-Colab.md at main · FurkanGozukara/Stable-Diffusion · GitHub](https://github.com/FurkanGozukara/Stable-Diffusion/blob/main/Tutorials/How-To-Use-Automatic1111-Web-UI-On-A-Free-Kaggle-Notebook-Like-Google-Colab.md)
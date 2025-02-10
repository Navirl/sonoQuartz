---
date: 2024-05-23
tags:
  - Info
---

up:: [Stable Diffusion](<../Bar/Stable Diffusion.md>)

## LoRA
追加学習により他の画風を学んだり、特定のキャラクターの概念を教え込んだりできる機能。
それが出来る手法はいくつかあるのだが、このLoRAが一番有名。民生PCでもできるようになった最初の手法。

つくりたいならここ。
簡易的なサンプル画像生成機能もついている。
[sd sd-scripts](<../Bar/App/sd sd-scripts.md>)
[\[Guide\] Make your own Loras, easy and free - colabs | Stable Diffusion Other | Civitai](https://civitai.com/models/22530)
[Rough FAQ for 東方Project AI](https://rentry.org/tohoaifaq#opinionated-lora-guide-for-colab)
[Tutorial: Lycoris/LoCon Training using Kohya\_SS | Civitai](https://civitai.com/articles/908/tutorial-lycorislocon-training-using-kohyass)
[LoRAを作ってみよう！～実践編・基本～ ｜とーふのかけら](https://note.com/konapieces/n/n5af522a56ecc)
[Stable DiffusionのLoRAのつくりかた｜RedRayz](https://note.com/redrayz/n/n05e93566e562)

dim
[SDXL LoRAのDim(Rank)の比較｜RedRayz](https://note.com/redrayz/n/n69d696d72a80)

R-18
[あなたの性癖の為のLoraリンク集｜にきもなか](https://note.com/nkmonaka/n/n32973263de50)

基本的に正方形を使用するが、縦長横長を足すと対応力が上がる。
内部ではSDの解像度に合わせて縮小されている。

[LoRAで縦長・横長画像学習のコツ｜Katsushiro Koizumi](https://note.com/koi_zoom1/n/nf148c177150f)

画像分割2枚。
出来ないことは無いけど構図が縛られる。

[デルタもんを例にキャラクターLoRAを作る｜hakomikan](https://note.com/hakomikan/n/nbf8ce4cce1a9)

使えそうな厳選
[キャラクター再現 LoRA の作り方 (SDXL Pony) - 0uts1de's note](https://0uts1de.hateblo.jp/entry/2024/06/10/014551)
[NAIでデルタもんの一枚絵からいろんなポーズを出す｜Plat](https://note.com/nyoplat/n/ne74823bd9a15)
[【Stable Diffusion】StabilityMatrixでSDXL版LoRAを作ってみるまで【Kohya\_ss】｜カズヤ弟＠ゲーム実況＆生成AI](https://note.com/kazuya_bros/n/nc31d58935a77)
[1枚の絵からキャラクターLoRAを作る(AI実験/2024年3月v2)｜yatoracat](https://note.com/yatoracat/n/na5accfaae601)
[VRCモデル改変キャラクターLoRA作成手順(AI実験/2024年6月)｜yatoracat](https://note.com/yatoracat/n/n96d99f0b4fe5)

## DoRA
LoRA進化系。再現度あげつつはっきりしているらしい。

[SDXLのLoRAとかDoRA作成における個人的TIPS｜akiraU](https://note.com/akirau338/n/nc63f4a006bd6)



## LoRA+
LoRAは元々特徴量の圧縮(A)と復元(B)を学習するもの。
これが同じ学習率で学習されていたのが従来のLoRA。LoRA+はこの学習率をそれぞれで設定する。

LoRAを作る側でないと実感できないが、収束するまでが早い。

[StableDiffusionのLoRAでLoRA+を試す｜RedRayz](https://note.com/redrayz/n/na03fb47fe53c)

## LECO
モデルから概念を消去したり強化したりできる。
LoRAは追加しかできないので実は革新的。

プロンプトの差分を生成した画像からとり学習する。
モデルに生成させるため事前に画像を準備する必要は無い。
[LECOの学習を高速化する｜hakomikan](https://note.com/hakomikan/n/n4c7291fc8dd3)

これを使ってスライダーLoRAというものが作られていた。

対になる概念を指定しておかないといけないっぽい？

動作仕様上、モデル内に存在しない概念は生成できない。

じゃあその概念をめちゃくちゃプロンプト上で強化すればいいじゃんという話だが、複数概念を一つのLoRAとして管理できるのは普通にありがたい。
他、概念が混ざっている物体から概念を取り除くのとか、弱いトリガーワードを強化するとか、とにかく概念の編集に使えるLoRA。
もしかしてSD1.5からアニメキャラとか……

[Stable Diffusion から特定の概念を忘れさせる学習を行ってみる](https://zenn.dev/aics/articles/lora_for_erasing_concepts_from_diffusion_models)

他、キャラLoRAを生成する際に事前に概念を一つにまとめることでトークン数を圧縮できる・色移りしないという利点がある。二つ使用することになるので最後はマージ。

[Today's recommend is LECO｜エマノン](https://note.com/emanon_14/n/n6d37d7806200)
[キャラLoRAとLECOが両方そなわり最強に見える｜エマノン](https://note.com/emanon_14/n/n8ddc3eb1d5cb)

[LECO - としあきdiffusion Wiki\*](https://wikiwiki.jp/sd_toshiaki/LECO)
[LECOがやっていることを解説する｜gcem156](https://note.com/gcem156/n/n9f74d7d1417c)

iLECOという高速バージョンがある。
[LECOの学習を高速化する｜hakomikan](https://note.com/hakomikan/n/n4c7291fc8dd3)


## コピー機学習
LoRAは差分を学習するものなので、本当に一部分だけしか変わらない同じ画像を使用すると精度の高いLoRAが作れる。

一枚だけで学習し、どんなシードでも同じ画像しか出ないLoRAを作ってモデルにマージ。（わざと過学習）（キャプションは必要無い）
そこから一部分だけ違う一枚をさっきのモデルで学習。すると余計な要素が混入しないLoRAができるというもの。

[かんたん☆コピー機学習法（きっと初級編）｜月須和・那々 (2vXpSwA7)](https://note.com/2vxpswa7/n/n2d04527bf0bc)
[結局コピー機学習ってなんなの？｜エマノン](https://note.com/emanon_14/n/n2b5d41950810)

dimを上げれば多く特徴が読める。1枚なら低くていい。
学習率を上げれば収束早い。

もう一つ、マージせずに元モデルで違う一枚を過学習。そして差分抽出、という方法がある。差分学習法。

SDXLでは後者の方がいいらしい。
そもそも不安定という話も。

[SDXLでコピー機学習法を試す｜Kohya S.](https://note.com/kohya_ss/n/nb258da07236f)

要するに、引き算したい要素をLoRAで制作するというものっぽい。


他にも、3Dっぽいのしか出ない奴に学習させ、LoRAから3Dっぽさを無くすという応用もある。

[LoRAで脳内キャラクターを学習する、たったひとつの冴えたやりかた｜エマノン](https://note.com/emanon_14/n/ne83063e33627)

不要な層をカットするのも忘れず。

[脳内キャラクターのLoRAを簡単に作りたい（切実）｜エマノン](https://note.com/emanon_14/n/n39ff8b49183a)

最初の画像にキャプションを付与すると、生成キャラにバリエーションが出る。

[今宵われらキャラを学ぶ＜脳内キャラクターLoRA総集編＞｜エマノン](https://note.com/emanon_14/n/n87820b45adc6)
[キャラLoRAとLECOが両方そなわり最強に見える｜エマノン](https://note.com/emanon_14/n/n8ddc3eb1d5cb)


マージモデルは事前マージで作れるのでカットできる。

カラバリ、コンバリなどをコピー機用の素材に足すと対応力が増す。
余計なもんを足すと面倒になるので3D推奨。
コピー機LoRAを複数混ぜて素材代わりにすることもできる。

[かんたん☆コピー機学習法（中級編書きかけだけど公開しちゃうぞ？）｜月須和・那々 (2vXpSwA7)](https://note.com/2vxpswa7/n/n3411c058d6ba)

簡単に制作するための拡張機能もある。

[GitHub - hako-mikan/sd-webui-traintrain: LoRA training extention for Stable Diffusion Web-UI](https://github.com/hako-mikan/sd-webui-traintrain)

## パラメータ
[誰でもわかるStable Diffusion　Kohya\_ssを使ったLoRA学習設定を徹底解説 - 人工知能と親しくなるブログ](https://hoshikat.hatenablog.com/entry/2023/05/26/223229)

## SDXL LoRA
[【StableDiffusion】SDXL対応の「あ」～「お」発音のLoRAを作るまで【traintrain】｜カズヤ弟＠ゲーム実況＆生成AIで遊んでる人](https://note.com/kazuya_bros/n/nec656e8c2882)

2024年3月26日 基本
[【Stable Diffusion】StabilityMatrixでSDXL版LoRAを作ってみるまで【Kohya\_ss】｜カズヤ弟＠ゲーム実況＆生成AIで遊んでる人](https://note.com/kazuya_bros/n/nc31d58935a77)

2024年3月13日 1枚
[1枚の絵からキャラクターLoRAを作る(AI実験/2024年3月)｜yatoracat](https://note.com/yatoracat/n/n866f57c2fc9b)

2024年3月15日 上記のV2
[1枚の絵からキャラクターLoRAを作る(AI実験/2024年3月v2)｜yatoracat](https://note.com/yatoracat/n/na5accfaae601)

2024年1月22日 三面図を生成するNAI
[NAIでデルタもんの一枚絵からいろんなポーズを出す｜Plat](https://note.com/nyoplat/n/ne74823bd9a15)

## DARE
LoRAを適用する際に混ぜ方をよりいものに変更する。
[🦊モデルのマージ - work4ai](https://scrapbox.io/work4ai/%F0%9F%A6%8A%E3%83%A2%E3%83%87%E3%83%AB%E3%81%AE%E3%83%9E%E3%83%BC%E3%82%B8)
[GitHub - ntc-ai/ComfyUI-DARE-LoRA-Merge: Uses DARE to merge LoRA stacks as a ComfyUI node](https://github.com/ntc-ai/ComfyUI-DARE-LoRA-Merge)
[sd lora model](<./sd lora model.md>)

## 細かな情報
シチュLoRAで画風を抑えるなら数増やしてバッチ上げる。
解像度下げる、DIMalpha下げ、unetのみ、fp8学習などでRAM抑えVRAMのみにして早くできる。バッチは早くする意図で変更しない。
gradient accumulation stepsでバッチを疑似的に上げられる。

バッチサイズは複数を一気に参照して安定させるもので、早くなるわけではない

[なんJ NovelAI部 405 (1/2) StableDiffusion3公開 : AI画像生成情報まとめ保管庫](https://ai-art.blog.jp/archives/28399058.html)

## 絵柄LoRA
215: 今、天王星のwiki見てきたら軌道傾斜角(i) が0.774°だった警備員[Lv.38] (ﾜｯﾁｮｲ 1ad5-m0Fy) sage 2024/07/02(火) 13:54:42.61 ID:xblE0VS60 
絵柄LORA作るの難しいな
素材全体の平均みたいな絵柄を出して欲しいけど実際に使うと出力のたびに絵柄がコロコロ変わるLORAになってしまう

217: 警備員[Lv.24] (ﾜｯﾁｮｲ c6b4-tgr5) sage 2024/07/02(火) 14:12:54.90 ID:7bDN2JjY0 
>>215
例えばlong hairのタグがある画像が1つしかない場合はlong hairにその画像の絵柄が学習されるって感じになると思うで
だからそれぞれのタグに別々の絵柄が学習されててそのせいで平均絵柄じゃなくて別々絵柄を出力してしまってるんやないかな
平均絵柄を出したいなら平均絵柄LoRAを作るんじゃなくてそれぞれ個別の絵柄LoRAを作ってそれぞれを0.4とかで弱めて使った方が平均絵柄っぽいの出しやすいし絵柄の調節もしやすくてええで

223: 今、天王星のwiki見てきたら軌道傾斜角(i) が0.774°だった警備員[Lv.38] (ﾜｯﾁｮｲ 1ad5-m0Fy) sage 2024/07/02(火) 14:49:28.39 ID:xblE0VS60 
>>217
はえーなるほどなサンキュー
でもワイは今特定の絵師数人の絵柄を集めてるわけやなくて、作りたい方向性の絵柄を作者問わず集めて素材にしてるから分割LORA方式は難しいんよな

218: 警備員[Lv.12] (ﾜｯﾁｮｲ 8efd-IzLz) sage 2024/07/02(火) 14:16:22.34 ID:MaiO8nOD0 
>>215
画風LoRAの調整はAnimagineの方が簡単やね
ponyは派生をベースにした方がええんか全然安定せん

[�Ȃ�JNVA����414](https://fate.5ch.net/test/read.cgi/liveuranus/1719822872/215)
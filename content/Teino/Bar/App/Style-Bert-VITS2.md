---
tags:
  - Bar
aliases:
  - sbv2
---

daily:: [2024-10-21](Daily_Note/2024-10-21.md)
up:: [AI\_local](<../AI/AI_local.md>)
up:: [AI\_voice](<../AI/AI_voice.md>)

入力されたテキストの内容をもとに感情豊かな音声を生成する。TTS。
感情や発話スタイルを制御できる。

[GitHub - litagin02/Style-Bert-VITS2: Style-Bert-VITS2: Bert-VITS2 with more controllable voice styles.](https://github.com/litagin02/Style-Bert-VITS2)

日本語では性能がいいらしい。（というか日本語しか基本使えない）
声と喋り方を別々にマージできる。つよい。

[ずんだもん読み上げに感情を与える（Bert-VITS2のkey別マージ）](https://zenn.dev/litagin/articles/37c5ed78bd7935)

男性は声の大きさで抑揚をつける傾向にあって、女性は声の高さで抑揚をつける傾向がある、みたいな理論が通説なのよね

[Discord](https://discord.com/channels/1094999323365875773/1252344863694000209/1252567240373440563)

差分マージという能力だけ取り出したマージが使える。
差分のことをヌルモデルという。単体で音声合成が出来ないので共有が気軽。

[Style-Bert-VITS2の差分マージで遊ぶ](https://zenn.dev/litagin/articles/1297b1dc7bdc79)

ボイスドラマログ。

[Style-Bert-Vits2でボイスドラマを作ってみた感想｜liruk](https://note.com/liruk/n/nd45fa16d0183?sub_rt=share_pb)

学習。
[【Style-BERT-VITS2】感情豊かな音声合成と音声学習を試してみた｜カズヤ弟＠ゲーム実況＆生成AI](https://note.com/kazuya_bros/n/nfbd17f55dc66)

## 使用メモ
プリセットの他、音声ファイルを入力することでもスタイルを指定することができる。
ただし音声ファイルは似た声音、性別でないとうまくいかないらしい。

## モデル

飛びぬけて精度のいいボイス。
kaunistaの方はそれを元にしたAIVTuberが存在する。

[kaunista/kaunista-style-bert-vits2-models · Hugging Face](https://huggingface.co/kaunista/kaunista-style-bert-vits2-models)
[黄琴まひろ Style-Bert-VITS2 - 出張れぷりかどーる 音声合成支店 - BOOTH](https://booth.pm/ja/items/5511738)

小春音アミ。
[litagin/sbv2\_koharune\_ami · Hugging Face](https://huggingface.co/litagin/sbv2_koharune_ami)

852話。
[「fix\_pitch\_00」　Style-Bert-VITS2無料モデル　（支援版あり） - 852話 - BOOTH](https://meola.booth.pm/items/5986908)

モデルの配布に一癖ある。
3つのファイルを共有しないとモデルとして使用できない。

男声が全然存在しないのが難点。唯一あるのが素人大学生セットについてくる奴というレベル。

[Mofa-Xingche/girl-style-bert-vits2-JPExtra-models · Hugging Face](https://huggingface.co/Mofa-Xingche/girl-style-bert-vits2-JPExtra-models)
たまに事前学習モデルが出てくる。
これは追加で何か学習させないと使えないモデル。
[ayousanz/style-bert-vits2-pretrained-model-ver2 · Hugging Face](https://huggingface.co/ayousanz/style-bert-vits2-pretrained-model-ver2)


[コーパス](<../../Info/コーパス.md>)

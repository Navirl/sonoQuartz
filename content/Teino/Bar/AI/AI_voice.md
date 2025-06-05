---
date: 2024-12-06
tags:
  - Bar
aliases:
  - AIvc
---

up:: [AI\_local](<./AI_local.md>)

[AI\_local](<./AI_local.md>)の領分だが、いかんせん多すぎ。
切り離してるので[AI\_online](<./AI_online.md>)の領分もある。



## GPT-SoVITS
1分のボイスデータからTTSモデルを作る。
データが限られるときに。
なんなら5秒でもできるらしいので、速度が必要ならこっち。感情表現が必要なら[Style-Bert-VITS2](<../App/Style-Bert-VITS2.md>)を使用する。

[GitHub - RVC-Boss/GPT-SoVITS: 1 min voice data can also be used to train a good TTS model! (few shot voice cloning)](https://github.com/RVC-Boss/GPT-SoVITS)

２がある。がそんな注目されてないっぽい。
[GitHub - YoMio-Tech-Inc/GPT-SoVITS2: GPT-SoVITS2](https://github.com/YoMio-Tech-Inc/GPT-SoVITS2/)

えろもでる
[AkitoP/GPT-SoVITS-JA-H · Hugging Face](https://huggingface.co/AkitoP/GPT-SoVITS-JA-H)

また、[sbv2](<../App/Style-Bert-VITS2.md>)と比較して世界によく知られているため、ゲームからぶっこ抜いた声が大量に投下されていたりする。
RVCの方が需要があるのでそう多くはない。だってあっちは自分で演技したら済むし。

[Voice Models: Over 27,900+ Unique AI RVC Models](https://voice-models.com)

[Style-Bert-VITS2](<../App/Style-Bert-VITS2.md>)


## fish-speech
tts。CC-BY-NC-SA。
Llamaが入っているのでかなり強いだろうが、やっぱNCがネック。

[GitHub - fishaudio/fish-speech: Brand new TTS solution](https://github.com/fishaudio/fish-speech)

とか思ってたら、いつの間にかApacheになってる。
## so-vits-svc-fork

音声から音声への変換。
リアルタイムも可能。というか品質ならRVCがいるのでこっちが本業。

[GitHub - voicepaw/so-vits-svc-fork: so-vits-svc fork with realtime support, improved interface and more features.](https://github.com/voicepaw/so-vits-svc-fork)

正式名称はSoftVC VITS Singing Voice Conversion。
スペクトログラムを潜在変数に落とすのがVITS。それに話者情報を排して発話表現を抜き出すSoftVCという技術を合わせたもの。

[最近のAIボイスチェンジャー(RVC、so-vits-svc)](https://zenn.dev/tonimono/articles/5c35e87a29af15)


[Retrieval-based-Voice-Conversion-WebUI](<../App/Retrieval-based-Voice-Conversion-WebUI.md>)
## Beatrice
日本製っぽいRVC。
クソ軽くてシングルCPUで動いて0.05秒遅延。

[Beatrice | 軽量・低遅延AIボイスチェンジャー](https://prj-beatrice.com/)

## voice-changer
いわゆるVCClient。
様々な音声変換に対するクライアント。

[GitHub - w-okada/voice-changer: リアルタイムボイスチェンジャー Realtime Voice Changer](https://github.com/w-okada/voice-changer)

## Voice_corpus_Recorder
コーパスの録音を助けるやつ。

[GitHub - Mega-Gorilla/Voice\_corpus\_Recorder](https://github.com/Mega-Gorilla/Voice_corpus_Recorder)

## Voice_Separation_and_Selection
音声を分割する奴

[GitHub - teftef6220/Voice\_Separation\_and\_Selection: Separation voice and delete files with majority silence](https://github.com/teftef6220/Voice_Separation_and_Selection)

## ultimatevocalremovergui
歌から声を抜く奴

[GitHub - Anjok07/ultimatevocalremovergui: GUI for a Vocal Remover that uses Deep Neural Networks.](https://github.com/Anjok07/ultimatevocalremovergui)

説明
[Reddit - Dive into anything](https://www.reddit.com/r/IsolatedTracks/comments/vuavwq/ultimate_vocal_remover/)

どのモデルがいいか
[MVSEP - 音楽＆ボイス分離](https://mvsep.com/quality_checker/synth_leaderboard?)


## demucs
歌から声を抜く奴
モデルをUVRで使える

[GitHub - facebookresearch/demucs: Code for the paper Hybrid Spectrogram and Waveform Source Separation](https://github.com/facebookresearch/demucs)

## voicefixer
音質の悪い声を戻す

[GitHub - haoheliu/voicefixer: General Speech Restoration](https://github.com/haoheliu/voicefixer)

## coreco-recorder
日本語に特化したコーパス録音ソフト

[GitHub - TylorShine/coreco-recorder: CoReco: A general-purpose Corpus viewer/Recorder](https://github.com/TylorShine/coreco-recorder)

## slice-and-transcribe
音声ファイル分割とテキスト書き起こし

[GitHub - litagin02/slice-and-transcribe](https://github.com/litagin02/slice-and-transcribe)

## 人力音声フォルダ振り分けアプリ
耳で聞いてキーボードで振り分ける

[人力音声フォルダ振り分けアプリ · GitHub](https://gist.github.com/litagin02/755251ade014442e65da7042e1d67150)

同じようなもの
[GitHub - seichi042I/transcribe\_tool](https://github.com/seichi042I/transcribe_tool)

## NISQA
音質評価用ライブラリ

[GitHub - gabrielmittag/NISQA: NISQA - Non-Intrusive Speech Quality and TTS Naturalness Assessment](https://github.com/gabrielmittag/NISQA)

## audio_attribute_labeling_tool
感情ラベリングツール

[GitHub - seichi042I/audio\_attribute\_labeling\_tool](https://github.com/seichi042I/audio_attribute_labeling_tool)

## DDSP-SVC
歌用
[GitHub - yxlllc/DDSP-SVC: Real-time end-to-end singing voice conversion system based on DDSP (Differentiable Digital Signal Processing)](https://github.com/yxlllc/DDSP-SVC)

派生
学習が早い
[GitHub - TylorShine/MNP-SVC: Real-time end-to-end singing voice convertion](https://github.com/TylorShine/MNP-SVC)

## Vocoflex
有料。音声ファイルの声をGUI上で混ぜる奴。
[Vocoflex | Dreamtonics株式会社](https://dreamtonics.com/ja/vocoflex/)

## にじボイス
100種以上の高品質商用利用可能音声が使える。
YMM4だと都度課金になる。アダルトは不可。
[にじボイス | AIによる感情豊かな音声生成サービス](https://app.nijivoice.com)

## AivisSpeech
VoiceVoxと同じような奴。
Anneliがいるあたり、ベースはsbv2？

engineの制約で、日本語以外話せない。

[Aivis Project \| AivisSpeech でかんたんに感情豊かな音声合成、使ってみませんか？](https://aivis-project.com)

## onnx
モデルの計算グラフを含んだ、モデルのアーキテクチャや推論コードを無視して変換できるオープンフォーマット。

## alltalk_tts
xttsなどのttsをまとめてapiで出力する。

atsetup.shはウィザード形式なのでkaggleで実行できない。
順当に進めば`install_custom_standalone()`につくはず。
torchやcondaのインストールを除くと以下。

```sh
conda install -y -c conda-forge "ffmpeg=*=*gpl*"
    conda install -y -c conda-forge "ffmpeg=*=h*_*" --no-deps
    echo
    echo
    echo
    echo "    Fix Nvidia's broken symlinks in the /env/lib folder"
    echo
    # Define the environment path
    env_path="${INSTALL_ENV_DIR}/lib"

    echo "    Installing additional requirements."
    echo
    pip install -r system/requirements/requirements_standalone.txt
    curl -LO https://github.com/erew123/alltalk_tts/releases/download/DeepSpeed-14.0/deepspeed-0.14.2+cu121torch2.2-cp311-cp311-manylinux_2_24_x86_64.whl
    pip install --upgrade gradio==4.44.1
    echo Installing DeepSpeed...
    pip install deepspeed-0.14.2+cu121torch2.2-cp311-cp311-manylinux_2_24_x86_64.whl
    rm deepspeed-0.14.2+cu121torch2.2-cp311-cp311-manylinux_2_24_x86_64.whl
    pip install -r system/requirements/requirements_parler.txt
    conda clean --all --force-pkgs-dirs -y
```
gradio使わないし、deepspeedもcomfyuiとの兼ね合いで使うバージョンが変わるはず。
parlerの中身はparler_ttsを使うための物っぽい？

また、alltalk_ttsの実行時に使うstart_alltalk.shもこの時生成される。

```sh
#!/bin/bash
source "${CONDA_ROOT_PREFIX}/etc/profile.d/conda.sh"
conda activate "${INSTALL_ENV_DIR}"
python script.py
```

見ての通りなので、python script.pyさえ実行できれば何とか。

sedでcolabのとこ切り取ってようやく動くが、モデルの入れ方が分からない……

## vits
モデルアーキテクチャ。

## piper
onnxに変化させたvitsモデルを上手く使うためのエンジン。

## parler
完全オープンソースモデル。

## xtts
多言語多話者対応TTS。
重い。

[Perplexity](https://www.perplexity.ai/search/parler-piper-xtts-vitswojing-d-xLMxwJ3HTUGXc_VMntzWdw)




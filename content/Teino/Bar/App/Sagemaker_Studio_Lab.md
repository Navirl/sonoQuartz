---
date: 2024-05-06
tags:
  - Bar
---

up:: [Python](<../Program/Python.md>)

Amazonが手掛けるColab競合。

## 初期化
Colabと違って時間が来ても自動では消さない。
中身はcondaなので手動でconda環境とファイルの消去を行う。

`conda env list`
`conda activate base`
`conda remove --name <ENVIRONMENT_NAME> --all`
`rm -rf *.*`

[環境を管理する - Amazon SageMaker](https://docs.aws.amazon.com/ja_jp/sagemaker/latest/dg/studio-lab-use-manage.html)

全部のconda環境を消せばより初期化できるらしい。

[SageMaker Studio Labの環境をリセットする AWS - Qiita](https://qiita.com/kanuazut/items/68d1deeff5fd05a8ce85)
[Allow to reset the entire environment of Studio Lab · Issue 75 · aws/studio-lab-examples · GitHub](https://github.com/aws/studio-lab-examples/issues/75#issuecomment-1326660232)
[SageMaker Studio Lab](https://studiolab.sagemaker.aws/faq)

## 環境追加
ファイルに対してカーネルという名前でconda環境をアタッチできる。
`conda create  --name <my-env>`でconda環境を作り`conda install ipykernel`で出る。
`conda create  --name <my-env> python=<version>`とするとpythonバージョンを変更できる。デフォ環境が3.9なのでほぼ必須。

[Managing environments — conda 25.5.1.dev10 documentation](https://docs.conda.io/projects/conda/en/latest/user-guide/tasks/manage-environments.html)

## 複数起動
kernelは出来るだけ単体で起動したほうが良いっぽい。
固まる。
ipynbを開くと自動でkernelがアタッチされてしまうので注意。

## /tmp
一時ファイル置き場としているが、物によっては**スワップ領域**に使われているらしい。
体感重いファイルをたくさん置くとwebuiが落ちやすい。

[/tmpと/var/tmpの仁義無き戦い Ruby - Qiita](https://qiita.com/kuni-nakaji/items/f29be14be578b5a19d4b)

## 限界
/tmpに置いていれば永続領域は使われないが、そもそも/の限界が50GBしかないっぽい。
SDXLモデルを二個置くと終わるので注意。

comfyuiだと、拡張機能がpythonライブラリに新しく追加してくるせいで25GBを使い果たす。
必要な物だけ見極めないと終わる。

定期的に~/.cacheを消さないと容量限界になる。
## version
多分変わるので仮。

`nvcc -V`
11.8

`cat /etc/issue`
ubuntu 20.04

pipでtorchが121でも動くのは一緒にcudaをインストールしてるから。
[Google ColabのGPU環境でGPU版torchとGPU版mxnetの動作確認をしてみた。  |  ヒノマルクのデータ分析ブログ](https://www.hinomaruc.com/check-torch-and-mxnet-on-google-colab-gpu/#toc6)
[Amazon Sagemaker Studio Lab (GPU runtime)の各種情報を確認  |  ヒノマルクのデータ分析ブログ](https://www.hinomaruc.com/check-info-of-amazon-sagemaker-studio-lab-gpu-runtime/)

## cache clean
`pip cache purge`
`conda clean -a`


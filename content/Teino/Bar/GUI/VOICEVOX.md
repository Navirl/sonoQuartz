---
date: 2023-10-17
tags:
  - Bar
---

up::

実は起動中ずっとHttpサーバーが起動している音声合成ソフト。

/audio_queryで情報生成→
情報をjson化→
jsonを操作して設定→
/synthesisに情報を投げて音声合成、というステップを踏む。

curlやpythonからrequestsでも呼べる。

```python
 # 音声を生成するテキスト
                    host = 'localhost'
                    port = 50021
                    filepath=str(pathlib.Path('./audio.wav').resolve())

                    params = (
                        ('text', row[1]),
                        ('speaker', captiondata["styleid"])
                    )
                    
                    # 音声合成用の情報を引き出す
                    response1 = requests.post(
                        f'http://{host}:{port}/audio_query',
                        params=params
                    )

                    resjson = response1.json()
                    resjson["speedScale"] = captiondata["speed"] / 100.0
                    resjson["pitchScale"] = captiondata["pitch"] / 100.0
                    resjson["intonationScale"] = captiondata["intonation"] / 100.0
                    resjson["postPhonemeLength"] = captiondata["atime"]

                    # 音声合成
                    response2 = requests.post(
                        f'http://{host}:{port}/synthesis',
                        params=params,
                        data=json.dumps(resjson)
                    )

                    # レスポンスから音声ファイル（wav）を取得し保存
                    with open(filepath, "wb") as f:
                        f.write(response2.content)
```

- 喘ぎを作るなら前後に余計な音を入れて長さを0にするとそれっぽい
	- 息を吸わせたいなら「あ」とかを一番後ろに入れて長めにとる
	- かすれた「あ」は一番初めに入れて短めにすればいい

[voicevox 自動化](<../../Info/voicevox 自動化.md>)
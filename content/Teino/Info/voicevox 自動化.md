---
date: 2025-01-15
tags:
  - Info
---

up:: [VOICEVOX](<../Bar/GUI/VOICEVOX.md>)

以下のような形式のファイル(.lab)を読み込み、任意のライブラリを使用し変数parent_phonemesに保管する。各行はスペース区切りで別々に保存され、それぞれの値を取り出せるようにすること。ラベルは左から'start_time','stop_time','phoneme'である。

```lab
0 1000000 pau
1000000 1478165 m 
1478165 2557682 a
2557682 4217663 i
4217663 5217663 pau
```

別のlabファイルから同じく行をchild_phonemesに格納し、child_phonemesの長さ分だけparent_phonemesを上からpopしpopped_phonemesに切り出す。(例：child_phnonemesの長さが5,parent_phonemesの長さが12の時、parent_phonemesの0~4を別の配列にカットペーストし、開いた部分は詰めparent_phonemesを上書きする)

popped_phonemesの最後の要素の'stop_time'と、一つ目の要素の'start_time'の差を取得する。この値の1を1/10,000,000秒（0.1マイクロ秒）とし、popped_phonemesの秒数として別変数popped_phonemes_timeに格納する。


以下のようなCSVを読み込み、任意のライブラリを使用し変数scriptsに保管する。各行はコンマ区切りで別々に保存され、それぞれの値を取り出せるようにすること。ラベルは左から'parent_scripts','child_scripts'である。

```csv
皆さん、フィリピンの東で発達中の台風21号コンレイに注目が集まっています。,皆さん、
,フィリピンの東で
,発達中の台風21号
,コンレイに注目が
,集まっています。
```

forを使用しscriptsを回す。parent_scriptsが存在する場合はparent_scriptsをVOICEVOXの音声合成リクエストのテキストとして使用して音声合成用のクエリをjsonで取得する。jsonを整形し以下のようなデータを得てlab_dataとして格納する。

```json
{
    "accent_phrases": [
        {
            "moras": [
                {
                    "text": "テ",
                    "consonant": "t",
                    "consonant_length": 0.08552828431129456,
                    "vowel": "e",
                    "vowel_length": 0.13219471275806427,
                    "pitch": 5.931338787078857
                },
                {
                    "text": "ス",
                    "consonant": "s",
                    "consonant_length": 0.055372677743434906,
                    "vowel": "U",
                    "vowel_length": 0.08552838861942291,
                    "pitch": 0.0
                },
                {
                    "text": "ト",
                    "consonant": "t",
                    "consonant_length": 0.0787569209933281,
                    "vowel": "o",
                    "vowel_length": 0.22924017906188965,
                    "pitch": 5.722853660583496
                }
            ],
            "accent": 1,
            "pause_mora": null,
            "is_interrogative": false
        }
    ],
    "speedScale": 1.0,
    "pitchScale": 0.0,
    "intonationScale": 1.0,
    "volumeScale": 1.0,
    "prePhonemeLength": 0.1,
    "postPhonemeLength": 0.1,
    "pauseLength": null,
    "pauseLengthScale": 1.0,
    "outputSamplingRate": 24000,
    "outputStereo": false,
    "kana": "テ'_スト"
}
```

整形後データ
```
0 1000000 pau
1000000 1855283 t
1855283 3177230 e
3177230 3730957 s
3730957 4586241 u
4586241 5373810 t
5373810 7666212 o
7666212 8666212 pau
```




typescriptを使用し、以下のjsonを整形・計算し整形後データを取得するアプリを作成してください。
その後、任意のjsonを入力できるようにGUIを作成してください。

```json
{
    "accent_phrases": [
        {
            "moras": [
                {
                    "text": "テ",
                    "consonant": "t",
                    "consonant_length": 0.08552828431129456,
                    "vowel": "e",
                    "vowel_length": 0.13219471275806427,
                    "pitch": 5.931338787078857
                },
                {
                    "text": "ス",
                    "consonant": "s",
                    "consonant_length": 0.055372677743434906,
                    "vowel": "U",
                    "vowel_length": 0.08552838861942291,
                    "pitch": 0.0
                },
                {
                    "text": "ト",
                    "consonant": "t",
                    "consonant_length": 0.0787569209933281,
                    "vowel": "o",
                    "vowel_length": 0.22924017906188965,
                    "pitch": 5.722853660583496
                }
            ],
            "accent": 1,
            "pause_mora": null,
            "is_interrogative": false
        }
    ],
    "speedScale": 1.0,
    "pitchScale": 0.0,
    "intonationScale": 1.0,
    "volumeScale": 1.0,
    "prePhonemeLength": 0.1,
    "postPhonemeLength": 0.1,
    "pauseLength": null,
    "pauseLengthScale": 1.0,
    "outputSamplingRate": 24000,
    "outputStereo": false,
    "kana": "テ'_スト"
}
```

整形後データ
```
0 1000000 pau
1000000 1855283 t
1855283 3177230 e
3177230 3730957 s
3730957 4586241 u
4586241 5373810 t
5373810 7666212 o
7666212 8666212 pau
```

以下は参考のコードです。

```
import { AccentPhrase, MoraData } from './types';

function formatAccentPhrase(accentPhrase: AccentPhrase): string {
  let result = '';
  for (const mora of accentPhrase.moras) {
    const start = Math.round(mora.consonant_length * 1000000);
    const end = Math.round((mora.consonant_length + mora.vowel_length) * 1000000);
    result += `${start} ${end} ${mora.text}\n`;
  }
  return result.trim();
}

function calculateTotalDuration(accentPhrases: AccentPhrase[]): number {
  let totalDuration = 0;
  for (const phrase of accentPhrases) {
    for (const mora of phrase.moras) {
      totalDuration += mora.consonant_length + mora.vowel_length;
    }
    if (phrase.pause_mora) {
      totalDuration += phrase.pause_mora.vowel_length;
    }
  }
  return totalDuration * 1000000;
}

function processData(data: any): { formattedData: string; totalDuration: number } {
  const accentPhrases = data.accent_phrases as AccentPhrase[];
  const formattedData = accentPhrases.map(formatAccentPhrase).join('\n');
  const totalDuration = calculateTotalDuration(accentPhrases);
  return { formattedData, totalDuration };
}

// Example usage
const inputData = {
  // ... your input JSON data
};

const { formattedData, totalDuration } = processData(inputData);
console.log(formattedData);
console.log(`Total duration: ${totalDuration} microseconds`);
```
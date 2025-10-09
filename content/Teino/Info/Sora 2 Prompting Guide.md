---
date: 2025-10-09
time: 11:58
tags:
 - Info
---

up:: [AI_movie](<../Bar/AI/AI_movie.md>)

[Sora 2 Prompting Guide \| OpenAI Cookbook](https://cookbook.openai.com/examples/sora/sora2_prompting_guide#api-parameters)
[Sora 2 プロンプトガイド｜npaka](https://note.com/npaka/n/n754187f14a03)

proがある。解像度は最初に規定する。

クリップ長さは4,8,12。デフォルトは4。
短い方が指示に忠実。

- 全体スタイル
- フォーマット、ルック
- カメラ設定
- グレーディング（光や影の程度）
- サウンド
- wardrobe（衣装）
- ショットリスト
    - 秒数に基づくものを含む
- なぜそう撮るか
- フレーミング、カメラ向き

などなどを指定できる。マークダウンもいらない、自然言語。

```
Format & Look
Duration 4s; 180° shutter; digital capture emulating 65 mm photochemical contrast; fine grain; subtle halation on speculars; no gate weave.

Lenses & Filtration
32 mm / 50 mm spherical primes; Black Pro-Mist 1/4; slight CPL rotation to manage glass reflections on train windows.

Grade / Palette
Highlights: clean morning sunlight with amber lift.
Mids: balanced neutrals with slight teal cast in shadows.
Blacks: soft, neutral with mild lift for haze retention.

Lighting & Atmosphere
Natural sunlight from camera left, low angle (07:30 AM).
Bounce: 4×4 ultrabounce silver from trackside.
Negative fill from opposite wall.
Practical: sodium platform lights on dim fade.
Atmos: gentle mist; train exhaust drift through light beam.

Location & Framing
Urban commuter platform, dawn.
Foreground: yellow safety line, coffee cup on bench.
Midground: waiting passengers silhouetted in haze.
Background: arriving train braking to a stop.
Avoid signage or corporate branding.

Wardrobe / Props / Extras
Main subject: mid-30s traveler, navy coat, backpack slung on one shoulder, holding phone loosely at side.
Extras: commuters in muted tones; one cyclist pushing bike.
Props: paper coffee cup, rolling luggage, LED departure board (generic destinations).

Sound
Diegetic only: faint rail screech, train brakes hiss, distant announcement muffled (-20 LUFS), low ambient hum.
Footsteps and paper rustle; no score or added foley.

Optimized Shot List (2 shots / 4 s total)

0.00–2.40 — “Arrival Drift” (32 mm, shoulder-mounted slow dolly left)
Camera slides past platform signage edge; shallow focus reveals traveler mid-frame looking down tracks. Morning light blooms across lens; train headlights flare softly through mist. Purpose: establish setting and tone, hint anticipation.

2.40–4.00 — “Turn and Pause” (50 mm, slow arc in)
Cut to tighter over-shoulder arc as train halts; traveler turns slightly toward camera, catching sunlight rim across cheek and phone screen reflection. Eyes flick up toward something unseen. Purpose: create human focal moment with minimal motion.

Camera Notes (Why It Reads)
Keep eyeline low and close to lens axis for intimacy.
Allow micro flares from train glass as aesthetic texture.
Preserve subtle handheld imperfection for realism.
Do not break silhouette clarity with overexposed flare; retain skin highlight roll-off.

Finishing
Fine-grain overlay with mild chroma noise for realism; restrained halation on practicals; warm-cool LUT for morning split tone.
Mix: prioritize train and ambient detail over footstep transients.
Poster frame: traveler mid-turn, golden rim light, arriving train soft-focus in background haze.
```

全体スタイルは強力。先に決めて置くこと推奨。
予測不可能。アドリブを楽しむ。

画像入力も可能。

会話も可能。話者には一貫したラベルを付ける。

遠くの車の騒音などで、歩き方を示唆できる
サウンドトラックではなく、リズムの合図

動画入力も可能。リミックス。

説明的簡易テンプレート
```
[Prose scene description in plain language. Describe characters, costumes, scenery, weather and other details. Be as descriptive to generate a video that matches your vision.]

Cinematography:
Camera shot: [framing and angle, e.g. wide establishing shot, eye level]
Mood: [overall tone, e.g. cinematic and tense, playful and suspenseful, luxurious anticipation]

Actions:
- [Action 1: a clear, specific beat or gesture]
- [Action 2: another distinct beat within the clip]
- [Action 3: another action or dialogue line]

Dialogue:
[If the shot has dialogue, add short natural lines here or as part of the actions list. Keep them brief so they match the clip length.]
```
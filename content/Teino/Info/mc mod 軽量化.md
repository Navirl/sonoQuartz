---
tags:
  - Info
---

daily:: [2025-01-17](../Daily_Note/2025-01-17.md)
up:: [minecraft](<../Bar/App/minecraft.md>)

というか描画設定を充実させる奴。

## 結論
ForgeならEmbeddium、Embeddium++、Canaryを入れればたぶんいい。
追加でDynamic FPS、Clumps、Ferrite Core。


[【マイクラ】おすすめの軽量化MOD \| 1.21.1対応最新版｜yumu](https://note.com/yumu25/n/n23dc11607eda)
[\[minecraft\] 軽量化MODまとめメモ \[1.16.5～1.21\] - minecraft](http://kannatsuki0514.blog.fc2.com/blog-entry-567.html)

他の結論。
[MC-Optimization-Guide/mods-n-stuff/1.20.1.md at main · Radk6/MC-Optimization-Guide · GitHub](https://github.com/Radk6/MC-Optimization-Guide/blob/main/mods-n-stuff/1.20.1.md)


## Optifine
昔の。クローズドソースなので人気は無い。

## [Sodium - Minecraft Mod](https://modrinth.com/mod/sodium)
Fabric、NeoForge、Quilt。RubidiumのFork。

### [Iris Shaders - Minecraft Mod](https://modrinth.com/mod/iris)
シェーダーが入れられる。

### [Sodium Extra - Minecraft Mod](https://modrinth.com/mod/sodium-extra)
パーティクルや霧の設定を追加。

### [Reese's Sodium Options - Minecraft Mod](https://modrinth.com/mod/reeses-sodium-options)
設定を見やすく。
たいていこっちが入っている。

### [Lithium - Minecraft Mod](https://modrinth.com/mod/lithium)
汎用最適化。マルチの場合はサーバー側に置くだけで効果がある。
軽量化。物理、モブAI、ティックなどを改善。
speedrun.comでも許可されている。


## [Embeddium - Minecraft Mods - CurseForge](https://www.curseforge.com/minecraft/mc-mods/embeddium)
Forge、Fabric、NeoForge。SodiumのFork。
Reese枠は同梱。

### [Embeddium++ - Minecraft Mod](https://modrinth.com/mod/embeddiumplus)
Embeddiumの追加。
エンティティカリング、ボーダレスフルスクリーン、ベッドとチェストの最適化、JEIのレンダリング無効（検索するまで）など。
割と他modと被ってることも多いので確認。

### [Oculus - Minecraft Mods - CurseForge](https://www.curseforge.com/minecraft/mc-mods/oculus)
Iris枠。Embeddiumだけでいい？

### [Embeddium (Rubidium) Extra - Minecraft Mods - CurseForge](https://www.curseforge.com/minecraft/mc-mods/rubidium-extra)
Sodium Extra枠。

### [Canary - Minecraft Mods - CurseForge](https://www.curseforge.com/minecraft/mc-mods/canary)
LithiumのForge用Fork。

### [Radium Reforged - Minecraft Mods - CurseForge](https://www.curseforge.com/minecraft/mc-mods/radium-reforged)
CanaryのFork。1.19.2-0.8.2は職業でバグるらしい。
[【メモ】のんびり琴葉開拓記 導入Mod一覧 MC1.19.2 - #23頃～｜RakuGaki(楽餓鬼)](https://note.com/rakugaki_rami/n/ne1f40df53272)

## Rubidium
昔の。開発が2023年で止まった。

## [VulkanMod - Minecraft Mod](https://modrinth.com/mod/vulkanmod)
Fabric。OpenGLをVulkanに代える。
互換性は低いがそれだけの威力がある。
[【マイクラ】おすすめの軽量化MOD【検証編】｜yumu](https://note.com/yumu25/n/n6532a5c9afb5)

## [Clumps - Minecraft Mod](https://modrinth.com/mod/clumps)
経験値を纏める。

## [Dynamic FPS - Minecraft Mod](https://modrinth.com/mod/dynamic-fps)
バックグラウンド、または無操作時のFPSを下げる。

## [Entity Culling - Minecraft Mod](https://modrinth.com/mod/entityculling)
見えないエンティティを非表示。

## [ImmediatelyFast - Minecraft Mod](https://modrinth.com/mod/immediatelyfast)
レンダリング方法の改善。

## [ModernFix - Minecraft Mod](https://modrinth.com/mod/modernfix)
オールインワン軽量化。細かい問題の修正。
[1.19.2 Summary of Patches · embeddedt/ModernFix Wiki · GitHub](https://github.com/embeddedt/ModernFix/wiki/1.19.2-Summary-of-Patches)

## [FerriteCore - Minecraft Mod](https://modrinth.com/mod/ferrite-core)
メモリの最適化。

## [Starlight (Forge) - Minecraft Mods - CurseForge](https://www.curseforge.com/minecraft/mc-mods/starlight-forge)
ライトエンジンを完全に書き換える侵襲的mod。
Fabric版は別。
[Starlight (Fabric) - Minecraft Mods - CurseForge](https://www.curseforge.com/minecraft/mc-mods/starlight)
[Fetching Title#snzm](https://www.reddit.com/r/admincraft/comments/nwc0qk/phosphor_or_starlight/)

## [Phosphor (Fabric) - Minecraft Mods - CurseForge](https://www.curseforge.com/minecraft/mc-mods/phosphor)
ライトエンジンを最適化する。

## [Radon - Minecraft Mods - CurseForge](https://www.curseforge.com/minecraft/mc-mods/radon)
PhosphorのForge版。

## [GitHub - ferriarnus/acedium: Fast minecraft rendering backend for embeddium (nvidia only)](https://github.com/ferriarnus/acedium)
メッシュシェーダー機能搭載のNvidiaカードで実行を早くする。
これはDirectX 12 Ultimateの機能っぽい。対応してるかはWin+Gで確認できる。
[DirectX 12 Ultimate for Holiday 2020 - DirectX Developer Blog](https://devblogs.microsoft.com/directx/directx-12-ultimate-for-holiday-2020/)

## [Saturn - Minecraft Mod](https://modrinth.com/mod/saturn)
メモリ最適化。202405で止まってる。

## [Smooth Boot (Reloaded) - Minecraft Mod](https://modrinth.com/mod/smooth-boot-reloaded)
ロード中にCPUが使用されすぎる問題の解決。202401。

## [Memory Leak Fix - Minecraft Mod](https://modrinth.com/mod/memoryleakfix)
メモリリーク修正。
これ系は沢山ある。

## [AllTheLeaks (Memory Leak Fix) - Minecraft Mods - CurseForge](https://www.curseforge.com/minecraft/mc-mods/alltheleaks)
メモリリーク修正。1.20.1の一番人気。

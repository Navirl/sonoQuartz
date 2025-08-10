[【だれか作って】動画のfpsを動的に下げたり下げなかったりする - work4ai](https://scrapbox.io/work4ai/【だれか作って】動画のfpsを動的に下げたり下げなかったりする)

まずはffmpegで切って繋げてみる。
```powershell
ffmpeg -i test.mp4 -t 00:00:00.733 -r 15 -c:v libx264 -an part1.mp4
ffmpeg -i test.mp4 -ss 00:00:00.733 -to 00:00:01.567 -r 30 -c:v libx264 -an part2.mp4
ffmpeg -i test.mp4 -ss 00:00:01.567 -to 00:00:03.200 -r 15 -c:v libx264 -an part3.mp4
ffmpeg -i test.mp4 -ss 00:00:03.200 -to 00:00:03.833 -r 30 -c:v libx264 -an part4.mp4
ffmpeg -i test.mp4 -ss 00:00:03.833 -r 15 -c:v libx264 -an part5.mp4
ffmpeg -i part1.mp4 -i part2.mp4 -i part3.mp4 -i part4.mp4 -i part5.mp4 -filter_complex "[0:v][1:v][2:v][3:v][4:v]concat=n=5:v=1[v]" -map "[v]" -vsync vfr output_vfr.mp4
pause
```

```powershell
ffmpeg -i test.mp4 -t 00:00:00.733 -vf "fps=15, framestep=2, fps=30:round=down" -vsync 0 -an part1.mp4
ffmpeg -i test.mp4 -ss 00:00:00.733 -to 00:00:01.567 -r 30 -c:v libx264 -an part2.mp4
ffmpeg -i test.mp4 -ss 00:00:01.567 -to 00:00:03.200 -vf "fps=15, framestep=2, fps=30:round=down" -vsync 0 -an part3.mp4
ffmpeg -i test.mp4 -ss 00:00:03.200 -to 00:00:03.833 -r 30 -c:v libx264 -an part4.mp4
ffmpeg -i test.mp4 -ss 00:00:03.833 -vf "fps=15, framestep=2, fps=30:round=down" -vsync 0 -an part5.mp4
ffmpeg -i part1.mp4 -i part2.mp4 -i part3.mp4 -i part4.mp4 -i part5.mp4 -filter_complex "[0:v][1:v][2:v][3:v][4:v]concat=n=5:v=1[v]" -map "[v]" output_cfr.mp4
pause
```

どちらにせよ、背景がガクガクなのでそのままガクガクに見える
実際のアニメがガクガクしないのは、背景はフルコマだから

[コマ落とし](https://dskjal.com/blender/frame-dropping.html)


[フリッカー - yozba](https://scrapbox.io/yozba/フリッカー)
[フリッカー対策](https://dskjal.com/blender/flicker.html)

---

接地（背景との差異）やカメラとのFPS差によって発生する
今は無視

[フリッカー作画の実例整理と、その画の演出的な魅力 : GOMISTATION.Re0325](https://royal2627.ldblog.jp/archives/45058563.html)
[用語だけでは解りにくかったので、アニメの撮影処理を実際の使用例を見せつつまとめてみた（GIFあり） - うさペンの館](https://usapen3.hatenablog.com/entry/2016/12/18/234110)

あえてフリッカーを起こすフリッカー作画というのがあるが、専門的すぎなので無視

---

タメツメを意識しないとぽくならない
接地をもとにカーブでタメツメしたいが、特にツッコミどころが無いので試したほうがよさそう

カーブがあり、y値が0ならフル、1なら3コマ落ち
この発想はカーブ使ってるように見えて結局ステップになる、0-0.3までフルみたいな

ゼンゼロ見る限り、このフレームから何コマ落ちをスライダーで設定するのがいいか。中クリックでスライダー出現、そのあといくつ迄何コマ落ち。

cotrackerやomnimotionが追跡してくれるので、これの合計の長さを出力すれば動きの激しさは取れる
激しいところを1コマ、静かなとこをとりあえず2コマ

動画の前景背景をセグメントとVACE
SAM2をセグメントに使うとして、問題はVACE
ひとまず保留
florence使えばよくない

[GitHub - s9roll7/comfyui\_cotracker\_node](https://github.com/s9roll7/comfyui_cotracker_node?tab=readme-ov-file)

cotrackerのノードはマスクで入力可能
なので画像からマスクでとる→動画と合成で追跡



出力をwanvideo ati tracksに入力できる
でもこれcotrackerの情報を元に新しく動画を生成するためっぽい

ポイント取る→cotで長さ取る→カーブ（ステップ）作成


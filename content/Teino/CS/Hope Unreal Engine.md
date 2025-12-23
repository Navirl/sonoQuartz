#flashcards

## 3Dの画面表示を2Dで取得、使用する
3Dの背後から光、その前面のテクスチャに映る影マップのピクセルを見て、ある一定の閾値でtrue・falseを切り替えられるシステムを作ればいい。

もっと言うと、SceneCaptureからライティングパスだけ取って処理する。

### シャドウマップ
[UE4 Shadow Rendering(影描画)機能入門 - Qiita](https://qiita.com/EGJ-Yutaro_Sawada/items/2a8a1467ebaaa9795fe0)
最も基本的な影では、深度マップに似たシャドウマップというテクスチャを作っている。物体と光源との距離を白黒情報にして保存している。
**この距離より、視点から物体までの距離が長い**場合、そこは影であるとして色を変更している。

[[UE4影取得ヒント]]
### SceneCapture
シーンを撮影し、リアルタイムでストリーミングできるアクタ。
ここからピクセル取って処理する。
ポストプロセスを掛けた状態で出力したいなら、設定内からCaptureSourceを選びFinalColorを選択すれば出来る。
[ESceneCaptureSource | Unreal Engine Documentation](https://docs.unrealengine.com/5.0/en-US/API/Runtime/Engine/Engine/ESceneCaptureSource/)

特定画面で見せないこともできるらしい。
[[UE4] SceneCaptureで取得した映像を全画面に写し、特定のアクターを画面に表示させない方法 | ORENDA](https://orenda.co.jp/blog/2462/)
[[UE4] SceneCaptureで取得した映像を全画面に写し、特定のアクターを画面に表示させない方法 | ORENDA](https://orenda.co.jp/blog/2462/)

元々プレイヤーのカメラと比べてちょっと暗くなる仕様らしく、全く同じにしたいならマテリアルを弄る必要がある。
[UE4使用SceneCapture2D渲染场景到UMG - 知乎](https://zhuanlan.zhihu.com/p/401430467)

### Custom Stencil
[How to Create Masks With the Custom Stencil Buffer | Tips & Tricks | Unreal Engine - YouTube](https://www.youtube.com/watch?v=PiQ_JLJKi0M)
特定の深度IDだけ表示するBuffer。
ここでいうBufferとはZ Bufferみたいに、3Dの絵を構成するバッファのこと。

大事なこと

- UEでは全ての絵が==G Buffer==に送られている


- Bufferは==View Mode==から確認できる


- Custom StencilはPost Effect、そのため==Post Effect Volume==が無いと元の絵に反映されない


- Custom StencilはProject Settingsから==Custom Depth Stencil Path==をEnable with Stencilにしないと使えない(Enableではない)


- Materialの中身の編集が必要なのは==Post Processにくっつけるほう==だけ。実際にCustom Stencilで表示されるほうは機能のオンオフと値変更だけでいい


- カステで表示される方の値は==白黒の色情報==。RGBのRに入ってる。そのため、1と2を区別する場合は全体から1引けば2のほうだけ残る


- 例としてカステだけフルカラーにする場合は、まず==Material DomainをPost Processに==。
	- 次に==SceneTexture==から元の絵（PostProcessInput0）とカステを用意。
	- 元の絵からモノクロ（==Desaturation==）をA、フルカラーをBとして==Linear Interpolation==に入れ、Alphaにカステ（==Mask R==）を入れてEmmissive Colorに入れれば完成。
	- Lerp内ではカステをマスクにし、モノクロ絵Aからマスク部だけフルカラーBを引っ張ってきている。
		- 二つ目以降では1引き、==0以下にならないようClamp==を挟んで安全にしてから、カステ2部分だけ緑を入れている。


おまけ
他のポスプロ
[Learn About Post-Process Effects in Unreal Engine | Webinar - YouTube](https://www.youtube.com/watch?v=aGsUU_bvOgw)

ちなみに、形取るのじゃなく位置だけなら`UGameplayStatics::ProjectWorldToScreen（）`というクリティカル関数があるらしい。
<!--SR:!2022-11-03,121,290-->

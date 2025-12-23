## UE4影取得ヒント
[Are Shadow Maps Locked Down in UE4?? - Rendering - Unreal Engine Forums](https://forums.unrealengine.com/t/are-shadow-maps-locked-down-in-ue4/152699)
```cpp
if (bUsingMaterial)
{
UTextureRenderTarget2D* RenderTarget = UKismetRenderingLibrary::CreateRenderTarget2D(GetWorld(), 256, 256, ETextureRenderTargetFormat::RTF_RGBA8);

UKismetRenderingLibrary::DrawMaterialToRenderTarget(GetWorld(), RenderTarget, ScatterSurface.DistributionMaterial);

ScatterSurface.DistributionTextureSize = 256;

FTextureRenderTarget2DResource* TextureResource = (FTextureRenderTarget2DResource*)RenderTarget->Resource;

TextureResource->ReadPixels(ScatterSurface.DistributionTexture); //TODO Simplify? || Move to own function?
}
```

### UTextureRenderTarget2D
[UTextureRenderTarget2D | Unreal Engine Documentation](https://docs.unrealengine.com/5.0/en-US/API/Runtime/Engine/Engine/UTextureRenderTarget2D/)
レンダリング先にできるテクスチャ。UnityのRenderTextureと同じ。

### UKismetRenderingLibrary
[UKismetRenderingLibrary | Unreal Engine Documentation](https://docs.unrealengine.com/5.0/en-US/API/Runtime/Engine/Kismet/UKismetRenderingLibrary/)
KismetとはUEのデバッギングエンジン。もっと昔はブループリントも担当してたらしい。
UKismetRenderingLibraryではその名の通りレンダリング関係の便利関数が使える。

[Unreal Engine - Wikipedia](https://ja.m.wikipedia.org/wiki/Unreal_Engine)

#### CreateRenderTarget2D
[UKismetRenderingLibrary::CreateRenderTarget2D | Unreal Engine Documentation](https://docs.unrealengine.com/5.0/en-US/API/Runtime/Engine/Kismet/UKismetRenderingLibrary/CreateRenderTarget2D/)
UTextureRenderTarget2Dを生成する。
WorldContextObjectとはレベルのこと。GetWorld()で現在のレベルが取得できる。

[Romero Blueprints++: Understanding the WorldContextObject](https://romeroblueprints.blogspot.com/2021/04/understanding-worldcontextobject.html?m=1)

####  DrawMaterialToRenderTarget
[UKismetRenderingLibrary::DrawMaterialToRenderTarget | Unreal Engine Documentation](https://docs.unrealengine.com/4.26/en-US/API/Runtime/Engine/Kismet/UKismetRenderingLibrary/DrawMaterialToRenderTarget/)
新規RenderTargetにMaterialを適用する。既存も適用できるが重めの処理。
quadって書いてるし、まさかマテリアルくっついた一枚の板ポリを生成するだけの関数……？
複数処理する場合はまた別の関数あり。

### FTextureRenderTarget2DResource
[FTextureRenderTarget2DResource | Unreal Engine Documentation](https://docs.unrealengine.com/4.26/en-US/API/Runtime/Engine/FTextureRenderTarget2DResource/)
FTextureResource型のRenderTargetTexture。
ここの式では、新規作成したUTextureをFTextureに変換し、その中身のResourceにアクセスしてTextureResourceに代入している。

#### ReadPixels


最後にFTextureのReadPixelを呼んで終了。

[[FTextureとUTextureの違い]]
FRenderTargetが持つ関数。
ピクセルをカラーバッファに写す関数、なのだがintしか渡されてないのに動作してたり良う分からん。


[FRenderTarget | Unreal Engine Documentation](https://docs.unrealengine.com/4.26/en-US/API/Runtime/Engine/FRenderTarget/)
[FRenderTarget::ReadPixels | Unreal Engine Documentation](https://docs.unrealengine.com/4.26/en-US/API/Runtime/Engine/FRenderTarget/ReadPixels/)

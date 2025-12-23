---
date: 2021-09-25 13:25:27
tags:
 - App/Unity
 - CheatSheet
---

主にUnity。
[Unity のシェーダの基礎を勉強してみたのでやる気出してまとめてみた - 凹みTips](https://tips.hecomi.com/entry/2014/03/16/233943)
[Unityシェーダーチュートリアル　　Vertex/Fragment Shader の基本 – Tsumiki Tech Times\|積木製作](http://tsumikiseisaku.com/blog/shader-tutorial-vfshader/)
[A gentle introduction to shaders in Unity - Shader tutorial](https://www.alanzucconi.com/2015/06/10/a-gentle-introduction-to-shaders-in-unity3d/)
[Unityでシェーダー描いてみたい - Qiita](https://qiita.com/ShaderError/items/f349110679a9ec47cca9)

## 概形
Unityのシェーダは**ShaderLab**という形式の文書に**Cg/HLSL**という言語を入れることで成り立っている。
まずはコード。

```shaderlab
Shader "MyShader" {
    Properties {
        _MyTexture ("My Texture", 2D) = "white" { }
        // カラーやベクトルなどのプロパティもこの箇所に記述
    }
    SubShader {
        // この箇所に以下の本体を記述
        //  - サーフェイスシェーダ または
        //  - 頂点およびフラグメントシェーダ または
        //  - 固定関数シェーダ
    }
    SubShader {
        // この箇所に、古いグラフィックスカードで実行される、より簡易のバージョンの前述のサブシェーダを記述
    }
}
```

PropertiesにUnityのInspector上で扱う変数、SubShaderにCg/HLSLを書く。

## シェーダの種類
ライトの影響を受けたり、簡単に済ませたいならSurface。
ライティングが要らなかったり、高度なことしたいならVF。
ただ、**SurfaceとVFは共存できない**ことは留意。

### Surface Shader
簡単。ライティングやシャドウも書ける。気にしなきゃいけなくなるともいう。
### Vertex/Fragment Shader
ライティングが関係ない。Surfaceはこれらの簡易版らしい。
### Fixed Function Shader
プログラマブルシェーダをサポートしない古いハード用。
ShaderLabでそのまま記述する。

## CgとHLSL
CgはNVIDIAが開発したシェーダ言語、HLSLはMicrosoftが開発したDirect3D API用のシェーダ言語。といってもHLSLはNVIDIAと共同開発らしく、Cgとほぼ同一らしい。
なんならCgコードは**HLSLでそのまま動く**。

ちなみに、OpenGLベースのAndroid/iOSではGLSLが動いている。このギャップはUnity内でCg/HLSLをGLSLにコンパイルすることで埋めている。
GLSLが良ければGLSLを直接書くことも一応可能らしい。

## データ型
| / | float | half | fixed |
| --- | --- | --- | --- |
| 精度 | 32ビット | 16ビット | 11ビット |
| 主な用途 | ワールド空間位置、スカラー計算 | オブジェクト空間位置、ショートベクトル、HDRカラー | 標準カラー |

float, half, fixedの三種しかない。一応intもあるみたいだけど見たことない。
さらに言うと、**PCではどれでもすべてfloat扱いになる**。なのでこれを使い分けるのはモバイルのため。
当然、モバイル内でもこれらの扱いは分かれており、fixedがhalfと同じ精度として扱われることも多いとか。

型名の後に数字をつけると次元数を指定できる。float3とするとおなじみ3Dベクトルに。
また、float4x4などとすると行列になる。

| / | sampler2D | samplerCUBE |
| --- | --- | --- |
| 慣習名 | _MainTex | _Cubemap |

テクスチャを指定したい場合は**sampler2D**、もしくは**samplerCUBE**を宣言する。慣習でこれらはよく使われる名前がある。

もしHDRが含まれる場合は**sampler2D_half**、深度マップが含まれる場合は**sampler2D_float**などとして精度を上げることもできる。

[シェーダーのデータ型と精度 - Unity マニュアル](https://docs.unity3d.com/ja/2019.4/Manual/SL-DataTypesAndPrecision.html)

## 0除算と最小値
0除算はシェーダーで**定義されていない**。そのため、各端末により結果が変わってしまう。

では0を出さないように気を付ければいいのだが、実はうっかり出してしまう可能性がある。それがデータ型ごとの最小値。

前述したとおりhalfはfloatよりも値の表現範囲が狭いのだが、これは**予想よりもかなり狭い。** これをはみ出ると**アンダーフローにより0になる。**

- float
	- 正規化: 約$1.18×10^{−38}$
	- 非正規化: 約$1.40×10^{−45}$
- half
	- 正規化: 約$6.10×10^{−5}$
	- 非正規化: 約$5.96×10^{−8}$

大体$10^{-30}$もの差がある。
これがどれだけやばいかというと、pow(0.37, 10)くらいで$4.809x10^{-5}$となりアンダーフローを起こしてしまうほど。端末依存バグが起きたらまずこれを疑おう。

[シェーダでは浮動小数点のアンダーフローを意識しないと端末依存バグが起こるよって話 - LIGHT11](https://light11.hatenadiary.com/entry/2020/02/28/195056)

## \#pragma
コンパイラディレクティブ。何として何をコンパイルするかを設定できる。
普段は`#pragma fragment frag`などとして関数をシェーダー内部扱いにするが、他にもあるレンダラー(ここではDirect3Dやvulkan、ps4などのことを指す)にはコンパイルしないようにしたりとかいろいろできる。

[頂点シェーダーとフラグメントシェーダーの記述 - Unity マニュアル](https://docs.unity3d.com/ja/2018.4/Manual/SL-ShaderPrograms.html)

## struct
構造体。これを\#pragmaで指定した関数に突っ込むことで値を纏めて扱える。

## セマンティクス
:POSITIONや:COLORといったもの。変数に付けるタグ。
例えば`float4 v:POSITION`とすれば、vを**頂点モデルに対するローカル位置座標**として扱える。
this.gameObjectみたいにすでにUnity上にある情報を参照したいときに付ける。なお、スクリーン座標なども取れる模様。関数はこれで情報を突っ込まないと変更してくれないので必須。

関数の出力に付けたいなら、
```subshader
float4 vert(float4 v:POSITION) : SV_POSITION {
	return mul (UNITY_MATRIX_MVP, v);
}
```
などとして、**()の後ろに付けること。**

プリセットはこちら。

**頂点シェーダへの入力**

| Type(s) |    Tag    |         Notes        |
|:-------:|:---------:|:--------------------:|
| float4  | POSITION  | モデルのローカル座標 |
| float3  | NORMAL    | 法線                 |
| float4  | TEXCOORD0 | UV座標               |
| float4  | TEXCOORD1 | ２つめのUV座標       |
| float4  | TANGENT   | 接線                 |
| float4  | COLOR     | 色                   |

**フラグメントシェーダへの入力（頂点シェーダの出力）**

|     Type(s)    |     Tag     |              Description             |
|:--------------:|:-----------:|:------------------------------------:|
| float4         | SV_POSITION | MVP 変換後の座標                     |
| float3         | NORMAL      | MVP 変換後の法線                     |
| float4         | TEXCOORD0   | 1番目のテクスチャの UV 座標          |
| float4         | TEXCOORD1   | 2番目のテクスチャの UV 座標          |
| float4         | TANGENT     | 接線                                 |
| float4, fixed4 | COLOR0      | 線形補間された色                     |
| float4, fixed4 | COLOR1      | 線形補間された色（1とは何が違う？？) |
| Any            |             | タグを持たない何でも良い値           |

めんどいなら、structでまとめて定義しておいて呼び出せば問題なく使える。
その補助用に`#include "UnityCG.cginc"`みたいなもんもあったりする。インクルードするだけでいろんなヘルパ関数が使える。

## Tags
いつどのようにしてレンダリングエンジンでレンダリングするのか決める、Key-Value形式の構文ブロック。Pass内とSubShader内に書くものがあるが、大体SubShaderで済んでる。
書くのは**CGPROGRAMより前。**

[ShaderLab: SubShader 内のタグ - Unity マニュアル](https://docs.unity3d.com/ja/current/Manual/SL-SubShaderTags.html)


[Unity - Shaderを勉強する - Qiita](https://qiita.com/ShirakawaMaru/items/5d6d8bad041c835f858a)

## UVスクロール
float4で定義済みの_Timeを使う。

[Unity Shaderの基礎 part 2 - Qiita](https://qiita.com/kaiware007/items/ffe7c546bc71136cf8da#%E3%83%86%E3%82%AF%E3%82%B9%E3%83%81%E3%83%A3%E3%82%92uv%E3%82%B9%E3%82%AF%E3%83%AD%E3%83%BC%E3%83%AB%E3%81%95%E3%81%9B%E3%81%A6%E3%81%BF%E3%82%8B)


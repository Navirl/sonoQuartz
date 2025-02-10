---
date: 2022-08-03
tags:
 - Info
---

up:: [UE5.0.2](<../Bar/App/UE5.0.2.md>)
source:: [c# - How to find closest point on line? - Stack Overflow](https://stackoverflow.com/questions/51905268/how-to-find-closest-point-on-line)

```csharp
public Vector2 FindNearestPointOnLine(Vector2 origin, Vector2 direction, Vector2 point)
{
    direction.Normalize();
    Vector2 lhs = point - origin;

    float dotP = Vector2.Dot(lhs, direction);
    return origin + direction * dotP;
}
```

中身がどうなってるのか。
目的はoriginを通るベクトルdirection上にある、pointからの最短距離ポイントtを取ること。

まず、後のためにdirectionベクトル$\overrightarrow{D}$をnormalize。$\overrightarrow{D'}$とする。
次にoriginからpointへ$\overrightarrow{OP}$を引く。
そして$\overrightarrow{OP}$と$\overrightarrow{D'}$でドット積。これは$\overrightarrow{OP}$に$\overrightarrow{D'}$への写像ベクトル$\overrightarrow{OP'}$を掛けた値。

![Drawing 2022-08-06 22.29.47.excalidraw](<../Excalidraw/Drawing 2022-08-06 22.29.47.excalidraw.md>)

ここで、$\overrightarrow{OP'}$はoriginからtへのベクトル$\overrightarrow{Ot}$と等しい。
また、$\overrightarrow{Ot}$に原点からoriginへのベクトル$\overrightarrow{原O}$を加えると、tの座標$\overrightarrow{原t}$と等しくなる。

よって、$\overrightarrow{OP'}$を算出すればいい。
$\overrightarrow{OP'}$は$\overrightarrow{OP}cos\theta$で、$cos\theta$はドット積を変形して$\dfrac{\overrightarrow{OP}\cdot\overrightarrow{D'}}{|\overrightarrow{OP}||\overrightarrow{D'}|}$なので、計算式は

$\overrightarrow{原O}+\overrightarrow{OP}\dfrac{\overrightarrow{OP}\cdot\overrightarrow{D'}}{|\overrightarrow{OP}||\overrightarrow{D'}|}$


$=\overrightarrow{原O}+\overrightarrow{OP}\cdot\overrightarrow{D'}$

となり、コードと一致する。
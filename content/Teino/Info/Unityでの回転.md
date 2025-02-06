---
tags:
 - Info
---

daily:: [2021-08-07.](Daily_Note/2021-08-07..md)
up:: [Unity](Bar/App/Unity.md)


[クォータニオン](Info/クォータニオン.md)
## 基本

**VectorにQuaternionを掛けると回転する**。
その例として、transform.upというローカル座標の上は、`transform.rotation * Vector3.up`で表せる。transform.rotationというクォータニオン**に**ワールド座標unの上であるVector3.upを掛けると回転し、ローカル座標の上になる。

**クォータニオン同士を掛けると、それぞれの角度の合計値になる。**

ちなみに、Unityの座標系は一般の右手系(x,y,zが右,上,手前)ではなく、左手系(右上**奥**)なので、時計回りが正の向きになる。

なおUnityでは大体回転を表す値であるtransform.rotationに直接代入して回転してる。

## 作成
### Quaternion.AngleAxis (float angle, Vector3 axis)
クォータニオンを作るメソッド。
axisで指定した軸をもとに、angle分だけ回転したクォータニオンを作ることが出来る。
よく使うaxisはこれら。
-   **Vector3.right（x軸を指定したい場合）**
-   **Vector3.up（y軸を指定したい場合）**
-   **Vector3.forward（z軸を指定したい場合）**

[Quaternion-AngleAxis - Unity スクリプトリファレンス](https://docs.unity3d.com/ja/current/ScriptReference/Quaternion.AngleAxis.html)

### transform.rotation
オブジェクトの姿勢がQuaternionで入っている変数。
上記のQuaternion.AngleAxisと合わせ、**回したい角度分のクォータニオン x transform.rotation**をもう一度transform.rotationに代入すれば回る。

[Transform-rotation - Unity スクリプトリファレンス](https://docs.unity3d.com/ja/2019.4/ScriptReference/Transform-rotation.html)

###  Quaternion.Euler (float x, float y, float z)
クォータニオンをオイラー角から作るメソッド。
**z軸、x軸、y軸の順で回転する。**

[Quaternion-Euler - Unity スクリプトリファレンス](https://docs.unity3d.com/jp/current/ScriptReference/Quaternion.Euler.html)

### Quaternion FromToRotation (Vector3 fromDirection, Vector3 toDirection)
fromからtoへの回転クォータニオンを作るメソッド。
思った回転になるかどうかは別。

[Unity - Scripting API: Quaternion.FromToRotation](https://docs.unity3d.com/ScriptReference/Quaternion.FromToRotation.html)

### Quaternion LookRotation(Vector3 forward, Vector3 upwards = Vector3.up)
forward方向を正面とするクォータニオンを作るメソッド。
回転を作るというより、**Vector3を姿勢クォータニオンに変換するメソッド。**

[Unity - Scripting API: Quaternion.LookRotation](https://docs.unity3d.com/ScriptReference/Quaternion.LookRotation.html)


## 変換
### 合成
`*`演算子を使用することで、クォータニオンを合成できる。
**後に回転させる方を先に書く。**

## transform.eularAngle
オブジェクトの姿勢がVector3で入っている変数。
.x,y,zでそれぞれ取り出せる。
ローカル座標で取り出したいなら.localEularAngle。
どちらにせよ、Vector3を代入すると回転する。

## transform.Rotate(float,float,float,Space)
transform.eularAngleに対して数値を加算できるメソッド。デフォルトでローカル座標回転。
第4引数にSpace.Worldを指定するとワールド座標で回転する。

[【Unity】回転の方法が一目でわかる !transform.Rotateを極めよう! \| 侍エンジニアブログ](https://www.sejuku.net/blog/51521)

## transform.LookAt(Transform target, Vector3 worldUp = Vector3.up)
指定したtransformの方向に向くメソッド。
簡単な回転ならこれで問題ない。
第二引数は上向きがどちらなのか指定する引数。

[Unity - Scripting API: Transform.LookAt](https://docs.unity3d.com/ScriptReference/Transform.LookAt.html)


[【Unity】 Quaternionの使い方 - エフアンダーバー](https://www.f-sp.com/entry/2017/08/30/171353)
[【Unity】Quaternionでオブジェクトを回転させる方法 – XR-Hub](https://xr-hub.com/archives/11515)
[UnityのベクトルとQuaternionによる回転について - テラシュールブログ](https://tsubakit1.hateblo.jp/entry/2014/08/02/030919)
[Unityでオブジェクトを指定の方向に向ける - Qiita](https://qiita.com/broken55/items/33ac4ab55744b2e5e562)
[【Unity】オブジェクトをターゲットの方向に回転させる \| ねこじゃらシティ](https://nekojara.city/unity-look-at)
[Unityでオブジェクトを回転させる方法まとめ \| tama-lab](https://tama-lab.net/2017/06/unity%E3%81%A7%E3%82%AA%E3%83%96%E3%82%B8%E3%82%A7%E3%82%AF%E3%83%88%E3%82%92%E5%9B%9E%E8%BB%A2%E3%81%95%E3%81%9B%E3%82%8B%E6%96%B9%E6%B3%95%E3%81%BE%E3%81%A8%E3%82%81/)
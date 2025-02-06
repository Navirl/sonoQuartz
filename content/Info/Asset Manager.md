---
tags:
 - Info
---

daily:: [2022-07-15](Daily_Note/2022-07-15.md)
up:: [UE5.0.2](<../Bar/App/UE5.0.2.md>)
source:: [Asset Management | Unreal Engine ドキュメント](https://docs.unrealengine.com/4.27/ja/ProductionPipelines/AssetManagement/)
source:: [UE4 アセットマネージメントフレームワークについて - Let's Enjoy Unreal Engine](https://unrealengine.hatenablog.com/entry/2017/08/24/235153)

アセット(コンテンツブラウザ内のオブジェクト)のロード・アンロードを制御する最適化用機能。

まず、アセットマネージャーという機能があり、そこではアセットは**Primary Assets**と**Secondary Assets**の二種類に分けられる。

Primaryは**アセットマネージャーから直接操作できるアセット**。Primary Assets IDを指定することで直接読める。Secondaryは**操作できないアセット**。Primaryに紐づいているアセット。Primaryが参照を持っているなら、その対象はSecondaryになる。

アセットマネージャーはアセット管理のためのシングルトンクラス。
ストリームマネージャーという非同期読み込みの仕組みがラップされている。

Primaryには**アセットバンドル**という、特定アセットの名前付きリストが関連付けられる。
特定アセットとはSecondaryなどのこと。C++でのみ直作成可能。

デフォルトではUWorldだけがPrimary。SecondaryをPrimaryにするにはGetPrimaryAssetIdをオーバーライドしてFPrimaryAssetsId構造体を返せばいい。

PrimaryAssetIdはアセットタイプと名前で構成される。


Primary Assetにアクセスするなら、名前にClassを含む関数を使用する。
インスタンス化が必要ないなら、UPrimaryDataAssetを継承することでデータ専用ブループリントを作成できる。



で、実際に使うには。
Project Settings→Asset Managerから登録するか、Primary Data Assetをコンテンツブラウザーから作成してアセットを登録するか。
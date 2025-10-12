---
date: 2022-07-15
tags:
 - Info
---

up:: [Unreal\_Engine](<../Bar/GUI/Unreal_Engine.md>)
up:: [Cpp](<../Bar/Program/Cpp.md>)
source:: [いまさら聞きづらいUPROPERTY・UFUNCTION – 株式会社ロジカルビート](https://logicalbeat.jp/blog/8212/)
source:: [Unreal Engine の UFunction | Unreal Engine ドキュメント](https://docs.unrealengine.com/5.0/ja/ufunctions-in-unreal-engine/)

どれもヘッダで。

## UPROPERTY

source:: [UE4 よく使うUPROPERTYメモ - Qiita](https://qiita.com/bigengelt/items/b17545fffe7b8d69e5e8)
source:: [Unreal Engine UProperty Specifiers | Unreal Engine ドキュメント](https://docs.unrealengine.com/5.0/ja/unreal-engine-uproperty-specifiers/)

変数の公開範囲をレベルエディタ、ブループリントなどの単位で指定できる。
配列要素数の変更禁止なんかもできる。
今はFProperty推奨。

また、メタデータ指定子というものでエディタ上の動作も制御できるらしい。

### VisibleAnywhere
レベルの詳細タブとブループリントの両方で表示を許可する。

### EditDefaultsOnly
ブループリントでの編集を許可する。

### BlueprintReadWrite
ブループリントで読み取り、編集可能。

### ReplicatedUsing=FunctionName
変数の更新時に特定の関数をトリガー出来る。

## UFUNCTION
source:: [UE4 UFUNCTIONの種類について - PaperSloth’s diary](https://papersloth.hatenablog.com/entry/2018/09/19/195013)
関数のUPROPERTY。別名関数指定子。

### BlueprintCallable
source:: [UE4 C++コードをブループリントで使えるようにする（関数ライブラリー編） - Let's Enjoy Unreal Engine](https://unrealengine.hatenablog.com/entry/2014/09/10/202645)
source:: [Blueprint Function Libraries in Unreal Engine | Unreal Engine 5.0 Documentation](https://docs.unrealengine.com/5.0/en-US/blueprint-function-libraries-in-unreal-engine/)
関数をBlueprintに追加できる。
ただしそのcppが**BlueprintFunctionLibrary**を継承している必要がある。
作った関数をどのblueprintからでも呼びたい、つまり関数ライブラリを作りたいなら、BlueprintFunctionLibraryを直接継承すれば自動でそうなる。

### BlueprintPure
[純粋関数](<./Pure Function.md>)を作成する。const関数はこれを付けずCallableにしようとしても強制で純粋関数になる。

### BlueprintImplementableEvent
Blueprintから呼べる、C++に実装を持たない関数。
いわゆるBlueprint側でのOverride前提関数。Callableが無いと呼べないので必ずセットに。

戻り値が無いとイベントノードになる。

### BlueprintNativeEvent
Blueprintから呼べる、C++にも実装を持つ関数。
Blueprintでの


UPARAM(ref)
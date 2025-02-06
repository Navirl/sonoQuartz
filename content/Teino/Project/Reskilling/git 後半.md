[Git](../../Bar/App/Git.md)

# Git内部

1. コード編集
2. 編集をadd
3. commit

## add
addする
→コミットに含めたいファイルをgit/indexに登録している

`git ls-files --stage`で確認可能
`種類とパーミッション blobハッシュ コンフリフラグ ファイル名`の順で見える
もっと見たいなら`--debug`で見える

### blobハッシュ



オブジェクトの一種のkey

オブジェクトはcommit,tree,blob,tagがある
branchはオブジェクトではない

オブジェクトの実体はobjectsの中
専攻二けた含めたフォルダに入れてる

blobはファイルの中身その物
圧縮前のSHA-1がblobのkey

角オブジェクトの中身はzlib以外にもgit cat-file -p で読める
pは自動オブジェクト種類判別

addはエントリの追加、blobオブジェクトの生成を行う
それ以外してない、treeを作っていない
ファイルパスは保存している

treeはcommit時に作る

## Commit
1. indexからtree
2. Commit生成 
3. headを新しいcommitハッシュに置き換え

treeは種類、パミフラグ、ファイル名、ハッシュが入る
blobと同じ

commitでルートディレクトリを含む全treeを生成
変更があった部分だけ新しいblob、treeになる
それ以外はコピー

commitはルートのtreeを参照する
（ルートのtreeからtreeまたはblobを芋づる式に出せる）
なのでcommit時のリポジトリを再現できる

コミットはある時点のスナップショット、だからチェックアウトが早い

commitオブジェクトも同じくobjects以下にsha-1で入っている
`ハッシュ、親ハッシュ、名前など、コミットメッセージ`
どれか一つが変わると別のcommitハッシュになる

親ハッシュを持つことにより、どこかが改ざんされるとHEADまで全てのコミットが変更されるため実質改竄不可
ブロックチェーン的な

## refs
HEADはrefsの一種
refsはcommitハッシュのエイリアス

tag,branch,HEADはこれらに当たる

tag
デフォはlight weight tag
refs/tagsに保存
これは中身がcommitハッシュ

annotated tag
コメントつきタグ
-a annotated -m comment
こちらはtagオブジェクトで保存される

tagの中身はコミットに似ている
余り使わない

branchニアリーlight weight tag
保存場所はrefs/heads
commitハッシュが直接書かれている

branch名がそのままファイルパスなので、同じ名前は作れない

refs
HEADSは現在のcommitを指すrefs
cheackoutはHEADSを変える
git/HEAD
ブランチの時はハッシュではなくブランチのパス

commitを作る→HEADを書き換える
コミットならハッシュ書き換え
ブランチならブランチのコミットハッシュ書き換え

1. コード編集
2. 編集add
    1. index更新
    2. blob生成
3. commit
    1. tree作成
    2. commit作成
    3. HEAD書き換え

他にもあるけど大体これ
- Hooksの起動
    - hooks以下
- reflogの更新
    - logs/HEADにHEADの移動履歴を書く
    - HEADがブランチを参照してるなら、log/refs/<branch名>にも書く
        - 移動履歴はgit reflogで取れる
        - 今何してここ何処だってときに使える、commitハッシュ取って戻せる
- COMMIT_EDITMSGの編集
    - メッセージを付けずにcommitする時、自動でエディタが開くファイル
    - ここの内容をコミットメッセージとする

## cheackoutとreset
大体似てる

ワークツリー（作業ディレクトリ）、index、HEADを書き換える

checkout
指定commitに以上三つを全部向ける
1. commitの参照treeをワークツリーに天界
2. indexを同期
3. HEADを指定commitに変更
    1. refs指定の場合はその参照

reset

|       | HEAD | index | ワークツリー |
| ----- | ---- | ----- | ------ |
| soft  | 書き換え |       |        |
| mixed | 書き換え | 書き換え  |        |
| hard  | 書き換え | 書き換え  | 書き換え   |

resetとcheckoutの大きな違いはHEADがブランチ参照してる時
checkoutはHEADだけ書き換える
resetはbranchの参照先まで書き換える、HEADもブランチも書き換え

1. コミットを消す
2. addを消す
    1. `git reset --mixed HEAD`、indexだけ書き換える
    2. が、2.23からはrestoreで同じことができる

resetはcommitを完全には消せない
HEAD、index、ワークツリーを書き換えるのでcommitオブジェクトは残る

これで出来る何処からも参照されていないcommitは、一定期間後に`git gc`が走り消される
手動で探すときは`git fsck`

サイズの大きなファイルなら、差分のほうが良い
その為の機能がpackfile

容量の節約と効率化のため、Gitはたまにオブジェクトの中のいくつかを一つのバイナリファイルにパックする
`git gc`を手動実行する時、remoteへのpush時にもパックする
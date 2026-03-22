---
date: 2024-09-22
tags:
  - Bar
aliases:
  - mc
---

up:: [Linux](<../Linux.md>)

## test

[ポート開放できない？主な原因とトラブルシューティング  |  Novaの日記](https://novablog.work/why-port/#toc32)

windows
```
tnc 90.149.172.31 -port 25565
```

linux
```
nc -vz 90.149.172.31 25565
```

## 概観
[ポート開放とは何か？ | Minecraftサーバーを動かす知識](https://e-craft.io/beginner/port-open/)

グローバルIPアドレスでアクセスできる機器の対象をローカルIPアドレスに割り当てる。
つまり、ポートマッピングに複数の機器を設定するとどれに接続するか分からず止まる。

今回は

## DMZ
demilitarized zone。
ここに入れた機器への通信は全て通る。

## nmap --traceroute
ポート指定で経路を表記してくれるコマンド。
使用にはインストールが必要。

[【Windows】tracerouteをTCP/UDP ポート指定で 実行 \~nmap –tracerouteオプション\~  |  SEの道標](https://milestone-of-se.nesuke.com/knowhow/test-tool/windows-tcp-udp-traceroute/)

## Create
歯車でからくりを動かすMod。

自動線路引き。地下行きがむずい。
地下に敷くには壁を破壊しなければならない。その際、破壊した跡にレールを敷く必要がある。
レールを敷くにはDeployerを使うが、これはすぐ置いてくれるわけではなくからくりの速度に準じて設置速度が変わる。

線路は直下には敷けないため、階段掘りをしなければならない。

自動で壁を壊すには、ドリルやホイールに回転力を与えながら階段状に下ろしていくのがいい。

物を直線で移動させるなら
- Mechanical Stickey Piston
- Gantry Shaft
- Cart Assembler
- Train
らへん。その中で回転力となるとPistonが外れる。


shaftは斜め移動が難しい。二つ重ねることは出来るが、もう片方を動かすには一つ目をレッドストーンで止める必要がある。
一ブロック動くごとにレッドストーンパルスを送る方法と言えばレッドストーンブロックを使用した方法だが、横はともかく縦でパルスを送る方法が見当つかない。（からくり上同じ列には同じブロックしか並べられない）
パルス用の坂道を別に作ればいいか？

シャフト回転→
シャフト切れて止まる→
RSBからパルス得る→
シャフトパルス→
carrigeから動力を得て先のシャフトを配置→
（縦シャフト回転→
縦シャフト切れて止まる→
縦RSBからパルス得る→
縦シャフトパルス→
carrigeから動力を得て先の縦シャフトを配置）→
パルス用階段を通じて縦RSBの出力を入手し、横シャフトを再度動かす。
これならと思ったが、よく考えればレッドストーン強度問題がある。パルス階段を渡り切れない。ならばいっそ15ブロック分を一気に削りストーンとリピーターを一気に配置すればいいが、コストヤバそう。Redstone Linkでいける？

ごく当たり前だが、シャフトと重なるブロックがあるとシャフトを動かすことが出来なかった。これを克服するには、シャフトが動くたびにドリルを追加する上、何らかの方法でそれをくっつけなければならない。
chassisを使うにしても、数値をどこかで指定しなければ余計なブロックがくっつく。


Assemblerは有力だが、トロッコの速度によってからくりの速度が変わるのがきつい。
斜めに線路を引くため、壁を壊す→壊した場所に線路を置く、というサイクルを回す必要がある。しかしトロッコ速度が速いと壁を壊すより先に線路が置かれる、線路を置く速度が間に合わず線路が途切れるといった問題が出る。
トロッコの線路だと先に置かれても真っ直ぐになるだけだが、列車の線路だと斜めでなくなり繋がりが切れてしまうため大問題。途切れるのは言わずもがな。
トロッコ速度を一定にすれば問題ないが、そのためにcontroller railに換装するとコスト面とレッドストーンパルス問題が出る。


Train。Assemblerと同様の問題がある。
一定で走らせるのはスクロールホイールで可能だが、そもそも45度の坂道線路に接続するためには1ブロック下げと2ブロック隙間が無いといけない。
この隙間でドリルが線路を破壊したり、置かなくていい線路を置いたりする可能性はある。ただ回路が単純。
山なりなので問題ないっぽい。なので谷になる登りは引き続きトロッコに任せる。


カーブには線路含めで9x9必要。そもそも単純配置で何とかなるもんではないのでカーブは手動で配置。

create-server.tomlのmaxBlocksMovedで運べるブロックの最大数を決定できる。

## スナップショット
ブロックのregion、チェスト中身などのentitiesをworldeditで復元できる。

chunkyでロード。
`/chunky center 0 0`
`/chunky radius 10`
`/chunky start`

worldeditの設定にスナップショット先を書き込み。
ここではsnapshots。`File 'file' resolution error: Path is outside allowable root`が出たらallow-symbolic-linksをtrueに。
[World Edit Schematic Problems \| SpigotMC - High Performance Minecraft Software](https://www.spigotmc.org/threads/world-edit-schematic-problems.422114/)
```
minecraft/snapshots
├───2025-12-27-00-00-00.zip
│   └───main(ワールド名)
│       └───region
└───main(ワールド名)
    └───2025-12-27-00-00-00.zip
        └───main(ワールド名)
            └───region
```
日付は日付じゃないとたぶん動かない。
エンティティの復元も出来そう？
[Implement restoring biomes, entities, and extended world heights by dordsor21 · Pull Request #1316 · IntellectualSites/FastAsyncWorldEdit](https://github.com/IntellectualSites/FastAsyncWorldEdit/pull/1316/commits)

あとは`//wand`とか`//pos1`で場所設定して`/restore`。

## エンドが下りてくる
[Dimension Stack](https://qouteall.fun/immptl/wiki/Dimension-Stack.html#per-dimension-options)
これでエンドを空に接続。アルファを弄りつつ降下。
最終的にエンドラを排出し、咆哮から霧、ロードでエンド飛ばし。

[Advanced Backups - Minecraft Mods - CurseForge](https://www.curseforge.com/minecraft/mc-mods/advanced-backups)
[スナップショット](#スナップショット)
[FastAsyncWorldEdit \| SpigotMC - High Performance Minecraft Software](https://www.spigotmc.org/resources/fastasyncworldedit.13932/)
エンドはこれでめちゃくちゃ遠い場所にオーバーワールドのコピーとして作成する。
これだと卵が取れないので、最終日にエンド側のど真ん中に岩盤柱を作成しておく。

ネザーも上げていく以上、エンドにコピーするよりある一定以上をschematicにハメていくだけでいい気がするが。
でもschemだとファイル分割とかで面倒。エンドにコピーして最終日に一定より下を空気ペーストで削るほうが楽。

### 基本方針
スポーン場所1チャンクを石材で固める。
    敵の攻撃で破壊できないように、出入りはポータルのみ
    外のボスを倒すと石材の破壊耐性が解除
        一気に空が見え、エンドが空に現れる
    ここに入ったら透明化同様、敵に発見されなくなる状態になる
少しでも外に出ればハービンジャーなどのボスがプレイヤーを三回殺すまでONになる。
    三回殺したらデスポーンで元の位置に
    最初は岩盤で覆って4体のボスと、その後は世界巡りでエンドクリスタル持ちを狩る
    
    
山盛りゾンビはブラッドムーンだけ
攻撃をかわせるようにパルクール的なmodを
飯の重要性を何とか増したい、飽きなど
農業はpotとmysagでぶっ壊せ

世界巡りに意味
先々で機械が拾えればいいんだけど、あと弾
APEXのごとくルートを拾ってマシンづくり
余った機械はアンクラフト

世界巡りは美しく
ゲームでさえ家にこもりがちなので、綺麗な世界を歩き回りたいところ
綺麗だからこそエンドに飲まれる絶望感が出る



最終日はループするポータルが四方から迫る感じで

## opencomputer
luaスクリプトで色々

[[minecraft]]

compact machinesのprojectorでエンパを作る

インベントリ検知
アイテムによる作成物変更
構造体からデータ採る


```mermaid
flowchart
    A[インベントリ検知] --> Aa[検査]
    Aa --> B[アイテムによる作成物変更]
    B --> |データ呼出し| Ba[構造体]
    Ba -->|データ| B
    B --> C[データを元に１つ作成]
    C --> |インベントリ信号無くなるまで繰り返し| A
    
```


```psuedo

-- 作成

-- エンパ材料
-- 実際は構造体から受け取る
local projdata = {
                    {
                        {"obsidian","obsidian","obsidian"},
                        {"obsidian","obsidian","obsidian"},
                        {"obsidian","obsidian","obsidian"}
                    },
                    {
                        {"obsidian","obsidian","obsidian"},
                        {"obsidian","redblock","obsidian"},
                        {"obsidian","obsidian","obsidian"}
                    },
                    {
                        {"obsidian","obsidian","obsidian"},
                        {"obsidian","obsidian","obsidian"},
                        {"obsidian","obsidian","obsidian"}
                    }
                }

local dropitem = "redstone"

-- プロジェクターサイズ
-- 立方体しかないはずなので楽
local projsize = 3

-- 高さサイズ
local heightsize = table.maxtn(projdata)

local sub = projsize - heightsize

if sub <= 0
    return
end

-- プロジェクター都合上一つ周りに物はおけない
-- チャージャーはその外にあるのでそこまで移動
right 2
for i1,v1 in projdata do
    local rowsize = table.maxn(v1)
    for i2,v2 in v1 do
        local colsize = table.maxn(v2)
        for i3,v3 in v2 do
            -- 設置
            place v3
            -- もし現在値が右端なら、左へ戻り次の行へ
            if i3 >= colsize
                left colsize-1
                -- 最終行以外で一つ下へ
                if i1 >= rowsize
                    south 1
                end
            else
                right
            end
        end
    end 
    -- 最終行なら元の位置へ、一つ上昇
    if i1 >= rowsize
        north rowsize-1
        up
end

-- proj3, height2みたいなときにprojectorの外まで出る
if sub <= 0
    up sub
end

dropdown dropitem
left 2
down projsize

```


一次元をmodでやったらどうだ
無いとこにnilを詰める方針ならそれでいいが

{"","",""...}ってやるより{{"iron"},{"red"}}のが記述少なくていいだろ
んでも{{full},{真ん中だけ}}みたいなのを見た覚えがある、ゾンビのやつ
無いとこnilで詰めたほうが早いか

projsizeで作成サイズを絞る
nilならその必要性すらなさそう
全体サイズが8,27...で比較してmod数値も割り出せる

```psuedo
-- 作成

-- エンパ材料
-- 実際は構造体から受け取る
-- nilの可能性がある場合、1,8,27...と3乗の要素持ちしか通さないことにする
local projdata = {
                    "obsidian","obsidian","obsidian",
                    "obsidian","obsidian","obsidian",
                    "obsidian","obsidian","obsidian",
                    
                    "obsidian","obsidian","obsidian",
                    "obsidian","redblock","obsidian",
                    "obsidian","obsidian","obsidian",
                    
                    "obsidian","obsidian","obsidian",
                    "obsidian","obsidian","obsidian",
                    "obsidian","obsidian","obsidian",
                }

local dropitem = "redstone"

-- プロジェクターサイズ
-- 立方体しかないはずなので楽
local projsize = 3

-- サイズ
local size = table.maxtn(projdata)

-- ここでやってるけど、本来は構造体に含むべきだと思う
local edgesize
local facesize
for i,v in range(5) do
    if size == i^3
        edgesize = i
        facesize = i^2
    end

if size % edgesize != 0
    error("mismatch size %", size)
    return
end

local sub = projsize - edgesize

if sub <= 0
    return
end

-- プロジェクター都合上一つ周りに物はおけない
-- チャージャーはその外にあるのでそこまで移動
right 2
for i1,v1 in projdata do
    if v1 ~= nil
        -- 設置
        place v1
    end
    -- 右端なら、左へ戻る
    if i1 % edgesize == 0
        left edgesize-1
        -- 最終行なら最初の行に戻って上へ
        if i1 % facesize == 0
            north edgesize-1
            up 1
        end
        -- 最終行でないなら次の行へ
        else
            south 1
        end
    end
    -- 右端でないなら、次のブロックへ
    else
        right
    end
end

-- proj3, height2みたいなときにprojectorの外まで出る
if sub >= 0
    up sub
end

dropdown dropitem
left 2
down projsize

```





placeは単純にカーソル合わせたものを置く機能しかない
インベントリのどこにそれがあって、どうやってカーソル置くかをサポートしてない

黒曜石を元に検知してるので、インベントリ1が黒曜石、2がレッドブロック、3がレッドストーンパウダーのはず
構造体からこれももらっておきたい

```psuedo
local itemlist = {"obsidian:26","redblock:1”,"redstone:1"}
```

:で分けて、物体名と数をそれぞれ処理

あっ、外部チェストの確認できなさそう？
ロボット自体に物入れる仕組みっぽい。……なら64以上黒曜石を入れられたら、使っていった黒曜石の位置がずれていくのでは？
suckで出来そう。controllerのsuckfromslotなら自由にスロット選べるはず。

```mermaid
flowchart
    a[全てのアイテムに対し、検知アイテムが存在するか確認] -->|検知アイテムテーブル要求| aA[構造体]
    aA -->|検知アイテムテーブル返却| a
    a -->|全て検知無しなら、sleep後もう一度| a
    a -->|検知| b[検知アイテムに連なる残りのアイテム問い合わせ]
    b -->|残りのアイテム要求| aA[構造体]
    aA -->|残りのアイテム返却| b
    b --> c{全てのアイテムに対し、残りのアイテムが存在するか確認}
    c -->|あれば| d[該当スロットに確保]
    d -->|三番目以降も同様に| c
    c -->|なければsleep後にもう一度| c
    c -->|すべて終了| e[作成関数を呼出し]
```

アイテムが見つかった時点でチェストは回し直すのだから、アイテム->チェストスロットの順で回すほうがいい
いや、detectでは見つかった時点で終了してほしいが、receipeだと見つかってもそのまま回してほしい。
というか物を指定してチェスト回す方式だと、チェスト内に別々に同じアイテムあったら両方吸い出してしまう。




```pseudo
-- 検査及び変更、ツールバー作成

-- 本来は構造体
local detectitems = {"obsidian:26","ironblock:1"}
local receipeitems = {{"redblock:1”,"redstone:1"},{redstone:2"}}

local chestsize = getinventorysize(sides.front)

-- テーブルを回し、チェストを回し、チェスト内でアイテムを確認し、名前が一致するなら取り出し
-- detectの時は問答無用で一番に取り出すのでモード指定
func getitemfromtable(table,chestsize,detectmode): detectitemid
    for i,v in table do
        name,num = split(v,":")
        for i2 in range chestsize
            local itemdata = getstackinslot(sides.front, i)
            if itemdata.name == name
                if itemdata.num ~= num 
                
                if detectmode
                    suckfromslot(1,num)
                    local detectitemid = i
                    return detectitemid
                else
                    suckfromslot(i+1,num)
                    break
            end
        end
    end
end

local detectitemid = getitemfromtable(detectitems,chestsize)

if detectitemid == nil
    -- スリープして検知に戻る
else
    getitemfromtable(receipeitems[detectitemid],chestsize)
    
end  
```


アイテムがあったところでチェストに残りのアイテムも入っている可能性は保証されないし、そもそもレシピのアイテムがあるかも怪しい。
つまりテーブルのアイテムとツールバーのアイテムが一致しない可能性が高い。

アイテムと数値、両方が揃わないと一致とみなさないことにする。
レシピの一部だけ存在する場合、inventorychangeが起きるまで放置したいが外部インベントリにはさすがにシグナルないだろ。

一致したスロットの数値だけスタックしといて、レシピ全部が揃ったと分かったら一気に吸出し。
そうでなければどのスロット数値が足りないかだけエラー出力。再び全体が呼び出されるまで待ち。
吸出しが失敗したら全部返却してどのスロット数値で失敗したかエラー出力。全体呼び出されるまで待ち。

まって。`obsidian:2,obsidian:22,obsidian:9`とかで配置されてた時にまとめて吸い出せない。
設定で26個スロットから吸い出す以上、こうなることは予想がつく。といってインベントリのソート関数はない。何かしらで26個ずつ黒曜石を、とやろうにも他にも数値違いで黒曜石を使う用事はある。
1スロットに入るアイテムが馬鹿多ければ問題ない。もういっそグリッドから読むか。そもそも読めるか分からんが。

グリッド読めなかった。
もう仕方ない、作りたいアイテムごとにチェストとクラフターを分けて一定アイテム数だけ取り出すようにする。
黒曜石と黒曜石で被るのもダメなので、同じ部屋に別々にチェストを置くことになる。
いちいち場所探すのもあれなのでwaypointとチェストをセット。
クラフター-チェスト-フィルター-チェスト-waypoint。これだけでめちゃくちゃ部屋を占有する。9x9だが中央5x5は使えない、壁際に並べて何種類か。

これ以上は止めよう。waypoint無し、フィルタリングチェストまで。フィルタリングを別ロボットに任せれば楽だろうが、一応menrilも確認。レシピ通りが全部そろった時だけ同じ個数フィルタリングチェストに入れる。フィルタリングチェストが一つでも入ってたらやらない。

2,22,9でも一旦名前一致で取り出してループ最後で揃ってなかったら戻して、とかやろうにもな。それでインベントリにゴミが溜まったら、即刻取り出さないと動かなくなる。でもメンリル依存するよりシンプルか。


| /      | ツールバーあり      | ツールバーなし      |
| ------ | ------------ | ------------ |
| チェストあり | 差分数取り出し      | 定数取り出し       |
| チェストなし | 全数取り出し、ループ継続 | 全数取り出し、ループ継続 |　

チェストになく、ツールバーにある場合
チェスト分ではみ出る可能性、足りない可能性が出る
足りてるかは吸出し後に調べるので、はみ出ないようにすればいい
でも足りてなくて出そうとしたらエラーしそうなので、はみ出るか足りてないかだけif

足りてない
じゃあ全数出せばいいか



```pseudo
-- 検査及び変更、ツールバー作成

-- 本来は構造体
local detectitems = {"obsidian:26","ironblock:1"}
local receipeitems = {{"redblock:1”,"redstone:1"},{redstone:2"}}

local chestsize = getinventorysize(sides.front)

-- テーブルを回し、チェストを回し、チェスト内でアイテムを確認し、名前が一致するなら取り出し
-- detectの時は問答無用で一番に取り出すのでモード指定
func getitemfromtable(table,chestsize,detectmode): detectitemid
    for i,v in table do
        name,num = split(v,":")
        for i2 in range chestsize
            local itemdata = getstackinslot(sides.front, i)
            if itemdata.name == name
                if detectmode
                        -- チェスト内に使用数以上ある
                        if getchestslot(i2).num > num
                                -- ツールバーに既にいくつかある
                                if getrobotslot(1).num > 0
                                        suckfromslot(1,num-getrobotslot(1).num)
                                else
                                        suckfromslot(1,num)
                        -- チェスト分ない
                        else
                                -- ツールバーに既にいくつかある
                                if getrobotslot(1).num > 0
                                        -- 仮に全部吸い出しても使用数以下なら
                                        if getrobotslot(1).num + getchestslot(i2).num < num
                                                -- 全部吸い出す
                                                suckfromslot(1,getchestslot(i2).num)
                                        -- 全部だとはみ出るなら、使用数からロボット持ち分だけ引いた数出す
                                        -- チェストが支払えるかどうかは、はみ出るとわかってればヘーキ
                                        else
                                                suckfromslot(1,num-getrobotslot(1).num)
                                else
                                        suckfromslot(1,getchestslot(i2).num)
                    local detectitemid = i
                    
                    break
                    
                else
                    suckfromslot(i+1,num)
                    break
                end
                -- スロットを読み込み、数が揃ってればOK
                -- 揃ってなければ全部返却とエラー
                if detectmode
                        
                return detectitemid
            endreturn detectitemid
        end
    end
end

local detectitemid = getitemfromtable(detectitems,chestsize)

if detectitemid == nil
    -- スリープして検知に戻る
else
    getitemfromtable(receipeitems[detectitemid],chestsize)
    
end  
```

いや駄目だ。複雑すぎる。
事前に必要数だけ分ける部分を関数に分けたほうがいい、けど必要数に分けられるならそのまま出しゃよくない。
少し拾う、少し拾うを繰り返してるのが悪い。やっぱメンリルでいっか。いいか？

64以上がある以上、適当なソートだと結局数は必要。
ディテクトモードに関しては、テーブルに対して一個目の素材が揃ってたら通すで簡略化できる。

アダプターとかトランスポーザーでグリッドも読めそうな感じがあるが、それでも素材が足りない可能性はある


```pseudo
-- 検査及び変更、ツールバー作成

-- 本来は構造体

local toolbarlist = {{"obsidian:26","redblock:1”,"redstone:1"},{ironbrock:1,redstone:2"}}

local chestsize = getinventorysize(sides.front)

-- テーブルを回し、チェストを回し、チェスト内でアイテムを確認し、名前が一致するなら取り出し
-- インデックスを返さないと、あとでレシピも取り出すんだから
func getitemfromtable(toolbarlist,chestsize)
    local toolbarlistindex = 0
    for i,v in toolbarlist do
            local clearnum = 0
            for i2,v2 in v do
                local robotslotnum = getrobotslot(i2).num
                name,num = split(v,":")
                for i3 in range chestsize
                    
                    local chestslotdata = getstackinslot(sides.front, i3)
                    if chestslotdata.name == name
                                -- チェスト内に使用数以上ある
                                if chestslotdata.num > num
                                        -- ツールバーに既にいくつかある
                                        if robotslotnum > 0
                                                -- 使用数からツールバー分を引いた数出す
                                                suckfromslot(1,num-robotslotnum)
                                        -- ツールバーにない
                                        else
                                                -- 使用数出す
                                                suckfromslot(1,num)
                                -- チェスト内に使用数以下しかない
                                else
                                        -- ツールバーに既にいくつかある
                                        if robotslotnum > 0
                                                -- 仮に全部吸い出しても使用数以下なら
                                                if robotslotnum + chestslotdata.num < num
                                                        -- 全部吸い出す
                                                        suckfromslot(1,chestslotdata.num)
                                                -- 全部だとはみ出るなら、使用数からロボット持ち分だけ引いた数出す
                                                -- チェストが支払えるかどうかは、はみ出るとわかってればヘーキ
                                                else
                                                        suckfromslot(1,num-robotslotnum)
                                        else
                                                suckfromslot(1,chestslotdata.num)
                    -- スロットを読み込み、数が揃ってればチェストループ抜け
                    if robotslotnum == num
                            clearnum = clearnum + 1
                            break
                -- ツールバーループ
                -- 全部揃ってブレイクした場合と、チェストを探したけどなかった場合がある
                -- これを数値揃ってるかで判定
                -- 揃ってればツールバーの次へ
                if robotslotnum ~= num
                        -- なければリスト分全部ドロップしてブレイク、ツールバーリストの次へ
                        for i4=1,i2,1
                                dropfromslot(i4)
                        clearnum = 0
                        break
                end
        -- ツールバー数と揃った判定数が揃ってるか判定
        if #v == clearnum 
                toolbarlistindex = i
                return  toolbarlistindex
    end
    if clearnum  <= 0
            return result("no founded receipe.")
    else 
            return result("failed initialize toolbarlistindex.")
end

local toolbarlistindex = getitemfromtable(toolbarlist,chestsize)
if type(toolbarlistindex) == string
        print(toolbarlistindex)
        return error
local toolbar = toolbarlist[toolbarlistindex]
return toolbar


```




このテーブル通りにツールバーに配置されたとして、
```psuedo
local toolbarlist = {"obsidian:26","redblock:1”,"redstone:1"}
```

place時にはこれと比較して配置していくことになる
```psuedo
local projdata = {
                    "obsidian","obsidian","obsidian",
                    "obsidian","obsidian","obsidian",
                    "obsidian","obsidian","obsidian",
                    
                    "obsidian","obsidian","obsidian",
                    "obsidian","redblock","obsidian",
                    "obsidian","obsidian","obsidian",
                    
                    "obsidian","obsidian","obsidian",
                    "obsidian","obsidian","obsidian",
                    "obsidian","obsidian","obsidian",
                }
```

使用するアイテムの種類数は当然異なり、ツールバーに配置されるものを決め打ちは難しい
いやそうか？toolbaritemsをそのままツールバーに反映するように書いたから、この順のまま取り出せばよくないか。
だとしてもredblockが何番スロットなのかは必要か。

```psuedo
-- 作成ヘルパー
func getslotnumfromtable(toolbaritems,itemname):slotnum
    for i,v in toolbaritems do
        name,num = split(v,":")
        if name == itemname
            local slotnum = i
            return slotnum
        end
    end
end
```

後は構造体とインベントリ検知
インベントリ検知は後でいいから、構造体
luaにstructはないっぽいので、全部テーブルで

基本はこれ
これにdropitem,toolbaritems,detectitemを追加する
```psuedo
local projdata = {
                    "obsidian","obsidian","obsidian",
                    "obsidian","obsidian","obsidian",
                    "obsidian","obsidian","obsidian",
                    
                    "obsidian","obsidian","obsidian",
                    "obsidian","redblock","obsidian",
                    "obsidian","obsidian","obsidian",
                    
                    "obsidian","obsidian","obsidian",
                    "obsidian","obsidian","obsidian",
                    "obsidian","obsidian","obsidian",
                }
```
toolbaritemsがあれば、detectitemは最初切って残りをreceipeitemに当てるだけなので簡単
そしてその二つは検査と変更でしか使わないので、そこにtoolbaritemsからの変更関数を入れればいい

dropitemは流石にprojdataとは別枠で管理したい
toolbaritemは理論上projdataから作成できる
作成でも検査変更でもtoolbaritemsは使用するので事前に置いておきたい

あれ、dropitemを別枠にしたところでツールバーには出てきて。
作成ヘルパーはtoolbaritemsのアイテムしか読めないから、toolbaritemsに追加しないとダメだ。
わざわざprojdataから切り出すのも面倒なので、dropitem別枠自体はいい
ただtoolbaritems作成関数にprojdataとdropitemが必要なだけ

toolbaritemsは一回こんなん作ったほうがいいか
実際のを作ると一つずつ増やせない、連想配列のキーは64という最大数が決まっている以上同じキーが出る可能性は普通にあり無理
```psuedo
local temptollbar = {"obsidian",26,"redblock",1,"redstone",1}
```

luaのテーブルに便利な関数は大してない
全部自分で実装

```psuedo
-- 構造体
-- エンパ

local projdata = {
                    "obsidian","obsidian","obsidian",
                    "obsidian","obsidian","obsidian",
                    "obsidian","obsidian","obsidian",
                    
                    "obsidian","obsidian","obsidian",
                    "obsidian","redblock","obsidian",
                    "obsidian","obsidian","obsidian",
                    
                    "obsidian","obsidian","obsidian",
                    "obsidian","obsidian","obsidian",
                    "obsidian","obsidian","obsidian",
                }

local dropitem = "redstone"

local detectitem = "obsidian"

-- detectitemはtoolbaritemsの一番最初にする、作成してから最後に入れ替え
-- この関数は別ファイルに移したほうがよさそう
func maketoolbaritems(projdata,dropitem):toolbaritems
    local temptoolbar = {}
    local table.insert(projdata,dropitem)
    for i,v in projdata
        for i2,v2 in temptoolbar
            if v2 == v
                temptoolbar[i2+1] = temptoolbar[i2+1] + 1
            end
        end
        table.insert(temptoolbar,v)
        table.inert(temptoolbar,1) 
    end
    
    local toolbaritems = {}
    for i = 1, #temptoolbar, 2
        table.insert(toolbaritems,concat(
                        temptoolbar[i],":",temptoolbar[i+1]
                    ))
        if temptoolbar[i] == detectitem
            table.insert(toolbaritems,0,toolbaritems[-1])
            table.remove(toolbaritems)
        end
    end
    return toolbaritems
end 

local toolbaritems = maketoolbaritems(projdata,dropitem)

-- 分かりやすさ優先、連想配列
-- 物によっては余計なもんが付いてくるが、allitemdata.projdataみたいな感じで呼べると考えたら
local enderparldata = {projdata:projdata,dropitem:dropitem,toolbaritems:toolbaritems}

-- 最後のデータを返すように、それぞれの作成で別の構造体ファイルを用意
-- 何かの関数で全ての構造体を読み込んだテーブルとか用意しておけばいいかな

```

```psuedo
-- 検査変更ヘルパー
func makedetectitems(alldata):detectitems
    local detectitems = {}
    for i,v in alldata
        table.insert(detectitems,v.toolbaritems[1])
    end
    return detectitems
end
```

このツールバーアイテム関数、いつでもvと1がinsertされてしまう。
```mermaid
flowchart
a[projのn番目要素を読む]-->b[toolbarのn番目要素を読む]
b-->c[projとtoolbarが一致したらその次の数値に数追加、break]
```



後はインベントリ検知
チェストにコンパレータくっつければ一つ入った時に1を出力するはず
これでロボット自体を起動できれば早いんだが、起動し続けるcomputerからnetwork介して起こすなどになる。
それは面倒なのでos.sleepで何とかするのが流石に一番早いだろ、networkやったとこでcomputer分の電力消費するだろうし

[Signals \[OpenComputers\]](https://ocdoc.cil.li/component:signals)

redstone_changedシグナルを出してくれるらしい

```lua
local event = require("event")
print("信号を待機中...")

-- レッドストーン信号（redstone_changed）が変わるまで一時停止
while true do
  local _, _, side, _, newValue = event.pull("redstone_changed")
  if newValue > 0 then
    print("信号検知！作業を開始します。")
    break
  end
end

-- ここに実行したい作業を書く
```

これでいけるなら、autorun.luaあたりにこれ書いて動かせるな

先にinternetでテスト
作成部だけ動かす

[Tutorial: The OpenPrograms Package Manager (OPPM) \[OpenComputers\]](https://ocdoc.cil.li/tutorial:program:oppm)
oppmなるマネージャを使うらしい
準備としてmasterブランチ持ちのgithubリポジトリを作成する、その前にluaを真面目にまとめる





壁削るためのやつ

inventory_changed(slot: number)でシグナルが出る、これを拾えばok

```psuedo

fn minewall(inventorysize)
    local swingging = true
    
    while swingging
        -- 現在値と最大値が出る
        local durability, _  =  robot.durability()
        
        -- 壊れるまで振る
        while durability
            robot.swing()
            durability = robot.durability()
        
        
         -- 耐久値があるものを選ぶ
        for i=1,inventorysize,1
            select(i)
            if robot.durability() ~= nil
                break()
            -- インベントリに使えるものがなくなった
            if i == inventorysize
                select(1)
                swingging = false
```

whileが足りない

```psuedo
local inventorysize = inventorysize()

while true do
local icslot = event.pull("inventory_changed")
if icslot == 0
    minewall(inventorysize())
end
```

このロボット壁削れねぇ。
壁削りはauto clickerに任す。


useとplace分けるために、構造体に追加
`local hasuse == false`

セレクタを追加してhasuse持ちだけ分けたい
ほぼ同じ関数なのだが、hasuseならその旨をprojdataに入れなきゃいけなくて。
`{"flintsteel/use"}`みたいなことになる。これを処理単位で分けるとなると、アイテムセレクト時に/含んでたら分ける。でその情報を外に出して、ってなる。じゃhasuseいらんな。

```psuedo
-- 作成ヘルパー
func getslotnumfromtable(toolbaritems,itemname):slotnum,ifuse
    for i,v in toolbaritems do
        name,num = split(v,":")
        if name == itemname
            local slotnum = i
            
            return slotnum
        end
    end
end
```

この関数を使うのはplaceの時だけ。
それは作成でしか使ってない。書き換えはそこだけ。

adapterにgridを隣接させ、ケーブルでつないでcomputerからcomponent.list()を調べると、block_refinedstorage_grid_0というのが見つかる。`for i,v in pairs(component.block_refinedstorage_grid_0) do print(i) end`でごり押せばメソッドを探せる。
これにextractItemメソッドがあり、({name="obsidian"},num,sides)みたいな感じで出せる。sidesはグリッドに隣接したストレージ。
流石にロボットに直接は出せないが、バニラチェストには出せるっぽい。

transposerも近場のインベントリと取引するAPIを提供するみたいだが

内部の名前が分からないので、getItems()をwebhook.siteに投げる。internet.request(url,content)。

minecraftはminecraft以降の名前で充分。完全一致でないと出ない。

メモリが足りなくなったらcomputer.freeMemory()


makeとdatalistまではいけた
あとはadapterでgridから直接チェストに取り出す処理と、取り出したのをロボットに伝える処理、ロボットがチェストから取り出す処理

それと空き部分がある時使えないのでその修正

grid直は、作成個数を取得
ワンセットのツールバー全部の数値を確認して足りたら、チェストが空いたときにextractItem呼ぶ
これを空になるたび、作成個数分繰り返し
redstoneblockが使えるのでコンパレータでチェストが空いたことは分かるはず

```psuedo
local extractFromGridForToolbar(toolbar,create_num){
    local sigstr = getRedstoneSignalStrength()
    assert(sigstr ~= 0,"chest is not empty.")

        -- 残数があることを確認してから、改めて取り出し
        for i,v in toolbar do
            local name,num = string.match(v, "([^:]+):(%d+)")
            extractItem(name,num)
        end
        
}

local isIteminGrid(toolbar,create_num){
    for _i=1,create_num,1 do
        for i,v in toolbar do
            local name,num = string.match(v, "([^:]+):(%d+)")
            local itemnum = getItem(name)
            assert(itemnum == nil,name.." is "..(i*)
        end
    end
}

```


ロボットがチェストから取り出すほうが問題
いうてextractItemが終わったらロボットにイベント飛ばせば、必ずアイテムはチェストに入ってる
イベントでtransferをやらせれば済む

イベントにどのアイテムを作るかも載せる
これは関数呼び出しにそもそも必要だから必ずやるはず

requestの関数が存在するので、一回ごとにリクエスト出して短時間スリープ、揃ったらツールバー割付がいいか
リクエストは全部グリッドに集中させたいからずっとコンパレータとかディテクト考えてたんでは。

リクエスト自体は適当にimporter付きchestに出して、処理はgridから出す方式
一瞬溜まるチェストをコンパレータで取得、getTasks()でデータを取得。
これなら何を作るかまで含めて拾えるか。以降自身が可能なtaskが無くなるまで実行とgetTasksを繰り返す。

マシンウォールだけで作れるlargeが一番面倒

データごとにディテクトの関数を付けたほうがよさそう
datalistでディテクト関数も一気に実行し、該当を元に抜出する


```mermaid
flowchart
a[detect] --> b[wall_detect]
b --> ba{wall_make}
ba --> |done| z[finish]
ba --> |fail| bb[wallの次の検知から続ける]
bb --> a
a --> c[ender_detect]
```
RAM足りるかこれ。

getTasks()の戻り値が良ければ、作成結果アイテムでタスクを割り出し
extractItem()で準備アイテムをグリッドからワンセット割り出し
ディテクトをスキップしていけるか

タスクはざっくり以下の感じ

```
{
    [{
    qunatity=2（作成数）
    stack={
        item={
            作成アイテムの基本情報
        }
    },
    pattern={
        パターンのinput,output
            それぞれの個数含む
    }
    }],
    n=1
}
```

これなら全部のタスクの作成アイテム基本情報を抜き、patternから直接アイテムのワンセット情報を抜いてextractでディテクトスキップできる、自身に可能なタスクが無くなるまでその繰り返し

その抜出作るのが面倒なので、しばらくはこちら側から指定できるように
いやどの道64制限のチェストから取り出すよりグリッドから抜いたほうが早いので、これやる

```
quantity
[for]["quantity"]

createName
[for]["stack"]["item"]["name"]
(minecraft:red_mushroomなど:がある)
(ラピスとかは全部minecraft:dyeなのでlabelで分ける必要がある)

input
[for]["pattern"]["inputs"][for][1]["name"]
([1]と["n"]があるので、[1]必須)
(全体数でもないこの位置になぜnがあるのかわからない)

size
[for]["pattern"]["inputs"][for][1]["size"]
(float注意)

output
[for]["pattern"]["outputs"][for]["name"]
(こっちはこれでいい)
```

処理するべきタスクを特定
タスクのpatternのinputにあるアイテムが全部そろってる時だけ作成したい
揃ってないときは既定回数スリープと揃ってるか確認を繰り返した後、エラー
揃ってたら改めて取り出し

揃ってるとは、存在している一個一個のアイテムについて数を比較し、それ以上にグリッドにあること
一個でも足りないのがあるとダメ

andで一気にやりたいが、式を変数に入れるのは面倒
あるやつだけ数比較してtrueかfalseか、そのandで

forでnがあるかないかのフィルタ
nがあるやつのforで数があるかどうかTF
数があるやつのTFでFの名前を出力、FがないならOKを返す

nがないなら除外
数がないなら名前と数だけ取得、出力
全部数あればOK、取り出したい名前と数の情報を纏める

パターンは必ず64以下のはず
つーかパターンをそのまま手持ちに変えられるならtoolbar計算いらん
ディテクトもいらん
ドロップもいらん



```psuedo
-- structureの作成アイテムはtasksに存在するか
-- 実際にrobotが作成できるアイテムかは保証しない
-- itemnameはstructureに追加する
function getCapableTaskNum(structure,tasks):int,str
    for i,v in tasks do
        local _, name = string.match(
            v["stack"]["item"]["name"],
             "([^:]+):(%d+)"
        )
        if name == structure.itemname then
            return i
        end
    end
    return "No capable task."
end

-- タスクナンバーでタスクを指定して渡す
-- グリッドからinputのアイテムを取り出せるか
-- 取り出したもので作成できるかは保証しない
function isExtractTaskItemFromGrid(structure,task)
    local pattern_valid_item = {}
    local pattern_available_item = {}
    for i,v in task["pattern"]["inputs"] do
        -- inputに何も入ってないならcontinue
        if v["n"] == 0 then
            table.insert(pattern_valid_item,false)
            goto continue
        else
            table.insert(pattern_valid_item,true)
        end
        -- グリッドに入っている数のほうが多ければ
        if v[1]["size"] <= getitem({name=v[1]["name"}).size
            table.insert(pattern_available_item,)
        ::continue::    
    end
end

function extractItemFromTask()
    
end
```

変更で壊れるの怖いからテストしたいんだけど、luaのテスト環境を整えるのにmingwでのコンパイルが必要。

整えた。
データは一重、二重、三重配列のいずれにするか。

一重だと書きやすく処理も楽。ただし無駄な移動が発生する。upなどの特殊なアイテム名を使用すればいいのでは。
二重だとどこを二重にするか。面を二重にすれば辺で無駄になり、辺を二重にすれば面で無駄になる。
三重は書きにくい。でも書きにくいだけだからこれでよくね。

パターンからツールバーを直接取れるので、dropItemやdetectItemをパターンで指定できるようになった。
なのでこの二つは要らない。

upなどの特殊アイテム。例えばwallなら、

```lua
{
    "iron_block","up","redstone"
}
```

これで指定する。
ただ現状立方数を想定してどこまで進んでるかで自動で上げるアルゴであり、upを入れるとズレる都合上全てのデータでupが必要になる。邪魔。

二重で辺で無駄が出る。
その無駄が出るタイミングって、`{"name",""}`みたいに奥に隙間が必要なもののはず。よりによって一番使うmachine_wallがこれだから二重にしようとしている。
あとzombieもこれ。でも経験値を考えるならゾンビより簡単に増える鶏の方がいい。tunnelもそんな使うわけじゃないから無駄があってもいい。総じていうとマシンウォールくらいしか恩恵を得られないので、書きにくさとのトレードオフとしては微妙。
でも裏を返せば、そもそもこの設置で物を作るのwallくらいしか使わないのでは。最初一回書きにくいだけで全部済むなら、少しでも早いwallでよくね。
そんなパフォーマンス追及するためにやってるんじゃない。多少遅くても実用的に。速さを追求するなら核分裂炉をもっとまじめにやってる。

チェストに出す、ロボットが配置するまではできた。
後はチェストからロボットに渡すだけ。ロボットに対するtransposerとadapterを試す。

adapterは他のmodとの連携か。transposerは通った。

左は駄目。右はツールベルト、一番下。他はメインのスロット。
`component.transposer.transferItem`を使いtransposerに隣接させたチェストとロボットで橋渡し。

チェストから出す、transferまではPC。配置はロボット。

extracterのために1ブロック上。placedownなのでもう一つ上にロボット。
ロボットが三つ目、その上にtransfer、チェスト、アダプター、グリッド、検知用チェストとクラフター、importer。高さは9なので入り切る。

あとはコード。
まずはチェストからロボット。チェスト内、ものが入ってるスロットを検知してそのまま全部ロボットに突っ込む。

transferItemはスロットを指定しないとair以外のスロットを適当に見つけて入れるみたいな挙動するっぽい
ちゃんと指定する

```lua
local sides = require("sides")
local tp = require("component.transposer")
local tkeys_to_numbers = require("tkeys_to_numbers")

local chest_stacks = tp.getAllStacks(1)
local chest_stacks_data = tkeys_to_numbers(chest_stacks.getAll())
local chest_stacks_size = chest_stacks.count()

local now_size = 0.0
for i,v in ipairs(chest_stacks_data) do
    if v["size"] > 0.0 then
        now_size = now_size + v["size"]
        tp.transferItem(sides.up, sides.down, v["size"],i,i)
    end
    if now_size >= chest_stacks_size then
        break
    end
end

```

これでグリッドからチェスト、チェストからロボット、ロボットが設置はできた。
最後にグリッドがタスクを発行した際の一瞬のレッドストーンの検知を行う。これはredstone i/oでコンパレータ検知

タスクから何回アイテムセットを出さなきゃいけないかを取り出さなきゃ
タスクからアイテムセット数取り出し、グリッド取り出し以下をセット数だけ繰り返し

そのうえで、ロボットシステムが設置を終えてシグナルを出すまで待機したい

ロボットいちいち切る処理出すの起動時間と書くのが面倒なのでやらない

ロボットはsendを使ってシグナル`modem_message(receiverAddress: string, senderAddress: string, port: number, distance: number, senddata)`を出せる


```lua
local event = require("event")
print("信号を待機中...")

-- レッドストーン信号（redstone_changed）が変わるまで一時停止
while true do
  local _name, _addr, side, _oldValue, newValue = event.pull("redstone_changed")
  
  if newValue > 0 then
    print("信号検知！作業を開始します。")
    local set_num = extract_task_num()
    for i,set_num do
        extract_grid()
        extract_chest()
        -- ロボットにやってもらう
        tunnel.send("make")
        -- ロボットから終了を受け取る
        local _recAddr, _sendAddr, _port, _distance, send_data = event.pull("modem_message")
        -- 終了以外を受け取ったらエラー、終了なら次のextractに進む
        if send_data ~= "finish" then
            return "error"..send_data
        end
        print(i)
    end
    break
  end
end

-- ここに実行したい作業を書く
```

これやりたいからlink_cardが要る

ロボット側
```lua
local event = require("event")
local make = require("make")
local json = require("json")
local dl = require("datalist")

-- pcから作成依頼を受け取る
local item_name_e = ""
local toolbar_item_e = ""
while true do
    local _, _, _, _, _, recv_data = event.pull("modem_message")
    -- 作成依頼があるなら、どれを作るかが必要
    -- datalistから取り出せば良いんだけど
    -- ツールバー情報も依頼で受け取れ
    local inst, item_name, toolbar_item_raw =
        string.match(recv_data, "([^%^]+)^(.+)^(.+)")
    item_name_e = item_name
    toolbar_item_e = json.decode(toolbar_item_raw)
    if inst == "make" then
        print("作成開始")
        break
    end
end

make(dl.proj_structs[item_name_e], toolbar_item_e, 3)

```

modem_messageの場合name,recadd,sendadd,port,distance,msgで六つ目にデータが来る。
redstone_changedだとname,addr,side,old,new。

extractItem、スロット指定できない。
なので一つ出してはロボットに、ってやる必要がある。

関数が使用できる
直接戻り値に割り当てた関数を別から呼び出すこともできる
テーブルに割り当てた関数が呼び出せない

ただの再起動で動いた
メモリかも
あるいは/usr以下のファイルは再起動いないと変更が反映されない。

quantityは入力した値っぽい
例えば2つできる奴を一つだけ注文した場合、outputは2だがquantityは1

compact machineどもが全部name同じだったのでlabelを使用する。

あっ
getSlotNumFromTableで比較してるのがname入ってるtoolbar_items、label入ってるproj_structのv1。

どうすんだこれ。つーか前どうやって動いてたんだよ。
そうか、大体wallbreakableが一個目だからエラーのまま動かせたのか。

タスク指定はmachine分割のためlabel、structのアイテム指定はextractItem指定のためname。
こうするしかないか。nameってそういやminecraft:以外は完全一致だ。

エンパ作成可能。
部屋を作って、cryothellumのための処刑場作って、全部登録すれば流石に作れるか。
トリチウムランプに核融合が要るので起動しないといけない。

leu-235.comの通りに作ると熱が高すぎる。
自前でクーラー多めに作らなければ。
[NuclearCraft Fission Reactor Design Generator](https://leu-235.com)
いやこれ、active rateって同じ素材で溶融した奴でアクティブクーラーが起動できて、その効率がこれくらいですよってだけのやつだな。
でその下のmax active allowedがそのアクティブクーラーの数。
固体クーラーを使うならmax allowedの方だ。

あとは説明通りjson出してplannerでgadjetに貼れる文字列にしてtemplate managerで貼ればいい。

核融合はアクティブクーラー100%にしないと爆発する
燃料が枯渇すると再起動が面倒

deu x deuだと水では冷却が足りず爆発する？

home/.shrcで起動時のコマンドを打てる
スクリーンが無いとここでは動かない

`<C-A-c>`で強制ストップ

軌道に乗る前に生産下げて、電磁石の電気が切れてるのが不味そう
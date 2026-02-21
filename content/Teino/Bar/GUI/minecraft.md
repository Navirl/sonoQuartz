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
    c -->|すべて終了| e[配置関数を呼出し]
```

アイテムが見つかった時点でチェストは回し直すのだから、アイテム->チェストスロットの順で回すほうがいい

```pseudo
-- 検査及び変更、ツールバー作成

-- 本来は構造体
local detectitems = {"obsidian:26","ironblock:1"}
local receipeitems = {{"redblock:1”,"redstone:1"},{redstone:2"}}

local chestsize = getinventorysize(sides.front)

func getitemfromtable(table,chestsize): detectitemid
    for i,v in table do
        name,num = split(v,":")
        for i2 in range chestsize
            local itemdata = getstackinslot(sides.front, i)
            if itemdata.name == name
                suckfromslot(i,num)
                local detectitemid = i
                return detectitemid
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


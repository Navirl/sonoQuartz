---
tags:
 - Info
---

daily:: [2023-03-30](/Daily_Note/2023-03-30.md)
up:: [Godot](../Bar/App/Godot.md)
up:: [Rust](../Bar/Program/Rust.md)

そもそもGDScriptを使うほうがほとんどの場合（修正しやすいという意味で）早く、GDExtensionはUEで言うC++みたいに最適化する場合に使うモノであることには留意。

API呼ぶ奴は3.0時代はGDNativeという名前だった。
4.0以降はGDExtensionに変わり、書き方も変わる。まだベータ版で使用例しかない（2023/03/29）。

## rust

[GitHub - godot-rust/gdext: Rust bindings for Godot 4](https://github.com/godot-rust/gdext)
rustでdllをコンパイル→godotに読ませる、という流れ。

### 内容

`cargo new 名前 --lib`でrustプロジェクトを立ち上げ、rustを書く。

cargo.tomlのpackage_nameがdllの名前になる。

まずはlib.rsに以下を記述。

```rust
use godot::prelude::*;

//mod なんか

struct 任意;

#[gdextension]
unsafe impl ExtensionLibrary for 任意 {}
```

`use godot::prelude::*`はよく使うアイテム。
extendする構造体、列挙子などが入ってる。

他のファイルはlib.rsにmodとして追加。

`#[gdextension]`はアトリビュート。
多分godotがGDExtensionとして呼び出すための部分。

structは自由。ExtensionLibraryをその構造体トレイト付きで実装。unsafeは必須っぽい。


modで追加する他のファイルの一例。

```rust
use crate::hud::Hud;
use crate::mob;
use crate::player;
use godot::engine::node::InternalMode;
use godot::engine::packed_scene::GenEditState;
use godot::engine::{Marker2D, PathFollow2D, RigidBody2D, Timer};
use godot::prelude::*;
use rand::Rng as _;
use std::f64::consts::PI;

// Deriving GodotClass makes the class available to Godot
#[derive(GodotClass)]
#[class(base=Node)]
pub struct Main {
    mob_scene: Gd<PackedScene>,
    music: Option<Gd<AudioStreamPlayer>>,
    death_sound: Option<Gd<AudioStreamPlayer>>,
    score: i64,
    #[base]
    base: Base<Node>,
}

#[godot_api]
impl Main {
    #[func]
    fn game_over(&mut self) {
        let mut score_timer = self.base.get_node_as::<Timer>("ScoreTimer");
        let mut mob_timer = self.base.get_node_as::<Timer>("MobTimer");

        score_timer.stop();
        mob_timer.stop();

        let mut hud = self.base.get_node_as::<Hud>("Hud");
        hud.bind_mut().show_game_over();

        self.music().stop();
        self.death_sound().play(0.0);
    }

    #[func]
    pub fn new_game(&mut self) {
        let start_position = self.base.get_node_as::<Marker2D>("StartPosition");
        let mut player = self.base.get_node_as::<player::Player>("Player");
        let mut start_timer = self.base.get_node_as::<Timer>("StartTimer");

        self.score = 0;

        player.bind_mut().start(start_position.get_position());
        start_timer.start(0.0);

        let mut hud = self.base.get_node_as::<Hud>("Hud");
        let hud = hud.bind_mut();
        hud.update_score(self.score);
        hud.show_message("Get Ready".into());

        self.music().play(0.0);
    }

    #[func]
    fn on_start_timer_timeout(&self) {
        let mut mob_timer = self.base.get_node_as::<Timer>("MobTimer");
        let mut score_timer = self.base.get_node_as::<Timer>("ScoreTimer");
        mob_timer.start(0.0);
        score_timer.start(0.0);
    }

    #[func]
    fn on_score_timer_timeout(&mut self) {
        self.score += 1;

        let mut hud = self.base.get_node_as::<Hud>("Hud");
        hud.bind_mut().update_score(self.score);
    }

    #[func]
    fn on_mob_timer_timeout(&mut self) {
        let mut mob_spawn_location = self
            .base
            .get_node_as::<PathFollow2D>("MobPath/MobSpawnLocation");

        let mut mob_scene: Gd<RigidBody2D> = instantiate_scene(&self.mob_scene);

        let mut rng = rand::thread_rng();
        let progress = rng.gen_range(u32::MIN..u32::MAX);

        mob_spawn_location.set_progress(progress.into());
        mob_scene.set_position(mob_spawn_location.get_position());

        let mut direction = mob_spawn_location.get_rotation() + PI / 2.0;
        direction += rng.gen_range(-PI / 4.0..PI / 4.0);

        mob_scene.set_rotation(direction);

        self.base.add_child(
            mob_scene.share().upcast(),
            false,
            InternalMode::INTERNAL_MODE_DISABLED,
        );

        let mut mob = mob_scene.cast::<mob::Mob>();
        {
            // Local scope to bind `mob`
            let mut mob = mob.bind_mut();
            let range = rng.gen_range(mob.min_speed..mob.max_speed);

            mob.set_linear_velocity(Vector2::new(range, 0.0));
            let lin_vel = mob.get_linear_velocity().rotated(real::from_f64(direction));
            mob.set_linear_velocity(lin_vel);
        }

        let mut hud = self.base.get_node_as::<Hud>("Hud");
        hud.bind_mut().connect(
            "start_game".into(),
            Callable::from_object_method(mob, "on_start_game"),
            0,
        );
    }

    fn music(&mut self) -> &mut AudioStreamPlayer {
        self.music.as_deref_mut().unwrap()
    }

    fn death_sound(&mut self) -> &mut AudioStreamPlayer {
        self.death_sound.as_deref_mut().unwrap()
    }
}

#[godot_api]
impl NodeVirtual for Main {
    fn init(base: Base<Node>) -> Self {
        Main {
            mob_scene: PackedScene::new(),
            score: 0,
            base,
            music: None,
            death_sound: None,
        }
    }

    fn ready(&mut self) {
        // Note: this is downcast during load() -- completely type-safe thanks to type inference!
        // If the resource does not exist or has an incompatible type, this panics.
        // There is also try_load() if you want to check whether loading succeeded.
        self.mob_scene = load("res://Mob.tscn");
        self.music = Some(self.base.get_node_as("Music"));
        self.death_sound = Some(self.base.get_node_as("DeathSound"));
    }
}

/// Root here is needs to be the same type (or a parent type) of the node that you put in the child
///   scene as the root. For instance Spatial is used for this example.
fn instantiate_scene<Root>(scene: &PackedScene) -> Gd<Root>
where
    Root: GodotClass + Inherits<Node>,
{
    let s = scene
        .instantiate(GenEditState::GEN_EDIT_STATE_DISABLED)
        .expect("scene instantiated");

    s.cast::<Root>()
}

```

構造体と実装を書けばGodotからノードとして触れる。

構造体には以下のマクロが必要。
- `#[derive()]`は標準実装を提供する機能。traitsと違い、クラスの継承のように実装を追加する。こいつでGodotClassを貰い、Godotのネイティブクラスとして読めるように。
- `#[class()]`は`#[derive()]`とセットにしてクラスを継承する。`#[base]`つきのbaseが入る変数を忘れずに。

実装には`#[godot_api]`、実装内でgodotに公開する関数は`#[func]`を付ける。

ビルド前に、cargo.tomlに以下の内容を追加。

```toml
[dependencies]
godot = { git = "https://github.com/godot-rust/gdext", branch = "master" }

[lib]
crate-type = ["cdylib"]
```

そしてコンパイル。crate-typeのおかげでdllが出来る。コンパイルにはlibclang.dllもしくはclang.dll、それとgodot4.exeが必要。dllはllvmを導入すればついてくる。godot4.exeは起動用のexeのこと。こっちは名前が違うかもしれないが問題ない。
それぞれLIBCLANG_PATH、GODOT4_BINとして環境変数に登録しておく。必要なのは環境変数なので、環境変数さえ通ってればdllやexeの名前はどうでもいい。その場合はbinフォルダなどではなく直接ファイルにパスを通す。

ちなみにclangはc++のコンパイラ。llvm irという中間言語にいったん変換し最適化してからコンパイルする。llvmはllvm irを扱いプログラムを最適化するコンパイラ基盤。

dllが出来たら、godotプロジェクトを立ち上げ。rustプロジェクトとは別に作ること。`.gdextension`ファイルを作成し、dllファイルの場所を記述する。.gdextensionの名前は何でも良さそうだけど、このファイルごとにrustライブラリ一個しか読まなさそうなのでrustプロジェクト名がよさそう。

```toml
[configuration]
entry_symbol = "gdext_rust_init"

[libraries]
linux.debug.x86_64 = "res://../rust/target/debug/lib{my_ext}.so"
linux.release.x86_64 = "res://../rust/target/release/lib{my_ext}.so"
windows.debug.x86_64 = "res://../rust/target/debug/{my_ext}.dll"
windows.release.x86_64 = "res://../rust/target/release/{my_ext}.dll"
macos.debug = "res://../rust/target/debug/{my_ext}.dylib"
macos.release = "res://../rust/target/release/{my_ext}.dylib"
```

`[configuration]`はgodotがGDExtensionを初期化するのに使う関数らしい。なので変更不可、必須。

`res://`はgodotプロジェクト直下の位置。そこからdllまで引く。`my_ext`はコンパイルしたパッケージ名。

```bing
質問: https://github.com/godot-rust/gdext このページでは、[libraries]の名前は何でもいいのでしょうか？ 
返答: `[libraries]`セクションに記載される名前は、特定のプラットフォームとビルドタイプ（デバッグまたはリリース）に対応するRustライブラリのパスを指定するために使用されます。名前は、`<platform>.<build_type>.<architecture>`の形式で指定する必要があります。例えば、Linuxの64ビットアーキテクチャ用のデバッグビルドの場合、名前は`linux.debug.x86_64`になります。

質問: では、複数のRustライブラリを登録したいときは同じ名前に代入するような形でいいのでしょうか？
返答: いいえ、複数のRustライブラリを登録する場合、それぞれのライブラリに対して別々の`.gdextension`ファイルを作成し、それぞれのファイルで対応するRustライブラリのパスを指定する必要があります。各`.gdextension`ファイルには、対応するRustライブラリのパスだけが含まれます。
```

---
date: 2023-03-08
tags:
 - Info
---

up:: [Fyrox](<../Bar/GUI/Fyrox.md>)

[FPS Tutorial - Fyrox Book](https://fyrox-book.github.io/fyrox/tutorials/fps/intro.html)
[Custom game loop (Obsolete) - Fyrox Book](https://fyrox-book.github.io/fyrox/obsolete/custom_game_loop.html?highlight=event%3A%3Amain#custom-game-loop)

FPSチュートリアル、開幕のほとんどはカスタムでゲームループを開始する設定。
この部分は上級ユーザー用の設定かつFyrox現行バージョンだと廃止されてるのでRPGチュートリアルの方をやる。

```rust
use fyrox::{
    core::{
        algebra::{UnitQuaternion, Vector3},
        pool::Handle,
    },
    engine::{resource_manager::ResourceManager, Engine, EngineInitParams, SerializationContext},
    event::{DeviceEvent, ElementState, Event, VirtualKeyCode, WindowEvent},
    event_loop::{ControlFlow, EventLoop},
    resource::texture::TextureWrapMode,
    scene::{
        base::BaseBuilder,
        camera::{CameraBuilder, SkyBox, SkyBoxBuilder},
        collider::{ColliderBuilder, ColliderShape},
        node::Node,
        rigidbody::RigidBodyBuilder,
        transform::TransformBuilder,
        Scene,
    },
    window::WindowBuilder,
};
use std::{sync::Arc, time};
```

使うライブラリを読み込むとこ。


```rust

// Our game logic will be updated at 60 Hz rate.
const TIMESTEP: f32 = 1.0 / 60.0;

```

フレームレート。
rustは型推論してくれるので適当に書いてもコンパイル通る。
型を決めたいときは`変数名: 型`という風に書く。今回はfloat32。
engine.updateに引数として渡すので、一応変数名は何でもいい。

[Rustの型推論がどこまで強力なのか試してみた - Qiita](https://qiita.com/aimof/items/c00b911ef5fb8cfed149)


```rust

struct Game {
    // Empty for now.
}

impl Game {
    pub fn new() -> Self {
        Self {}
    }

    pub fn update(&mut self) {
        // Game logic will be placed here.
    }
}

```

structが構造体で、implが実装部分。
rustのクラスはこうやって二つを分離して作る感じっぽい。

[ECS](<./ECS.md>)
[Rustのimpl書き方が覚えられないのでまとめてみた](https://zenn.dev/anchor_cable/articles/b073d510c6ff9ff7111e#fnref-519c-1)

pubはpublic。アクセス修飾子。

[Rustのアクセス修飾子（pub） - やってみる](https://ytyaru.hatenablog.com/entry/2020/08/31/000000)

```rust

fn main() {
    // Configure main window first.
    let window_builder = WindowBuilder::new().with_title("3D Shooter Tutorial");
    // Create event loop that will be used to "listen" events from the OS.
    let event_loop = EventLoop::new();
```

`WindowBuilder::new()`。ウィンドウ作ってくれる。.with_titleでウィンドウのタイトルも書いてくれる。
`EventLoop::new()`。OSからイベント受けてアプリに投げる。

```rust
    // Finally create an instance of the engine.
    let serialization_context = Arc::new(SerializationContext::new());
    let mut engine = Engine::new(EngineInitParams {
        window_builder,
        resource_manager: ResourceManager::new(serialization_context.clone()),
        serialization_context,
        events_loop: &event_loop,
        vsync: false,
        headless: false
    })
    .unwrap();
```

`Arc::new()`。参照カウントされた共有スマートポインタ。
()内に入れた値のアドレスを保有してくれる。他の変数に同じアドレスを入れると参照カウントが増える。
よく似たものに`Rc`があり、これはスレッドセーフではないため他のスレッドに処理投げるとエラーが出るもののその分早い。
Arc、Rcともに弱点として循環参照を解決できないというものがある。方策としてはいろいろあるが、片方を弱参照にするのがいいらしい。

[Rustの \`Arc\` を読む(1): Arc/Rcの基本 - Qiita](https://qiita.com/qnighy/items/4bbbb20e71cf4ae527b9)

`SerializationContext::new()`。シリアライズ時、型のコンストラクタを保存するために必要。

`Engine::new()`。ゲームエンジンの設定を行う。
EngineInitParams構造体を投げ入れる。
今回は`vsync: false`。使うのにプラットフォームによって別に拡張機能が必要だったり、使うことで`.unwrap()`が使えなくなったりするので。
mutはmutable。rustの変数は基本的に書き換え不可なため、書き換えが必要な値はこうやってmutを付けておく。

```rust
    // Initialize game instance. It is empty for now.
    let mut game = Game::new();

```

ゲームインスタンス開始。

```rust

    // Run the event loop of the main window. which will respond to OS and window events and update
    // engine's state accordingly. Engine lets you to decide which event should be handled,
    // this is a minimal working example of how it should be.
    let mut previous = time::Instant::now();
    let mut lag = 0.0;
```

ゲームの前のフレームと更新フレーム間のラグ。

```rust
    event_loop.run(move |event, _, control_flow| {
        match event {

```

ゲームループ開始。
`||{}`はクロージャ。簡単な関数を定義せず変数に入れられるような機能。
縦棒の間には返り値を定義、`{}`に関数定義を入れる。
関数とは違う部分として定義の外にある変数を触ることが出来る、というものがある。この時参照として他の変数は受け取っている。これに`move`を付けると値として受け取る、つまり所有権をムーブすることになる。

[Rustでクロージャの左に置かれているmoveはなんですか？](https://teratail.com/questions/377403)

matchはenum専用のswitchみたいなやつ。
`match enum {enum要素 => 値}`とすることで、それぞれの場合に返す値を設定できる。
enum要素は普通`enum::enum要素`と呼ぶことになる。
matchの中身はmatchアームと呼ばれる。

[match制御フロー演算子 - The Rust Programming Language 日本語版](https://doc.rust-jp.rs/book-ja/ch06-02-match.html?highlight=match#match%E5%88%B6%E5%BE%A1%E3%83%95%E3%83%AD%E3%83%BC%E6%BC%94%E7%AE%97%E5%AD%90)


```rust
            Event::MainEventsCleared => {
                // This main game loop - it has fixed time step which means that game
                // code will run at fixed speed even if renderer can't give you desired
                // 60 fps.
                let elapsed = previous.elapsed();
                previous = time::Instant::now();
                lag += elapsed.as_secs_f32();
                while lag >= TIMESTEP {
                    lag -= TIMESTEP;

                    // Run our game's logic.
                    game.update();

                    // Update engine each frame.
                    engine.update(TIMESTEP, control_flow, &mut lag, Default::default());
                }

                // Rendering must be explicitly requested and handled after RedrawRequested event is received.
                engine.get_window().request_redraw();
            }
            Event::RedrawRequested(_) => {
                // Render at max speed - it is not tied to the game code.
                engine.render().unwrap();
            }
            Event::WindowEvent { event, .. } => match event {
                WindowEvent::CloseRequested => *control_flow = ControlFlow::Exit,
                WindowEvent::KeyboardInput { input, .. } => {
                    // Exit game by hitting Escape.
                    if let Some(VirtualKeyCode::Escape) = input.virtual_keycode {
                        *control_flow = ControlFlow::Exit
                    }
                }
                WindowEvent::Resized(size) => {
                    // It is very important to handle Resized event from window, because
                    // renderer knows nothing about window size - it must be notified
                    // directly when window size has changed.
                    engine.set_frame_size(size.into()).unwrap();
                }
                _ => (),
            },
            _ => *control_flow = ControlFlow::Poll,
        }
    });
}

```


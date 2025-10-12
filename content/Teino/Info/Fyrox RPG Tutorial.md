---
date: 2023-03-14
tags:
 - Info
---

up:: [Fyrox](<../Bar/GUI/Fyrox.md>)

[Character controller - Fyrox Book](https://fyrox-book.github.io/fyrox/tutorials/rpg/tutorial-1/tutorial-part-1.html)

`cargo init 名称`で初期化、fyroxを依存関係に追加。
一回ここでrun。自分の時はなぜかmain.rsが書き換えられてちょっと詰まった。

runで出来たmain.rsにエンジン初期化処理を書く。
細かいインターフェースをスキップで消す解説用処理。

アセットを追加し、`src/player/mod.rs`にキャラクタを生成して場所やスケールやピボットアタッチ、カメラアタッチなどの初期処理を用意しておく。

次はcamera.rs。

```rust
// Import everything we need for the tutorial.
use fyrox::{
    core::{
        algebra::{UnitQuaternion, Vector3},
        pool::Handle,
    },
    engine::resource_manager::ResourceManager,
    event::DeviceEvent,
    resource::texture::TextureWrapMode,
    scene::{
        base::BaseBuilder,
        camera::{CameraBuilder, SkyBox, SkyBoxBuilder},
        graph::Graph,
        node::Node,
        transform::TransformBuilder,
        pivot::PivotBuilder
    },
};

async fn create_skybox(resource_manager: ResourceManager) -> SkyBox {
    // Load skybox textures in parallel.
    let (front, back, left, right, top, bottom) = fyrox::core::futures::join!(
        resource_manager.request_texture("data/textures/skybox/front.jpg"),
        resource_manager.request_texture("data/textures/skybox/back.jpg"),
        resource_manager.request_texture("data/textures/skybox/left.jpg"),
        resource_manager.request_texture("data/textures/skybox/right.jpg"),
        resource_manager.request_texture("data/textures/skybox/up.jpg"),
        resource_manager.request_texture("data/textures/skybox/down.jpg")
    );

    // Unwrap everything.
    let skybox = SkyBoxBuilder {
        front: Some(front.unwrap()),
        back: Some(back.unwrap()),
        left: Some(left.unwrap()),
        right: Some(right.unwrap()),
        top: Some(top.unwrap()),
        bottom: Some(bottom.unwrap()),
    }
        .build()
        .unwrap();

    // Set S and T coordinate wrap mode, ClampToEdge will remove any possible seams on edges
    // of the skybox.
    let cubemap = skybox.cubemap();
    let mut data = cubemap.as_ref().unwrap().data_ref();
    data.set_s_wrap_mode(TextureWrapMode::ClampToEdge);
    data.set_t_wrap_mode(TextureWrapMode::ClampToEdge);

    skybox
}

```

ここまではモジュールとスカイボックス。

```rust

pub struct CameraController {
    pivot: Handle<Node>,
    hinge: Handle<Node>,
    camera: Handle<Node>,
}

impl CameraController {
    pub async fn new(graph: &mut Graph, resource_manager: ResourceManager) -> Self {
        let camera;
        let hinge;
        let pivot = PivotBuilder::new(BaseBuilder::new()
            .with_children(&[{
                hinge = PivotBuilder::new(BaseBuilder::new()
                    .with_local_transform(
                        TransformBuilder::new()
                            .with_local_position(Vector3::new(0.0, 0.55, 0.0))
                            .build(),
                    )
                    .with_children(&[{
                        camera = CameraBuilder::new(
                            BaseBuilder::new().with_local_transform(
                                TransformBuilder::new()
                                    .with_local_position(Vector3::new(0.0, 0.0, -2.0))
                                    .build(),
                            ),
                        )
                        .with_z_far(48.0)
                        .with_skybox(create_skybox(resource_manager).await)
                        .build(graph);
                        camera
                    }]))
                    .build(graph);
                hinge
            }]))
            .build(graph);

        Self {
            pivot,
            hinge,
            camera,
        }
    }
}
```

camera.rsここまで。
カメラ、ヒンジ、ピボットを用意。
ピボットにヒンジ、ヒンジにカメラを取り付ける。カメラはヒンジを中心に回転させる。これによりプレイヤーの頭を常に映すようにする。

![](https://fyrox-book.github.io/fyrox/tutorials/rpg/tutorial-1/camera-layout.png)

次はlevel.rs。

```rust
use fyrox::{
    core::pool::Handle,
    engine::resource_manager::{ResourceManager},
    scene::{node::Node, Scene},
};

pub struct Level {
    root: Handle<Node>,
}

impl Level {
    pub async fn new(resource_manager: ResourceManager, scene: &mut Scene) -> Self {
        let root = resource_manager
            .request_model("data/levels/level.rgs")
            .await
            .unwrap()
            .instantiate(scene);

        Self { root }
    }
}
```

level.rgsをロードするだけのコード。

最後にmain.rsを変更する。

```rust
use crate::{level::Level, player::Player};
use fyrox::{
    core::{color::Color, futures::executor::block_on, pool::Handle},
    engine::{resource_manager::ResourceManager, executor::Executor},
    event::{Event, WindowEvent},
    event_loop::ControlFlow,
    plugin::{Plugin, PluginConstructor, PluginContext},
    scene::{Scene},
};

mod level;
mod player;



struct Game {
    scene: Handle<Scene>,
    level: Level,
    player: Player,
}

struct GameConstructor;

impl PluginConstructor for GameConstructor {
    fn create_instance(&self, _: Handle<Scene>, context: PluginContext) -> Box<dyn Plugin> {
        Box::new(Game::new(context))
    }
}

impl Game {
    fn new(context: PluginContext) -> Self {
        let mut scene = Scene::new();

        scene.ambient_lighting_color = Color::opaque(150, 150, 150);

        let player = block_on(Player::new(context.resource_manager.clone(), &mut scene));

        Self {
            player,
            level: block_on(Level::new(context.resource_manager.clone(), &mut scene)),
            scene: context.scenes.add(scene),
        }
    }
}

impl Plugin for Game {
    fn update(&mut self, context: &mut PluginContext, _: &mut ControlFlow) {

    }

    fn on_os_event(
        &mut self,
        event: &Event<()>,
        _context: PluginContext,
        _control_flow: &mut ControlFlow,
    ) {
       
    }
}

fn main() {
    let mut executor = Executor::new();
    executor.add_plugin_constructor(GameConstructor);
    executor.get_window().set_title("RPG");
    executor.run();
}
```

クレートとしてlevelとplayerの構造体を追加、モジュールを読みに行った後、Game構造体に追加。
Gameメソッドでplayerとlevelを追加。block_onは読み込みが終わるまで呼び出し元をブロックする関数。非同期な読み込みで読みミスを防ぐためっぽい。

次はカメラをマウスで回す処理。
camera.rsを開き、構造体にyawとpitchを追加。new関数の戻り値内で初期化。
CameraControllerメソッドにhandle_device_eventを入れてマウスで制御できるようにする。

```rust
pub fn handle_device_event(&mut self, device_event: &DeviceEvent) {
    if let DeviceEvent::MouseMotion { delta } = device_event {
        const MOUSE_SENSITIVITY: f32 = 0.015;

        self.yaw -= (delta.0 as f32) * MOUSE_SENSITIVITY;
        self.pitch = (self.pitch + (delta.1 as f32) * MOUSE_SENSITIVITY)
            // Limit vertical angle to [-90; 90] degrees range
            .max(-90.0f32.to_radians())
            .min(90.0f32.to_radians());
    }
}
```

delta取りつつpitchはmaxminで値を制限するだけ。
ここで変更したyawとpitchはupdate関数で適用する。

```rust
pub fn update(&mut self, graph: &mut Graph) {
    // Apply rotation to the pivot.
    graph[self.pivot]
        .local_transform_mut()
        .set_rotation(UnitQuaternion::from_axis_angle(
            &Vector3::y_axis(),
            self.yaw,
        ));

    // Apply rotation to the hinge.
    graph[self.hinge]
        .local_transform_mut()
        .set_rotation(UnitQuaternion::from_axis_angle(
            &Vector3::x_axis(),
            self.pitch,
        ));
}
```

この二つのメソッドはimpl playerで呼ぶ。
PlayerはCameraControllerインスタンスを所有しているので。

```rust
    pub fn handle_device_event(&mut self, device_event: &DeviceEvent) {
        self.camera_controller.handle_device_event(device_event)
    }

    pub fn update(&mut self, scene: &mut Scene) {
        self.camera_controller.update(&mut scene.graph);
    }

```

ここはまだプロキシ。最後にこいつをGameから呼ぶ。
場所はon_device_eventとon_tick。

```rust
fn on_tick(&mut self, engine: &mut Engine, dt: f32, _control_flow: &mut ControlFlow) {
    let scene = &mut engine.scenes[self.scene];

    self.player.update(scene);
}

fn on_device_event(
    &mut self,
    _engine: &mut Engine,
    _device_id: DeviceId,
    event: DeviceEvent,
) {
    self.player.handle_device_event(&event);
}
```
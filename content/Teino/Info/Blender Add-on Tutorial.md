---
date: 2023-09-30
tags:
  - Info
---

up:: [Blender](<../Bar/App/Blender.md>)

[Add-on Tutorial — Blender Manual](https://docs.blender.org/manual/en/latest/advanced/scripting/addon_tutorial.html)

```python
bl_info = {
    "name": "Cursor Array",
    "blender": (2, 80, 0),
    "category": "Object",
}

import bpy


class ObjectCursorArray(bpy.types.Operator):
    """Object Cursor Array"""
    bl_idname = "object.cursor_array"
    bl_label = "Cursor Array"
    bl_options = {'REGISTER', 'UNDO'}

    total: bpy.props.IntProperty(name="Steps", default=2, min=1, max=100)

    def execute(self, context):
        scene = context.scene
        cursor = scene.cursor.location
        obj = context.active_object

        for i in range(self.total):
            obj_new = obj.copy()
            scene.collection.objects.link(obj_new)

            factor = i / self.total
            obj_new.location = (obj.location * factor) + (cursor * (1.0 - factor))

        return {'FINISHED'}


def menu_func(self, context):
    self.layout.operator(ObjectCursorArray.bl_idname)

# store keymaps here to access after registration
addon_keymaps = []


def register():
    bpy.utils.register_class(ObjectCursorArray)
    bpy.types.VIEW3D_MT_object.append(menu_func)

    # handle the keymap
    wm = bpy.context.window_manager
    # Note that in background mode (no GUI available), keyconfigs are not available either,
    # so we have to check this to avoid nasty errors in background case.
    kc = wm.keyconfigs.addon
    if kc:
        km = wm.keyconfigs.addon.keymaps.new(name='Object Mode', space_type='EMPTY')
        kmi = km.keymap_items.new(ObjectCursorArray.bl_idname, 'T', 'PRESS', ctrl=True, shift=True)
        kmi.properties.total = 4
        addon_keymaps.append((km, kmi))

def unregister():
    # Note: when unregistering, it's usually good practice to do it in reverse order you registered.
    # Can avoid strange issues like keymap still referring to operators already unregistered...
    # handle the keymap
    for km, kmi in addon_keymaps:
        km.keymap_items.remove(kmi)
    addon_keymaps.clear()

    bpy.utils.unregister_class(ObjectCursorArray)
    bpy.types.VIEW3D_MT_object.remove(menu_func)


if __name__ == "__main__":
    register()
```

メッシュから3Dカーソルまでで指定個数オブジェクトを複製するアドオン。

```python
bl_info = {
    "name": "Cursor Array",
    "blender": (2, 80, 0),
    "category": "Object",
}

import bpy
```

`bpy`からblender内部情報にアクセスできる。
`bl_info`でアドオンを検索したときの表示するメタ情報を管理。`"blender"`は最小バージョン。

```python
class ObjectCursorArray(bpy.types.Operator):
    """Object Cursor Array"""
    bl_idname = "object.cursor_array"
    bl_label = "Cursor Array"
    bl_options = {'REGISTER', 'UNDO'}

    total: bpy.props.IntProperty(name="Steps", default=2, min=1, max=100)

    def execute(self, context):
        scene = context.scene
        cursor = scene.cursor.location
        obj = context.active_object

        for i in range(self.total):
            obj_new = obj.copy()
            scene.collection.objects.link(obj_new)

            factor = i / self.total
            obj_new.location = (obj.location * factor) + (cursor * (1.0 - factor))

        return {'FINISHED'}
```

`class name(bpy.types.Operator)`でアドオンの本体を設定する。
`""" ~ bl_option`まではメタ情報。
`"""`はメニューアイテムとボタンに表示するツールチップ。
`bl_idname`はID。
`bl_label`はインターフェースの名前。
`bl_option`はundo用の設定。

アドオン内で数値を設定してほしい時は`bpy.props.IntProperty`などで設定する。

アドオンで実際何をするかは、class内に用意した`def execute`で設定。
引数のcontextは関数実行時のblenderの状態。いろいろなデータが入っている。
bpy.contextでもcontextを取得することは出来るが、こちらは**常に
スクリプト実行時の状態**が入っている。グローバル変数。

```python

def menu_func(self, context):
    self.layout.operator(ObjectCursorArray.bl_idname)

# store keymaps here to access after registration
addon_keymaps = []


def register():
    bpy.utils.register_class(ObjectCursorArray)
    bpy.types.VIEW3D_MT_object.append(menu_func)

    # handle the keymap
    wm = bpy.context.window_manager
    # Note that in background mode (no GUI available), keyconfigs are not available either,
    # so we have to check this to avoid nasty errors in background case.
    kc = wm.keyconfigs.addon
    if kc:
        km = wm.keyconfigs.addon.keymaps.new(name='Object Mode', space_type='EMPTY')
        kmi = km.keymap_items.new(ObjectCursorArray.bl_idname, 'T', 'PRESS', ctrl=True, shift=True)
        kmi.properties.total = 4
        addon_keymaps.append((km, kmi))

def unregister():
    # Note: when unregistering, it's usually good practice to do it in reverse order you registered.
    # Can avoid strange issues like keymap still referring to operators already unregistered...
    # handle the keymap
    for km, kmi in addon_keymaps:
        km.keymap_items.remove(kmi)
    addon_keymaps.clear()

    bpy.utils.unregister_class(ObjectCursorArray)
    bpy.types.VIEW3D_MT_object.remove(menu_func)
```

`def menu_func(self, context)`でメニューにスクリプトのONOFFを追加。
`def register()`でアドオン追加のチェックを入れた時に実行する関数を設定。キーマップも設定できる。
`def unregister()`でチェック外したときに実行する関数。


以上のアドオンはclassのところで`bpy.types.Operator`を継承しているため、ObjectメニューやOperator Searchからの呼出し後に数値を変更すると、その度に`execute`が実行される。

これを回避するには、他のクラスを継承すればいい。

[[Blender_Add-on_Panel]]

> [!tips]

[【Blender 2.8 アドオン開発】002 Blender API を調べて使ってみよう - めもてう](https://memoteu.hatenablog.com/entry/2019/02/05/230444)

preferences -> Interface -> Displayで`Tooltips`と`Python Tooltips`をONにすると、API上でのメニューの名前がある程度表示される。

pythonコンソール上では、`Ctrl + Space`で入力補完が出来る。

blender上でやり取りしてるデータは`context`、

プロパティをアドオン上から入力したいなら`props`
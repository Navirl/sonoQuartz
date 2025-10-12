---
date: 2023-10-27
tags:
  - Info
---

up:: [Blender](<../Bar/GUI/Blender.md>)

```python
bl_info = {
    "name": "Insert filepath",
    "blender": (2, 80, 0),
    "category": "Object",
}

import bpy
from bpy.props import StringProperty

class SimpleOperator(bpy.types.Operator):
    bl_idname = "object.simple_operator"
    bl_label = "Invoke File Dialog"

    filepath: StringProperty(
        name="File Path",      # プロパティ名
        default="",            # デフォルト値
        maxlen=1024,           # 最大文字列長
        subtype='FILE_PATH',   # サブタイプ
        description="",        # 説明文
    )

    def execute(self, context):
        display = "Selected file: %s" % (self.filepath)
        print(display)
        context.scene.filepath = self.filepath
        return {'FINISHED'}

    def invoke(self, context, event):
        context.window_manager.fileselect_add(self)
        return {'RUNNING_MODAL'}
    
    def draw(self, context):
        layout = self.layout
        layout.prop(self, "filepath")

class SimplePanel(bpy.types.Panel):
    bl_label = "File Dialog Panel"
    bl_idname = "SEQUENCER_PT_simple_panel"
    bl_space_type = 'SEQUENCE_EDITOR'
    bl_region_type = 'UI'
    bl_category = "File Dialog"

    def draw(self, context):
        layout = self.layout
        scene = context.scene
        layout.operator("object.simple_operator")
        layout.prop(scene, "filepath")

def register():
    bpy.utils.register_class(SimpleOperator)
    bpy.utils.register_class(SimplePanel)
    bpy.types.Scene.filepath = StringProperty(name="File Path")

def unregister():
    bpy.utils.unregister_class(SimpleOperator)
    bpy.utils.unregister_class(SimplePanel)
    del bpy.types.Scene.filepath

if __name__ == "__main__":
    register()

```

ファイルパスはオペレータ一つに付き一つしか保持できない。
`context.window_manager.fileselect_add(self)`で取れるのだが、これの返り値が何もしなくても`filepath`というプロパティに入力されるため。

ちなみに`filename`や`directory`という定数もある。

[2-10. BlenderのUIを制御する③ | はじめてのBlenderアドオン開発](https://colorful-pico.net/introduction-to-addon-development-in-blender/2.7/html/chapter_02/10_Control_Blender_UI_3.html)

ファイルを確定した後にexecuteが呼ばれるので、それより前のinvokeで呼ぶ。
ディレクトリを指定する場合は`FILE_PATH`を`DIR_PATH`にする。
`filepath: bpy.props.StringProperty(subtype="DIR_PATH")`のような形で変数に情報を付与することを**アノテーション**という。python3.6、Blender2.8で追加された機能。




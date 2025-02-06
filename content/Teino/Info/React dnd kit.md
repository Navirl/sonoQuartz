---
tags:
  - Info
---

daily:: [2024-08-16](/Daily_Note/2024-08-16.md)
up:: [React](../Bar/Library/React.md)

droppableとdraggableのセットで入力できる。

## 大体
useDndContext内で、

## useDroppable
```ts
const {setNodeRef} = useDroppable({
  id: props.id,
  data: {
    index: props.index,
  },
});
```

id:ドロップエリアの識別子
data:ドロップエリアが受け付けるデータ

##

## Sortable

```ts
import React from 'react';
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import {CSS} from '@dnd-kit/utilities';

function SortableItem(props) {
  const {attributes, listeners, setNodeRef, transform, transition} = useSortable({id: props.id});
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    padding: '8px',
    border: '1px solid #ccc',
    marginBottom: '4px',
    backgroundColor: '#fff',
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      {props.id}
    </div>
  );
}

function App() {
//itemsにItem入力
  const [items, setItems] = React.useState(['Item 1', 'Item 2', 'Item 3', 'Item 4']);
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    })
  );

  const handleDragEnd = (event) => {
    const {active, over} = event;

    if (active.id !== over.id) {
      setItems((items) => {
        const oldIndex = items.indexOf(active.id);
        const newIndex = items.indexOf(over.id);

        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext
      //Appの最初で入れたitemsをSortableに渡す
        items={items}
        strategy={verticalListSortingStrategy}
      >
        {items.map((id) => (
          <SortableItem key={id} id={id} />
        ))}
      </SortableContext>
    </DndContext>
  );
}

export default App;
```
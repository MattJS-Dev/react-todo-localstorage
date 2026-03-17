import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core"
import type { DragEndEvent } from "@dnd-kit/core"
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable"
import type { Todo } from "../../types/Todo"
import { TodoItem } from "../TodoItem/TodoItem"

interface TodoListProps {
  list: Todo[]
  onCheck: (id: number) => void
  onDelete: (id: number) => void
  onReorder: (oldIndex: number, newIndex: number) => void
}

export function TodoList({ list, onCheck, onDelete, onReorder }: TodoListProps) {
  const sensors = useSensors(useSensor(PointerSensor))

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event
    if (!over || active.id === over.id) return
    const oldIndex = list.findIndex((item) => item.id === active.id)
    const newIndex = list.findIndex((item) => item.id === over.id)
    onReorder(oldIndex, newIndex)
  }

  if (list.length === 0) {
    return <h2>Please add a todo</h2>
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext
        items={list.map((item) => item.id)}
        strategy={verticalListSortingStrategy}
      >
        <ul>
          {list.map((item) => (
            <TodoItem
              key={item.id}
              item={item}
              onCheck={onCheck}
              onDelete={onDelete}
            />
          ))}
        </ul>
      </SortableContext>
    </DndContext>
  )
}
import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import type { Todo } from "../../types/Todo"

interface TodoItemProps {
  item: Todo
  onCheck: (id: number) => void
  onDelete: (id: number) => void
}

export function TodoItem({ item, onCheck, onDelete }: TodoItemProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: item.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.4 : 1,
  }

  return (
    <li ref={setNodeRef} style={style} className="todo-item">
      <label>
        <input
          type="checkbox"
          checked={item.checked}
          onChange={() => onCheck(item.id)}
        />
        <span style={{ textDecoration: item.checked ? "line-through" : "none" }}>
          {item.text}
        </span>
      </label>
      <button
        className="delete-btn"
        onClick={() => onDelete(item.id)}
        aria-label="Delete todo"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="3 6 5 6 21 6" />
          <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
          <path d="M10 11v6" />
          <path d="M14 11v6" />
          <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
        </svg>
      </button>
      <span
        className="drag-handle"
        {...attributes}
        {...listeners}
        aria-label="Drag to reorder"
      >
        ⠿
      </span>
    </li>
  )
}
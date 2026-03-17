import type { Todo } from "../../types/Todo"

interface TodoItemProps {
  item: Todo
  onCheck: (id: number) => void
}

export function TodoItem({ item, onCheck }: TodoItemProps) {
  return (
    <li>
      <label style={{ cursor: "pointer" }}>
        <input
          type="checkbox"
          checked={item.checked}
          onChange={() => onCheck(item.id)}
        />
        <span style={{ textDecoration: item.checked ? "line-through" : "none" }}>
          {item.text}
        </span>
      </label>
    </li>
  )
}
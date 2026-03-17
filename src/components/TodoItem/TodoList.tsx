import type { Todo } from "../../types/Todo"
import { TodoItem } from '../TodoList/TodoItem'

interface TodoListProps {
  list: Todo[]
  onCheck: (id: number) => void
}

export function TodoList({ list, onCheck }: TodoListProps) {
  if (list.length === 0) {
    return <h2>Please add a todo</h2>
  }

  return (
    <ul>
      {list.map((item) => (
        <TodoItem key={item.id} item={item} onCheck={onCheck} />
      ))}
    </ul>
  )
}
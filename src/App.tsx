import { useState, useEffect } from "react"
import "./styles.css"
import { TodoForm } from "./components/TodoForm/TodoForm"
import { TodoList } from "./components/TodoList/TodoList"
import { addTodo, toggleTodo, deleteTodo, reorderTodos, loadList, saveList } from "./utils/todos"
import type { Todo } from "./types/Todo"

export default function App() {
  const [todo, setTodo] = useState<string>("")
  const [list, setList] = useState<Todo[]>(loadList)

  useEffect(() => {
    saveList(list)
  }, [list])

  function handleTodoClick(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setList((current) => addTodo(current, todo))
    setTodo("")
  }

  function handleCheck(id: number) {
    setList((current) => toggleTodo(current, id))
  }

  function handleDelete(id: number) {
    setList((current) => deleteTodo(current, id))
  }

  function handleReorder(oldIndex: number, newIndex: number) {
    setList((current) => reorderTodos(current, oldIndex, newIndex))
  }

  return (
    <div>
      <h1>My Todos</h1>
      <TodoForm todo={todo} setTodo={setTodo} onSubmit={handleTodoClick} />
      <TodoList
        list={list}
        onCheck={handleCheck}
        onDelete={handleDelete}
        onReorder={handleReorder}
      />
    </div>
  )
}
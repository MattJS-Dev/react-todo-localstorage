import React, { useState, useEffect } from 'react'
import "./index.css"
import { TodoForm } from './components/TodoForm/TodoForm'
import { TodoList } from './components/TodoItem/TodoList'
import { addTodo, toggleTodo, loadList, saveList } from "./utils/todos"
import type { Todo } from './types/Todo'

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

  return (
    <div>
      <h1>My Todos</h1>
      <TodoForm todo={todo} setTodo={setTodo} onSubmit={handleTodoClick} />
      <TodoList list={list} onCheck={handleCheck} />
    </div>
  )
}
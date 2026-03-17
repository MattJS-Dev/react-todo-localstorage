import type { Todo } from "../types/Todo"

export function addTodo(list: Todo[], text: string): Todo[] {
  if (!text.trim()) return list
  return [...list, { id: Date.now(), text: text.trim(), checked: false }]
}

export function toggleTodo(list: Todo[], id: number): Todo[] {
  return list.map((item) =>
    item.id === id ? { ...item, checked: !item.checked } : item
  )
}

export function loadList(): Todo[] {
  try {
    const stored = localStorage.getItem("todos")
    return stored ? JSON.parse(stored) : []
  } catch {
    return []
  }
}

export function saveList(list: Todo[]): void {
  localStorage.setItem("todos", JSON.stringify(list))
}
import { describe, it, expect, beforeEach, vi } from "vitest"
import { addTodo, toggleTodo, deleteTodo, reorderTodos, loadList, saveList } from "./todos"
import type { Todo } from "../types/Todo"

const mockList: Todo[] = [
  { id: 1, text: "Buy milk", checked: false },
  { id: 2, text: "Walk the dog", checked: false },
  { id: 3, text: "Read a book", checked: false },
]

describe("addTodo", () => {
  it("adds a new todo to the list", () => {
    const result = addTodo(mockList, "New todo")
    expect(result).toHaveLength(4)
    expect(result[3].text).toBe("New todo")
    expect(result[3].checked).toBe(false)
  })

  it("does not add a todo with empty text", () => {
    const result = addTodo(mockList, "")
    expect(result).toHaveLength(3)
  })

  it("does not add a todo with only whitespace", () => {
    const result = addTodo(mockList, "   ")
    expect(result).toHaveLength(3)
  })

  it("trims whitespace from the todo text", () => {
    const result = addTodo(mockList, "  Buy eggs  ")
    expect(result[3].text).toBe("Buy eggs")
  })

  it("does not mutate the original list", () => {
    const original = [...mockList]
    addTodo(mockList, "New todo")
    expect(mockList).toEqual(original)
  })
})

describe("toggleTodo", () => {
  it("checks an unchecked todo", () => {
    const result = toggleTodo(mockList, 1)
    expect(result[0].checked).toBe(true)
  })

  it("unchecks a checked todo", () => {
    const checkedList: Todo[] = [{ id: 1, text: "Buy milk", checked: true }]
    const result = toggleTodo(checkedList, 1)
    expect(result[0].checked).toBe(false)
  })

  it("only toggles the matching todo", () => {
    const result = toggleTodo(mockList, 1)
    expect(result[1].checked).toBe(false)
  })

  it("does not mutate the original list", () => {
    const original = [...mockList]
    toggleTodo(mockList, 1)
    expect(mockList).toEqual(original)
  })

  it("returns the list unchanged if id does not exist", () => {
    const result = toggleTodo(mockList, 999)
    expect(result).toEqual(mockList)
  })
})

describe("deleteTodo", () => {
  it("removes the todo with the matching id", () => {
    const result = deleteTodo(mockList, 1)
    expect(result).toHaveLength(2)
    expect(result.find((item) => item.id === 1)).toBeUndefined()
  })

  it("leaves the remaining todos intact", () => {
    const result = deleteTodo(mockList, 1)
    expect(result[0]).toEqual({ id: 2, text: "Walk the dog", checked: false })
    expect(result[1]).toEqual({ id: 3, text: "Read a book", checked: false })
  })

  it("returns the list unchanged if id does not exist", () => {
    const result = deleteTodo(mockList, 999)
    expect(result).toEqual(mockList)
  })

  it("returns an empty list when the last item is deleted", () => {
    const single: Todo[] = [{ id: 1, text: "Buy milk", checked: false }]
    const result = deleteTodo(single, 1)
    expect(result).toHaveLength(0)
  })

  it("does not mutate the original list", () => {
    const original = [...mockList]
    deleteTodo(mockList, 1)
    expect(mockList).toEqual(original)
  })
})

describe("reorderTodos", () => {
  it("moves an item forward in the list", () => {
    const result = reorderTodos(mockList, 0, 2)
    expect(result[0].text).toBe("Walk the dog")
    expect(result[1].text).toBe("Read a book")
    expect(result[2].text).toBe("Buy milk")
  })

  it("moves an item backward in the list", () => {
    const result = reorderTodos(mockList, 2, 0)
    expect(result[0].text).toBe("Read a book")
    expect(result[1].text).toBe("Buy milk")
    expect(result[2].text).toBe("Walk the dog")
  })

  it("returns the same order if old and new index are the same", () => {
    const result = reorderTodos(mockList, 1, 1)
    expect(result).toEqual(mockList)
  })

  it("preserves the length of the list", () => {
    const result = reorderTodos(mockList, 0, 2)
    expect(result).toHaveLength(3)
  })

  it("does not mutate the original list", () => {
    const original = [...mockList]
    reorderTodos(mockList, 0, 2)
    expect(mockList).toEqual(original)
  })

  it("preserves all todo properties when reordering", () => {
    const result = reorderTodos(mockList, 0, 1)
    expect(result[1]).toEqual({ id: 1, text: "Buy milk", checked: false })
  })
})

describe("saveList and loadList", () => {
  beforeEach(() => {
    localStorage.clear()
    vi.restoreAllMocks()
  })

  it("saves and loads a list from localStorage", () => {
    saveList(mockList)
    const result = loadList()
    expect(result).toEqual(mockList)
  })

  it("returns an empty array if localStorage is empty", () => {
    const result = loadList()
    expect(result).toEqual([])
  })

  it("returns an empty array if localStorage contains invalid JSON", () => {
    localStorage.setItem("todos", "not-valid-json")
    const result = loadList()
    expect(result).toEqual([])
  })
})
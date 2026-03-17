import { describe, it, expect, beforeEach, vi } from "vitest"
import { addTodo, toggleTodo, loadList, saveList } from "./todos"
import type { Todo } from "../types/Todo"

const mockList: Todo[] = [
  { id: 1, text: "Buy milk", checked: false },
  { id: 2, text: "Walk the dog", checked: false },
]

describe("addTodo", () => {
  it("adds a new todo to the list", () => {
    const result = addTodo(mockList, "New todo")
    expect(result).toHaveLength(3)
    expect(result[2].text).toBe("New todo")
    expect(result[2].checked).toBe(false)
  })

  it("does not add a todo with empty text", () => {
    const result = addTodo(mockList, "")
    expect(result).toHaveLength(2)
  })

  it("does not add a todo with only whitespace", () => {
    const result = addTodo(mockList, "   ")
    expect(result).toHaveLength(2)
  })

  it("trims whitespace from the todo text", () => {
    const result = addTodo(mockList, "  Buy eggs  ")
    expect(result[2].text).toBe("Buy eggs")
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
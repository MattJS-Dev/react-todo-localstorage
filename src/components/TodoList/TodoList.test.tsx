import { describe, it, expect, vi } from "vitest"
import { render, screen } from "@testing-library/react"
import { TodoList } from "../TodoItem/TodoList"
import type { Todo } from "../../types/Todo"

const mockList: Todo[] = [
  { id: 1, text: "Buy milk", checked: false },
  { id: 2, text: "Walk the dog", checked: true },
]

describe("TodoList", () => {
  it("renders the empty state message when list is empty", () => {
    render(<TodoList list={[]} onCheck={vi.fn()} />)
    expect(screen.getByText(/please add a todo/i)).toBeDefined()
  })

  it("does not render the empty state when list has items", () => {
    render(<TodoList list={mockList} onCheck={vi.fn()} />)
    expect(screen.queryByText(/please add a todo/i)).toBeNull()
  })

  it("renders the correct number of list items", () => {
    render(<TodoList list={mockList} onCheck={vi.fn()} />)
    expect(screen.getAllByRole("listitem")).toHaveLength(2)
  })

  it("renders the text of each todo", () => {
    render(<TodoList list={mockList} onCheck={vi.fn()} />)
    expect(screen.getByText("Buy milk")).toBeDefined()
    expect(screen.getByText("Walk the dog")).toBeDefined()
  })
})
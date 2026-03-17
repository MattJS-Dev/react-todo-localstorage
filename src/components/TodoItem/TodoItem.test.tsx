import { describe, it, expect, vi } from "vitest"
import { render, screen, fireEvent } from "@testing-library/react"
import { TodoItem } from "../TodoList/TodoItem"
import type { Todo } from "../../types/Todo"

const uncheckedTodo: Todo = { id: 1, text: "Buy milk", checked: false }
const checkedTodo: Todo = { id: 2, text: "Walk the dog", checked: true }

describe("TodoItem", () => {
  it("renders the todo text", () => {
    render(<TodoItem item={uncheckedTodo} onCheck={vi.fn()} />)
    expect(screen.getByText("Buy milk")).toBeDefined()
  })

  it("renders an unchecked checkbox when checked is false", () => {
    render(<TodoItem item={uncheckedTodo} onCheck={vi.fn()} />)
    const checkbox = screen.getByRole("checkbox") as HTMLInputElement
    expect(checkbox.checked).toBe(false)
  })

  it("renders a checked checkbox when checked is true", () => {
    render(<TodoItem item={checkedTodo} onCheck={vi.fn()} />)
    const checkbox = screen.getByRole("checkbox") as HTMLInputElement
    expect(checkbox.checked).toBe(true)
  })

  it("applies line-through style when checked", () => {
    render(<TodoItem item={checkedTodo} onCheck={vi.fn()} />)
    const span = screen.getByText("Walk the dog")
    expect(span.style.textDecoration).toBe("line-through")
  })

  it("does not apply line-through style when unchecked", () => {
    render(<TodoItem item={uncheckedTodo} onCheck={vi.fn()} />)
    const span = screen.getByText("Buy milk")
    expect(span.style.textDecoration).toBe("none")
  })

  it("calls onCheck with the correct id when checkbox is clicked", () => {
    const onCheck = vi.fn()
    render(<TodoItem item={uncheckedTodo} onCheck={onCheck} />)
    fireEvent.click(screen.getByRole("checkbox"))
    expect(onCheck).toHaveBeenCalledWith(1)
  })

  it("calls onCheck with the correct id when the text label is clicked", () => {
    const onCheck = vi.fn()
    render(<TodoItem item={uncheckedTodo} onCheck={onCheck} />)
    fireEvent.click(screen.getByText("Buy milk"))
    expect(onCheck).toHaveBeenCalledWith(1)
  })
})
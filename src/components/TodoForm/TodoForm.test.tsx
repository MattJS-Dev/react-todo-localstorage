import { describe, it, expect, vi } from "vitest"
import { render, screen, fireEvent } from "@testing-library/react"
import { TodoForm } from "./TodoForm"

describe("TodoForm", () => {
  it("renders the input and button", () => {
    render(<TodoForm todo="" setTodo={vi.fn()} onSubmit={vi.fn()} />)
    expect(screen.getByRole("textbox", { name: /add your todo/i })).toBeDefined()
    expect(screen.getByRole("button", { name: /add/i })).toBeDefined()
  })

  it("displays the current todo value in the input", () => {
    render(<TodoForm todo="Buy milk" setTodo={vi.fn()} onSubmit={vi.fn()} />)
    const input = screen.getByRole("textbox") as HTMLInputElement
    expect(input.value).toBe("Buy milk")
  })

  it("calls setTodo when the input value changes", () => {
    const setTodo = vi.fn()
    render(<TodoForm todo="" setTodo={setTodo} onSubmit={vi.fn()} />)
    fireEvent.change(screen.getByRole("textbox"), { target: { value: "New todo" } })
    expect(setTodo).toHaveBeenCalledWith("New todo")
  })

  it("calls onSubmit when the form is submitted via button click", () => {
    const onSubmit = vi.fn((e) => e.preventDefault())
    render(<TodoForm todo="Buy milk" setTodo={vi.fn()} onSubmit={onSubmit} />)
    fireEvent.click(screen.getByRole("button", { name: /add/i }))
    expect(onSubmit).toHaveBeenCalledTimes(1)
  })

  it("calls onSubmit when the form is submitted via enter key", () => {
    const onSubmit = vi.fn((e) => e.preventDefault())
    render(<TodoForm todo="Buy milk" setTodo={vi.fn()} onSubmit={onSubmit} />)
    fireEvent.submit(screen.getByRole("textbox"))
    expect(onSubmit).toHaveBeenCalledTimes(1)
  })
})
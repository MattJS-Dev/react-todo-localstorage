import { describe, it, expect, beforeEach } from "vitest"
import { render, screen, fireEvent } from "@testing-library/react"
import App from "./App"

describe("App", () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it("renders the heading", () => {
    render(<App />)
    expect(screen.getByRole("heading", { name: /my todos/i })).toBeDefined()
  })

  it("renders the empty state message on first load", () => {
    render(<App />)
    expect(screen.getByText(/please add a todo/i)).toBeDefined()
  })

  it("adds a todo to the list when the form is submitted", () => {
    render(<App />)
    fireEvent.change(screen.getByRole("textbox"), { target: { value: "Buy milk" } })
    fireEvent.click(screen.getByRole("button", { name: /add/i }))
    expect(screen.getByText("Buy milk")).toBeDefined()
  })

  it("clears the input after a todo is added", () => {
    render(<App />)
    const input = screen.getByRole("textbox") as HTMLInputElement
    fireEvent.change(input, { target: { value: "Buy milk" } })
    fireEvent.click(screen.getByRole("button", { name: /add/i }))
    expect(input.value).toBe("")
  })

  it("does not add a todo when the input is empty", () => {
    render(<App />)
    fireEvent.click(screen.getByRole("button", { name: /add/i }))
    expect(screen.queryByRole("listitem")).toBeNull()
  })

  it("toggles a todo to checked when clicked", () => {
    render(<App />)
    fireEvent.change(screen.getByRole("textbox"), { target: { value: "Buy milk" } })
    fireEvent.click(screen.getByRole("button", { name: /add/i }))
    const checkbox = screen.getByRole("checkbox") as HTMLInputElement
    fireEvent.click(checkbox)
    expect(checkbox.checked).toBe(true)
  })

  it("persists todos to localStorage when added", () => {
    render(<App />)
    fireEvent.change(screen.getByRole("textbox"), { target: { value: "Buy milk" } })
    fireEvent.click(screen.getByRole("button", { name: /add/i }))
    const stored = JSON.parse(localStorage.getItem("todos") || "[]")
    expect(stored[0].text).toBe("Buy milk")
  })

  it("loads todos from localStorage on mount", () => {
    localStorage.setItem(
      "todos",
      JSON.stringify([{ id: 1, text: "Persisted todo", checked: false }])
    )
    render(<App />)
    expect(screen.getByText("Persisted todo")).toBeDefined()
  })
})
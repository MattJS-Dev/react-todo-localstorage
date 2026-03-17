interface TodoFormProps {
  todo: string
  setTodo: (value: string) => void
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void
}

export function TodoForm({ todo, setTodo, onSubmit }: TodoFormProps) {
  return (
    <form onSubmit={onSubmit}>
      <input
        type="text"
        aria-label="Add your todo"
        placeholder="Add a new todo..."
        value={todo}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTodo(e.target.value)}
      />
      <button type="submit">Add</button>
    </form>
  )
}
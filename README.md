# React Todo App

A fully-featured todo application built with React 19 and TypeScript. Supports adding, checking, deleting, and drag-and-drop reordering of tasks, with all data persisted to localStorage. Thoroughly tested with Vitest and React Testing Library.

---

## Features

- **Add todos** — type a task and submit via the Add button or the Enter key
- **Check todos** — click a todo or its checkbox to mark it as complete with a strikethrough
- **Delete todos** — remove individual todos via the trash icon; changes are reflected immediately in localStorage
- **Drag to reorder** — drag any todo using the handle on the right to rearrange the list
- **LocalStorage persistence** — the todo list is saved to and loaded from localStorage automatically
- **Responsive design** — clean dark mode UI that works well on both desktop and mobile

---

## Project Structure

```
src/
├── components/
│   ├── TodoForm/
│   │   ├── TodoForm.tsx
│   │   └── TodoForm.test.tsx
│   ├── TodoItem/
│   │   ├── TodoItem.tsx
│   │   └── TodoItem.test.tsx
│   └── TodoList/
│       ├── TodoList.tsx
│       └── TodoList.test.tsx
├── utils/
│   ├── todos.ts
│   └── todos.test.ts
├── types/
│   └── Todo.ts
├── App.tsx
├── App.test.tsx
├── main.tsx
└── styles.css
```

Tests are co-located next to the files they test. This makes it immediately clear when a file is missing tests and ensures tests are removed alongside the code they cover.

---

## Getting Started

### Installation

```bash
npm install
```

### Running the App

```bash
npm run dev
```

---

## Testing

The project has 55 tests across 5 test files covering utility functions, individual components, and full integrated user flows.

### Run in watch mode (recommended during development)

```bash
npm test
```

### Run once (useful for CI)

```bash
npm run test:run
```

### Test coverage by file

| File | What is tested |
|---|---|
| `utils/todos.test.ts` | `addTodo`, `toggleTodo`, `deleteTodo`, `reorderTodos`, `saveList`, `loadList` |
| `TodoForm.test.tsx` | Renders correctly, input change, form submission via button and Enter key |
| `TodoItem.test.tsx` | Renders text, checkbox state, strikethrough style, check/delete/drag interactions |
| `TodoList.test.tsx` | Empty state, item count, renders all todos, delete and drag handles per item |
| `App.test.tsx` | Add, check, delete, localStorage persistence, loading from localStorage on mount |

> **Note on drag and drop testing:** The actual drag interaction cannot be tested in jsdom as it has no real pointer event implementation. The `reorderTodos` utility function is tested thoroughly with unit tests, covering all reordering logic. Full drag and drop integration tests would require an end-to-end tool such as Playwright or Cypress.

---

## Dependencies

### Production

```json
"@dnd-kit/core": "^6.3.1",
"@dnd-kit/sortable": "^10.0.0",
"@dnd-kit/utilities": "^3.2.2",
"react": "^19.2.4",
"react-dom": "^19.2.4"
```

### Development

```json
"@testing-library/dom": "^10.4.1",
"@testing-library/react": "^16.3.2",
"@types/react": "^19.2.14",
"@types/react-dom": "^19.2.3",
"@vitejs/plugin-react": "^6.0.1",
"jsdom": "^29.0.0",
"typescript": "~5.9.3",
"vite": "^8.0.0",
"vitest": "^4.1.0"
```
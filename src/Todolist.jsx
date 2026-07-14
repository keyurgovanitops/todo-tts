import axios from 'axios'
import { CircleLoader } from 'react-spinners'

export default function Todolist({
  todos,
  setTodos,
  editingId,
  setEditingId,
  setInput,
  isBusy,
  setIsBusy,
  pendingId,
  setPendingId,
  apiUrl,
}) {
  const handleEdit = (todo) => {
    setInput(todo.text)
    setEditingId(todo.id)
  }

  const handleDelete = async (id) => {
    setPendingId(id)
    setIsBusy(true)

    try {
      await axios.delete(`${apiUrl}/${id}`) // template literal
      setTodos((prev) => prev.filter((todo) => todo.id !== id))

      if (editingId === id) {
        setEditingId(null)
        setInput('')
      }
    } catch (error) {
      console.error(error)
      alert('Could not delete the todo.')
    } finally {
      setPendingId(null)
      setIsBusy(false)
    }
  }

  return (
    <ul className="todo-list">
      {todos.map((todo) => (
        <li key={todo.id}>
          <span>{todo.text}</span>
          <div className="actions">
            <button type="button" className="edit-btn" onClick={() => handleEdit(todo)} disabled={isBusy}>
              Edit
            </button>
            <button
              type="button"
              className="delete-btn"
              onClick={() => handleDelete(todo.id)}
              disabled={isBusy && pendingId === todo.id}
            >
              {pendingId === todo.id && isBusy ? <CircleLoader loading size={14} color="#b91c1c" /> : 'Delete'}
            </button>
          </div>
        </li>
      ))}
    </ul>
  )
}

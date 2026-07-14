import axios from 'axios'
import { CircleLoader } from 'react-spinners'

export default function Inputbox({
  input,
  setInput,
  setTodos,
  editingId,
  setEditingId,
  isBusy,
  setIsBusy,
  onCancel,
  apiUrl,
}) {
  const handleSubmit = async (event) => {
    event.preventDefault()
    const text = input.trim()

    if (!text) return;

    setIsBusy(true)

    try {
      if (editingId) {
        const { data } = await axios.put(`${apiUrl}/${editingId}`, { text })
        setTodos((prev) => prev.map((todo) => (todo.id === editingId ? data : todo)))
      } else {
        const { data } = await axios.post(apiUrl, { text })
        setTodos((prev) => [data, ...prev])
      }

      setInput('')
      setEditingId(null)
    } catch (error) {
      console.error(error)
      alert(editingId ? 'Could not update the todo.' : 'Could not add the todo.')
    } finally {
      setIsBusy(false)
    }
  }

  return (
    <>
      <form className="input-row" onSubmit={handleSubmit}>
        <input
          value={input}
          onChange={(event) => setInput(event.target.value)}
          placeholder="Enter a new todo"
        />
        <button type="submit" disabled={isBusy}>
          {isBusy ? <CircleLoader loading={isBusy} size={18} color="#fff" /> : editingId ? 'Update' : 'Add'}
        </button>
      </form>

      {editingId ? (
        <button className="cancel-btn" type="button" onClick={onCancel}>
          Cancel edit
        </button>
      ) : null}
    </>
  )
}

import { useEffect, useState } from 'react'
import axios from 'axios'
import { CircleLoader } from 'react-spinners'
import './App.css'
import Inputbox from './Inputbox'
import Todolist from './Todolist'

const API_URL = 'https://6a4648c2a268c8be2ce78d13.mockapi.io/todo'

function App() {
  const [todos, setTodos] = useState([])
  const [input, setInput] = useState('')
  const [editingId, setEditingId] = useState(null)
  const [loading, setLoading] = useState(true)
  const [isBusy, setIsBusy] = useState(false)
  const [pendingId, setPendingId] = useState(null)

  const fetchTodos = async () => {
    try {
      setLoading(true)
      const { data } = await axios.get(API_URL)
      setTodos(data)
    } catch (error) {
      console.error(error)
      alert('Unable to load todos right now. Please try again.')
    } finally {
      setLoading(false)
      setIsBusy(false)
    }
  }

  useEffect(() => {
    fetchTodos()
  }, [])

  const handleCancel = () => {
    setInput('')
    setEditingId(null)
  }

  return (
    <div className="app-shell">
      {isBusy ? (
        <div className="loading-overlay" aria-label="Loading">
          <div className="loading-box">
            <CircleLoader size={38} color="#fff" />
          </div>
        </div>
      ) : null}

      <div className="todo-card">

        <Inputbox
          input={input}
          setInput={setInput}
          setTodos={setTodos}
          editingId={editingId}
          setEditingId={setEditingId}
          isBusy={isBusy}
          setIsBusy={setIsBusy}
          onCancel={handleCancel}
          apiUrl={API_URL}
        />

        {loading ? (
          <div className="loading-state">
            <CircleLoader loading={loading} size={30} color="#7c3aed" />
            <p>Loading your tasks...</p>
          </div>
        ) : todos.length === 0 ? (
          <div className="empty-state">
            <p>No todos yet.</p>
            <span>Add one above to get started.</span>
          </div>
        ) : (
          <Todolist
            todos={todos}
            setTodos={setTodos}
            editingId={editingId}
            setEditingId={setEditingId}
            setInput={setInput}
            isBusy={isBusy}
            setIsBusy={setIsBusy}
            pendingId={pendingId}
            setPendingId={setPendingId}
            apiUrl={API_URL}
          />
        )}
      </div>
    </div>
  )
}

export default App

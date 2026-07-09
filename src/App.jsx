import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import Inputbox from './Inputbox'
import Todolist from './Todolist'

function App() {
  
  const [input, setInput] = useState('');
  const [todos, setTodos] = useState([
        'todo 1', 
        'todo 2'
    ]);

  return (
    <>
      <Inputbox input={input} setInput={setInput} setTodos={setTodos} />
      <Todolist todos={todos} setTodos={setTodos} />
    </>
  )
}

export default App

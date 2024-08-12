import { useState,useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid';
import './App.css'
import Navbar from './components/Navbar'
import { BiSolidMessageEdit } from "react-icons/bi"
import { MdAutoDelete } from "react-icons/md";
function App() {

  const [todo, setTodo] = useState("")
  const [todos, setTodos] = useState([])
  const [showfinished, setShowfinished] = useState(true)

  const saveToLS = (params) => {

    localStorage.setItem("todos", JSON.stringify(todos))
  }

  useEffect(() => {
    if (todos.length > 0) {
      saveToLS()
      console.log(todos)
    }
  }, [todos])

  useEffect(() => {
    let todoString = localStorage.getItem("todos")
    // console.log(todoString)
    if (todoString) {
      let todos = JSON.parse(localStorage.getItem("todos"))
      setTodos(todos)
    }
  }, [])



 


  const handleAdd = () => {
    setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }])
    setTodo("")
   
  }
  const handleEdit = (id) => {
    let t = todos.filter(e => e.id === id )
   
    setTodo(t[0].todo)
    let newtodos = todos.filter(item => {
      return item.id !== id
    });
    setTodos(newtodos)
    saveToLS()
  }
  const handleDelete = (id) => {
    let newtodos = todos.filter(item => {
      return item.id !== id
    });
    setTodos(newtodos)
    saveToLS()
  }
  const handleChange = (e) => {
    setTodo(e.target.value)
  
  }
  const ToggleFinished = (e) => {
    console.log("b "+showfinished)
    setShowfinished(!showfinished)
    console.log(showfinished)
  
  }
  const handleCheckBox = (e) => {
    let id = e.target.name
    let index = todos.findIndex(item => {
      return item.id===id
    })
    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted
    setTodos(newTodos)
    saveToLS()
  }
 
  return (
    <>
      <Navbar/>
      <div className='container mx-auto mt-16'> 
        <div className="bg-violet-200 h-[80vh] p-6 border rounded-3xl">
          <div className="flex flex-col gap-4">
            <div className='flex justify-center text-xl font-medium underline'>ITask : Manage your todos at one place</div>
            <span className='font-bold text-2xl'>Add Todos</span>
            <div className='flex gap-8'>
              <input onChange={handleChange} value={todo} type="text" className='w-1/2 h-8 border border-violet-900 shadow-lg shadow-violet-400'  />
              <button onClick={handleAdd} disabled={todo.length<=3} className='shadow-lg disabled:bg-violet-700 shadow-violet-500 bg-violet-700 border rounded-md p-1 pl-2 pr-2 font-bold text-white'>ADD</button>
            </div>
           
          </div>
          <div className='mt-8'>
           
            <span className='font-bold text-2xl'>Your Todos</span>
            <div className="todos">
              <input type="checkbox" onClick={ToggleFinished} checked={showfinished} className='size-4 mt-1' /> Show Finished
              {todos.length === 0 && <div className='font-bold mt-10 text-4xl text-gray-600'>NO TODOS FOUND !!</div>}
              {todos.map((items) => {
                return (showfinished || !items.isCompleted ) && < div key={items.id} className={'flex gap-7 mt-4 bg-violet-300 p-2 border border-white shadow-2xl shadow-violet-500 rounded-xl justify-between'}>
                  <input name={items.id} onChange={handleCheckBox} type="checkbox" className='size-4 mt-1' checked={items.isCompleted} />
                  <div className='w-3/4 font-medium '>
                    <p className={items.isCompleted ? "line-through text-xl" : ""}>{items.todo}</p>
                  </div>
                  <div className='flex gap-7'>
                    <button onClick={() => { handleEdit(items.id) }} className='bg-violet-700 border rounded-md p-1 pl-6 pr-6 font-bold text-white shadow-lg shadow-violet-500 max-sm:p-1'><BiSolidMessageEdit /></button>
                    <button onClick={() => { handleDelete(items.id) }} className='bg-violet-700 border rounded-md p-1 pl-6 pr-6 font-bold text-white shadow-lg shadow-violet-500 max-sm:p-1'><MdAutoDelete /></button>
                  </div>
                </div>
             })}
            </div>
         
          </div>
        </div>
     </div>
    </>
  )
}

export default App

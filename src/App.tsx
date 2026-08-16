import './App.css'
import Navbar from './components/Navbar'
import { useState, useEffect } from 'react';
type Todo = {
  id: string,
  title: string,
  description: string,
  isCompleted: boolean,
  priority: string,
  category: string,
  createdAt: Date,
}

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
 // const [loading, setLoading] = useState<boolean>(false);
  useEffect(()=>{
    const fetchedTodos = async () => {
      try {
        const response = await fetch('https://6a812a5e400f94b23c6f47e7.mockapi.io/api/v1/todos');
        const data = await response.json();
        setTodos(data);
      } catch (error) {
        console.error("failed to fetch data:", error);
      }
    }
    fetchedTodos();
  }, [todos])

  const deleteTodo = async (todoId: string) => {
    try {
      const response = await fetch(
        `https://6a812a5e400f94b23c6f47e7.mockapi.io/api/v1/todos/${todoId}`,
        {
          method: 'DELETE',
        }
      );
      const deletedTodo = await response.json();
      setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== todoId));
    } catch (error) {
      console.error('Failed to delete todo:', error);
    }
  };
   return (
   <div style={{background: 'white'}}>
    <Navbar />
    <div style={{border: "1px solid black", width: "100%"}}></div>
    {!todos && <p>loading.....</p>}
    <div style={{display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '10px'}}>
      {todos.map((todo) => (
        <div key={todo.id} style={{border: '1px solid black', borderRadius: "4px", paddingInline: '15px', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
          <h2>{todo.title}</h2>
          <p>{todo.description}</p>
          <button style={{background: 'red', border:"none", borderRadius: '4px', padding: "10px", color: "white"}} onClick={() => deleteTodo(todo.id)}>Delete</button>
        </div>
      ))}
    </div>
   </div>
  )
}

export default App

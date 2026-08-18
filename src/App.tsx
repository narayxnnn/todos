import './App.css'
import AddTodoModel from './components/AddTodoModel';
import { useState, useEffect, useCallback } from 'react';
import { CirclesWithBar } from 'react-loader-spinner';
import { Pencil } from 'lucide-react'
import UpdateTodoModel from './components/UpdateTodoModel';
import { getTodos, createTodo, updateTodo, deleteTodo as deleteTodoApi, type Todo, type NewTodo } from './api/todos'

const defaultAddTodo: NewTodo = {
  title: '',
  description: '',
  isCompleted: false,
  priority: 'low',
  category: ''
}

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState<NewTodo>(defaultAddTodo);
  const [openModel, setOpenModel] = useState<boolean>(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [updatedTodo, setUpdatedTodo] = useState<Todo | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const loadTodos = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getTodos();
      setTodos(data);
    } catch (err) {
      console.error('Failed to fetch todos:', err);
      setError('Could not load todos. Please try again.');
    } finally {
      setLoading(false);
    }
  }, []);

  // Runs once on mount only — do NOT add `todos` to this array,
  // or every setTodos() call below will trigger another fetch.
  useEffect(() => {
    loadTodos();
  }, [loadTodos]);

  const handleDeleteTodo = async (todoId: string) => {
    try {
      await deleteTodoApi(todoId);
      setTodos((prev) => prev.filter((todo) => todo.id !== todoId));
    } catch (err) {
      console.error('Failed to delete todo:', err);
      setError('Could not delete that todo.');
    }
  };

  const handleAddTodo = async () => {
    try {
      const created = await createTodo(newTodo);
      setTodos((prev) => [...prev, created]);
      setNewTodo(defaultAddTodo);
      setOpenModel(false);
    } catch (err) {
      console.error('Failed to add todo:', err);
      setError('Could not add that todo.');
    }
  };

  const openEditModal = (todo: Todo) => {
    setUpdatedTodo(todo);
    setEditingId(todo.id);
  };

  const closeEditModal = () => {
    setUpdatedTodo(null);
    setEditingId(null);
  };

  const handleUpdate = async (todoId: string, updatedTodoState: Todo) => {
    try {
      const saved = await updateTodo(todoId, updatedTodoState);
      setTodos((prev) => prev.map((t) => (t.id === todoId ? saved : t)));
      closeEditModal();
    } catch (err) {
      console.error('Failed to update todo:', err);
      setError('Could not save that update.');
    }
  };

  return (
    <div className="app">
      <div className="app-header">
        <input type="checkbox" />
        <div className="app-title">
          <img width="35" height="35" src="https://img.icons8.com/scribby/50/todo-list.png" alt="logo" />
          <h1>my-todos</h1>
          <button onClick={() => setOpenModel(true)}>+</button>
        </div>
      </div>
      <div className="app-divider" />

      {error && <p className="app-error">{error}</p>}

      {openModel && (
        <AddTodoModel
          todo={newTodo}
          setTodo={setNewTodo}
          onSave={handleAddTodo}
          onClose={() => setOpenModel(false)}
        />
      )}

      {loading && (
        <div className="app-loading">
          <CirclesWithBar
            height="100"
            width="100"
            color="red"
            outerCircleColor="red"
            innerCircleColor="red"
            barColor="red"
            ariaLabel="circles-with-bar-loading"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
          />
        </div>
      )}

      <div className="todo-list">
        {todos.map((todo) => (
          <div key={todo.id} className="todo-row">
            <h2>{todo.title}</h2>
            <button className="icon-button" onClick={() => openEditModal(todo)}>
              <Pencil />
            </button>
            {editingId === todo.id && updatedTodo && (
              <UpdateTodoModel
                todo={updatedTodo}
                setTodo={setUpdatedTodo}
                onClose={closeEditModal}
                onSave={() => handleUpdate(todo.id, updatedTodo)}
              />
            )}
            <p>{todo.description}</p>
            <button className="delete-button" onClick={() => handleDeleteTodo(todo.id)}>
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default App
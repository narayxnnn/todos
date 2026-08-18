export type Todo = {
    id: string;
    title: string;
    description: string;
    isCompleted: boolean;
    priority: string;
    category: string;
    createdAt: Date;
  };
  
  export type NewTodo = Omit<Todo, 'id' | 'createdAt'>;
  
  const BASE_URL = 'https://6a812a5e400f94b23c6f47e7.mockapi.io/api/v1/todos';
  
  export async function getTodos(): Promise<Todo[]> {
    const response = await fetch(BASE_URL);
    if (!response.ok) throw new Error(`Failed to fetch todos: ${response.status}`);
    return response.json();
  }
  
  export async function createTodo(newTodo: NewTodo): Promise<Todo> {
    const response = await fetch(BASE_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newTodo),
    });
    if (!response.ok) throw new Error(`Failed to create todo: ${response.status}`);
    return response.json();
  }
  
  export async function updateTodo(id: string, updated: Todo): Promise<Todo> {
    const response = await fetch(`${BASE_URL}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updated),
    });
    if (!response.ok) throw new Error(`Failed to update todo: ${response.status}`);
    return response.json();
  }
  
  export async function deleteTodo(id: string): Promise<void> {
    const response = await fetch(`${BASE_URL}/${id}`, { method: 'DELETE' });
    if (!response.ok) throw new Error(`Failed to delete todo: ${response.status}`);
  }
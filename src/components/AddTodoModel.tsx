type Todo = {
    title: string,
    description: string,
    isCompleted: boolean,
    priority: string,
    category: string,
  };

type Props = {
    todo: Todo;
    setTodo: React.Dispatch<React.SetStateAction<Todo>>;
    onSave: () => void;
    onClose: () => void;
}

const AddTodoModel = ({todo, setTodo, onSave, onClose}: Props) => {
    const handleTodo = (field: string, value: string | boolean) => {
            setTodo(prevTodo => ({...prevTodo, [field]: value}))
    }
    return(
        <div style={{position: "fixed", zIndex: "1000", marginRight: "50px", background: "rgba(0, 0, 0, 0.5)", display: "flex", alignItems: "center", justifyContent: "center"}}>
            <div style={{background: "white", margin: "30px", width: "100%", height: "70%", borderRadius: "4px"}}>
                <div style = {{display: "flex", flexDirection: "column", paddingTop: "40px", paddingLeft: "40px", paddingRight: "40px"}}>
                <label>Title:</label>
                <input type="text" style={{border: "0.2px solid red", padding: "6px", borderRadius: "4px"}} value={todo.title} placeholder="title" onChange={(event) => handleTodo('title', event.target.value)}/>
                <label style={{display: "flex", marginTop: "30px"}}>Description:</label>
                <input type="text" style={{border: "0.2px solid red", padding: "6px", borderRadius: "4px"}} value={todo.description} placeholder="title" onChange={(event) => handleTodo('description', event.target.value)} />
                </div>
                <div style = {{display: "flex", gap: "30px", justifyContent: "end", padding: "40px", alignItems: "end"}}>
                <button style={{background: 'red', border:"none", borderRadius: '4px', padding: "10px", color: "white"}} onClick={onClose}>Close</button>
                <button style={{background: 'red', border:"none", borderRadius: '4px', padding: "10px", color: "white"}} onClick={onSave}>Save</button>
                </div>
            </div>
        </div>
    );
}

export default AddTodoModel;
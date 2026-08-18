import type {Todo} from '../api/todos'

type Props = {
    todo: Todo;
    setTodo: React.Dispatch<React.SetStateAction<Todo | null>>;
    onSave: () => void;
    onClose: () => void;
}

const UpdateTodoModel = ({ todo, setTodo, onSave, onClose }: Props) => {
    const handleTodo = (field: keyof Todo, value: string | boolean) => {
        setTodo(prevTodo => prevTodo ? { ...prevTodo, [field]: value } : prevTodo)
    }

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <div className="modal-form">
                    <label>Title:</label>
                    <input
                        type="text"
                        className="modal-input"
                        value={todo.title}
                        onChange={(event) => handleTodo('title', event.target.value)}
                    />
                    <label className="modal-label-spaced">Description:</label>
                    <input
                        type="text"
                        className="modal-input"
                        value={todo.description}
                        onChange={(event) => handleTodo('description', event.target.value)}
                    />
                </div>
                <div className="modal-actions">
                    <button className="button-primary" onClick={onClose}>Close</button>
                    <button className="button-primary" onClick={onSave}>Save</button>
                </div>
            </div>
        </div>
    );
}

export default UpdateTodoModel;
import { Link, useLoaderData } from "react-router-dom";
import Todo from "../types/Todo";

const Todos = () => {
  const todos: Todo[] = useLoaderData() as Todo[];

  return (
    <>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            <Link to={`todos/${todo.id}`}>{todo.title}</Link> -{" "}
            {todo.completed ? "done" : "not done"}
          </li>
        ))}
      </ul>
      <Link to="/todos/new">New Todo</Link>
    </>
  );
};

export default Todos;

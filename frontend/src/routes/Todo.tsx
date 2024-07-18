import { Form, useLoaderData } from "react-router-dom";
import Todo from "../types/Todo";

const _Todo = () => {
  const todo: Todo = useLoaderData() as Todo;

  return (
    <div>
      {todo?.title} - {todo?.completed ? "done" : "not done"}
      <Form method="GET" action={`/todos/${todo.id}/edit`}>
        <button type="submit">Edit</button>
      </Form>
      <Form method="DELETE" action={`/todos/${todo.id}`}>
        <button type="submit">Delete</button>
      </Form>
    </div>
  );
};

export default _Todo;

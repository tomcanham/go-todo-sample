import { Form, useLoaderData } from "react-router-dom";
import Todo from "../types/Todo";
import { createRef, useEffect, useState } from "react";

function UpdateTodo() {
  const todo: Todo = useLoaderData() as Todo;
  const [title, setTitle] = useState(todo.title);
  const [completed, setCompleted] = useState(todo.completed);
  const titleField = createRef<HTMLInputElement>();

  useEffect(() => {
    titleField.current?.focus();
  });

  return (
    <Form method="PUT" action={`/todos/${todo.id}`}>
      <input type="hidden" name="id" value={todo.id} />
      <input
        type="text"
        name="title"
        tabIndex={0}
        value={title}
        ref={titleField}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type="checkbox"
        name="completed"
        tabIndex={1}
        checked={completed}
        onChange={(e) => setCompleted(e.target.checked)}
      />
      <button type="submit" tabIndex={3}>
        Save
      </button>
    </Form>
  );
}

export default UpdateTodo;

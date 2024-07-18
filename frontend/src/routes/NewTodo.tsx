import { createRef, useEffect, useState } from "react";
import { Form } from "react-router-dom";

function NewTodo() {
  const [title, setTitle] = useState("");
  const [completed, setCompleted] = useState(false);
  const titleField = createRef<HTMLInputElement>();

  useEffect(() => {
    titleField.current?.focus();
  });

  return (
    <Form method="POST" action={`/`}>
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
      <button type="submit">Create</button>
    </Form>
  );
}

export default NewTodo;

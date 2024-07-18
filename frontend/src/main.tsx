import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import {
  createBrowserRouter,
  redirect,
  RouterProvider,
} from "react-router-dom";
import ErrorPage from "./ErrorPage.tsx";
import Todo from "./routes/Todo.tsx";
import Todos from "./routes/Todos.tsx";
import HOST from "./constants.ts";
import UpdateTodo from "./routes/UpdateTodo.tsx";
import NewTodo from "./routes/NewTodo.tsx";

function checkResponse(res: Response, id?: string) {
  if (id && res.status === 404) {
    const statusText = `Todo with id ${id} not found`;
    throw new Response(statusText, {
      status: 404,
      statusText,
    });
  }

  if (!res.ok) {
    throw new Error(res.statusText);
  }
}

async function loadOne({ params }: { params: { id?: string } }) {
  const res = await fetch(`${HOST}/api/todos/${params.id}`);
  checkResponse(res, params.id);

  return res.json();
}

async function loadAll() {
  const res = await fetch(`${HOST}/api/todos`);
  checkResponse(res);

  return res.json();
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Todos />,
        loader: loadAll,
        action: async ({ request }) => {
          console.log("in action, request.method:", request.method);
          switch (request.method) {
            case "POST": {
              const formData = await request.formData();
              const title = formData.get("title") as string;
              const completed = formData.get("completed") === "on";

              return fetch(`${HOST}/api/todos`, {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({ title, completed }),
              }).then((res) => {
                redirect("/");
                return res;
              });
              break;
            }
          }

          return null;
        },
      },
      {
        path: "todos/new",
        element: <NewTodo />,
      },
      {
        path: "todos/:id",
        element: <Todo />,
        loader: loadOne,
        action: async ({ request, params }) => {
          switch (request.method) {
            case "PUT": {
              const formData = await request.formData();
              const id = params.id;
              const title = formData.get("title") as string;
              const completed = formData.get("completed") === "on";

              return fetch(`${HOST}/api/todos/${id}`, {
                method: "PUT",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({ title, completed }),
              }).then(() => redirect("/"));
              break;
            }

            case "POST": {
              const formData = await request.formData();
              const title = formData.get("title") as string;
              const completed = formData.get("completed") === "on";

              return fetch(`${HOST}/api/todos`, {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({ title, completed }),
              });
              break;
            }

            case "DELETE": {
              const id = params.id;

              return fetch(`${HOST}/api/todos/${id}`, {
                method: "DELETE",
              }).then(() => redirect("/"));
              break;
            }

            default: {
              throw new Response("", { status: 405 });
            }
          }
        },
      },
      {
        path: "todos/:id/edit",
        element: <UpdateTodo />,
        loader: loadOne,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

import { useRouteError } from "react-router-dom";

type RouterError = {
  statusText?: string;
  message?: string;
};

export default function ErrorPage() {
  const error: RouterError = useRouteError() as RouterError;
  console.error(error);

  return (
    <div id="error-page">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{error?.statusText || error.message || "Unknown error"}</i>
      </p>
      <p>
        Click <a href="/">here</a> to return to the application.
      </p>
    </div>
  );
}

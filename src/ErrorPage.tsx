import { useRouteError } from "react-router-dom";
import NotFoundPage from "./pages/error/404";

interface IRouteError {
  statusText: string;
  message: string;
}

export default function ErrorPage() {
  const error = useRouteError() as IRouteError;

  if (error?.statusText === 'Not Found') {
    return <NotFoundPage />;
  }

  return (
    <div id="error-page">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
    </div>
  );
}
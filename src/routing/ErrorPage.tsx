import { isRouteErrorResponse, useRouteError } from "react-router-dom";

const ErrorPage = () => {
  const error = useRouteError();
  return (
    <>
      <h1>Oops...</h1>
      <p>
        {isRouteErrorResponse(error)
          ? "Invalid page"
          : "Sorry, an unexpected error has occurred."}
      </p>
    </>
  );
};

export default ErrorPage;

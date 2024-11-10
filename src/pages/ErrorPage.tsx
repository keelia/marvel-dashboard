import { useMemo } from "react";
import { Link } from "react-router-dom";
import { isRouteErrorResponse, useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();
  const errorMsg = useMemo(
    () =>
      isRouteErrorResponse(error)
        ? `${error.statusText} `
        : error instanceof Error
          ? error.message
          : typeof error === "string"
            ? error
            : "Unknown Error",
    [error],
  );

  return (
    <div
      id="error-page"
      className="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8"
    >
      <div className="text-center">
        <h1 className="mt-4 text-balance text-5xl font-semibold tracking-tight text-gray-900 sm:text-7xl">
          Oops
        </h1>
        <p className="mt-6 text-pretty text-lg font-medium text-gray-500 sm:text-xl/8">
          Sorry, an unexpected error has occurred.
        </p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          {errorMsg}
        </div>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <Link
            to="/"
            className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Go back home
          </Link>
        </div>
      </div>
    </div>
  );
}
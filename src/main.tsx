import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.tsx";
import { CharacterList } from "./pages/characters/CharacterList.tsx";
import { CharacterView } from "./pages/characters/CharacterView.tsx";
import ErrorPage from "./pages/Error.tsx";
import "./index.css";

const router = createBrowserRouter([
  {
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <CharacterList />,
      },
      {
        path: "characters/:characterId",
        element: <CharacterView />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);

import { Outlet } from "react-router-dom";
import { Typography } from "@material-tailwind/react";
import "./App.css";

function App() {
  return (
    <div className="h-screen w-full">
      <header className="sticky top-0 z-10 h-24 bg-gray-200">
        <nav
          aria-label="Global"
          className="justify-betwee mx-auto flex items-center p-6 lg:px-8"
        >
          <div className="flex flex-wrap items-center justify-between gap-y-4 text-black">
            <Typography
              as="a"
              href="#"
              variant="h6"
              className="ml-2 mr-4 cursor-pointer py-1.5"
            >
              Marvel Profiles
            </Typography>
          </div>
        </nav>
      </header>
      <main
        className="container overflow-hidden"
        style={{ maxHeight: "calc(100vh - 8rem)" }}
      >
        <Outlet />
      </main>
    </div>
  );
}

export default App;

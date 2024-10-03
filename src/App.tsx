import "./App.css";
import ScanDetails from "./Components/ScanDetails";
import Home from "./Components/Home";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "home",
    element: (
      <div>
        <Home />
      </div>
    )
  },
  {
    path: "home/scan/:domain",
    element: (
      <div>
        <ScanDetails />
      </div>
    )
  }
]);

function App() {
  return (
    <div className="app">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;

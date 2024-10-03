import "./App.css";
import ScanDetails from "./Components/ScanDetails";
import Home from "./Components/Home";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "open-source-intelligence-tools",
    element: (
      <div>
        <Home />
      </div>
    )
  },
  {
    path: "open-source-intelligence-tools/scan/:domain",
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

import { useState } from "react";
import "./App.css";

function App() {
  const [domain, setDomain] = useState<string>("");

  function submit(event: { preventDefault: () => void }): any {
    event.preventDefault();
    console.log(domain);
  }

  return (
    <div className="App">
      <form onSubmit={submit}>
        <input
          type="text"
          value={domain}
          onChange={(e) => setDomain(e.target.value)}
          placeholder="Enter Domain"
        />
        <button>Scan</button>
      </form>
    </div>
  );
}

export default App;

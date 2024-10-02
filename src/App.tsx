import { useState } from "react";
import "./App.css";
import Card from "./Components/Card";

function App() {
  const [domain, setDomain] = useState<string>("");
  const [cards, setCards] = useState<
    { domain: string; startTime: string; endTime: string; status: string }[]
  >([]);

  function submit(event: { preventDefault: () => void }): any {
    event.preventDefault();

    const startTime = new Date().toLocaleString(); // capture start time
    const newCard = {
      domain: domain,
      startTime: startTime,
      endTime: "",
      status: "In Progress..."
    };

    setCards((prevCards) => [...prevCards, newCard]);

    // Simulate a scan with a timeout, setting end time and status
    setTimeout(() => {
      const endTime = new Date().toLocaleString(); // capture end time
      setCards((prevCards) =>
        prevCards.map((card, index) =>
          index === prevCards.length - 1
            ? { ...card, endTime: endTime, status: "Completed" }
            : card
        )
      );
    }, 3000);
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
      {cards.map((card, index) => (
        <Card
          key={index}
          domain={card.domain}
          startTime={card.startTime}
          endTime={card.endTime}
          status={card.status}
          subdomains={["sub1.example.com", "sub2.example.com"]}
          ips={["192.168.1.1", "192.168.1.2"]}
          emails={["admin@example.com", "contact@example.com"]}
        />
      ))}
    </div>
  );
}

export default App;

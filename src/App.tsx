import { useState } from "react";
import "./App.css";
import Card from "./Components/Card";

const mockScanDomain = (domain: string) => {
  return {
    subdomains: [
      `${domain.split(".")[0]}.sub1.com`,
      `${domain.split(".")[0]}.sub2.com`
    ],
    ips: [
      `192.168.${Math.floor(Math.random() * 255)}.${Math.floor(
        Math.random() * 255
      )}`,
      `10.0.${Math.floor(Math.random() * 255)}.${Math.floor(
        Math.random() * 255
      )}`
    ],
    emails: [`admin@${domain}`, `contact@${domain}`]
  };
};

function App() {
  const [domain, setDomain] = useState<string>("");
  const [cards, setCards] = useState<
    {
      domain: string;
      startTime: string;
      endTime: string;
      status: string;
      subdomains: string[];
      ips: string[];
      emails: string[];
    }[]
  >([]);

  function submit(event: { preventDefault: () => void }): any {
    event.preventDefault();

    const startTime = new Date().toLocaleString();
    const newCard = {
      domain: domain,
      startTime: startTime,
      endTime: "",
      status: "In Progress...",
      subdomains: [],
      ips: [],
      emails: []
    };

    setCards((prevCards) => [...prevCards, newCard]);

    setTimeout(() => {
      const endTime = new Date().toLocaleString();
      const mockData = mockScanDomain(domain);

      setCards((prevCards) =>
        prevCards.map((card, index) =>
          index === prevCards.length - 1
            ? { ...card, ...mockData, endTime: endTime, status: "Completed" }
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
          subdomains={card.subdomains}
          ips={card.ips}
          emails={card.emails}
        />
      ))}
    </div>
  );
}

export default App;

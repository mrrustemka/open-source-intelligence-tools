import React, { useEffect, useState } from "react";
import "./App.css";
import Card from "./Components/Card";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

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

  // Load the card order from the localStorage
  useEffect(() => {
    const savedCards = localStorage.getItem("cards");
    if (savedCards) {
      setCards(JSON.parse(savedCards));
    }
  }, []);

  // Using localStorage to save cards arrive
  useEffect(() => {
    if (cards.length) {
      localStorage.setItem("cards", JSON.stringify(cards));
    }
  }, [cards]);

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

  // Handle the drag and drop logic
  const handleOnDragEnd = (result: any) => {
    if (!result.destination) return;

    const reorderedCards = Array.from(cards);
    const [movedCard] = reorderedCards.splice(result.source.index, 1);
    reorderedCards.splice(result.destination.index, 0, movedCard);

    setCards(reorderedCards);
  };

  return (
    <div className="App">
      <form onSubmit={submit}>
        <input
          type="text"
          value={domain}
          onChange={(e) => setDomain(e.target.value)}
          placeholder="Enter Domain"
        />
        <button className="tooltip">
          Scan
          <span className="tooltiptext">Click to Scan</span>
        </button>
      </form>

      <DragDropContext onDragEnd={handleOnDragEnd}>
        {cards.length > 0 && (
          <Droppable droppableId="cards">
            {(provided) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className="card-list"
              >
                {cards.map((card, index) => (
                  <Draggable
                    key={index}
                    draggableId={`card-${index}`}
                    index={index}
                  >
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <Card
                          domain={card.domain}
                          startTime={card.startTime}
                          endTime={card.endTime}
                          status={card.status}
                          subdomains={card.subdomains}
                          ips={card.ips}
                          emails={card.emails}
                        />
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        )}
      </DragDropContext>
    </div>
  );
}

export default App;

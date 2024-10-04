import { useEffect, useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { Tooltip } from "react-tooltip";
import Card from "./Card";
import "../App.css";

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

function Home() {
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
  const [errorMessage, setErrorMessage] = useState<string>("");

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

  function submit(event: { preventDefault: () => void }): void {
    event.preventDefault();

    if (isValidInput(domain)) {
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
      setDomain("");
    }
  }

  // Handle the drag and drop logic
  function handleOnDragEnd(result: any): void {
    if (!result.destination) return;

    const reorderedCards = Array.from(cards);
    const [movedCard] = reorderedCards.splice(result.source.index, 1);
    reorderedCards.splice(result.destination.index, 0, movedCard);

    setCards(reorderedCards);
  }

  function handleInputChange(value: string): void {
    setDomain(value);
    setErrorMessage("");
  }

  function handleScanClick() {
    if (domain.trim() === "") {
      setErrorMessage("Input cannot be empty");
    } else if (!isValidInput(domain)) {
      setErrorMessage("Invalid input format");
    } else {
      console.log("Scanning with input:", domain);
      setErrorMessage("");
    }
  }

  function isValidInput(value: string): boolean {
    const domainRegex = /^(?!:\/\/)([a-zA-Z0-9-_]{1,63}\.)+[a-zA-Z]{2,6}$/;
    return domainRegex.test(value);
  }

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          <input
            id="input"
            type="text"
            value={domain}
            onChange={(e) => handleInputChange(e.target.value)}
            placeholder="Start to Enter..."
            onFocus={(e) => (e.target.style.borderColor = "#007BFF")}
            onBlur={(e) => (e.target.style.borderColor = "#ccc")}
            data-tooltip-id="tooltip-input"
          />
          {errorMessage && (
            <div style={{ color: "red", marginTop: "10px" }}>
              {errorMessage}
            </div>
          )}
        </div>
        <button
          id="button"
          onClick={handleScanClick}
          data-tooltip-id="tooltip-button"
        >
          Scan
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
                          id={index}
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
      <Tooltip id="tooltip-input" content="Enter a Domain" />
      <Tooltip id="tooltip-button" content="Click to Scan" />
    </div>
  );
}

export default Home;

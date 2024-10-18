import React, { useState } from "react";
import Modal from "./Modal";
import { Tooltip } from "react-tooltip";

interface CardProps {
  domain: string;
  startTime: string;
  endTime: string;
  status: string;
  subdomains: string[];
  ips: string[];
  emails: string[];
  id: number;
}

const Card: React.FC<CardProps> = ({
  domain,
  startTime,
  endTime,
  status,
  subdomains,
  ips,
  emails,
  id
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  function openModal() {
    setIsModalOpen(true);
  }

  function closeModal() {
    setIsModalOpen(false);
  }

  return (
    <div onClick={openModal} className="card">
      <h3 id={`domain-${id}`} data-tooltip-id={`domain-tooltip-${id}`}>
        Domain: {domain}
      </h3>
      <p id={`start-time-${id}`} data-tooltip-id={`start-time-tooltip-${id}`}>
        Start Time: {startTime}
      </p>
      <p id={`end-time-${id}`} data-tooltip-id={`end-time-tooltip-${id}`}>
        End Time: {endTime ? endTime : "In Progress"}
      </p>
      <p id={`status-${id}`} data-tooltip-id={`status-tooltip-${id}`}>
        Status: {status}
      </p>
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        data={{ subdomains, ips, emails }}
      />

      <Tooltip id={`domain-tooltip-${id}`} content="The Domain Address" />
      <Tooltip
        id={`start-time-tooltip-${id}`}
        content={`Scan of ${domain} Start Time`}
      />
      <Tooltip
        id={`end-time-tooltip-${id}`}
        content={`Scan of ${domain} End Time (is Still in Progress)`}
      />
      <Tooltip
        id={`status-tooltip-${id}`}
        content={`Current Scan Status of ${domain}`}
      />
    </div>
  );
};

export default Card;

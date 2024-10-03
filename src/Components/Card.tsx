import React, { useState } from "react";
import Modal from "./Modal";

function Card({
  domain,
  startTime,
  endTime,
  status,
  subdomains,
  ips,
  emails
}: {
  domain: string;
  startTime: string;
  endTime: string;
  status: string;
  subdomains: string[];
  ips: string[];
  emails: string[];
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  function openModal() {
    setIsModalOpen(true);
  }

  function closeModal() {
    setIsModalOpen(false);
  }

  return (
    <div className="card tooltip" onClick={openModal}>
      <h3>Domain: {domain}</h3>
      <p>Start Time: {startTime}</p>
      <p>End Time: {endTime ? endTime : "In Progress"}</p>
      <p>Status: {status}</p>
      {/* <span className="card tooltiptext">Click to Get More Information</span> */}

      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        data={{ subdomains, ips, emails }}
      />
    </div>
  );
}

export default Card;

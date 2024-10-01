import React from "react";

function Card({
  domain,
  startTime,
  endTime,
  status
}: {
  domain: string;
  startTime: string;
  endTime: string;
  status: string;
}) {
  return (
    <div className="card">
      <h3>Domain: {domain}</h3>
      <p>Start Time: {startTime}</p>
      <p>End Time: {endTime ? endTime : "In Progress"}</p>
      <p>Status: {status}</p>
    </div>
  );
}

export default Card;

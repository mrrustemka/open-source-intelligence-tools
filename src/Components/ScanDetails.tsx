import { Link, useLocation } from "react-router-dom";

function ScanDetails() {
  const location = useLocation();
  const { domain, startTime, endTime, status, subdomains, ips, emails } =
    location.state || {};

  return (
    <div className="scan-details">
      <h2>Scan Details for: {domain}</h2>
      <p>Start Time: {startTime}</p>
      <p>End Time: {endTime}</p>
      <p>Status: {status}</p>

      <h3>Subdomains:</h3>
      <ul>
        {subdomains.map((subdomain: string, index: number) => (
          <li key={index}>{subdomain}</li>
        ))}
      </ul>

      <h3>IPs:</h3>
      <ul>
        {ips.map((ip: string, index: number) => (
          <li key={index}>{ip}</li>
        ))}
      </ul>

      <h3>Emails:</h3>
      <ul>
        {emails.map((email: string, index: number) => (
          <li key={index}>{email}</li>
        ))}
      </ul>
      <Link to="/home">Back Home</Link>
    </div>
  );
}

export default ScanDetails;

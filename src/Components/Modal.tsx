function Modal({
  isOpen,
  onClose,
  data
}: {
  isOpen: boolean;
  onClose: () => void;
  data: { subdomains: string[]; ips: string[]; emails: string[] };
}) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>Additional Information</h2>
        <h3>Subdomains</h3>
        <ul>
          {data.subdomains.map((subdomain, index) => (
            <li key={index}>{subdomain}</li>
          ))}
        </ul>
        <h3>IPs</h3>
        <ul>
          {data.ips.map((ip, index) => (
            <li key={index}>{ip}</li>
          ))}
        </ul>
        <h3>Emails</h3>
        <ul>
          {data.emails.map((email, index) => (
            <li key={index}>{email}</li>
          ))}
        </ul>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
}

export default Modal;

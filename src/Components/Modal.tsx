import { useEffect, useState } from "react";
import { Tooltip } from "react-tooltip";

function Modal({
  isOpen,
  onClose,
  data
}: {
  isOpen: boolean;
  onClose: () => void;
  data: { subdomains: string[]; ips: string[]; emails: string[] };
}) {
  const [visible, setVisible] = useState(isOpen);

  useEffect(() => {
    if (isOpen) {
      setVisible(true);
    } else {
      setTimeout(() => setVisible(false), 300);
    }
  }, [isOpen]);

  if (!visible) return null;

  return (
    <div
      className={`modal-overlay ${isOpen ? "fade-in" : "fade-out"}`}
      onClick={onClose}
    >
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <span
          data-tooltip-id="close-modal"
          className="close-modal"
          onClick={onClose}
        >
          &times;
        </span>
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
      </div>
      <Tooltip id="close-modal" content="Click to Close" />
    </div>
  );
}

export default Modal;

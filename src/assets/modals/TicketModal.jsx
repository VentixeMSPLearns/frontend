import React from "react";
import QRCode from "react-qr-code";
// TODO: Change the generated QR from event.id to ticket.id which is retrieved using the ticket or booking service

const TicketModal = ({ event, onClose }) => {
  if (!event) return null;

  return (
    <div className="modal ticket-modal">
      <div className="card modal-content">
        <div className="card-header">
          <h2>{event.title}</h2>
          <button className="btn-close" onClick={onClose}></button>
        </div>
        <div className="card-body">
          <QRCode className="ticket-qr" value={event.id} />
        </div>
      </div>
    </div>
  );
};

export default TicketModal;

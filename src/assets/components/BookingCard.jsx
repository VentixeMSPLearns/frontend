import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import QRCode from "react-qr-code";
import { useScreenSize } from "../context/ScreenSizeContext.jsx";
import TicketModal from "../modals/TicketModal.jsx";
import EventDetailsModal from "../modals/EventDetailsModal.jsx";

const BookingCard = ({ event, bookingId }) => {
  const navigate = useNavigate();
  const { isDesktop } = useScreenSize();
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState(null);
  const [accordionOpen, setAccordionOpen] = useState(false);

  const handleButtonClick = (type) => {
    if (isDesktop) {
      setModalType(type);
      setShowModal(true);
    } else {
      if (type === "ticket") {
        setAccordionOpen(!accordionOpen);
      } else if (type === "details") {
        navigate(`/events/${event.id}`, { state: { event } });
      }
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setModalType(null);
  };

  return (
    <div className="card booking-card">
      {isDesktop && (
        <div className="card-header not-on-mobile">
          <img
            src={event.imageUrl}
            alt={event.title}
            className="booking-image"
          />
        </div>
      )}
      <div className="card-body">
        <p className="event-date sz-11 muted-light">{event.date}</p>
        <h3 className="event-title sz-20 dark">{event.title}</h3>
        <p className="event-location sz-14 muted-dark">{event.location}</p>
      </div>
      <div className="card-footer">
        <button
          className={`btn btn-primary .btn-details ${event.id}`}
          onClick={() => handleButtonClick("details")}
        >
          Details
        </button>
        <button
          className={`btn btn-primary .btn-ticket ${bookingId}`}
          onClick={() => handleButtonClick("ticket")}
        >
          Ticket
        </button>
      </div>

      {!isDesktop && accordionOpen && (
        <div className="ticket-accordion">
          <h4 className="secondary sz-18">Scan your Ticket</h4>
          <QRCode className="ticket-qr" value={bookingId} size={150} />
        </div>
      )}

      {isDesktop &&
        showModal &&
        modalType === "ticket" &&
        (console.log("showing ticket modal"),
        (
          <TicketModal
            event={event}
            bookingId={bookingId}
            onClose={closeModal}
          />
        ))}
      {isDesktop && showModal && modalType === "details" && (
        <EventDetailsModal event={event} onClose={closeModal} />
      )}
    </div>
  );
};
export default BookingCard;

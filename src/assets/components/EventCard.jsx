import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useScreenSize } from "../context/ScreenSizeContext";
import EventDetailsModal from "../modals/EventDetailsModal";
const EventCard = ({ event }) => {
  const navigate = useNavigate();
  const { isDesktop } = useScreenSize();
  const [showModal, setShowModal] = useState(false);
  const handleCardClick = () => {
    if (isDesktop) {
      setShowModal(true);
    } else {
      navigate(`/events/${event.id}`, { state: { event } });
    }
  };

  const handleBookNowClick = (e) => {
    e.stopPropagation();
    navigate(`/bookevent/${event.id}`, { state: { event } });
  };

  const closeModal = () => {
    setShowModal(false);
  };

  console.log("Modal Event:", event);

  return (
    <div
      className="card event-card"
      role="button"
      tabIndex="0"
      onClick={handleCardClick}
    >
      <div className="card-header">
        <img src={event.imageUrl} alt={event.title} className="event-image" />
      </div>
      <div className="card-body">
        <p className="event-date sz-11 muted-light">{event.date}</p>
        <h3 className="event-title sz-16 dark">{event.title}</h3>
        <p className="event-location sz-11 muted-dark">{event.location}</p>
      </div>
      <div className="card-footer">
        <p className="event-price sz-18 primary">{event.price.toFixed(2)}</p>
        <button
          onClick={handleBookNowClick}
          className={`btn btn-primary btn-booknow ${event.id}`}
        >
          Book Now
        </button>
      </div>

      {isDesktop && showModal && (
        <EventDetailsModal event={event} onClose={closeModal} />
      )}
    </div>
  );
};
export default EventCard;

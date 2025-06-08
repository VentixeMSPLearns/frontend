const EventDetailsModal = ({ event, onClose }) => {
  if (!event) return null;

  const handleCloseClick = (e) => {
    e.stopPropagation(); // Prevents the click from bubbling up to the card
    onClose();
  };
  console.log("Modal Event:", event);
  return (
    <div className="modal">
      <div className="card modal-content">
        <div className="card-header">
          <h2>{event.title}</h2>
          <button className="btn-close" onClick={handleCloseClick}></button>
        </div>
        <div className="card-body">
          <img src={event.imageUrl} alt={event.title} className="modal-image" />
          <p className="event-date sz-11 muted-light">{event.date}</p>
          <p className="event-location sz-14 muted-dark">{event.location}</p>
          <p>{event.description}</p>
        </div>
      </div>
    </div>
  );
};

export default EventDetailsModal;

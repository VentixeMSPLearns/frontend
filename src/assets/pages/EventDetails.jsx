// import { useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";
// TODO: instead of pass event as state, use the eventservice to fetch the event details by ID which is extracted from the URL params
const EventDetails = () => {
  // const { id } = useParams();
  // const [event, setEvent] = useState(null);

  // useEffect(() => {
  //   const fetchEvent = async () => {
  //     const res = await fetch(`/api/events/${id}`); // Update this URL as needed
  //     const data = await res.json();
  //     setEvent(data);
  //   };

  //   fetchEvent();
  // }, [id]);
  const { state } = useLocation();
  const event = state?.event;

  if (!event) return null;
  return (
    <div id="event-details" className="event-details">
      <h2 className="event-title">{event.title}</h2>
      <img src={event.imageUrl} alt={event.title} className="booking-image" />
      <p className="event-date sz-11 muted-light">{event.date}</p>
      <p className="event-location sz-14 muted-dark">{event.location}</p>
      <div className="event-meta">
        <p className="event-description dark sz-16">{event.description}</p>
        <p className="event-price sz-40">Price: ${event.price}</p>
      </div>
    </div>
  );
};

export default EventDetails;

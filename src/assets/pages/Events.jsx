import React, { useEffect, useState, useContext } from "react";
import EventCard from "../components/EventCard.jsx";
import { LoadingContext } from "../context/LoadingContext.jsx";
const Events = () => {
  const [events, setEvents] = useState([]);
  const { setLoading } = useContext(LoadingContext);

  const fetchEvents = async () => {
    setLoading(true);
    try {
      const res = await fetch(
        "https://eventsservice-win24-msp.azurewebsites.net/api/events"
      );

      if (res.ok) {
        const data = await res.json();
        setEvents(data);
      } else {
        console.error("Failed to fetch events:", res.status);
      }
    } catch (error) {
      console.error("Error fetching events:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  return (
    <div id="events" className="event-list">
      {events.map((event) => (
        <EventCard key={event.id} event={event} />
      ))}
    </div>
  );
};
export default Events;

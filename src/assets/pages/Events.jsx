import React, { useEffect, useState } from "react";
import EventCard from "../components/EventCard.jsx";
const Events = () => {
  const [events, setEvents] = useState([]);
  useEffect(() => {
    const mockEvents = [
      {
        id: 1,
        title: "Adventure Gear Show",
        date: "June 5, 2029 - 3:00pm",
        location: "Rocky Ridge Exhibition Hall, Denver, CO",
        description:
          "An exhibition showcasing the latest in outdoor gear and equipment.",
        imageUrl: "https://picsum.photos/seed/200/300",
        price: 40,
      },
      {
        id: 2,
        title: "Symphony Under the Stars",
        date: "April 5, 2029 - 5:00pm",
        location: "Rocky Ridge Exhibition Hall, Denver, CO",
        description:
          "A magical evening of orchestral music under the night sky.",
        imageUrl: "https://picsum.photos/seed/220/300",
        price: 40,
      },
      {
        id: 3,
        title: "Art & Design Expo",
        date: "July 15, 2029 - 7:00pm",
        location: "Rocky Ridge Exhibition Hall, Denver, CO",
        description: "An exhibition featuring the latest in art and design.",
        imageUrl: "https://picsum.photos/seed/300/200",
        price: 40,
      },
    ];
    setEvents(mockEvents);
  }, []);

  // const fetchEvents = async () => {
  //   const res = await fetch("");

  //   if (res.ok) {
  //     const data = await res.json();
  //     setEvents(data);
  //   }
  // };
  // useEffect(() => {
  //   fetchEvents();
  // }, []);

  return (
    <div id="events" className="event-list">
      {events.map((event) => (
        <EventCard key={event.id} event={event} />
      ))}
    </div>
  );
};
export default Events;

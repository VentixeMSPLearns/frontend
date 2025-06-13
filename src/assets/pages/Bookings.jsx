import React, { useEffect, useState, useContext } from "react";
import { useAuth } from "../context/AuthContext";
import { LoadingContext } from "../context/LoadingContext";
import BookingCard from "../components/BookingCard.jsx";
const Bookings = () => {
  const { user } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [events, setEvents] = useState([]);
  const { setLoading } = useContext(LoadingContext);

  const fetchBookingsAndEvents = async () => {
    if (!user || !user.id) return;
    setLoading(true);
    try {
      const bookingsResponse = await fetch(
        `https://bookingsservice-ventixe-win24-msp.azurewebsites.net/api/bookings/user/${user.id}`
      );
      if (!bookingsResponse.ok) throw new Error("Failed to fetch bookings");

      const bookingsData = await bookingsResponse.json();
      setBookings(bookingsData);

      const eventIds = [...new Set(bookingsData.map((b) => b.eventId))];

      if (eventIds.length === 0) {
        setEvents([]);
        return;
      }

      const eventsResponse = await fetch(
        "https://eventsservice-win24-msp.azurewebsites.net/api/events/by-ids",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ eventIds }),
        }
      );
      if (!eventsResponse.ok) throw new Error("Failed to fetch events");

      const eventsData = await eventsResponse.json();
      setEvents(eventsData);
    } catch (error) {
      console.error("Error loading bookings/events:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user?.id) {
      fetchBookingsAndEvents();
    }
  }, [user]);

  return (
    <div id="bookings" className="booking-list">
      {bookings.map((booking) => {
        const event = events.find((e) => e.id === booking.eventId);
        if (!event) return null;
        return (
          <BookingCard key={booking.id} event={event} bookingId={booking.id} />
        );
      })}
    </div>
  );
};

export default Bookings;

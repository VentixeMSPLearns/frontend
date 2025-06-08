// import React, { useEffect, useState } from "react";
import BookingCard from "../components/BookingCard.jsx";
const Bookings = () => {
  // const [bookings, setBookings] = useState([]);

  // const fetchBookings = async () => {
  //   const res = await fetch("");

  //   if (res.ok) {
  //     const data = await res.json();
  //     setBookings(data);
  //   }
  // };
  // useEffect(() => {
  //   fetchBookings();
  // }, []);

  const mockEvent = {
    id: "test-1",
    title: "Mocked Adventure Gear Show",
    date: "June 5, 2029 - 3:00pm",
    location: "Rocky Ridge Exhibition Hall, Denver, CO",
    description:
      "Join us for the Adventure Gear Show, showcasing the latest in outdoor equipment and apparel. Perfect for adventurers of all levels!",
    price: 40,
    imageUrl: "https://picsum.photos/300/200",
    category: "Art&Design",
  };

  return (
    <div id="bookings" className="booking-list">
      {/* {bookings.map((event) => (
        <BookingCard key={event.id} event={event} />
      ))} */}
      <BookingCard event={mockEvent} />
    </div>
  );
};

export default Bookings;

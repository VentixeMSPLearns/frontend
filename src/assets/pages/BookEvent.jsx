import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import AddFundsModal from "../modals/AddFundsModal";

const BookEvent = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const event = location.state?.event;

  const [bookingFunds, setBookingFunds] = useState(undefined);
  const [showModal, setShowModal] = useState(false);
  const [bookingConfirmed, setBookingConfirmed] = useState(false);

  // Fetch balance function to reuse after PATCH requests
  const fetchWalletBalance = async () => {
    try {
      const response = await fetch(
        `https://walletsservice.azurewebsites.net/api/wallet/${user.id}`
      );
      if (!response.ok) throw new Error("Failed to fetch wallet balance");
      const data = await response.json();
      setBookingFunds(data.balance);
    } catch (error) {
      console.error("Error fetching wallet balance:", error);
    }
  };

  useEffect(() => {
    fetchWalletBalance();
  }, [user.id]);

  if (!event) {
    return <p>No event data found. Please select an event to book.</p>;
  }

  const openAddFundsModal = () => setShowModal(true);
  const closeAddFundsModal = () => setShowModal(false);

  const depositFunds = async (amount) => {
    try {
      const response = await fetch(
        "https://walletsservice.azurewebsites.net/api/wallet",
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ type: 0, userId: user.id, amount }),
        }
      );
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText);
      }
      const message = await response.text(); // Read plain text response
      console.log(message); // "Funds deposited successfully."
      await fetchWalletBalance(); // Refresh balance
      return true;
    } catch (error) {
      console.error(error);
      alert(error.message || "Failed to add funds");
      return false;
    }
  };

  const withdrawFunds = async (amount) => {
    try {
      const response = await fetch(
        "https://walletsservice.azurewebsites.net/api/wallet",
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ type: 1, userId: user.id, amount }),
        }
      );
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText);
      }
      const message = await response.text(); // Read plain text response
      console.log(message); // "Funds withdrawn successfully."
      await fetchWalletBalance(); // Refresh balance
      return true;
    } catch (error) {
      console.error(error);
      alert(error.message || "Failed to process payment");
      return false;
    }
  };

  const handleFundsAdded = async (amount) => {
    const success = await depositFunds(amount);
    if (success) closeAddFundsModal();
  };

  const handleConfirmBooking = async () => {
    if (bookingFunds < event.price) return;
    if (event.isSoldOut || event.availableTickets <= 0) return;
    try {
      const bookingResponse = await fetch(
        "https://bookingsservice-ventixe-win24-msp.azurewebsites.net/api/bookings",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            userId: user.id,
            eventId: event.id,
          }),
        }
      );

      if (!bookingResponse.ok) {
        const errorText = await bookingResponse.text();
        throw new Error(errorText);
      }
      const bookingData = await bookingResponse.json();
      console.log("Booking created:", bookingData);

      const success = await withdrawFunds(event.price);
      if (!success) {
        alert("Booking succeeded, but fund withdrawal failed.");
        return false;
      }
      const updatedTickets = event.availableTickets - 1;
      const ticketUpdateResponse = await fetch(
        "https://eventsservice-win24-msp.azurewebsites.net/api/events/update-tickets",
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            eventId: event.id,
            newAvailableTickets: updatedTickets,
          }),
        }
      );
      if (!ticketUpdateResponse.ok) {
        const errorText = await ticketUpdateResponse.text();
        throw new Error(
          `Booking created but failed to update tickets: ${errorText}`
        );
      }

      setBookingConfirmed(true);
    } catch (error) {
      console.error(error);
      alert(error.message || "Failed to confirm booking");
      return false;
    }
  };

  return (
    <div className="book-event-container card">
      <h2>{event.title}</h2>
      <p>
        <strong>Your available funds:</strong> $
        {bookingFunds !== undefined ? bookingFunds.toFixed(2) : "Loading..."}
      </p>
      <p>
        <strong>Event price:</strong> ${event.price.toFixed(2)}
      </p>

      {!bookingConfirmed ? (
        <>
          {event.isSoldOut || event.availableTickets <= 0 ? (
            <p className="sz-18 red">This event is sold out.</p>
          ) : bookingFunds < event.price ? (
            <>
              <p className="sz-18 red">
                You don’t have enough funds to book this event.
              </p>
              <button className="btn btn-secondary" onClick={openAddFundsModal}>
                Add More Funds
              </button>
            </>
          ) : (
            <button className="btn btn-primary" onClick={handleConfirmBooking}>
              Confirm Booking
            </button>
          )}
        </>
      ) : (
        <div className="booking-confirmation">
          <p className="sz-18 primary">
            Booking confirmed! Thank you for your purchase.
          </p>
          <button
            className="btn btn-primary"
            onClick={() => navigate("/bookings")}
          >
            View your tickets
          </button>
        </div>
      )}

      {showModal && (
        <AddFundsModal
          onClose={closeAddFundsModal}
          onFundsAdded={handleFundsAdded}
        />
      )}
    </div>
  );
};

export default BookEvent;

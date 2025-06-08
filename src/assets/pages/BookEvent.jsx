import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import AddFundsModal from "../modals/AddFundsModal";

const BookEvent = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Event is passed in navigation state from the events list page
  // TODO: change to use location id to fetch event data from API
  const event = location.state?.event;

  // Local state
  const [bookingFunds, setBookingFunds] = useState(user.bookingFunds);
  const [showModal, setShowModal] = useState(false);
  const [bookingConfirmed, setBookingConfirmed] = useState(false);

  if (!event) {
    return <p>No event data found. Please select an event to book.</p>;
  }

  const openAddFundsModal = () => setShowModal(true);
  const closeAddFundsModal = () => setShowModal(false);

  const handleFundsAdded = (amount) => {
    user.bookingFunds += amount; // Mutate user during testing/dev
    setBookingFunds((prev) => prev + amount);
    closeAddFundsModal();
  };

  const handleConfirmBooking = () => {
    if (bookingFunds < event.price) return; // Should never happen due to button logic
    user.bookingFunds -= event.price;
    setBookingFunds((prev) => prev - event.price);
    setBookingConfirmed(true);
  };

  return (
    <div className="book-event-container card">
      <h2>{event.title}</h2>
      <p>
        <strong>Your available funds:</strong> ${bookingFunds.toFixed(2)}
      </p>
      <p>
        <strong>Event price:</strong> ${event.price.toFixed(2)}
      </p>

      {!bookingConfirmed ? (
        <>
          {bookingFunds < event.price ? (
            <>
              <p className="insufficient-funds-msg" style={{ color: "red" }}>
                You don’t have enough funds to book this event.
              </p>
              <button className="btn btn-secondary" onClick={openAddFundsModal}>
                Add More Funds
              </button>
            </>
          ) : (
            <button className="btn btn-primary" onClick={handleConfirmBooking}>
              Confirm Booking & Pay
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

import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import AddFundsModal from "../modals/AddFundsModal";

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [showModal, setShowModal] = useState(false);
  const [bookingFunds, setBookingFunds] = useState(user.bookingFunds);

  const bookedEvents = [
    { id: 1, title: "Adventure Gear Show", date: "June 5, 2029" },
    { id: 2, title: "Symphony Under the Stars", date: "April 5, 2029" },
    { id: 3, title: "Tech Conference 2029", date: "March 15, 2029" },
  ];

  const openAddFundsModal = () => setShowModal(true);
  const closeAddFundsModal = () => setShowModal(false);

  const handleFundsAdded = (amount) => {
    // This mutates the user object directly during testing
    user.bookingFunds += amount;
    // Then you trigger a React state update so it re-renders:
    setBookingFunds((prev) => prev + amount);
    closeAddFundsModal();
  };

  return (
    <div id="dashboard" className="dashboard-wrapper">
      {/* User info */}
      <section className="card user-info">
        <div className="user-profile">
          <img
            src={user.avatar}
            alt={`${user.username} avatar`}
            className="avatar"
          />
          <div className="user-details">
            <p className="sz-22 secondary dashboard-username">
              {user.username}
            </p>
            <p className="sz-16 muted-dark dashboard-email">{user.email}</p>
          </div>
        </div>
        <div className="dashboard-funds">
          <h5 className="sz-18 primary">Available Funds</h5>
          <p className="sz-24 primary funds-amount">
            {bookingFunds.toFixed(2)}
          </p>
          <button className="btn btn-primary" onClick={openAddFundsModal}>
            Add Funds
          </button>
        </div>
      </section>

      <section
        className="card dashboard-events"
        role="button"
        tabIndex={0}
        onClick={() => navigate("/bookings")}
      >
        <h2 className="sz-20 secondary">Booked Events</h2>
        {bookedEvents.length === 0 ? (
          <p className="sz-14 muted-dark">No booked events yet.</p>
        ) : (
          <ul className="dashboard-event-list">
            {bookedEvents.map((event, index) => (
              <li
                key={event.id}
                className={`event-item sz-14 dark ${
                  index !== bookedEvents.length - 1 ? "with-border" : ""
                }`}
              >
                <p className="event-date sz-11 muted-light">{event.date}</p>
                <p className="event-title">{event.title}</p>
              </li>
            ))}
          </ul>
        )}
      </section>

      {showModal && (
        <AddFundsModal
          onClose={closeAddFundsModal}
          onFundsAdded={handleFundsAdded}
        />
      )}
    </div>
  );
};

export default Dashboard;

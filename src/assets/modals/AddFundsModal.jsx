import React, { useState } from "react";

const AddFundsModal = ({ onClose, onFundsAdded }) => {
  const [amount, setAmount] = useState("");
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (amount.includes(",")) {
      newErrors.amount = "Use a dot (.) as decimal separator, not a comma.";
    }

    const num = parseFloat(amount);

    if (!amount) {
      newErrors.amount = "Amount is required";
    } else if (isNaN(num) || num <= 0 || num > 1000) {
      newErrors.amount = "Enter an amount between 1 and 1000";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    onFundsAdded(parseFloat(amount));
  };

  const handleCloseClick = (e) => {
    e.stopPropagation();
    onClose();
  };

  return (
    <div className="modal">
      <div className="modal-content card">
        <div className="card-header">
          <h3>Add Funds</h3>
          <button className="btn-close" onClick={handleCloseClick}></button>
        </div>
        <form className="card-body" onSubmit={handleSubmit} noValidate>
          <div className="form-group">
            <label htmlFor="funds-amount" className="form-label">
              Amount (max 1000)
            </label>
            <div className="field-group">
              <input
                id="funds-amount"
                name="funds-amount"
                type="number"
                className={`form-control ${
                  errors.amount ? "invalid-input" : ""
                }`}
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                min="1"
                max="1000"
                required
              />
              {errors.amount && (
                <span className="field-validation-error">{errors.amount}</span>
              )}
            </div>
          </div>

          <button className="btn btn-primary" type="submit">
            Confirm Add Funds
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddFundsModal;

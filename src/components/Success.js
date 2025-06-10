import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './Success.css';

const Success = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { firstName = 'User', phoneNumber: initialPhoneNumber = 'your phone number', email = 'your email', serviceFee: stateFee } = state || {};

  // Retrieve fee from localStorage or fallback to state
  const lastApplicationId = localStorage.getItem('lastApplicationId');
  const storedFee = localStorage.getItem(`serviceFee_${lastApplicationId}`);
  const serviceFee = storedFee ? parseInt(storedFee, 10) : stateFee || 100;
  const validFees = [100, 105, 110, 115, 120];
  const finalFee = validFees.includes(serviceFee) ? serviceFee : 100;

  // Phone number state
  const [phoneNumber, setPhoneNumber] = useState(initialPhoneNumber);
  const [isEditing, setIsEditing] = useState(false);
  const [phoneError, setPhoneError] = useState('');

  // Handle edit/save button
  const handleEditToggle = () => {
    if (isEditing) {
      // Validate phone number: Kenyan format (07xxxxxxxx)
      const phoneRegex = /^07\d{8}$/;
      if (!phoneRegex.test(phoneNumber)) {
        setPhoneError('Phone number must start with 07 and be 10 digits');
        return;
      }
      setPhoneError('');
      setIsEditing(false);
    } else {
      setIsEditing(true);
    }
  };

  // Handle phone number input change
  const handlePhoneChange = (e) => {
    setPhoneNumber(e.target.value);
    if (phoneError) setPhoneError(''); // Clear error on change
  };

  const handlePay = () => {
    // For demo: Alert payment details (replace with actual payment logic)
    alert(`Initiating payment of KES ${finalFee} via M-PESA to ${phoneNumber}`);
    // Clear stored fee for new application
    if (lastApplicationId) {
      localStorage.removeItem(`serviceFee_${lastApplicationId}`);
    }
    navigate('/apply');
  };

  return (
    <div className="success-wrapper">
      <div className="success-card">
        <div className="checkmark-container">
          <svg className="checkmark-icon" viewBox="0 0 52 52" aria-hidden="true">
            <circle cx="26" cy="26" r="25" fill="none" />
            <path fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8" />
          </svg>
        </div>
        <h2 className="success-title">Congratulations, {firstName}!</h2>
        <p className="success-text">
          You have been selected among the first group of applicants for this program. To complete your application, pay a service fee of{' '}
          <strong>KES {finalFee}</strong>. You will receive an SMS on <strong>{phoneNumber}</strong> or an email at <strong>{email}</strong> after making the payment.
        </p>
        <div className="payment-input-group">
          <label htmlFor="mpesa-phone" className="payment-label">
            M-PESA Payment Phone Number
          </label>
          <div className="input-wrapper">
            <input
              id="mpesa-phone"
              type="text"
              className={`payment-input ${phoneError ? 'input-error' : ''}`}
              value={phoneNumber}
              onChange={handlePhoneChange}
              readOnly={!isEditing}
              aria-describedby={phoneError ? 'phone-error' : undefined}
            />
            <button
              className="edit-button"
              onClick={handleEditToggle}
              aria-label={isEditing ? 'Save phone number' : 'Edit phone number'}
            >
              {isEditing ? 'Save' : 'Edit'}
            </button>
          </div>
          {phoneError && (
            <p id="phone-error" className="error-text">
              {phoneError}
            </p>
          )}
        </div>
        <div className="success-buttons">
          <button
            className="success-button primary"
            onClick={handlePay}
            aria-label={`Pay KES ${finalFee} to complete your application`}
            disabled={isEditing || !!phoneError}
          >
            Pay KES {finalFee} Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default Success;
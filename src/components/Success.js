import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../services/firebase'; // Adjust path to your Firebase config
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

  // State for phone number and payment
  const [phoneNumber, setPhoneNumber] = useState(initialPhoneNumber);
  const [isEditing, setIsEditing] = useState(false);
  const [phoneError, setPhoneError] = useState('');
  const [paymentStatus, setPaymentStatus] = useState('');
  const [paymentError, setPaymentError] = useState('');
  const [paymentReference, setPaymentReference] = useState(null);
  const [isPolling, setIsPolling] = useState(false);

  // Handle edit/save button
  const handleEditToggle = () => {
    if (isEditing) {
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

  // Handle phone number change
  const handlePhoneChange = (e) => {
    setPhoneNumber(e.target.value);
    if (phoneError) setPhoneError('');
  };

  // Initiate STK Push
  const handlePay = async () => {
    setPaymentStatus('Processing...');
    setPaymentError('');
    const reference = `APP_${lastApplicationId}_${uuidv4().slice(0, 8)}`;

    try {
      const response = await fetch('/api/stk-push', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          phoneNumber,
          amount: 1,
          reference,
        }),
      });

      const data = await response.json();
      if (data.success) {
        setPaymentReference(data.payheroReference);
        setPaymentStatus('Payment initiated. Please complete the M-PESA prompt on your phone.');
        setIsPolling(true);
      } else {
        setPaymentError(data.error || 'Failed to initiate payment.');
        setPaymentStatus('');
      }
    } catch (error) {
      setPaymentError('An error occurred. Please try again.');
      setPaymentStatus('');
      console.error('STK Push error:', error);
    }
  };

  // Poll transaction status
  useEffect(() => {
    if (!isPolling || !paymentReference) return;

    const pollStatus = async () => {
      try {
        const response = await fetch(`/api/transaction-status?reference=${paymentReference}`);
        const data = await response.json();
        if (data.success) {
          const status = data.status;
          if (status === 'SUCCESS') {
            setPaymentStatus('Payment successful! Redirecting...');
            setIsPolling(false);

            // Update Firestore application
            if (lastApplicationId) {
              try {
                const appRef = doc(db, 'applications', lastApplicationId);
                await updateDoc(appRef, {
                  paymentStatus: 'SUCCESS',
                  paymentPhoneNumber: phoneNumber,
                  paymentReference,
                  paymentAmount: finalFee,
                  paymentDate: new Date().toISOString(),
                });
                localStorage.removeItem(`serviceFee_${lastApplicationId}`);
              } catch (error) {
                console.error('Error updating Firestore:', error);
                setPaymentError('Payment recorded, but failed to update application status.');
              }
            }

            // Redirect to confirmation page
            setTimeout(() => navigate('/', {
              state: {
                firstName,
                phoneNumber,
                email,
                amount: finalFee,
                reference: paymentReference,
              },
            }), 2000);
          } else if (status === 'FAILED' || status === 'CANCELLED') {
            setPaymentError(`Payment ${status.toLowerCase()}. Please try again.`);
            setPaymentStatus('');
            setIsPolling(false);
          }
        }
      } catch (error) {
        console.error('Status polling error:', error);
      }
    };

    const interval = setInterval(pollStatus, 2000);
    return () => clearInterval(interval);
  }, [isPolling, paymentReference, navigate, lastApplicationId, phoneNumber, firstName, email, finalFee]);

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
              disabled={paymentStatus === 'Processing...'}
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
            disabled={isEditing || !!phoneError || paymentStatus === 'Processing...'}
          >
            {paymentStatus === 'Processing...' ? 'Processing...' : `Pay KES ${finalFee} Now`}
          </button>
        </div>
        {paymentStatus && !paymentError && (
          <p className="payment-status">{paymentStatus}</p>
        )}
        {paymentError && (
          <p className="error-text payment-error">{paymentError}</p>
        )}
      </div>
    </div>
  );
};

export default Success;
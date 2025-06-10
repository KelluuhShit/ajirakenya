import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../services/firebase';
import './Review.css';

const Review = () => {
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [loaderText, setLoaderText] = useState('Loading ...');

  useEffect(() => {
    const fetchData = async () => {
      const lastApplicationId = localStorage.getItem('lastApplicationId');
      if (!lastApplicationId) {
        setError('No application found. Please submit the form first.');
        setLoading(false);
        return;
      }

      try {
        const docRef = doc(db, 'applications', lastApplicationId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setData(docSnap.data());
        } else {
          setError('Application not found.');
        }
      } catch (err) {
        setError('Failed to load application.');
        console.error('Error fetching data:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleSubmit = () => {
    setSubmitLoading(true);
    setTimeout(() => setLoaderText('Processing'), 2000);
    setTimeout(() => setLoaderText('Completed'), 4000);

    // Generate random fee: 100, 105, 110, 115, or 120
    const fees = [100, 105, 110, 115, 120];
    const serviceFee = fees[Math.floor(Math.random() * fees.length)];

    // Store fee in localStorage with application ID
    const lastApplicationId = localStorage.getItem('lastApplicationId');
    localStorage.setItem(`serviceFee_${lastApplicationId}`, serviceFee.toString());

    setTimeout(() => {
      setSubmitLoading(false);
      navigate('/success', {
        state: {
          firstName: data.firstName,
          phoneNumber: data.phoneNumber,
          email: data.email,
          serviceFee, // Pass fee in state
        },
      });
    }, 6000);
  };

  if (loading) return <p className="review-loading">Loading...</p>;
  if (error) return <p className="review-error">{error}</p>;
  if (submitLoading) {
    return (
      <div className="loader-wrapper">
        <div className="loader"></div>
        <p className="loader-text">{loaderText}</p>
      </div>
    );
  }

  return (
    <div className="review-wrapper">
      <h2 className="review-title">Application Review</h2>
      <div className="review-cards">
        <div className="review-card">
          <h3 className="card-title">Personal Information</h3>
          <p><strong>First Name:</strong> {data.firstName}</p>
          <p><strong>Last Name:</strong> {data.lastName}</p>
          <p><strong>National ID:</strong> {data.nationalId}</p>
          <p><strong>Phone Number:</strong> {data.phoneNumber}</p>
          <p><strong>Email:</strong> {data.email}</p>
          <p><strong>Gender:</strong> {data.gender}</p>
        </div>
        <div className="review-card">
          <h3 className="card-title">Education & Work</h3>
          <p><strong>County:</strong> {data.county}</p>
          <p><strong>Constituency:</strong> {data.constituency}</p>
          <p><strong>Education Level:</strong> {data.educationLevel}</p>
          <p><strong>Preferred Work:</strong> {data.preferredWork}</p>
        </div>
      </div>
      <button className="review-button" onClick={handleSubmit}>
        Submit Application
      </button>
    </div>
  );
};

export default Review;
import { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../services/firebase';
import './ApplicationForm.css';

const ApplicationForm = () => {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false); // Add loading state
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      nationalId: '',
      phoneNumber: '',
      email: '',
      gender: '',
      county: '',
      constituency: '',
      educationLevel: '',
      preferredWork: '',
    },
    validationSchema: Yup.object({
      firstName: Yup.string().required('First name is required'),
      lastName: Yup.string().required('Last name is required'),
      nationalId: Yup.string()
        .matches(/^\d{8}$/, 'National ID must be 8 digits')
        .required('National ID is required'),
      phoneNumber: Yup.string()
        .matches(/^07\d{8}$/, 'Phone number must start with 07 and be 10 digits')
        .required('Phone number is required'),
      email: Yup.string().email('Invalid email address').required('Email is required'),
      gender: Yup.string().required('Gender is required'),
      county: Yup.string().required('County is required'),
      constituency: Yup.string().required('Constituency is required'),
      educationLevel: Yup.string().required('Education level is required'),
      preferredWork: Yup.string().required('Preferred work is required'),
    }),
    validateOnChange: true,
    validateOnBlur: true,
    onSubmit: async (values) => {
      try {
        setLoading(true); // Show loader
        const docRef = await addDoc(collection(db, 'applications'), {
          ...values,
          submittedAt: new Date().toISOString(),
        });
        localStorage.setItem('lastApplicationId', docRef.id); // Store ID
        setTimeout(() => {
          setLoading(false); // Hide loader
          navigate('/reviews'); // Navigate after 3 seconds
        }, 3000);
      } catch (error) {
        setLoading(false);
        console.error('Error saving to Firestore:', error);
        alert('Failed to submit application. Please try again.');
      }
    },
  });

  const nextStep = () => {
    const step1Fields = ['firstName', 'lastName', 'nationalId', 'phoneNumber', 'email', 'gender'];
    formik.validateForm().then((errors) => {
      const hasErrors = step1Fields.some((field) => errors[field]);
      if (!hasErrors) {
        setStep(2);
      } else {
        formik.setTouched(
          step1Fields.reduce((acc, field) => ({ ...acc, [field]: true }), {}),
        );
      }
    });
  };

  const prevStep = () => {
    setStep(1);
  };

  const isFieldValid = (fieldName) =>
    formik.touched[fieldName] && !formik.errors[fieldName];

  if (loading) {
    return (
      <div className="loader-wrapper">
        <div className="loader"></div>
        <p className="loader-text">Processing your application...</p>
      </div>
    );
  }

  return (
    <div className="application-form-wrapper">
      <div className="stepper">
        <div className={`step ${step === 1 ? 'active' : ''}`}>
          <span className="step-number">1</span>
          <span className="step-label">Personal Info</span>
        </div>
        <div className="step-connector"></div>
        <div className={`step ${step === 2 ? 'active' : ''}`}>
          <span className="step-number">2</span>
          <span className="step-label">Education & Work</span>
        </div>
      </div>
      <form onSubmit={formik.handleSubmit} className="application-form">
        {step === 1 && (
          <>
            <div className="form-group">
              <label htmlFor="firstName" className="form-label">First Name</label>
              <div className="input-wrapper">
                <input
                  id="firstName"
                  name="firstName"
                  type="text"
                  className="form-input"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.firstName}
                />
                {isFieldValid('firstName') && <span className="checkmark">✔</span>}
              </div>
              {formik.touched.firstName && formik.errors.firstName && (
                <p className="form-error">{formik.errors.firstName}</p>
              )}
            </div>
            <div className="form-group">
              <label htmlFor="lastName" className="form-label">Last Name</label>
              <div className="input-wrapper">
                <input
                  id="lastName"
                  name="lastName"
                  type="text"
                  className="form-input"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.lastName}
                />
                {isFieldValid('lastName') && <span className="checkmark">✔</span>}
              </div>
              {formik.touched.lastName && formik.errors.lastName && (
                <p className="form-error">{formik.errors.lastName}</p>
              )}
            </div>
            <div className="form-group">
              <label htmlFor="nationalId" className="form-label">National ID Number</label>
              <div className="input-wrapper">
                <input
                  id="nationalId"
                  name="nationalId"
                  type="text"
                  className="form-input"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.nationalId}
                />
                {isFieldValid('nationalId') && <span className="checkmark">✔</span>}
              </div>
              {formik.touched.nationalId && formik.errors.nationalId && (
                <p className="form-error">{formik.errors.nationalId}</p>
              )}
            </div>
            <div className="form-group">
              <label htmlFor="phoneNumber" className="form-label">Phone Number</label>
              <div className="input-wrapper">
                <input
                  id="phoneNumber"
                  name="phoneNumber"
                  type="text"
                  className="form-input"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.phoneNumber}
                />
                {isFieldValid('phoneNumber') && <span className="checkmark">✔</span>}
              </div>
              {formik.touched.phoneNumber && formik.errors.phoneNumber && (
                <p className="form-error">{formik.errors.phoneNumber}</p>
              )}
            </div>
            <div className="form-group">
              <label htmlFor="email" className="form-label">Email</label>
              <div className="input-wrapper">
                <input
                  id="email"
                  name="email"
                  type="email"
                  className="form-input"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.email}
                />
                {isFieldValid('email') && <span className="checkmark">✔</span>}
              </div>
              {formik.touched.email && formik.errors.email && (
                <p className="form-error">{formik.errors.email}</p>
              )}
            </div>
            <div className="form-group">
              <label htmlFor="gender" className="form-label">Gender</label>
              <div className="input-wrapper">
                <select
                  id="gender"
                  name="gender"
                  className="form-input"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.gender}
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
                {isFieldValid('gender') && <span className="checkmark">✔</span>}
              </div>
              {formik.touched.gender && formik.errors.gender && (
                <p className="form-error">{formik.errors.gender}</p>
              )}
            </div>
            <div className="form-buttons">
              <button type="button" className="form-button" onClick={nextStep}>
                Next
              </button>
            </div>
          </>
        )}
        {step === 2 && (
          <>
            <div className="form-group">
              <label htmlFor="county" className="form-label">County</label>
              <div className="input-wrapper">
                <input
                  id="county"
                  name="county"
                  type="text"
                  className="form-input"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.county}
                />
                {isFieldValid('county') && <span className="checkmark">✔</span>}
              </div>
              {formik.touched.county && formik.errors.county && (
                <p className="form-error">{formik.errors.county}</p>
              )}
            </div>
            <div className="form-group">
              <label htmlFor="constituency" className="form-label">Constituency</label>
              <div className="input-wrapper">
                <input
                  id="constituency"
                  name="constituency"
                  type="text"
                  className="form-input"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.constituency}
                />
                {isFieldValid('constituency') && <span className="checkmark">✔</span>}
              </div>
              {formik.touched.constituency && formik.errors.constituency && (
                <p className="form-error">{formik.errors.constituency}</p>
              )}
            </div>
            <div className="form-group">
              <label htmlFor="educationLevel" className="form-label">Highest Level of Education</label>
              <div className="input-wrapper">
                <select
                  id="educationLevel"
                  name="educationLevel"
                  className="form-input"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.educationLevel}
                >
                  <option value="">Select Education Level</option>
                  <option value="none">None</option>
                  <option value="primary">Primary</option>
                  <option value="secondary">Secondary</option>
                  <option value="certificate">Certificate</option>
                  <option value="diploma">Diploma</option>
                  <option value="degree">Degree</option>
                </select>
                {isFieldValid('educationLevel') && <span className="checkmark">✔</span>}
              </div>
              {formik.touched.educationLevel && formik.errors.educationLevel && (
                <p className="form-error">{formik.errors.educationLevel}</p>
              )}
            </div>
            <div className="form-group">
              <label htmlFor="preferredWork" className="form-label">Preferred Work</label>
              <div className="input-wrapper">
                <select
                  id="preferredWork"
                  name="preferredWork"
                  className="form-input"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.preferredWork}
                >
                  <option value="">Select Preferred Work</option>
                  <option value="roads">Roads and Infrastructure</option>
                  <option value="environment">Environment</option>
                  <option value="housing">Housing and Urban Development</option>
                </select>
                {isFieldValid('preferredWork') && <span className="checkmark">✔</span>}
              </div>
              {formik.touched.preferredWork && formik.errors.preferredWork && (
                <p className="form-error">{formik.errors.preferredWork}</p>
              )}
            </div>
            <div className="form-buttons">
              <button type="button" className="form-button secondary" onClick={prevStep}>
                Back
              </button>
              <button type="submit" className="form-button">
                Review Information
              </button>
            </div>
          </>
        )}
      </form>
    </div>
  );
};

export default ApplicationForm;
import { useFormik } from 'formik';
import * as Yup from 'yup';
import './ApplicationForm.css';

const ApplicationForm = () => {
  const formik = useFormik({
    initialValues: {
      fullName: '',
      age: '',
      gender: '',
      disability: '',
      location: '',
      role: '',
    },
    validationSchema: Yup.object({
      fullName: Yup.string().required('Full name is required'),
      age: Yup.number()
        .min(18, 'Must be 18 or older')
        .max(35, 'Must be 35 or younger')
        .required('Age is required'),
      gender: Yup.string().required('Gender is required'),
      disability: Yup.string().required('Please specify if you have a disability'),
      location: Yup.string().required('Location is required'),
      role: Yup.string().required('Please select a role'),
    }),
    onSubmit: (values) => {
      console.log('Form submitted:', values);
      alert('Application submitted (mock). Official submissions open June 3, 2025.');
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className="application-form">
      <h2 className="form-title">Apply for Kazi Mtaani</h2>
      <p className="form-note">Applications open June 3, 2025</p>
      <div className="form-group">
        <label htmlFor="fullName" className="form-label">Full Name</label>
        <input
          id="fullName"
          name="fullName"
          type="text"
          className="form-input"
          onChange={formik.handleChange}
          value={formik.values.fullName}
          disabled
        />
        {formik.errors.fullName && <p className="form-error">{formik.errors.fullName}</p>}
      </div>
      <div className="form-group">
        <label htmlFor="age" className="form-label">Age</label>
        <input
          id="age"
          name="age"
          type="number"
          className="form-input"
          onChange={formik.handleChange}
          value={formik.values.age}
          disabled
        />
        {formik.errors.age && <p className="form-error">{formik.errors.age}</p>}
      </div>
      <div className="form-group">
        <label htmlFor="gender" className="form-label">Gender</label>
        <select
          id="gender"
          name="gender"
          className="form-input"
          onChange={formik.handleChange}
          value={formik.values.gender}
          disabled
        >
          <option value="">Select Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
        {formik.errors.gender && <p className="form-error">{formik.errors.gender}</p>}
      </div>
      <div className="form-group">
        <label htmlFor="disability" className="form-label">Disability (if any)</label>
        <input
          id="disability"
          name="disability"
          type="text"
          className="form-input"
          onChange={formik.handleChange}
          value={formik.values.disability}
          disabled
        />
        {formik.errors.disability && <p className="form-error">{formik.errors.disability}</p>}
      </div>
      <div className="form-group">
        <label htmlFor="location" className="form-label">Location (Village/Community)</label>
        <input
          id="location"
          name="location"
          type="text"
          className="form-input"
          onChange={formik.handleChange}
          value={formik.values.location}
          disabled
        />
        {formik.errors.location && <p className="form-error">{formik.errors.location}</p>}
      </div>
      <div className="form-group">
        <label htmlFor="role" className="form-label">Preferred Role</label>
        <select
          id="role"
          name="role"
          className="form-input"
          onChange={formik.handleChange}
          value={formik.values.role}
          disabled
        >
          <option value="">Select Role</option>
          <option value="general">General Worker</option>
          <option value="supervisor">Supervisor</option>
        </select>
        {formik.errors.role && <p className="form-error">{formik.errors.role}</p>}
      </div>
      <button type="submit" className="form-button" disabled>
        Submit Application
      </button>
    </form>
  );
};

export default ApplicationForm;
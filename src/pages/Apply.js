import ApplicationForm from '../components/ApplicationForm';
import CountdownTimer from '../components/CountdownTimer';
import './Apply.css';

const Apply = () => {
  return (
    <section className="apply-section">
      <div className="container">
        <h2 className="section-title">Ready to Join Youth Jobs ?</h2>
        <CountdownTimer />
        <ApplicationForm />
      </div>
    </section>
  );
};

export default Apply;
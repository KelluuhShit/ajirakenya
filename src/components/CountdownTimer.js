import Countdown from 'react-countdown';
import './CountdownTimer.css';

const CountdownTimer = () => {
  const launchDate = new Date('2025-12-31T00:00:00'); // Adjusted for testing

  const renderer = ({ days, hours, minutes, seconds, completed }) => {
    if (completed) {
      return <p className="countdown-complete">Applications are now open!</p>;
    }
    return (
      <div className="countdown">
        <div className="countdown-item">
          <span className="countdown-value">{days}</span>
          <p>Days</p>
        </div>
        <div className="countdown-item">
          <span className="countdown-value">{hours}</span>
          <p>Hours</p>
        </div>
        <div className="countdown-item">
          <span className="countdown-value">{minutes}</span>
          <p>Minutes</p>
        </div>
        <div className="countdown-item">
          <span className="countdown-value">{seconds}</span>
          <p>Seconds</p>
        </div>
      </div>
    );
  };

  return (
    <div className="countdown-container">
      <h2 className="countdown-title">Applications Open June 3, 2025</h2>
      <Countdown date={launchDate} renderer={renderer} />
    </div>
  );
};

export default CountdownTimer;
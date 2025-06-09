import RoleCard from '../components/RoleCard';
import './Opportunities.css';

const Opportunities = () => {
  const roles = [
    {
      title: 'General Workers',
      pay: 'KES 500 per day (10 consecutive weekdays per cycle)',
      responsibilities: [
        'Road maintenance and vegetation clearing',
        'Tree planting and seedling production',
        'Public area cleaning activities',
        'Nursery maintenance and preparation',
        'Civic education participation',
      ],
    },
    {
      title: 'Supervisors',
      pay: 'KES 580 per day',
      responsibilities: [
        'Coordinate daily field activities',
        'Conduct roll calls and briefings',
        'Monitor attendance and reporting',
        'Ensure safety and tool accountability',
        'Guide and mentor team members',
      ],
      preference: 'Preference given to ex-NYS recruits',
    },
  ];

  return (
    <section className="opportunities-section">
      <div className="container">
        <h2 className="section-title">Available Positions</h2>
        <div className="roles-grid">
          {roles.map((role, idx) => (
            <RoleCard
              key={idx}
              title={role.title}
              pay={role.pay}
              responsibilities={role.responsibilities}
              preference={role.preference}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Opportunities;
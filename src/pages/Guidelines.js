import './Guidelines.css';

const Guidelines = () => {
  const guidelines = [
    { title: 'Gender Parity', description: 'Strict 50:50 gender balance enforcement for equal opportunities' },
    { title: 'Disability Inclusion', description: '30% of slots reserved for persons living with disabilities' },
    { title: 'Household Quota', description: 'One person per household to ensure fair distribution' },
    { title: 'Village-Based', description: 'Work within your local community for easy supervision' },
    { title: 'M-Pesa Payments', description: 'Direct mobile payments after each 10-day cycle' },
    { title: 'Civic Education', description: 'Personal development sessions during off-work days' },
  ];

  return (
    <section className="guidelines-section">
      <div className="container">
        <h2 className="section-title">Program Guidelines</h2>
        <div className="guidelines-grid">
          {guidelines.map((guideline, idx) => (
            <div key={idx} className="guideline-card">
              <h3 className="guideline-title">{guideline.title}</h3>
              <p className="guideline-description">{guideline.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Guidelines;
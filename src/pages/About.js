import './About.css';

const About = () => {
  const objectives = [
    'Offer temporary work opportunities to youth across the country.',
    'Instill national values and promote patriotism among youth.',
    'Support climate initiatives like tree planting and seedling production.',
    'Contribute to local infrastructure through road maintenance.',
    'Empower youth with skills and structured work experience.',
  ];

  return (
    <section className="about-section">
      <div className="container">
        <h2 className="section-title">About Kenyan Youth Jobs</h2>
        <div className="about-content">
          <p className="about-text">
              Kenyan youth are turning to handy skills in construction, 
              carpentry, and masonry to find jobs and create opportunities. With a growing demand
              for housing and infrastructure, these trades have become reliable
              sources of income. Many young people are using vocational training 
              and apprenticeships to develop their skills and bypass unemployment challenges.
          </p>
          <p className="about-text">
            The construction sector's growth has also created a lively job market for informal
             and semi-formal work. Young Kenyans are specializing in trades like welding, plumbing, 
             and electrical work, which are in constant demand. Some are even starting small 
             businesses, employing their peers and boosting local economies.
          </p>
          <h3 className="about-subtitle">Program Objectives</h3>
          <ul className="about-list">
            {objectives.map((objective, idx) => (
              <li key={idx}>{objective}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default About;
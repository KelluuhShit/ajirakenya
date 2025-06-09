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
        <h2 className="section-title">About Kazi Mtaani Climate Workx</h2>
        <div className="about-content">
          <p className="about-text">
            The Government of Kenya has officially announced the return of the
            transformative Kazi Mtaani initiative through a new and revitalized program
            dubbed Climate Workx. This large-scale employment program seeks to provide
            temporary work opportunities to over 110,000 youths across the country,
            targeting young Kenyans between the ages of 18 to 35 years.
          </p>
          <p className="about-text">
            Implemented under the oversight of Kenya Rural Roads Authority (KeRRA) and
            Kenya Urban Roads Authority (KURA) engineers, in coordination with officers
            from the National Government Administration Officers (NGAO), this program
            seeks to combat youth unemployment while also supporting the government's
            climate resilience and infrastructure maintenance agenda.
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
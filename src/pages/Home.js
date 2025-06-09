import Hero from '../components/Hero';
import StatsCard from '../components/StatsCard';
import Opportunities from './Opportunities';
import './Home.css';

const Home = () => {
  const stats = [
    { title: 'Youth Opportunities', value: '110,000' },
    { title: 'Age Range', value: '18-35' },
    { title: 'Daily Pay', value: 'KES 500' },
    { title: 'Gender Balance', value: '50:50' },
  ];

  return (
    <div>
      <Hero />
      <section className="home-section">
        <div className="container">
          <h2 className="section-title">Program Highlights</h2>
          <div className="stats-grid">
            {stats.map((stat, idx) => (
              <StatsCard key={idx} title={stat.title} value={stat.value} />
            ))}
          </div>
        </div>
      </section>
        <Opportunities />
    </div>
  );
};

export default Home;
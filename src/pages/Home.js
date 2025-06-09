import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Hero from '../components/Hero';
import StatsCard from '../components/StatsCard';
import Opportunities from './Opportunities';
import coverImg from '../assets/cover.jpg';
import './Home.css';

const Home = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsModalOpen(true);
    }, 5000); // 7 seconds

    return () => clearTimeout(timer); // Cleanup on unmount
  }, []);

  const closeModal = () => {
    setIsModalOpen(false);
  };

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
      <section className="apply-section">
        <div className="container">
          <Link to="/apply" className="btn btn-primary">
            Apply Now
          </Link>
        </div>
      </section>

      {/* Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            className="modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              className="modal-content"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <button className="modal-close" onClick={closeModal} aria-label="Close modal">
                ×
              </button>
              <div className="modal-image" style={{ backgroundImage: `url(${coverImg})` }}></div>
              <div className="modal-body">
                <h2 className="hero-title">
                  Kazi Mtaani Climate Workx 2025
                </h2>
                <p className="text-subtitle">
                  110,000 Youth Employment Opportunities - Building Communities, Fighting Climate Change
                </p>
                <Link to="/apply" className="btn btn-primary" onClick={closeModal}>
                  Apply Now
                </Link>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Home;
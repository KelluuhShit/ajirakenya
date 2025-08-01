import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import coverImg from '../assets/cover.jpg';
import './Hero.css';

const Hero = () => {
  return (
    <section className="hero">
      <div className="hero-bg" style={{ backgroundImage: `url(${coverImg})` }}></div>
      <div className="container hero-container">
        <motion.h1
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="hero-title"
        >
          Kenyan Youth Jobs 2025
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="hero-subtitle"
        >
          110,000 Youth Employment Opportunities - Building Communities, Fighting Climate Change
        </motion.p>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="hero-buttons"
        >
          <Link to="/apply" className="btn btn-primary">
            Apply Now
          </Link>
          <Link to="/about" className="btn btn-secondary">
            Learn More
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
import { motion } from 'framer-motion';
import './StatsCard.css';

const StatsCard = ({ title, value }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="stats-card"
    >
      <h3 className="stats-value">{value}</h3>
      <p className="stats-title">{title}</p>
    </motion.div>
  );
};

export default StatsCard;
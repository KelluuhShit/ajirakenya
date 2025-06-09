import { motion } from 'framer-motion';
import './RoleCard.css';

const RoleCard = ({ title, pay, responsibilities, preference }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      className="role-card"
    >
      <h3 className="role-title">{title}</h3>
      <p className="role-pay">{pay}</p>
      <ul className="role-responsibilities">
        {responsibilities.map((resp, index) => (
          <li key={index}>{resp}</li>
        ))}
      </ul>
      {preference && <p className="role-preference">{preference}</p>}
    </motion.div>
  );
};

export default RoleCard;
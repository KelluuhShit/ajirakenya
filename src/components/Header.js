import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import './Header.css';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="header">
      <div className="container header-container">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Link to="/" className="logo">
            Kenyan Youth Jobs
          </Link>
        </motion.div>
        <button className="menu-toggle" onClick={toggleMenu} aria-label="Toggle navigation menu">
          ☰
        </button>
        <nav className={`nav ${isMenuOpen ? 'nav-open' : ''}`}>
          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
            onClick={() => setIsMenuOpen(false)}
          >
            Home
          </NavLink>
          <NavLink
            to="/about"
            className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
            onClick={() => setIsMenuOpen(false)}
          >
            About
          </NavLink>
          <NavLink
            to="/opportunities"
            className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
            onClick={() => setIsMenuOpen(false)}
          >
            Opportunities
          </NavLink>
          <NavLink
            to="/guidelines"
            className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
            onClick={() => setIsMenuOpen(false)}
          >
            Guidelines
          </NavLink>
          <NavLink
            to="/apply"
            className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
            onClick={() => setIsMenuOpen(false)}
          >
            Apply
          </NavLink>
        </nav>
      </div>
    </header>
  );
};

export default Header;
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Review from './components/Review';
import Success from './components/Success';
import Home from './pages/Home';
import About from './pages/About';
import Opportunities from './pages/Opportunities';
import Guidelines from './pages/Guidelines';
import Apply from './pages/Apply';
import './App.css';

function App() {
  return (
    <div className="app">
      <Header />
      <main className="main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/reviews" element={<Review />} />
          <Route path="/success" element={<Success />} />
          <Route path="/opportunities" element={<Opportunities />} />
          <Route path="/guidelines" element={<Guidelines />} />
          <Route path="/apply" element={<Apply />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
import Features from './components/Features/Features';
import Footer from './components/Footer/Footer';
import Hero from './components/Hero/Hero';
import HowItWorks from './components/HowItWorks/HowItWorks';
import Nav from './components/Nav/Nav';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={
          <>
            <Nav />
            <Hero />
            <HowItWorks />
            <Features />
            <Footer />
          </>
        } />
      </Routes>
    </Router>
  );
}

export default App;

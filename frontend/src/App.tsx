import Features from './components/Features/Features';
import Footer from './components/Footer/Footer';
import Hero from './components/Hero/Hero';
import HowItWorks from './components/HowItWorks/HowItWorks';
import Login from './components/Identity/Login/Login';
import SignUp from './components/Identity/SignUp/SignUp';
import Nav from './components/Nav/Nav';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Quiz from './components/QuizGenerator/Quiz';
import { Basic } from './components/Dashboard/User/Dashboard';
import {Categories} from './components/Categories/Categories';
import Category from './components/Category/Category';
import Quizzes from './components/Quizzes/Quizzes';
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
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path='categories/:id/view-quiz' element={<Quiz />} />
        <Route path='/dashboard' element={<Basic />} />
        <Route path='/categories' element={<Categories />} />
        <Route path='/categories/:id' element={<Category />} />
        <Route path='/categories/:id/quizzes' element={<Quizzes />} />
      </Routes>
    </Router>
  );
}

export default App;

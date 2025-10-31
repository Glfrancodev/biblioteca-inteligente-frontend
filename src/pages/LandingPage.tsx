import Navbar from '../components/landing/Navbar';
import Hero from '../components/landing/Hero';
import Stats from '../components/landing/Stats';
import Features from '../components/landing/Features';
import HowItWorks from '../components/landing/HowItWorks';
import CTA from '../components/landing/CTA';
import Footer from '../components/landing/Footer';
import './LandingPage.css';

const LandingPage = () => {
  return (
    <div className="landing-page">
      <Navbar />
      <Hero />
      <Stats />
      <Features />
      <HowItWorks />
      <CTA />
      <Footer />
    </div>
  );
};

export default LandingPage;

import { TemplateProvider } from './context/TemplateContext';
import Navigation from './components/Navigation/Navigation';
import Hero from './components/Hero/Hero';
import Countdown from './components/Countdown/Countdown';
import Gallery from './components/Gallery/Gallery';
import Events from './components/Events/Events';
import Schedule from './components/Schedule/Schedule';
import GiftRegistry from './components/GiftRegistry/GiftRegistry';
import RsvpForm from './components/RsvpForm/RsvpForm';
import Footer from './components/Footer/Footer';
import FallingPetals from './components/FallingPetals/FallingPetals';
import './App.scss';

const App = () => (
  <TemplateProvider>
    <Navigation />
    <main>
      <Hero />
      <Countdown />
      <Events />
      <Schedule />
      <Gallery />
      <GiftRegistry />
      <RsvpForm />
    </main>
    <Footer />
    <FallingPetals />
  </TemplateProvider>
);

export default App;

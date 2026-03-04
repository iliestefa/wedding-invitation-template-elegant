import { TemplateProvider } from './context/TemplateContext';
import Navigation from './components/Navigation/Navigation';
import Hero from './components/Hero/Hero';
import Countdown from './components/Countdown/Countdown';
import Events from './components/Events/Events';
import Schedule from './components/Schedule/Schedule';
import DressCode from './components/DressCode/DressCode';
import GiftRegistry from './components/GiftRegistry/GiftRegistry';
import RsvpForm from './components/RsvpForm/RsvpForm';
import Footer from './components/Footer/Footer';
import './App.scss';

const App = () => (
  <TemplateProvider>
    <Navigation />
    <main>
      <Hero />
      <Countdown />
      <Events />
      <Schedule />
      <DressCode />
      <GiftRegistry />
      <RsvpForm />
    </main>
    <Footer />
  </TemplateProvider>
);

export default App;

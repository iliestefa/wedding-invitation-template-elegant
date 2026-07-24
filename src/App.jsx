import { TemplateProvider } from './context/TemplateContext';
import Navigation from './components/Navigation/Navigation';
import Hero from './components/Hero/Hero';
import FlowerDivider from './components/FlowerDivider/FlowerDivider';
import Countdown from './components/Countdown/Countdown';
import Gallery from './components/Gallery/Gallery';
import Events from './components/Events/Events';
import Schedule from './components/Schedule/Schedule';
import DressCode from './components/DressCode/DressCode';
import GiftRegistry from './components/GiftRegistry/GiftRegistry';
import RsvpForm from './components/RsvpForm/RsvpForm';
import Footer from './components/Footer/Footer';
import MusicPlayer from './components/MusicPlayer/MusicPlayer';
import FallingPetals from './components/FallingPetals/FallingPetals';
import './App.scss';

const App = () => (
  <TemplateProvider>
    <Navigation />
    <main>
      <Hero />
      <FlowerDivider />
      <Countdown />
      <Gallery />
      <Events />
      <Schedule />
      <DressCode />
      <GiftRegistry />
      <RsvpForm />
      <FlowerDivider />
    </main>
    <Footer />
    <MusicPlayer />
    <FallingPetals />
  </TemplateProvider>
);

export default App;

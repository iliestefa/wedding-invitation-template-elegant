import { TemplateProvider, useTemplateData } from './context/TemplateContext';
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

// Secciones opcionales que la pareja puede ocultar desde el editor Wedya:
// llegan como ids en data.hiddenSections y simplemente no se renderizan.
const AppSections = () => {
  const { hiddenSections } = useTemplateData();
  const isHidden = (sectionId) => hiddenSections?.includes(sectionId);

  return (
    <div className="template-shell">
      <Navigation />
      <main>
        <Hero />
        <Countdown />
        <Events />
        {!isHidden('cronograma') && <Schedule />}
        {!isHidden('vestimenta') && <DressCode />}
        {!isHidden('regalos') && <GiftRegistry />}
        <RsvpForm />
      </main>
      <Footer />
    </div>
  );
};

const App = () => (
  <TemplateProvider>
    <AppSections />
  </TemplateProvider>
);

export default App;

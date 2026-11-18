import { useState, useRef } from 'react';
import { MotionConfig } from 'motion/react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Services, type ServiceOption } from './components/Services';
import { About } from './components/About';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';

export default function App() {
  const [selectedService, setSelectedService] = useState<ServiceOption>('Painting');
  const nameInputRef = useRef<HTMLInputElement>(null);

  const scrollToContact = (service?: ServiceOption) => {
    if (service) {
      setSelectedService(service);
    }
    const contactEl = document.getElementById('contact');
    if (contactEl) {
      contactEl.scrollIntoView({ behavior: 'smooth' });
      window.setTimeout(() => {
        nameInputRef.current?.focus({ preventScroll: true });
      }, 450);
    }
  };

  return (
    <MotionConfig reducedMotion="user">
      <div className="min-h-screen flex flex-col bg-white text-[#252D3A] overflow-x-clip">
        <Navbar onRequestQuote={() => scrollToContact()} />

        <main className="flex-1">
          <Hero onRequestQuote={() => scrollToContact()} />
          <Services onSelectService={(service) => scrollToContact(service)} />
          <About />
          <Contact
            selectedService={selectedService}
            onServiceChange={setSelectedService}
            nameInputRef={nameInputRef}
          />
        </main>

        <Footer />
      </div>
    </MotionConfig>
  );
}

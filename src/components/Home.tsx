import React from 'react';
import Hero from './Hero';
import Reel from './Reel';
import About from './About';
import Campaign from './Campaign';
import Services from './Services';
import Projects from './Projects';
import Contact from './Contact';

const Home: React.FC = () => {
  return (
    <>
      <Hero />
      {/* Светъл „лист“, който се плъзга върху закования hero */}
      <div className="sheet" id="main-content">
        <Reel />
        <About />
        <Services />
        <Campaign />
        <Projects />
        <Contact />
      </div>
    </>
  );
};

export default Home;

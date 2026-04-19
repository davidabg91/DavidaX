import React from 'react';
import Hero from './Hero';
import About from './About';
import Campaign from './Campaign';
import Services from './Services';
import Projects from './Projects';
import Contact from './Contact';

const Home: React.FC = () => {
  return (
    <main id="main-content">
      <Hero />
      <About />
      <Campaign />
      <Services />
      <Projects />
      <Contact />
    </main>
  );
};

export default Home;

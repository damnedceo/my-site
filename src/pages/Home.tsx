import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Hero from '../sections/Hero';
import Stats from '../sections/Stats';
import Services from '../sections/Services';
import Process from '../sections/Process';
import Results from '../sections/Results';
import Pricing from '../sections/Pricing';
import Testimonials from '../sections/Testimonials';
import FAQ from '../sections/FAQ';
import CTA from '../sections/CTA';

gsap.registerPlugin(ScrollTrigger);

const Home = () => {
  useEffect(() => {
    // Refresh ScrollTrigger after all content is loaded
    ScrollTrigger.refresh();
  }, []);

  return (
    <>
      <Hero />
      <Stats />
      <Services />
      <Process />
      <Results />
      <Pricing />
      <Testimonials />
      <FAQ />
      <CTA />
    </>
  );
};

export default Home;

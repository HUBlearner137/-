import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import Navigation from './sections/Navigation';
import StressGame from './sections/StressGame';
import Hero from './sections/Hero';
import Categories from './sections/Categories';
import ResourceSearch from './sections/ResourceSearch';
import FeaturedResources from './sections/FeaturedResources';
import Testimonials from './sections/Testimonials';
import Emergency from './sections/Emergency';
import Footer from './sections/Footer';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

function App() {
  useEffect(() => {
    // Initialize smooth scroll behavior
    document.documentElement.style.scrollBehavior = 'smooth';

    // Configure ScrollTrigger defaults
    ScrollTrigger.defaults({
      toggleActions: 'play none none reverse',
    });

    // Refresh ScrollTrigger on load
    ScrollTrigger.refresh();

    // Cleanup
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div className="min-h-screen bg-cream">
      {/* Navigation */}
      <Navigation />

      {/* Main Content */}
      <main>
        {/* Stress Game - 首页游戏 */}
        <StressGame />

        {/* Hero Section */}
        <Hero />

        {/* Resource Categories */}
        <Categories />

        {/* Resource Search */}
        <ResourceSearch />

        {/* Featured Resources */}
        <FeaturedResources />

        {/* Testimonials */}
        <Testimonials />

        {/* Emergency Section */}
        <Emergency />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;

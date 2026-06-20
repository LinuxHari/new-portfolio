'use client'

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useState } from "react";
import Preloader from "./Preloader";
import SmoothScroll from "./SmoothScroll";
import SectionNavigator from "./SectionNavigator";
import Navbar from "./Navbar";
import Hero from "./Hero";
import Experience from "./Experience";
import Capabilities from "./Capabilities";
import Projects from "./Projects";
import About from "./About";
import Footer from "./Footer";

gsap.registerPlugin(ScrollTrigger);

const HomePage = () => {
    
    const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!loading) {
      ScrollTrigger.refresh();
      window.scrollTo(0, 0);
    }
  }, [loading]);

  return (
    <div className="relative bg-coal">
      <Preloader onComplete={() => {
        setTimeout(() => setLoading(false), 100);
      }} />
      
      <div className={`transition-opacity duration-1000 ${loading ? "opacity-0 invisible h-screen overflow-hidden" : "opacity-100 visible h-auto"}`}>
        <SmoothScroll>
          <div className="relative">
            <SectionNavigator isReady={!loading} />
            <Navbar isReady={!loading} />
            <main>
              <div id="hero">
                <Hero isReady={!loading} />
              </div>
              <div id="experience">
                <Experience />
              </div>
              <div id="capabilities">
                <Capabilities />
              </div>
              <div id="work">
                <Projects />
              </div>
              <div id="about">
                <About />
              </div>
            </main>
            <div id="contact">
              <Footer />
            </div>
          </div>
        </SmoothScroll>
      </div>
    </div>
    )
}

export default HomePage;
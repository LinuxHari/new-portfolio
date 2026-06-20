import { useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Magnetic from "./Magnetic";

gsap.registerPlugin(ScrollTrigger);

const SECTIONS = [
  { id: "hero", label: "Home" },
  { id: "experience", label: "Experience" },
  { id: "capabilities", label: "Stack" },
  { id: "work", label: "Projects" },
  { id: "about", label: "About" },
  { id: "contact", label: "Contact" },
];

export default function SectionNavigator({ isReady }: { isReady: boolean }) {
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    if (!isReady) return;

    SECTIONS.forEach((section) => {
      ScrollTrigger.create({
        trigger: `#${section.id}`,
        start: "top center",
        end: "bottom center",
        onEnter: () => setActiveSection(section.id),
        onEnterBack: () => setActiveSection(section.id),
      });
    });

    // Vertical line progress
    gsap.to(".nav-progress-bar", {
      scaleY: 1,
      ease: "none",
      scrollTrigger: {
        trigger: "body",
        start: "top top",
        end: "bottom bottom",
        scrub: true,
      },
    });

    // Entry animation
    gsap.from(".section-nav-container", {
      x: 50,
      opacity: 0,
      duration: 1,
      ease: "power2.out",
      delay: 1.2
    });
  }, [isReady]);

  return (
    <div className="section-nav-container fixed right-8 md:right-12 top-1/2 -translate-y-1/2 z-[110] hidden md:flex flex-col items-end">
      <div className="relative flex flex-col items-end">
        {/* Main Track */}
        <div className="absolute right-0 top-0 w-[1px] h-full bg-white/5" />
        
        {/* Progress Track */}
        <div className="absolute right-0 top-0 w-[1px] h-full overflow-hidden">
          <div className="nav-progress-bar absolute top-0 right-0 w-[1px] h-full bg-white/20 origin-top scale-y-0" />
        </div>

        {/* Gliding Active Indicator */}
        <div 
          className="absolute right-[-1px] w-[2px] bg-white transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] shadow-[0_0_15px_rgba(255,255,255,0.5)]"
          style={{
            height: "40px",
            top: `${(SECTIONS.findIndex(s => s.id === activeSection) * (100 / (SECTIONS.length - 1)))}%`,
            transform: "translateY(-50%)",
            opacity: activeSection ? 1 : 0
          }}
        />

        {/* Labels Container */}
        <div className="flex flex-col h-[360px] justify-between relative py-0">
          {SECTIONS.map((section) => (
            <div key={section.id} className="group flex items-center justify-end h-8 relative pr-6">
              <a
                href={`#${section.id}`}
                className={`text-[9px] uppercase tracking-[0.2em] transition-all duration-500 font-display font-medium whitespace-nowrap cursor-none interactive ${
                  activeSection === section.id
                    ? "text-white opacity-100 translate-x-0"
                    : "text-white/10 opacity-0 group-hover:opacity-40 group-hover:translate-x-0 translate-x-4"
                }`}
              >
                {section.label}
              </a>
              
              {/* Invisible trigger area for hover */}
              <div className="absolute inset-0 pointer-events-auto" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

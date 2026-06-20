import { useState, useEffect, useRef } from "react";
import { Menu, X } from "lucide-react";
import gsap from "gsap";
import Magnetic from "./Magnetic";
import Logo from "./Logo";

export default function Navbar({ isReady }: { isReady: boolean }) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const linksRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);

  const navItems = [
    { label: "Journey", href: "#experience" },
    { label: "Work", href: "#work" },
    { label: "About", href: "#about" },
    { label: "Contact", href: "#contact" },
  ];

  useEffect(() => {
    if (!isReady) return;

    // Initial entry animations
    gsap.from(logoRef.current, {
      y: -20,
      opacity: 0,
      duration: 0.8,
      ease: "power2.out",
      delay: 0.5
    });

    gsap.from(".desktop-link", {
      y: -20,
      opacity: 0,
      duration: 0.8,
      stagger: 0.1,
      ease: "power2.out",
      delay: 0.7
    });
  }, [isReady]);

  useEffect(() => {
    if (isOpen) {
      gsap.to(menuRef.current, {
        scaleY: 1,
        duration: 0.8,
        ease: "expo.inOut"
      });
      gsap.fromTo(".mobile-link", 
        { y: 80, opacity: 0, rotate: 10, skewX: 20 },
        { 
          y: 0, 
          opacity: 1, 
          rotate: 0,
          skewX: 0,
          duration: 1.2, 
          stagger: 0.1, 
          ease: "expo.out",
          delay: 0.3
        }
      );
      gsap.fromTo(".mobile-footer",
        { opacity: 0 },
        { opacity: 1, duration: 0.5, delay: 0.8 }
      );
    } else {
      gsap.to(menuRef.current, {
        scaleY: 0,
        duration: 0.8,
        ease: "expo.inOut",
        delay: 0.2
      });
    }
  }, [isOpen]);

  return (
    <>
      <nav ref={navRef} className="fixed top-0 left-0 w-full z-[100] px-6 py-6 md:px-12 md:py-8 flex justify-between items-center mix-blend-difference">
         <Logo logoRef={logoRef} />
        {/* Desktop Links */}
        <div className="hidden md:flex gap-12">
          {navItems.map((item) => (
            <div key={item.label} className="desktop-link opacity-0">
              <Magnetic strength={0.3}>
                <a
                  href={item.href}
                  className="text-sm uppercase tracking-widest font-medium hover:text-flame transition-colors relative group block p-2"
                >
                  {item.label}
                  <span className="absolute bottom-1 left-2 w-0 h-[1px] bg-flame transition-all duration-300 group-hover:w-[calc(100%-16px)]" />
                </a>
              </Magnetic>
            </div>
          ))}
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden w-10 h-10 flex items-center justify-center bg-flame rounded-full text-coal relative z-[101]"
        >
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        ref={menuRef}
        className="fixed inset-0 bg-coal z-[90] flex flex-col items-center justify-center origin-top h-screen w-full scale-y-0"
      >
        <div ref={linksRef} className="flex flex-col items-center gap-8">
          {navItems.map((item) => (
            <div key={item.label} className="overflow-hidden">
              <a
                href={item.href}
                onClick={() => setIsOpen(false)}
                className="mobile-link block text-5xl font-display font-extrabold uppercase tracking-tighter hover:text-flame transition-colors"
              >
                {item.label}
              </a>
            </div>
          ))}
        </div>

        <div className="mobile-footer absolute bottom-12 flex flex-col items-center gap-4 opacity-0">
          <p className="text-[10px] uppercase tracking-[0.25em] text-white/50 font-sans font-semibold">Connect</p>
          <div className="flex gap-6">
            <a href="#" className="text-xl uppercase font-display border-b border-white/10 hover:border-flame transition-colors">TW</a>
            <a href="#" className="text-xl uppercase font-display border-b border-white/10 hover:border-flame transition-colors">GH</a>
            <a href="#" className="text-xl uppercase font-display border-b border-white/10 hover:border-flame transition-colors">LI</a>
          </div>
        </div>
      </div>
    </>
  );
}

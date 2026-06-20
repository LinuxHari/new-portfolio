import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ExternalLink } from "lucide-react";
import intHunt from "@/app/assets/images/inthunt.png"
import resHunt from "@/app/assets/images/reshunt.png"
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

const PROJECTS = [
  {
    title: "Inthunt",
    category: "AI Interview Platform",
    image: intHunt,
    year: "2026",
  },
  {
    title: "Reshunt",
    category: "AI Resume Builder",
    image: resHunt,
    year: "2024",
  },
];

export default function Projects() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Skew on scroll effect
      const proxy = { skew: 0 };
      const skewSetter = gsap.quickSetter(".project-card", "skewY", "deg");
      const clamp = gsap.utils.clamp(-20, 20);

      ScrollTrigger.create({
        onUpdate: (self) => {
          const skew = clamp(self.getVelocity() / -300);
          if (Math.abs(skew) > Math.abs(proxy.skew)) {
            proxy.skew = skew;
            gsap.to(proxy, {
              skew: 0,
              duration: 0.8,
              ease: "power3",
              overwrite: true,
              onUpdate: () => skewSetter(proxy.skew),
            });
          }
        },
      });

      // Entrance reveals
      gsap.utils.toArray<HTMLElement>(".project-card").forEach((card) => {
        gsap.from(card, {
          y: 100,
          opacity: 0,
          duration: 1.5,
          ease: "power4.out",
          scrollTrigger: {
            trigger: card,
            start: "top bottom-=50",
            toggleActions: "play none none reverse",
          },
        });

        // Image Parallax
        const img = card.querySelector("img");
        if (img) {
          gsap.to(img, {
            y: "15%",
            ease: "none",
            scrollTrigger: {
              trigger: card,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          });
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="work" ref={containerRef} className="py-32 px-6 md:px-12 bg-coal">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-end mb-24">
          <h2 className="text-5xl md:text-7xl font-display font-extrabold uppercase tracking-tighter">
            02 — BUILDS
          </h2>
          <div className="hidden md:block text-right">
            <p className="text-white/50 uppercase tracking-widest text-xs mb-2">Projects</p>
            <p className="font-mono text-flame">001 — 002</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24">
          {PROJECTS.map((project, i) => (
            <div
              key={project.title}
              className={`project-card group cursor-none interactive ${
                i === 1 ? "md:mt-32" : ""
              }`}
            >
              <div className="relative aspect-[4/5] overflow-hidden rounded-sm bg-ash">
                <Image
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-80 group-hover:opacity-100"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-coal/80 to-transparent flex items-end p-8">
                  <div className="w-full flex justify-between items-center translate-y-4 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                    <span className="font-mono text-xs text-flame">{project.year}</span>
                    <ExternalLink className="w-5 h-5 text-white" />
                  </div>
                </div>
              </div>
              <div className="mt-6 flex justify-between items-start">
                <div>
                  <h3 className="text-2xl font-bold uppercase tracking-tight group-hover:text-flame transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-white/50 text-sm mt-1 uppercase tracking-widest font-light">
                    {project.category}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

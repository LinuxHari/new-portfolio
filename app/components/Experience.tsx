import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const EXPERIENCES = [
  {
    company: "Lystloc",
    role: "Full-Stack AI Developer",
    period: "2026 — NOW",
    description: "Architecting secure authentication platforms and RAG-powered AI assistants for large-scale organizational knowledge discovery. Focused on pushing the boundaries of AI integration in enterprise workflows.",
    tags: ["Next.js", "TypeScript", "Serverless", "RAG", "React.js", "Node.js", "Nest.js", "PostgreSQL", "MySQL", "SCSS", "AWS", "Tailwind CSS", "SEO"],
    number: "01"
  },
  {
    company: "Travelfika",
    role: "Full-Stack Developer",
    period: "2023 — 2026",
    description: "Driving full-stack engineering initiatives, implementing complex subscription systems, and optimizing platform performance thru modern web architectures and SEO strategies.",
    tags: ["Next.js", "TypeScript", "JavaScript", "Node.js", "Stripe", "Redis", "Express.js", "PostgreSQL", "MongoDB", "AWS", "SEO", "Tailwind CSS", "HTML", "CSS"],
    number: "02"
  }
];

export default function Experience() {
  const containerRef = useRef<HTMLDivElement>(null);
  const horizontalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const horizontalSection = horizontalRef.current;
      if (!horizontalSection) return;

      const slides = gsap.utils.toArray<HTMLElement>(".horizontal-item");
      
      const totalWidth = horizontalSection.scrollWidth;
      const amountToScroll = totalWidth - window.innerWidth;

      const mainST = ScrollTrigger.create({
        id: "horizontalScroll",
        trigger: containerRef.current,
        start: "top top",
        end: () => `+=${totalWidth}`,
        pin: true,
        scrub: 1, 
        invalidateOnRefresh: true,
        animation: gsap.to(horizontalSection, {
          x: () => -amountToScroll,
          ease: "none",
        })
      });

      // Intro Char Reveal
      const chars = gsap.utils.toArray<HTMLElement>(".exp-heading-char");
      gsap.from(chars, {
        y: 100,
        opacity: 0,
        stagger: 0.05,
        duration: 1,
        ease: "power4.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 20%",
          toggleActions: "play none none reverse"
        }
      });

      // Background Text Parallax
      gsap.to(".bg-experience-text", {
        x: -200,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true
        }
      });

      // Item reveals linked to horizontal scroll
      slides.forEach((item, i) => {
        const inner = item.querySelector(".item-inner");
        const number = item.querySelector(".bg-number");
        
        if (inner) {
          gsap.from(inner, {
            x: 200,
            opacity: 0,
            scale: 0.9,
            rotate: 2,
            duration: 1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: item,
              containerAnimation: mainST.animation,
              start: "left 90%",
              end: "left 40%",
              scrub: true
            }
          });
        }

        if (number) {
          gsap.fromTo(number, 
            { x: -100, opacity: 0 },
            { 
              x: 100, 
              opacity: 0.1, 
              ease: "none",
              scrollTrigger: {
                trigger: item,
                containerAnimation: mainST.animation,
                start: "left 100%",
                end: "right 0%",
                scrub: true
              }
            }
          );
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      id="experience" 
      ref={containerRef} 
      className="relative h-screen bg-coal overflow-hidden flex items-center"
    >
      {/* Background Text */}
      <div className="bg-experience-text absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none opacity-[0.05] select-none">
        <h2 className="text-[30vw] font-display font-black uppercase leading-none tracking-tighter">
          EXPERIENCE
        </h2>
      </div>

      <div 
        ref={horizontalRef} 
        className="flex flex-nowrap h-full space-x-0 will-change-transform"
      >
        {/* Intro Slide */}
        <div className="flex-none w-screen h-full flex flex-col justify-center px-12 md:px-24">
          <div className="max-w-4xl">
            <p className="text-flame font-display text-xs uppercase tracking-[0.3em] font-semibold mb-8">Career Trajectory</p>
            <h2 className="text-5xl md:text-[clamp(3rem,8vw,8rem)] font-display font-extrabold uppercase leading-[0.85] tracking-tighter mb-12 overflow-hidden">
              <span className="inline-block exp-heading-char font-semibold">Technical</span><br />
              <span className="inline-block exp-heading-char fiery-gradient">Evolution</span>
            </h2>
            <div className="flex items-center gap-6">
              <div className="w-24 h-[1px] bg-white/20" />
              <p className="text-white/60 text-xs md:text-sm font-sans font-light leading-relaxed max-w-sm">
                A horizontal traversal through the milestones of engineering and AI innovation.
              </p>
            </div>
          </div>
        </div>

        {/* Experience Slides */}
        {EXPERIENCES.map((exp, i) => (
          <div 
            key={i} 
            className="flex-none w-screen h-full flex items-center justify-center px-6 md:px-24 horizontal-item"
          >
            <div className="item-inner relative max-w-6xl w-full grid md:grid-cols-[0.8fr_1.2fr] gap-12 md:gap-24 items-center">
              {/* Massive Number Background */}
              <div className="bg-number absolute -top-32 -left-12 md:-left-24 text-[20rem] md:text-[30rem] font-display font-black text-white/5 pointer-events-none select-none z-0">
                {exp.number}
              </div>

              {/* Company Info Card */}
              <div className="relative z-10 p-8 md:p-12 bg-white/5 border border-white/5 backdrop-blur-2xl rounded-3xl group hover:border-flame/30 transition-colors duration-700">
                <span className="text-xs font-display font-semibold text-flame mb-4 block tracking-[0.2em] uppercase">{exp.period}</span>
                <h3 className="text-4xl md:text-6xl font-display font-extrabold uppercase tracking-tight mb-4">{exp.company}</h3>
                <p className="text-base text-white/50 font-light mb-8">{exp.role}</p>
              </div>

              {/* Description & Tags */}
              <div className="relative z-10 space-y-12">
                <blockquote className="text-xl md:text-[clamp(1.5rem,3vw,3rem)] font-display font-light leading-[1.3] text-white/80">
                  "{exp.description}"
                </blockquote>
                
                <div className="flex flex-wrap gap-3">
                  {exp.tags.map(tag => (
                    <div 
                      key={tag} 
                      className="px-5 py-2 glass border border-white/10 rounded-full text-[10px] md:text-xs font-sans font-medium tracking-wider text-white/60 hover:border-flame/50 hover:text-white transition-all cursor-none interactive"
                    >
                      {tag}
                    </div>
                  ))}
                </div>

                {/* <div className="pt-6">
                  <button className="group flex items-center gap-4 text-flame uppercase tracking-[0.3em] text-xs font-bold interactive">
                    Explore Contributions
                    <div className="w-10 h-10 rounded-full border border-flame/20 flex items-center justify-center group-hover:bg-flame/10 group-hover:border-flame transition-all">
                      <ArrowUpRight className="w-4 h-4 transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1" />
                    </div>
                  </button>
                </div> */}
              </div>
            </div>
          </div>
        ))}

        {/* Closing Slide */}
        <div className="flex-none w-[50vw] h-full flex flex-col justify-center px-12 md:px-24">
          <div className="bg-flame w-[1px] h-32 mb-12 opacity-30" />
          <h2 className="text-3xl md:text-5xl font-display font-light uppercase tracking-tighter text-white/50 leading-none">
            Continually <br />
            <span className="text-white font-extrabold">Refining</span><br />
            the Edge.
          </h2>
        </div>
      </div>
    </section>
  );
}

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TextPlugin } from "gsap/TextPlugin";

gsap.registerPlugin(ScrollTrigger, TextPlugin);

export default function Capabilities() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headPreRef = useRef<HTMLParagraphElement>(null);
  const headMainRef = useRef<HTMLHeadingElement>(null);
  const headSubRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Pinning the left heading
      const mm = gsap.matchMedia();
      mm.add("(min-width: 768px)", () => {
        ScrollTrigger.create({
          trigger: sectionRef.current,
          start: "top 120px",
          end: "bottom bottom",
          pin: ".cap-header",
          pinSpacing: false
        });
      });

      // Text Swap Animation for Header
      const academicSection = document.querySelector(".cap-academic");
      if (academicSection && headPreRef.current && headMainRef.current && headSubRef.current) {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: academicSection,
            start: "top 60%",
            end: "top 40%",
            toggleActions: "play none none reverse",
          }
        });

        tl.to(headPreRef.current, { duration: 0.5, text: "Foundations", ease: "none" })
          .to(headMainRef.current, { duration: 0.5, text: "Academic", ease: "none" }, 0)
          .to(headSubRef.current, { duration: 0.5, text: "Merit", ease: "none" }, 0);
      }

      // Refined reveal for skills
      gsap.utils.toArray<HTMLElement>(".cap-category").forEach((category) => {
        const items = category.querySelectorAll(".cap-item");
        const heading = category.querySelector("h3");

        if (heading) {
          gsap.fromTo(heading,
            { opacity: 0, x: -30 },
            {
              opacity: 1,
              x: 0,
              duration: 0.5,
              ease: "power2.out",
              scrollTrigger: {
                trigger: category,
                start: "top 95%",
                toggleActions: "play none none reverse"
              }
            }
          );
        }

        if (items.length > 0) {
          gsap.fromTo(items,
            { opacity: 0, y: 10 },
            {
              opacity: 1,
              y: 0,
              stagger: 0.1,
              duration: 0.2,
              ease: "power3.out",
              scrollTrigger: {
                trigger: category,
                start: "top 90%",
                toggleActions: "play none none reverse"
              }
            }
          );
        }
      });

      // Force refresh to handle initial layout
      ScrollTrigger.refresh();
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="capabilities" ref={sectionRef} className="py-32 px-6 md:px-12 bg-coal border-t border-white/5 relative overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col md:grid md:grid-cols-[1fr_2fr] gap-12 md:gap-24">
        {/* Left Sticky Header */}
        <div className="cap-header h-fit">
          <p ref={headPreRef} className="text-flame font-display text-xs uppercase tracking-[0.3em] font-semibold mb-4">Architecture</p>
          <h2 className="text-4xl md:text-[clamp(2.5rem,5vw,4.5rem)] font-display font-extrabold uppercase leading-[0.95] tracking-tighter">
            <span ref={headMainRef} className="block font-semibold">System</span>
            <span ref={headSubRef} className="fiery-gradient block">Stack</span>
          </h2>
        </div>

        {/* Right Content Scroller */}
        <div className="space-y-32">
          {/* Section 1: Expertise */}
          <div className="cap-category">
            <h3 className="text-white/50 font-display text-[11px] uppercase tracking-[0.3em] font-semibold mb-12 border-b border-white/5 pb-4">
              02 — Engineering Focus
            </h3>
            <div className="cap-grid-container grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16">
              {[
                { title: "Frontend Engineering", desc: "Next.js, React, SPA/MPA Architecture, Motion Orchestration." },
                { title: "Backend Systems", desc: "Node.js, Nest.js, Typed APIs, Serverless Infrastructure." },
                { title: "Intelligence Integration", desc: "LLM Pipelines, Vector Search, RAG Workflows, AI Orchestration." },
                { title: "Relational Design", desc: "PostgreSQL, TypeORM, Database Normalization, Performance Tuning." }
              ].map((item, i) => (
                <div key={i} className="cap-item group">
                  <h4 className="text-2xl md:text-3xl font-display font-medium mb-4 group-hover:text-flame transition-colors tracking-tight">
                    {item.title}
                  </h4>
                  <p className="text-white/50 leading-relaxed font-light text-base">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Section 2: Toolkit */}
          <div className="cap-category">
            <h3 className="text-white/50 font-display text-[11px] uppercase tracking-[0.3em] font-semibold mb-12 border-b border-white/5 pb-4">
              03 — Toolset
            </h3>
            <div className="cap-grid-container flex flex-wrap gap-4">
              {[
                "TypeScript", "JavaScript", "PostgreSQL", "MongoDB",
                "Docker", "Redis", "TypeORM",
                "Node.js", "React.js", "Next.js", "Nest.js", "Express.js", "AWS", "CI/CD", "Git"
              ].map((tool, i) => (
                <div
                  key={i}
                  className="cap-item px-8 py-4 bg-ash/5 border border-white/5 rounded-2xl text-xl font-display font-light hover:bg-flame/10 hover:border-flame/30 transition-all cursor-none interactive"
                >
                  {tool}
                </div>
              ))}
            </div>
          </div>

          {/* Section 3: Academic Foundations */}
          <div className="cap-category cap-academic">
            <h3 className="text-white/50 font-display text-[11px] uppercase tracking-[0.3em] font-semibold mb-12 border-b border-white/5 pb-4">
              04 — Academic Core
            </h3>
            <div className="cap-grid-container space-y-12">
              {[
                {
                  degree: "Master of Science in Computer Science",
                  inst: "Bharathidasan University",
                  period: "2025 — 2027"
                },
                {
                  degree: "Bachelor of Science in Computer Science",
                  inst: "National College, Trichy",
                  period: "2020 — 2023",
                  score: "8.9 CGPA"
                }
              ].map((edu, i) => (
                <div key={i} className="cap-item relative pl-12 border-l border-white/10 group">
                  <div className="absolute left-0 top-0 w-[4px] h-0 bg-flame group-hover:h-full transition-all duration-700" />
                  <p className="text-flame font-display font-medium text-xs tracking-wider uppercase mb-2">{edu.period}</p>
                  <h4 className="text-2xl md:text-4xl font-display font-extrabold uppercase tracking-tight">
                    {edu.degree}
                  </h4>
                  <p className="text-white/50 text-base md:text-lg font-light mt-2">
                    {edu.inst} {edu.score ? `/ ${edu.score}` : ""}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

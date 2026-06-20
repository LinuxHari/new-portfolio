import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const chars = textRef.current?.querySelectorAll(".word");
      if (chars) {
        gsap.from(chars, {
          opacity: 0.2,
          y: 20,
          stagger: 0.1,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 60%",
            end: "center 40%",
            scrub: true,
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const text = "I am a Full-Stack Engineer dedicated to building high-performance web applications and AI-powered experiences. With a focus on scalability and precision, I bridge the gap between creative frontend architecture and robust backend systems.";

  return (
    <section id="about" ref={sectionRef} className="py-64 px-6 md:px-12 bg-coal relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-flame/5 blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto flex flex-col items-center text-center">
        <h2 className="text-xs uppercase tracking-[0.4em] text-flame mb-24 font-display font-semibold opacity-70">01 — DNA</h2>
        <div ref={textRef} className="text-3xl md:text-7xl font-display font-light leading-[1.05] tracking-tighter max-w-6xl">
          {text.split(" ").map((word, i) => (
            <span key={i} className="word inline-block mr-[0.2em] mb-[0.1em]">
              {word}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

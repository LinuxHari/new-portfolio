import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import myImage from "@/app/assets/images/MyImg.png";
import { Briefcase, CalendarClock, CalendarHeart, Clock, ClockFading, MapPinIcon } from "lucide-react";
import Image from "next/image";

export default function Hero({ isReady }: { isReady: boolean }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set([".hero-title span", ".status-item", ".hero-desc"], {
        opacity: 0,
        y: 30,
      });
      gsap.set(".hero-image-container", { clipPath: "inset(100% 0% 0% 0%)" });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (!isReady) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      tl.to(".hero-image-container", {
        clipPath: "inset(0% 0% 0% 0%)",
        duration: 1.8,
        ease: "expo.inOut",
      })
        .to(
          ".hero-title span",
          {
            y: 0,
            opacity: 1,
            duration: 1.2,
            stagger: 0.1,
            ease: "power4.out",
          },
          "-=0.8",
        )
        .to(
          ".hero-desc",
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power3.out",
          },
          "-=1",
        )
        .to(
          ".status-item",
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.05,
            ease: "power2.out",
          },
          "-=0.5",
        );

      // Image Parallax on Scroll
      gsap.to(".hero-image", {
        y: "20%",
        ease: "none",
        scrollTrigger: {
          trigger: ".hero-image-container",
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, [isReady]);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("en-US", {
      hour12: true,
      hour: "numeric",
      minute: "2-digit",
    });
  };

  const formatDate = (date: Date) => {
    return date
      .toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      })
      .toUpperCase();
  };

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen bg-coal overflow-hidden flex flex-col"
    >
      {/* <Embers /> */}
      <div className="flex-1 flex flex-col md:grid md:grid-cols-[1.3fr_0.8fr] md:gap-12">
        {/* Left Content */}
        <div className="pt-32 pb-12 px-6 md:pl-12 md:pr-12 flex flex-col justify-center relative">
          <div className="hero-desc mb-7 max-w-[340px] opacity-0">
            <p className="text-sm md:text-base text-white/60 leading-relaxed font-sans font-light">
              Building scalable systems, intelligent products, and fast user experiences.
            </p>
          </div>

          <h1 className="hero-title text-[clamp(2.5rem,13vw,13rem)] md:text-[clamp(4.5rem,10vw,12rem)] font-display font-black leading-[0.85] uppercase tracking-tighter mix-blend-difference z-10 -ml-1">
            <div className="overflow-hidden block py-1">
              <span className="inline-block opacity-0 translate-y-full font-semibold">
                Hariharan
              </span>
            </div>
            <div className="overflow-hidden block py-1">
              <span className="inline-block fiery-gradient opacity-0 translate-y-full">
                Manohar&nbsp;
              </span>
            </div>
          </h1>

          <h2 className="hero-desc uppercase tracking-[0.2em] text-white/60 font-display font-medium text-xs md:text-sm mt-3 flex gap-x-3 items-center">
            Software Engineer <div className="h-px w-[80px] bg-white/20" />
          </h2>
        </div>

        {/* Right Image */}
        <div className="relative h-[50vh] md:h-auto overflow-hidden">
          <div className="hero-image-container absolute inset-0 bg-ash">
            <Image
              src={myImage}
              alt="Portrait of Engineering"
              className="hero-image w-full h-full object-cover transition-all duration-1000"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>
      </div>

      {/* Bottom Status Bar */}
      <div className="w-full border-t border-white/5 py-4 px-6 md:px-12 flex justify-between items-center text-[10px] font-sans font-medium uppercase tracking-[0.15em] text-white/50">
        <div className="status-item flex items-center gap-4 opacity-0">
          <span className="flex items-center gap-2"><MapPinIcon className="h-4 w-4"/>Tiruchirappalli, India</span>
          <div className="w-1 h-1 rounded-full animate-pulse" />
          <span className="flex items-center gap-2"><Briefcase className="h-4 w-4"/>Available for hire</span>
        </div>

        <div className="status-item hidden md:block opacity-0">
         <span className="flex items-center gap-2"><CalendarClock className="h-4 w-4"/> {formatDate(time)}</span>
        </div>

        <div className="status-item opacity-0"><span className="flex items-center gap-2"><ClockFading className="h-4 w-4"/> {formatTime(time)}</span></div>
      </div>
    </section>
  );
}

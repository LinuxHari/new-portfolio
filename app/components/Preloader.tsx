import {useRef, useEffect} from 'react'
import gsap from 'gsap';
import Logo from './Logo';

function Preloader({ onComplete }: { onComplete: () => void }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => onComplete()
    });

    tl.to(barRef.current, {
      x: "100%",
      duration: 2,
      ease: "power2.inOut"
    })
    .to(containerRef.current, {
      y: "-100%",
      duration: 1.2,
      ease: "power4.inOut"
    });
  }, [onComplete]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-coal flex-col gap-5"
    >
      <Logo logoRef={logoRef} />
      <div className="w-48 h-[1px] bg-white/5 relative overflow-hidden">
        <div
          ref={barRef}
          className="absolute inset-0 bg-flame w-full -translate-x-full"
        />
      </div>
    </div>
  );
}
export default Preloader
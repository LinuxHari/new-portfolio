import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const Github = (
  <svg
    width="24"
    height="24"
    viewBox="0 -0.5 25 25"
    fill="#FFFFFF"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="m12.301 0h.093c2.242 0 4.34.613 6.137 1.68l-.055-.031c1.871 1.094 3.386 2.609 4.449 4.422l.031.058c1.04 1.769 1.654 3.896 1.654 6.166 0 5.406-3.483 10-8.327 11.658l-.087.026c-.063.02-.135.031-.209.031-.162 0-.312-.054-.433-.144l.002.001c-.128-.115-.208-.281-.208-.466 0-.005 0-.01 0-.014v.001q0-.048.008-1.226t.008-2.154c.007-.075.011-.161.011-.249 0-.792-.323-1.508-.844-2.025.618-.061 1.176-.163 1.718-.305l-.076.017c.573-.16 1.073-.373 1.537-.642l-.031.017c.508-.28.938-.636 1.292-1.058l.006-.007c.372-.476.663-1.036.84-1.645l.009-.035c.209-.683.329-1.468.329-2.281 0-.045 0-.091-.001-.136v.007c0-.022.001-.047.001-.072 0-1.248-.482-2.383-1.269-3.23l.003.003c.168-.44.265-.948.265-1.479 0-.649-.145-1.263-.404-1.814l.011.026c-.115-.022-.246-.035-.381-.035-.334 0-.649.078-.929.216l.012-.005c-.568.21-1.054.448-1.512.726l.038-.022-.609.384c-.922-.264-1.981-.416-3.075-.416s-2.153.152-3.157.436l.081-.02q-.256-.176-.681-.433c-.373-.214-.814-.421-1.272-.595l-.066-.022c-.293-.154-.64-.244-1.009-.244-.124 0-.246.01-.364.03l.013-.002c-.248.524-.393 1.139-.393 1.788 0 .531.097 1.04.275 1.509l-.01-.029c-.785.844-1.266 1.979-1.266 3.227 0 .025 0 .051.001.076v-.004c-.001.039-.001.084-.001.13 0 .809.12 1.591.344 2.327l-.015-.057c.189.643.476 1.202.85 1.693l-.009-.013c.354.435.782.793 1.267 1.062l.022.011c.432.252.933.465 1.46.614l.046.011c.466.125 1.024.227 1.595.284l.046.004c-.431.428-.718 1 0.784 1.638l-.001.012c-.207.101-.448.183-.699.236l-.021.004c-.256.051-.549.08-.85.08-.022 0-.044 0-.066 0h.003c-.394-.008-.756-.136-1.055-.348l.006.004c-.371-.259-.671-.595-.881-.986l-.007-.015c-.198-.336-.459-.614-.768-.827l-.009-.006c-.225-.169-.49-.301-.776-.38l-.016-.004-.32-.048c-.023-.002-.05-.003-.077-.003-.14 0-.273.028-.394.077l.007-.003q-.128.072-.08.184c.039.086.087.16.145.225l-.001-.001c.061.072.13.135.205.19l.003.002.112.08c.283.148.516.354.693.603l.004.006c.191.237.359.505.494.792l.01.024.16.368c.135.402.38.738.7.981l.005.004c.3.234.662.402 1.057.478l.016.002c.33.064.714.104 1.106.112h.007c.045.002.097.002.15.002.261 0 .517-.021.767-.062l-.027.004.368-.064q0 .609.008 1.418t.008.873v.014c0 .185-.08.351-.208.466h-.001c-.119.089-.268.143-.431.143-.075 0-.147-.011-.214-.032l.005.001c-4.929-1.689-8.409-6.283-8.409-11.69 0-2.268.612-4.393 1.681-6.219l-.032.058c1.094-1.871 2.609-3.386 4.422-4.449l.058-.031c1.739-1.034 3.835-1.645 6.073-1.645h.098-.005z" />
  </svg>
);

const Linkedin = (
  <svg
    width="24"
    height="24"
    viewBox="-143 145 512 512"
    fill="#FFFFFF"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M113,145c-141.4,0-256,114.6-256,256s114.6,256,256,256s256-114.6,256-256S254.4,145,113,145z M41.4,508.1H-8.5V348.4h49.9V508.1z M15.1,328.4h-0.4c-18.1,0-29.8-12.2-29.8-27.7c0-15.8,12.1-27.7,30.5-27.7c18.4,0,29.7,11.9,30.1,27.7C45.6,316.1,33.9,328.4,15.1,328.4z M241,508.1h-56.6v-82.6c0-21.6-8.8-36.4-28.3-36.4c-14.9,0-23.2,10-27,19.6c-1.4,3.4-1.2,8.2-1.2,13.1v86.3H71.8c0,0,0.7-146.4,0-159.7h56.1v25.1c3.3-11,21.2-26.6,49.8-26.6c35.5,0,63.3,23,63.3,72.4V508.1z" />
  </svg>
);
export default function Footer() {
  const currentYear = new Date().getFullYear();
  const footerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".footer-reveal", {
        y: 40,
        opacity: 0,
        stagger: 0.15,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse"
        }
      });
    }, footerRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer id="contact" ref={footerRef} className="bg-coal pt-32 pb-12 px-6 md:px-12 border-t border-white/5 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start gap-16 mb-32">
          <div className="md:w-2/3 footer-reveal">
            <h2 className="text-[clamp(2.5rem,8vw,6rem)] min-w-1/2 font-display uppercase leading-none tracking-tighter mb-8 font-semibold">
              Forge the<br />
              <span className="fiery-gradient font-extrabold">Next Frontier&nbsp;</span>
            </h2>
            <a
              href="mailto:harimanoharancs@gmail.com"
              className="group flex items-center gap-6 text-[clamp(1.2rem,4vw,2.5rem)] font-display font-light hover:text-flame transition-colors"
            >
              harimanoharancs@gmail.com
              <ArrowUpRight className="w-8 h-8 md:w-12 md:h-12 transition-transform duration-500 group-hover:translate-x-2 group-hover:-translate-y-2 text-flame" />
            </a>
          </div>

          <div className="flex flex-col gap-8 text-right self-end md:self-auto footer-reveal">
            <div className="space-y-2">
              <p className="text-white/50 uppercase tracking-[0.25em] text-[10px] font-sans font-semibold">Location</p>
              <p className="text-xl">Tiruchirappalli, India</p>
            </div>
            <div className="space-y-4">
              <p className="text-white/50 uppercase tracking-[0.25em] text-[10px] font-sans font-semibold">Synchronize</p>
              <div className="flex gap-6 justify-end">
                {[{icon: Github, link: "https://github.com/LinuxHari"}, {icon: Linkedin, link: "https://www.linkedin.com/in/hariharan-manohar/"}].map((Icon, i) => (
                  <a
                    key={i}
                    href={Icon.link}
                    target="_blank"
                    className="text-white/60 hover:text-flame hover:scale-125 transition-all duration-300"
                  >
                     {Icon.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center gap-8 pt-12 border-t border-white/5 footer-reveal">
          <div className="flex items-center gap-2">
            <span className="text-sm font-mono text-white/40">© {currentYear} Hariharan Manohar</span>
            {/* <span className="w-1 h-1 bg-flame rounded-full" />
            <span className="text-sm font-mono text-white/40">Built for the Future</span> */}
          </div>

          <div className="flex gap-8 text-[10px] uppercase tracking-[0.15em] text-white/50 font-sans font-medium">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Term of Use</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

import React from "react";

const Logo = ({ logoRef }: { logoRef: React.RefObject<HTMLDivElement | null> }) => {
    return (
        <div
          ref={logoRef}
          className="flex items-center gap-2 group"
        >
          <span className="font-display font-extrabold text-3xl uppercase tracking-tighter">
            ஹரி<span className="text-flame">.</span>
          </span>
        </div>
    );
};

export default Logo;
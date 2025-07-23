// src/components/Loader.jsx
import { useEffect, useRef } from "react";
import gsap from "gsap";

const Loader = ({ onComplete }) => {
  const loaderRef = useRef();

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        // wait a second, then call onComplete
        setTimeout(onComplete, 500);
      },
    });

    tl.to(loaderRef.current, {
      opacity: 1,
      duration: 0.5,
    })
      .to(".loader-bar", {
        width: "100%",
        duration: 2,
        ease: "power2.inOut",
      })
      .to(loaderRef.current, {
        opacity: 0,
        duration: 0.5,
        pointerEvents: "none",
      });

  }, [onComplete]);

  return (
    <div
      ref={loaderRef}
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-purple-700 text-white opacity-0 transition-all duration-700"
    >
      <div className="text-center space-y-4">
        <div className="text-xl font-semibold">Loading your experience...</div>
        <div className="w-64 h-2 bg-white/20 rounded overflow-hidden">
          <div className="loader-bar h-full bg-white transition-all duration-500 ease-in-out" />
        </div>
      </div>
    </div>
  );
};

export default Loader;

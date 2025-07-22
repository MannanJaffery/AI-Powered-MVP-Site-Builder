import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";



export const animate_main_heading = (element) =>{
gsap.fromTo(
    element,
    {opacity:1,y:0 , filter: "blur(0px)"},
    {opacity:0,
    y:-10,
    filter: "blur(4px)",
    duration:2,
    ease:"power1.inOut"}
)
}


export const animateImageEntrance = (imageRef) => {
  gsap.fromTo(
    imageRef.current,
    { y: -50, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      duration: 1.2,
      ease: "power3.out",

      onComplete: () => {
        gsap.to(imageRef.current, {
          y: "+=5",
          duration: 1,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      },

    }
  );
};


// export const animate_badges = () => {
//   const badges = document.querySelectorAll(".badge-highlight");

//   badges.forEach((badge) => {
//     const bgColor = getComputedStyle(badge).backgroundColor;
//     badge.style.overflow = "hidden";

//     const highlight = document.createElement("div");
//     highlight.style.position = "absolute";
//     highlight.style.top = "-50%";
//     highlight.style.left = "-50%";
//     highlight.style.width = "20%";
//     highlight.style.height = "20%"; // thinner highlight
//     highlight.style.background = bgColor;
//     highlight.style.opacity = "0.1"; // more subtle
//     highlight.style.transform = "rotate(45deg)";
//     highlight.style.pointerEvents = "none";

//     badge.style.position = "relative";
//     badge.appendChild(highlight);

//     gsap.to(highlight, {
//       top: "150%",
//       left: "150%",
//       duration: 6, // slower animation
//       repeat: -1,
//       ease: "linear"
//     });
//   });
// };


gsap.registerPlugin(ScrollTrigger);



export const animate_scroll_section1 = (targetSelector) => {
  gsap.utils.toArray(targetSelector).forEach((el) => {
    gsap.fromTo(
      el,
      { opacity: 0, y: 100 },
      {
        opacity: 1,
        y: 0,
        duration: 1.5,
        ease: "power3.out",
        scrollTrigger: {
          trigger: el,
          start: "top 80%",
          end: "top 20%",
          toggleActions: "play none none reverse",
          markers: false,
        },
      }
    );
  });
};


export const animate_scroll_section2 = (targetSelector)=>{
      gsap.fromTo(
    targetSelector,
    { opacity: 0, x: 100 },
    {
      opacity: 1,
      x: 0,
      duration: 3,
      ease: "power3.out",
      scrollTrigger: {
        trigger: targetSelector,
        start: "top 80%",
        end: "top 20%",
        toggleActions: "play none none reverse",
        markers: false,
      },
    }
  );
}

export const animate_scroll_section3 = (targetSelector)=>{
      gsap.fromTo(
    targetSelector,
    { opacity: 0, x: -100 },
    {
      opacity: 1,
      x: 0,
      duration: 3,
      ease: "power3.out",
      scrollTrigger: {
        trigger: targetSelector,
        start: "top 80%",
        end: "top 20%",
        toggleActions: "play none none reverse",
        markers: false,
      },
    }
  );
}
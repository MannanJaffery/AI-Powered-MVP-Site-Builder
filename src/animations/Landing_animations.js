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




gsap.registerPlugin(ScrollTrigger);

const scrollContainer = document.querySelector('#main');
const useWindow = !scrollContainer || scrollContainer === document.documentElement;

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
            scroller: useWindow ? undefined : scrollContainer,
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
  scroller: useWindow ? undefined : scrollContainer,
        start: "top 80%",
        end: "top 20%",
        toggleActions: "play none none reverse",
        markers: false,
      },
    }
  );
}


export const animate_scroll_section3 = (targetSelector) => {
  gsap.utils.toArray(targetSelector).forEach((el) => {
    gsap.fromTo(
      el,
      { opacity: 0, x: -100 },
      {
        opacity: 1,
        x: 0,
        duration: 3,
        ease: "power3.out",
        scrollTrigger: {
          trigger: el,
           scroller: useWindow ? undefined : scrollContainer,
          start: "top 80%",
          end: "top 20%",
          toggleActions: "play none none reverse",
          markers: false,
        },
      }
    );
  });
};






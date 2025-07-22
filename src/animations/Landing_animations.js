import gsap from "gsap";



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
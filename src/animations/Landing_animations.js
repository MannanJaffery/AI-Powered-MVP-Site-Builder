import gsap from "gsap";



export const animate_main_heading = (element) =>{
gsap.fromTo(
    element,
    {opacity:1,y:0 , filter: "blur(0px)"},
    {opacity:0,
    y:-20,
    filter: "blur(4px)",
    duration:2,
    ease:"power1.inOut"}
)
}
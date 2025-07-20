import gsap from "gsap";

export const initLineStreamAnimation = ()=> {
  const lines = document.querySelectorAll(".line");

  lines.forEach((line, i) => {
    const glow = document.createElement("div");
    glow.className = "absolute top-0 w-[1px] h-[100px] bg-blue-500 blur-sm opacity-0";
    line.appendChild(glow);

    gsap.to(glow, {
      y: "100vh",
      repeat: -1,
      delay: i * 0.2,
      duration: 2,
      opacity: 1,
      ease: "none"
    });
  });
}

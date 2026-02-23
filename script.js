// Scroll reveal
const reveals = document.querySelectorAll(".reveal");
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) e.target.classList.add("visible");
    });
  },
  { threshold: 0.1 },
);
reveals.forEach((el) => observer.observe(el));

// Skill bar animation
const skillBars = document.querySelectorAll(".skill-bar");
const barObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add("animate");
        const w = e.target.style.getPropertyValue("--w");
        e.target.style.transform = `scaleX(${w})`;
      }
    });
  },
  { threshold: 0.5 },
);
skillBars.forEach((bar) => barObserver.observe(bar));

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach((a) => {
  a.addEventListener("click", (e) => {
    e.preventDefault();
    const target = document.querySelector(a.getAttribute("href"));
    if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
  });
});

// Random matrix rain in background (subtle)
const canvas = document.createElement("canvas");
canvas.style.cssText =
  "position:fixed;top:0;left:0;pointer-events:none;z-index:0;opacity:0.025;";
document.body.prepend(canvas);
const ctx = canvas.getContext("2d");
function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

const fontSize = 14;
let cols = Math.floor(canvas.width / fontSize);
let drops = Array(cols).fill(1);

function drawMatrix() {
  ctx.fillStyle = "rgba(5,10,6,0.05)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "#00ff88";
  ctx.font = `${fontSize}px monospace`;
  drops.forEach((y, i) => {
    const char = String.fromCharCode(0x30a0 + Math.random() * 96);
    ctx.fillText(char, i * fontSize, y * fontSize);
    if (y * fontSize > canvas.height && Math.random() > 0.975) drops[i] = 0;
    drops[i]++;
  });
}
setInterval(drawMatrix, 80);

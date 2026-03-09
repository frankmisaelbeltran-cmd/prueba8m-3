const revealItems = document.querySelectorAll(".reveal");
const root = document.documentElement;
const petalsContainer = document.querySelector(".petals");

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      entry.target.classList.toggle("is-visible", entry.isIntersecting);
    });
  },
  {
    threshold: 0.28,
    rootMargin: "0px 0px -8% 0px",
  }
);

revealItems.forEach((item) => {
  revealObserver.observe(item);
});

function updateBackgroundGlow() {
  const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
  const progress = scrollableHeight > 0 ? window.scrollY / scrollableHeight : 0;
  const alpha = Math.min(0.3, progress * 0.35);

  root.style.setProperty("--bg-glow", `rgba(255, 210, 225, ${alpha.toFixed(3)})`);
}

updateBackgroundGlow();
window.addEventListener("scroll", updateBackgroundGlow, { passive: true });
window.addEventListener("resize", updateBackgroundGlow);

function createPetals() {
  if (!petalsContainer) {
    return;
  }

  const petalCount = window.innerWidth < 640 ? 16 : 26;

  petalsContainer.innerHTML = "";

  for (let index = 0; index < petalCount; index += 1) {
    const petal = document.createElement("span");
    const size = 5 + Math.random() * 11;
    const opacity = 0.08 + Math.random() * 0.16;
    const brightness = 235 + Math.floor(Math.random() * 20);
    const duration = 14 + Math.random() * 16;
    const swayDuration = 3 + Math.random() * 4;
    const delay = -Math.random() * duration;
    const drift = `${-40 + Math.random() * 80}px`;
    const rotate = `${Math.random() * 360}deg`;

    petal.className = "petal";
    petal.style.left = `${Math.random() * 100}%`;
    petal.style.setProperty("--petal-size", `${size.toFixed(1)}px`);
    petal.style.setProperty("--petal-opacity", opacity.toFixed(3));
    petal.style.setProperty("--petal-color", `rgba(${brightness}, ${brightness}, ${brightness}, 0.65)`);
    petal.style.setProperty("--petal-duration", `${duration.toFixed(2)}s`);
    petal.style.setProperty("--petal-sway-duration", `${swayDuration.toFixed(2)}s`);
    petal.style.setProperty("--petal-delay", `${delay.toFixed(2)}s`);
    petal.style.setProperty("--petal-drift", drift);
    petal.style.setProperty("--petal-rotate", rotate);

    petalsContainer.appendChild(petal);
  }
}

createPetals();
window.addEventListener("resize", createPetals);

const heroVideo = document.querySelector(".hero-media video");

if (heroVideo) {
  const showVideo = () => heroVideo.closest(".hero-media")?.classList.add("loaded");

  if (heroVideo.readyState >= 2) {
    showVideo();
  } else {
    heroVideo.addEventListener("canplay", showVideo, { once: true });
  }
}

const revealItems = document.querySelectorAll(".reveal");
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (reduceMotion || !("IntersectionObserver" in window)) {
  revealItems.forEach((item) => item.classList.add("visible"));
} else {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.12 }
  );

  revealItems.forEach((item, index) => {
    item.style.setProperty("--reveal-delay", `${Math.min(index * 70, 420)}ms`);
    observer.observe(item);
  });
}

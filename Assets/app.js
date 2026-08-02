const cursor = document.getElementById("cursor");
const hoverElements = document.querySelectorAll(
  ".cursor-hover, a, button, input, textarea",
);

document.addEventListener("mousemove", (e) => {
  cursor.style.left = e.clientX + "px";
  cursor.style.top = e.clientY + "px";
  cursor.style.transform = `translate(-50%, -50%)`;
});

hoverElements.forEach((el) => {
  el.addEventListener("mouseenter", () => {
    cursor.style.width = "50px";
    cursor.style.height = "50px";
    cursor.style.backgroundColor = "rgba(251, 255, 72, 0.4)";
    cursor.style.border = "2px solid black";
  });
  el.addEventListener("mouseleave", () => {
    cursor.style.width = "24px";
    cursor.style.height = "24px";
    cursor.style.backgroundColor = "rgba(251, 255, 72, 0.7)";
    cursor.style.border = "2px solid black";
  });
});

const revealElements = document.querySelectorAll(".reveal");
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
      }
    });
  },
  { threshold: 0.1 },
);

revealElements.forEach((el) => revealObserver.observe(el));

window.addEventListener("scroll", () => {
  let winScroll = window.pageYOffset || document.documentElement.scrollTop;
  let height =
    document.documentElement.scrollHeight -
    document.documentElement.clientHeight;
  let scrolled = height > 0 ? (winScroll / height) * 100 : 0;
  document.getElementById("progressBar").style.width = scrolled + "%";
});

const lazyImages = document.querySelectorAll(".lazy-img");
const lazyImageObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const img = entry.target;
      const targetSrc = img.dataset.src;
      observer.unobserve(img);
      if (!targetSrc) return;

      const fallbackId = img.dataset.fallback;
      const revealFallback = () => {
        img.style.display = "none";
        if (fallbackId) {
          const fallbackEl = document.getElementById(fallbackId);
          if (fallbackEl) fallbackEl.style.display = "block";
        }
      };

      const failTimer = setTimeout(revealFallback, 8000);
      img.addEventListener("load", () => clearTimeout(failTimer), {
        once: true,
      });
      img.addEventListener("error", () => clearTimeout(failTimer), {
        once: true,
      });
      img.src = targetSrc;
    });
  },
  { rootMargin: "300px 0px" },
);

lazyImages.forEach((img) => lazyImageObserver.observe(img));

const preloader = document.getElementById("preloader");
const preloaderPercent = document.getElementById("preloaderPercent");
const preloaderBar = document.getElementById("preloaderBar");
const cyberText = document.getElementById("cyberText");
const heroRevealElements = document.querySelectorAll(
  ".hero-reveal, .hero-reveal-top",
);

document.documentElement.classList.add("is-loading");

const terminalLogs = [
  "INITIALIZING CORE...",
  "LOADING BRUTALIST UI...",
  "CONNECTING REACT NODES...",
  "EXECUTING PYTHON SCRIPTS...",
  "STYLING TAILWIND MATRIX...",
  "LAUNCHING PORTFOLIO...",
];

const minLoaderDuration = 3200;
const loaderStartTime = performance.now();
let pageHasLoaded = false;

window.addEventListener("load", () => {
  pageHasLoaded = true;
});

setTimeout(() => {
  pageHasLoaded = true;
}, minLoaderDuration + 1500);

function finishPreloader() {
  document.documentElement.classList.remove("is-loading");
  document.documentElement.classList.add("is-loaded");

  if (preloader) preloader.classList.add("preloader-exit");

  heroRevealElements.forEach((el, index) => {
    setTimeout(
      () => {
        el.classList.add("active");
      },
      350 + index * 100,
    );
  });

  setTimeout(() => {
    if (preloader) preloader.style.display = "none";
  }, 1300);
}

function tickPreloader() {
  const elapsed = performance.now() - loaderStartTime;
  const timeProgress = Math.min(100, (elapsed / minLoaderDuration) * 100);
  const readyToFinish = pageHasLoaded && elapsed >= minLoaderDuration;
  const shown = readyToFinish ? 100 : Math.min(99, Math.floor(timeProgress));

  if (preloaderPercent) {
    preloaderPercent.textContent = String(shown).padStart(2, "0") + "%";
  }
  if (preloaderBar) {
    preloaderBar.style.width = shown + "%";
  }

  if (cyberText) {
    const logIndex = Math.min(
      terminalLogs.length - 1,
      Math.floor((shown / 100) * terminalLogs.length),
    );
    cyberText.textContent = terminalLogs[logIndex];
  }

  if (shown >= 100) {
    finishPreloader();
    return;
  }

  requestAnimationFrame(tickPreloader);
}

requestAnimationFrame(tickPreloader);

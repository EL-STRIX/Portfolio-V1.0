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

/*Talk To My Stack — Interactive Terminal*/
(function () {
  const STACK_COMMANDS = {
    whoami: {
      icon: "ri-user-line",
      output:
        "Sujay Paul — Frontend Developer specializing in modern, responsive, and production-ready web applications with clean architecture and intuitive user experiences.",
    },

    about: {
      icon: "ri-information-line",
      output:
        "Frontend Developer with full-stack knowledge, passionate about building scalable software, learning modern technologies, and delivering high-quality digital products.",
    },

    skills: {
      icon: "ri-code-s-slash-line",
      output:
        "HTML5 • CSS3 • JavaScript • React • PHP • Node.js • Express.js • MySQL • MongoDB • Git • GitHub • GitHub Actions • Vercel",
    },

    experience: {
      icon: "ri-briefcase-line",
      output:
        "Frontend Developer Intern @ Gemeonix Esports & Gaming (Mar 2026 – Jul 2026). Worked on responsive interfaces, reusable components, and modern frontend development workflows.",
    },

    education: {
      icon: "ri-graduation-cap-line",
      output:
        "Bachelor of Computer Applications (BCA). Continuously expanding expertise in frontend engineering, backend development, software architecture, and problem solving.",
    },

    github: {
      icon: "ri-github-fill",
      output:
        "GitHub: https://github.com/EL-STRIX — Production-ready projects, clean documentation, CI/CD workflows, and continuous improvements.",
    },

    resume: {
      icon: "ri-file-paper-2-line",
      output:
        "Seeking Frontend Developer, Full-Stack Developer Internship, and Software Engineering opportunities.",
    },

    contact: {
      icon: "ri-mail-line",
      output:
        "Email: sujaypaul892@gmail.com | West Bengal, India | Available for Internship, Freelance, and Collaboration.",
    },

    focus: {
      icon: "ri-focus-3-line",
      output:
        "Currently developing Personal Projects and open-source projects while strengthening expertise in frontend engineering, backend development, and software architecture.",
    },

    philosophy: {
      icon: "ri-terminal-box-line",
      output:
        "Write clean code. Build scalable software. Focus on performance, maintainability, accessibility, and user experience.",
    },

    status: {
      icon: "ri-pulse-line",
      output:
        "Status: Building Projects • Learning Daily • Available for New Opportunities.",
    },
    
    cls: {
      icon: "ri-delete-bin-line",
      output: "",
    },
  };

  const WELCOME = [];

  const historyEl = document.getElementById("stackHistory");
  const bodyEl = document.getElementById("stackTerminalBody");
  const inputEl = document.getElementById("stackInput");
  const panelEl = document.getElementById("stackTerminal");
  const listEl = document.getElementById("stackCommandList");

  if (!historyEl || !bodyEl || !inputEl || !panelEl || !listEl) return;

  let history = WELCOME.slice();
  let cmdHistory = [];
  let cmdIndex = -1;

  function escapeHtml(str) {
    const div = document.createElement("div");
    div.textContent = str;
    return div.innerHTML;
  }

  function renderHistory() {

    if (history.length === 0) {
      historyEl.innerHTML = "";
      bodyEl.scrollTop = bodyEl.scrollHeight;
      return;
    }

    historyEl.innerHTML = history
      .map(function (line) {

        if (line.type === "input") {
          return (
            '<div class="stack-line-input">' +
            '<span class="text-[#33FF57] font-bold">sujay@portfolio</span>' +
            '<span class="text-white/40 font-bold">~/stack $</span>' +
            '<span class="text-white font-bold">' +
            escapeHtml(line.content) +
            "</span>" +
            "</div>"
          );
        }

        const cls =
          line.type === "error"
            ? "stack-line-error"
            : line.type === "system"
              ? "stack-line-system"
              : "stack-line-output";

        return '<div class="' + cls + '">' + escapeHtml(line.content) + "</div>";

      })
      .join("");

    bodyEl.scrollTop = bodyEl.scrollHeight;
  }

  function renderCommandList() {
    listEl.innerHTML = Object.keys(STACK_COMMANDS)
      .map(function (cmd) {
        return (
          '<button type="button" class="stack-cmd-btn cursor-hover" data-cmd="' + cmd + '">' +
          '<i class="' + STACK_COMMANDS[cmd].icon + '"></i>' +
          "<span>" + cmd + "</span>" +
          '<i class="ri-arrow-right-s-line stack-chevron"></i>' +
          "</button>"
        );
      })
      .join("");

    listEl.querySelectorAll(".stack-cmd-btn").forEach(function (btn) {
      btn.addEventListener("click", function (e) {
        e.stopPropagation();
        runCommand(btn.dataset.cmd);
      });
    });
  }

  function runCommand(raw) {
    const cmd = raw.trim().toLowerCase();
    if (!cmd) return;

    if (cmd === "clear" || cmd === "cls") {
      history = WELCOME.slice();
      cmdHistory = [cmd].concat(cmdHistory.filter(function (c) { return c !== cmd; })).slice(0, 20);
      cmdIndex = -1;
      inputEl.value = "";
      renderHistory();
      return;
    }

    history.push({ type: "input", content: cmd });

    if (cmd === "help") {
      history.push({
        type: "system",
        content: "Available commands: " + Object.keys(STACK_COMMANDS).join(", ") + ", help, clear",
      });
    } else if (STACK_COMMANDS[cmd]) {
      history.push({ type: "output", content: STACK_COMMANDS[cmd].output });
    } else {
      history.push({
        type: "error",
        content: 'Command not found: ' + cmd + '. Type "help" for a list of commands.',
      });
    }

    cmdHistory = [cmd].concat(cmdHistory.filter(function (c) { return c !== cmd; })).slice(0, 20);
    cmdIndex = -1;
    inputEl.value = "";
    renderHistory();
  }

  inputEl.addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
      runCommand(inputEl.value);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (cmdIndex < cmdHistory.length - 1) {
        cmdIndex++;
        inputEl.value = cmdHistory[cmdIndex];
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (cmdIndex > 0) {
        cmdIndex--;
        inputEl.value = cmdHistory[cmdIndex];
      } else if (cmdIndex === 0) {
        cmdIndex = -1;
        inputEl.value = "";
      }
    }
  });

  panelEl.addEventListener("click", function () {
    inputEl.focus();
  });

  var stackHovered = false;
  bodyEl.addEventListener("mouseenter", function () { stackHovered = true; });
  bodyEl.addEventListener("mouseleave", function () { stackHovered = false; });
  window.addEventListener(
    "wheel",
    function (e) {
      if (stackHovered) {
        e.preventDefault();
        bodyEl.scrollTop += e.deltaY;
      }
    },
    { passive: false }
  );

  renderHistory();
  renderCommandList();

})();
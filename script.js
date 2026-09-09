const menuToggle = document.querySelector(".menu-toggle");
const nav = document.querySelector(".nav");
const stagePanel = document.querySelector("[data-stage-panel]");
const timelineItems = document.querySelectorAll(".timeline-item");
const filters = document.querySelectorAll(".filter");
const portfolioCards = document.querySelectorAll(".portfolio-card");
const cursorLight = document.querySelector(".cursor-light");
const navLinks = document.querySelectorAll(".nav a");
const sections = document.querySelectorAll("main section[id]");
const signalNodes = document.querySelectorAll(".node");
const signalReadout = document.querySelector("[data-signal-readout]");

const stageCopy = {
  first:
    "We use the first meeting to understand the founder's insight, the market transition, and why the opportunity may be mispriced or overlooked.",
  second:
    "We pressure-test the wedge, distribution path, customer urgency, and evidence that the company can compound beyond its initial market.",
  third:
    "We align on conviction, ownership, support needs, and the specific ways Radix can help the company reach its next proof point.",
  investing:
    "After investing, we support founders through targeted introductions, capital strategy, follow-on readiness, and ongoing pattern recognition."
};

const signalCopy = {
  founder: {
    title: "Founder Insight",
    body: "We look for founders with a non-obvious view of the customer, market timing, or distribution path."
  },
  market: {
    title: "Market Pull",
    body: "We look for urgency: customers moving, budgets opening, regulation shifting, or behavior changing before consensus forms."
  },
  distribution: {
    title: "Distribution",
    body: "We pay attention to founders who have direct access to communities, buyers, or niche markets others struggle to reach."
  },
  execution: {
    title: "Execution",
    body: "We want evidence that the team can learn quickly, ship through uncertainty, and turn small proof points into compounding advantage."
  },
  expansion: {
    title: "Expansion",
    body: "We underwrite the wedge and the path beyond it: where the company can go if the first market works."
  }
};

menuToggle?.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
});

nav?.addEventListener("click", (event) => {
  if (event.target instanceof HTMLAnchorElement) {
    nav.classList.remove("open");
    menuToggle?.setAttribute("aria-expanded", "false");
  }
});

timelineItems.forEach((item) => {
  item.addEventListener("click", () => {
    timelineItems.forEach((stage) => stage.classList.remove("active"));
    item.classList.add("active");
    stagePanel.textContent = stageCopy[item.dataset.stage] || stageCopy.first;
  });
});

signalNodes.forEach((node) => {
  const updateSignal = () => {
    const selected = node.dataset.signal;
    const copy = signalCopy[selected] || signalCopy.founder;
    signalNodes.forEach((item) => item.classList.remove("active"));
    node.classList.add("active");
    if (signalReadout) {
      signalReadout.innerHTML = `<span>${copy.title}</span><p>${copy.body}</p>`;
    }
  };

  node.addEventListener("mouseenter", updateSignal);
  node.addEventListener("focus", updateSignal);
  node.addEventListener("click", updateSignal);
});

filters.forEach((filter) => {
  filter.addEventListener("click", () => {
    const selected = filter.dataset.filter;
    filters.forEach((button) => button.classList.remove("active"));
    filter.classList.add("active");

    portfolioCards.forEach((card) => {
      const shouldShow = selected === "all" || card.dataset.category === selected;
      card.classList.toggle("hidden", !shouldShow);
    });
  });
});

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);

document.querySelectorAll(".reveal").forEach((element) => observer.observe(element));

window.addEventListener("pointermove", (event) => {
  document.body.classList.add("pointer-active");
  if (cursorLight) {
    cursorLight.style.left = `${event.clientX}px`;
    cursorLight.style.top = `${event.clientY}px`;
  }
});

window.addEventListener("pointerleave", () => {
  document.body.classList.remove("pointer-active");
});

const navObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      navLinks.forEach((link) => {
        link.classList.toggle("active", link.getAttribute("href") === `#${entry.target.id}`);
      });
    });
  },
  { rootMargin: "-45% 0px -45% 0px", threshold: 0.01 }
);

sections.forEach((section) => navObserver.observe(section));

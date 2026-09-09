const menuToggle = document.querySelector(".menu-toggle");
const nav = document.querySelector(".nav");
const stagePanel = document.querySelector("[data-stage-panel]");
const timelineItems = document.querySelectorAll(".timeline-item");
const filters = document.querySelectorAll(".filter");
const portfolioCards = document.querySelectorAll(".portfolio-card");

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

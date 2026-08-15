const nav = document.querySelector(".nav");
const toggle = document.querySelector(".nav-toggle");
const links = [...document.querySelectorAll(".nav-link[href]")];
const contactLink = document.querySelector(".nav-contact");
const sections = [...document.querySelectorAll("section[id]")];
const mark = document.querySelector(".nav-mark");
const popover = document.querySelector("#contact-popover");
const closePopover = document.querySelector(".contact-popover-close");

const setContactOpen = (open) => {
  nav.classList.toggle("is-contact-open", open);
  mark.setAttribute("aria-expanded", String(open));
  contactLink.setAttribute("aria-expanded", String(open));
};

const toggleContact = (event) => {
  event.stopPropagation();
  const willOpen = !nav.classList.contains("is-contact-open");
  if (willOpen) {
    nav.classList.remove("is-open");
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-label", "Open menu");
  }
  setContactOpen(willOpen);
};

mark.addEventListener("click", toggleContact);
contactLink.addEventListener("click", toggleContact);

closePopover.addEventListener("click", (event) => {
  event.stopPropagation();
  setContactOpen(false);
});

document.addEventListener("click", (event) => {
  if (!nav.classList.contains("is-contact-open")) return;
  if (
    mark.contains(event.target) ||
    popover.contains(event.target) ||
    contactLink.contains(event.target)
  ) {
    return;
  }
  setContactOpen(false);
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") setContactOpen(false);
});

toggle.addEventListener("click", () => {
  const open = nav.classList.toggle("is-open");
  toggle.setAttribute("aria-expanded", String(open));
  toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  if (open) setContactOpen(false);
});

links.forEach((link) => {
  link.addEventListener("click", () => {
    nav.classList.remove("is-open");
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-label", "Open menu");
    setContactOpen(false);
  });
});

const setActive = (id) => {
  if (nav.classList.contains("is-contact-open")) return;
  links.forEach((link) => {
    link.classList.toggle("is-active", link.getAttribute("href") === `#${id}`);
  });
};

const updateActiveSection = () => {
  if (!sections.length) return;

  if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 12) {
    setActive(sections[sections.length - 1].id);
    return;
  }

  const spyLine = Math.min(140, window.innerHeight * 0.28);
  let current = sections[0].id;
  for (const section of sections) {
    if (section.getBoundingClientRect().top <= spyLine) {
      current = section.id;
    }
  }
  setActive(current);
};

const gear = document.querySelector(".project-gear");
const gearColumn = document.querySelector(".project-pin");
const gearGroup = document.querySelector(".project-sticky-group");
const projectList = document.querySelector(".project-list");
const projectScroller = document.querySelector(".project-scroller");
const projectProgress = document.querySelector(".project-progress");
const projectProgressFill = document.querySelector(".project-progress-fill");
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

if (gearColumn && projectList) {
  const projectCount = Math.max(1, projectList.children.length);
  gearColumn.style.setProperty("--project-extra", String(projectCount - 1));
  gearColumn.style.setProperty("--project-count", String(projectCount));
}

const updateProjectsScroll = () => {
  if (!gearColumn || !gearGroup || !projectList || !projectScroller) return;

  const travel = gearColumn.offsetHeight - gearGroup.offsetHeight;
  const progress =
    travel <= 0
      ? 0
      : Math.min(
          1,
          Math.max(0, (gearGroup.getBoundingClientRect().top - gearColumn.getBoundingClientRect().top) / travel)
        );

  if (gear && !reduceMotion.matches) {
    gear.style.transform = `rotate(${progress * 360}deg)`;
  }

  const overflow = projectList.scrollHeight - projectScroller.clientHeight;
  projectList.style.transform = `translateY(${-progress * Math.max(0, overflow)}px)`;

  const projectCount = projectList.children.length;
  const viewed = projectCount <= 1 ? 1 : 1 + progress * (projectCount - 1);
  if (projectProgressFill) {
    projectProgressFill.style.transform = `translateY(${progress * Math.max(0, projectCount - 1) * 100}%)`;
  }
  if (projectProgress) {
    projectProgress.setAttribute("aria-valuenow", String(Math.round(viewed)));
    projectProgress.setAttribute("aria-valuemax", String(projectCount));
  }
};

let gearFrame = 0;
const onGearScroll = () => {
  if (gearFrame) return;
  gearFrame = requestAnimationFrame(() => {
    gearFrame = 0;
    updateProjectsScroll();
    updateActiveSection();
  });
};

window.addEventListener("scroll", onGearScroll, { passive: true });
window.addEventListener("resize", () => {
  updateProjectsScroll();
  updateActiveSection();
});
updateProjectsScroll();
updateActiveSection();

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

let spyFrame = 0;
window.addEventListener(
  "scroll",
  () => {
    if (spyFrame) return;
    spyFrame = requestAnimationFrame(() => {
      spyFrame = 0;
      updateActiveSection();
    });
  },
  { passive: true }
);
window.addEventListener("resize", updateActiveSection);
updateActiveSection();

window.addEventListener(
  "wheel",
  (event) => {
    if (event.deltaY >= 0) return;
    if (window.scrollY > 0) return;
    event.preventDefault();
  },
  { passive: false }
);

const expCards = [...document.querySelectorAll(".exp-card")];
const expModal = document.querySelector("#experience-modal");
const expBackdrop = document.querySelector("#experience-modal-backdrop");
const expModalClose = document.querySelector(".exp-modal-close");
const expModalCompany = document.querySelector("#exp-modal-company");
const expModalRole = document.querySelector(".exp-modal-role");
const expModalBody = document.querySelector(".exp-modal-body");

let lastExpTrigger = null;

const openExpModal = (card) => {
  const templateId = card.getAttribute("data-details");
  const template = document.querySelector(`#${templateId}`);
  if (!template) return;

  expModalCompany.textContent = card.querySelector(".exp-company").textContent;
  expModalRole.textContent = card.querySelector(".exp-role").textContent;
  expModalBody.replaceChildren(template.content.cloneNode(true));

  lastExpTrigger = card;
  expModal.classList.add("is-open");
  expBackdrop.classList.add("is-open");
  expModalClose.focus();
};

const closeExpModal = () => {
  expModal.classList.remove("is-open");
  expBackdrop.classList.remove("is-open");
  if (lastExpTrigger) lastExpTrigger.focus();
};

expCards.forEach((card) => {
  card.addEventListener("click", () => openExpModal(card));
});

expModalClose.addEventListener("click", closeExpModal);
expBackdrop.addEventListener("click", closeExpModal);

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && expModal.classList.contains("is-open")) {
    closeExpModal();
  }
});

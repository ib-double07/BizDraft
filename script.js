/* ============================================================
   IBRAHIM SALIHU — PORTFOLIO SCRIPTS
   ------------------------------------------------------------
   1. Navbar (scroll style, mobile menu, active link)
   2. Scroll reveal animations (IntersectionObserver)
   3. Project modal (accessible open/close, focus trap)
   4. Contact form (mailto handler + validation)
   ============================================================ */

(function () {
  "use strict";

  /* ---------- 1. NAVBAR ---------- */

  const navbar = document.getElementById("navbar");
  const navToggle = document.getElementById("navToggle");
  const navLinks = document.getElementById("navLinks");
  const links = navLinks.querySelectorAll(".nav-link");

  // Add blurred background when the page is scrolled
  function onScroll() {
    navbar.classList.toggle("scrolled", window.scrollY > 24);
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  // Mobile menu toggle
  function setMenu(open) {
    navLinks.classList.toggle("open", open);
    navToggle.classList.toggle("open", open);
    navToggle.setAttribute("aria-expanded", String(open));
    navToggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  }

  navToggle.addEventListener("click", function () {
    setMenu(!navLinks.classList.contains("open"));
  });

  // Close menu when a link is clicked
  links.forEach(function (link) {
    link.addEventListener("click", function () {
      setMenu(false);
    });
  });

  // Close menu with Escape key
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && navLinks.classList.contains("open")) {
      setMenu(false);
      navToggle.focus();
    }
  });

  // Close menu when clicking outside of it
  document.addEventListener("click", function (e) {
    if (
      navLinks.classList.contains("open") &&
      !navLinks.contains(e.target) &&
      !navToggle.contains(e.target)
    ) {
      setMenu(false);
    }
  });

  // Highlight the nav link of the section currently in view
  const sections = document.querySelectorAll("section[id]");
  const sectionObserver = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          links.forEach(function (link) {
            link.classList.toggle(
              "active",
              link.getAttribute("href") === "#" + entry.target.id
            );
          });
        }
      });
    },
    { rootMargin: "-40% 0px -55% 0px" }
  );
  sections.forEach(function (section) {
    sectionObserver.observe(section);
  });

  /* ---------- 2. SCROLL REVEAL ---------- */

  const revealEls = document.querySelectorAll(".reveal");
  const revealObserver = new IntersectionObserver(
    function (entries, observer) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target); // animate once, stay fast
        }
      });
    },
    { threshold: 0.12 }
  );
  revealEls.forEach(function (el) {
    revealObserver.observe(el);
  });

  /* ---------- 3. PROJECT MODAL ---------- */

  let lastFocusedElement = null;

  function openModal(modal) {
    if (!modal.hidden) return; // already open (nested trigger clicked)
    lastFocusedElement = document.activeElement;
    modal.hidden = false;
    document.body.classList.add("modal-open");
    const closeBtn = modal.querySelector(".modal-close");
    if (closeBtn) closeBtn.focus();
  }

  function closeModal(modal) {
    modal.hidden = true;
    document.body.classList.remove("modal-open");
    if (lastFocusedElement) lastFocusedElement.focus();
  }

  // Open triggers: elements with a data-modal attribute
  document.querySelectorAll("[data-modal]").forEach(function (trigger) {
    const modal = document.getElementById(trigger.dataset.modal);
    if (!modal) return;

    trigger.addEventListener("click", function (e) {
      // Don't open the modal when a link/button inside the card was clicked
      if (e.target.closest("a[data-stop]")) return;
      e.preventDefault();
      openModal(modal);
    });

    // Keyboard support for card acting as a button
    if (trigger.tagName !== "BUTTON") {
      trigger.addEventListener("keydown", function (e) {
        if ((e.key === "Enter" || e.key === " ") && e.target === trigger) {
          e.preventDefault();
          openModal(modal);
        }
      });
    }
  });

  // Close triggers: backdrop + close button
  document.querySelectorAll(".modal").forEach(function (modal) {
    modal.querySelectorAll("[data-close-modal]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        closeModal(modal);
      });
    });

    // Simple focus trap inside the open modal
    modal.addEventListener("keydown", function (e) {
      if (e.key === "Escape") {
        closeModal(modal);
        return;
      }
      if (e.key !== "Tab") return;

      const focusables = modal.querySelectorAll(
        'button, a[href], input, textarea, [tabindex]:not([tabindex="-1"])'
      );
      if (!focusables.length) return;

      const first = focusables[0];
      const last = focusables[focusables.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    });
  });

  /* ---------- 4. CONTACT FORM (mailto) ----------
     This is a static site, so the form composes an email via the
     visitor's mail client. To use a real service instead:
       • Formspree: set the form action to your Formspree endpoint,
         set method="POST", and delete this handler.
       • Netlify Forms: add data-netlify="true" to the <form>.
  ------------------------------------------------- */

  const form = document.getElementById("contactForm");
  const note = document.getElementById("formNote");

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const message = form.message.value.trim();

    // Basic validation
    if (!name || !email || !message) {
      note.textContent = "Please fill in all fields.";
      note.className = "form-note error";
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      note.textContent = "Please enter a valid email address.";
      note.className = "form-note error";
      return;
    }

    // Build the mailto link (replace YOUR_EMAIL with your address)
    const subject = encodeURIComponent("Portfolio Contact from " + name);
    const body = encodeURIComponent(
      "Name: " + name + "\nEmail: " + email + "\n\n" + message
    );

    window.location.href =
      "mailto:YOUR_EMAIL?subject=" + subject + "&body=" + body;

    note.textContent = "Opening your email app… You can also reach me directly at YOUR_EMAIL.";
    note.className = "form-note success";
    form.reset();
  });
})();

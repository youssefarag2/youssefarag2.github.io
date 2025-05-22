// Initialize AOS Animation Library
document.addEventListener("DOMContentLoaded", function () {
  // Initialize AOS with enhanced animations
  AOS.init({
    duration: 1000,
    easing: "ease-out",
    once: false,
    mirror: true,
    anchorPlacement: "top-bottom",
    delay: 100,
  });

  // Navbar Scroll Effect
  const navbar = document.getElementById("navbar");
  const navLinks = document.querySelectorAll(".nav-links a");
  const sections = document.querySelectorAll("section");
  const backToTopBtn = document.getElementById("backToTop");
  const navToggle = document.querySelector(".nav-toggle");
  const navLinksContainer = document.querySelector(".nav-links");

  // Scroll Event Listener
  window.addEventListener("scroll", function () {
    // Navbar Background Change on Scroll
    if (window.scrollY > 50) {
      navbar.classList.add("scrolled");
      backToTopBtn.classList.add("show");
    } else {
      navbar.classList.remove("scrolled");
      backToTopBtn.classList.remove("show");
    }

    // Active Link on Scroll
    let current = "";
    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (pageYOffset >= sectionTop - sectionHeight / 3) {
        current = section.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href").substring(1) === current) {
        link.classList.add("active");
      }
    });
  });

  // Smooth Scrolling for Navigation Links
  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();

      // Close mobile menu if open
      if (navLinksContainer.classList.contains("active")) {
        navLinksContainer.classList.remove("active");
        navToggle.classList.remove("active");
      }

      const targetId = this.getAttribute("href");
      const targetSection = document.querySelector(targetId);

      window.scrollTo({
        top: targetSection.offsetTop - 70,
        behavior: "smooth",
      });
    });
  });

  // Mobile Menu Toggle
  navToggle.addEventListener("click", function () {
    navLinksContainer.classList.toggle("active");
    this.classList.toggle("active");
  });

  // Back to Top Button
  backToTopBtn.addEventListener("click", function () {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });

  // Enhanced email link interaction
  const emailLinks = document.querySelectorAll('a[href^="mailto:"]');
  emailLinks.forEach((link) => {
    link.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-3px)";
      this.style.color = "#8a9af8";
    });

    link.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0)";
      this.style.color = "";
    });

    link.addEventListener("click", function () {
      // Add a subtle pulse animation when clicked
      this.style.animation = "pulse 0.3s ease-in-out";
      setTimeout(() => {
        this.style.animation = "";
      }, 300);
    });
  });

  // Add pulse animation
  const pulseStyle = document.createElement("style");
  pulseStyle.innerHTML = `
    @keyframes pulse {
      0% { transform: scale(1); }
      50% { transform: scale(1.05); }
      100% { transform: scale(1); }
    }
  `;
  document.head.appendChild(pulseStyle);

  // Updated typewriter effect for hero headline (without breaking HTML tags)
  const heroHeadline = document.querySelector(".hero h1");
  if (heroHeadline) {
    // Store the original content for reference
    const originalContent = heroHeadline.innerHTML;

    // Prepare the headline with correct HTML structure
    heroHeadline.innerHTML = `Hi, I'm <span class="highlight"></span>`;
    const highlightSpan = heroHeadline.querySelector(".highlight");

    // Add a blinking cursor
    const cursor = document.createElement("span");
    cursor.className = "typing-cursor";
    cursor.innerHTML = "|";
    cursor.style.animation = "blink 1s step-end infinite";
    heroHeadline.appendChild(cursor);

    // Add cursor style
    const style = document.createElement("style");
    style.innerHTML = `
      @keyframes blink {
        from, to { opacity: 1 }
        50% { opacity: 0 }
      }
      
      .typing-cursor {
        display: inline-block;
        margin-left: 3px;
        font-weight: bold;
        color: var(--primary-color);
      }
    `;
    document.head.appendChild(style);

    // Type the name with delay
    setTimeout(() => {
      let nameText = "Youssef Farag";
      let i = 0;

      const typeWriterName = () => {
        if (i < nameText.length) {
          highlightSpan.textContent += nameText.charAt(i);
          i++;
          setTimeout(typeWriterName, 100);
        } else {
          // Remove cursor after typing
          setTimeout(() => {
            cursor.remove();
          }, 1500);
        }
      };

      typeWriterName();
    }, 1000);
  }

  // Add staggered animation to skill tags
  const skillTags = document.querySelectorAll(".skill-tag");
  skillTags.forEach((tag, index) => {
    tag.style.setProperty("--i", index);

    // Add hover effect
    tag.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-8px) scale(1.05)";
      this.style.boxShadow = "0 8px 20px rgba(94, 114, 228, 0.4)";
    });

    tag.addEventListener("mouseleave", function () {
      this.style.transform = "";
      this.style.boxShadow = "";
    });
  });

  // Project hover effects
  const projectCards = document.querySelectorAll(".project-card");
  projectCards.forEach((card) => {
    card.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-15px)";
    });

    card.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(-10px)";
    });
  });

  // Skills hover effects
  const skillItems = document.querySelectorAll(".skill-item");
  skillItems.forEach((item) => {
    item.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-8px)";
    });

    item.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(-5px)";
    });
  });

  // Parallax effect for hero section
  const hero = document.querySelector(".hero");
  window.addEventListener("scroll", function () {
    const scrollPosition = window.pageYOffset;
    if (hero) {
      hero.style.backgroundPositionY = scrollPosition * 0.5 + "px";
    }
  });

  // Project Screenshots Gallery Functionality - Simplified for GitHub Pages
  const galleryModal = document.getElementById("galleryModal");
  const galleryImage = document.querySelector(".gallery-image");
  const galleryClose = document.querySelector(".gallery-close");
  const galleryPrev = document.querySelector(".gallery-prev");
  const galleryNext = document.querySelector(".gallery-next");
  const galleryCounter = document.querySelector(".gallery-counter");

  // Simple, reliable gallery data for GitHub Pages
  const projectGalleries = {
    "Faculty RAG Application": ["assets/project-placeholder.svg"],
    "Travel Track": [
      "assets/screenshots/travel-track/screenshot1.jpg",
      "assets/screenshots/travel-track/screenshot2.jpg",
    ],
    Taskify: ["assets/project-placeholder.svg"],
    "Deleviro API": ["assets/project-placeholder.svg"],
  };

  let currentGallery = [];
  let currentIndex = 0;

  // Simplified gallery open function
  function openGallery(projectName) {
    console.log("Opening gallery for:", projectName);

    if (projectGalleries[projectName]) {
      currentGallery = projectGalleries[projectName];
      currentIndex = 0;

      // Show modal immediately to avoid timing issues
      galleryModal.style.display = "flex";

      // Set the image
      galleryImage.src = currentGallery[currentIndex];
      galleryCounter.textContent = `${currentIndex + 1} / ${
        currentGallery.length
      }`;

      // Fade in
      setTimeout(() => {
        galleryModal.style.opacity = 1;
      }, 10);

      document.body.style.overflow = "hidden"; // Prevent scrolling
      console.log("Gallery opened with image:", galleryImage.src);
    } else {
      console.error("No gallery found for project:", projectName);
    }
  }

  // Close gallery
  function closeGallery() {
    galleryModal.style.opacity = 0;

    setTimeout(() => {
      galleryModal.style.display = "none";
      document.body.style.overflow = ""; // Restore scrolling
    }, 400);

    console.log("Gallery closed");
  }

  // Next image
  function nextImage() {
    if (currentIndex < currentGallery.length - 1) {
      currentIndex++;
    } else {
      currentIndex = 0; // Loop back to first image
    }

    galleryImage.src = currentGallery[currentIndex];
    galleryCounter.textContent = `${currentIndex + 1} / ${
      currentGallery.length
    }`;
    console.log("Next image:", galleryImage.src);
  }

  // Previous image
  function prevImage() {
    if (currentIndex > 0) {
      currentIndex--;
    } else {
      currentIndex = currentGallery.length - 1; // Loop to last image
    }

    galleryImage.src = currentGallery[currentIndex];
    galleryCounter.textContent = `${currentIndex + 1} / ${
      currentGallery.length
    }`;
    console.log("Previous image:", galleryImage.src);
  }

  // Add click events directly - guaranteed to work approach
  document.querySelectorAll(".project-card").forEach((card) => {
    const projectTitle = card.querySelector("h3").textContent;
    console.log("Found project:", projectTitle);

    // Add click to image
    const projectImage = card.querySelector(".project-image-hover");
    if (projectImage) {
      projectImage.addEventListener("click", function (e) {
        e.preventDefault();
        e.stopPropagation();
        console.log("Image clicked for:", projectTitle);
        openGallery(projectTitle);
        return false;
      });
    }

    // Add click to gallery link
    const galleryLink = card.querySelector(".gallery-link");
    if (galleryLink) {
      galleryLink.addEventListener("click", function (e) {
        e.preventDefault();
        e.stopPropagation();
        console.log("Gallery link clicked for:", projectTitle);
        openGallery(projectTitle);
        return false;
      });
    }
  });

  // Event listeners for gallery controls
  galleryClose.addEventListener("click", closeGallery);
  galleryNext.addEventListener("click", nextImage);
  galleryPrev.addEventListener("click", prevImage);

  // Close on ESC key
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && galleryModal.style.display === "flex") {
      closeGallery();
    } else if (
      e.key === "ArrowRight" &&
      galleryModal.style.display === "flex"
    ) {
      nextImage();
    } else if (e.key === "ArrowLeft" && galleryModal.style.display === "flex") {
      prevImage();
    }
  });

  // Close when clicking outside the image
  galleryModal.addEventListener("click", function (e) {
    if (e.target === galleryModal) {
      closeGallery();
    }
  });

  // Special handler for Deleviro API card
  const deleviroCard = document.querySelector(".project-card:nth-child(4)");
  if (deleviroCard) {
    console.log("Found Deleviro API card, adding special handler");
    const apiProject = deleviroCard.querySelector(".api-project");
    if (apiProject) {
      apiProject.addEventListener("click", function (e) {
        e.preventDefault();
        e.stopPropagation();
        console.log("API visualization clicked");
        openGallery("Deleviro API");
        return false;
      });
    }
  }
});

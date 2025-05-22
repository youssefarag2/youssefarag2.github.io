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

  // Project Screenshots Gallery Functionality
  const galleryModal = document.getElementById("galleryModal");
  const galleryImage = document.querySelector(".gallery-image");
  const galleryClose = document.querySelector(".gallery-close");
  const galleryPrev = document.querySelector(".gallery-prev");
  const galleryNext = document.querySelector(".gallery-next");
  const galleryCounter = document.querySelector(".gallery-counter");
  const projectImageHovers = document.querySelectorAll(".project-image-hover");
  const projectLinks = document.querySelectorAll(
    ".project-links a[aria-label='Screenshots Gallery']"
  );

  // Dynamic project gallery loader
  const projectGalleries = {};

  // Function to fetch screenshots for a project
  async function fetchProjectScreenshots(projectName) {
    const folderMap = {
      "Faculty RAG Application": "rag-app",
      "Travel Track": "travel-track",
      Taskify: "taskify",
      "Deleviro API": "deleviro",
    };

    const folderName =
      folderMap[projectName] || projectName.toLowerCase().replace(/\s+/g, "-");
    const basePath = `assets/screenshots/${folderName}`;

    try {
      // Initial list - this is a fallback in case fetch doesn't work in the environment
      let screenshots = [];

      // Try to scan for files ending with jpg, jpeg, or png
      const fileExtensions = ["jpg", "jpeg", "png"];

      // Check if the first screenshot exists (mandatory)
      const img = new Image();
      img.src = `${basePath}/screenshot1.jpg`;

      // Add known screenshots based on file existence check
      let index = 1;
      let hasMore = true;

      while (hasMore && index <= 10) {
        // Cap at 10 screenshots max
        for (const ext of fileExtensions) {
          const path = `${basePath}/screenshot${index}.${ext}`;
          const testImg = new Image();
          testImg.src = path;

          // If image loads, add it to screenshots
          testImg.onload = function () {
            if (!screenshots.includes(path)) {
              screenshots.push(path);
            }
          };

          // Try next extension if this one fails
          testImg.onerror = function () {
            // If we've tried all extensions for this index, move to next index
            if (ext === fileExtensions[fileExtensions.length - 1]) {
              hasMore = false;
            }
          };
        }

        index++;
      }

      // Fallback if no screenshots were found
      if (screenshots.length === 0) {
        if (folderName === "travel-track") {
          screenshots = [
            "assets/screenshots/travel-track/screenshot1.jpg",
            "assets/screenshots/travel-track/screenshot2.jpg",
          ];
        } else {
          screenshots = [`assets/project-placeholder.svg`];
        }
      }

      return screenshots;
    } catch (error) {
      console.error("Error loading screenshots:", error);
      return [`assets/project-placeholder.svg`];
    }
  }

  // Initialize project galleries
  async function initGalleries() {
    // Get all project titles
    const projectCards = document.querySelectorAll(".project-card");

    for (const card of projectCards) {
      const projectTitle = card.querySelector("h3").textContent;
      // Load screenshots for this project
      projectGalleries[projectTitle] = await fetchProjectScreenshots(
        projectTitle
      );

      // Set the first screenshot as the project card image if it exists
      const cardImage = card.querySelector(".project-image img");
      if (
        projectGalleries[projectTitle].length > 0 &&
        projectGalleries[projectTitle][0] !== "assets/project-placeholder.svg"
      ) {
        cardImage.src = projectGalleries[projectTitle][0];
      }
    }
  }

  // Call the initialization
  initGalleries();

  let currentGallery = [];
  let currentIndex = 0;

  // Open gallery with enhanced animations
  function openGallery(projectName) {
    if (
      projectGalleries[projectName] &&
      projectGalleries[projectName].length > 0
    ) {
      currentGallery = projectGalleries[projectName];
      currentIndex = 0;

      // Reset any previous animations
      galleryImage.style.opacity = 0;
      galleryImage.style.transform = "scale(0.8)";

      // Show the modal first
      galleryModal.style.display = "flex";
      galleryModal.style.opacity = 0;

      // Fade in the modal
      setTimeout(() => {
        galleryModal.style.opacity = 1;
        galleryModal.style.transition = "opacity 0.4s ease";
      }, 10);

      // Then update and animate the image
      updateGalleryImage();
      document.body.style.overflow = "hidden"; // Prevent scrolling
    }
  }

  // Close gallery with fade-out animation
  function closeGallery() {
    galleryModal.style.opacity = 0;
    galleryModal.style.transition = "opacity 0.4s ease";

    // Remove the modal after animation completes
    setTimeout(() => {
      galleryModal.style.display = "none";
      document.body.style.overflow = ""; // Restore scrolling
    }, 400);
  }

  // Update gallery image with animation
  function updateGalleryImage() {
    if (currentGallery.length > 0) {
      // Start with opacity 0
      galleryImage.style.opacity = 0;
      galleryImage.style.transform = "scale(0.8)";

      // Set the src after a short delay
      setTimeout(() => {
        galleryImage.src = currentGallery[currentIndex];
        galleryCounter.textContent = `${currentIndex + 1} / ${
          currentGallery.length
        }`;

        // Fade in with a nice scale effect
        galleryImage.style.transition =
          "opacity 0.5s ease, transform 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)";
        galleryImage.style.opacity = 1;
        galleryImage.style.transform = "scale(1)";
      }, 200);
    }
  }

  // Next image with slide animation
  function nextImage() {
    if (currentIndex < currentGallery.length - 1) {
      currentIndex++;
    } else {
      currentIndex = 0; // Loop back to first image
    }

    // Slide out to left
    galleryImage.style.opacity = 0;
    galleryImage.style.transform = "translateX(-50px) scale(0.9)";

    // Update and slide in from right
    setTimeout(() => {
      updateGalleryImage();
      galleryImage.style.transform = "translateX(0) scale(1)";
    }, 200);
  }

  // Previous image with slide animation
  function prevImage() {
    if (currentIndex > 0) {
      currentIndex--;
    } else {
      currentIndex = currentGallery.length - 1; // Loop to last image
    }

    // Slide out to right
    galleryImage.style.opacity = 0;
    galleryImage.style.transform = "translateX(50px) scale(0.9)";

    // Update and slide in from left
    setTimeout(() => {
      updateGalleryImage();
      galleryImage.style.transform = "translateX(0) scale(1)";
    }, 200);
  }

  // Add event listeners
  galleryClose.addEventListener("click", closeGallery);
  galleryNext.addEventListener("click", nextImage);
  galleryPrev.addEventListener("click", prevImage);

  // Close on ESC key
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
      closeGallery();
    } else if (e.key === "ArrowRight") {
      nextImage();
    } else if (e.key === "ArrowLeft") {
      prevImage();
    }
  });

  // Close when clicking outside the image
  galleryModal.addEventListener("click", function (e) {
    if (e.target === galleryModal) {
      closeGallery();
    }
  });

  // Add click events to project images
  projectImageHovers.forEach((projectImage) => {
    const projectCard = projectImage.closest(".project-card");
    const projectTitle = projectCard.querySelector("h3").textContent;

    projectImage.addEventListener("click", function () {
      openGallery(projectTitle);
    });
  });

  // Add click events to gallery links
  projectLinks.forEach((link) => {
    const projectCard = link.closest(".project-card");
    const projectTitle = projectCard.querySelector("h3").textContent;

    link.addEventListener("click", function (e) {
      e.preventDefault();
      openGallery(projectTitle);
    });
  });
});

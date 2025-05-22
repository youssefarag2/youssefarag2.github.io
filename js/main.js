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

  // Gallery functionality
  const galleryModal = document.getElementById("galleryModal");
  const galleryImage = document.querySelector(".gallery-image");
  const galleryClose = document.querySelector(".gallery-close");
  const galleryPrev = document.querySelector(".gallery-prev");
  const galleryNext = document.querySelector(".gallery-next");
  const galleryCounter = document.querySelector(".gallery-counter");

  // Gallery variables
  let currentGallery = [];
  let currentIndex = 0;

  // Simplified gallery open function
  function openGallery(projectName) {
    console.log("Opening gallery for:", projectName);

    // Format project name to folder name (lowercase, replace spaces with hyphens)
    const projectFolder = projectName.toLowerCase().replace(/\s+/g, "-");

    // Default to showing gradient background for projects without screenshots
    let useGradientBackground = true;

    // Create gallery based on project name with relative paths (for GitHub Pages compatibility)
    if (projectName === "Travel Track") {
      currentGallery = [
        "./assets/screenshots/travel-track/screenshot1.jpg",
        "./assets/screenshots/travel-track/screenshot2.jpg",
      ];
      useGradientBackground = false;
    } else if (projectName === "Taskify") {
      currentGallery = ["./assets/screenshots/taskify/screenshot1.jpg"];
      useGradientBackground = false;
    } else if (projectName === "Faculty RAG Application") {
      currentGallery = [];
    } else if (projectName === "Deleviro API") {
      currentGallery = [];
    } else {
      console.log("No gallery images available for:", projectName);
      // Show modal with gradient background for projects without screenshots
      currentGallery = [];
    }

    // If no images available, display a gradient background
    if (currentGallery.length === 0) {
      // Show modal with gradient instead
      galleryModal.style.display = "flex";
      galleryImage.style.display = "none";
      galleryImage.parentElement.style.background =
        "linear-gradient(135deg, #12122e, #1e1e4b)";
      galleryImage.parentElement.style.width = "600px";
      galleryImage.parentElement.style.height = "400px";
      galleryImage.parentElement.style.borderRadius = "8px";

      // Hide navigation arrows and counter when no images
      galleryPrev.style.display = "none";
      galleryNext.style.display = "none";
      galleryCounter.style.display = "none";

      // Fade in
      setTimeout(() => {
        galleryModal.style.opacity = 1;
      }, 10);

      // Prevent page scrolling
      document.body.style.overflow = "hidden";
      return;
    }

    // Reset counter
    currentIndex = 0;

    // Show modal
    galleryModal.style.display = "flex";

    // Reset styles for image display
    galleryImage.style.display = "block";
    galleryImage.parentElement.style.background = "transparent";
    galleryImage.parentElement.style.width = "auto";
    galleryImage.parentElement.style.height = "auto";

    // Show navigation if multiple images
    galleryPrev.style.display = currentGallery.length > 1 ? "flex" : "none";
    galleryNext.style.display = currentGallery.length > 1 ? "flex" : "none";
    galleryCounter.style.display = currentGallery.length > 1 ? "block" : "none";

    // Set the image
    console.log("Setting gallery image to:", currentGallery[currentIndex]);
    galleryImage.src = currentGallery[currentIndex];
    galleryCounter.textContent = `${currentIndex + 1} / ${
      currentGallery.length
    }`;

    // Fade in
    setTimeout(() => {
      galleryModal.style.opacity = 1;
    }, 10);

    // Prevent page scrolling
    document.body.style.overflow = "hidden";
  }

  // Close gallery
  function closeGallery() {
    galleryModal.style.opacity = 0;

    setTimeout(() => {
      galleryModal.style.display = "none";
      document.body.style.overflow = ""; // Restore scrolling
    }, 400);
  }

  // Next image
  function nextImage() {
    if (currentGallery.length <= 1) return;

    if (currentIndex < currentGallery.length - 1) {
      currentIndex++;
    } else {
      currentIndex = 0; // Loop back to first image
    }

    galleryImage.src = currentGallery[currentIndex];
    galleryCounter.textContent = `${currentIndex + 1} / ${
      currentGallery.length
    }`;
  }

  // Previous image
  function prevImage() {
    if (currentGallery.length <= 1) return;

    if (currentIndex > 0) {
      currentIndex--;
    } else {
      currentIndex = currentGallery.length - 1; // Loop to last image
    }

    galleryImage.src = currentGallery[currentIndex];
    galleryCounter.textContent = `${currentIndex + 1} / ${
      currentGallery.length
    }`;
  }

  // Add click events to project images
  document.querySelectorAll(".project-image-hover").forEach((projectImage) => {
    projectImage.addEventListener("click", function () {
      const projectCard = this.closest(".project-card");
      const projectTitle = projectCard.querySelector("h3").textContent;
      openGallery(projectTitle);
    });
  });

  // Add click events to gallery links
  document
    .querySelectorAll(
      ".gallery-link, .project-links a[aria-label='Screenshots Gallery']"
    )
    .forEach((link) => {
      link.addEventListener("click", function (e) {
        e.preventDefault();
        const projectCard = this.closest(".project-card");
        const projectTitle = projectCard.querySelector("h3").textContent;
        openGallery(projectTitle);
      });
    });

  // Gallery event listeners
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

  // Handle image loading errors
  galleryImage.onerror = function () {
    console.log("Failed to load gallery image:", this.src);
    this.style.display = "none";
    this.parentElement.style.background =
      "linear-gradient(135deg, #12122e, #1e1e4b)";
    this.parentElement.style.width = "600px";
    this.parentElement.style.height = "400px";
    this.parentElement.style.borderRadius = "8px";

    // Hide navigation and counter if image fails to load
    galleryPrev.style.display = "none";
    galleryNext.style.display = "none";
    galleryCounter.style.display = "none";
  };

  // Debug image loading
  galleryImage.onload = function () {
    console.log("Successfully loaded gallery image:", this.src);
  };

  // Check if images are loading in project cards
  document.querySelectorAll(".project-image img").forEach((img) => {
    img.onload = function () {
      console.log("Project image loaded successfully:", this.src);
    };
    img.onerror = function () {
      console.log("Failed to load project image:", this.src);
    };
  });
});

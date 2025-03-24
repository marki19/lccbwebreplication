document.addEventListener('DOMContentLoaded', function() {
  initHeaderScroll();
  initSlideshow();
  initSmoothScroll();
  initBackToTop();
  initFormValidation();
  initMobileMenu();
  initAnnouncementPopup();
});

function initHeaderScroll() {
  const header = document.querySelector('.header');
  
  window.addEventListener('scroll', function() {
    if (window.scrollY > 50) {
      header.classList.add('header-scrolled');
    } else {
      header.classList.remove('header-scrolled');
    }
  });
}

function initSlideshow() {
  let slideIndex = 0;
  const slides = document.getElementsByClassName("slides");
  const dots = document.getElementsByClassName("dot");
  
  function showSlides() {
    for (let i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
      if (dots[i]) dots[i].classList.remove("active-dot");
    }
    
    slideIndex++;
    
    if (slideIndex > slides.length) {
      slideIndex = 1;
    }
    
    if (slides[slideIndex-1]) {
      slides[slideIndex-1].style.display = "block";
      if (dots[slideIndex-1]) dots[slideIndex-1].classList.add("active-dot");
    }
    
    setTimeout(showSlides, 6000);
  }
  
  if (slides.length > 0) {
    showSlides();
  }
  
  window.currentSlide = function(n) {
    slideIndex = n - 1;
    
    for (let i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
      if (dots[i]) dots[i].classList.remove("active-dot");
    }

    if (slides[slideIndex]) {
      slides[slideIndex].style.display = "block";
      if (dots[slideIndex]) dots[slideIndex].classList.add("active-dot");
    }
  };
  
  window.plusSlides = function(n) {
    currentSlide(slideIndex + n + 1);
  };
}
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        const headerHeight = document.querySelector('.header').offsetHeight;
        const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
        const nav = document.querySelector('nav');
        if (nav.classList.contains('active')) {
          nav.classList.remove('active');
          document.querySelector('.mobile-menu-toggle').innerHTML = '<i class="fas fa-bars"></i>';
        }
      }
    });
  });
}
function initBackToTop() {
  const backToTopButton = document.getElementById("backToTop");
  
  if (backToTopButton) {
    window.addEventListener("scroll", function() {
      if (window.pageYOffset > 300) {
        backToTopButton.classList.add("show");
      } else {
        backToTopButton.classList.remove("show");
      }
    });
    
    backToTopButton.addEventListener("click", function(e) {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    });
  }
}

function initFormValidation() {
  const contactForm = document.querySelector('.contact-form');
  
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const name = document.getElementById('name').value;
      const email = document.getElementById('email').value;
      const subject = document.getElementById('subject').value;
      const message = document.getElementById('message').value;

      document.querySelectorAll('.error-message').forEach(el => el.remove());
      
      let isValid = true;
      
      function showError(field, message) {
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.textContent = message;
        errorDiv.style.color = '#d9534f';
        errorDiv.style.fontSize = '0.85rem';
        errorDiv.style.marginTop = '5px';
        
        field.parentNode.appendChild(errorDiv);
        field.style.borderColor = '#d9534f';
        isValid = false;
      }
    
      if (!name.trim()) {
        showError(document.getElementById('name'), 'Please enter your name');
      }
      
      if (!email.trim()) {
        showError(document.getElementById('email'), 'Please enter your email address');
      } else if (!/^\S+@\S+\.\S+$/.test(email)) {
        showError(document.getElementById('email'), 'Please enter a valid email address');
      }
      
      if (!subject.trim()) {
        showError(document.getElementById('subject'), 'Please enter a subject');
      }
      
      if (!message.trim()) {
        showError(document.getElementById('message'), 'Please enter your message');
      }
      
      if (isValid) {
        const successMessage = document.createElement('div');
        successMessage.className = 'success-message';
        successMessage.innerHTML = '<i class="fas fa-check-circle"></i> Thank you for your message! We will get back to you soon.';
        successMessage.style.color = '#28a745';
        successMessage.style.padding = '15px';
        successMessage.style.marginTop = '20px';
        successMessage.style.backgroundColor = '#d4edda';
        successMessage.style.borderRadius = '4px';
        
        contactForm.appendChild(successMessage);
        contactForm.reset();

        setTimeout(() => {
          successMessage.remove();
        }, 5000);
      }
    });
  
    contactForm.querySelectorAll('input, textarea').forEach(field => {
      field.addEventListener('input', function() {
        this.style.borderColor = '';
        const errorMessage = this.parentNode.querySelector('.error-message');
        if (errorMessage) {
          errorMessage.remove();
        }
      });
    });
  }
}
function initMobileMenu() {
  if (!document.querySelector('.mobile-menu-toggle')) {
    const header = document.querySelector('.header');
    const nav = document.querySelector('nav');
    
    const mobileToggle = document.createElement('button');
    mobileToggle.className = 'mobile-menu-toggle';
    mobileToggle.innerHTML = '<i class="fas fa-bars"></i>';
    mobileToggle.style.background = 'none';
    mobileToggle.style.border = 'none';
    mobileToggle.style.color = 'white';
    mobileToggle.style.fontSize = '24px';
    mobileToggle.style.cursor = 'pointer';
    mobileToggle.style.display = 'none';
    mobileToggle.style.padding = '10px';

    header.insertBefore(mobileToggle, nav);
    
    const style = document.createElement('style');
    style.textContent = `
      @media (max-width: 768px) {
        .mobile-menu-toggle {
          display: block !important;
        }
        nav {
          display: none;
        }
        nav.active {
          display: block;
          position: absolute;
          top: 100%;
          left: 0;
          width: 100%;
          background-color: #0033a0;
          z-index: 1000;
          box-shadow: 0 5px 10px rgba(0,0,0,0.2);
        }
        .nav-links {
          flex-direction: column;
          padding: 15px 0;
        }
        .nav-links li {
          display: block;
          margin: 0;
          text-align: center;
        }
        .nav-links a {
          display: block;
          padding: 12px 15px;
          border-bottom: 1px solid rgba(255,255,255,0.1);
        }
        .header-scrolled {
          background-color: #0033a0;
          box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }
      }
    `;
    document.head.appendChild(style);
    
    mobileToggle.addEventListener('click', function() {
      nav.classList.toggle('active');
      this.innerHTML = nav.classList.contains('active') ? 
        '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
    });

    document.addEventListener('click', function(e) {
      if (!nav.contains(e.target) && !mobileToggle.contains(e.target) && nav.classList.contains('active')) {
        nav.classList.remove('active');
        mobileToggle.innerHTML = '<i class="fas fa-bars"></i>';
      }
    });
  }
}
function initAnnouncementPopup() {
  if (!sessionStorage.getItem('announcementShown')) {
    setTimeout(() => {
      const popupOverlay = document.createElement('div');
      popupOverlay.className = 'announcement-overlay';
      popupOverlay.style.position = 'fixed';
      popupOverlay.style.top = '0';
      popupOverlay.style.left = '0';
      popupOverlay.style.width = '100%';
      popupOverlay.style.height = '100%';
      popupOverlay.style.backgroundColor = 'rgba(0,0,0,0.7)';
      popupOverlay.style.zIndex = '9999';
      popupOverlay.style.display = 'flex';
      popupOverlay.style.justifyContent = 'center';
      popupOverlay.style.alignItems = 'center';
      
      const popupContent = document.createElement('div');
      popupContent.className = 'announcement-content';
      popupContent.style.backgroundColor = 'white';
      popupContent.style.borderRadius = '8px';
      popupContent.style.maxWidth = '500px';
      popupContent.style.width = '90%';
      popupContent.style.padding = '30px';
      popupContent.style.position = 'relative';
      popupContent.style.boxShadow = '0 10px 30px rgba(0,0,0,0.3)';
      
      const closeButton = document.createElement('button');
      closeButton.innerHTML = '&times;';
      closeButton.style.position = 'absolute';
      closeButton.style.top = '10px';
      closeButton.style.right = '10px';
      closeButton.style.border = 'none';
      closeButton.style.background = 'none';
      closeButton.style.fontSize = '24px';
      closeButton.style.cursor = 'pointer';
      closeButton.style.color = '#333';
      
      const title = document.createElement('h3');
      title.textContent = 'Enrollment Ongoing!';
      title.style.color = '#0033a0';
      title.style.marginBottom = '15px';
      title.style.fontSize = '1.5rem';
      
      const message = document.createElement('p');
      message.innerHTML = 'Enrollment for Academic Year 2025-2026 is now open! Visit our Admissions Office or apply online.<br><br>Limited slots available for all programs.';
      message.style.marginBottom = '20px';
      
      const button = document.createElement('a');
      button.href = '#admission';
      button.textContent = 'Apply Now';
      button.className = 'cta-button';
      button.style.display = 'inline-block';
      button.style.backgroundColor = '#0033a0';
      button.style.color = 'white';
      button.style.padding = '10px 20px';
      button.style.borderRadius = '5px';
      button.style.textDecoration = 'none';
      button.style.fontWeight = 'bold';
    
      popupContent.appendChild(closeButton);
      popupContent.appendChild(title);
      popupContent.appendChild(message);
      popupContent.appendChild(button);
      popupOverlay.appendChild(popupContent);
      document.body.appendChild(popupOverlay);

      function closePopup() {
        popupOverlay.style.opacity = '0';
        setTimeout(() => {
          document.body.removeChild(popupOverlay);
        }, 300);
        sessionStorage.setItem('announcementShown', 'true');
      }
      
      closeButton.addEventListener('click', closePopup);
      button.addEventListener('click', closePopup);
      
      popupOverlay.addEventListener('click', function(e) {
        if (e.target === popupOverlay) {
          closePopup();
        }
      });
      
      popupOverlay.style.opacity = '0';
      popupOverlay.style.transition = 'opacity 0.3s ease';
      
      setTimeout(() => {
        popupOverlay.style.opacity = '1';
      }, 10);
    }, 2000);
  }
}

window.addEventListener('load', function() {
  const preloader = document.createElement('div');
  preloader.className = 'preloader';
  preloader.style.position = 'fixed';
  preloader.style.top = '0';
  preloader.style.left = '0';
  preloader.style.width = '100%';
  preloader.style.height = '100%';
  preloader.style.backgroundColor = '#0033a0';
  preloader.style.display = 'flex';
  preloader.style.justifyContent = 'center';
  preloader.style.alignItems = 'center';
  preloader.style.zIndex = '9999';
  preloader.style.transition = 'opacity 0.5s ease, visibility 0.5s ease';
  
  const spinner = document.createElement('div');
  spinner.className = 'spinner';
  spinner.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
  spinner.style.color = 'white';
  spinner.style.fontSize = '40px';
  
  preloader.appendChild(spinner);
  document.body.appendChild(preloader);
  
  setTimeout(() => {
    preloader.style.opacity = '0';
    preloader.style.visibility = 'hidden';
    setTimeout(() => {
      document.body.removeChild(preloader);
    }, 500);
  }, 1000);
});

function initCounters() {
  const counters = document.querySelectorAll('.counter');
  
  if (counters.length > 0) {
    const counterObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const counter = entry.target;
          const target = parseInt(counter.getAttribute('data-target'));
          let count = 0;
          const updateCounter = () => {
            const increment = target / 100;
            if (count < target) {
              count += increment;
              counter.textContent = Math.ceil(count);
              setTimeout(updateCounter, 10);
            } else {
              counter.textContent = target;
            }
          };
          updateCounter();
          observer.unobserve(counter);
        }
      });
    }, { threshold: 0.5 });
    
    counters.forEach(counter => {
      counterObserver.observe(counter);
    });
  }
}

document.addEventListener('DOMContentLoaded', initCounters);

document.addEventListener("DOMContentLoaded", function() {
  const lazyImages = document.querySelectorAll("img[data-src]");
  
  if ("IntersectionObserver" in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const image = entry.target;
          image.src = image.dataset.src;
          image.removeAttribute("data-src");
          imageObserver.unobserve(image);
        }
      });
    });
    
    lazyImages.forEach(image => imageObserver.observe(image));
  } else {

    lazyImages.forEach(image => {
      image.src = image.dataset.src;
      image.removeAttribute("data-src");
    });
  }
  
  let slideIndex = 0;
  showSlides();
  
  function showSlides() {
    const slides = document.getElementsByClassName("slides");
    const dots = document.getElementsByClassName("dot");
    
    for (let i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
    }
    
    for (let i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" active-dot", "");
    }
    
    slideIndex++;
    if (slideIndex > slides.length) {
      slideIndex = 1;
    }
    
    slides[slideIndex - 1].style.display = "block";
    dots[slideIndex - 1].className += " active-dot";
    
    setTimeout(showSlides, 5000);
  }
  
  window.plusSlides = function(n) {
    displaySlides(slideIndex += n);
  }
  
  window.currentSlide = function(n) {
    displaySlides(slideIndex = n);
  }
  
  function displaySlides(n) {
    const slides = document.getElementsByClassName("slides");
    const dots = document.getElementsByClassName("dot");
    
    if (n > slides.length) {slideIndex = 1}
    if (n < 1) {slideIndex = slides.length}
    
    for (let i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
    }
    
    for (let i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" active-dot", "");
    }
    
    slides[slideIndex - 1].style.display = "block";
    dots[slideIndex - 1].className += " active-dot";
  }
  
  const backToTopButton = document.getElementById("backToTop");
  
  window.addEventListener("scroll", function() {
    if (window.pageYOffset > 300) {
      backToTopButton.classList.add("show");
    } else {
      backToTopButton.classList.remove("show");
    }
  });
  
  backToTopButton.addEventListener("click", function(e) {
    e.preventDefault();
    window.scrollTo({top: 0, behavior: "smooth"});
  });
  
  const stats = document.querySelectorAll(".stat-number");
  const statsSection = document.querySelector("#statistics");
  
  if (stats.length && statsSection) {
    let animated = false;
    
    window.addEventListener("scroll", function() {
      if (isInViewport(statsSection) && !animated) {
        stats.forEach(stat => {
          const target = parseInt(stat.getAttribute("data-count"));
          let count = 0;
          const duration = 2000;
          const increment = Math.ceil(target / (duration / 16));
          
          const timer = setInterval(() => {
            count += increment;
            if (count >= target) {
              stat.textContent = target.toLocaleString();
              clearInterval(timer);
            } else {
              stat.textContent = count.toLocaleString();
            }
          }, 16);
        });
        
        animated = true;
      }
    });
  }
  
  function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
      rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.bottom >= 0
    );
  }
  
  const tabButtons = document.querySelectorAll(".tab-button");
  const tabPanes = document.querySelectorAll(".tab-pane");
  
  tabButtons.forEach(button => {
    button.addEventListener("click", function() {
      const tabId = this.getAttribute("data-tab");
      
      tabButtons.forEach(btn => btn.classList.remove("active"));
      tabPanes.forEach(pane => pane.classList.remove("active"));
      
      this.classList.add("active");
      document.getElementById(tabId).classList.add("active");
    });
  });
  
  const contactForm = document.querySelector(".contact-form");
  
  if (contactForm) {
    contactForm.addEventListener("submit", function(e) {
      e.preventDefault();
      
      const nameInput = document.getElementById("name");
      const emailInput = document.getElementById("email");
      const messageInput = document.getElementById("message");
      let isValid = true;
      
      if (!nameInput.value.trim()) {
        nameInput.style.borderColor = "red";
        isValid = false;
      } else {
        nameInput.style.borderColor = "";
      }
      
      if (!emailInput.value.trim() || !isValidEmail(emailInput.value)) {
        emailInput.style.borderColor = "red";
        isValid = false;
      } else {
        emailInput.style.borderColor = "";
      }
      
      if (!messageInput.value.trim()) {
        messageInput.style.borderColor = "red";
        isValid = false;
      } else {
        messageInput.style.borderColor = "";
      }
      
      if (isValid) {
        alert("Thank you for your message. We will get back to you soon!");
        contactForm.reset();
      }
    });
  }
  
  function isValidEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }
});
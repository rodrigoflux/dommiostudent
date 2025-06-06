document.addEventListener('DOMContentLoaded', function() {

  // Tabs functionality (remains the same)
  const tabs = document.querySelectorAll('.tab');
  const tabContents = document.querySelectorAll('.tab-content');

  if (tabs.length > 0 && tabContents.length > 0) {
      tabs.forEach(tab => {
          tab.addEventListener('click', () => {
              const tabId = tab.getAttribute('data-tab');
              tabs.forEach(t => t.classList.remove('active'));
              tabContents.forEach(content => content.classList.remove('active'));
              tab.classList.add('active');
              const activeContent = document.getElementById(`${tabId}-content`);
              if (activeContent) {
                  activeContent.classList.add('active');
              }
          });
      });
  }

  // Header background change on scroll (remains the same)
  const header = document.querySelector('header');
  if (header) {
      const checkHeaderScroll = () => {
          if (window.scrollY > 50) {
              header.classList.add('scrolled');
          } else {
              header.classList.remove('scrolled');
          }
      };
      window.addEventListener('scroll', checkHeaderScroll);
      checkHeaderScroll();
  }

  // Hero Video Pause (remains similar, adjust video or remove if not used)
  const video = document.getElementById('heroVideo');
  const overlay = document.getElementById('heroOverlay');
  if (video) {
      video.playbackRate = 0.75;
      video.play().then(() => {
          console.log("Video del héroe iniciado.");
      }).catch(error => {
          console.warn("Autoplay del video del héroe prevenido:", error);
      });

      // Custom end 0.5s before actual end
      video.addEventListener('timeupdate', function() {
          if (video.duration && video.currentTime >= video.duration - 1.23) {
              video.pause();
              video.dispatchEvent(new Event('ended'));
          }
      });

      // Ensure overlay is always visible after video ends
      video.addEventListener('ended', function() {
          if (overlay) {
              overlay.style.display = 'block';
              overlay.style.opacity = '1';
          }
          // Fade out the video smoothly
          video.style.transition = 'opacity 2s';
          video.style.opacity = '0.85';
      });
      // Make sure overlay is visible initially as well
      if (overlay) {
          overlay.style.display = 'block';
          overlay.style.opacity = '1';
      }
  }

  // FAQ Accordion Functionality (remains the same)
  const faqItems = document.querySelectorAll('.faq-item');
  if (faqItems.length > 0) {
    faqItems.forEach(item => {
      const question = item.querySelector('.faq-question');
      const answer = item.querySelector('.faq-answer');

      if (question && answer) {
        question.setAttribute('aria-expanded', 'false');
        answer.setAttribute('aria-hidden', 'true');
        answer.style.maxHeight = '0';

        question.addEventListener('click', () => {
          const isExpanded = question.getAttribute('aria-expanded') === 'true';
          question.setAttribute('aria-expanded', String(!isExpanded));
          answer.setAttribute('aria-hidden', String(isExpanded));
          if (!isExpanded) {
            answer.style.maxHeight = answer.scrollHeight + 'px';
          } else {
            answer.style.maxHeight = '0';
          }
        });
        window.addEventListener('resize', () => {
            if (question.getAttribute('aria-expanded') === 'true') {
                answer.style.maxHeight = 'none';
                const currentScrollHeight = answer.scrollHeight;
                answer.style.maxHeight = currentScrollHeight + 'px';
            }
        });
      }
    });
  }

  // Smooth scrolling for anchor links (remains the same)
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId && targetId.length > 1 && targetId.startsWith('#')) {
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          e.preventDefault();
          targetElement.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
           const nav = document.querySelector('header nav');
           if(nav && nav.classList.contains('active')){
               nav.classList.remove('active');
               const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
               if(mobileMenuToggle) mobileMenuToggle.setAttribute('aria-expanded', 'false');
           }
        }
      }
    });
  });

  // Mobile Menu Toggle Functionality (remains the same)
  const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
  const navMenu = document.querySelector('header nav'); // Renamed to navMenu to avoid conflict

  if (mobileMenuToggle && navMenu) {
    mobileMenuToggle.addEventListener('click', () => {
      navMenu.classList.toggle('active');
      const isExpanded = navMenu.classList.contains('active');
      mobileMenuToggle.setAttribute('aria-expanded', String(isExpanded));
    });

    document.addEventListener('click', function(event) {
      const isClickInsideNav = navMenu.contains(event.target);
      const isClickOnToggle = mobileMenuToggle.contains(event.target);

      if (!isClickInsideNav && !isClickOnToggle && navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
        mobileMenuToggle.setAttribute('aria-expanded', 'false');
      }
    });
  }


  // EmailJS Contact Form Submission (remains largely the same, ensure your EmailJS details are correct)
    const contactForm = document.getElementById('contactForm');
    const formResponse = document.getElementById('formResponse');
    const submitButton = document.getElementById('submitButton');

    if (contactForm && formResponse && submitButton) {
        // !!! IMPORTANT: Replace with your ACTUAL EmailJS credentials if you use it !!!
        // For a pure informational page, you might not even need active form submission yet.
        // You could link the "Enviar" button to a mailto: link or a Google Form.
        const EMAILJS_PUBLIC_KEY = "lKexp3-c014Ddpsu3"; // Replace 'YOUR_PUBLIC_KEY' or leave for simulation
        const EMAILJS_SERVICE_ID = "service_krpvgef"; // Replace 'YOUR_SERVICE_ID'
        const EMAILJS_TEMPLATE_ID = "dommio_contact"; // Replace 'YOUR_TEMPLATE_ID' (ensure template includes 'user_type')
        // !!! ----------------------------------------------------------------------- !!!

        let emailJsInitialized = false;
        if (EMAILJS_PUBLIC_KEY && EMAILJS_PUBLIC_KEY !== "YOUR_PUBLIC_KEY") {
             try {
                 emailjs.init(EMAILJS_PUBLIC_KEY);
                 emailJsInitialized = true;
                 console.log("EmailJS Inicializado.");
             } catch (err) {
                 console.error("Fallo al inicializar EmailJS:", err);
                 formResponse.innerHTML = '<div class="error-message">Error de configuración del formulario. Por favor, contacta soporte.</div>';
                 submitButton.disabled = true;
             }
        } else {
            console.warn("Clave Pública de EmailJS no configurada o es un placeholder. La sumisión del formulario será simulada.");
        }

        contactForm.addEventListener('submit', function(event) {
            event.preventDefault();

            const originalButtonText = submitButton.textContent;
            submitButton.textContent = 'Enviando...';
            submitButton.disabled = true;
            formResponse.innerHTML = '';

            if (emailJsInitialized && EMAILJS_SERVICE_ID && EMAILJS_TEMPLATE_ID && EMAILJS_SERVICE_ID !== 'YOUR_SERVICE_ID' && EMAILJS_TEMPLATE_ID !== 'YOUR_TEMPLATE_ID') {
                 emailjs.sendForm(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, this)
                    .then(function() {
                        formResponse.innerHTML = '<div class="success-message">¡Gracias! Tu mensaje ha sido enviado. Nos pondremos en contacto pronto.</div>';
                        contactForm.reset();
                        submitButton.textContent = originalButtonText;
                        submitButton.disabled = false;
                    }, function(error) {
                        console.error('Fallo al Enviar con EmailJS:', error);
                        let errorMsg = 'Lo sentimos, hubo un error al enviar tu mensaje. Por favor, inténtalo de nuevo más tarde o contáctanos directamente.';
                        formResponse.innerHTML = `<div class="error-message">${errorMsg}</div>`;
                        submitButton.textContent = originalButtonText;
                        submitButton.disabled = false;
                    });
            } else {
                console.log("EmailJS no configurado. Simulación de envío de formulario.");
                setTimeout(() => {
                    // Simulate getting the form data
                    const formData = new FormData(contactForm);
                    const name = formData.get('from_name');
                    const email = formData.get('from_email');
                    const userType = formData.get('user_type');
                    const message = formData.get('message');
                    console.log("Simulated Form Data:", { name, email, userType, message });

                    formResponse.innerHTML = '<div class="success-message">(Simulado) ¡Gracias! Tu información ha sido recibida.</div>';
                    contactForm.reset();
                    submitButton.textContent = originalButtonText;
                    submitButton.disabled = false;
                }, 1500);
            }
        });
    } else {
        console.warn("Elementos del formulario de contacto no encontrados. Funcionalidad de envío deshabilitada.");
    }

  // Language Switcher Functionality REMOVED as it's Spanish only.
  // The 'translations' object is also removed.

  // --- CATEGORY SLIDER LOGIC ---
  const slider = document.querySelector('.category-slider');
  const pauseBtn = document.querySelector('.category-slider-pause-inside');
  const leftArrow = document.querySelector('.category-slider-arrow.left');
  const rightArrow = document.querySelector('.category-slider-arrow.right');
  let autoplayInterval = null;
  let isPaused = false;
  let autoplayDelay = 3500;

  // Infinite scroll setup: clone slides
  let slideW = 0;
  let originalCount = 0;
  if (slider) {
    const slides = Array.from(slider.children);
    originalCount = slides.length;
    slides.forEach(slide => {
      const clone = slide.cloneNode(true);
      clone.classList.add('cloned');
      slider.appendChild(clone);
    });
    // After DOM update, get slide width
    slideW = slider.querySelector('.category-slide')?.offsetWidth || 340;
    // Set initial scroll position to 0
    slider.scrollLeft = 0;
  }

  function scrollToNextSlide() {
    if (!slider) return;
    // If at (or past) the end of the original slides, reset to start of originals
    const maxScroll = slideW * originalCount;
    if (slider.scrollLeft >= maxScroll) {
      slider.scrollLeft = 0;
    }
    slider.scrollBy({ left: slideW, behavior: 'smooth' });
  }
  function scrollToPrevSlide() {
    if (!slider) return;
    // If at the start, jump to end of originals
    if (slider.scrollLeft <= 0) {
      slider.scrollLeft = slideW * originalCount;
    }
    slider.scrollBy({ left: -slideW, behavior: 'smooth' });
  }

  // Arrow controls
  if (slider && leftArrow && rightArrow) {
    leftArrow.addEventListener('click', () => {
      scrollToPrevSlide();
      pauseAutoplay();
    });
    rightArrow.addEventListener('click', () => {
      scrollToNextSlide();
      pauseAutoplay();
    });
  }

  // Autoplay logic (fixed for pause button)
  function startAutoplay() {
    if (autoplayInterval) clearInterval(autoplayInterval);
    autoplayInterval = setInterval(() => {
      if (!isPaused) scrollToNextSlide();
    }, autoplayDelay);
  }
  function pauseAutoplay() {
    isPaused = true;
    if (pauseBtn) pauseBtn.innerHTML = '<i class="bi bi-play-fill"></i>';
    if (autoplayInterval) clearInterval(autoplayInterval);
  }
  function resumeAutoplay() {
    isPaused = false;
    if (pauseBtn) pauseBtn.innerHTML = '<i class="bi bi-pause-fill"></i>';
    startAutoplay();
  }
  if (pauseBtn) {
    pauseBtn.addEventListener('click', function(e) {
      e.stopPropagation();
      if (isPaused) {
        resumeAutoplay();
      } else {
        pauseAutoplay();
      }
    });
  }
  // Start autoplay on load
  startAutoplay();
  if (pauseBtn) pauseBtn.innerHTML = '<i class="bi bi-pause-fill"></i>';

  // Swipe support for mobile
  let isDown = false, startX, scrollLeft;
  if (slider) {
    slider.addEventListener('mousedown', (e) => {
      isDown = true;
      slider.classList.add('dragging');
      startX = e.pageX - slider.offsetLeft;
      scrollLeft = slider.scrollLeft;
      pauseAutoplay();
    });
    slider.addEventListener('mouseleave', () => {
      isDown = false;
      slider.classList.remove('dragging');
    });
    slider.addEventListener('mouseup', () => {
      isDown = false;
      slider.classList.remove('dragging');
    });
    slider.addEventListener('mousemove', (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - slider.offsetLeft;
      const walk = (x - startX) * 1.2;
      slider.scrollLeft = scrollLeft - walk;
    });
    // Touch events for mobile
    slider.addEventListener('touchstart', (e) => {
      isDown = true;
      startX = e.touches[0].pageX - slider.offsetLeft;
      scrollLeft = slider.scrollLeft;
      pauseAutoplay();
    });
    slider.addEventListener('touchend', () => {
      isDown = false;
    });
    slider.addEventListener('touchmove', (e) => {
      if (!isDown) return;
      const x = e.touches[0].pageX - slider.offsetLeft;
      const walk = (x - startX) * 1.2;
      slider.scrollLeft = scrollLeft - walk;
    });
    // Pause on hover (desktop)
    slider.addEventListener('mouseenter', pauseAutoplay);
    slider.addEventListener('mouseleave', resumeAutoplay);
  }

  // Make sure to start with pause icon
  if (pauseBtn) pauseBtn.innerHTML = '<i class="bi bi-pause-fill"></i>';

  // --- Lottie Animation for Student Market Section ---
  // (Removed: now using dotLottie player via HTML tag)

}); // End DOMContentLoaded
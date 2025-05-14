document.addEventListener('DOMContentLoaded', function() {
  // Updated selectors to match HTML structure
  const hamburger = document.getElementById('hamburger');
  const navList = document.querySelector('nav ul');
  const navbar = document.querySelector('nav');
  let lastScrollTop = 0;

  // Hamburger menu toggle
  if (hamburger) {
    hamburger.addEventListener('click', function() {
      hamburger.classList.toggle('open');
      hamburger.classList.toggle('active');
      navList.classList.toggle('hidden');
      navList.classList.toggle('flex');
    });
  }

  // Close mobile menu when clicking a nav item
  const navItems = document.querySelectorAll('nav ul a');
  navItems.forEach(item => {
    item.addEventListener('click', function() {
      if (window.innerWidth < 768) { // Only on mobile
        navList.classList.add('hidden');
        navList.classList.remove('flex');
        if (hamburger.classList.contains('active')) {
          hamburger.classList.remove('active');
        }
      }
    });
  });

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId !== '#') {
        e.preventDefault();
        const targetElement = document.querySelector(targetId);

        if (targetElement) {
          const navHeight = navbar.offsetHeight;
          const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
          const offsetPosition = targetPosition - navHeight - 20; // 20px extra padding

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      }
    });
  });

  // Hide/show navbar on scroll
  window.addEventListener('scroll', function() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (scrollTop > lastScrollTop && scrollTop > 150) {
      navbar.classList.add('translate-y-[-100%]');
      navbar.classList.remove('translate-y-0');
    } else {
      navbar.classList.remove('translate-y-[-100%]');
      navbar.classList.add('translate-y-0');
    }

    lastScrollTop = scrollTop;
  });

  // Animate sections on scroll
  const animateOnScroll = function() {
    const sections = document.querySelectorAll('section');

    sections.forEach(section => {
      const sectionTop = section.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;

      if (sectionTop < windowHeight - 100) {
        section.classList.add('animate-fadeIn');
      }
    });
  };

  animateOnScroll();
  window.addEventListener('scroll', animateOnScroll);

  // Email signup form handling
  const emailForm = document.querySelector('.signup-form');
  const emailInput = document.getElementById('email-input');
  const signupButton = document.getElementById('signup-button');
  const signupMessage = document.getElementById('signup-message');

  if (emailForm && emailInput && signupButton && signupMessage) {
    emailForm.addEventListener('submit', async function(e) {
      e.preventDefault(); // Prevent default form submission

      const email = emailInput.value.trim();

      // Basic client-side validation (HTML5 pattern attribute also helps)
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (email === '' || !emailPattern.test(email)) {
        signupMessage.textContent = 'Please enter a valid email address.';
        signupMessage.className = 'mt-4 text-sm text-red-600'; // Style for error
        return;
      }

      // Disable button and show loading message
      signupButton.disabled = true;
      signupButton.textContent = 'Signing Up...';
      signupMessage.textContent = ''; // Clear previous messages

      try {
        // Send the email to your backend API
        // Replace '/api/subscribe' with your actual backend endpoint
        const response = await fetch('/api/subscribe', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email: email }),
        });

        const responseData = await response.json();

        if (response.ok) {
          signupMessage.textContent = responseData.message || 'Thank you for subscribing!';
          signupMessage.className = 'mt-4 text-sm text-green-600'; // Style for success
          emailInput.value = ''; // Clear the input field
        } else {
          // Handle errors from the backend
          signupMessage.textContent = responseData.message || 'Subscription failed. Please try again.';
          signupMessage.className = 'mt-4 text-sm text-red-600'; // Style for error
        }
      } catch (error) {
        // Handle network errors or other issues with the fetch call
        console.error('Subscription error:', error);
        signupMessage.textContent = 'An error occurred. Please try again later.';
        signupMessage.className = 'mt-4 text-sm text-red-600'; // Style for error
      } finally {
        // Re-enable the button
        signupButton.disabled = false;
        signupButton.textContent = 'Sign Up';
      }
    });
  }
  //email handling

  // Toggle animation classes for testimonials
  const testimonials = document.querySelectorAll('.testimonial-carousel > div');
  const dots = document.querySelectorAll('#testimonials .flex.justify-center button');
  let testimonialInterval;

  if (testimonials.length > 0 && dots.length > 0) {
    const autoRotateTestimonials = () => {
      let currentIndex = 0;
      testimonialInterval = setInterval(() => {
        dots[currentIndex].click();
        currentIndex = (currentIndex + 1) % testimonials.length;
      }, 5000); // Change testimonial every 5 seconds
    };

    const handleTestimonialClick = (dot, index) => {
      dot.addEventListener('click', () => {
        // Remove active class from all testimonials and dots
        testimonials.forEach(t => {
          t.classList.remove('opacity-100');
          t.classList.add('opacity-0');
        });
        dots.forEach(d => d.classList.replace('bg-[#ff7043]', 'bg-[#ffb8a3]'));

        // Add active class to selected testimonial and dot
        testimonials[index].classList.remove('opacity-0');
        testimonials[index].classList.add('opacity-100');
        dot.classList.replace('bg-[#ffb8a3]', 'bg-[#ff7043]');
      });
    };

    dots.forEach(handleTestimonialClick);

    // Start auto-rotation
    autoRotateTestimonials();

    // Pause on hover
    const testimonialCarousel = document.querySelector('.testimonial-carousel');
    if (testimonialCarousel) {
      testimonialCarousel.addEventListener('mouseenter', () => {
        clearInterval(testimonialInterval);
      });

      // Resume on mouse leave
      testimonialCarousel.addEventListener('mouseleave', () => {
        autoRotateTestimonials();
      });
    }
  }

  // Add page loaded animation
  window.addEventListener('load', function() {
    document.body.classList.add('opacity-100');
    document.body.classList.remove('opacity-0');
  });
});
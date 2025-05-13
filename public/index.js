document.addEventListener('DOMContentLoaded', function() {
  // Updated selectors to match HTML structure
  const hamburger = document.getElementById('hamburger');
  const navList = document.querySelector('nav ul');
  const navbar = document.querySelector('nav');
  let lastScrollTop = 0;
  
  // Hamburger menu toggle
  if (hamburger) {
    hamburger.addEventListener('click', function() {
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
  if (emailForm) {
    emailForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const emailInput = document.getElementById('email-input');
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      
      if (emailInput.value.trim() !== '' && emailPattern.test(emailInput.value)) {
        alert('Thank you for signing up! We\'ll keep you updated on all We Belong events.');
        emailInput.value = '';
      } else {
        alert('Please enter a valid email address.');
      }
    });
  }
  
  // Toggle animation classes for testimonials
  const testimonials = document.querySelectorAll('.testimonial-carousel > div');
  if (testimonials.length > 0) {
    const dots = document.querySelectorAll('#testimonials .flex.justify-center button');
    if (dots.length > 0) {
      dots.forEach((dot, index) => {
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
      });
    }
  }
  
  // Add page loaded animation
  window.addEventListener('load', function() {
    document.body.classList.add('opacity-100');
    document.body.classList.remove('opacity-0');
  });
});

// Add to the updated JavaScript //remove if error
let testimonialInterval;
const autoRotateTestimonials = () => {
  let currentIndex = 0;
  testimonialInterval = setInterval(() => {
    currentIndex = (currentIndex + 1) % testimonials.length;
    dots[currentIndex].click();
  }, 5000); // Change testimonial every 5 seconds
};

// Start auto-rotation
autoRotateTestimonials();

// Pause on hover
document.querySelector('.testimonial-carousel').addEventListener('mouseenter', () => {
  clearInterval(testimonialInterval);
});

// Resume on mouse leave
document.querySelector('.testimonial-carousel').addEventListener('mouseleave', () => {
  autoRotateTestimonials();
});
/* Product Slider JS 
 Load Swiper from a CDN for development (faster & always updated)
 Consider hosting Swiper files locally in Shopify's assets for production stability
 */

// Initialize Swiper when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', function () {
  // Load CSS first to prevent FOUC (Flash of Unstyled Content)
  const swiperStyles = document.createElement('link');
  swiperStyles.rel = 'stylesheet';
  swiperStyles.href = 'https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css';
  document.head.appendChild(swiperStyles);

  // Load Swiper JS with proper error handling
  const swiperScript = document.createElement('script');
  swiperScript.src = 'https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js';
  swiperScript.async = true;

  // Success handler
  swiperScript.onload = function () {
    initializeSwipers();
  };

  // Error handler
  swiperScript.onerror = function () {
    console.error('Failed to load Swiper from primary CDN, trying fallback...');
    // Load from fallback CDN (unpkg)
    const fallbackScript = document.createElement('script');
    fallbackScript.src = 'https://unpkg.com/swiper@11/swiper-bundle.min.js';
    fallbackScript.async = true;
    fallbackScript.onload = initializeSwipers;
    document.head.appendChild(fallbackScript);
  };

  document.head.appendChild(swiperScript);
});

function initializeSwipers() {
  // Find all product slider sections
  const productSliders = document.querySelectorAll('.product-slider[data-section-id]');

  // Initialize each slider separately
  productSliders.forEach(function (sliderSection) {
    const sectionId = sliderSection.getAttribute('data-section-id');
    const swiperElement = sliderSection.querySelector('.product-slider__swiper');

    // Find navigation and pagination elements for this specific section
    const nextButton = document.getElementById(`next-${sectionId}`);
    const prevButton = document.getElementById(`prev-${sectionId}`);
    const pagination = sliderSection.querySelector('.swiper-pagination');

    // Initialize this specific Swiper instance
    new Swiper(swiperElement, {
      slidesPerView: 1.2,
      spaceBetween: 12,
      loop: false,
      keyboard: {
        enabled: true,
        onlyInViewport: true,
      },

      navigation: {
        nextEl: nextButton,
        prevEl: prevButton,
      },

      pagination: {
        el: pagination,
        clickable: true,
      },

      breakpoints: {
        360: {
          slidesPerView: 1.5,
          spaceBetween: 24,
        },
        768: {
          slidesPerView: 3.5,
          spaceBetween: 32,
        },
        990: {
          slidesPerView: 4.2,
          spaceBetween: 32,
        },
        1440: {
          slidesPerView: 4.5,
          spaceBetween: 32,
        },
      },
    });
  });
}

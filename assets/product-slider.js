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
    initializeSwiper();
  };

  // Error handler
  swiperScript.onerror = function () {
    console.error('Failed to load Swiper from primary CDN, trying fallback...');
    // Load from fallback CDN (unpkg)
    const fallbackScript = document.createElement('script');
    fallbackScript.src = 'https://unpkg.com/swiper@11/swiper-bundle.min.js';
    fallbackScript.async = true;
    fallbackScript.onload = initializeSwiper;
    document.head.appendChild(fallbackScript);
  };

  document.head.appendChild(swiperScript);
});

function initializeSwiper() {
  new Swiper('.swiper', {
    slidesPerView: 1.2,
    spaceBetween: 12,
    loop: false,
    keyboard: {
      enabled: true,
      onlyInViewport: true,
    },

    breakpoints: {
      360: {
        // added breakpoint to inmprove user experience : nº slides to show
        slidesPerView: 1.5,
        spaceBetween: 24,
        navigation: false,
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
        },
      },
      768: {
        slidesPerView: 3.5,
        spaceBetween: 32,
        navigation: false,
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
        },
      },
      990: {
        // added breakpoint to inmprove user experience : nº slides to show
        slidesPerView: 4.2,
        spaceBetween: 32,
        navigation: false,
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
        },
      },
      1440: {
        slidesPerView: 4.5,
        spaceBetween: 32,
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
        pagination: false,
      },
    },
  });
}

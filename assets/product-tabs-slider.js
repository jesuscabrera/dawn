document.addEventListener('DOMContentLoaded', function () {
  // Wait for Swiper to be available
  if (typeof Swiper === 'undefined') {
    console.error('Swiper not loaded');
    return;
  }
  // Initialize each product tabs slider separately
  document.querySelectorAll('.product-tabs-slider').forEach(function (sliderSection) {
    const sectionId = sliderSection.getAttribute('data-section-id');

    // Store Swiper instances for this specific section
    let swiperInstances = {};

    // Initialize first tab's Swiper
    swiperInstances[`tab1-${sectionId}`] = new Swiper(`.swiper-tab1-${sectionId}`, {
      slidesPerView: 1.2,
      spaceBetween: 12,
      loop: false,
      pagination: {
        el: `.swiper-tab1-${sectionId} .swiper-pagination`,
        clickable: true,
      },
      navigation: {
        nextEl: `#next-tab1-${sectionId}`,
        prevEl: `#prev-tab1-${sectionId}`,
      },
      breakpoints: {
        1440: {
          slidesPerView: 4.5,
          spaceBetween: 32,
          navigation: {
            nextEl: `#next-tab1-${sectionId}`,
            prevEl: `#prev-tab1-${sectionId}`,
          },
          pagination: false,
        },
      },
    });

    // Tab switching functionality
    const tabs = sliderSection.querySelectorAll('.tab');
    const tabContents = sliderSection.querySelectorAll('.tab-content');

    tabs.forEach((tab) => {
      tab.addEventListener('click', () => {
        sliderSection.querySelectorAll('.tab').forEach((t) => t.classList.remove('active'));
        sliderSection.querySelectorAll('.tab-content').forEach((c) => c.classList.remove('active'));

        tab.classList.add('active');
        const tabId = tab.getAttribute('data-tab');
        document.getElementById(tabId).classList.add('active');

        if (tabId === `tab2-${sectionId}` && !swiperInstances[tabId]) {
          swiperInstances[tabId] = new Swiper(`.swiper-tab2-${sectionId}`, {
            slidesPerView: 1.2,
            spaceBetween: 12,
            loop: false,
            pagination: {
              el: `.swiper-tab2-${sectionId} .swiper-pagination`,
              clickable: true,
            },
            navigation: {
              nextEl: `#next-tab2-${sectionId}`,
              prevEl: `#prev-tab2-${sectionId}`,
            },
            breakpoints: {
              1440: {
                slidesPerView: 4.5,
                spaceBetween: 32,
                navigation: {
                  nextEl: `#next-tab2-${sectionId}`,
                  prevEl: `#prev-tab2-${sectionId}`,
                },
                pagination: false,
              },
            },
          });
        }
        // Update Swiper instances to refresh their size and position
        if (swiperInstances[tabId]) {
          swiperInstances[tabId].update();
        }
      });
    });
  });
});

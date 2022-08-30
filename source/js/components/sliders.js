import Swiper from '../vendor/swiper';


for (const mobileSlider of document.querySelectorAll('.mobile-slider')) {
  if (mobileSlider) {
    (function () {
      "use strict";

      const breakpoint = window.matchMedia("(min-width:1240px)");
      let slider;

      const enableSwiper = function () {
        slider = new Swiper(mobileSlider, {
          slidesPerView: 'auto',
          slidesPerColumn: 3,
          slidesPerColumnFill:"row",
          spaceBetween: 20,
          freeMode: true,
          observer: true,
          observeParents: true
        });
      };

      const breakpointChecker = function () {
        if (breakpoint.matches === true) {
          if (slider !== undefined) slider.destroy(true, true);

          return;
        } else if (breakpoint.matches === false) {
          return enableSwiper();
        }
      };

      breakpoint.addListener(breakpointChecker);
      breakpointChecker();
    })();
  }

}





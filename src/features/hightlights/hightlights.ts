import gsap from 'gsap';
import Swiper from 'swiper';
import { Keyboard, Pagination, Autoplay, Navigation } from 'swiper/modules';
import { documentLock, documentUnlock } from '../../shared';
// import 'swiper/css';

export function hightlights(): void {
   const hightlights = document.querySelectorAll<HTMLElement>('[data-hightlights]');

   if (!hightlights || !hightlights.length) return;

   function animateContentMount(target: HTMLElement) {
      const timeline = gsap.timeline();

      timeline.to(target, { display: 'block', opacity: 1 });
      console.log('mount', target);

      return timeline;
   }
   function animateContentUnmount(target: HTMLElement) {
      const timeline = gsap.timeline();

      timeline.to(target, { display: 'none', opacity: 0 });
      console.log('unmount', target);

      return timeline;
   }

   function sliderInit(target: HTMLElement) {
      const bulletActiveClass = 'swiper-pagination-bullet-active';
      const sliderDelay = 5000;
      const sliderHightlights = new Swiper(target.querySelector<HTMLElement>('.swiper'), {
         modules: [Keyboard, Pagination, Autoplay, Navigation],
         pagination: {
            el: '.swiper-pagination',
            clickable: true,
            bulletActiveClass: bulletActiveClass,
            renderBullet: function (_, className) {
               return /*html*/ `<span class='${className}'><i></i></span>`;
            },
         },

         navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
         },
         autoplay: {
            delay: sliderDelay,
            pauseOnMouseEnter: true,
         },
         speed: 500,
         slidesPerView: 1,
         centeredSlides: true,
         loop: true,
         keyboard: {
            enabled: true,
         },
      });
   }

   hightlights.forEach(hightlight => {
      hightlight.addEventListener('click', event => {
         const clickEventPath = event.composedPath();
         const hightlightsContentBlocks = hightlight.querySelectorAll<HTMLElement>(
            '[data-hightlights-content]',
         );
         const hightlightsInitButtons =
            hightlight.querySelectorAll<HTMLElement>('[data-hightlights-init]');
         const hightlightsBackLinks = hightlight.querySelectorAll<HTMLElement>(
            '[data-hightlights-backlink]',
         );

         if (
            !hightlightsContentBlocks ||
            !hightlightsContentBlocks.length ||
            !hightlightsInitButtons ||
            !hightlightsInitButtons.length
         )
            return;

         hightlightsBackLinks.forEach((link, index) => {
            if (clickEventPath.includes(link)) {
               hightlightsContentBlocks[index] &&
                  animateContentUnmount(hightlightsContentBlocks[index]).play();
               documentUnlock();
            }
         });

         hightlightsInitButtons.forEach((button, index) => {
            if (clickEventPath.includes(button)) {
               hightlightsContentBlocks[index] && sliderInit(hightlightsContentBlocks[index]);
               hightlightsContentBlocks[index] &&
                  animateContentMount(hightlightsContentBlocks[index]).play();
               documentLock();
            }
         });
      });
   });

   // hightlightsContentBlocks.forEach(item => {
   //    const bulletActiveClass = 'swiper-pagination-bullet-active';
   //    const sliderDelay = 5000;
   //    const sliderHightlights = new Swiper(item.querySelector<HTMLElement>('.swiper'), {
   //       modules: [Keyboard, Pagination, Autoplay, Navigation],
   //       // If we need pagination
   //       pagination: {
   //          el: '.swiper-pagination',
   //          clickable: true,
   //          bulletActiveClass: bulletActiveClass,
   //          renderBullet: function (_, className) {
   //             return /*html*/ `<span class='${className}'><i></i></span>`;
   //          },
   //       },

   //       // Navigation arrows
   //       navigation: {
   //          nextEl: '.swiper-button-next',
   //          prevEl: '.swiper-button-prev',
   //       },
   //       autoplay: {
   //          delay: sliderDelay,
   //          pauseOnMouseEnter: true,
   //       },
   //       speed: 500,
   //       // initialSlide: 2,
   //       slidesPerView: 1,
   //       centeredSlides: true,
   //       loop: true,
   //       keyboard: {
   //          enabled: true,
   //       },
   //    });
   // });
}

import { getCoords } from '../../shared';
import Swiper from 'swiper';
import { Autoplay } from 'swiper/modules';
// import 'swiper/css';

export function pageCases(screenWidth: number = 991.98): void {
   const mediaQuery = window.matchMedia(`(max-width: ${screenWidth}px)`);

   // move image description
   function moveTexts(textSelector: string, targetSelector: string) {
      const texts: HTMLElement[] = Array.from(
            document.querySelectorAll(textSelector),
         ),
         target = document.querySelector(targetSelector);

      if (texts.length) {
         texts.forEach(text => {
            const textParent = text.parentElement;

            if (mediaQuery.matches) {
               target.prepend(text);
               textParent.remove();
            }

            mediaQuery.onchange = e => {
               if (e.matches) target.prepend(text);
               if (!e.matches) textParent.prepend(text);
            };
         });
      }
   }
   moveTexts('figcaption .two-rows-fw-image__text', '.two-rows-fw-image__body');

   // position card-circle
   function positionCircle(circle: string) {
      const circleItem: HTMLElement = document.querySelector(circle);
      const baseCircleElement: HTMLElement = mediaQuery.matches
         ? document.querySelector('.two-rows-fw-image__head')
         : document.querySelector('.image-full-width:last-child');

      if (!circleItem || !baseCircleElement) return;

      // for checking if only one image on the page
      const isOneImage =
         Array.from(document.querySelectorAll('.image-full-width')).length ===
            1 &&
         !document.querySelector('.two-rows-fw-image__image + figcaption');

      const {
         left,
         top,
         right,
         height: baseHeight,
      } = getCoords(baseCircleElement);
      const { width, height } = circleItem.getBoundingClientRect();

      const circleY = mediaQuery.matches
         ? `${top - 35}px`
         : isOneImage
           ? `${top + baseHeight / 2 - height / 4}px`
           : `${top - height / 5}px`;
      const circleX = mediaQuery.matches
         ? `${right - width / 1.8}px`
         : `${left - width / 3}px`;

      circleItem.style.top = circleY;
      circleItem.style.left = circleX;
   }

   // add swiper class to images container
   function initImageSlider(sliderSelector: string) {
      const swiperBlock: HTMLElement = document.querySelector(sliderSelector);

      if (!swiperBlock) return;

      const isOneSlide =
         Array.from(swiperBlock.querySelectorAll('.swiper-slide')).length <= 1;

      if (isOneSlide) return;

      if (mediaQuery.matches) {
         swiperBlock.classList.add('swiper');
         sliderInit(swiperBlock);
      }
   }

   positionCircle('.page-cases .card-circle');
   initImageSlider('.two-rows-fw-image__image');

   // init swiper
   function sliderInit(item: HTMLElement) {
      const sliderCases = new Swiper(item, {
         modules: [Autoplay],
         speed: 500,
         centeredSlides: true,
         loop: true,
         autoplay: {
            delay: 2500,
            disableOnInteraction: false,
         },
      });
   }
}

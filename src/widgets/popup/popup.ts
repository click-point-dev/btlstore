import gsap from 'gsap';
// import { documentLock } from '../../shared';

export function popup(): void {
   const popups: HTMLElement[] = gsap.utils.toArray('.popup');

   if (!popups.length) return;

   popups.forEach(item => {
      //gsap animation
      const timeline = gsap.timeline({
         paused: true,
      });

      timeline
         .to(item, {
            css: {
               display: 'flex',
               visibility: 'visible',
               pointerEvents: 'all',
            },
            duration: 0,
         })
         .from(
            item,
            {
               top: '-100%',
               opacity: 0,
               duration: 0.7,
               ease: 'back.out(0.5)',
            },
            '+=0.5',
         );

      //open popup
      const collerButtons: HTMLElement[] = Array.from(
         document.querySelectorAll('.button[data-popup-type]'),
      );

      collerButtons.forEach(button => {
         button.addEventListener('click', function (e) {
            const target = e.currentTarget as HTMLElement;
            const collerType = target.dataset.popupType;

            showPopup(timeline, item, collerType);
         });
      });

      // close popup
      item
         .querySelector('.popup__close')
         .addEventListener('click', function () {
            const html = document.documentElement;
            html.classList.contains('popup-shown') &&
               html.classList.remove('popup-shown');

            timeline.reverse();
         });
   });

   function showPopup(
      timeline: gsap.core.Timeline,
      item: HTMLElement,
      collerType: string,
   ) {
      const popupType = item.dataset.popupType;
      // const closeButton = item.querySelector('[data-popup-close]')

      if (popupType === collerType) {
         const html = document.documentElement;
         !html.classList.contains('popup-shown') &&
            html.classList.add('popup-shown');

         timeline.play();
      }
   }
}

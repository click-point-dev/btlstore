import gsap from 'gsap';

// type detailsSpacingsType = {
//    [key: string]: any;
//    paddingTop: string;
//    marginTop: string;
//    paddingBottom: string;
//    marginBottom: string;
// };

export function spoller2() {
   function createSpoller(spoller: HTMLElement) {
      const activeClass = '_spoller-active';
      const spollerSelector = gsap.utils.selector(spoller);
      const spollerItems = spollerSelector('& > li');
      const duration = parseInt(spoller.getAttribute('data-duration')) / 1000;

      if (!spollerItems || !spollerItems.length)
         throw new Error('Invalid spoiler structure. Item must be LI element');

      const spollerParent = spoller.closest('.spoller-with-image-widget');
      let spollerImages: HTMLImageElement[] | null;

      spollerItems.forEach(item => {
         const itemDetails = item.querySelector('[data-spoller]').nextElementSibling;

         gsap.set(itemDetails, {
            height: '0px',
            // paddingTop: '0px',
            // paddingBottom: '0px',
            // paddingBlock: '0px',
            // marginTop: '0px',
            // marginBottom: '0px',
            marginBlock: '0px',
         });
      });

      if (spollerParent) {
         spollerImages = gsap.utils.toArray('img', spollerParent);

         spollerImages &&
            spollerImages.length > 0 &&
            spollerImages.forEach((image, index, array) => {
               if (index !== 2 && index !== array.length - 1) {
                  gsap.set(image, { zIndex: 'unset', opacity: 0 });
               }
            });
      }

      function open(target: GSAPTweenTarget, imageIndex?: number) {
         const tl = gsap.timeline({
            paused: true,
            defaults: { duration: duration ? duration : 0.3 },
         });

         if (spollerImages && spollerImages.length > 0) {
            return tl
               .to(target, { height: 'auto', marginBlock: '20px' })
               .to(spollerImages[imageIndex], { zIndex: 10, opacity: 1 }, '-=0.3');
         } else {
            return tl.to(target, {
               height: 'auto',
               marginBlock: '20px',
            });
         }
      }

      function close(target: GSAPTweenTarget, imageIndex?: number) {
         const tl = gsap.timeline({ paused: true });

         if (spollerImages && spollerImages.length > 0) {
            return tl
               .to(target, { height: '0px', marginBlock: '0px' })
               .to(spollerImages[imageIndex], { zIndex: 0, opacity: 0 });
         } else {
            return tl.to(target, { height: '0px', marginBlock: '0px' });
         }
      }

      spoller.addEventListener('click', function (event) {
         const clickEventPath = event.composedPath();

         spollerItems.forEach((item, itemIndex) => {
            const button = item.querySelector('[data-spoller]') as HTMLElement;
            const isActive = button.classList.contains(activeClass);
            const details = button.nextElementSibling;
            const targetPrototype = event.target.constructor?.name;

            if (!clickEventPath.includes(item)) {
               button.classList.remove(activeClass);
               close(details, itemIndex).play();
            }
            if (clickEventPath.includes(item)) {
               if (
                  (targetPrototype === 'HTMLButtonElement' && !clickEventPath.includes(button)) ||
                  targetPrototype === 'HTMLAnchorElement'
               )
                  return;
               button.classList.toggle(activeClass, !isActive);
               !isActive ? open(details, itemIndex).play() : close(details, itemIndex).play();
               // open(details, itemIndex).play();
            }
         });
      });
   }

   function initSpoilers() {
      const spollers = document.querySelectorAll<HTMLElement>('.spollers');
      if (!spollers || !spollers.length) return;
      spollers.forEach(createSpoller);
   }
   initSpoilers();
}

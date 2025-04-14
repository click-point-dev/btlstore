import gsap from 'gsap';
import { isHoverableDevice } from '../../shared';

export function subList(): void {
   const sublists = Array.from(document.querySelectorAll('.sub-list'));
   if (!sublists.length) return;

   const openedClass = 'sub-list-open';

   function gsapAnimate(element: Element, elemItemsClass: string) {
      const item = gsap.utils.selector(element)(elemItemsClass);
      const tlSubList = gsap.timeline({ paused: true });
      tlSubList
         .to(element, {
            transformOrigin: 'center top',
            opacity: 1,
            scaleY: 1,
            // height: 'auto',
            paddingTop: 16,
            paddingBottom: 16,
            duration: 0.5,
            ease: 'power4.inOut',
            // delay: 0.2,
         })
         .to(item, {
            stagger: 0.1,
            x: 0,
            opacity: 1,
            // duration: 0.5,
            delay: -0.5,
            ease: 'power4.inOut',
         });

      return tlSubList;
   }

   sublists.forEach(sublist => {
      const parentEl = sublist.parentElement;
      if (parentEl.tagName !== 'LI') return;

      const link = sublist.previousSibling || sublist.nextSibling;
      const tlSubList = gsapAnimate(sublist, '.sub-list__item');
      let isOpen: boolean;

      function handleOpen() {
         // console.log('Open animation');
         parentEl.classList.add(openedClass);
         tlSubList.play();
         isOpen = true;
      }

      function handleClose() {
         // console.log('Close animation');
         parentEl.classList.remove(openedClass);
         tlSubList.reverse();
         isOpen = false;
      }

      function handleTabKey() {
         const items: Element[] =
            gsap.utils.selector(sublist)('.sub-list__item a');
         if (!items.length) return;

         items.forEach(item => {
            item.addEventListener('focus', e => {
               handleOpen();
               return;
            });
         });
      }
      handleTabKey();

      document.addEventListener('keyup', e => {
         if (e.key === 'Escape' || e.keyCode === 27) handleClose();
         return;
      });

      if (!isHoverableDevice()) {
         document.addEventListener('click', e => {
            if (e.target === link && !isOpen) {
               handleOpen();
               return;
            }
            if (e.target !== link && isOpen) {
               handleClose();
               return;
            }
            if (e.target === link && isOpen) {
               handleClose();
               return;
            }
         });
      }

      if (isHoverableDevice()) {
         parentEl.addEventListener('mouseenter', () => {
            handleOpen();
            return;
         });
         parentEl.addEventListener('mouseleave', () => {
            handleClose();
            return;
         });
      }
   });
}

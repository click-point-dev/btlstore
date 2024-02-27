import gsap from 'gsap';
import { isHoverableDevice } from '../../shared';

export function subList(): void {
   const subList = document.querySelectorAll('.sub-list');

   openSubList(subList, 'sub-list-open');
}

function openSubList(subList: NodeListOf<Element>, openedClass: string) {
   subList.forEach(list => {
      const listParent = list.parentElement;
      if (listParent.tagName !== 'LI') return;

      const parentLink = list.previousSibling || list.nextSibling;

      const tlSubList = gsap.timeline({ paused: true });
      tlSubList
         .to(list, {
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
         .to('.sub-list__item', {
            stagger: 0.1,
            x: 0,
            opacity: 1,
            // duration: 0.5,
            delay: -0.5,
            ease: 'power4.inOut',
         });

      function takeEffect() {
         if (!listParent.classList.contains(openedClass)) {
            listParent.classList.add(openedClass);
            tlSubList.play();
            return;
         }

         if (listParent.classList.contains(openedClass)) {
            listParent.classList.remove(openedClass);
            tlSubList.reverse();
            return;
         }
      }

      if (isHoverableDevice()) {
         listParent.addEventListener('mouseenter', () => {
            takeEffect();
         });
         listParent.addEventListener('mouseleave', () => {
            takeEffect();
         });
      }

      if (!isHoverableDevice()) {
         parentLink.addEventListener('click', () => {
            takeEffect();
         });
      }
   });
}

import gsap from 'gsap';

export function headerMenu(): void {
   const header = document.querySelector('.header');
   const burgerIcon = header.querySelector('.burger');

   if (!header || !burgerIcon) return;

   if (window.getComputedStyle(burgerIcon).display !== 'none') {
      replaceSubList(header);
      openBurger(header, burgerIcon);
   }
}

function replaceSubList(header: Element) {
   const sublist = header.querySelector('.sub-list');
   const subListItems = sublist.querySelectorAll('.sub-list__item');
   const listItems = header.querySelector('.header-menu__list');

   if (!sublist || !subListItems.length || !listItems) return;

   sublist.closest('.header-menu__item').remove();
   sublist.remove();

   Array.from(subListItems)
      .reverse()
      .forEach(item => {
         item.className = 'header-menu__item';
         item.firstElementChild.className = 'header-menu__link link-header';
         listItems.prepend(item);
      });
}

function openBurger(header: Element, burgerIcon: Element) {
   if (!burgerIcon) return;

   const tl = gsap.timeline({ paused: true });
   tl.to('.header-menu', {
      transformOrigin: 'center top',
      scale: '1 1',
      paddingTop: 6,
      paddingBottom: 16,
      duration: 0.6,
      ease: 'power4.inOut',
      // delay: 0.2,
   })
      // .to('.header-menu__list', { opacity: 1, duration: 0.2 })
      // .add('opacity+0.1', '+=0.1')
      .from('.header-menu__item', {
         stagger: 0.1,
         x: '-120%',
         duration: 0.3,
         ease: 'power4.inOut',
         delay: -0.4,
      })
      .from('.header-menu__cta', {
         // opacity: 0,
         x: '-120%',
         duration: 0.2,
         ease: 'power4.inOut',
      });

   burgerIcon.addEventListener('click', () => {
      if (header.classList.contains('open')) {
         header.classList.remove('open');
         tl.reverse();
      } else {
         header.classList.add('open');
         tl.play();
      }
   });
}

import { checkViewportWidth } from '../checkViewportWidth';

export function hideShowElement(): void {
   const elements = document.querySelectorAll('[data-visible-on]');
   if (elements.length === 0) return;

   elements.forEach((elem: HTMLElement) => {
      const mediaQuery = `(${elem.dataset.visibleOn})`;

      // console.log(checkViewportWidth(mediaQuery), mediaQuery);

      checkViewportWidth(mediaQuery)
         ? (elem.style.display = 'unset')
         : (elem.style.display = 'none');
   });
}

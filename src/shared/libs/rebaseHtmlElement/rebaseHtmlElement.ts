import { checkViewportWidth } from '../checkViewportWidth';

export function rebaseHtmlElement(
   element: HTMLElement,
   target: HTMLElement,
   condition?: boolean,
): void {
   function rebase() {
      target.insertAdjacentElement('afterbegin', element);
      // element.remove();
   }
   console.log(typeof condition !== 'undefined', condition);
   typeof condition !== 'undefined' && condition && rebase();
   typeof condition === 'undefined' && rebase();

   //bug вешает вкладку при изменении размера экрана
   // function callback() {
   //    condition && condition && rebaseHtmlElement(element, target, condition);
   //    !condition && rebaseHtmlElement(element, target, condition);
   // }

   // window.removeEventListener('resize', callback);
   // window.addEventListener('resize', callback);
}

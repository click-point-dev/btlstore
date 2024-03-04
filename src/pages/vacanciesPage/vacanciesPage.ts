import { insertContent } from '../../shared';

export function vacanciesPage(): void {
   const ctaButtons: HTMLElement[] = Array.from(
      document.querySelectorAll('.vacancy__cta [data-popup-type]'),
   );

   if (!ctaButtons.length) return;

   ctaButtons.forEach(button => {
      const vacancyName = button
         .closest('.vacancy__body')
         .querySelector('.vacancy__name').textContent;

      const placeholder: HTMLElement = document.querySelector(
         '.full-width-form__vacancy-title',
      );

      button.onclick = () => insertContent(vacancyName, placeholder);
   });
}

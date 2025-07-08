import { casesData } from '../../entities';
import { isAvailableUrl } from '../../shared';
import { casesCardsWidget } from '../../widgets';
import DOMPurify from 'dompurify';

export function prPage(): void {
   if (!isAvailableUrl('pr')) return;

   // рендер карточек в портвфолио
   const portfolioBlock = document.querySelector(
      '[data-portfolio]',
   ) as HTMLDivElement;

   if (portfolioBlock) {
      const clear = DOMPurify.sanitize(
         casesCardsWidget(casesData, false, { type: 'PR' }),
         { USE_PROFILES: { svg: true, svgFilters: true, html: true } },
      );

      portfolioBlock.innerHTML = clear;
   }

   //    // инициализация слайдера в кейсах
   //    const circlesSliders = Array.from(
   //       document.querySelectorAll('.corporate-events .slider-cases'),
   //    );
   //    if (circlesSliders.length > 0) {
   //       checkViewportWidth('(max-width: 1439px)') && sliderCases();
   //    }
}

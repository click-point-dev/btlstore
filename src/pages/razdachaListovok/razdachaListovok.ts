import { checkViewportWidth, isAvailableUrl } from '../../shared';
import DOMPurify from 'dompurify';
import { casesCardsWidget, sliderCases } from '../../widgets';
import { casesData, citiesBtlData, citiesRazdachaListovokData } from '../../entities';
import { renderCitiesList } from '../../features';

export function razdachaListovok(): void {
   if (!isAvailableUrl('razdacha-listovok')) return;

   // рендер списка городов
   const citiesListPlaceholder = document.querySelector('[data-links-list]') as HTMLElement;
   citiesListPlaceholder && renderCitiesList(citiesListPlaceholder, citiesRazdachaListovokData);

   // рендер карточек в портвфолио
   const portfolioBlock = document.querySelector('[data-portfolio]') as HTMLDivElement;

   if (portfolioBlock) {
      const clean = DOMPurify.sanitize(
         casesCardsWidget(casesData, true, {
            id: ['0019', '0020', '0021', '0022', '0023', '0007', '0011'],
         }),
         {
            USE_PROFILES: { svg: true, svgFilters: true, html: true },
         },
      );

      portfolioBlock.innerHTML = clean;
   }

   // инициализация слайдера в кейсах
   const circlesSliders = Array.from(document.querySelectorAll('.razdacha-listovok .slider-cases'));
   if (circlesSliders.length > 0) {
      checkViewportWidth('(max-width: 1439px)') && sliderCases();
   }
}

razdachaListovok();

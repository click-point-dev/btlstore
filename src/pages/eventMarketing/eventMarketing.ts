import { citiesMarketingData } from '../../entities';
import { casesData } from '../../entities/Cases/casesData';
import { renderCitiesList, renderCityTitle } from '../../features';
import { checkViewportWidth, isAvailableUrl } from '../../shared';
import { casesCardsWidget, sliderCases } from '../../widgets';
import DOMPurify from 'dompurify';

export function eventMarketing(): void {
   if (!isAvailableUrl('event-marketing')) return;

   // рендер карточек в портвфолио
   const portfolioBlock = document.querySelector(
      '[data-portfolio]',
   ) as HTMLDivElement;

   // portfolioBlock &&
   //    portfolioBlock.insertAdjacentElement(
   //       'beforeend',
   //       casesCardsWidget(casesData, ['type', ['event']], true),
   //    );

   if (portfolioBlock) {
      const clear = DOMPurify.sanitize(
         casesCardsWidget(casesData, ['type', ['event']], true),
         { USE_PROFILES: { svg: true, svgFilters: true, html: true } },
      );

      portfolioBlock.innerHTML = clear;
   }

   // рендер списка городов
   const citiesListPlaceholder = document.querySelector(
      '[data-links-list]',
   ) as HTMLElement;
   citiesListPlaceholder &&
      renderCitiesList(citiesListPlaceholder, citiesMarketingData);

   // рендер названия города в h1
   const cityTitlePlaceholder = document.querySelector(
      '[data-city-title]',
   ) as HTMLElement;
   cityTitlePlaceholder &&
      renderCityTitle(cityTitlePlaceholder, citiesMarketingData);

   // инициализация слайдера в кейсах
   const circlesSliders = Array.from(
      document.querySelectorAll('.corporate-events .slider-cases'),
   );
   if (circlesSliders.length > 0) {
      checkViewportWidth('(max-width: 1439px)') && sliderCases();
   }
}

import { casesData, citiesCorporateData } from '../../entities';
import { renderCitiesList, renderCityTitle } from '../../features';
import { checkViewportWidth, isAvailableUrl } from '../../shared';
import { casesCardsWidget, sliderCases } from '../../widgets';
import DOMPurify from 'dompurify';

export function corporateEvents(): void {
   if (!isAvailableUrl('corporate-events')) return;

   // рендер карточек в портвфолио
   const portfolioBlock = document.querySelector(
      '[data-portfolio]',
   ) as HTMLDivElement;

   // portfolioBlock &&
   //    portfolioBlock.insertAdjacentElement(
   //       'beforeend',
   //       casesCardsWidget(
   //          casesData,
   //          ['id', ['0002', '0003', '0004', '0014', '0024', '0025', '0026']],
   //          true,
   //       ),
   //    );

   if (portfolioBlock) {
      const clear = DOMPurify.sanitize(
         casesCardsWidget(casesData, true, {
            id: [
               '0002',
               '0003',
               '0004',
               '0014',
               '0024',
               '0025',
               '0026',
               '0031',
            ],
         }),
         { USE_PROFILES: { svg: true, svgFilters: true, html: true } },
      );

      portfolioBlock.innerHTML = clear;
   }

   // console.log(readCityByUrl(citiesCorporateData));
   // рендер списка ссылок городов
   const citiesListPlaceholder = document.querySelector(
      '[data-links-list]',
   ) as HTMLElement;
   citiesListPlaceholder &&
      renderCitiesList(citiesListPlaceholder, citiesCorporateData);

   // рендер названия города в h1
   const cityTitlePlaceholder = document.querySelector(
      '[data-city-title]',
   ) as HTMLElement;
   cityTitlePlaceholder &&
      renderCityTitle(cityTitlePlaceholder, citiesCorporateData);

   // инициализация слайдера в кейсах
   const circlesSliders = Array.from(
      document.querySelectorAll('.corporate-events .slider-cases'),
   );
   if (circlesSliders.length > 0) {
      checkViewportWidth('(max-width: 1439px)') && sliderCases();
   }
}

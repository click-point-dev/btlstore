import { renderCitiesList, renderCityTitle } from '../../features';
import { checkViewportWidth, isAvailableUrl } from '../../shared';
import { sliderCases } from '../../widgets';

const citiesMarketingData = [
   {
      city_ru: 'Челябинск',
      city_en: 'chelyabinsk',
      url: '/event-marketing/chelyabinsk',
   },
   {
      city_ru: 'Екатеринбург',
      city_en: 'ekaterinburg',
      url: '/event-marketing/ekaterinburg',
   },
   {
      city_ru: 'Иркутск',
      city_en: 'irkutsk',
      url: '/event-marketing/irkutsk',
   },
   {
      city_ru: 'Краснодар',
      city_en: 'krasnodar',
      url: '/event-marketing/krasnodar',
   },
   {
      city_ru: 'Красноярск',
      city_en: 'krasnoyarsk',
      url: '/event-marketing/krasnoyarsk',
   },
   {
      city_ru: 'Нижний Новгород',
      city_en: 'nizhnii-novgorod',
      url: '/event-marketing/nizhnii-novgorod',
   },
   {
      city_ru: 'Новосибирск',
      city_en: 'novosibirsk',
      url: '/event-marketing/novosibirsk',
   },
   {
      city_ru: 'Омск',
      city_en: 'omsk',
      url: '/event-marketing/omsk',
   },
   {
      city_ru: 'Пермь',
      city_en: 'perm',
      url: '/event-marketing/perm',
   },
   {
      city_ru: 'Самара',
      city_en: 'samara',
      url: '/event-marketing/samara',
   },
   {
      city_ru: 'Саратов',
      city_en: 'saratov',
      url: '/event-marketing/saratov',
   },
   {
      city_ru: 'Томск',
      city_en: 'tomsk',
      url: '/event-marketing/tomsk',
   },
   {
      city_ru: 'Уфа',
      city_en: 'ufa',
      url: '/event-marketing/ufa',
   },
   {
      city_ru: 'Волгоград',
      city_en: 'volgograd',
      url: '/event-marketing/volgograd',
   },
   {
      city_ru: 'Воронеж',
      city_en: 'voronezh',
      url: '/event-marketing/voronezh',
   },
];
export function eventMarketing(): void {
   if (!isAvailableUrl('event-marketing')) return;

   // инициализация слайдера в кейсах
   const circlesSliders = Array.from(
      document.querySelectorAll('.corporate-events .slider-cases'),
   );
   if (circlesSliders.length > 0) {
      checkViewportWidth('(max-width: 1439px)') && sliderCases();
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
}

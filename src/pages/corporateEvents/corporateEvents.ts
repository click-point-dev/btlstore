import { renderCitiesList, renderCityTitle } from '../../features';
import { checkViewportWidth, isAvailableUrl } from '../../shared';
import { sliderCases } from '../../widgets';

const citiesCorporateData = [
   {
      city_ru: 'Челябинск',
      city_en: 'chelyabinsk',
      url: '/corporate-events/chelyabinsk',
   },
   {
      city_ru: 'Екатеринбург',
      city_en: 'ekaterinburg',
      url: '/corporate-events/ekaterinburg',
   },
   {
      city_ru: 'Иркутск',
      city_en: 'irkutsk',
      url: '/corporate-events/irkutsk',
   },
   {
      city_ru: 'Краснодар',
      city_en: 'krasnodar',
      url: '/corporate-events/krasnodar',
   },
   {
      city_ru: 'Красноярск',
      city_en: 'krasnoyarsk',
      url: '/corporate-events/krasnoyarsk',
   },
   {
      city_ru: 'Нижний Новгород',
      city_en: 'nizhnii-novgorod',
      url: '/corporate-events/nizhnii-novgorod',
   },
   {
      city_ru: 'Новосибирск',
      city_en: 'novosibirsk',
      url: '/corporate-events/novosibirsk',
   },
   {
      city_ru: 'Омск',
      city_en: 'omsk',
      url: '/corporate-events/omsk',
   },
   {
      city_ru: 'Пермь',
      city_en: 'perm',
      url: '/corporate-events/perm',
   },
   {
      city_ru: 'Самара',
      city_en: 'samara',
      url: '/corporate-events/samara',
   },
   {
      city_ru: 'Саратов',
      city_en: 'saratov',
      url: '/corporate-events/saratov',
   },
   {
      city_ru: 'Томск',
      city_en: 'tomsk',
      url: '/corporate-events/tomsk',
   },
   {
      city_ru: 'Уфа',
      city_en: 'ufa',
      url: '/corporate-events/ufa',
   },
   {
      city_ru: 'Волгоград',
      city_en: 'volgograd',
      url: '/corporate-events/volgograd',
   },
   {
      city_ru: 'Воронеж',
      city_en: 'voronezh',
      url: '/corporate-events/voronezh',
   },
];

export function corporateEvents(): void {
   if (!isAvailableUrl('corporate-events')) return;

   // инициализация слайдера в кейсах
   const circlesSliders = Array.from(
      document.querySelectorAll('.corporate-events .slider-cases'),
   );
   if (circlesSliders.length > 0) {
      checkViewportWidth('(max-width: 1439px)') && sliderCases();
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
}

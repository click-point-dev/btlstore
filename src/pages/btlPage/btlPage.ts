import gsap from 'gsap';
import { renderCitiesList, renderCityTitle } from '../../features';
import {
   checkViewportWidth,
   dataMediaQueries,
   isAvailableUrl,
} from '../../shared';
import { sliderCases } from '../../widgets';

const citiesBtlData = [
   {
      city_ru: 'Челябинск',
      city_en: 'chelyabinsk',
      url: '/btl/chelyabinsk',
   },
   {
      city_ru: 'Екатеринбург',
      city_en: 'ekaterinburg',
      url: '/btl/ekaterinburg',
   },
   {
      city_ru: 'Иркутск',
      city_en: 'irkutsk',
      url: '/btl/irkutsk',
   },
   {
      city_ru: 'Краснодар',
      city_en: 'krasnodar',
      url: '/btl/krasnodar',
   },
   {
      city_ru: 'Красноярск',
      city_en: 'krasnoyarsk',
      url: '/btl/krasnoyarsk',
   },
   {
      city_ru: 'Нижний Новгород',
      city_en: 'nizhnii-novgorod',
      url: '/btl/nizhnii-novgorod',
   },
   {
      city_ru: 'Новосибирск',
      city_en: 'novosibirsk',
      url: '/btl/novosibirsk',
   },
   {
      city_ru: 'Омск',
      city_en: 'omsk',
      url: '/btl/omsk',
   },
   {
      city_ru: 'Пермь',
      city_en: 'perm',
      url: '/btl/perm',
   },
   {
      city_ru: 'Самара',
      city_en: 'samara',
      url: '/btl/samara',
   },
   {
      city_ru: 'Саратов',
      city_en: 'saratov',
      url: '/btl/saratov',
   },
   {
      city_ru: 'Томск',
      city_en: 'tomsk',
      url: '/btl/tomsk',
   },
   {
      city_ru: 'Уфа',
      city_en: 'ufa',
      url: '/btl/ufa',
   },
   {
      city_ru: 'Волгоград',
      city_en: 'volgograd',
      url: '/btl/volgograd',
   },
   {
      city_ru: 'Воронеж',
      city_en: 'voronezh',
      url: '/btl/voronezh',
   },
];
export function btlPage(): void {
   if (!isAvailableUrl('btl')) return;

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
      renderCitiesList(citiesListPlaceholder, citiesBtlData);

   // рендер названия города в h1
   const cityTitlePlaceholder = document.querySelector(
      '[data-city-title]',
   ) as HTMLElement;
   cityTitlePlaceholder && renderCityTitle(cityTitlePlaceholder, citiesBtlData);

   // view all servicies
   function showAllBtlServices() {
      const services = document.querySelectorAll('[data-btl-service]');
      const parentElement =
         document.querySelector('[data-btl-service]').parentElement;
      const firstRow = document.createElement('div');
      const secondRow = document.createElement('div');

      if (!services.length || !parentElement) return;

      services.forEach((service: HTMLElement, index: number) => {
         index < 3
            ? firstRow.insertAdjacentElement('beforeend', service)
            : secondRow.insertAdjacentElement('beforeend', service);
      });

      [firstRow, secondRow].forEach(item => {
         parentElement.insertAdjacentElement('beforeend', item);
         item.style.cssText = /*style*/ `
         display: flex;
         flex-direction: column;
         gap: 20px;

   `;
      });
      const heigth = secondRow.getBoundingClientRect().height;
      console.log(heigth);
      secondRow.style.height = '0';

      const timeline = gsap.timeline({ paused: true });
      timeline.fromTo(
         secondRow,
         { height: 0, marginTop: 0 },
         { height: heigth, marginTop: '20px' },
      );

      parentElement.insertAdjacentHTML(
         'afterend',
         /*html*/ `
         <div class="button button-color button-xl" style="display:flex; margin-top: 40px;">
            <button>Показать все услуги</button>
         </div>`,
      );
      parentElement.nextElementSibling.addEventListener('click', () =>
         secondRow.getBoundingClientRect().height === 0
            ? timeline.play()
            : timeline.reverse(),
      );
   }
   checkViewportWidth('(max-width: 700px)') && showAllBtlServices();
}

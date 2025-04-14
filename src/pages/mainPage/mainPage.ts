import gsap from 'gsap';
import { CustomEase } from 'gsap/CustomEase';
import { isAvailableUrl } from '../../shared';
import { renderCitiesList } from '../../features';

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

gsap.registerPlugin(CustomEase);

export function mainPage() {
   if (!isAvailableUrl('/')) return;

   const decor = document.querySelector('.first-screen__decor') as HTMLElement;

   if (decor) {
      const animation = gsap.timeline();

      animation
         .from(decor, {
            scale: 0,
            delay: -0.3,
            duration: 4,
            ease: 'power3.out',
         })
         .to(decor, {
            scale: 1.5,
            duration: 190,
            repeat: -1,
            yoyo: true,
            ease: CustomEase.create(
               'custom',
               'M0,0 C0.012,0 0.025,0.066 0.05,0.066 0.1,0.066 0.1,-0.211 0.15,-0.211 0.2,-0.211 0.2,0.363 0.25,0.363 0.3,0.363 0.3,-0.499 0.35,-0.499 0.399,-0.499 0.399,0.461 0.449,0.461 0.499,0.461 0.498,-0.462 0.549,-0.462 0.6,-0.462 0.599,0.409 0.649,0.409 0.7,0.409 0.699,-0.17 0.749,-0.17 0.799,-0.17 0.799,0.114 0.849,0.114 0.899,0.114 0.899,-0.024 0.949,-0.024 0.974,-0.024 0.974,0 1,0 ',
            ),
         });

      animation.play();
   }

   // рендер списка городов
   const citiesListPlaceholder = document.querySelector(
      '[data-links-list]',
   ) as HTMLElement;
   citiesListPlaceholder &&
      renderCitiesList(citiesListPlaceholder, citiesMarketingData);
}

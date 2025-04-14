import { CityData, readCityByUrl } from '../readCityByUrl';

export function renderCitiesList(target: HTMLElement, data: CityData[]): void {
   const currentCity = readCityByUrl(data)?.city_en || null;

   const sortedData = [...data].sort((a, b) =>
      a.city_ru < b.city_ru ? -1 : 1,
   );

   function renderCityItem(target: HTMLElement, href: string, content: string) {
      target.innerHTML += /*html*/ `
<li class="cities__item">
   <a class='cities__link text-xs' href='${href}'>${content}</a>
 </li>
`;
   }

   sortedData.forEach(item => {
      if (!currentCity) renderCityItem(target, item.url, item.city_ru);
      if (
         currentCity &&
         item.city_en.toLowerCase() !== currentCity.toLowerCase()
      )
         renderCityItem(target, item.url, item.city_ru);
   });
}

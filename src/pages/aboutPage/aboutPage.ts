import { citiesCorporateData } from '../../entities';
import { renderCitiesList } from '../../features';
import { isAvailableUrl } from '../../shared';

export function aboutPage(): void {
   if (!isAvailableUrl('about')) return;

   // рендер списка ссылок городов
   const citiesListPlaceholder = document.querySelector('[data-links-list]') as HTMLElement;
   citiesListPlaceholder && renderCitiesList(citiesListPlaceholder, citiesCorporateData);
}
aboutPage();

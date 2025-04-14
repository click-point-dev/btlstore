import { CityData, readCityByUrl } from '../readCityByUrl';

export function renderCityTitle(target: HTMLElement, data: CityData[]): void {
   const currentCity = readCityByUrl(data)?.city_ru || null;

   if (!currentCity) return;

   target.innerHTML = ` в&nbsp;городе&nbsp;${currentCity}`;
}

export type CityData = {
   city_ru: string;
   city_en: string;
   url: string;
};
export function readCityByUrl(data: CityData[]) {
   const currentLocation =
      location.pathname.split('/').at(-1) ||
      location.pathname.split('/').at(-2); // безопасность от слешей на конце url

   return data.find(
      city =>
         currentLocation.toLowerCase().trim() ===
         city.city_en.toLowerCase().trim(),
   );
}

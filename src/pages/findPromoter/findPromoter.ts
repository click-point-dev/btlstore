import { dropdownList, getCitiesFromApi } from '../../shared';
import { searchWidget } from '../../widgets';

//todo инпут с городами вынести в отдельный файл

export async function findPromoter() {
   const searchBlocks = document.querySelectorAll('[data-search-block]');
   if (!searchBlocks.length) return;

   // Получение списка городов с помощью API
   const cities = await getCitiesFromApi('/api/getCity.php');
   // console.log(cities);

   if (!cities?.length) return;

   const citiesNames = cities.map((city: any) => {
      return {
         value: city.id,
         content: city.name,
      };
   });

   searchBlocks.forEach(block => {
      const resultElement = block.querySelector(
         '[data-search-results]',
      ) as HTMLElement;
      const inputElement = block.querySelector(
         '[data-search-input] input',
      ) as HTMLInputElement;
      if (!resultElement || !inputElement) return;

      // Заполнение выпадающего списка городами из полученных данных
      searchWidget(inputElement, resultElement, citiesNames);

      const cityIdInput = block.querySelector(
         "[name='city_id']",
      ) as HTMLInputElement;
      // Вывод id о выбранном городе
      if (cityIdInput) {
         document.addEventListener('selectEvent', (e: CustomEvent) => {
            const { value } = e.detail;
            cityIdInput.value = value;
            console.log(
               `${value}: Выбран город: ${cities.find((city: any) => city.id === Number(value))?.name}`,
            );
         });
      }
   });

   // обработка input radio valu=other
}

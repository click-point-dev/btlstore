import { createCaseCards } from '../../entities';
import { CaseCard, CasesData, FilterCriteria } from '../../entities';

export function casesCardsWidget(
   data: CasesData,
   isSlider: boolean = false,
   filters?: FilterCriteria,
) {
   let cards: HTMLDivElement[];
   const sortedData = [...data].sort((a, b) => a.type.localeCompare(b.type));

   if (Boolean(filters)) {
      const filtredData = filterCases(data, filters);

      cards = createCaseCards(filtredData, isSlider);
   }

   if (!Boolean(filters)) {
      cards = createCaseCards(sortedData, isSlider);
   }

   const portfolioBody = document.createElement('div');
   portfolioBody.classList.add(
      `${isSlider ? 'swiper-wrapper' : 'portfolio__body'}`,
   );

   cards.forEach(item => {
      portfolioBody.insertAdjacentElement('beforeend', item);
   });

   // portfolioTypeBlock.insertAdjacentElement('beforeend', portfolioTypeBody);

   return portfolioBody;
   // return sortedData;
}

/**
 * Filters an array of cases based on multiple criteria.
 *
 * @param data The array of CasesData to filter.
 * @param filters An object where keys are 'CaseCard' properties and values are
 * the desired value or an array of desired values.
 * The function uses AND logic between different properties and OR logic for values within an array.
 * @returns A new array of CaseCard items that match the filter criteria.
 */
export function filterCases(
   data: CasesData,
   filters?: FilterCriteria,
): CasesData {
   return data.filter(item => {
      return Object.keys(filters).some(key => {
         const filterKey = key as keyof CaseCard;
         const filterValue = filters[filterKey];
         const itemValue = item[filterKey];

         if (Array.isArray(filterValue)) {
            // If the filter value is an array, check if the item's value is included in it (OR logic).
            return (filterValue as any[]).includes(itemValue);
         }
         // If the filter value is a single value, check for strict equality.
         return itemValue === filterValue;
      });
   });
}

import { createCaseCards } from '../../entities';
import { CasesData, Filters } from '../../entities/Cases/caseCardsTypes';

export function casesCardsWidget(
   data: CasesData,
   filters: Filters | null = null,
   isSlider: boolean = false,
) {
   let cards: HTMLDivElement[];
   const sortedData = [...data].sort((a, b) => a.type.localeCompare(b.type));

   if (Boolean(filters)) {
      const normalFilter = filters[1].map(item => item.toLowerCase().trim());

      const filtredData = sortedData.filter(item =>
         normalFilter.includes(item[filters[0]].toLowerCase().trim()),
      );

      cards = createCaseCards(filtredData, isSlider);
   }

   if (!Boolean(filters)) {
      cards = createCaseCards(sortedData, isSlider);
   }

   const portfolioBody = document.createElement('div');
   portfolioBody.classList.add(
      `${isSlider ? 'swiper-wrapper' : 'portfolio__body'}`,
   );

   cards.forEach((item, index) => {
      portfolioBody.insertAdjacentElement('beforeend', item);
   });

   // portfolioTypeBlock.insertAdjacentElement('beforeend', portfolioTypeBody);

   return portfolioBody;
}

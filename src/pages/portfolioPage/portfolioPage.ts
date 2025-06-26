import { CasesData } from '../../entities/Cases/caseCardsTypes';
import { casesData } from '../../entities/Cases/casesData';
import { isAvailableUrl } from '../../shared';
import { casesCardsWidget } from '../../widgets';

export function portfolioPage(): void {
   if (!isAvailableUrl('portfolio')) return;

   // рендер карточек кейсов
   const cardsTypes = Array.from(
      new Set([...casesData].map(item => item.type)),
   ).sort((a, b) => a.localeCompare(b));
   const portfolioBlock = document.querySelector(
      '[data-portfolio]',
   ) as HTMLDivElement;

   cardsTypes.forEach(cardType => {
      const portfolioTypeBlock = document.createElement('div');
      portfolioTypeBlock.classList.add('portfolio__type', 'mb-140');
      const portfolioTypeHead = document.createElement('div');
      portfolioTypeHead.classList.add('portfolio__head');
      const cards = casesCardsWidget(casesData, ['type', [`${cardType}`]]);

      portfolioTypeHead.innerHTML = `<h2 class="h2 text-with-dot mb-40"><span>.</span>${cardType}</h2>`;
      portfolioTypeBlock.insertAdjacentElement('beforeend', cards);
      portfolioTypeBlock.insertAdjacentElement('afterbegin', portfolioTypeHead);

      portfolioBlock.insertAdjacentElement('beforeend', portfolioTypeBlock);
   });
}

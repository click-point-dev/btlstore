import { casesData } from '../../entities/Cases/casesData';
import { isAvailableUrl } from '../../shared';
import { casesCardsWidget } from '../../widgets';
import DOMPurify from 'dompurify';

export function portfolioPage(): void {
   if (!isAvailableUrl('portfolio')) return;

   // рендер карточек кейсов
   const cardsTypes = Array.from(
      new Set([...casesData].map(item => item.type)),
   ).sort((a, b) => a.localeCompare(b));
   const portfolioBlock = document.querySelector(
      '[data-portfolio]',
   ) as HTMLDivElement;

   cardsTypes.forEach((cardType, indexType, arrayTypes) => {
      const isLastType = indexType >= arrayTypes.length - 1;
      const portfolioTypeBlock = document.createElement('div');
      portfolioTypeBlock.classList.add(
         'portfolio__type',
         `${!isLastType ? 'mb-140' : '_'}`,
      );
      const portfolioTypeHead = document.createElement('div');
      portfolioTypeHead.classList.add('portfolio__head');
      const cards = casesCardsWidget(casesData, false, { type: cardType });

      portfolioTypeHead.innerHTML = `<h2 class="h2 text-with-dot mb-40"><span>.</span>${cardType}</h2>`;
      portfolioTypeBlock.insertAdjacentElement('beforeend', cards);
      portfolioTypeBlock.insertAdjacentElement('afterbegin', portfolioTypeHead);

      // const

      portfolioBlock.innerHTML += DOMPurify.sanitize(portfolioTypeBlock, {
         USE_PROFILES: { svg: true, svgFilters: true, html: true },
      });

      // portfolioBlock.insertAdjacentElement('beforeend', portfolioTypeBlock);
   });
}

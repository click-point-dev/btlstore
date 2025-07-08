import gsap from 'gsap';
import { renderCitiesList, renderCityTitle } from '../../features';
import { checkViewportWidth, isAvailableUrl } from '../../shared';
import { casesCardsWidget, filterCases, sliderCases } from '../../widgets';
import { casesData } from '../../entities/Cases/casesData';
import DOMPurify from 'dompurify';
import { citiesBtlData } from '../../entities';

export function btlPage(): void {
   if (!isAvailableUrl('btl')) return;

   // рендер карточек в портвфолио
   const portfolioBlock = document.querySelector(
      '[data-portfolio]',
   ) as HTMLDivElement;

   if (portfolioBlock) {
      const clean = DOMPurify.sanitize(
         casesCardsWidget(casesData, true, { type: 'BTL' }),
         { USE_PROFILES: { svg: true, svgFilters: true, html: true } },
      );

      portfolioBlock.innerHTML = clean;
   }

   // рендер списка городов
   const citiesListPlaceholder = document.querySelector(
      '[data-links-list]',
   ) as HTMLElement;
   citiesListPlaceholder &&
      renderCitiesList(citiesListPlaceholder, citiesBtlData);

   // рендер названия города в h1
   const cityTitlePlaceholder = document.querySelector(
      '[data-city-title]',
   ) as HTMLElement;
   cityTitlePlaceholder && renderCityTitle(cityTitlePlaceholder, citiesBtlData);

   // view all servicies
   function showAllBtlServices() {
      const services = document.querySelectorAll('[data-btl-service]');
      const parentElement =
         document.querySelector('[data-btl-service]').parentElement;
      const firstRow = document.createElement('div');
      const secondRow = document.createElement('div');

      if (!services.length || !parentElement) return;

      services.forEach((service: HTMLElement, index: number) => {
         index < 3
            ? firstRow.insertAdjacentElement('beforeend', service)
            : secondRow.insertAdjacentElement('beforeend', service);
      });

      [firstRow, secondRow].forEach(item => {
         parentElement.insertAdjacentElement('beforeend', item);
         item.style.cssText = /*style*/ `
         display: flex;
         flex-direction: column;
         gap: 20px;

   `;
      });
      const heigth = secondRow.getBoundingClientRect().height;
      console.log(heigth);
      secondRow.style.height = '0';

      parentElement.insertAdjacentHTML(
         'afterend',
         /*html*/ `
         <div class="button button-color button-xl" style="display:flex; margin-top: 40px;">
            <button>Показать все услуги</button>
         </div>`,
      );

      const timeline = gsap.timeline({ paused: true });
      const cards = gsap.utils.selector(secondRow);
      console.log(cards('& > *'));

      timeline
         .fromTo(
            secondRow,
            { height: 0, marginTop: 0 },
            { height: heigth, marginTop: '20px' },
         )
         .to(secondRow, { overflow: 'unset' })
         .from(cards('& > *'), { stagger: 0.1, opacity: 0 }, '-=0.2');

      parentElement.nextElementSibling.addEventListener('click', () =>
         secondRow.getBoundingClientRect().height === 0
            ? timeline.play()
            : timeline.reverse(),
      );
   }
   // инициализация слайдера в кейсах
   const circlesSliders = Array.from(
      document.querySelectorAll('.corporate-events .slider-cases'),
   );
   if (circlesSliders.length > 0) {
      checkViewportWidth('(max-width: 1439px)') && sliderCases();
   }
   checkViewportWidth('(max-width: 700px)') && showAllBtlServices();
}

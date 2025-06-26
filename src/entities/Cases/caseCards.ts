import { CaseCard, CasesData } from './caseCardsTypes';

export function createCaseCards(data: CasesData, isSlider: boolean = false) {
   return [...data].map(({ title, description, image, link }: CaseCard) => {
      const card = document.createElement('div');
      card.classList.add('card-circle', `${isSlider ? 'swiper-slide' : null}`);
      card.innerHTML = `
			<div class="card-circle__decor">
				<svg width="100%" height="100%" viewBox="0 0 627 642" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path d="M481.57 316.552C481.57 411.547 406.314 488.54 313.5 488.54C220.686 488.54 145.43 411.547 145.43 316.552C145.43 221.557 220.686 144.564 313.5 144.564C406.314 144.564 481.57 221.557 481.57 316.552Z" stroke="white" stroke-width="0.783544" />
					<path d="M514.871 316.552C514.871 430.379 424.697 522.624 313.5 522.624C202.303 522.624 112.129 430.379 112.129 316.552C112.129 202.724 202.303 110.48 313.5 110.48C424.697 110.48 514.871 202.724 514.871 316.552Z" stroke="#0055B0" stroke-opacity="0.2" stroke-width="1.56709" />
					<path d="M540.336 316.16C540.336 444.295 438.91 548.089 313.892 548.089C188.874 548.089 87.4474 444.295 87.4474 316.16C87.4474 188.025 188.874 84.2308 313.892 84.2308C438.91 84.2308 540.336 188.025 540.336 316.16Z" stroke="#0055B0" stroke-opacity="0.2" stroke-width="3.91772" />
					<path d="M562.275 316.944C562.275 457.593 450.886 571.595 313.5 571.595C176.114 571.595 64.7248 457.593 64.7248 316.944C64.7248 176.295 176.114 62.2917 313.5 62.2917C450.886 62.2917 562.275 176.295 562.275 316.944Z" stroke="#0055B0" stroke-opacity="0.2" stroke-width="0.783544" />

				</svg>
			</div>
			<div class="card-circle__body">
				<div class="card-circle__bg">
					<div class="card-circle__image"><img src="${image}" alt=""></div>
				</div>
				<div class="card-circle__content">
					<p class='card-circle__title text-white'>${title}</p>
					<p class='card-circle__description text-white text-xxs'>${description}</p>
				</div>
			</div>
			<a class="card-circle__link" href="${link}"></a>
	`;

      return card;
   });
}

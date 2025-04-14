import { dataMediaQueries } from '../../shared';
import { slideToggle } from '../../shared/libs/slideToggle';
import { _slideUp } from '../tabs';

export function spollers() {
   let queue = '';
   const spollersArray = document.querySelectorAll('[data-spollers]');
   if (spollersArray.length > 0) {
      // Получение обычных слойлеров
      const spollersRegular = Array.from(spollersArray).filter(
         function (item, index, self) {
            return !item.dataset.spollers.split(',')[0];
         },
      );
      // console.log(spollersArray, '\n', spollersRegular);
      // Инициализация обычных слойлеров
      if (spollersRegular.length) {
         initSpollers(spollersRegular);
      }
      // Получение слойлеров с медиа запросами
      let mdQueriesArray = dataMediaQueries(spollersArray, 'spollers');
      if (mdQueriesArray && mdQueriesArray.length) {
         mdQueriesArray.forEach(mdQueriesItem => {
            // Событие
            mdQueriesItem.matchMedia.addEventListener('change', function () {
               initSpollers(mdQueriesItem.itemsArray, mdQueriesItem.matchMedia);
            });
            initSpollers(mdQueriesItem.itemsArray, mdQueriesItem.matchMedia);
         });
      }
      // Инициализация
      function initSpollers(spollersArray, matchMedia = false) {
         spollersArray.forEach(spollersBlock => {
            spollersBlock = matchMedia ? spollersBlock.item : spollersBlock;
            if (matchMedia.matches || !matchMedia) {
               spollersBlock.classList.add('_spoller-init');
               initSpollerBody(spollersBlock);
               spollersBlock.addEventListener('click', setSpollerAction);
            } else {
               spollersBlock.classList.remove('_spoller-init');
               initSpollerBody(spollersBlock, false);
               spollersBlock.removeEventListener('click', setSpollerAction);
            }
         });
      }
      // Работа с контентом
      function initSpollerBody(spollersBlock, hideSpollerBody = true) {
         let spollerTitles = spollersBlock.querySelectorAll('[data-spoller]');
         if (spollerTitles.length) {
            spollerTitles = Array.from(spollerTitles).filter(
               item => item.closest('[data-spollers]') === spollersBlock,
            );
            spollerTitles.forEach(spollerTitle => {
               if (hideSpollerBody) {
                  spollerTitle.removeAttribute('tabindex');
                  if (!spollerTitle.classList.contains('_spoller-active')) {
                     spollerTitle.nextElementSibling.hidden = true;
                  }
               } else {
                  spollerTitle.setAttribute('tabindex', '-1');
                  spollerTitle.nextElementSibling.hidden = false;
               }
            });
         }
      }

      //todo: call animateImages function into next block
      function setSpollerAction(e) {
         const el = e.target;
         const base = el.closest('[data-spollers]');

         console.log(el, Array.from(base.querySelectorAll('button')));

         Array.from(base.querySelectorAll('button')).forEach((item, index) => {
            if (item === el) {
               queue = index + 1;
               console.log(queue);
            }
         });

         if (el.closest('[data-spoller]')) {
            const spollerTitle = el.closest('[data-spoller]');
            const spollersBlock = spollerTitle.closest('[data-spollers]');
            const oneSpoller = spollersBlock.hasAttribute('data-one-spoller');
            const spollerSpeed = spollersBlock.dataset.spollersSpeed
               ? parseInt(spollersBlock.dataset.spollersSpeed)
               : 500;
            if (!spollersBlock.querySelectorAll('._slide').length) {
               if (
                  oneSpoller &&
                  !spollerTitle.classList.contains('_spoller-active')
               ) {
                  hideSpollersBody(spollersBlock);
               }
               spollerTitle.classList.toggle('_spoller-active');
               slideToggle(spollerTitle.nextElementSibling, spollerSpeed);
            }
            e.preventDefault();
         }
         return queue;
      }
      function hideSpollersBody(spollersBlock) {
         const spollerActiveTitle = spollersBlock.querySelector(
            '[data-spoller]._spoller-active',
         );
         const spollerSpeed = spollersBlock.dataset.spollersSpeed
            ? parseInt(spollersBlock.dataset.spollersSpeed)
            : 500;
         if (
            spollerActiveTitle &&
            !spollersBlock.querySelectorAll('._slide').length
         ) {
            spollerActiveTitle.classList.remove('_spoller-active');
            _slideUp(spollerActiveTitle.nextElementSibling, spollerSpeed);
         }
      }
      // Закрытие при клике вне спойлера
      const spollersClose = document.querySelectorAll('[data-spoller-close]');
      if (spollersClose.length) {
         document.addEventListener('click', function (e) {
            const el = e.target;
            if (!el.closest('[data-spollers]')) {
               spollersClose.forEach(spollerClose => {
                  const spollersBlock = spollerClose.closest('[data-spollers]');
                  if (spollersBlock.classList.contains('_spoller-init')) {
                     const spollerSpeed = spollersBlock.dataset.spollersSpeed
                        ? parseInt(spollersBlock.dataset.spollersSpeed)
                        : 500;
                     spollerClose.classList.remove('_spoller-active');
                     _slideUp(spollerClose.nextElementSibling, spollerSpeed);
                  }
               });
            }
         });
      }
   }
}

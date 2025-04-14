import { hideLoader } from './app';
import { tabs, spollers } from './features';
// import { spollers } from './features/spollers';
import './index.scss';
import {
   btlPage,
   corporateEvents,
   eventMarketing,
   findPromoter,
   mainPage,
   page404,
   pageCases,
   prPage,
   vacanciesPage,
} from './pages';
import {
   checkbox,
   documentLock,
   hideShowElement,
   input,
   paramsCircl,
   spoller2,
   textarea,
} from './shared';
import {
   cardCircle,
   clientsSlider,
   footer,
   form,
   headerMenu,
   person,
   popup,
   sliderCases,
   sliderParams,
   sliderThesis,
   subList,
} from './widgets';

import cssHasPseudo from 'css-has-pseudo/browser';
cssHasPseudo(document);

documentLock();
document.addEventListener('DOMContentLoaded', function () {
   const screenWidth = window.innerWidth;
   headerMenu();
   subList();
   tabs();
   spollers();
   input();
   checkbox();
   textarea();
   person();

   if (screenWidth <= 1280) {
      sliderParams();
   }
   // sliderCases(); // перенес запуск функции в страницу
   cardCircle();
   pageCases();
   form();
   popup();
   vacanciesPage();
   sliderThesis();
   corporateEvents();
   // spoller2();
   findPromoter();
   eventMarketing();
   hideShowElement();
   btlPage();
   prPage();
});

window.addEventListener('load', function () {
   hideLoader();
   mainPage();
   clientsSlider();
   paramsCircl();
   page404();
});

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
   portfolioPage,
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
   input();
   checkbox();
   textarea();
   person();
   spoller2();
   popup();
   portfolioPage();
   pageCases();
   vacanciesPage();
   corporateEvents();
   findPromoter();
   eventMarketing();
   hideShowElement();
   btlPage();
   prPage();
   cardCircle();
   sliderThesis();
   if (screenWidth <= 1280) {
      sliderParams();
   }
   form();
});

window.addEventListener('load', function () {
   hideLoader();
   mainPage();
   clientsSlider();
   paramsCircl();
   page404();
});

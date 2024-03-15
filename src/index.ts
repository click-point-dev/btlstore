import { hideLoader } from './app';
import { tabs } from './features';
import './index.scss';
import { mainPage, page404, pageCases, vacanciesPage } from './pages';
import { checkbox, documentLock, input, paramsCircl, textarea } from './shared';
import {
   cardCircle,
   clientsSlider,
   form,
   headerMenu,
   person,
   popup,
   sliderCases,
   sliderParams,
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

   if (screenWidth <= 1280) {
      sliderParams();
   }
   sliderCases();
   cardCircle();
   pageCases();
   form();
   popup();
   vacanciesPage();
});

window.addEventListener('load', function () {
   hideLoader();
   mainPage();
   clientsSlider();
   paramsCircl();
   page404();
});

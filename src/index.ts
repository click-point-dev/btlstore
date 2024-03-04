import { hideLoader } from './app';
import { tabs } from './features';
import './index.scss';
import { pageCases, vacanciesPage } from './pages';
import { checkbox, documentLock, input, paramsCircl, textarea } from './shared';
import {
   cardCircle,
   clientsSlider,
   headerMenu,
   person,
   popup,
   sliderCases,
   sliderParams,
   subList,
} from './widgets';

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
   popup();
   vacanciesPage();
});

window.addEventListener('load', function () {
   hideLoader();
   clientsSlider();
   paramsCircl();
});

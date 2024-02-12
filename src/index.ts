import { hideLoader } from './app';
import { tabs } from './features';
import './index.scss';
import { checkbox, input, paramsCircl, textarea } from './shared';
import {
   cardCircle,
   clientsSlider,
   headerMenu,
   person,
   sliderCases,
   sliderParams,
   subList,
} from './widgets';

document.addEventListener('DOMContentLoaded', function () {
   const screenWidth = window.innerWidth;

   console.log('DOMLoad');
   headerMenu();
   subList();
   hideLoader();
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
});

window.addEventListener('load', function () {
   clientsSlider();
   paramsCircl();
});

import { hideLoader } from './app';
import { tabs } from './features';
import './index.scss';
import { checkbox, circleWithImage, input, textarea } from './shared';
import {
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
   circleWithImage();
   input();
   checkbox();
   textarea();
   person();

   if (screenWidth <= 1280) {
      sliderParams();
      sliderCases();
   }
});

window.addEventListener('load', function () {
   clientsSlider();
});

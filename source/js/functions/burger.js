import { disableScroll } from '../functions/disable-scroll';
import { enableScroll } from '../functions/enable-scroll';
import { getHeaderHeight } from '../functions/header-height';

let overlay = document.querySelector('[data-overlay]');
let mobileMenu = document.querySelector('.mobile-menu');
let burger = document.querySelector('.burger');
let burgerActive = document.querySelector('.burger.active');
let header = document.querySelector('header');

const mobileMenuHandler = function(overlayBg, menu, button,headerTag) {
  button.addEventListener('click', function(){
    menu.classList.toggle('active');
    button.classList.toggle('active');
    overlayBg.classList.toggle('active');
    headerTag.classList.toggle('active');
    document.body.classList.toggle('dis-scroll')
    getHeaderHeight();
  })
}

const hideMenuHandler = function(overlayBg, menu, button, headerTag) {
    menu.classList.remove('active');
    button.classList.remove('active');
    overlayBg.classList.remove('active');
    headerTag.classList.remove('active');
    document.body.classList.remove('dis-scroll')
}


if (overlay) {
  mobileMenuHandler(overlay,mobileMenu,burger,header);
  overlay.addEventListener('click', function(e){
    if (e.target.classList.contains('overlay')) {
      hideMenuHandler(overlay,mobileMenu,burger,header)
    }
  });

}




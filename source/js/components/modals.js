import { disableScroll } from '../functions/disable-scroll';
import { enableScroll } from '../functions/enable-scroll';

let overlay = document.querySelector('[data-overlay]');
let propositionModal = document.querySelector('[data-proposition]');
let propositionBtns = [...document.querySelectorAll('[data-show]')];
let breakpointTablet = 768;
let identBtns = [...document.querySelectorAll('[data-ident]')];
let identBtnsMobile = [...document.querySelectorAll('.ident-mobile  [data-ident]')];
let identModal = document.querySelector('[data-ident-modal]');
let identMobileModal = document.querySelector('[data-ident-mobile]');
let identMobileButtons = [...document.querySelectorAll('[data-mobile-ident]')];

const mobileRemoveClass = function(btns,modalBlock){
  let containerWidth = document.documentElement.clientWidth;

  if (containerWidth < breakpointTablet) {
    btns.map(function(button){
      button.addEventListener('click', function(){
        modalBlock.classList.remove('active');
      });
    });
  }
}


const showModal = function(overlayBg, button, modalBlock){
    overlayBg.classList.add('active');
    modalBlock.classList.add('active');
    disableScroll();
}

const hideModal = function(overlayBg,modalBlock){
  overlayBg.classList.remove('active');
  modalBlock.classList.remove('active');
  enableScroll();
}

const hideModalHandler = function(parrent) {
  const closeBtn = parrent.querySelector('.close');
  closeBtn.addEventListener('click', function(){
    hideModal(overlay,parrent);
  });
}



window.addEventListener('resize', () => {
  mobileCheck(identMobileButtons);
  mobileRemoveClass(identBtnsMobile,identMobileModal);
});

window.addEventListener('DOMContentLoaded', () => {
  mobileCheck(identMobileButtons);
  mobileRemoveClass(identBtnsMobile,identMobileModal);
});


const mobileCheck = function(buttons){
  let containerWidth = document.documentElement.clientWidth;

  if (containerWidth < breakpointTablet) {
    buttons.map(function(btn){
      btn.addEventListener('click', function(e){
        showModal(overlay,btn,identMobileModal);
      })
    });
  }
}

const plunkModalBtns = function(btns,overlayBg ,modalBlock){
  btns.map(function(btn){
    btn.addEventListener('click', function(e){
      showModal(overlayBg,btn,modalBlock);
    })
  });

}


if (overlay) {
  plunkModalBtns(propositionBtns,overlay,propositionModal);
  plunkModalBtns(identBtns,overlay,identModal);

  hideModalHandler(propositionModal);
  hideModalHandler(identMobileModal);
  hideModalHandler(identModal);

  overlay.addEventListener('click', function(e){
    if (e.target.classList.contains('overlay')) {
      hideModal(overlay,propositionModal);
      hideModal(overlay,identModal);
    }
  });
}




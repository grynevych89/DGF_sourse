import { disableScroll } from '../functions/disable-scroll';
import { enableScroll } from '../functions/enable-scroll';

let overlay = document.querySelector('[data-overlay]');
let propositionModal = document.querySelector('[data-proposition]');
let propositionBtns = [...document.querySelectorAll('[data-show]')];


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


const plunkModalBtns = function(btns,overlayBg ,modalBlock){
    btns.map(function(btn){
        btn.addEventListener('click', function(e){
        showModal(overlayBg,btn,modalBlock);
        })
    });
}


if (overlay) {
    plunkModalBtns(propositionBtns,overlay,propositionModal);

    hideModalHandler(propositionModal);

    overlay.addEventListener('click', function(e){
        if (e.target.classList.contains('overlay')) {
            hideModal(overlay,propositionModal);
        }
    });
}

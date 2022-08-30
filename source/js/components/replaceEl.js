let headerBottom = document.querySelector('.header__bottom');
let mobileParrent = document.querySelector('.mobile-menu');
let desktopParrent = document.querySelector('.header');
let imagesAccordion = document.querySelector('.main-accordion--images');
let breakpointAccordion = 1024;


const replaceMobileMenu = (element,parentDesktop,parentMobile) => {
  let containerWidth = document.documentElement.clientWidth;
  if (containerWidth <= breakpointAccordion) {
    parentMobile.insertAdjacentElement('beforeend', element);
  };
  if (containerWidth > breakpointAccordion) {
    parentDesktop.insertAdjacentElement('beforeend', element);
  }
}

window.addEventListener('resize', () => {
  replaceMobileMenu(headerBottom,desktopParrent,mobileParrent);
});
window.addEventListener('DOMContentLoaded', () => {
  replaceMobileMenu(headerBottom,desktopParrent,mobileParrent);
});


const replaceAcordionTitle = (element,parentDesktop,parentMobile) => {
  let containerWidth = document.documentElement.clientWidth;
  if (containerWidth <= breakpointAccordion) {
    parentMobile.insertAdjacentElement('beforeend', element);
  };
  if (containerWidth > breakpointAccordion) {
    parentDesktop.insertAdjacentElement('afterend', element);
  }
}

if (imagesAccordion) {
  const imagesAccordionItems = [...imagesAccordion.querySelectorAll('.main-accordion__item')];
  imagesAccordionItems.map(function(item){
    const itemButton = item.querySelector('.main-accordion__btn');
    const itemImage = item.querySelector('.main-accordion__image');
    const itemTitle = item.querySelector('.main-accordion__btn-title');

    window.addEventListener('resize', () => {
      replaceAcordionTitle(itemTitle,itemImage,itemButton);
    });
    window.addEventListener('DOMContentLoaded', () => {
      replaceAcordionTitle(itemTitle,itemImage,itemButton);
    });
  })
}






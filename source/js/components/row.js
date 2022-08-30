const imagesAccordion = document.querySelector('.main-accordion--images');

if (imagesAccordion) {
  const imagesAccordionItem = [...imagesAccordion.querySelectorAll('.main-accordion__item')];
  const imagesAccordionLastItem = imagesAccordion.querySelector('.main-accordion__item:last-child');
  const imagesAccordionSecondItem = imagesAccordion.querySelector('.main-accordion__item:nth-last-child(2)');
  const calcItem = imagesAccordionItem.length  / 3;
  const itemModule = calcItem.toFixed(2).split('.')[1].replace('', '.');


  let breakpointAccordion = 1024;


  const accordionGrid = () => {
    let containerWidth = document.documentElement.clientWidth;
    if (containerWidth > breakpointAccordion) {
        if(+itemModule == 0.33) {
          imagesAccordionLastItem.classList.add('main-accordion__item--full');
        }

        if (+itemModule == 0.67) {
          imagesAccordionLastItem.classList.add('main-accordion__item--half');
          imagesAccordionSecondItem.classList.add('main-accordion__item--half');
        }

        if (+itemModule == 0 || +itemModule == 1) {
          imagesAccordionLastItem.classList.remove('main-accordion__item--half');
          imagesAccordionSecondItem.classList.remove('main-accordion__item--half');
          imagesAccordionLastItem.classList.remove('main-accordion__item--full');
        }
    };
    if (containerWidth < breakpointAccordion) {
      imagesAccordionItem.map(function(item){
        item.classList.remove('main-accordion__item--half');
        item.classList.remove('main-accordion__item--full');
      });
    }
  }


  window.addEventListener('resize', () => {
      accordionGrid();
  });
  window.addEventListener('DOMContentLoaded', () => {
      accordionGrid();
  });


}






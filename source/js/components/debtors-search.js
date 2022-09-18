import { disableScroll } from '../functions/disable-scroll';
import { enableScroll } from '../functions/enable-scroll';

let creditorsData = null;
let selectedCreditor = null;
let overlay = document.querySelector('[data-overlay]');
let breakpointTablet = 768;
let identModal = document.querySelector('[data-ident-modal]');
let identMobileModal = document.querySelector('[data-ident-mobile]');

let debtorVatin = document.querySelector('[data-debtor-vatin]');
let debtorCaNumber = document.querySelector('[data-debtor-ca-number]');
let debtorsResult = document.querySelector('[data-debtors-result]');
let debtorsStartSearch = document.querySelector('[data-debtors-start-search]');
let debtorsClear = document.querySelector('[data-debtors-clear]');

const mobileRemoveClass = function(btns,modalBlock) {
    let containerWidth = document.documentElement.clientWidth;

    if (containerWidth < breakpointTablet) {
        btns.map(function(button){
            button.addEventListener('click', function() {
                modalBlock.classList.remove('active');
            });
        });
    }
}

const clearFields = () => {
    debtorVatin.value = '';
    debtorCaNumber.value = '';
}


const getCreditorById = (id) => {
    for(var creditor of creditorsData['results']) {
        if (creditor['id'] == id) {
            return creditor;
        }        
    }
    return null;
}

const showModal = function(overlayBg, button, modalBlock, creditorId) {
    selectedCreditor = getCreditorById(creditorId);
    if (selectedCreditor) {
        modalBlock.querySelector('.modal__title').innerHTML = `Пошук боржника у реєстрі ${selectedCreditor['name']}`;
    }    
    overlayBg.classList.add('active');
    modalBlock.classList.add('active');
    disableScroll();
    clearFields();
    clearDebtorsTable();
}

const showMobileModal = function(overlayBg, button, modalBlock, creditorId) {
    selectedCreditor = getCreditorById(creditorId);
    modalBlock.querySelector('.modal__title').innerHTML = `Картка ${selectedCreditor['name']}`;
    modalBlock.querySelector('.ident-mobile__image source').srcset = `${selectedCreditor['trademark']['normal_webp']}`;
    modalBlock.querySelector('.ident-mobile__image img').src = `${selectedCreditor['trademark']['normal']}`;
    modalBlock.querySelector('.ident-mobile__name').innerHTML = `ЄДРПОУ: ${selectedCreditor['edrpou']}`;
    modalBlock.querySelector('.ident-mobile__list').innerHTML = `
        <li class="ident-mobile__item">
            <span class="ident-mobile__title">
                Борг відступлено за договором:
            </span>
            <span class="ident-mobile__value">
                ${selectedCreditor['contract_number']}
            </span>
        </li>
        <li class="ident-mobile__item">
            <span class="ident-mobile__title">
                Договір заключено:
            </span>
            <span class="ident-mobile__value">
                ${selectedCreditor['contract_date']}
            </span>
        </li>
        <li class="ident-mobile__item">
            <span class="ident-mobile__title">
                Дата передачі реєстру:
            </span>
            <span class="ident-mobile__value">
                ${selectedCreditor['transfer_date']}
            </span>
        </li>
    `;
    modalBlock.querySelector('.ident-mobile__btns').innerHTML = `
        <button class="ident-mobile__btn blue-btn" data-ident data-creditor-id="${selectedCreditor['id']}">
            Шукати у реєстрі боржників
        </button>
        <a href="${selectedCreditor['contract_file']}" target="_blank" download class="ident-mobile__btn blue-btn-transparent">
            <svg width='18' height='18'>
                <use href="${static_files['sprite']}#type"></use>
            </svg>
            Скачати договір
        </a>
        <a href="${selectedCreditor['url']}" target="_blank" class="ident-mobile__btn blue-btn-transparent">
            Перейти до сторінки кредитора
        </a>
    `;
    overlayBg.classList.add('active');
    modalBlock.classList.add('active');
    disableScroll();
    clearFields();
    clearDebtorsTable();
    updateModalsEvents();
}

const hideModal = function(overlayBg,modalBlock) {
    overlayBg.classList.remove('active');
    modalBlock.classList.remove('active');
    enableScroll();
}

const hideModalHandler = function(parrent) {
    const closeBtn = parrent.querySelector('.close');
    closeBtn.addEventListener('click', function() {
        hideModal(overlay,parrent);
    });
}

const mobileCheck = function(buttons) {
    let containerWidth = document.documentElement.clientWidth;

    if (containerWidth < breakpointTablet) {
        buttons.map(function(btn) {
            btn.addEventListener('click', function(e) {
                showMobileModal(overlay, btn, identMobileModal, btn.dataset.creditorId);
            })
        });
    }
}

const plunkModalBtns = function(btns, overlayBg, modalBlock){
    btns.map(function(btn){
        btn.addEventListener('click', function(e) {
            showModal(overlayBg, btn, modalBlock, btn.dataset.creditorId);
        })
    });
}

const updateMobileModalEvents = () => {
    let identBtnsMobile = [...document.querySelectorAll('.ident-mobile [data-ident]')];
    let identMobileButtons = [...document.querySelectorAll('[data-mobile-ident]')];
    mobileCheck(identMobileButtons);
    mobileRemoveClass(identBtnsMobile, identMobileModal);
}

window.addEventListener('resize', () => {
    updateMobileModalEvents();
});

const updateModalsEvents = () => {
    if (overlay) {
        let identBtns = [...document.querySelectorAll('[data-ident]')];

        updateMobileModalEvents();        
        plunkModalBtns(identBtns, overlay, identModal);
    
        hideModalHandler(identMobileModal);
        hideModalHandler(identModal);
    
        overlay.addEventListener('click', function(e) {
            if (e.target.classList.contains('overlay')) {
                hideModal(overlay,identModal);
            }
        });
    }
}

let creditorsSearchField = document.querySelector('[data-creditors-search-field]');
let creditorsStartSearch = document.querySelector('[data-creditors-start-search]');
let creditorsClear = document.querySelector('[data-creditors-clear]');
let creditorsResult = document.querySelector('[data-creditors-result]');

const clearCreditorsTable = () => {
    const rows = creditorsResult.getElementsByClassName('ident-list__row');
    while(rows.length > 1){
        rows[1].parentNode.removeChild(rows[1]);
    }
}

const setCreditorsTable = () => {
    if(creditorsData['results'].length == 0) {
        creditorsResult.innerHTML += `
            <li class="ident-list__row" style="grid-template-columns: 1fr">
                <div class="ident-list__coll">
                    По запиту нічого не знайдено
                </div>
            </li>
        `;
    }
    else {
        for(var creditor of creditorsData['results']) {
            creditorsResult.innerHTML += `
                <li class="ident-list__row">
                    <a href="#" class="ident-list__coll">
                        <picture>
                            <source type='image/webp' srcset='${creditor['trademark']['normal_webp']}'>
                            <img width='200' height='50' src='${creditor['trademark']['normal']}' alt='logo'>
                        </picture>
                    </a>
                    <button data-mobile-ident data-creditor-id="${creditor['id']}">Open mobile modal</button>
                    <span class="ident-list__coll">
                        <span class="ident-list__coll-name">${creditor['name']}</span>
                        <span class="ident-list__coll-value">(ЄДРПОУ: ${creditor['edrpou']})</span>
                    </span>
        
                    <span class="ident-list__coll">
                        ${creditor['contract_number']}
                    </span>
        
                    <span class="ident-list__coll">
                        ${creditor['contract_date']}
                    </span>
        
                    <span class="ident-list__coll">
                        ${creditor['transfer_date']}
                    </span>
                    <div class="ident-list__hide">
                        <div class="ident-list__wrapper">
                            <button class="ident-list__hide-btn" data-ident data-creditor-id="${creditor['id']}">
                                Шукати у реєстрі боржників
                            </button>
                            <a href="${creditor['contract_file']}" target="_blank" download class="ident-list__hide-btn">
                                <svg width='18' height='18'>
                                    <use href='${static_files['sprite']}#type'></use>
                                </svg>
                                Скачати договір
                            </a>
                            <a href="${creditor['url']}" target="_blank" class="ident-list__hide-btn">
                                Перейти до сторінки кредитора
                            </a>
                        </div>
                    </div>
        
                </li>
            `;
        }
    }    
    updateModalsEvents();
}

const creditorsGetAsync = (callback, searchValue) => {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() { 
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
            creditorsData = JSON.parse(xmlHttp.responseText);
            callback();
        }
    }
    xmlHttp.open("GET", `/api/v1/creditors/?v=${searchValue}`, true); 
    xmlHttp.send(null);
}



if(creditorsSearchField) {
    creditorsStartSearch.addEventListener('click', function(e){
        clearCreditorsTable();
        creditorsGetAsync(setCreditorsTable, creditorsSearchField.value);
    });
    
    creditorsSearchField.addEventListener('keypress', (event) => {
        if (event.key === "Enter") {
            event.preventDefault();
            creditorsStartSearch.click();
        }
    });
    
    creditorsClear.addEventListener('click', function(e){
        clearCreditorsTable();
        creditorsSearchField.value = '';
        creditorsGetAsync(setCreditorsTable, creditorsSearchField.value);
    })

    creditorsGetAsync(setCreditorsTable, creditorsSearchField.value);
}



const checkDebtorsFields = () => {
    debtorVatin.classList.remove("error");
    debtorCaNumber.classList.remove("error");

    let vatin = debtorVatin.value;
    let caNumber = debtorCaNumber.value;
    let allGood = true;

    if(vatin.length == 0 && caNumber.length == 0) {
        allGood = false;
    }
    else {
        if(vatin.length > 0 && vatin.length != 10) {
            debtorVatin.classList.add("error");
            allGood = false;
        }
        if(caNumber.length > 0 && caNumber.length > 15) {
            debtorCaNumber.classList.add("error");
            allGood = false;
        }
    }    

    return allGood;
}

const clearDebtorsFields = () => {
    debtorVatin.value = '';
    debtorCaNumber.value = '';
}

const clearDebtorsTable = () => {
    debtorsResult.innerHTML = '';
}

const setDebtorsTable = (data) => {
    debtorsResult.innerHTML += `
        <span class="search-result__title">
            Результати пошуку:
        </span>
    `;
    if(data['results'].length == 0) {
        debtorsResult.innerHTML += `
            <span>
                По запиту нічого не знайдено
            </span>
        `;
    }
    else {
        for(var debtor of data['results']) {
            debtorsResult.innerHTML += `
                <ul class="search-result__table">
                    <li class="search-result__coll">
                        <span class="search-result__name">
                            ПІБ боржника
                        </span>
                        <span class="search-result__value">
                            ${debtor['fullname']}
                        </span>
                    </li>
                    <li class="search-result__coll">
                        <span class="search-result__name">
                            Реєстраційний номер облікової картки платника податків
                        </span>
                        <span class="search-result__value">
                            ${debtor['vatin']}
                        </span>
                    </li>
                    <li class="search-result__coll">
                        <span class="search-result__name">
                            Номер кредитного договору
                        </span>
                        <span class="search-result__value">
                            ${debtor['ca_number']}
                        </span>
                    </li>
                    <li class="search-result__coll">
                        <span class="search-result__name">
                            Дата кредитного договору
                        </span>
                        <span class="search-result__value">
                            ${debtor['ca_date']}
                        </span>
                    </li>
                    <li class="search-result__coll">
                        <span class="search-result__name">
                            Заборгованість по основному боргу (тіло кредиту), ₴
                        </span>
                        <span class="search-result__value">
                            ${debtor['bloan']}
                        </span>
                    </li>
                    <li class="search-result__coll">
                        <span class="search-result__name">
                            Заборгованістьпо відсоткам, ₴
                        </span>
                        <span class="search-result__value">
                            ${debtor['interest_arrears']}
                        </span>
                    </li>
                    <li class="search-result__coll">
                        <span class="search-result__name">
                            Комісія, ₴
                        </span>
                        <span class="search-result__value">
                            ${debtor['commission']}
                        </span>
                    </li>
                    <li class="search-result__coll">
                        <span class="search-result__name">
                            Пеня, ₴
                        </span>
                        <span class="search-result__value">
                            ${debtor['fine']}
                        </span>
                    </li>
                    <li class="search-result__coll">
                        <span class="search-result__name">
                            Загальная заборгованість, ₴
                        </span>
                        <span class="search-result__value">
                            ${debtor['total_debt']}
                        </span>
                    </li>
                </ul>
            `;
        }
    }
    
}

const debtorsGetAsync = (callback, vatin, caNumber) => {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() { 
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
            callback(JSON.parse(xmlHttp.responseText));
        }
    }
    xmlHttp.open("GET", `/api/v1/debtors/?creditor=${selectedCreditor['id']}&vatin=${vatin}&ca_number=${caNumber}`, true); 
    xmlHttp.send(null);
}

if (debtorsStartSearch) {
    debtorsStartSearch.addEventListener('click', () => {
        clearDebtorsTable();
        if(!checkDebtorsFields()) {
            return;
        }
    
        debtorsGetAsync(setDebtorsTable, debtorVatin.value, debtorCaNumber.value);
    });
    
    debtorVatin.addEventListener('keypress', (event) => {
        if (event.key === "Enter") {
            event.preventDefault();
            debtorsStartSearch.click();
        }
    });
    
    debtorCaNumber.addEventListener('keypress', (event) => {
        if (event.key === "Enter") {
            event.preventDefault();
            debtorsStartSearch.click();
        }
    });    
    
    debtorsClear.addEventListener('click', () => {
        clearDebtorsTable();
        clearDebtorsFields();    
    });
}


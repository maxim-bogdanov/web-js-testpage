import $ from 'jquery';
global.$ = $;

//
export const eventBus = window;

//
export const $window = $(window);

//
let lang;
export function setLang(_lang){
    lang = _lang || 'ru';
}

//
export function getLang(){
    return lang;
}

//
let idPage;
export function setIdPage(_idPage){
    idPage = _idPage || 'save_and_multiply';
}

//
export function getIdPage(){
    return idPage;
}

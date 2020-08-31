console.log('init 1');

import $ from 'jquery';
global.$ = $;
console.log('init 2');

import Handlebars from 'handlebars';
console.log('Handlebars import', Handlebars );
global.Handlebars = Handlebars;

import './handlebars-plugins';

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

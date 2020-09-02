import $, { globalEval } from 'jquery';
global.$ = $;

import Handlebars from 'handlebars';
global.Handlebars = Handlebars;

import './handlebars-plugins';

import gsap from 'gsap';
global.gsap = gsap;

import Navigo from 'Navigo'
global.Navifo = Navigo;

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

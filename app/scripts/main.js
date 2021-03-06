import { eventBus, setLang, setIdPage } from './shared';
import '../components/menu-inner/menu-inner';
import '../components/langs/langs';
import '../components/inner-part/inner-part';
import '../components/helpers/data-trnslt';
import '../components/header/header';
import '../components/adaptive/adaptive';
import '../scripts/router';


$(function () {

    $.getJSON('data.json', function (data) {
        setLang(data.defaultLang);
        setIdPage(data.defaultIdPage);
        $(eventBus)
            .trigger('main:ready', data)
            // .trigger('change-page', data.defaultIdPage )
        ;
    });

    $(eventBus).on('change-page', function (e, pageId) {
        setIdPage(pageId);
        $(eventBus).trigger('page-changed', pageId);
    });

    $(eventBus).on('change-language', function (e, lang) {
        setLang(lang);
        $(eventBus).trigger('language-changed', lang);
    });

    $(eventBus).on('open-menu', function (e) {
        $(eventBus).trigger('menu-opened');
    });

    $(eventBus).on('close-menu', function (e) {
        $(eventBus).trigger('menu-closed');
    });

    $(eventBus).on('open-list-languages', function (e, activeClass) {
        $(eventBus).trigger('languages-list-opened', activeClass);
    });



});

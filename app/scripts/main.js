import {eventBus} from './shared';
import '../components/menu-inner/menu-inner';
import '../components/langs/langs';
import '../components/inner-part/inner-part';
import { event, data } from 'jquery';


$(function(){

    $.getJSON('data.json', function(data) {
        $(eventBus).trigger('main:ready', data );
    });

    $(eventBus).on('change-page', function(e, pageId) {
        $(eventBus).trigger('page-changed', pageId );
    });

    $(eventBus).on('change-language', function(e, langAttr) {
        $(eventBus).trigger('language-changed', langAttr );
    });

    $(eventBus).on('open-list-languages', function(e, activeClass) {
        $(eventBus).trigger('languages-list-opened', activeClass );
    });

});

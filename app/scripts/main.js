import {eventBus} from './shared';
import '../components/menu-inner/menu-inner';
import '../components/inner-part/inner-part';
import { event, data } from 'jquery';


$(function(){

    $.getJSON('data.json', function(data) {
        $(eventBus).trigger('main:ready', data );
    });

    $(eventBus).on('change-page', function(e, pageId) {
        $(eventBus).trigger('page-changed', pageId );
    });

});

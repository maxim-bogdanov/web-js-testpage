import {eventBus} from './shared';
import '../components/menu-inner/menu-inner';
import '../components/inner-part/inner-part';
import { event, data } from 'jquery';


$(function(){

    let info = {};
   
    $.getJSON('data.json', function(data) {
        info = {
            data: data
        };
        $(eventBus).trigger('main:ready', data );
    });

    $(eventBus).on('change-page', function(e, pageId) {
        info.pageId = pageId;
        $(eventBus).trigger('page-changed', info );
    });

});

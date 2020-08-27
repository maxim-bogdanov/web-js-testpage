import {eventBus} from './shared';
import '../components/menu-inner/menu-inner';
import '../components/inner-part/inner-part';
import { event, data } from 'jquery';


$(function(){
   
    $.getJSON('data.json', function(data) {
        $(eventBus).trigger('main:ready', data );
    });

    $(eventBus).on('change-page', function(e, info) {
        console.log(info.pageId);
        // let info = {
        //     dataa: data,
        //     pageId: pageId
        // };
        $(eventBus).trigger('page-changed', info );
    });

});

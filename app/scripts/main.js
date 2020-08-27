import {eventBus} from './shared';
import '../components/menu-inner/menu-inner';


$(function(){
   
    $.getJSON('data.json', function(data) {
        $(eventBus).trigger('main:ready', data );
    });

});

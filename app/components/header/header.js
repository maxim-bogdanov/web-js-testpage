import { eventBus, $window, getLang } from '../../scripts/shared';

$(eventBus).on('main:ready',function(e, data){

    const $components = $('.header');
        if(!$components.length) return;

    $components.each((i,component) => {

        const $component = $(component);

        $('.header__menu', $component).on('click', function() {
            $(eventBus).trigger('open-menu');
        });

    })
})
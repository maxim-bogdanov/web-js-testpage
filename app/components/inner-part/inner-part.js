import { eventBus, $window } from '../../scripts/shared';

$(eventBus).on('main:ready', function(e, data){

    const $components = $('.inner-part');
    if(!$components.length) return;

    $components.each((i, component)=>{

        const $component = $(component);
        $(eventBus).on('page-changed', function(e, pageId){
            const page = data.pages[pageId];
            $(`.inner-part__title`, $component).html(page.title);
            $('.inner-part__image img', $component).attr('src', page.image);
            $('.inner-part-column', $component).each( function(index, elem) {
                $(this).html(page.content[index]);
            });
        });

    });
});

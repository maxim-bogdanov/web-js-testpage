import { eventBus, $window } from '../../scripts/shared';

$(eventBus).on('page-changed', function(e, info){
    const page = info.data.pages[info.pageId];
    $(`.inner-part__title`).html(page.title);
    $('.inner-part__image img').attr('src', page.image);
    $('.inner-part-column').each( function(index, elem) {
        $(this).html(page.content[index]);
    });

});

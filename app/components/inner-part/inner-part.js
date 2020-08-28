import { eventBus, $window, getLang, getIdPage } from '../../scripts/shared';

$(eventBus).on('main:ready', function(e, data){

    const $components = $('.inner-part');
    if(!$components.length) return;


    $components.each((i, component)=>{

        const $component = $(component);

        $(eventBus).on('language-changed', function(e, lang) {
            changeInnerPart();
        });

        $(eventBus).on('page-changed', function(e, pageId){
            changeInnerPart();
        });

        function changeInnerPart(){
            let lang = getLang();
            let pageId = getIdPage();
            const page = data.pages[pageId];
            $(`.inner-part__title`, $component).html(page.title[lang]);
            $('.inner-part__image img', $component).attr('src', page.image);
            $('.inner-part-column', $component).each( function(index, elem) {
                $(this).html(page.content[index][lang]); 
            });
        }
    });
});

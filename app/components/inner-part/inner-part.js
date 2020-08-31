import { eventBus, getIdPage } from '../../scripts/shared';

$(eventBus).on('main:ready', function(e, data){

    const $components = $('.inner-part');
    if(!$components.length) return;


    $components.each((i, component)=>{

        const $component = $(component);
        const TIME_FADING = 300;
        let isFirst = true;

        const tpl = Handlebars.compile($('.__tpl',$component).text());

        $(eventBus)
            .on('language-changed', fadeOutContent )
            .on('page-changed', fadeOutContent )
        ;

        function fadeOutContent() {
            if( isFirst ) {
                changeInnerPart();
                isFirst = false;
                return;
            }
            $component.fadeOut(TIME_FADING, changeInnerPart);
        }

        function changeInnerPart(){
            let pageId = getIdPage();
            const pageData = data.pages[pageId];

            $component.empty().append(tpl(pageData));

            // fadeOut уже сделан
            $component.fadeIn(TIME_FADING);
        }
    });
});

import { eventBus, getIdPage } from '../../scripts/shared';

$(eventBus).on('main:ready', function(e, data){

    const $components = $('.inner-part');
    if(!$components.length) return;


    $components.each((i, component)=>{

        const $component = $(component);
        const TIME_FADING = 300;
        let isFirst = true;
        
        let $title, $column, $img;
        function updateLinks(){
            $title = $(".inner-part__title", component);
            $column = $(".inner-part-column", component);
            $img = $(".inner-part__image", component);
        }

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
            
            updateLinks();
            //FadeOut
            gsap.to($title,  0.2, { opacity: 0});
            gsap.to($column,  0.3, { opacity: 0, delay: 0.2});
            gsap.to($img,  0.3, {
                opacity: 0,
                delay: 0.5,
                onComplete: changeInnerPart
            })
        }

        function changeInnerPart(){
            let pageId = getIdPage();
            const pageData = data.pages[pageId];

            $component.empty().append(tpl(pageData));

            updateLinks();

            // FadeIn
            gsap.from($title, .5, { x: 0, opacity: 0, scale: 0.8});
            gsap.from($column, .7, {y: 50, opacity: 0, delay: .5});
            gsap.from($img, .6, {x: -150, opacity: 0, delay: .5+.7});

        }
    });
});

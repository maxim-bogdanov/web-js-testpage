import { eventBus, $window } from '../../scripts/shared';

$(eventBus).on('main:ready',function(e, data){

    const $components = $('.menu-inner');
    if(!$components.length) return;

    $components.each((i,component) => {

        const $component = $(component);

        // Menu >>>
        const $menu = $('.menu-inner__list', $component ); // 1
        // const $menu = $component.find('.menu-inner__list'); // 2

        for (let elem of data.menu) {

            if (elem.isSeparator)
                $menu.append('<li class="menu-inner__item menu-inner__item-line"></li>');
            else {
                $menu.append(
                    [
                    '<li class="menu-inner__item">',
                        `<a href="${elem.href}" data-page-id="${elem.id}">${elem.title.ru}</a>`,
                    '</li>'
                    ].join('')
                );
            }
        }

        $('.menu-inner__item', $component).first().addClass('menu-inner__item_choosed');


        // Event change-page
        $('.menu-inner__item',$component).on('click', function(e) {
            e.preventDefault();
            const pageId = $('a', e.currentTarget).data('page-id');
            $(eventBus).trigger('change-page', pageId );
        });

        // Event page-changed
        $(eventBus).on('page-changed', function(e, pageId){
            $('.menu-inner__item_choosed',$component).removeClass('menu-inner__item_choosed');
            $(`[data-page-id="${pageId}"]`,$component).addClass('menu-inner__item_choosed');
        });

        // Event language-changed
        $(eventBus).on('language-changed', function(e, lang) {
            $('.menu-inner__item', $component).each( (index, menuItem) => {
                // если не разделитель
                if (!$(menuItem).filter(".menu-inner__item-line").length)
                    $(menuItem).find('a').html(data.menu[index].title[lang]);
            });
        });

        // Buttons >>>
        let butons = ''
        for (let button of data.menuButtons) {
            butons+=
                `<div class="button ${button.class}">`+
                    `<a class="button__text" href="${button.href}">${button.title}</a>`+
                `</div>`
            ;
        }
        $(`<div class="links-button">${butons}</div>`, $component).appendTo($menu);

        const $downloadButton = $('.menu-inner__download-button',$component);
        if( data.download && data.download.title ){
            $('.menu-inner__download-button-text', $component).html(data.download.title);
            $downloadButton.find('>a').attr('href',data.download.href);
        } else{
            $downloadButton.hide();
        }


        // Footer
        const $menuFooter = $('.menu-inner__footer',$component);
        $menuFooter.prepend(data.footer.copyright);
        const copyright2 = data.footer.copyright2;
        $('.menu-inner__footer-link', $component).attr('href', copyright2.href).attr('target', copyright2.target).html(copyright2.title);


    });

});
 
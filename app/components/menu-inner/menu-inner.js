import { eventBus, $window, getLang } from '../../scripts/shared';

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
                        `<a href="${elem.href}" data-page-id="${elem.id}">${elem.title[getLang()]}</a>`,
                    '</li>'
                    ].join('')
                );
            }
        }

        $('.menu-inner__item', $component).first().addClass('menu-inner__item_choosed');


        // Event menu-opened
        $(eventBus).on('menu-opened', function(e) {
            $('.menu-inner__wrapper', $component).addClass('menu-inner_visible');
        });

        // Event close-menu
        $('.menu-inner__button-close', $component).on('click', function() {
            $(eventBus).trigger('close-menu');
        });

        // Event menu-closed
        $(eventBus).on('menu-closed', function(e) {
            $('.menu-inner__wrapper', $component).removeClass('menu-inner_visible');
        });

        // Event change-page
        $('.menu-inner__item',$component).on('click', function(e) {
            e.preventDefault();
            const pageId = $('a', e.currentTarget).data('page-id');
            // тот же пункт
            if ($('.menu-inner__item_choosed',$component).data('page-id') === pageId) return;
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


        // Download >>>
        const $downloadButton = $('.menu-inner__download-button',$component);
        if( data.download && data.download.title ){
            $downloadButton.find('>a').attr('href',data.download.href);
        } else{
            $downloadButton.hide();
        }


        // Footer >>>
        
        const link = data.footer.link;

        $('.menu-inner__footer-link', $component).attr('href', link.href)
        .attr('target', link.target).html(link.title);

        var template = Handlebars.compile("<p>{{firstname}} {{firstname}}</p>");
        // execute the compiled template and print the output to the console
        $('.menu-inner__footer-link', $component).append(template({ firstname: "rocks!" }));

        // $('.menu-inner__footer-link', $component).after('<div></div>').addClass('hi'),html('hello');
    });

});
 
import { eventBus, $window } from '../../scripts/shared';

$(eventBus).on('main:ready',function(e, data){

    // Menu >>>
    let $menu = $('.menu-inner__list');

    for (let elem of data.menu) {

        if (elem.isSeparator)
            $menu.append('<li class="menu-inner__item menu-inner__item-line"></li>');
        else {
            $menu.append(
                [
                '<li class="menu-inner__item">',
                    `<a href="${elem.href}" data-page-id="${elem.id}">${elem.title}</a>`,
                '</li>'
                ].join('')
            );
        }
    }


    // Event change-page
    $('.menu-inner__item').on('click', function(e) {
        e.preventDefault();
        const pageId = $('a', e.currentTarget).data('page-id');
        let info = {
            data: data,
            pageId: pageId
        };
        $(eventBus).trigger('change-page', info );
    });

    // Event page-changed
    $(eventBus).on('page-changed', function(e, info){
        console.log(`.menu-inner__item[data-page-id="${info.pageId}"]`);
        $('.menu-inner__item_choosed').toggleClass('menu-inner__item_choosed');
        $(`.menu-inner__item >a[data-page-id="${info.pageId}"]`).toggleClass('menu-inner__item_choosed');
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
    $(`<div class="links-button">${butons}</div>`).appendTo($menu);

    const $downloadButton = $('.menu-inner__download-button');
    if( data.download && data.download.title ){
        $('.menu-inner__download-button-text').html(data.download.title);
        $downloadButton.find('>a').attr('href',data.download.href);
    } else{
        $downloadButton.hide();
    }


    // Footer
    const $menuFooter = $('.menu-inner__footer');
    $menuFooter.prepend(data.footer.copyright);
    const copyright2 = data.footer.copyright2;
    $('.menu-inner__footer-link').attr('href', copyright2.href).attr('target', copyright2.target).html(copyright2.title);

    
});
 
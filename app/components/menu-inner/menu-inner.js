import { eventBus, $window } from '../../scripts/shared';

$(eventBus).on('main:ready',function(e, data){
    
    console.log('=>', e, data);
    

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

    $('.menu-inner__item').on('click', function(e) {
        e.preventDefault();
        const pageId = $('a', e.currentTarget).data('page-id');
        console.log('click', pageId);
        $(eventBus).trigger('change-page', pageId );
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


    $menu.after('<div class="menu-inner__download"></div>');
    const $menuDownload =$('.menu-inner__download');

    const $downloadButton = $('.menu-inner__download-button');
    if( data.download && data.download.title ){
        $('.menu-inner__download-button-text').html(data.download.title);
        $downloadButton.find('>a').attr('href',data.download.href);
    }else{
        $downloadButton.hide();
    }


    // Footer
    /*
    $menuDownload.append(
        [
            `<div class="menu-inner__download-button">`,
            `<a class="link_button" href="${data.download.href}">`,
            `<div class="menu-inner__download-button-img"></div>`,
            `<div class="menu-inner__download-button-text">${data.download.title}</div></a></div>`
        ].join('')
    );
*/
    // $menuDownload.append(
    //     [
    //         `<p class="menu-inner__footer">`,
    //         `${data.footer.copyright}<br>`,
    //         `<a class='menu-inner__footer-link' ${data.footer.copyright2.attr}> ${data.footer.copyright2.title}</a>`
    //     ].join('')
    // );


    
});
 
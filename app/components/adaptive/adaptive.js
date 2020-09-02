import { eventBus, $window, getLang } from '../../scripts/shared';

$(window).on('load resize', function(e) {
    const $body = $('body');
    const windowWidth = window.innerWidth;

    $body.removeClass('is_phone is_desktop is_tablet');

    if (windowWidth < 768) $body.addClass('is_phone');
    else if (windowWidth >= 768 && windowWidth < 1024) $body.addClass('is_tablet');
    else $body.addClass('is_desktop');
});
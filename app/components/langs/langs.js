import { eventBus, $window } from '../../scripts/shared';
import { event } from 'jquery';

$(eventBus).on('main:ready', function(e, data){

    const $components = $('.langs');
    if(!$components.length) return;

    $components.each((i, component)=>{

        const $component = $(component);

        $component.find('p').html('ru');

        let langs = '';
        for (let lang of data.langs) {
            langs += `<li class="langs__item" data-lang="${lang}">${lang}</li>`;
        }

        $('.langs__items').append(langs);

        $component.on('click', function(e) {
            e.preventDefault();
            $(eventBus).trigger('open-list-languages', 'langs_active');
            const langAttr = $(e.target).attr('data-lang');
            if (langAttr) {
                $(eventBus).trigger('change-language', langAttr);
            }
        });

        $(eventBus).on('language-changed', function(e, langAttr) {
            $('p', $component).html(langAttr);
        });

        $(eventBus).on('languages-list-opened', function(e, activeClass) {
            $component.toggleClass(activeClass);
        });


    });
});

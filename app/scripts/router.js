import { eventBus, $window, getLang, getIdPage } from './shared';
import DataStorage from './utilits/DataStorage'
import { LocalStorage } from './utilits/LocalStorage'
import { Cookie } from './utilits/Cookie'

$(eventBus)
    .on('main:ready',function(e, _data){
        const root = null;
        const useHash = true;
        const hash = "#";
        const router = new Navigo(root, useHash, hash);
        const dataStorage = DataStorage;
        console.log('DataStorage',DataStorage);
        dataStorage.addDataStorage( [LocalStorage, Cookie] );

        dataStorage.setData("lang", getLang());

        $(`a[data-page-id]`).attr('href', (index, value) => value += '/' + dataStorage.getData('lang'));

        $($window).on('404error', function(e) {
            $('.inner-part').html('<div class="error404">Страница не найдена</div>');
        });

        $(eventBus).on('language-changed', function() {

            dataStorage.setData("lang", getLang());

            $(`a[data-page-id]`).attr('href', (index, value) => 
            value = value.slice(0, value.length - 2) + dataStorage.getData('lang'));

            router.navigate(getIdPage() + "/" + dataStorage.getData('lang'));
        });

        router.on({
            ':page/ru': function (params) {routerChangePage(params, 'ru')},
            ':page/en': function (params) {routerChangePage(params, 'en')},
            ':page/de': function (params) {routerChangePage(params, 'de')},
            ':page': function (params) {
                // если такой страницы нет
                const link = params.page + '/' + dataStorage.getData('lang');
                if (!$(`[href="${link}"]`).length) { 
                    $(eventBus).trigger('404error');
                    return;
                }

                router.navigate(params.page + "/" + dataStorage.getData('lang'));
            },
            '*': function(){
                // На главную если ничего нет
                router.navigate(_data.defaultIdPage + '/' + dataStorage.getData('lang'));
            }
        })
        .resolve();

        function routerChangePage(params, lang) {
                // если такой страницы нет
                if (!$(`[data-page-id=${params.page}]`).length) { 
                    $(eventBus).trigger('404error');
                    return;
                }
                
                // если другой язык, то меняем
                if (dataStorage.getData('lang') !== lang)
                    $(eventBus).trigger('change-language', lang);

                $(eventBus).trigger('change-page', params.page );
        }

    })

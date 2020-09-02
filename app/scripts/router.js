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

        $($window).on('404error', function(e) {
            $('.inner-part').html('<div class="error404">Страница не найдена</div>');
        });

        $(eventBus).on('language-changed', function() {
            // console.log(router.lastRouteResolved());

            dataStorage.setData("lang", getLang());
            console.log(dataStorage.getData('lang'));
            dataStorage.deleteData('lang');
            console.log(dataStorage.getData('lang'));
        });

        router.on({
            ':page': function (params) {
                // const $links = $(`.menu-inner__item a[data-navigo]`);
                // if (!$links.filter(`[href=${params.page}]`).length)

                // если такой страницы нет
                if (!$(`[href=${params.page}]`).length) { 
                    // throw new Error("404 not found");
                    $(eventBus).trigger('404error');
                    return;
                } 

                $(eventBus).trigger('change-page', params.page );
            },
            '*': function(){
                // На главную если ничего нет
                router.navigate(_data.defaultIdPage);
            }
        })
        // .notFound( (query) => console.log('not found') )
        .resolve();
        // let linkCurrentPage;


        

        /*
        const $components = $('.menu-inner__list');

        if(!$components.length) return;
    
        $components.each((i,component) => {
    
            const $component = $(component);
            
            let links = $('.menu-inner__item a', $component);
            sessionStorage.setItem('links', JSON.stringify(links));

            // router.on( () => links.last().attr('href') );
            // console.log(links.last().attr('href'));
            const mainPage = links.eq(0);

            // router.navigate(mainPage.attr('href'));

            // console.log(mainPage.data('page-id'));
            $(eventBus).trigger('change-page', mainPage.data('page-id'));

            $(eventBus).on('page-changed', function(e, pageId){

                let location = links.filter(`[data-page-id="${pageId}"]`).attr('href');
                linkCurrentPage = location;
                sessionStorage.setItem('linkCurrentPage', linkCurrentPage);
                router.navigate(location);

            });

            $($window).on('hashchange', function(e){
      
                const newLink = ((e.originalEvent.newURL).split(hash))[1];
                const pageId = links.filter(`[href="${newLink}"]`).data('page-id');
                $(eventBus).trigger('change-page', pageId);
            });
    
            router.resolve();
        });

        // var reloaded  = function(){...} //страницу перезагрузили

        // $($window).on('load', function() {
        //     let loaded = sessionStorage.getItem('loaded');
        //     if(loaded) {
        //         const pageId = links.filter(`[href="${linkCurrentPage}"]`).data('page-id');
        //         $(eventBus).trigger('change-page', pageId);
        //     } else {
        //         sessionStorage.setItem('loaded', true);
        //     }
        // })

        */

    })

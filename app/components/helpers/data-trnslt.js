import { eventBus, $window, getLang } from '../../scripts/shared';
import {getChildrenByStringPath} from '../../scripts/utils';
let data;

$(eventBus)
    .on('main:ready',function(e, _data){
        data = _data;
        setStaticData();
    })
    .on('language-changed',function(e, lang){
        setStaticData();
    })
;

function setStaticData() {
    $('[data-trnslt]').each((i,e) => {
        const $e = $(e);
        const contentPath = $e.data('trnslt').split(';');
        const textPath = `${contentPath[0]}[${getLang()}]`;
        // $e.html(getChildrenByStringPath(data, textPath) );

        if (!contentPath.length) return;
        contentPath.forEach( (elem, index) => {
            const attr = elem.split('|');

            // атрибуты
            if (attr.length > 1) {
                const attrPath = attr[0];
                const attrName = attr[1];
                $e.attr(attrName, getChildrenByStringPath(data, `${attrPath}[${getLang()}]`));
            // text
            } else {
                $e.html(getChildrenByStringPath(data, `${attr[0]}[${getLang()}]`));
            }
        });

    })
}
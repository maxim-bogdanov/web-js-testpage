import { eventBus, $window, getLang } from '../../scripts/shared';

let data;

$(eventBus)
    .on('main:ready',function(e, _data){
        data = _data;
        setStaticData();
    })
    .on('language-changed',function(e, lang){
        setStaticData();
    });

function setStaticData() {
    $('[data-trnslt]').each((i,e)=>{
        const $e = $(e);
        const contentPath = $e.data('trnslt');
        const fullPath = `${contentPath}[${getLang()}]`;
        $e.html(Object.byString(data, fullPath) );
    })
}

Object.byString = function(o, s) {
    s = s.replace(/\[(\w+)\]/g, '.$1'); // convert indexes to properties
    s = s.replace(/^\./, '');           // strip a leading dot
    var a = s.split('.');
    for (var i = 0, n = a.length; i < n; ++i) {
        var k = a[i];
        if (k in o) {
            o = o[k];
        } else {
            return;
        }
    }
    return o;
}
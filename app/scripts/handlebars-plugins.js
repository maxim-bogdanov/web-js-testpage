import Handlebars from 'handlebars';
import { getChildrenByStringPath } from './utils';
import { getLang } from './shared';

Handlebars.registerHelper("getContentByLang", function(objectName) {
    const lang = getLang();
    const text = getChildrenByStringPath(objectName, `[${lang}]`);
    return new Handlebars.SafeString(text);
});
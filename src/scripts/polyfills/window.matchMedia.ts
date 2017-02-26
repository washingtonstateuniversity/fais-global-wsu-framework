/*! matchMedia() polyfill - Test a CSS media type/query in JS.
    Authors & copyright (c) 2012: Scott Jehl, Paul Irish, Nicholas Zakas, David Knight. Dual MIT/BSD license
    || altered to work for typescritpt by Jeremy Bass in 2016 */
(<any>window).matchMedia = window.matchMedia || ((<any>window).matchMedia = function() {
    'use strict';

    // For browsers that support matchMedium api such as IE 9 and webkit
    let styleMedia = (window.styleMedia || (<any>window).media);

    // For those that don't support matchMedium
    if (!styleMedia) {
        let style: any  = document.createElement('style'),
            script: any = document.getElementsByTagName('script')[0],
            info: any   = null;

        style.type  = 'text/css';
        style.id    = 'matchmediajs-test';

        script.parentNode.insertBefore(style, script);

        // 'style.currentStyle' is used by IE <= 8 and 'window.getComputedStyle' for all other browsers
        info = ('getComputedStyle' in window) && window.getComputedStyle(style, null) || style.currentStyle;

        styleMedia = {
            matchMedium: function(media: any) {
                let text = '@media ' + media + '{ #matchmediajs-test { width: 1px; } }';

                // 'style.styleSheet' is used by IE <= 8 and 'style.textContent' for all other browsers
                if (style.styleSheet) {
                    style.styleSheet.cssText = text;
                } else {
                    style.textContent = text;
                }

                // Test if media query is true or false
                return info.width === '1px';
            }
        };
    }

    return function(media: any) {
        return {
            matches: styleMedia.matchMedium(media || 'all'),
            media: media || 'all'
        };
    };
}());

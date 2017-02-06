document.getElementsByTagName("html")[0].setAttribute('data-useragent', navigator.userAgent);
//to hell with things, let the dev decide if they want to set browser targeted stuff.
//aim is to assume anyone masking their agent know what they are getting in for yet is still accountable for too.

/*! matchMedia() polyfill - Test a CSS media type/query in JS. Authors & copyright (c) 2012: Scott Jehl, Paul Irish, Nicholas Zakas, David Knight. Dual MIT/BSD license || altered to work for typescritpt by Jeremy Bass*/
window.matchMedia || ((<any>window).matchMedia = function() {
    "use strict";

    // For browsers that support matchMedium api such as IE 9 and webkit
    var styleMedia = (window.styleMedia || (<any>window).media);

    // For those that don't support matchMedium
    if (!styleMedia) {
        var style :any  = document.createElement('style'),
            script :any = document.getElementsByTagName('script')[0],
            info :any   = null;

        style.type  = 'text/css';
        style.id    = 'matchmediajs-test';

        script.parentNode.insertBefore(style, script);

        // 'style.currentStyle' is used by IE <= 8 and 'window.getComputedStyle' for all other browsers
        info = ('getComputedStyle' in window) && window.getComputedStyle(style, null) || style.currentStyle;

        styleMedia = {
            matchMedium: function(media:any) {
                var text = '@media ' + media + '{ #matchmediajs-test { width: 1px; } }';

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

    return function(media:any) {
        return {
            matches: styleMedia.matchMedium(media || 'all'),
            media: media || 'all'
        };
    };
}());


(function($,jQuery){ // this will depend on jQuery


}((<any>window).jQuery,(<any>window).jQuery));

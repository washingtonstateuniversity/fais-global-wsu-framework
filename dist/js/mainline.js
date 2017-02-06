document.getElementsByTagName("html")[0].setAttribute('data-useragent', navigator.userAgent);
window.matchMedia || (window.matchMedia = function () {
    "use strict";
    var styleMedia = (window.styleMedia || window.media);
    if (!styleMedia) {
        var style = document.createElement('style'), script = document.getElementsByTagName('script')[0], info = null;
        style.type = 'text/css';
        style.id = 'matchmediajs-test';
        script.parentNode.insertBefore(style, script);
        info = ('getComputedStyle' in window) && window.getComputedStyle(style, null) || style.currentStyle;
        styleMedia = {
            matchMedium: function (media) {
                var text = '@media ' + media + '{ #matchmediajs-test { width: 1px; } }';
                if (style.styleSheet) {
                    style.styleSheet.cssText = text;
                }
                else {
                    style.textContent = text;
                }
                return info.width === '1px';
            }
        };
    }
    return function (media) {
        return {
            matches: styleMedia.matchMedium(media || 'all'),
            media: media || 'all'
        };
    };
}());
(function ($, jQuery) {
}(window.jQuery, window.jQuery));
//# sourceMappingURL=mainline.js.map
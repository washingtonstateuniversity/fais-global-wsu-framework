(function (window: any, UI: WSUuiStatic) {
     UI.test = function(){
        WSU._d('get to the UI');
        WSU._d(UI);
        WSU._d('1214'.leadingChars('0', 10));
    };

    // can extend this
    WSU.prime('actions.types', UI);
} (window, WSU.prime('ui', WSU) ) );

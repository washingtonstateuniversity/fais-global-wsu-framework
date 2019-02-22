(function (window: any, UTIL: WSUutilStatic) {
     UTIL.test = function(){
        WSU._d('get to the WSUutilStatic');
        WSU._d(UTIL);
        WSU._d('1214'.leadingChars('0', 10));
    };
    // can extend this
    WSU.prime('actions.types', UTIL);
} (window, WSU.prime('utilities', WSU) ) );

(function (window: any, UTIL: WSUutilStatic) {
    UTIL.dumpKeysRecursively = function (obj: any, regex: any) {
        var keys: any = [];
        regex = regex || false;
        var createKeyPath = function (currentKeyPath: any, key: any) {
            return currentKeyPath + (currentKeyPath ? '.' : '') + key;
        };
        (function (path: any, any: any) {
            var i: any, k: any, currentPath: any;
            if ( WSU.defined(any,"array") ) {
                for (i = 0; i < any.length; i += 1) {
                    currentPath = createKeyPath(path, (i).toString());
                    if (false !== regex) {
                        var pmatch = regex.exec(currentPath);
                        if (null !== pmatch) {
                            keys.push(currentPath);
                        }
                    } else {
                        keys.push(currentPath);
                    }
                    arguments.callee(currentPath, any[i]);
                }
            } else if ( !WSU.defined(any,"string") ) {
                for (k in any) {
                    if (any.hasOwnProperty(k)) {
                        currentPath = createKeyPath(path, k);
                        if (false !== regex) {
                            var rmatch = regex.exec(currentPath);
                            if (null !== rmatch) {
                                keys.push(currentPath);
                            }
                        } else {
                            keys.push(currentPath);
                        }
                        arguments.callee(currentPath, any[k]);
                    }
                }
            }
        })('', obj);
        return keys;
    };
} (window, WSU.prime('utilities', WSU) ) );

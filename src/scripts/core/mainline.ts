document.getElementsByTagName("html")[0].setAttribute('data-useragent', navigator.userAgent);
// to hell with things, let the dev decide if they want to set browser specific what have you.
// aim is to assume anyone masking their agent know what they are
// getting in for and is still accountable for too.


// Copied with permission from flexed
(<any>window).WSU = (<any>window).WSU || {};

(function (w: WSUstatic) {
    /**
     * Check if the first argument is not undefined first to speed check
     * then set to check if type defined as the second argument repersents.
     * a multi tool to strong type things by checking type most common
     * use is `w.defined(obj)` but `w.defined(obj,jQuery)` is super handy too
     *
     * @param {*} ns
     * @param {string} [type] named type to resolve to
     * @returns
     */
    w.defined = function(ns: any, type?: string) {
        if ('undefined' === typeof ns) {
            return false;
        }
        if ( 'undefined' !== typeof type ) {
            if ('array' === type) {
                return typeof ns === 'object' &&
                    Object.prototype.toString.call(ns) === '[object Array]';
            }
            if ('string' === type) {
                return Object.prototype.toString.call(ns) === '[object String]';
            }
            if ('number' === type) {
                return !w.defined(ns, 'array') && (ns - parseFloat( ns ) + 1) >= 0;
            }
            if ( 'object' === type ) {
                return Object.prototype.toString.call(ns) === '[object Object]';
            }
            if ( 'null' === type ) {
                return Object.prototype.toString.call(ns) === '[object Null]';
            }
            if ( 'undefined' !== typeof ns && typeof ns !== type && typeof ns === 'object' && typeof type === 'object') {
                return ns instanceof type;
            }
            return 'undefined' !== typeof ns && typeof ns === type;
        }
        return true;
    };

    /**
     * Still up for consideration.  not in current form but as shortcut?
     *
     * @param {*} ns
     * @param {*} [val]
     * @param {*} [ns_root]
     * @returns
     */
    w.define = function(ns: any, val?: any, ns_root?: any) {
        let parent = ns;
        if (!w.defined(ns, 'object')) {
            parent = w.prime(ns, ns_root);
        }
        try { // testing casue if it does fail well it did and that could be useful
            parent = val; // worried this will not update parent ns 100
            return true;
        } catch (e) {
            w._d(e);
            return false;
        }
    };

    /**
     * Set up containing object and merge all items from merge list.
     *
     * @param {*} obj
     * @returns concatenated object;
     */
    w.merge = function(obj: any) {
        let out: any = {};
        if(!w.defined(obj,'object')){
            return out;
        }
        for (let i = 0; i < obj.length; i++) {
            for (let p of Object.keys(obj[i]) ) { // let p in obj[i]) {
                out[p] = obj[i][p];
            }
        }
        return out;
    };

    /**
     * almost the same as w.prime but just mashes the collision of ns where
     * w.prime is is the decider
     *
     * @param {...any[]} p
     * @returns
     */
    w.extend = function(...p: any[]) {
        let options, name, src, copy, clone,
            target = arguments[0] || {},
            i = 1,
            length = arguments.length,
            deep = false;

        // Handle a deep copy situation
        if ( typeof target === 'boolean' ) {
            deep = target;
            // Skip the boolean and the target
            target = arguments[ i ] || {};
            i++;
        }

        // Handle case when target is a string or something (possible in deep copy)
        if ( !w.defined(target, 'object') && !w.defined(target, 'function') ) {
            target = {};
        }

        // Extend flexed itself if only one argument is passed
        if ( i === length ) {
            target = this;
            i--;
        }

        for ( ; i < length; i++ ) {
            // Only deal with non-null/undefined values
            if ( (options = arguments[ i ]) != null ) {
                // Extend the base object
                for ( name in options ) {
                    if ( !options.hasOwnProperty(name) ) {
                        continue;
                    }
                    src = target[ name ];
                    copy = options[ name ];

                    // Prevent never-ending loop
                    if ( target === copy ) {
                        continue;
                    }

                    // Recurse if we're merging plain objects or arrays
                    if ( deep && copy && w.defined(copy, 'object') ) {
                        if ( w.defined(copy, 'array') ) {
                            clone = src && w.defined(src, 'array') ? src : [];
                        } else {
                            clone = src && w.defined(src, 'object') ? src : {};
                        }
                        // Never move original objects, clone them
                        target[ name ] = w.extend( deep, clone, copy );
                    // Don't bring in undefined values
                    } else if ( copy !== undefined ) {
                        target[ name ] = copy;
                    }
                }
            }
        }
        // Return the modified object
        return target;
    };


    /**
     * Break up input into an array in order of defined namespace
     * recurse when not a string.
     *
     * @param {*} _ns
     * @returns {*} if a string input split to array on dot
     * @final {array[string]}
     */
    w.parse_ns = function (_ns: any): any { // should be able to refactor this bit
        let out: any = [];
        if ( !w.defined(_ns, 'object') ) { // eg string or number //was 'object' !== typeof _ns
            try {
                out = _ns.toString().split('.');
            } catch (e) { // so at this point it was not an object, number or string... what is it?
                w._i(e, _ns);
                return false;
            }
        } else {
            _ns.forEach(function (obj: any) {
                out = out.concat(w.parse_ns(obj));
            });
        }
        return out;
    };

     /**
     * Take namespace object, parse it, check for root object passed as
     * second argument, then start there.  Apply options of setting a value
     * if set as override or merge if ns collision occurs
     *
     * @param {*} ns
     * @param {*} [ns_root]
     * @param {*} [options]
     * @returns
     */
    w.get_ns = function (ns: any) {
        let parent = window, // alais to work with
            pl: number,
            i: number,
            out: any = null;

        let parts: any = w.parse_ns(ns);
        pl = parts.length;
        for (i = 0; i < pl; i++) {
            // create a property if it doesnt exist
            if ( w.defined( parent[parts[i]] ) || ((i === pl - 1)) ) {
                let value = parent[parts[i]] || {};
                out = value;
            }
            parent = parent[parts[i]];
        }
        return out;
    };

    /**
     * Still up for consideration.
     *
     * @param {string} ns_path load ns by file
     * @param {*} [callback] do something after
     */
    w.included = []; // tracker
    w.include = function (ns_path: string, callback?: any){
        if (!w.defined(w.included[ns_path])) { // if it is loaded don't worry
            let srpt = document.createElement('script');
            if ( w.defined(callback, 'function') ) {
                srpt.addEventListener('load', callback); // pass my hoisted function
            }
            srpt.src = ns_path + '.js';
            w.included.push(ns_path);
            document.querySelector('head').appendChild(srpt);
        }
    };

    /**
     * Set debug to console.  think field detector when leaving in production.
     *
     * @param {*} output
     * @returns {boolean} state of completion
     */
    w._d = function(output: any) {
        // return for consistency
         w.defined(WSU.state.debug) && WSU.state.debug && (<any>window).console.debug(output); // tslint:disable-line
    };

    /**
     * Set log to console.  think field detector when leaving in production.
     *
     * @param {*} a
     * @param {*} b
     * @returns  {boolean} state of completion
     */
    w._i = function(a: any, b: any) {
        // return for consistency
         w.defined(WSU.state.debug) && WSU.state.debug && (<any>window).console.info(a, b); // tslint:disable-line
    };


    /**
     * Take namespace object, parse it, check for root object passed as
     * second argument, then start there.  Apply options of setting a value
     * if set as override or merge if ns collision occurs
     *
     * @param {*} ns
     * @param {*} [ns_root]
     * @param {*} [options]
     * @returns
     */
    w.prime = function (ns: any, ns_root?: any, options?: any) {
        ns_root = ns_root || window; // set up the root object
        // make is do one can just put in a value and take the defaults
        options = options || {value: new Object};
        options = !w.defined(options.value) || !w.defined(options, 'object') ? {value : options} : options;
        // hulk smash?
        options = Object.assign({override: false, merge: true, deep: true}, options); // speed it in we trust it

        let parent = ns_root, // alias to work with
            pl: number,
            i: number;

        let parts: any = w.parse_ns(ns);
        pl = parts.length;
        for (i = 0; i < pl; i++) {
            // create a property if it doesn't exist
            if ( !w.defined( parent[parts[i]] ) || ((i === pl - 1)) ) {
                let value = w.defined(parent[parts[i]]) ? parent[parts[i]] : {};
                if ( (i === pl - 1) && w.defined(options.value)) {
                    if ( w.defined(value) && w.defined( options.merge ) && true === options.merge ) {
                        if ( w.defined(options.value, 'string') || w.defined(options.value, 'number') ) {
                            // really?  lol why would you?  but regardless don't build walls so leave
                            value = value + options.value;
                        } else if ( w.defined(options.value, 'boolean') ) {
                            value = options.value === true;
                        } else {
                            value = w.extend(options.deep, value, options.value); // Object.assign(value, options.value);
                        }
                    } else if ( true === options.override ) {
                        value = options.value;
                    }
                }
                parent[parts[i]] = value;
            }
            parent = parent[parts[i]];
        }
        return parent;
    };

    w.render = function (html:any, options:any) {
        // @todo add better error handling for emptys at the least
        var re, add:any, match, cursor, code:any, reExp:any, result;

        re = /<%(.+?)%>/g;
        reExp = /(^( )?(var|if|for|else|switch|case|break|{|}|;))(.*)?/g;
        code = "var r=[];\n";
        cursor = 0;

        add = function (line:any, js:any) {
            if (js) {
                code += line.match(reExp) ? line + "\n" : "r.push(" + line + ");\n";
            } else {
                code += line !== "" ? "r.push('" + line.replace(/'/g, "\"") + "');\n" : "";
            }
            return add;
        };

        while ((match = re.exec(html))) {
            add(html.slice(cursor, match.index))(match[1], true);
            cursor = match.index + match[0].length;
        }
        if(WSU.defined(html,'string')){
            add(html.substr(cursor, html.length - cursor));
            code = (code + "return r.join('');").replace(/[\r\t\n]/g, "");
            result = new Function(code).apply(options);
        }
        return result;
    };



    let funnies = [
        { u: 'A lot about living;', l: 'A little about love...' }
        , { u: 'Going for distance...', l: 'going for speed!!' }
        , { u: 'I\'ve got friends', l: 'in code places...' }
        , { u: 'Mama...', l: 'I just killed a bug' } ];
        let funny = funnies[Math.floor(Math.random() * funnies.length)];

        console.log( '%c      ___           ___           ___\n'
        + '     /\\  \\         /\\__\\         /\\  \\\n'
        + '    _\\:\\  \\       /:/ _/_        \\:\\  \\        ' + funny.u + '\n'
        + '   /\\ \\:\\  \\     /:/ /\\  \\        \\:\\  \\       ' + funny.l + '\n'
        + '  _\\:\\ \\:\\  \\   /:/ /::\\  \\   ___  \\:\\  \\\n'
        + ' /\\ \\:\\ \\:\\__\\ /:/_/:/\\:\\__\\ /\\  \\  \\:\\__\\\n'
        + ' \\:\\ \\:\\/:/  / \\:\\/:/ /:/  / \\:\\  \\ /:/  /    _________    _________\n'
        + '  \\:\\ \\::/  /   \\::/ /:/  /   \\:\\  /:/  /    / ____/   \|  /  _/ ___/\n'
        + '   \\:\\/:/  /     \\/_/:/  /     \\:\\/:/  /    / /_  / /| |  / / \\__ \\\n'
        + '    \\::/  /        /:/  /       \\::/  /    / __/ / ___ |_/ / ___/ /\n'
        + '     \\/__/         \\/__/         \\/__/    /_/   /_/  |_/___//____/\n'
        ,  'font-family:monospace');



    w.prime('state',   w,       { value: {},            override: false }); // honestly this shouldn't be this way, should be smarter
    w.prime('debug',   w.state, { value: false,         override: false, merge: false });
    w.prime('env',     w.state, { value: 'development', override: false, merge: false });
    w.prime('console', w.state, { value: true,          override: false, merge: false });
    console.log('c:' + w.state.console.toString() + ':d:'  + w.state.debug.toString() + ':e:' + w.state.env.toString().toLowerCase() );
    if ( ( !w.state.debug && w.state.env.toString().toLowerCase() !== 'development' )
         || !w.state.console ) {
        w.console = console;
        console.log('-- Turning console (general std_out) OFF');
        console.log = console.debug = console.info = console.warn = function( ) {};
    }

}(WSU));



/*
* jQuery helpers.  May move away from here, but must proxy anything
*/
(function($,jQuery){ // this will depend on jQuery
    jQuery.expr[":"].regex = function (elem:any, index:any, match:any) {
        var matchParams = match[3].split(","),
            validLabels = /^(data|css):/,
            attr = {
                method: matchParams[0].match(validLabels) ?
                            matchParams[0].split(":")[0] : "attr",
                property: matchParams.shift().replace(validLabels, "")
            },
            regexFlags = "ig",
            regex = new RegExp(matchParams.join("").replace(/^\s+|\s+$/g, ""), regexFlags);
        return regex.test(jQuery(elem)[attr.method](attr.property));
    };
    $.fn.overflown = function () { let e = this[0]; return e.scrollHeight > e.clientHeight || e.scrollWidth > e.clientWidth; };
    //targeted.uniqueId(); | removeUniqueId() // jQuery ext
    (function (factory) {
        if ( WSU.defined( (<any> window).define, "function") && (<any> window).define.amd) {
            // AMD. Register as an anonymous module.
            (<any> window).define(["jquery", "./version"], factory);
        } else {
            // Browser globals
            factory(jQuery);
        }
    }(function ($:any) {
        return jQuery.fn.extend({
            uniqueId: (function () {
                var uuid = 0;
                return function () {
                    return this.each(function () {
                        if (!this.id) {
                            this.id = "fw-trc-" + (++uuid);
                        }
                    });
                };
            })(),
            removeUniqueId: function () {
                return this.each(function () {
                    if (/^fw-trc-\d+$/.test(this.id)) {
                        $(this).removeAttr("id");
                    }
                });
            }
        });
    }));

    $.render = WSU.render;
}((<any>window).jQuery,(<any>window).jQuery));

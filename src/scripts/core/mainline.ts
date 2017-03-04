document.getElementsByTagName("html")[0].setAttribute('data-useragent', navigator.userAgent);
//to hell with things, let the dev decide if they want to set browser targeted stuff.
//aim is to assume anyone masking their agent know what they are getting in for yet is still accountable for too.


// Copied with permission from flexed
(<any>window).WSU = (<any>window).WSU || {};

(function (w: WSUstatic) {
    // a multi tool to strong type things by checking type
    // most common use is `w.defined(type)`
    w.defined = function(ns: any, type?: any) {
        if ( w.defined(type) ) {
            if ('array' === type) {
                return typeof ns === 'object' &&
                    Object.prototype.toString.call(ns) === '[object Array]';
            }
            if ('string' === type) {
                return Object.prototype.toString.call(ns) === '[object String]';
            }
            if( w.defined(ns) && typeof ns !== type && typeof type === 'object'){
                return ns instanceof type;
            }
            return w.defined(ns) && typeof ns === type;
        }
        return 'undefined' !== typeof ns;
    };
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
    w.merge = function(obj: any) {
        let out: any = {};
        for (let i = 0; i < obj.length; i++) {
            for (let p of Object.keys(obj[i]) ) { // let p in obj[i]) {
                out[p] = obj[i][p];
            }
        }
        return out;
    };
    w.prime = function (ns: any, ns_root?: any, options?: any) {
        ns_root = ns_root || window;
        // hulk smash?
        options = Object.assign({value:{},override:true,merge:true}, options);// options || {value:{},override:false,};

        var parent = ns_root,
            pl: number,
            i: number;

        function build_ns(_ns: any): any { // should be able to refactor this bit
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
                    out = out.concat(build_ns(obj));
                });
            }
            return out;
        }

        let parts: any = build_ns(ns);
        pl = parts.length;
        for (i = 0; i < pl; i++) {
            // create a property if it doesnt exist
            if ( !w.defined( parent[parts[i]] ) || ((i === pl - 1)) ) {
                let value = parent[parts[i]] || {};
                if ( (i === pl - 1) && w.defined(options.value) && w.defined( options.override ) && true === options.override ) {
                    if( w.defined(value) && w.defined( options.merge ) && true === options.merge){
                        // text options.value over value as the writer should defined and test
                        if(w.defined(options.value,"string") || w.defined(options.value,"number")){// really?  lol why would you?  but regardless don't build walls so leave
                            value = value + options.value;
                        } else if(w.defined(options.value,"boolean") ) {
                            value = options.value;
                        } else {
                            value = w.merge([value, options.value]);//Object.assign(value, options.value);
                        }
                    }else{
                        value = options.value;
                    }
                }
                parent[parts[i]] = value;
            }
            parent = parent[parts[i]];
        }
        return parent;
    };
    w.included = [];
    w.include = function (ns_path: string, callback?: any){
        if (!w.defined(w.included[ns_path])) {// if it is loaded don't worry
            let srpt = document.createElement('script');
            if ( w.defined(callback, 'function') ) {
                srpt.addEventListener('load', callback); // pass my hoisted function
            }
            srpt.src = ns_path + '.js';
            w.included.push(ns_path);
            document.querySelector('head').appendChild(srpt);
        }
    };

    w._d = function(output: any) {
        // return for consistency
         w.defined(WSU.state.debug) && WSU.state.debug && (<any>window).console.debug(output); // tslint:disable-line
    };
    w._i = function(a: any, b: any) {
        // return for consistency
         w.defined(WSU.state.debug) && WSU.state.debug && (<any>window).console.info(a, b); // tslint:disable-line
    };
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

    $.render = function (html:any, options:any) {
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
}((<any>window).jQuery,(<any>window).jQuery));

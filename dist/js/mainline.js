if (!Array.prototype.indexOf) {
    Array.prototype.indexOf = function (obj, start) {
        for (var i = (start || 0), j = this.length; i < j; i++) {
            if (this[i] === obj) {
                return i;
            }
        }
        return -1;
    };
}
if (!Array.prototype["remove"]) {
    Array.prototype["remove"] = function () {
        var what, a = arguments, L = a.length, ax;
        while (L && this.length) {
            what = a[--L];
            while ((ax = this.indexOf(what)) !== -1) {
                this.splice(ax, 1);
            }
        }
        return this;
    };
}
if (typeof Object.assign != 'function') {
    Object.assign = function (target) {
        'use strict';
        if (target == null) {
            throw new TypeError('Cannot convert undefined or null to object');
        }
        target = Object(target);
        for (var index = 1; index < arguments.length; index++) {
            var source = arguments[index];
            if (source != null) {
                for (var key in source) {
                    if (Object.prototype.hasOwnProperty.call(source, key)) {
                        target[key] = source[key];
                    }
                }
            }
        }
        return target;
    };
}
if (!String.prototype.endsWith) {
    String.prototype.endsWith = function (chars) {
        return this.substr(-chars.length) === chars;
    };
}
if (!String.prototype.leadingChars) {
    String.prototype.leadingChars = function (chars, length) {
        if (length > 0) {
            return (chars.toString().repeat(length) + this).substr(-length);
        }
        else {
            return (this + chars.toString().repeat(-length)).substr(0, -length);
        }
    };
}
if (!String.prototype.toCamelCase) {
    String.prototype.toCamelCase = function () {
        return this.replace(/(?:^\w|[A-Z]|-|\b\w)/g, function (ltr, idx) { return idx === 0
            ? ltr.toLowerCase()
            : ltr.toUpperCase(); }).replace(/\s+|-/g, '');
    };
}
window.matchMedia = window.matchMedia || (window.matchMedia = function () {
    'use strict';
    var styleMedia = (window.styleMedia || window.media);
    if (!styleMedia) {
        var style_1 = document.createElement('style'), script = document.getElementsByTagName('script')[0], info_1 = null;
        style_1.type = 'text/css';
        style_1.id = 'matchmediajs-test';
        script.parentNode.insertBefore(style_1, script);
        info_1 = ('getComputedStyle' in window) && window.getComputedStyle(style_1, null) || style_1.currentStyle;
        styleMedia = {
            matchMedium: function (media) {
                var text = '@media ' + media + '{ #matchmediajs-test { width: 1px; } }';
                if (style_1.styleSheet) {
                    style_1.styleSheet.cssText = text;
                }
                else {
                    style_1.textContent = text;
                }
                return info_1.width === '1px';
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
document.getElementsByTagName("html")[0].setAttribute('data-useragent', navigator.userAgent);
window.WSU = window.WSU || {};
(function (w) {
    w.defined = function (ns, type) {
        if ('undefined' === typeof ns) {
            return false;
        }
        if ('undefined' !== typeof type) {
            if ('array' === type) {
                return typeof ns === 'object' &&
                    Object.prototype.toString.call(ns) === '[object Array]';
            }
            if ('string' === type) {
                return Object.prototype.toString.call(ns) === '[object String]';
            }
            if ('number' === type) {
                return !w.defined(ns, 'array') && (ns - parseFloat(ns) + 1) >= 0;
            }
            if ('object' === type) {
                return Object.prototype.toString.call(ns) === '[object Object]';
            }
            if ('null' === type) {
                return Object.prototype.toString.call(ns) === '[object Null]';
            }
            if ('undefined' !== typeof ns && typeof ns !== type && typeof ns === 'object' && typeof type === 'object') {
                return ns instanceof type;
            }
            return 'undefined' !== typeof ns && typeof ns === type;
        }
        return true;
    };
    w.define = function (ns, val, ns_root) {
        var parent = ns;
        if (!w.defined(ns, 'object')) {
            parent = w.prime(ns, ns_root);
        }
        try {
            parent = val;
            return true;
        }
        catch (e) {
            w._d(e);
            return false;
        }
    };
    w.merge = function (obj) {
        var out = {};
        if (!w.defined(obj, 'object')) {
            return out;
        }
        for (var i = 0; i < obj.length; i++) {
            for (var _a = 0, _b = Object.keys(obj[i]); _a < _b.length; _a++) {
                var p = _b[_a];
                out[p] = obj[i][p];
            }
        }
        return out;
    };
    w.extend = function () {
        var p = [];
        for (var _a = 0; _a < arguments.length; _a++) {
            p[_a] = arguments[_a];
        }
        var options, name, src, copy, clone, target = arguments[0] || {}, i = 1, length = arguments.length, deep = false;
        if (typeof target === 'boolean') {
            deep = target;
            target = arguments[i] || {};
            i++;
        }
        if (!w.defined(target, 'object') && !w.defined(target, 'function')) {
            target = {};
        }
        if (i === length) {
            target = this;
            i--;
        }
        for (; i < length; i++) {
            if ((options = arguments[i]) != null) {
                for (name in options) {
                    if (!options.hasOwnProperty(name)) {
                        continue;
                    }
                    src = target[name];
                    copy = options[name];
                    if (target === copy) {
                        continue;
                    }
                    if (deep && copy && w.defined(copy, 'object')) {
                        if (w.defined(copy, 'array')) {
                            clone = src && w.defined(src, 'array') ? src : [];
                        }
                        else {
                            clone = src && w.defined(src, 'object') ? src : {};
                        }
                        target[name] = w.extend(deep, clone, copy);
                    }
                    else if (copy !== undefined) {
                        target[name] = copy;
                    }
                }
            }
        }
        return target;
    };
    w.parse_ns = function (_ns) {
        var out = [];
        if (!w.defined(_ns)) {
            return out;
        }
        if (!w.defined(_ns, 'object')) {
            try {
                out = _ns.toString().split('.');
            }
            catch (e) {
                w._i(e, _ns);
                return false;
            }
        }
        else {
            _ns.forEach(function (obj) {
                out = out.concat(w.parse_ns(obj));
            });
        }
        return out;
    };
    w.get_ns = function (ns) {
        var parent = window, pl, i, out = null;
        var parts = w.parse_ns(ns);
        pl = parts.length;
        for (i = 0; i < pl; i++) {
            if (w.defined(parent[parts[i]]) || ((i === pl - 1))) {
                var value = parent[parts[i]] || {};
                out = value;
            }
            parent = parent[parts[i]];
        }
        return out;
    };
    w.included = [];
    w.include = function (ns_path, callback) {
        if (w.defined(ns_path, "string") && !w.defined(w.included[ns_path])) {
            var srpt = document.createElement('script');
            if (w.defined(callback, 'function')) {
                srpt.addEventListener('load', callback);
            }
            srpt.src = ns_path + '.js';
            w.included.push(ns_path);
            document.querySelector('head').appendChild(srpt);
        }
    };
    w._d = function (output) {
        w.defined(WSU.state.debug) && WSU.state.debug && window.console.debug(output);
    };
    w._i = function (a, b) {
        w.defined(WSU.state.debug) && WSU.state.debug && window.console.info(a, b);
    };
    w.prime = function (ns, ns_root, options) {
        ns_root = ns_root || window;
        options = options || { value: new Object };
        options = !w.defined(options.value) || !w.defined(options, 'object') ? { value: options } : options;
        options = Object.assign({ override: false, merge: true, deep: true }, options);
        var parent = ns_root, pl, i;
        var parts = w.parse_ns(ns);
        pl = parts.length;
        for (i = 0; i < pl; i++) {
            if (!w.defined(parent[parts[i]]) || ((i === pl - 1))) {
                var value = w.defined(parent[parts[i]]) ? parent[parts[i]] : {};
                if ((i === pl - 1) && w.defined(options.value)) {
                    if (w.defined(value) && w.defined(options.merge) && true === options.merge) {
                        if (w.defined(options.value, 'string') || w.defined(options.value, 'number')) {
                            value = value + options.value;
                        }
                        else if (w.defined(options.value, 'boolean')) {
                            value = options.value === true;
                        }
                        else {
                            value = w.extend(options.deep, value, options.value);
                        }
                    }
                    else if (true === options.override) {
                        value = options.value;
                    }
                }
                parent[parts[i]] = value;
            }
            parent = parent[parts[i]];
        }
        return parent;
    };
    w.render = function (html, options) {
        var re, add, match, cursor, code, reExp, result;
        re = /<%(.+?)%>/g;
        reExp = /(^( )?(var|if|for|else|switch|case|break|{|}|;))(.*)?/g;
        code = "var r=[];\n";
        cursor = 0;
        add = function (line, js) {
            if (js) {
                code += line.match(reExp) ? line + "\n" : "r.push(" + line + ");\n";
            }
            else {
                code += line !== "" ? "r.push('" + line.replace(/'/g, "\"") + "');\n" : "";
            }
            return add;
        };
        while ((match = re.exec(html))) {
            add(html.slice(cursor, match.index))(match[1], true);
            cursor = match.index + match[0].length;
        }
        if (WSU.defined(html, 'string')) {
            add(html.substr(cursor, html.length - cursor));
            code = (code + "return r.join('');").replace(/[\r\t\n]/g, "");
            result = new Function(code).apply(options);
        }
        return result;
    };
    var funnies = [
        { u: 'A lot about living;', l: 'A little about love...' },
        { u: 'Going for distance...', l: 'going for speed!!' },
        { u: 'I\'ve got friends', l: 'in code places...' },
        { u: 'Mama...', l: 'I just killed a bug' }
    ];
    var funny = funnies[Math.floor(Math.random() * funnies.length)];
    console.log('%c      ___           ___           ___\n'
        + '     /\\  \\         /\\__\\         /\\  \\\n'
        + '    _\\:\\  \\       /:/ _/_        \\:\\  \\        ' + funny.u + '\n'
        + '   /\\ \\:\\  \\     /:/ /\\  \\        \\:\\  \\       ' + funny.l + '\n'
        + '  _\\:\\ \\:\\  \\   /:/ /::\\  \\   ___  \\:\\  \\\n'
        + ' /\\ \\:\\ \\:\\__\\ /:/_/:/\\:\\__\\ /\\  \\  \\:\\__\\\n'
        + ' \\:\\ \\:\\/:/  / \\:\\/:/ /:/  / \\:\\  \\ /:/  /    _________    _________\n'
        + '  \\:\\ \\::/  /   \\::/ /:/  /   \\:\\  /:/  /    / ____/   \|  /  _/ ___/\n'
        + '   \\:\\/:/  /     \\/_/:/  /     \\:\\/:/  /    / /_  / /| |  / / \\__ \\\n'
        + '    \\::/  /        /:/  /       \\::/  /    / __/ / ___ |_/ / ___/ /\n'
        + '     \\/__/         \\/__/         \\/__/    /_/   /_/  |_/___//____/\n', 'font-family:monospace');
    w.prime('state', w, { value: {}, override: false });
    w.prime('debug', w.state, { value: false, override: false, merge: false });
    w.prime('env', w.state, { value: 'development', override: false, merge: false });
    w.prime('console', w.state, { value: true, override: false, merge: false });
    console.log('c:' + w.state.console.toString() + ':d:' + w.state.debug.toString() + ':e:' + w.state.env.toString().toLowerCase());
    if ((!w.state.debug && w.state.env.toString().toLowerCase() !== 'development')
        || !w.state.console) {
        w.console = console;
        console.log('-- Turning console (general std_out) OFF');
        console.log = console.debug = console.info = console.warn = function () { };
    }
}(WSU));
(function ($, jQuery) {
    jQuery.expr[":"].regex = function (elem, index, match) {
        var matchParams = match[3].split(","), validLabels = /^(data|css):/, attr = {
            method: matchParams[0].match(validLabels) ?
                matchParams[0].split(":")[0] : "attr",
            property: matchParams.shift().replace(validLabels, "")
        }, regexFlags = "ig", regex = new RegExp(matchParams.join("").replace(/^\s+|\s+$/g, ""), regexFlags);
        return regex.test(jQuery(elem)[attr.method](attr.property));
    };
    $.fn.overflown = function () { var e = this[0]; return e.scrollHeight > e.clientHeight || e.scrollWidth > e.clientWidth; };
    (function (factory) {
        if (WSU.defined(window.define, "function") && window.define.amd) {
            window.define(["jquery", "./version"], factory);
        }
        else {
            factory(jQuery);
        }
    }(function ($) {
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
}(window.jQuery, window.jQuery));
(function (window, UI) {
    UI.test = function () {
        WSU._d('get to the UI');
        WSU._d(UI);
        WSU._d('1214'.leadingChars('0', 10));
    };
    WSU.prime('actions.types', UI);
}(window, WSU.prime('ui', WSU)));
(function (window, UTIL) {
    UTIL.dumpKeysRecursively = function (obj, regex) {
        var keys = [];
        regex = regex || false;
        var createKeyPath = function (currentKeyPath, key) {
            return currentKeyPath + (currentKeyPath ? '.' : '') + key;
        };
        (function (path, any) {
            var i, k, currentPath;
            if (WSU.defined(any, "array")) {
                for (i = 0; i < any.length; i += 1) {
                    currentPath = createKeyPath(path, (i).toString());
                    if (false !== regex) {
                        var pmatch = regex.exec(currentPath);
                        if (null !== pmatch) {
                            keys.push(currentPath);
                        }
                    }
                    else {
                        keys.push(currentPath);
                    }
                    arguments.callee(currentPath, any[i]);
                }
            }
            else if (!WSU.defined(any, "string")) {
                for (k in any) {
                    if (any.hasOwnProperty(k)) {
                        currentPath = createKeyPath(path, k);
                        if (false !== regex) {
                            var rmatch = regex.exec(currentPath);
                            if (null !== rmatch) {
                                keys.push(currentPath);
                            }
                        }
                        else {
                            keys.push(currentPath);
                        }
                        arguments.callee(currentPath, any[k]);
                    }
                }
            }
        })('', obj);
        return keys;
    };
}(window, WSU.prime('utilities', WSU)));
(function (window, UTIL) {
    UTIL.test = function () {
        WSU._d('get to the WSUutilStatic');
        WSU._d(UTIL);
        WSU._d('1214'.leadingChars('0', 10));
    };
    WSU.prime('actions.types', UTIL);
}(window, WSU.prime('utilities', WSU)));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbmxpbmUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvc2NyaXB0cy9wb2x5ZmlsbHMvYXJyYXkucHJvdG90eXBlLmluZGV4b2YudHMiLCIuLi8uLi9zcmMvc2NyaXB0cy9wb2x5ZmlsbHMvYXJyYXkucHJvdG90eXBlLnJlbW92ZS50cyIsIi4uLy4uL3NyYy9zY3JpcHRzL3BvbHlmaWxscy9vYmplY3QuYXNzaWduLnRzIiwiLi4vLi4vc3JjL3NjcmlwdHMvcG9seWZpbGxzL3N0cmluZy5wcm90b3R5cGUuZW5kc1dpdGgudHMiLCIuLi8uLi9zcmMvc2NyaXB0cy9wb2x5ZmlsbHMvc3RyaW5nLnByb3RvdHlwZS5sZWFkaW5nQ2hhci50cyIsIi4uLy4uL3NyYy9zY3JpcHRzL3BvbHlmaWxscy9zdHJpbmcucHJvdG90eXBlLnRvQ2FtZWxDYXNlLnRzIiwiLi4vLi4vc3JjL3NjcmlwdHMvcG9seWZpbGxzL3dpbmRvdy5tYXRjaE1lZGlhLnRzIiwiLi4vLi4vc3JjL3NjcmlwdHMvY29yZS9tYWlubGluZS50cyIsIi4uLy4uL3NyYy9zY3JpcHRzL3VpL21haW5saW5lLnRzIiwiLi4vLi4vc3JjL3NjcmlwdHMvdXRpbGl0aWVzL2R1bXBLZXlzUmVjdXJzaXZlbHkvZHVtcEtleXNSZWN1cnNpdmVseS50cyIsIi4uLy4uL3NyYy9zY3JpcHRzL3V0aWxpdGllcy9tYWlubGluZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxPQUFPLEVBQUU7SUFDMUIsS0FBSyxDQUFDLFNBQVMsQ0FBQyxPQUFPLEdBQUcsVUFBUyxHQUFHLEVBQUUsS0FBSztRQUN6QyxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxJQUFJLENBQUMsQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUU7WUFDcEQsSUFBSSxJ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Q0o7UUFDTCxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsR0FBRyxDQUFDLENBQUM7UUFDWixPQUFPLElBQUksQ0FBQztJQUNoQixDQUFDLENBQUM7QUFDTixDQUFDLENBQUUsTUFBTSxFQUFFLEdBQUcsQ0FBQyxLQUFLLENBQUMsV0FBVyxFQUFFLEdBQUcsQ0FBQyxDQUFFLENBQUUsQ0FBQztBQ3pDM0MsQ0FBQyxVQUFVLE1BQVcsRUFBRSxJQUFtQjtJQUN0QyxJQUFJLENBQUMsSUFBSSxHQUFHO1FBQ1QsR0FBRyxDQUFDLEVBQUUsQ0FBQywwQkFBMEIsQ0FBQyxDQUFDO1FBQ25DLEdBQUcsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDYixHQUFHLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxZQUFZLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDekMsQ0FBQyxDQUFDO0lBRUYsR0FBRyxDQUFDLEtBQUssQ0FBQyxlQUFlLEVBQUUsSUFBSSxDQUFDLENBQUM7QUFDckMsQ0FBQyxDQUFFLE1BQU0sRUFBRSxHQUFHLENBQUMsS0FBSyxDQUFDLFdBQVcsRUFBRSxHQUFHLENBQUMsQ0FBRSxDQUFFLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpZiAoIUFycmF5LnByb3RvdHlwZS5pbmRleE9mKSB7XG4gICAgQXJyYXkucHJvdG90eXBlLmluZGV4T2YgPSBmdW5jdGlvbihvYmosIHN0YXJ0KSB7XG4gICAgICAgIGZvciAobGV0IGkgPSAoc3RhcnQgfHwgMCksIGogPSB0aGlzLmxlbmd0aDsgaSA8IGo7IGkrKykge1xuICAgICAgICAgICAgaWYgKHRoaXNbaV0gPT09IG9iaikgeyByZXR1cm4gaTsgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiAtMTtcbiAgICB9O1xufVxuIiwiaWYgKCFBcnJheS5wcm90b3R5cGVbXCJyZW1vdmVcIl0pIHtcbiAgICBBcnJheS5wcm90b3R5cGVbXCJyZW1vdmVcIl0gPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciB3aGF0OiBhbnksIGEgPSBhcmd1bWVudHMsIEwgPSBhLmxlbmd0aCwgYXg6IGFueTtcbiAgICAgICAgd2hpbGUgKEwgJiYgdGhpcy5sZW5ndGgpIHtcbiAgICAgICAgICAgIHdoYXQgPSBhWy0tTF07XG4gICAgICAgICAgICB3aGlsZSAoKGF4ID0gdGhpcy5pbmRleE9mKHdoYXQpKSAhPT0gLTEpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNwbGljZShheCwgMSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxufVxuIiwiaWYgKHR5cGVvZiBPYmplY3QuYXNzaWduICE9ICdmdW5jdGlvbicpIHtcbiAgT2JqZWN0LmFzc2lnbiA9IGZ1bmN0aW9uKHRhcmdldDphbnkpIHtcbiAgICAndXNlIHN0cmljdCc7XG4gICAgaWYgKHRhcmdldCA9PSBudWxsKSB7XG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdDYW5ub3QgY29udmVydCB1bmRlZmluZWQgb3IgbnVsbCB0byBvYmplY3QnKTtcbiAgICB9XG5cbiAgICB0YXJnZXQgPSBPYmplY3QodGFyZ2V0KTtcbiAgICBmb3IgKHZhciBpbmRleCA9IDE7IGluZGV4IDwgYXJndW1lbnRzLmxlbmd0aDsgaW5kZXgrKykge1xuICAgICAgdmFyIHNvdXJjZSA9IGFyZ3VtZW50c1tpbmRleF07XG4gICAgICBpZiAoc291cmNlICE9IG51bGwpIHtcbiAgICAgICAgZm9yICh2YXIga2V5IGluIHNvdXJjZSkge1xuICAgICAgICAgIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoc291cmNlLCBrZXkpKSB7XG4gICAgICAgICAgICB0YXJnZXRba2V5XSA9IHNvdXJjZVtrZXldO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdGFyZ2V0O1xuICB9O1xufVxuIiwiaWYgKCFTdHJpbmcucHJvdG90eXBlLmVuZHNXaXRoKSB7XG4gICAgU3RyaW5nLnByb3RvdHlwZS5lbmRzV2l0aCA9IGZ1bmN0aW9uIChjaGFyczogc3RyaW5nKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnN1YnN0cigtY2hhcnMubGVuZ3RoKSA9PT0gY2hhcnM7XG4gICAgfTtcbn1cbiIsImlmICghU3RyaW5nLnByb3RvdHlwZS5sZWFkaW5nQ2hhcnMpIHtcbiAgICBTdHJpbmcucHJvdG90eXBlLmxlYWRpbmdDaGFycyA9IGZ1bmN0aW9uIChjaGFyczogc3RyaW5nfG51bWJlciwgbGVuZ3RoOiBudW1iZXIpOiBzdHJpbmcgIHtcbiAgICAgICAgaWYobGVuZ3RoPjApe1xuICAgICAgICAgICAgcmV0dXJuIChjaGFycy50b1N0cmluZygpLnJlcGVhdChsZW5ndGgpICsgdGhpcykuc3Vic3RyKC1sZW5ndGgpOyAvL251bWJlciBpcyBwb3NpdGl2ZSwgc28gY3V0IGZyb20gcmlnaHQgYWthIGxlYWRpbmdcbiAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICByZXR1cm4gKHRoaXMgKyBjaGFycy50b1N0cmluZygpLnJlcGVhdCgtbGVuZ3RoKSkuc3Vic3RyKDAsLWxlbmd0aCk7XG4gICAgICAgIH1cbiAgICB9O1xufVxuIiwiaWYgKCFTdHJpbmcucHJvdG90eXBlLnRvQ2FtZWxDYXNlKSB7XG4gICAgU3RyaW5nLnByb3RvdHlwZS50b0NhbWVsQ2FzZSA9IGZ1bmN0aW9uKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLnJlcGxhY2UoLyg/Ol5cXHd8W0EtWl18LXxcXGJcXHcpL2csXG4gICAgICAgIChsdHI6YW55LCBpZHg6YW55KSA9PiBpZHggPT09IDBcbiAgICAgICAgICAgICAgICA/IGx0ci50b0xvd2VyQ2FzZSgpXG4gICAgICAgICAgICAgICAgOiBsdHIudG9VcHBlckNhc2UoKVxuICAgICAgICApLnJlcGxhY2UoL1xccyt8LS9nLCAnJyk7XG4gICAgfTtcbn1cbiIsIi8qISBtYXRjaE1lZGlhKCkgcG9seWZpbGwgLSBUZXN0IGEgQ1NTIG1lZGlhIHR5cGUvcXVlcnkgaW4gSlMuXG4gICAgQXV0aG9ycyAmIGNvcHlyaWdodCAoYykgMjAxMjogU2NvdHQgSmVobCwgUGF1bCBJcmlzaCwgTmljaG9sYXMgWmFrYXMsIERhdmlkIEtuaWdodC4gRHVhbCBNSVQvQlNEIGxpY2Vuc2VcbiAgICB8fCBhbHRlcmVkIHRvIHdvcmsgZm9yIHR5cGVzY3JpdHB0IGJ5IEplcmVteSBCYXNzIGluIDIwMTYgKi9cbig8YW55PndpbmRvdykubWF0Y2hNZWRpYSA9IHdpbmRvdy5tYXRjaE1lZGlhIHx8ICgoPGFueT53aW5kb3cpLm1hdGNoTWVkaWEgPSBmdW5jdGlvbigpIHtcbiAgICAndXNlIHN0cmljdCc7XG5cbiAgICAvLyBGb3IgYnJvd3NlcnMgdGhhdCBzdXBwb3J0IG1hdGNoTWVkaXVtIGFwaSBzdWNoIGFzIElFIDkgYW5kIHdlYmtpdFxuICAgIGxldCBzdHlsZU1lZGlhID0gKHdpbmRvdy5zdHlsZU1lZGlhIHx8ICg8YW55PndpbmRvdykubWVkaWEpO1xuXG4gICAgLy8gRm9yIHRob3NlIHRoYXQgZG9uJ3Qgc3VwcG9ydCBtYXRjaE1lZGl1bVxuICAgIGlmICghc3R5bGVNZWRpYSkge1xuICAgICAgICBsZXQgc3R5bGU6IGFueSAgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzdHlsZScpLFxuICAgICAgICAgICAgc2NyaXB0OiBhbnkgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnc2NyaXB0JylbMF0sXG4gICAgICAgICAgICBpbmZvOiBhbnkgICA9IG51bGw7XG5cbiAgICAgICAgc3R5bGUudHlwZSAgPSAndGV4dC9jc3MnO1xuICAgICAgICBzdHlsZS5pZCAgICA9ICdtYXRjaG1lZGlhanMtdGVzdCc7XG5cbiAgICAgICAgc2NyaXB0LnBhcmVudE5vZGUuaW5zZXJ0QmVmb3JlKHN0eWxlLCBzY3JpcHQpO1xuXG4gICAgICAgIC8vICdzdHlsZS5jdXJyZW50U3R5bGUnIGlzIHVzZWQgYnkgSUUgPD0gOCBhbmQgJ3dpbmRvdy5nZXRDb21wdXRlZFN0eWxlJyBmb3IgYWxsIG90aGVyIGJyb3dzZXJzXG4gICAgICAgIGluZm8gPSAoJ2dldENvbXB1dGVkU3R5bGUnIGluIHdpbmRvdykgJiYgd2luZG93LmdldENvbXB1dGVkU3R5bGUoc3R5bGUsIG51bGwpIHx8IHN0eWxlLmN1cnJlbnRTdHlsZTtcblxuICAgICAgICBzdHlsZU1lZGlhID0ge1xuICAgICAgICAgICAgbWF0Y2hNZWRpdW06IGZ1bmN0aW9uKG1lZGlhOiBhbnkpIHtcbiAgICAgICAgICAgICAgICBsZXQgdGV4dCA9ICdAbWVkaWEgJyArIG1lZGlhICsgJ3sgI21hdGNobWVkaWFqcy10ZXN0IHsgd2lkdGg6IDFweDsgfSB9JztcblxuICAgICAgICAgICAgICAgIC8vICdzdHlsZS5zdHlsZVNoZWV0JyBpcyB1c2VkIGJ5IElFIDw9IDggYW5kICdzdHlsZS50ZXh0Q29udGVudCcgZm9yIGFsbCBvdGhlciBicm93c2Vyc1xuICAgICAgICAgICAgICAgIGlmIChzdHlsZS5zdHlsZVNoZWV0KSB7XG4gICAgICAgICAgICAgICAgICAgIHN0eWxlLnN0eWxlU2hlZXQuY3NzVGV4dCA9IHRleHQ7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgc3R5bGUudGV4dENvbnRlbnQgPSB0ZXh0O1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIC8vIFRlc3QgaWYgbWVkaWEgcXVlcnkgaXMgdHJ1ZSBvciBmYWxzZVxuICAgICAgICAgICAgICAgIHJldHVybiBpbmZvLndpZHRoID09PSAnMXB4JztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICByZXR1cm4gZnVuY3Rpb24obWVkaWE6IGFueSkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgbWF0Y2hlczogc3R5bGVNZWRpYS5tYXRjaE1lZGl1bShtZWRpYSB8fCAnYWxsJyksXG4gICAgICAgICAgICBtZWRpYTogbWVkaWEgfHwgJ2FsbCdcbiAgICAgICAgfTtcbiAgICB9O1xufSgpKTtcbiIsImRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKFwiaHRtbFwiKVswXS5zZXRBdHRyaWJ1dGUoJ2RhdGEtdXNlcmFnZW50JywgbmF2aWdhdG9yLnVzZXJBZ2VudCk7XG4vLyB0byBoZWxsIHdpdGggdGhpbmdzLCBsZXQgdGhlIGRldiBkZWNpZGUgaWYgdGhleSB3YW50IHRvIHNldCBicm93c2VyIHNwZWNpZmljIHdoYXQgaGF2ZSB5b3UuXG4vLyBhaW0gaXMgdG8gYXNzdW1lIGFueW9uZSBtYXNraW5nIHRoZWlyIGFnZW50IGtub3cgd2hhdCB0aGV5IGFyZVxuLy8gZ2V0dGluZyBpbiBmb3IgYW5kIGlzIHN0aWxsIGFjY291bnRhYmxlIGZvciB0b28uXG5cblxuLy8gQ29waWVkIHdpdGggcGVybWlzc2lvbiBmcm9tIGZsZXhlZFxuKDxhbnk+d2luZG93KS5XU1UgPSAoPGFueT53aW5kb3cpLldTVSB8fCB7fTtcblxuKGZ1bmN0aW9uICh3OiBXU1VzdGF0aWMpIHtcbiAgICAvKipcbiAgICAgKiBDaGVjayBpZiB0aGUgZmlyc3QgYXJndW1lbnQgaXMgbm90IHVuZGVmaW5lZCBmaXJzdCB0byBzcGVlZCBjaGVja1xuICAgICAqIHRoZW4gc2V0IHRvIGNoZWNrIGlmIHR5cGUgZGVmaW5lZCBhcyB0aGUgc2Vjb25kIGFyZ3VtZW50IHJlcGVyc2VudHMuXG4gICAgICogYSBtdWx0aSB0b29sIHRvIHN0cm9uZyB0eXBlIHRoaW5ncyBieSBjaGVja2luZyB0eXBlIG1vc3QgY29tbW9uXG4gICAgICogdXNlIGlzIGB3LmRlZmluZWQob2JqKWAgYnV0IGB3LmRlZmluZWQob2JqLGpRdWVyeSlgIGlzIHN1cGVyIGhhbmR5IHRvb1xuICAgICAqXG4gICAgICogQHBhcmFtIHsqfSBuc1xuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBbdHlwZV0gbmFtZWQgdHlwZSB0byByZXNvbHZlIHRvXG4gICAgICogQHJldHVybnNcbiAgICAgKi9cbiAgICB3LmRlZmluZWQgPSBmdW5jdGlvbihuczogYW55LCB0eXBlPzogc3RyaW5nKSB7XG4gICAgICAgIGlmICgndW5kZWZpbmVkJyA9PT0gdHlwZW9mIG5zKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCAndW5kZWZpbmVkJyAhPT0gdHlwZW9mIHR5cGUgKSB7XG4gICAgICAgICAgICBpZiAoJ2FycmF5JyA9PT0gdHlwZSkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0eXBlb2YgbnMgPT09ICdvYmplY3QnICYmXG4gICAgICAgICAgICAgICAgICAgIE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChucykgPT09ICdbb2JqZWN0IEFycmF5XSc7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoJ3N0cmluZycgPT09IHR5cGUpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKG5zKSA9PT0gJ1tvYmplY3QgU3RyaW5nXSc7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoJ251bWJlcicgPT09IHR5cGUpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gIXcuZGVmaW5lZChucywgJ2FycmF5JykgJiYgKG5zIC0gcGFyc2VGbG9hdCggbnMgKSArIDEpID49IDA7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoICdvYmplY3QnID09PSB0eXBlICkge1xuICAgICAgICAgICAgICAgIHJldHVybiBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwobnMpID09PSAnW29iamVjdCBPYmplY3RdJztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICggJ251bGwnID09PSB0eXBlICkge1xuICAgICAgICAgICAgICAgIHJldHVybiBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwobnMpID09PSAnW29iamVjdCBOdWxsXSc7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoICd1bmRlZmluZWQnICE9PSB0eXBlb2YgbnMgJiYgdHlwZW9mIG5zICE9PSB0eXBlICYmIHR5cGVvZiBucyA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIHR5cGUgPT09ICdvYmplY3QnKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG5zIGluc3RhbmNlb2YgdHlwZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiAndW5kZWZpbmVkJyAhPT0gdHlwZW9mIG5zICYmIHR5cGVvZiBucyA9PT0gdHlwZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogU3RpbGwgdXAgZm9yIGNvbnNpZGVyYXRpb24uICBub3QgaW4gY3VycmVudCBmb3JtIGJ1dCBhcyBzaG9ydGN1dD9cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7Kn0gbnNcbiAgICAgKiBAcGFyYW0geyp9IFt2YWxdXG4gICAgICogQHBhcmFtIHsqfSBbbnNfcm9vdF1cbiAgICAgKiBAcmV0dXJuc1xuICAgICAqL1xuICAgIHcuZGVmaW5lID0gZnVuY3Rpb24obnM6IGFueSwgdmFsPzogYW55LCBuc19yb290PzogYW55KSB7XG4gICAgICAgIGxldCBwYXJlbnQgPSBucztcbiAgICAgICAgaWYgKCF3LmRlZmluZWQobnMsICdvYmplY3QnKSkge1xuICAgICAgICAgICAgcGFyZW50ID0gdy5wcmltZShucywgbnNfcm9vdCk7XG4gICAgICAgIH1cbiAgICAgICAgdHJ5IHsgLy8gdGVzdGluZyBjYXN1ZSBpZiBpdCBkb2VzIGZhaWwgd2VsbCBpdCBkaWQgYW5kIHRoYXQgY291bGQgYmUgdXNlZnVsXG4gICAgICAgICAgICBwYXJlbnQgPSB2YWw7IC8vIHdvcnJpZWQgdGhpcyB3aWxsIG5vdCB1cGRhdGUgcGFyZW50IG5zIDEwMFxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgIHcuX2QoZSk7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogU2V0IHVwIGNvbnRhaW5pbmcgb2JqZWN0IGFuZCBtZXJnZSBhbGwgaXRlbXMgZnJvbSBtZXJnZSBsaXN0LlxuICAgICAqXG4gICAgICogQHBhcmFtIHsqfSBvYmpcbiAgICAgKiBAcmV0dXJucyBjb25jYXRlbmF0ZWQgb2JqZWN0O1xuICAgICAqL1xuICAgIHcubWVyZ2UgPSBmdW5jdGlvbihvYmo6IGFueSkge1xuICAgICAgICBsZXQgb3V0OiBhbnkgPSB7fTtcbiAgICAgICAgaWYoIXcuZGVmaW5lZChvYmosJ29iamVjdCcpKXtcbiAgICAgICAgICAgIHJldHVybiBvdXQ7XG4gICAgICAgIH1cbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBvYmoubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGZvciAobGV0IHAgb2YgT2JqZWN0LmtleXMob2JqW2ldKSApIHsgLy8gbGV0IHAgaW4gb2JqW2ldKSB7XG4gICAgICAgICAgICAgICAgb3V0W3BdID0gb2JqW2ldW3BdO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBvdXQ7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIGFsbW9zdCB0aGUgc2FtZSBhcyB3LnByaW1lIGJ1dCBqdXN0IG1hc2hlcyB0aGUgY29sbGlzaW9uIG9mIG5zIHdoZXJlXG4gICAgICogdy5wcmltZSBpcyBpcyB0aGUgZGVjaWRlclxuICAgICAqXG4gICAgICogQHBhcmFtIHsuLi5hbnlbXX0gcFxuICAgICAqIEByZXR1cm5zXG4gICAgICovXG4gICAgdy5leHRlbmQgPSBmdW5jdGlvbiguLi5wOiBhbnlbXSkge1xuICAgICAgICBsZXQgb3B0aW9ucywgbmFtZSwgc3JjLCBjb3B5LCBjbG9uZSxcbiAgICAgICAgICAgIHRhcmdldCA9IGFyZ3VtZW50c1swXSB8fCB7fSxcbiAgICAgICAgICAgIGkgPSAxLFxuICAgICAgICAgICAgbGVuZ3RoID0gYXJndW1lbnRzLmxlbmd0aCxcbiAgICAgICAgICAgIGRlZXAgPSBmYWxzZTtcblxuICAgICAgICAvLyBIYW5kbGUgYSBkZWVwIGNvcHkgc2l0dWF0aW9uXG4gICAgICAgIGlmICggdHlwZW9mIHRhcmdldCA9PT0gJ2Jvb2xlYW4nICkge1xuICAgICAgICAgICAgZGVlcCA9IHRhcmdldDtcbiAgICAgICAgICAgIC8vIFNraXAgdGhlIGJvb2xlYW4gYW5kIHRoZSB0YXJnZXRcbiAgICAgICAgICAgIHRhcmdldCA9IGFyZ3VtZW50c1sgaSBdIHx8IHt9O1xuICAgICAgICAgICAgaSsrO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gSGFuZGxlIGNhc2Ugd2hlbiB0YXJnZXQgaXMgYSBzdHJpbmcgb3Igc29tZXRoaW5nIChwb3NzaWJsZSBpbiBkZWVwIGNvcHkpXG4gICAgICAgIGlmICggIXcuZGVmaW5lZCh0YXJnZXQsICdvYmplY3QnKSAmJiAhdy5kZWZpbmVkKHRhcmdldCwgJ2Z1bmN0aW9uJykgKSB7XG4gICAgICAgICAgICB0YXJnZXQgPSB7fTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIEV4dGVuZCBmbGV4ZWQgaXRzZWxmIGlmIG9ubHkgb25lIGFyZ3VtZW50IGlzIHBhc3NlZFxuICAgICAgICBpZiAoIGkgPT09IGxlbmd0aCApIHtcbiAgICAgICAgICAgIHRhcmdldCA9IHRoaXM7XG4gICAgICAgICAgICBpLS07XG4gICAgICAgIH1cblxuICAgICAgICBmb3IgKCA7IGkgPCBsZW5ndGg7IGkrKyApIHtcbiAgICAgICAgICAgIC8vIE9ubHkgZGVhbCB3aXRoIG5vbi1udWxsL3VuZGVmaW5lZCB2YWx1ZXNcbiAgICAgICAgICAgIGlmICggKG9wdGlvbnMgPSBhcmd1bWVudHNbIGkgXSkgIT0gbnVsbCApIHtcbiAgICAgICAgICAgICAgICAvLyBFeHRlbmQgdGhlIGJhc2Ugb2JqZWN0XG4gICAgICAgICAgICAgICAgZm9yICggbmFtZSBpbiBvcHRpb25zICkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoICFvcHRpb25zLmhhc093blByb3BlcnR5KG5hbWUpICkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgc3JjID0gdGFyZ2V0WyBuYW1lIF07XG4gICAgICAgICAgICAgICAgICAgIGNvcHkgPSBvcHRpb25zWyBuYW1lIF07XG5cbiAgICAgICAgICAgICAgICAgICAgLy8gUHJldmVudCBuZXZlci1lbmRpbmcgbG9vcFxuICAgICAgICAgICAgICAgICAgICBpZiAoIHRhcmdldCA9PT0gY29weSApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgLy8gUmVjdXJzZSBpZiB3ZSdyZSBtZXJnaW5nIHBsYWluIG9iamVjdHMgb3IgYXJyYXlzXG4gICAgICAgICAgICAgICAgICAgIGlmICggZGVlcCAmJiBjb3B5ICYmIHcuZGVmaW5lZChjb3B5LCAnb2JqZWN0JykgKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIHcuZGVmaW5lZChjb3B5LCAnYXJyYXknKSApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbG9uZSA9IHNyYyAmJiB3LmRlZmluZWQoc3JjLCAnYXJyYXknKSA/IHNyYyA6IFtdO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbG9uZSA9IHNyYyAmJiB3LmRlZmluZWQoc3JjLCAnb2JqZWN0JykgPyBzcmMgOiB7fTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIE5ldmVyIG1vdmUgb3JpZ2luYWwgb2JqZWN0cywgY2xvbmUgdGhlbVxuICAgICAgICAgICAgICAgICAgICAgICAgdGFyZ2V0WyBuYW1lIF0gPSB3LmV4dGVuZCggZGVlcCwgY2xvbmUsIGNvcHkgKTtcbiAgICAgICAgICAgICAgICAgICAgLy8gRG9uJ3QgYnJpbmcgaW4gdW5kZWZpbmVkIHZhbHVlc1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKCBjb3B5ICE9PSB1bmRlZmluZWQgKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0YXJnZXRbIG5hbWUgXSA9IGNvcHk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgLy8gUmV0dXJuIHRoZSBtb2RpZmllZCBvYmplY3RcbiAgICAgICAgcmV0dXJuIHRhcmdldDtcbiAgICB9O1xuXG5cbiAgICAvKipcbiAgICAgKiBCcmVhayB1cCBpbnB1dCBpbnRvIGFuIGFycmF5IGluIG9yZGVyIG9mIGRlZmluZWQgbmFtZXNwYWNlXG4gICAgICogcmVjdXJzZSB3aGVuIG5vdCBhIHN0cmluZy5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7Kn0gX25zXG4gICAgICogQHJldHVybnMgeyp9IGlmIGEgc3RyaW5nIGlucHV0IHNwbGl0IHRvIGFycmF5IG9uIGRvdFxuICAgICAqIEBmaW5hbCB7YXJyYXlbc3RyaW5nXX1cbiAgICAgKi9cbiAgICB3LnBhcnNlX25zID0gZnVuY3Rpb24gKF9uczogYW55KTogYW55IHsgLy8gc2hvdWxkIGJlIGFibGUgdG8gcmVmYWN0b3IgdGhpcyBiaXRcbiAgICAgICAgbGV0IG91dDogYW55ID0gW107XG4gICAgICAgIGlmICggIXcuZGVmaW5lZChfbnMpKXtcbiAgICAgICAgICAgIHJldHVybiBvdXQ7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCAhdy5kZWZpbmVkKF9ucywgJ29iamVjdCcpICkgeyAvLyBlZyBzdHJpbmcgb3IgbnVtYmVyIC8vd2FzICdvYmplY3QnICE9PSB0eXBlb2YgX25zXG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIG91dCA9IF9ucy50b1N0cmluZygpLnNwbGl0KCcuJyk7XG4gICAgICAgICAgICB9IGNhdGNoIChlKSB7IC8vIHNvIGF0IHRoaXMgcG9pbnQgaXQgd2FzIG5vdCBhbiBvYmplY3QsIG51bWJlciBvciBzdHJpbmcuLi4gd2hhdCBpcyBpdD9cbiAgICAgICAgICAgICAgICB3Ll9pKGUsIF9ucyk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgX25zLmZvckVhY2goZnVuY3Rpb24gKG9iajogYW55KSB7XG4gICAgICAgICAgICAgICAgb3V0ID0gb3V0LmNvbmNhdCh3LnBhcnNlX25zKG9iaikpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG91dDtcbiAgICB9O1xuXG4gICAgIC8qKlxuICAgICAqIFRha2UgbmFtZXNwYWNlIG9iamVjdCwgcGFyc2UgaXQsIGNoZWNrIGZvciByb290IG9iamVjdCBwYXNzZWQgYXNcbiAgICAgKiBzZWNvbmQgYXJndW1lbnQsIHRoZW4gc3RhcnQgdGhlcmUuICBBcHBseSBvcHRpb25zIG9mIHNldHRpbmcgYSB2YWx1ZVxuICAgICAqIGlmIHNldCBhcyBvdmVycmlkZSBvciBtZXJnZSBpZiBucyBjb2xsaXNpb24gb2NjdXJzXG4gICAgICpcbiAgICAgKiBAcGFyYW0geyp9IG5zXG4gICAgICogQHBhcmFtIHsqfSBbbnNfcm9vdF1cbiAgICAgKiBAcGFyYW0geyp9IFtvcHRpb25zXVxuICAgICAqIEByZXR1cm5zXG4gICAgICovXG4gICAgdy5nZXRfbnMgPSBmdW5jdGlvbiAobnM6IGFueSkge1xuICAgICAgICBsZXQgcGFyZW50ID0gd2luZG93LCAvLyBhbGFpcyB0byB3b3JrIHdpdGhcbiAgICAgICAgICAgIHBsOiBudW1iZXIsXG4gICAgICAgICAgICBpOiBudW1iZXIsXG4gICAgICAgICAgICBvdXQ6IGFueSA9IG51bGw7XG5cbiAgICAgICAgbGV0IHBhcnRzOiBhbnkgPSB3LnBhcnNlX25zKG5zKTtcbiAgICAgICAgcGwgPSBwYXJ0cy5sZW5ndGg7XG4gICAgICAgIGZvciAoaSA9IDA7IGkgPCBwbDsgaSsrKSB7XG4gICAgICAgICAgICAvLyBjcmVhdGUgYSBwcm9wZXJ0eSBpZiBpdCBkb2VzbnQgZXhpc3RcbiAgICAgICAgICAgIGlmICggdy5kZWZpbmVkKCBwYXJlbnRbcGFydHNbaV1dICkgfHwgKChpID09PSBwbCAtIDEpKSApIHtcbiAgICAgICAgICAgICAgICBsZXQgdmFsdWUgPSBwYXJlbnRbcGFydHNbaV1dIHx8IHt9O1xuICAgICAgICAgICAgICAgIG91dCA9IHZhbHVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcGFyZW50ID0gcGFyZW50W3BhcnRzW2ldXTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gb3V0O1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBTdGlsbCB1cCBmb3IgY29uc2lkZXJhdGlvbi5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBuc19wYXRoIGxvYWQgbnMgYnkgZmlsZVxuICAgICAqIEBwYXJhbSB7Kn0gW2NhbGxiYWNrXSBkbyBzb21ldGhpbmcgYWZ0ZXJcbiAgICAgKi9cbiAgICB3LmluY2x1ZGVkID0gW107IC8vIHRyYWNrZXJcbiAgICB3LmluY2x1ZGUgPSBmdW5jdGlvbiAobnNfcGF0aDogc3RyaW5nLCBjYWxsYmFjaz86IGFueSl7XG4gICAgICAgIGlmICh3LmRlZmluZWQobnNfcGF0aCxcInN0cmluZ1wiKSAmJiAhdy5kZWZpbmVkKHcuaW5jbHVkZWRbbnNfcGF0aF0pKSB7IC8vIGlmIGl0IGlzIGxvYWRlZCBkb24ndCB3b3JyeVxuICAgICAgICAgICAgbGV0IHNycHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzY3JpcHQnKTtcbiAgICAgICAgICAgIGlmICggdy5kZWZpbmVkKGNhbGxiYWNrLCAnZnVuY3Rpb24nKSApIHtcbiAgICAgICAgICAgICAgICBzcnB0LmFkZEV2ZW50TGlzdGVuZXIoJ2xvYWQnLCBjYWxsYmFjayk7IC8vIHBhc3MgbXkgaG9pc3RlZCBmdW5jdGlvblxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgc3JwdC5zcmMgPSBuc19wYXRoICsgJy5qcyc7XG4gICAgICAgICAgICB3LmluY2x1ZGVkLnB1c2gobnNfcGF0aCk7XG4gICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdoZWFkJykuYXBwZW5kQ2hpbGQoc3JwdCk7XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogU2V0IGRlYnVnIHRvIGNvbnNvbGUuICB0aGluayBmaWVsZCBkZXRlY3RvciB3aGVuIGxlYXZpbmcgaW4gcHJvZHVjdGlvbi5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7Kn0gb3V0cHV0XG4gICAgICogQHJldHVybnMge2Jvb2xlYW59IHN0YXRlIG9mIGNvbXBsZXRpb25cbiAgICAgKi9cbiAgICB3Ll9kID0gZnVuY3Rpb24ob3V0cHV0OiBhbnkpIHtcbiAgICAgICAgLy8gcmV0dXJuIGZvciBjb25zaXN0ZW5jeVxuICAgICAgICAgdy5kZWZpbmVkKFdTVS5zdGF0ZS5kZWJ1ZykgJiYgV1NVLnN0YXRlLmRlYnVnICYmICg8YW55PndpbmRvdykuY29uc29sZS5kZWJ1ZyhvdXRwdXQpOyAvLyB0c2xpbnQ6ZGlzYWJsZS1saW5lXG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIFNldCBsb2cgdG8gY29uc29sZS4gIHRoaW5rIGZpZWxkIGRldGVjdG9yIHdoZW4gbGVhdmluZyBpbiBwcm9kdWN0aW9uLlxuICAgICAqXG4gICAgICogQHBhcmFtIHsqfSBhXG4gICAgICogQHBhcmFtIHsqfSBiXG4gICAgICogQHJldHVybnMgIHtib29sZWFufSBzdGF0ZSBvZiBjb21wbGV0aW9uXG4gICAgICovXG4gICAgdy5faSA9IGZ1bmN0aW9uKGE6IGFueSwgYjogYW55KSB7XG4gICAgICAgIC8vIHJldHVybiBmb3IgY29uc2lzdGVuY3lcbiAgICAgICAgIHcuZGVmaW5lZChXU1Uuc3RhdGUuZGVidWcpICYmIFdTVS5zdGF0ZS5kZWJ1ZyAmJiAoPGFueT53aW5kb3cpLmNvbnNvbGUuaW5mbyhhLCBiKTsgLy8gdHNsaW50OmRpc2FibGUtbGluZVxuICAgIH07XG5cblxuICAgIC8qKlxuICAgICAqIFRha2UgbmFtZXNwYWNlIG9iamVjdCwgcGFyc2UgaXQsIGNoZWNrIGZvciByb290IG9iamVjdCBwYXNzZWQgYXNcbiAgICAgKiBzZWNvbmQgYXJndW1lbnQsIHRoZW4gc3RhcnQgdGhlcmUuICBBcHBseSBvcHRpb25zIG9mIHNldHRpbmcgYSB2YWx1ZVxuICAgICAqIGlmIHNldCBhcyBvdmVycmlkZSBvciBtZXJnZSBpZiBucyBjb2xsaXNpb24gb2NjdXJzXG4gICAgICpcbiAgICAgKiBAcGFyYW0geyp9IG5zXG4gICAgICogQHBhcmFtIHsqfSBbbnNfcm9vdF1cbiAgICAgKiBAcGFyYW0geyp9IFtvcHRpb25zXVxuICAgICAqIEByZXR1cm5zXG4gICAgICovXG4gICAgdy5wcmltZSA9IGZ1bmN0aW9uIChuczogYW55LCBuc19yb290PzogYW55LCBvcHRpb25zPzogYW55KSB7XG4gICAgICAgIG5zX3Jvb3QgPSBuc19yb290IHx8IHdpbmRvdzsgLy8gc2V0IHVwIHRoZSByb290IG9iamVjdFxuICAgICAgICAvLyBtYWtlIGlzIGRvIG9uZSBjYW4ganVzdCBwdXQgaW4gYSB2YWx1ZSBhbmQgdGFrZSB0aGUgZGVmYXVsdHNcbiAgICAgICAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge3ZhbHVlOiBuZXcgT2JqZWN0fTtcbiAgICAgICAgb3B0aW9ucyA9ICF3LmRlZmluZWQob3B0aW9ucy52YWx1ZSkgfHwgIXcuZGVmaW5lZChvcHRpb25zLCAnb2JqZWN0JykgPyB7dmFsdWUgOiBvcHRpb25zfSA6IG9wdGlvbnM7XG4gICAgICAgIC8vIGh1bGsgc21hc2g/XG4gICAgICAgIG9wdGlvbnMgPSBPYmplY3QuYXNzaWduKHtvdmVycmlkZTogZmFsc2UsIG1lcmdlOiB0cnVlLCBkZWVwOiB0cnVlfSwgb3B0aW9ucyk7IC8vIHNwZWVkIGl0IGluIHdlIHRydXN0IGl0XG5cbiAgICAgICAgbGV0IHBhcmVudCA9IG5zX3Jvb3QsIC8vIGFsaWFzIHRvIHdvcmsgd2l0aFxuICAgICAgICAgICAgcGw6IG51bWJlcixcbiAgICAgICAgICAgIGk6IG51bWJlcjtcblxuICAgICAgICBsZXQgcGFydHM6IGFueSA9IHcucGFyc2VfbnMobnMpO1xuICAgICAgICBwbCA9IHBhcnRzLmxlbmd0aDtcbiAgICAgICAgZm9yIChpID0gMDsgaSA8IHBsOyBpKyspIHtcbiAgICAgICAgICAgIC8vIGNyZWF0ZSBhIHByb3BlcnR5IGlmIGl0IGRvZXNuJ3QgZXhpc3RcbiAgICAgICAgICAgIGlmICggIXcuZGVmaW5lZCggcGFyZW50W3BhcnRzW2ldXSApIHx8ICgoaSA9PT0gcGwgLSAxKSkgKSB7XG4gICAgICAgICAgICAgICAgbGV0IHZhbHVlID0gdy5kZWZpbmVkKHBhcmVudFtwYXJ0c1tpXV0pID8gcGFyZW50W3BhcnRzW2ldXSA6IHt9O1xuICAgICAgICAgICAgICAgIGlmICggKGkgPT09IHBsIC0gMSkgJiYgdy5kZWZpbmVkKG9wdGlvbnMudmFsdWUpKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICggdy5kZWZpbmVkKHZhbHVlKSAmJiB3LmRlZmluZWQoIG9wdGlvbnMubWVyZ2UgKSAmJiB0cnVlID09PSBvcHRpb25zLm1lcmdlICkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCB3LmRlZmluZWQob3B0aW9ucy52YWx1ZSwgJ3N0cmluZycpIHx8IHcuZGVmaW5lZChvcHRpb25zLnZhbHVlLCAnbnVtYmVyJykgKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gcmVhbGx5PyAgbG9sIHdoeSB3b3VsZCB5b3U/ICBidXQgcmVnYXJkbGVzcyBkb24ndCBidWlsZCB3YWxscyBzbyBsZWF2ZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlID0gdmFsdWUgKyBvcHRpb25zLnZhbHVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmICggdy5kZWZpbmVkKG9wdGlvbnMudmFsdWUsICdib29sZWFuJykgKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWUgPSBvcHRpb25zLnZhbHVlID09PSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZSA9IHcuZXh0ZW5kKG9wdGlvbnMuZGVlcCwgdmFsdWUsIG9wdGlvbnMudmFsdWUpOyAvLyBPYmplY3QuYXNzaWduKHZhbHVlLCBvcHRpb25zLnZhbHVlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmICggdHJ1ZSA9PT0gb3B0aW9ucy5vdmVycmlkZSApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlID0gb3B0aW9ucy52YWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBwYXJlbnRbcGFydHNbaV1dID0gdmFsdWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBwYXJlbnQgPSBwYXJlbnRbcGFydHNbaV1dO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBwYXJlbnQ7XG4gICAgfTtcblxuICAgIHcucmVuZGVyID0gZnVuY3Rpb24gKGh0bWw6YW55LCBvcHRpb25zOmFueSkge1xuICAgICAgICAvLyBAdG9kbyBhZGQgYmV0dGVyIGVycm9yIGhhbmRsaW5nIGZvciBlbXB0eXMgYXQgdGhlIGxlYXN0XG4gICAgICAgIHZhciByZSwgYWRkOmFueSwgbWF0Y2gsIGN1cnNvciwgY29kZTphbnksIHJlRXhwOmFueSwgcmVzdWx0O1xuXG4gICAgICAgIHJlID0gLzwlKC4rPyklPi9nO1xuICAgICAgICByZUV4cCA9IC8oXiggKT8odmFyfGlmfGZvcnxlbHNlfHN3aXRjaHxjYXNlfGJyZWFrfHt8fXw7KSkoLiopPy9nO1xuICAgICAgICBjb2RlID0gXCJ2YXIgcj1bXTtcXG5cIjtcbiAgICAgICAgY3Vyc29yID0gMDtcblxuICAgICAgICBhZGQgPSBmdW5jdGlvbiAobGluZTphbnksIGpzOmFueSkge1xuICAgICAgICAgICAgaWYgKGpzKSB7XG4gICAgICAgICAgICAgICAgY29kZSArPSBsaW5lLm1hdGNoKHJlRXhwKSA/IGxpbmUgKyBcIlxcblwiIDogXCJyLnB1c2goXCIgKyBsaW5lICsgXCIpO1xcblwiO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBjb2RlICs9IGxpbmUgIT09IFwiXCIgPyBcInIucHVzaCgnXCIgKyBsaW5lLnJlcGxhY2UoLycvZywgXCJcXFwiXCIpICsgXCInKTtcXG5cIiA6IFwiXCI7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gYWRkO1xuICAgICAgICB9O1xuXG4gICAgICAgIHdoaWxlICgobWF0Y2ggPSByZS5leGVjKGh0bWwpKSkge1xuICAgICAgICAgICAgYWRkKGh0bWwuc2xpY2UoY3Vyc29yLCBtYXRjaC5pbmRleCkpKG1hdGNoWzFdLCB0cnVlKTtcbiAgICAgICAgICAgIGN1cnNvciA9IG1hdGNoLmluZGV4ICsgbWF0Y2hbMF0ubGVuZ3RoO1xuICAgICAgICB9XG4gICAgICAgIGlmKFdTVS5kZWZpbmVkKGh0bWwsJ3N0cmluZycpKXtcbiAgICAgICAgICAgIGFkZChodG1sLnN1YnN0cihjdXJzb3IsIGh0bWwubGVuZ3RoIC0gY3Vyc29yKSk7XG4gICAgICAgICAgICBjb2RlID0gKGNvZGUgKyBcInJldHVybiByLmpvaW4oJycpO1wiKS5yZXBsYWNlKC9bXFxyXFx0XFxuXS9nLCBcIlwiKTtcbiAgICAgICAgICAgIHJlc3VsdCA9IG5ldyBGdW5jdGlvbihjb2RlKS5hcHBseShvcHRpb25zKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH07XG5cblxuXG4gICAgbGV0IGZ1bm5pZXMgPSBbXG4gICAgICAgIHsgdTogJ0EgbG90IGFib3V0IGxpdmluZzsnLCBsOiAnQSBsaXR0bGUgYWJvdXQgbG92ZS4uLicgfVxuICAgICAgICAsIHsgdTogJ0dvaW5nIGZvciBkaXN0YW5jZS4uLicsIGw6ICdnb2luZyBmb3Igc3BlZWQhIScgfVxuICAgICAgICAsIHsgdTogJ0lcXCd2ZSBnb3QgZnJpZW5kcycsIGw6ICdpbiBjb2RlIHBsYWNlcy4uLicgfVxuICAgICAgICAsIHsgdTogJ01hbWEuLi4nLCBsOiAnSSBqdXN0IGtpbGxlZCBhIGJ1ZycgfSBdO1xuICAgICAgICBsZXQgZnVubnkgPSBmdW5uaWVzW01hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIGZ1bm5pZXMubGVuZ3RoKV07XG5cbiAgICAgICAgY29uc29sZS5sb2coICclYyAgICAgIF9fXyAgICAgICAgICAgX19fICAgICAgICAgICBfX19cXG4nXG4gICAgICAgICsgJyAgICAgL1xcXFwgIFxcXFwgICAgICAgICAvXFxcXF9fXFxcXCAgICAgICAgIC9cXFxcICBcXFxcXFxuJ1xuICAgICAgICArICcgICAgX1xcXFw6XFxcXCAgXFxcXCAgICAgICAvOi8gXy9fICAgICAgICBcXFxcOlxcXFwgIFxcXFwgICAgICAgICcgKyBmdW5ueS51ICsgJ1xcbidcbiAgICAgICAgKyAnICAgL1xcXFwgXFxcXDpcXFxcICBcXFxcICAgICAvOi8gL1xcXFwgIFxcXFwgICAgICAgIFxcXFw6XFxcXCAgXFxcXCAgICAgICAnICsgZnVubnkubCArICdcXG4nXG4gICAgICAgICsgJyAgX1xcXFw6XFxcXCBcXFxcOlxcXFwgIFxcXFwgICAvOi8gLzo6XFxcXCAgXFxcXCAgIF9fXyAgXFxcXDpcXFxcICBcXFxcXFxuJ1xuICAgICAgICArICcgL1xcXFwgXFxcXDpcXFxcIFxcXFw6XFxcXF9fXFxcXCAvOi9fLzovXFxcXDpcXFxcX19cXFxcIC9cXFxcICBcXFxcICBcXFxcOlxcXFxfX1xcXFxcXG4nXG4gICAgICAgICsgJyBcXFxcOlxcXFwgXFxcXDpcXFxcLzovICAvIFxcXFw6XFxcXC86LyAvOi8gIC8gXFxcXDpcXFxcICBcXFxcIC86LyAgLyAgICBfX19fX19fX18gICAgX19fX19fX19fXFxuJ1xuICAgICAgICArICcgIFxcXFw6XFxcXCBcXFxcOjovICAvICAgXFxcXDo6LyAvOi8gIC8gICBcXFxcOlxcXFwgIC86LyAgLyAgICAvIF9fX18vICAgXFx8ICAvICBfLyBfX18vXFxuJ1xuICAgICAgICArICcgICBcXFxcOlxcXFwvOi8gIC8gICAgIFxcXFwvXy86LyAgLyAgICAgXFxcXDpcXFxcLzovICAvICAgIC8gL18gIC8gL3wgfCAgLyAvIFxcXFxfXyBcXFxcXFxuJ1xuICAgICAgICArICcgICAgXFxcXDo6LyAgLyAgICAgICAgLzovICAvICAgICAgIFxcXFw6Oi8gIC8gICAgLyBfXy8gLyBfX18gfF8vIC8gX19fLyAvXFxuJ1xuICAgICAgICArICcgICAgIFxcXFwvX18vICAgICAgICAgXFxcXC9fXy8gICAgICAgICBcXFxcL19fLyAgICAvXy8gICAvXy8gIHxfL19fXy8vX19fXy9cXG4nXG4gICAgICAgICwgICdmb250LWZhbWlseTptb25vc3BhY2UnKTtcblxuXG5cbiAgICB3LnByaW1lKCdzdGF0ZScsICAgdywgICAgICAgeyB2YWx1ZToge30sICAgICAgICAgICAgb3ZlcnJpZGU6IGZhbHNlIH0pOyAvLyBob25lc3RseSB0aGlzIHNob3VsZG4ndCBiZSB0aGlzIHdheSwgc2hvdWxkIGJlIHNtYXJ0ZXJcbiAgICB3LnByaW1lKCdkZWJ1ZycsICAgdy5zdGF0ZSwgeyB2YWx1ZTogZmFsc2UsICAgICAgICAgb3ZlcnJpZGU6IGZhbHNlLCBtZXJnZTogZmFsc2UgfSk7XG4gICAgdy5wcmltZSgnZW52JywgICAgIHcuc3RhdGUsIHsgdmFsdWU6ICdkZXZlbG9wbWVudCcsIG92ZXJyaWRlOiBmYWxzZSwgbWVyZ2U6IGZhbHNlIH0pO1xuICAgIHcucHJpbWUoJ2NvbnNvbGUnLCB3LnN0YXRlLCB7IHZhbHVlOiB0cnVlLCAgICAgICAgICBvdmVycmlkZTogZmFsc2UsIG1lcmdlOiBmYWxzZSB9KTtcbiAgICBjb25zb2xlLmxvZygnYzonICsgdy5zdGF0ZS5jb25zb2xlLnRvU3RyaW5nKCkgKyAnOmQ6JyAgKyB3LnN0YXRlLmRlYnVnLnRvU3RyaW5nKCkgKyAnOmU6JyArIHcuc3RhdGUuZW52LnRvU3RyaW5nKCkudG9Mb3dlckNhc2UoKSApO1xuICAgIGlmICggKCAhdy5zdGF0ZS5kZWJ1ZyAmJiB3LnN0YXRlLmVudi50b1N0cmluZygpLnRvTG93ZXJDYXNlKCkgIT09ICdkZXZlbG9wbWVudCcgKVxuICAgICAgICAgfHwgIXcuc3RhdGUuY29uc29sZSApIHtcbiAgICAgICAgdy5jb25zb2xlID0gY29uc29sZTtcbiAgICAgICAgY29uc29sZS5sb2coJy0tIFR1cm5pbmcgY29uc29sZSAoZ2VuZXJhbCBzdGRfb3V0KSBPRkYnKTtcbiAgICAgICAgY29uc29sZS5sb2cgPSBjb25zb2xlLmRlYnVnID0gY29uc29sZS5pbmZvID0gY29uc29sZS53YXJuID0gZnVuY3Rpb24oICkge307XG4gICAgfVxuXG59KFdTVSkpO1xuXG5cblxuLypcbiogalF1ZXJ5IGhlbHBlcnMuICBNYXkgbW92ZSBhd2F5IGZyb20gaGVyZSwgYnV0IG11c3QgcHJveHkgYW55dGhpbmdcbiovXG4oZnVuY3Rpb24oJCxqUXVlcnkpeyAvLyB0aGlzIHdpbGwgZGVwZW5kIG9uIGpRdWVyeVxuICAgIGpRdWVyeS5leHByW1wiOlwiXS5yZWdleCA9IGZ1bmN0aW9uIChlbGVtOmFueSwgaW5kZXg6YW55LCBtYXRjaDphbnkpIHtcbiAgICAgICAgdmFyIG1hdGNoUGFyYW1zID0gbWF0Y2hbM10uc3BsaXQoXCIsXCIpLFxuICAgICAgICAgICAgdmFsaWRMYWJlbHMgPSAvXihkYXRhfGNzcyk6LyxcbiAgICAgICAgICAgIGF0dHIgPSB7XG4gICAgICAgICAgICAgICAgbWV0aG9kOiBtYXRjaFBhcmFtc1swXS5tYXRjaCh2YWxpZExhYmVscykgP1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1hdGNoUGFyYW1zWzBdLnNwbGl0KFwiOlwiKVswXSA6IFwiYXR0clwiLFxuICAgICAgICAgICAgICAgIHByb3BlcnR5OiBtYXRjaFBhcmFtcy5zaGlmdCgpLnJlcGxhY2UodmFsaWRMYWJlbHMsIFwiXCIpXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgcmVnZXhGbGFncyA9IFwiaWdcIixcbiAgICAgICAgICAgIHJlZ2V4ID0gbmV3IFJlZ0V4cChtYXRjaFBhcmFtcy5qb2luKFwiXCIpLnJlcGxhY2UoL15cXHMrfFxccyskL2csIFwiXCIpLCByZWdleEZsYWdzKTtcbiAgICAgICAgcmV0dXJuIHJlZ2V4LnRlc3QoalF1ZXJ5KGVsZW0pW2F0dHIubWV0aG9kXShhdHRyLnByb3BlcnR5KSk7XG4gICAgfTtcbiAgICAkLmZuLm92ZXJmbG93biA9IGZ1bmN0aW9uICgpIHsgbGV0IGUgPSB0aGlzWzBdOyByZXR1cm4gZS5zY3JvbGxIZWlnaHQgPiBlLmNsaWVudEhlaWdodCB8fCBlLnNjcm9sbFdpZHRoID4gZS5jbGllbnRXaWR0aDsgfTtcbiAgICAvL3RhcmdldGVkLnVuaXF1ZUlkKCk7IHwgcmVtb3ZlVW5pcXVlSWQoKSAvLyBqUXVlcnkgZXh0XG4gICAgKGZ1bmN0aW9uIChmYWN0b3J5KSB7XG4gICAgICAgIGlmICggV1NVLmRlZmluZWQoICg8YW55PiB3aW5kb3cpLmRlZmluZSwgXCJmdW5jdGlvblwiKSAmJiAoPGFueT4gd2luZG93KS5kZWZpbmUuYW1kKSB7XG4gICAgICAgICAgICAvLyBBTUQuIFJlZ2lzdGVyIGFzIGFuIGFub255bW91cyBtb2R1bGUuXG4gICAgICAgICAgICAoPGFueT4gd2luZG93KS5kZWZpbmUoW1wianF1ZXJ5XCIsIFwiLi92ZXJzaW9uXCJdLCBmYWN0b3J5KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8vIEJyb3dzZXIgZ2xvYmFsc1xuICAgICAgICAgICAgZmFjdG9yeShqUXVlcnkpO1xuICAgICAgICB9XG4gICAgfShmdW5jdGlvbiAoJDphbnkpIHtcbiAgICAgICAgcmV0dXJuIGpRdWVyeS5mbi5leHRlbmQoe1xuICAgICAgICAgICAgdW5pcXVlSWQ6IChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgdmFyIHV1aWQgPSAwO1xuICAgICAgICAgICAgICAgIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmVhY2goZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCF0aGlzLmlkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5pZCA9IFwiZnctdHJjLVwiICsgKCsrdXVpZCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9KSgpLFxuICAgICAgICAgICAgcmVtb3ZlVW5pcXVlSWQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5lYWNoKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKC9eZnctdHJjLVxcZCskLy50ZXN0KHRoaXMuaWQpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLnJlbW92ZUF0dHIoXCJpZFwiKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9KSk7XG5cbiAgICAkLnJlbmRlciA9IFdTVS5yZW5kZXI7XG59KCg8YW55PndpbmRvdykualF1ZXJ5LCg8YW55PndpbmRvdykualF1ZXJ5KSk7XG4iLCIoZnVuY3Rpb24gKHdpbmRvdzogYW55LCBVSTogV1NVdWlTdGF0aWMpIHtcbiAgICAgVUkudGVzdCA9IGZ1bmN0aW9uKCl7XG4gICAgICAgIFdTVS5fZCgnZ2V0IHRvIHRoZSBVSScpO1xuICAgICAgICBXU1UuX2QoVUkpO1xuICAgICAgICBXU1UuX2QoJzEyMTQnLmxlYWRpbmdDaGFycygnMCcsIDEwKSk7XG4gICAgfTtcblxuICAgIC8vIGNhbiBleHRlbmQgdGhpc1xuICAgIFdTVS5wcmltZSgnYWN0aW9ucy50eXBlcycsIFVJKTtcbn0gKHdpbmRvdywgV1NVLnByaW1lKCd1aScsIFdTVSkgKSApO1xuIiwiKGZ1bmN0aW9uICh3aW5kb3c6IGFueSwgVVRJTDogV1NVdXRpbFN0YXRpYykge1xuICAgIFVUSUwuZHVtcEtleXNSZWN1cnNpdmVseSA9IGZ1bmN0aW9uIChvYmo6IGFueSwgcmVnZXg6IGFueSkge1xuICAgICAgICB2YXIga2V5czogYW55ID0gW107XG4gICAgICAgIHJlZ2V4ID0gcmVnZXggfHwgZmFsc2U7XG4gICAgICAgIHZhciBjcmVhdGVLZXlQYXRoID0gZnVuY3Rpb24gKGN1cnJlbnRLZXlQYXRoOiBhbnksIGtleTogYW55KSB7XG4gICAgICAgICAgICByZXR1cm4gY3VycmVudEtleVBhdGggKyAoY3VycmVudEtleVBhdGggPyAnLicgOiAnJykgKyBrZXk7XG4gICAgICAgIH07XG4gICAgICAgIChmdW5jdGlvbiAocGF0aDogYW55LCBhbnk6IGFueSkge1xuICAgICAgICAgICAgdmFyIGk6IGFueSwgazogYW55LCBjdXJyZW50UGF0aDogYW55O1xuICAgICAgICAgICAgaWYgKCBXU1UuZGVmaW5lZChhbnksXCJhcnJheVwiKSApIHtcbiAgICAgICAgICAgICAgICBmb3IgKGkgPSAwOyBpIDwgYW55Lmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICAgICAgICAgICAgICAgIGN1cnJlbnRQYXRoID0gY3JlYXRlS2V5UGF0aChwYXRoLCAoaSkudG9TdHJpbmcoKSk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChmYWxzZSAhPT0gcmVnZXgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBwbWF0Y2ggPSByZWdleC5leGVjKGN1cnJlbnRQYXRoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChudWxsICE9PSBwbWF0Y2gpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBrZXlzLnB1c2goY3VycmVudFBhdGgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAga2V5cy5wdXNoKGN1cnJlbnRQYXRoKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBhcmd1bWVudHMuY2FsbGVlKGN1cnJlbnRQYXRoLCBhbnlbaV0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSBpZiAoICFXU1UuZGVmaW5lZChhbnksXCJzdHJpbmdcIikgKSB7XG4gICAgICAgICAgICAgICAgZm9yIChrIGluIGFueSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoYW55Lmhhc093blByb3BlcnR5KGspKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjdXJyZW50UGF0aCA9IGNyZWF0ZUtleVBhdGgocGF0aCwgayk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZmFsc2UgIT09IHJlZ2V4KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHJtYXRjaCA9IHJlZ2V4LmV4ZWMoY3VycmVudFBhdGgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChudWxsICE9PSBybWF0Y2gpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAga2V5cy5wdXNoKGN1cnJlbnRQYXRoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGtleXMucHVzaChjdXJyZW50UGF0aCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBhcmd1bWVudHMuY2FsbGVlKGN1cnJlbnRQYXRoLCBhbnlba10pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9KSgnJywgb2JqKTtcbiAgICAgICAgcmV0dXJuIGtleXM7XG4gICAgfTtcbn0gKHdpbmRvdywgV1NVLnByaW1lKCd1dGlsaXRpZXMnLCBXU1UpICkgKTtcbiIsIihmdW5jdGlvbiAod2luZG93OiBhbnksIFVUSUw6IFdTVXV0aWxTdGF0aWMpIHtcbiAgICAgVVRJTC50ZXN0ID0gZnVuY3Rpb24oKXtcbiAgICAgICAgV1NVLl9kKCdnZXQgdG8gdGhlIFdTVXV0aWxTdGF0aWMnKTtcbiAgICAgICAgV1NVLl9kKFVUSUwpO1xuICAgICAgICBXU1UuX2QoJzEyMTQnLmxlYWRpbmdDaGFycygnMCcsIDEwKSk7XG4gICAgfTtcbiAgICAvLyBjYW4gZXh0ZW5kIHRoaXNcbiAgICBXU1UucHJpbWUoJ2FjdGlvbnMudHlwZXMnLCBVVElMKTtcbn0gKHdpbmRvdywgV1NVLnByaW1lKCd1dGlsaXRpZXMnLCBXU1UpICkgKTtcbiJdfQ==
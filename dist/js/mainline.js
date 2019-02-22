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
        if (!w.defined(w.included[ns_path])) {
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
        console.log = console.debug = console.info = function () { };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbmxpbmUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvc2NyaXB0cy9wb2x5ZmlsbHMvYXJyYXkucHJvdG90eXBlLmluZGV4b2YudHMiLCIuLi8uLi9zcmMvc2NyaXB0cy9wb2x5ZmlsbHMvYXJyYXkucHJvdG90eXBlLnJlbW92ZS50cyIsIi4uLy4uL3NyYy9zY3JpcHRzL3BvbHlmaWxscy9vYmplY3QuYXNzaWduLnRzIiwiLi4vLi4vc3JjL3NjcmlwdHMvcG9seWZpbGxzL3N0cmluZy5wcm90b3R5cGUuZW5kc1dpdGgudHMiLCIuLi8uLi9zcmMvc2NyaXB0cy9wb2x5ZmlsbHMvc3RyaW5nLnByb3RvdHlwZS5sZWFkaW5nQ2hhci50cyIsIi4uLy4uL3NyYy9zY3JpcHRzL3BvbHlmaWxscy9zdHJpbmcucHJvdG90eXBlLnRvQ2FtZWxDYXNlLnRzIiwiLi4vLi4vc3JjL3NjcmlwdHMvcG9seWZpbGxzL3dpbmRvdy5tYXRjaE1lZGlhLnRzIiwiLi4vLi4vc3JjL3NjcmlwdHMvY29yZS9tYWlubGluZS50cyIsIi4uLy4uL3NyYy9zY3JpcHRzL3VpL21haW5saW5lLnRzIiwiLi4vLi4vc3JjL3NjcmlwdHMvdXRpbGl0aWVzL2R1bXBLZXlzUmVjdXJzaXZlbHkvZHVtcEtleXNSZWN1cnNpdmVseS50cyIsIi4uLy4uL3NyYy9zY3JpcHRzL3V0aWxpdGllcy9tYWlubGluZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxPQUFPLEVBQUU7SUFDMUIsS0FBSyxDQUFDLFNBQVMsQ0FBQyxPQUFPLEdBQUcsVUFBUyxHQUFHLEVBQUUsS0FBSztRQUN6QyxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxJQUFJLENBQUMsQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUU7WUFDcEQsSUFBSSxJ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LEdBQUcsQ0FBQyxFQUFFLENBQUMsMEJBQTBCLENBQUMsQ0FBQztRQUNuQyxHQUFHLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ2IsR0FBRyxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsWUFBWSxDQUFDLEdBQUcsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBQ3pDLENBQUMsQ0FBQztJQUVGLEdBQUcsQ0FBQyxLQUFLLENBQUMsZUFBZSxFQUFFLElBQUksQ0FBQyxDQUFDO0FBQ3JDLENBQUMsQ0FBRSxNQUFNLEVBQUUsR0FBRyxDQUFDLEtBQUssQ0FBQyxXQUFXLEVBQUUsR0FBRyxDQUFDLENBQUUsQ0FBRSxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaWYgKCFBcnJheS5wcm90b3R5cGUuaW5kZXhPZikge1xuICAgIEFycmF5LnByb3RvdHlwZS5pbmRleE9mID0gZnVuY3Rpb24ob2JqLCBzdGFydCkge1xuICAgICAgICBmb3IgKGxldCBpID0gKHN0YXJ0IHx8IDApLCBqID0gdGhpcy5sZW5ndGg7IGkgPCBqOyBpKyspIHtcbiAgICAgICAgICAgIGlmICh0aGlzW2ldID09PSBvYmopIHsgcmV0dXJuIGk7IH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gLTE7XG4gICAgfTtcbn1cbiIsImlmICghQXJyYXkucHJvdG90eXBlW1wicmVtb3ZlXCJdKSB7XG4gICAgQXJyYXkucHJvdG90eXBlW1wicmVtb3ZlXCJdID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgd2hhdDogYW55LCBhID0gYXJndW1lbnRzLCBMID0gYS5sZW5ndGgsIGF4OiBhbnk7XG4gICAgICAgIHdoaWxlIChMICYmIHRoaXMubGVuZ3RoKSB7XG4gICAgICAgICAgICB3aGF0ID0gYVstLUxdO1xuICAgICAgICAgICAgd2hpbGUgKChheCA9IHRoaXMuaW5kZXhPZih3aGF0KSkgIT09IC0xKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zcGxpY2UoYXgsIDEpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbn1cbiIsImlmICh0eXBlb2YgT2JqZWN0LmFzc2lnbiAhPSAnZnVuY3Rpb24nKSB7XG4gIE9iamVjdC5hc3NpZ24gPSBmdW5jdGlvbih0YXJnZXQ6YW55KSB7XG4gICAgJ3VzZSBzdHJpY3QnO1xuICAgIGlmICh0YXJnZXQgPT0gbnVsbCkge1xuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignQ2Fubm90IGNvbnZlcnQgdW5kZWZpbmVkIG9yIG51bGwgdG8gb2JqZWN0Jyk7XG4gICAgfVxuXG4gICAgdGFyZ2V0ID0gT2JqZWN0KHRhcmdldCk7XG4gICAgZm9yICh2YXIgaW5kZXggPSAxOyBpbmRleCA8IGFyZ3VtZW50cy5sZW5ndGg7IGluZGV4KyspIHtcbiAgICAgIHZhciBzb3VyY2UgPSBhcmd1bWVudHNbaW5kZXhdO1xuICAgICAgaWYgKHNvdXJjZSAhPSBudWxsKSB7XG4gICAgICAgIGZvciAodmFyIGtleSBpbiBzb3VyY2UpIHtcbiAgICAgICAgICBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHNvdXJjZSwga2V5KSkge1xuICAgICAgICAgICAgdGFyZ2V0W2tleV0gPSBzb3VyY2Vba2V5XTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHRhcmdldDtcbiAgfTtcbn1cbiIsImlmICghU3RyaW5nLnByb3RvdHlwZS5lbmRzV2l0aCkge1xuICAgIFN0cmluZy5wcm90b3R5cGUuZW5kc1dpdGggPSBmdW5jdGlvbiAoY2hhcnM6IHN0cmluZykge1xuICAgICAgICByZXR1cm4gdGhpcy5zdWJzdHIoLWNoYXJzLmxlbmd0aCkgPT09IGNoYXJzO1xuICAgIH07XG59XG4iLCJpZiAoIVN0cmluZy5wcm90b3R5cGUubGVhZGluZ0NoYXJzKSB7XG4gICAgU3RyaW5nLnByb3RvdHlwZS5sZWFkaW5nQ2hhcnMgPSBmdW5jdGlvbiAoY2hhcnM6IHN0cmluZ3xudW1iZXIsIGxlbmd0aDogbnVtYmVyKTogc3RyaW5nICB7XG4gICAgICAgIGlmKGxlbmd0aD4wKXtcbiAgICAgICAgICAgIHJldHVybiAoY2hhcnMudG9TdHJpbmcoKS5yZXBlYXQobGVuZ3RoKSArIHRoaXMpLnN1YnN0cigtbGVuZ3RoKTsgLy9udW1iZXIgaXMgcG9zaXRpdmUsIHNvIGN1dCBmcm9tIHJpZ2h0IGFrYSBsZWFkaW5nXG4gICAgICAgIH1lbHNle1xuICAgICAgICAgICAgcmV0dXJuICh0aGlzICsgY2hhcnMudG9TdHJpbmcoKS5yZXBlYXQoLWxlbmd0aCkpLnN1YnN0cigwLC1sZW5ndGgpO1xuICAgICAgICB9XG4gICAgfTtcbn1cbiIsImlmICghU3RyaW5nLnByb3RvdHlwZS50b0NhbWVsQ2FzZSkge1xuICAgIFN0cmluZy5wcm90b3R5cGUudG9DYW1lbENhc2UgPSBmdW5jdGlvbigpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5yZXBsYWNlKC8oPzpeXFx3fFtBLVpdfC18XFxiXFx3KS9nLFxuICAgICAgICAobHRyOmFueSwgaWR4OmFueSkgPT4gaWR4ID09PSAwXG4gICAgICAgICAgICAgICAgPyBsdHIudG9Mb3dlckNhc2UoKVxuICAgICAgICAgICAgICAgIDogbHRyLnRvVXBwZXJDYXNlKClcbiAgICAgICAgKS5yZXBsYWNlKC9cXHMrfC0vZywgJycpO1xuICAgIH07XG59XG4iLCIvKiEgbWF0Y2hNZWRpYSgpIHBvbHlmaWxsIC0gVGVzdCBhIENTUyBtZWRpYSB0eXBlL3F1ZXJ5IGluIEpTLlxuICAgIEF1dGhvcnMgJiBjb3B5cmlnaHQgKGMpIDIwMTI6IFNjb3R0IEplaGwsIFBhdWwgSXJpc2gsIE5pY2hvbGFzIFpha2FzLCBEYXZpZCBLbmlnaHQuIER1YWwgTUlUL0JTRCBsaWNlbnNlXG4gICAgfHwgYWx0ZXJlZCB0byB3b3JrIGZvciB0eXBlc2NyaXRwdCBieSBKZXJlbXkgQmFzcyBpbiAyMDE2ICovXG4oPGFueT53aW5kb3cpLm1hdGNoTWVkaWEgPSB3aW5kb3cubWF0Y2hNZWRpYSB8fCAoKDxhbnk+d2luZG93KS5tYXRjaE1lZGlhID0gZnVuY3Rpb24oKSB7XG4gICAgJ3VzZSBzdHJpY3QnO1xuXG4gICAgLy8gRm9yIGJyb3dzZXJzIHRoYXQgc3VwcG9ydCBtYXRjaE1lZGl1bSBhcGkgc3VjaCBhcyBJRSA5IGFuZCB3ZWJraXRcbiAgICBsZXQgc3R5bGVNZWRpYSA9ICh3aW5kb3cuc3R5bGVNZWRpYSB8fCAoPGFueT53aW5kb3cpLm1lZGlhKTtcblxuICAgIC8vIEZvciB0aG9zZSB0aGF0IGRvbid0IHN1cHBvcnQgbWF0Y2hNZWRpdW1cbiAgICBpZiAoIXN0eWxlTWVkaWEpIHtcbiAgICAgICAgbGV0IHN0eWxlOiBhbnkgID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3R5bGUnKSxcbiAgICAgICAgICAgIHNjcmlwdDogYW55ID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ3NjcmlwdCcpWzBdLFxuICAgICAgICAgICAgaW5mbzogYW55ICAgPSBudWxsO1xuXG4gICAgICAgIHN0eWxlLnR5cGUgID0gJ3RleHQvY3NzJztcbiAgICAgICAgc3R5bGUuaWQgICAgPSAnbWF0Y2htZWRpYWpzLXRlc3QnO1xuXG4gICAgICAgIHNjcmlwdC5wYXJlbnROb2RlLmluc2VydEJlZm9yZShzdHlsZSwgc2NyaXB0KTtcblxuICAgICAgICAvLyAnc3R5bGUuY3VycmVudFN0eWxlJyBpcyB1c2VkIGJ5IElFIDw9IDggYW5kICd3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZScgZm9yIGFsbCBvdGhlciBicm93c2Vyc1xuICAgICAgICBpbmZvID0gKCdnZXRDb21wdXRlZFN0eWxlJyBpbiB3aW5kb3cpICYmIHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKHN0eWxlLCBudWxsKSB8fCBzdHlsZS5jdXJyZW50U3R5bGU7XG5cbiAgICAgICAgc3R5bGVNZWRpYSA9IHtcbiAgICAgICAgICAgIG1hdGNoTWVkaXVtOiBmdW5jdGlvbihtZWRpYTogYW55KSB7XG4gICAgICAgICAgICAgICAgbGV0IHRleHQgPSAnQG1lZGlhICcgKyBtZWRpYSArICd7ICNtYXRjaG1lZGlhanMtdGVzdCB7IHdpZHRoOiAxcHg7IH0gfSc7XG5cbiAgICAgICAgICAgICAgICAvLyAnc3R5bGUuc3R5bGVTaGVldCcgaXMgdXNlZCBieSBJRSA8PSA4IGFuZCAnc3R5bGUudGV4dENvbnRlbnQnIGZvciBhbGwgb3RoZXIgYnJvd3NlcnNcbiAgICAgICAgICAgICAgICBpZiAoc3R5bGUuc3R5bGVTaGVldCkge1xuICAgICAgICAgICAgICAgICAgICBzdHlsZS5zdHlsZVNoZWV0LmNzc1RleHQgPSB0ZXh0O1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHN0eWxlLnRleHRDb250ZW50ID0gdGV4dDtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAvLyBUZXN0IGlmIG1lZGlhIHF1ZXJ5IGlzIHRydWUgb3IgZmFsc2VcbiAgICAgICAgICAgICAgICByZXR1cm4gaW5mby53aWR0aCA9PT0gJzFweCc7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgcmV0dXJuIGZ1bmN0aW9uKG1lZGlhOiBhbnkpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIG1hdGNoZXM6IHN0eWxlTWVkaWEubWF0Y2hNZWRpdW0obWVkaWEgfHwgJ2FsbCcpLFxuICAgICAgICAgICAgbWVkaWE6IG1lZGlhIHx8ICdhbGwnXG4gICAgICAgIH07XG4gICAgfTtcbn0oKSk7XG4iLCJkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZShcImh0bWxcIilbMF0uc2V0QXR0cmlidXRlKCdkYXRhLXVzZXJhZ2VudCcsIG5hdmlnYXRvci51c2VyQWdlbnQpO1xuLy8gdG8gaGVsbCB3aXRoIHRoaW5ncywgbGV0IHRoZSBkZXYgZGVjaWRlIGlmIHRoZXkgd2FudCB0byBzZXQgYnJvd3NlciBzcGVjaWZpYyB3aGF0IGhhdmUgeW91LlxuLy8gYWltIGlzIHRvIGFzc3VtZSBhbnlvbmUgbWFza2luZyB0aGVpciBhZ2VudCBrbm93IHdoYXQgdGhleSBhcmVcbi8vIGdldHRpbmcgaW4gZm9yIGFuZCBpcyBzdGlsbCBhY2NvdW50YWJsZSBmb3IgdG9vLlxuXG5cbi8vIENvcGllZCB3aXRoIHBlcm1pc3Npb24gZnJvbSBmbGV4ZWRcbig8YW55PndpbmRvdykuV1NVID0gKDxhbnk+d2luZG93KS5XU1UgfHwge307XG5cbihmdW5jdGlvbiAodzogV1NVc3RhdGljKSB7XG4gICAgLyoqXG4gICAgICogQ2hlY2sgaWYgdGhlIGZpcnN0IGFyZ3VtZW50IGlzIG5vdCB1bmRlZmluZWQgZmlyc3QgdG8gc3BlZWQgY2hlY2tcbiAgICAgKiB0aGVuIHNldCB0byBjaGVjayBpZiB0eXBlIGRlZmluZWQgYXMgdGhlIHNlY29uZCBhcmd1bWVudCByZXBlcnNlbnRzLlxuICAgICAqIGEgbXVsdGkgdG9vbCB0byBzdHJvbmcgdHlwZSB0aGluZ3MgYnkgY2hlY2tpbmcgdHlwZSBtb3N0IGNvbW1vblxuICAgICAqIHVzZSBpcyBgdy5kZWZpbmVkKG9iailgIGJ1dCBgdy5kZWZpbmVkKG9iaixqUXVlcnkpYCBpcyBzdXBlciBoYW5keSB0b29cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7Kn0gbnNcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gW3R5cGVdIG5hbWVkIHR5cGUgdG8gcmVzb2x2ZSB0b1xuICAgICAqIEByZXR1cm5zXG4gICAgICovXG4gICAgdy5kZWZpbmVkID0gZnVuY3Rpb24obnM6IGFueSwgdHlwZT86IHN0cmluZykge1xuICAgICAgICBpZiAoJ3VuZGVmaW5lZCcgPT09IHR5cGVvZiBucykge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIGlmICggJ3VuZGVmaW5lZCcgIT09IHR5cGVvZiB0eXBlICkge1xuICAgICAgICAgICAgaWYgKCdhcnJheScgPT09IHR5cGUpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdHlwZW9mIG5zID09PSAnb2JqZWN0JyAmJlxuICAgICAgICAgICAgICAgICAgICBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwobnMpID09PSAnW29iamVjdCBBcnJheV0nO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKCdzdHJpbmcnID09PSB0eXBlKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChucykgPT09ICdbb2JqZWN0IFN0cmluZ10nO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKCdudW1iZXInID09PSB0eXBlKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuICF3LmRlZmluZWQobnMsICdhcnJheScpICYmIChucyAtIHBhcnNlRmxvYXQoIG5zICkgKyAxKSA+PSAwO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKCAnb2JqZWN0JyA9PT0gdHlwZSApIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKG5zKSA9PT0gJ1tvYmplY3QgT2JqZWN0XSc7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoICdudWxsJyA9PT0gdHlwZSApIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKG5zKSA9PT0gJ1tvYmplY3QgTnVsbF0nO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKCAndW5kZWZpbmVkJyAhPT0gdHlwZW9mIG5zICYmIHR5cGVvZiBucyAhPT0gdHlwZSAmJiB0eXBlb2YgbnMgPT09ICdvYmplY3QnICYmIHR5cGVvZiB0eXBlID09PSAnb2JqZWN0Jykge1xuICAgICAgICAgICAgICAgIHJldHVybiBucyBpbnN0YW5jZW9mIHR5cGU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gJ3VuZGVmaW5lZCcgIT09IHR5cGVvZiBucyAmJiB0eXBlb2YgbnMgPT09IHR5cGU7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIFN0aWxsIHVwIGZvciBjb25zaWRlcmF0aW9uLiAgbm90IGluIGN1cnJlbnQgZm9ybSBidXQgYXMgc2hvcnRjdXQ/XG4gICAgICpcbiAgICAgKiBAcGFyYW0geyp9IG5zXG4gICAgICogQHBhcmFtIHsqfSBbdmFsXVxuICAgICAqIEBwYXJhbSB7Kn0gW25zX3Jvb3RdXG4gICAgICogQHJldHVybnNcbiAgICAgKi9cbiAgICB3LmRlZmluZSA9IGZ1bmN0aW9uKG5zOiBhbnksIHZhbD86IGFueSwgbnNfcm9vdD86IGFueSkge1xuICAgICAgICBsZXQgcGFyZW50ID0gbnM7XG4gICAgICAgIGlmICghdy5kZWZpbmVkKG5zLCAnb2JqZWN0JykpIHtcbiAgICAgICAgICAgIHBhcmVudCA9IHcucHJpbWUobnMsIG5zX3Jvb3QpO1xuICAgICAgICB9XG4gICAgICAgIHRyeSB7IC8vIHRlc3RpbmcgY2FzdWUgaWYgaXQgZG9lcyBmYWlsIHdlbGwgaXQgZGlkIGFuZCB0aGF0IGNvdWxkIGJlIHVzZWZ1bFxuICAgICAgICAgICAgcGFyZW50ID0gdmFsOyAvLyB3b3JyaWVkIHRoaXMgd2lsbCBub3QgdXBkYXRlIHBhcmVudCBucyAxMDBcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgICB3Ll9kKGUpO1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIFNldCB1cCBjb250YWluaW5nIG9iamVjdCBhbmQgbWVyZ2UgYWxsIGl0ZW1zIGZyb20gbWVyZ2UgbGlzdC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7Kn0gb2JqXG4gICAgICogQHJldHVybnMgY29uY2F0ZW5hdGVkIG9iamVjdDtcbiAgICAgKi9cbiAgICB3Lm1lcmdlID0gZnVuY3Rpb24ob2JqOiBhbnkpIHtcbiAgICAgICAgbGV0IG91dDogYW55ID0ge307XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgb2JqLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBmb3IgKGxldCBwIG9mIE9iamVjdC5rZXlzKG9ialtpXSkgKSB7IC8vIGxldCBwIGluIG9ialtpXSkge1xuICAgICAgICAgICAgICAgIG91dFtwXSA9IG9ialtpXVtwXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gb3V0O1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBhbG1vc3QgdGhlIHNhbWUgYXMgdy5wcmltZSBidXQganVzdCBtYXNoZXMgdGhlIGNvbGxpc2lvbiBvZiBucyB3aGVyZVxuICAgICAqIHcucHJpbWUgaXMgaXMgdGhlIGRlY2lkZXJcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7Li4uYW55W119IHBcbiAgICAgKiBAcmV0dXJuc1xuICAgICAqL1xuICAgIHcuZXh0ZW5kID0gZnVuY3Rpb24oLi4ucDogYW55W10pIHtcbiAgICAgICAgbGV0IG9wdGlvbnMsIG5hbWUsIHNyYywgY29weSwgY2xvbmUsXG4gICAgICAgICAgICB0YXJnZXQgPSBhcmd1bWVudHNbMF0gfHwge30sXG4gICAgICAgICAgICBpID0gMSxcbiAgICAgICAgICAgIGxlbmd0aCA9IGFyZ3VtZW50cy5sZW5ndGgsXG4gICAgICAgICAgICBkZWVwID0gZmFsc2U7XG5cbiAgICAgICAgLy8gSGFuZGxlIGEgZGVlcCBjb3B5IHNpdHVhdGlvblxuICAgICAgICBpZiAoIHR5cGVvZiB0YXJnZXQgPT09ICdib29sZWFuJyApIHtcbiAgICAgICAgICAgIGRlZXAgPSB0YXJnZXQ7XG4gICAgICAgICAgICAvLyBTa2lwIHRoZSBib29sZWFuIGFuZCB0aGUgdGFyZ2V0XG4gICAgICAgICAgICB0YXJnZXQgPSBhcmd1bWVudHNbIGkgXSB8fCB7fTtcbiAgICAgICAgICAgIGkrKztcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIEhhbmRsZSBjYXNlIHdoZW4gdGFyZ2V0IGlzIGEgc3RyaW5nIG9yIHNvbWV0aGluZyAocG9zc2libGUgaW4gZGVlcCBjb3B5KVxuICAgICAgICBpZiAoICF3LmRlZmluZWQodGFyZ2V0LCAnb2JqZWN0JykgJiYgIXcuZGVmaW5lZCh0YXJnZXQsICdmdW5jdGlvbicpICkge1xuICAgICAgICAgICAgdGFyZ2V0ID0ge307XG4gICAgICAgIH1cblxuICAgICAgICAvLyBFeHRlbmQgZmxleGVkIGl0c2VsZiBpZiBvbmx5IG9uZSBhcmd1bWVudCBpcyBwYXNzZWRcbiAgICAgICAgaWYgKCBpID09PSBsZW5ndGggKSB7XG4gICAgICAgICAgICB0YXJnZXQgPSB0aGlzO1xuICAgICAgICAgICAgaS0tO1xuICAgICAgICB9XG5cbiAgICAgICAgZm9yICggOyBpIDwgbGVuZ3RoOyBpKysgKSB7XG4gICAgICAgICAgICAvLyBPbmx5IGRlYWwgd2l0aCBub24tbnVsbC91bmRlZmluZWQgdmFsdWVzXG4gICAgICAgICAgICBpZiAoIChvcHRpb25zID0gYXJndW1lbnRzWyBpIF0pICE9IG51bGwgKSB7XG4gICAgICAgICAgICAgICAgLy8gRXh0ZW5kIHRoZSBiYXNlIG9iamVjdFxuICAgICAgICAgICAgICAgIGZvciAoIG5hbWUgaW4gb3B0aW9ucyApIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCAhb3B0aW9ucy5oYXNPd25Qcm9wZXJ0eShuYW1lKSApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHNyYyA9IHRhcmdldFsgbmFtZSBdO1xuICAgICAgICAgICAgICAgICAgICBjb3B5ID0gb3B0aW9uc1sgbmFtZSBdO1xuXG4gICAgICAgICAgICAgICAgICAgIC8vIFByZXZlbnQgbmV2ZXItZW5kaW5nIGxvb3BcbiAgICAgICAgICAgICAgICAgICAgaWYgKCB0YXJnZXQgPT09IGNvcHkgKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIC8vIFJlY3Vyc2UgaWYgd2UncmUgbWVyZ2luZyBwbGFpbiBvYmplY3RzIG9yIGFycmF5c1xuICAgICAgICAgICAgICAgICAgICBpZiAoIGRlZXAgJiYgY29weSAmJiB3LmRlZmluZWQoY29weSwgJ29iamVjdCcpICkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCB3LmRlZmluZWQoY29weSwgJ2FycmF5JykgKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xvbmUgPSBzcmMgJiYgdy5kZWZpbmVkKHNyYywgJ2FycmF5JykgPyBzcmMgOiBbXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xvbmUgPSBzcmMgJiYgdy5kZWZpbmVkKHNyYywgJ29iamVjdCcpID8gc3JjIDoge307XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBOZXZlciBtb3ZlIG9yaWdpbmFsIG9iamVjdHMsIGNsb25lIHRoZW1cbiAgICAgICAgICAgICAgICAgICAgICAgIHRhcmdldFsgbmFtZSBdID0gdy5leHRlbmQoIGRlZXAsIGNsb25lLCBjb3B5ICk7XG4gICAgICAgICAgICAgICAgICAgIC8vIERvbid0IGJyaW5nIGluIHVuZGVmaW5lZCB2YWx1ZXNcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmICggY29weSAhPT0gdW5kZWZpbmVkICkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGFyZ2V0WyBuYW1lIF0gPSBjb3B5O1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIC8vIFJldHVybiB0aGUgbW9kaWZpZWQgb2JqZWN0XG4gICAgICAgIHJldHVybiB0YXJnZXQ7XG4gICAgfTtcblxuXG4gICAgLyoqXG4gICAgICogQnJlYWsgdXAgaW5wdXQgaW50byBhbiBhcnJheSBpbiBvcmRlciBvZiBkZWZpbmVkIG5hbWVzcGFjZVxuICAgICAqIHJlY3Vyc2Ugd2hlbiBub3QgYSBzdHJpbmcuXG4gICAgICpcbiAgICAgKiBAcGFyYW0geyp9IF9uc1xuICAgICAqIEByZXR1cm5zIHsqfSBpZiBhIHN0cmluZyBpbnB1dCBzcGxpdCB0byBhcnJheSBvbiBkb3RcbiAgICAgKiBAZmluYWwge2FycmF5W3N0cmluZ119XG4gICAgICovXG4gICAgdy5wYXJzZV9ucyA9IGZ1bmN0aW9uIChfbnM6IGFueSk6IGFueSB7IC8vIHNob3VsZCBiZSBhYmxlIHRvIHJlZmFjdG9yIHRoaXMgYml0XG4gICAgICAgIGxldCBvdXQ6IGFueSA9IFtdO1xuICAgICAgICBpZiAoICF3LmRlZmluZWQoX25zLCAnb2JqZWN0JykgKSB7IC8vIGVnIHN0cmluZyBvciBudW1iZXIgLy93YXMgJ29iamVjdCcgIT09IHR5cGVvZiBfbnNcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgb3V0ID0gX25zLnRvU3RyaW5nKCkuc3BsaXQoJy4nKTtcbiAgICAgICAgICAgIH0gY2F0Y2ggKGUpIHsgLy8gc28gYXQgdGhpcyBwb2ludCBpdCB3YXMgbm90IGFuIG9iamVjdCwgbnVtYmVyIG9yIHN0cmluZy4uLiB3aGF0IGlzIGl0P1xuICAgICAgICAgICAgICAgIHcuX2koZSwgX25zKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBfbnMuZm9yRWFjaChmdW5jdGlvbiAob2JqOiBhbnkpIHtcbiAgICAgICAgICAgICAgICBvdXQgPSBvdXQuY29uY2F0KHcucGFyc2VfbnMob2JqKSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gb3V0O1xuICAgIH07XG5cbiAgICAgLyoqXG4gICAgICogVGFrZSBuYW1lc3BhY2Ugb2JqZWN0LCBwYXJzZSBpdCwgY2hlY2sgZm9yIHJvb3Qgb2JqZWN0IHBhc3NlZCBhc1xuICAgICAqIHNlY29uZCBhcmd1bWVudCwgdGhlbiBzdGFydCB0aGVyZS4gIEFwcGx5IG9wdGlvbnMgb2Ygc2V0dGluZyBhIHZhbHVlXG4gICAgICogaWYgc2V0IGFzIG92ZXJyaWRlIG9yIG1lcmdlIGlmIG5zIGNvbGxpc2lvbiBvY2N1cnNcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7Kn0gbnNcbiAgICAgKiBAcGFyYW0geyp9IFtuc19yb290XVxuICAgICAqIEBwYXJhbSB7Kn0gW29wdGlvbnNdXG4gICAgICogQHJldHVybnNcbiAgICAgKi9cbiAgICB3LmdldF9ucyA9IGZ1bmN0aW9uIChuczogYW55KSB7XG4gICAgICAgIGxldCBwYXJlbnQgPSB3aW5kb3csIC8vIGFsYWlzIHRvIHdvcmsgd2l0aFxuICAgICAgICAgICAgcGw6IG51bWJlcixcbiAgICAgICAgICAgIGk6IG51bWJlcixcbiAgICAgICAgICAgIG91dDogYW55ID0gbnVsbDtcblxuICAgICAgICBsZXQgcGFydHM6IGFueSA9IHcucGFyc2VfbnMobnMpO1xuICAgICAgICBwbCA9IHBhcnRzLmxlbmd0aDtcbiAgICAgICAgZm9yIChpID0gMDsgaSA8IHBsOyBpKyspIHtcbiAgICAgICAgICAgIC8vIGNyZWF0ZSBhIHByb3BlcnR5IGlmIGl0IGRvZXNudCBleGlzdFxuICAgICAgICAgICAgaWYgKCB3LmRlZmluZWQoIHBhcmVudFtwYXJ0c1tpXV0gKSB8fCAoKGkgPT09IHBsIC0gMSkpICkge1xuICAgICAgICAgICAgICAgIGxldCB2YWx1ZSA9IHBhcmVudFtwYXJ0c1tpXV0gfHwge307XG4gICAgICAgICAgICAgICAgb3V0ID0gdmFsdWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBwYXJlbnQgPSBwYXJlbnRbcGFydHNbaV1dO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBvdXQ7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIFN0aWxsIHVwIGZvciBjb25zaWRlcmF0aW9uLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IG5zX3BhdGggbG9hZCBucyBieSBmaWxlXG4gICAgICogQHBhcmFtIHsqfSBbY2FsbGJhY2tdIGRvIHNvbWV0aGluZyBhZnRlclxuICAgICAqL1xuICAgIHcuaW5jbHVkZWQgPSBbXTsgLy8gdHJhY2tlclxuICAgIHcuaW5jbHVkZSA9IGZ1bmN0aW9uIChuc19wYXRoOiBzdHJpbmcsIGNhbGxiYWNrPzogYW55KXtcbiAgICAgICAgaWYgKCF3LmRlZmluZWQody5pbmNsdWRlZFtuc19wYXRoXSkpIHsgLy8gaWYgaXQgaXMgbG9hZGVkIGRvbid0IHdvcnJ5XG4gICAgICAgICAgICBsZXQgc3JwdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NjcmlwdCcpO1xuICAgICAgICAgICAgaWYgKCB3LmRlZmluZWQoY2FsbGJhY2ssICdmdW5jdGlvbicpICkge1xuICAgICAgICAgICAgICAgIHNycHQuYWRkRXZlbnRMaXN0ZW5lcignbG9hZCcsIGNhbGxiYWNrKTsgLy8gcGFzcyBteSBob2lzdGVkIGZ1bmN0aW9uXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBzcnB0LnNyYyA9IG5zX3BhdGggKyAnLmpzJztcbiAgICAgICAgICAgIHcuaW5jbHVkZWQucHVzaChuc19wYXRoKTtcbiAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2hlYWQnKS5hcHBlbmRDaGlsZChzcnB0KTtcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBTZXQgZGVidWcgdG8gY29uc29sZS4gIHRoaW5rIGZpZWxkIGRldGVjdG9yIHdoZW4gbGVhdmluZyBpbiBwcm9kdWN0aW9uLlxuICAgICAqXG4gICAgICogQHBhcmFtIHsqfSBvdXRwdXRcbiAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn0gc3RhdGUgb2YgY29tcGxldGlvblxuICAgICAqL1xuICAgIHcuX2QgPSBmdW5jdGlvbihvdXRwdXQ6IGFueSkge1xuICAgICAgICAvLyByZXR1cm4gZm9yIGNvbnNpc3RlbmN5XG4gICAgICAgICB3LmRlZmluZWQoV1NVLnN0YXRlLmRlYnVnKSAmJiBXU1Uuc3RhdGUuZGVidWcgJiYgKDxhbnk+d2luZG93KS5jb25zb2xlLmRlYnVnKG91dHB1dCk7IC8vIHRzbGludDpkaXNhYmxlLWxpbmVcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogU2V0IGxvZyB0byBjb25zb2xlLiAgdGhpbmsgZmllbGQgZGV0ZWN0b3Igd2hlbiBsZWF2aW5nIGluIHByb2R1Y3Rpb24uXG4gICAgICpcbiAgICAgKiBAcGFyYW0geyp9IGFcbiAgICAgKiBAcGFyYW0geyp9IGJcbiAgICAgKiBAcmV0dXJucyAge2Jvb2xlYW59IHN0YXRlIG9mIGNvbXBsZXRpb25cbiAgICAgKi9cbiAgICB3Ll9pID0gZnVuY3Rpb24oYTogYW55LCBiOiBhbnkpIHtcbiAgICAgICAgLy8gcmV0dXJuIGZvciBjb25zaXN0ZW5jeVxuICAgICAgICAgdy5kZWZpbmVkKFdTVS5zdGF0ZS5kZWJ1ZykgJiYgV1NVLnN0YXRlLmRlYnVnICYmICg8YW55PndpbmRvdykuY29uc29sZS5pbmZvKGEsIGIpOyAvLyB0c2xpbnQ6ZGlzYWJsZS1saW5lXG4gICAgfTtcblxuXG4gICAgLyoqXG4gICAgICogVGFrZSBuYW1lc3BhY2Ugb2JqZWN0LCBwYXJzZSBpdCwgY2hlY2sgZm9yIHJvb3Qgb2JqZWN0IHBhc3NlZCBhc1xuICAgICAqIHNlY29uZCBhcmd1bWVudCwgdGhlbiBzdGFydCB0aGVyZS4gIEFwcGx5IG9wdGlvbnMgb2Ygc2V0dGluZyBhIHZhbHVlXG4gICAgICogaWYgc2V0IGFzIG92ZXJyaWRlIG9yIG1lcmdlIGlmIG5zIGNvbGxpc2lvbiBvY2N1cnNcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7Kn0gbnNcbiAgICAgKiBAcGFyYW0geyp9IFtuc19yb290XVxuICAgICAqIEBwYXJhbSB7Kn0gW29wdGlvbnNdXG4gICAgICogQHJldHVybnNcbiAgICAgKi9cbiAgICB3LnByaW1lID0gZnVuY3Rpb24gKG5zOiBhbnksIG5zX3Jvb3Q/OiBhbnksIG9wdGlvbnM/OiBhbnkpIHtcbiAgICAgICAgbnNfcm9vdCA9IG5zX3Jvb3QgfHwgd2luZG93OyAvLyBzZXQgdXAgdGhlIHJvb3Qgb2JqZWN0XG4gICAgICAgIC8vIG1ha2UgaXMgZG8gb25lIGNhbiBqdXN0IHB1dCBpbiBhIHZhbHVlIGFuZCB0YWtlIHRoZSBkZWZhdWx0c1xuICAgICAgICBvcHRpb25zID0gb3B0aW9ucyB8fCB7dmFsdWU6IG5ldyBPYmplY3R9O1xuICAgICAgICBvcHRpb25zID0gIXcuZGVmaW5lZChvcHRpb25zLnZhbHVlKSB8fCAhdy5kZWZpbmVkKG9wdGlvbnMsICdvYmplY3QnKSA/IHt2YWx1ZSA6IG9wdGlvbnN9IDogb3B0aW9ucztcbiAgICAgICAgLy8gaHVsayBzbWFzaD9cbiAgICAgICAgb3B0aW9ucyA9IE9iamVjdC5hc3NpZ24oe292ZXJyaWRlOiBmYWxzZSwgbWVyZ2U6IHRydWUsIGRlZXA6IHRydWV9LCBvcHRpb25zKTsgLy8gc3BlZWQgaXQgaW4gd2UgdHJ1c3QgaXRcblxuICAgICAgICBsZXQgcGFyZW50ID0gbnNfcm9vdCwgLy8gYWxpYXMgdG8gd29yayB3aXRoXG4gICAgICAgICAgICBwbDogbnVtYmVyLFxuICAgICAgICAgICAgaTogbnVtYmVyO1xuXG4gICAgICAgIGxldCBwYXJ0czogYW55ID0gdy5wYXJzZV9ucyhucyk7XG4gICAgICAgIHBsID0gcGFydHMubGVuZ3RoO1xuICAgICAgICBmb3IgKGkgPSAwOyBpIDwgcGw7IGkrKykge1xuICAgICAgICAgICAgLy8gY3JlYXRlIGEgcHJvcGVydHkgaWYgaXQgZG9lc24ndCBleGlzdFxuICAgICAgICAgICAgaWYgKCAhdy5kZWZpbmVkKCBwYXJlbnRbcGFydHNbaV1dICkgfHwgKChpID09PSBwbCAtIDEpKSApIHtcbiAgICAgICAgICAgICAgICBsZXQgdmFsdWUgPSB3LmRlZmluZWQocGFyZW50W3BhcnRzW2ldXSkgPyBwYXJlbnRbcGFydHNbaV1dIDoge307XG4gICAgICAgICAgICAgICAgaWYgKCAoaSA9PT0gcGwgLSAxKSAmJiB3LmRlZmluZWQob3B0aW9ucy52YWx1ZSkpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCB3LmRlZmluZWQodmFsdWUpICYmIHcuZGVmaW5lZCggb3B0aW9ucy5tZXJnZSApICYmIHRydWUgPT09IG9wdGlvbnMubWVyZ2UgKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIHcuZGVmaW5lZChvcHRpb25zLnZhbHVlLCAnc3RyaW5nJykgfHwgdy5kZWZpbmVkKG9wdGlvbnMudmFsdWUsICdudW1iZXInKSApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyByZWFsbHk/ICBsb2wgd2h5IHdvdWxkIHlvdT8gIGJ1dCByZWdhcmRsZXNzIGRvbid0IGJ1aWxkIHdhbGxzIHNvIGxlYXZlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWUgPSB2YWx1ZSArIG9wdGlvbnMudmFsdWU7XG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKCB3LmRlZmluZWQob3B0aW9ucy52YWx1ZSwgJ2Jvb2xlYW4nKSApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZSA9IG9wdGlvbnMudmFsdWUgPT09IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlID0gdy5leHRlbmQob3B0aW9ucy5kZWVwLCB2YWx1ZSwgb3B0aW9ucy52YWx1ZSk7IC8vIE9iamVjdC5hc3NpZ24odmFsdWUsIG9wdGlvbnMudmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKCB0cnVlID09PSBvcHRpb25zLm92ZXJyaWRlICkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWUgPSBvcHRpb25zLnZhbHVlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHBhcmVudFtwYXJ0c1tpXV0gPSB2YWx1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHBhcmVudCA9IHBhcmVudFtwYXJ0c1tpXV07XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHBhcmVudDtcbiAgICB9O1xuXG4gICAgdy5yZW5kZXIgPSBmdW5jdGlvbiAoaHRtbDphbnksIG9wdGlvbnM6YW55KSB7XG4gICAgICAgIC8vIEB0b2RvIGFkZCBiZXR0ZXIgZXJyb3IgaGFuZGxpbmcgZm9yIGVtcHR5cyBhdCB0aGUgbGVhc3RcbiAgICAgICAgdmFyIHJlLCBhZGQ6YW55LCBtYXRjaCwgY3Vyc29yLCBjb2RlOmFueSwgcmVFeHA6YW55LCByZXN1bHQ7XG5cbiAgICAgICAgcmUgPSAvPCUoLis/KSU+L2c7XG4gICAgICAgIHJlRXhwID0gLyheKCApPyh2YXJ8aWZ8Zm9yfGVsc2V8c3dpdGNofGNhc2V8YnJlYWt8e3x9fDspKSguKik/L2c7XG4gICAgICAgIGNvZGUgPSBcInZhciByPVtdO1xcblwiO1xuICAgICAgICBjdXJzb3IgPSAwO1xuXG4gICAgICAgIGFkZCA9IGZ1bmN0aW9uIChsaW5lOmFueSwganM6YW55KSB7XG4gICAgICAgICAgICBpZiAoanMpIHtcbiAgICAgICAgICAgICAgICBjb2RlICs9IGxpbmUubWF0Y2gocmVFeHApID8gbGluZSArIFwiXFxuXCIgOiBcInIucHVzaChcIiArIGxpbmUgKyBcIik7XFxuXCI7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGNvZGUgKz0gbGluZSAhPT0gXCJcIiA/IFwici5wdXNoKCdcIiArIGxpbmUucmVwbGFjZSgvJy9nLCBcIlxcXCJcIikgKyBcIicpO1xcblwiIDogXCJcIjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBhZGQ7XG4gICAgICAgIH07XG5cbiAgICAgICAgd2hpbGUgKChtYXRjaCA9IHJlLmV4ZWMoaHRtbCkpKSB7XG4gICAgICAgICAgICBhZGQoaHRtbC5zbGljZShjdXJzb3IsIG1hdGNoLmluZGV4KSkobWF0Y2hbMV0sIHRydWUpO1xuICAgICAgICAgICAgY3Vyc29yID0gbWF0Y2guaW5kZXggKyBtYXRjaFswXS5sZW5ndGg7XG4gICAgICAgIH1cbiAgICAgICAgaWYoV1NVLmRlZmluZWQoaHRtbCwnc3RyaW5nJykpe1xuICAgICAgICAgICAgYWRkKGh0bWwuc3Vic3RyKGN1cnNvciwgaHRtbC5sZW5ndGggLSBjdXJzb3IpKTtcbiAgICAgICAgICAgIGNvZGUgPSAoY29kZSArIFwicmV0dXJuIHIuam9pbignJyk7XCIpLnJlcGxhY2UoL1tcXHJcXHRcXG5dL2csIFwiXCIpO1xuICAgICAgICAgICAgcmVzdWx0ID0gbmV3IEZ1bmN0aW9uKGNvZGUpLmFwcGx5KG9wdGlvbnMpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfTtcblxuXG5cbiAgICBsZXQgZnVubmllcyA9IFtcbiAgICAgICAgeyB1OiAnQSBsb3QgYWJvdXQgbGl2aW5nOycsIGw6ICdBIGxpdHRsZSBhYm91dCBsb3ZlLi4uJyB9XG4gICAgICAgICwgeyB1OiAnR29pbmcgZm9yIGRpc3RhbmNlLi4uJywgbDogJ2dvaW5nIGZvciBzcGVlZCEhJyB9XG4gICAgICAgICwgeyB1OiAnSVxcJ3ZlIGdvdCBmcmllbmRzJywgbDogJ2luIGNvZGUgcGxhY2VzLi4uJyB9XG4gICAgICAgICwgeyB1OiAnTWFtYS4uLicsIGw6ICdJIGp1c3Qga2lsbGVkIGEgYnVnJyB9IF07XG4gICAgICAgIGxldCBmdW5ueSA9IGZ1bm5pZXNbTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogZnVubmllcy5sZW5ndGgpXTtcblxuICAgICAgICBjb25zb2xlLmxvZyggJyVjICAgICAgX19fICAgICAgICAgICBfX18gICAgICAgICAgIF9fX1xcbidcbiAgICAgICAgKyAnICAgICAvXFxcXCAgXFxcXCAgICAgICAgIC9cXFxcX19cXFxcICAgICAgICAgL1xcXFwgIFxcXFxcXG4nXG4gICAgICAgICsgJyAgICBfXFxcXDpcXFxcICBcXFxcICAgICAgIC86LyBfL18gICAgICAgIFxcXFw6XFxcXCAgXFxcXCAgICAgICAgJyArIGZ1bm55LnUgKyAnXFxuJ1xuICAgICAgICArICcgICAvXFxcXCBcXFxcOlxcXFwgIFxcXFwgICAgIC86LyAvXFxcXCAgXFxcXCAgICAgICAgXFxcXDpcXFxcICBcXFxcICAgICAgICcgKyBmdW5ueS5sICsgJ1xcbidcbiAgICAgICAgKyAnICBfXFxcXDpcXFxcIFxcXFw6XFxcXCAgXFxcXCAgIC86LyAvOjpcXFxcICBcXFxcICAgX19fICBcXFxcOlxcXFwgIFxcXFxcXG4nXG4gICAgICAgICsgJyAvXFxcXCBcXFxcOlxcXFwgXFxcXDpcXFxcX19cXFxcIC86L18vOi9cXFxcOlxcXFxfX1xcXFwgL1xcXFwgIFxcXFwgIFxcXFw6XFxcXF9fXFxcXFxcbidcbiAgICAgICAgKyAnIFxcXFw6XFxcXCBcXFxcOlxcXFwvOi8gIC8gXFxcXDpcXFxcLzovIC86LyAgLyBcXFxcOlxcXFwgIFxcXFwgLzovICAvICAgIF9fX19fX19fXyAgICBfX19fX19fX19cXG4nXG4gICAgICAgICsgJyAgXFxcXDpcXFxcIFxcXFw6Oi8gIC8gICBcXFxcOjovIC86LyAgLyAgIFxcXFw6XFxcXCAgLzovICAvICAgIC8gX19fXy8gICBcXHwgIC8gIF8vIF9fXy9cXG4nXG4gICAgICAgICsgJyAgIFxcXFw6XFxcXC86LyAgLyAgICAgXFxcXC9fLzovICAvICAgICBcXFxcOlxcXFwvOi8gIC8gICAgLyAvXyAgLyAvfCB8ICAvIC8gXFxcXF9fIFxcXFxcXG4nXG4gICAgICAgICsgJyAgICBcXFxcOjovICAvICAgICAgICAvOi8gIC8gICAgICAgXFxcXDo6LyAgLyAgICAvIF9fLyAvIF9fXyB8Xy8gLyBfX18vIC9cXG4nXG4gICAgICAgICsgJyAgICAgXFxcXC9fXy8gICAgICAgICBcXFxcL19fLyAgICAgICAgIFxcXFwvX18vICAgIC9fLyAgIC9fLyAgfF8vX19fLy9fX19fL1xcbidcbiAgICAgICAgLCAgJ2ZvbnQtZmFtaWx5Om1vbm9zcGFjZScpO1xuXG5cblxuICAgIHcucHJpbWUoJ3N0YXRlJywgICB3LCAgICAgICB7IHZhbHVlOiB7fSwgICAgICAgICAgICBvdmVycmlkZTogZmFsc2UgfSk7IC8vIGhvbmVzdGx5IHRoaXMgc2hvdWxkbid0IGJlIHRoaXMgd2F5LCBzaG91bGQgYmUgc21hcnRlclxuICAgIHcucHJpbWUoJ2RlYnVnJywgICB3LnN0YXRlLCB7IHZhbHVlOiBmYWxzZSwgICAgICAgICBvdmVycmlkZTogZmFsc2UsIG1lcmdlOiBmYWxzZSB9KTtcbiAgICB3LnByaW1lKCdlbnYnLCAgICAgdy5zdGF0ZSwgeyB2YWx1ZTogJ2RldmVsb3BtZW50Jywgb3ZlcnJpZGU6IGZhbHNlLCBtZXJnZTogZmFsc2UgfSk7XG4gICAgdy5wcmltZSgnY29uc29sZScsIHcuc3RhdGUsIHsgdmFsdWU6IHRydWUsICAgICAgICAgIG92ZXJyaWRlOiBmYWxzZSwgbWVyZ2U6IGZhbHNlIH0pO1xuICAgIGNvbnNvbGUubG9nKCdjOicgKyB3LnN0YXRlLmNvbnNvbGUudG9TdHJpbmcoKSArICc6ZDonICArIHcuc3RhdGUuZGVidWcudG9TdHJpbmcoKSArICc6ZTonICsgdy5zdGF0ZS5lbnYudG9TdHJpbmcoKS50b0xvd2VyQ2FzZSgpICk7XG4gICAgaWYgKCAoICF3LnN0YXRlLmRlYnVnICYmIHcuc3RhdGUuZW52LnRvU3RyaW5nKCkudG9Mb3dlckNhc2UoKSAhPT0gJ2RldmVsb3BtZW50JyApXG4gICAgICAgICB8fCAhdy5zdGF0ZS5jb25zb2xlICkge1xuICAgICAgICB3LmNvbnNvbGUgPSBjb25zb2xlO1xuICAgICAgICBjb25zb2xlLmxvZygnLS0gVHVybmluZyBjb25zb2xlIChnZW5lcmFsIHN0ZF9vdXQpIE9GRicpO1xuICAgICAgICBjb25zb2xlLmxvZyA9IGNvbnNvbGUuZGVidWcgPSBjb25zb2xlLmluZm8gPSBmdW5jdGlvbiggKSB7fTtcbiAgICB9XG5cbn0oV1NVKSk7XG5cblxuXG4vKlxuKiBqUXVlcnkgaGVscGVycy4gIE1heSBtb3ZlIGF3YXkgZnJvbSBoZXJlLCBidXQgbXVzdCBwcm94eSBhbnl0aGluZ1xuKi9cbihmdW5jdGlvbigkLGpRdWVyeSl7IC8vIHRoaXMgd2lsbCBkZXBlbmQgb24galF1ZXJ5XG4gICAgalF1ZXJ5LmV4cHJbXCI6XCJdLnJlZ2V4ID0gZnVuY3Rpb24gKGVsZW06YW55LCBpbmRleDphbnksIG1hdGNoOmFueSkge1xuICAgICAgICB2YXIgbWF0Y2hQYXJhbXMgPSBtYXRjaFszXS5zcGxpdChcIixcIiksXG4gICAgICAgICAgICB2YWxpZExhYmVscyA9IC9eKGRhdGF8Y3NzKTovLFxuICAgICAgICAgICAgYXR0ciA9IHtcbiAgICAgICAgICAgICAgICBtZXRob2Q6IG1hdGNoUGFyYW1zWzBdLm1hdGNoKHZhbGlkTGFiZWxzKSA/XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbWF0Y2hQYXJhbXNbMF0uc3BsaXQoXCI6XCIpWzBdIDogXCJhdHRyXCIsXG4gICAgICAgICAgICAgICAgcHJvcGVydHk6IG1hdGNoUGFyYW1zLnNoaWZ0KCkucmVwbGFjZSh2YWxpZExhYmVscywgXCJcIilcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICByZWdleEZsYWdzID0gXCJpZ1wiLFxuICAgICAgICAgICAgcmVnZXggPSBuZXcgUmVnRXhwKG1hdGNoUGFyYW1zLmpvaW4oXCJcIikucmVwbGFjZSgvXlxccyt8XFxzKyQvZywgXCJcIiksIHJlZ2V4RmxhZ3MpO1xuICAgICAgICByZXR1cm4gcmVnZXgudGVzdChqUXVlcnkoZWxlbSlbYXR0ci5tZXRob2RdKGF0dHIucHJvcGVydHkpKTtcbiAgICB9O1xuICAgICQuZm4ub3ZlcmZsb3duID0gZnVuY3Rpb24gKCkgeyBsZXQgZSA9IHRoaXNbMF07IHJldHVybiBlLnNjcm9sbEhlaWdodCA+IGUuY2xpZW50SGVpZ2h0IHx8IGUuc2Nyb2xsV2lkdGggPiBlLmNsaWVudFdpZHRoOyB9O1xuICAgIC8vdGFyZ2V0ZWQudW5pcXVlSWQoKTsgfCByZW1vdmVVbmlxdWVJZCgpIC8vIGpRdWVyeSBleHRcbiAgICAoZnVuY3Rpb24gKGZhY3RvcnkpIHtcbiAgICAgICAgaWYgKCBXU1UuZGVmaW5lZCggKDxhbnk+IHdpbmRvdykuZGVmaW5lLCBcImZ1bmN0aW9uXCIpICYmICg8YW55PiB3aW5kb3cpLmRlZmluZS5hbWQpIHtcbiAgICAgICAgICAgIC8vIEFNRC4gUmVnaXN0ZXIgYXMgYW4gYW5vbnltb3VzIG1vZHVsZS5cbiAgICAgICAgICAgICg8YW55PiB3aW5kb3cpLmRlZmluZShbXCJqcXVlcnlcIiwgXCIuL3ZlcnNpb25cIl0sIGZhY3RvcnkpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLy8gQnJvd3NlciBnbG9iYWxzXG4gICAgICAgICAgICBmYWN0b3J5KGpRdWVyeSk7XG4gICAgICAgIH1cbiAgICB9KGZ1bmN0aW9uICgkOmFueSkge1xuICAgICAgICByZXR1cm4galF1ZXJ5LmZuLmV4dGVuZCh7XG4gICAgICAgICAgICB1bmlxdWVJZDogKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICB2YXIgdXVpZCA9IDA7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuZWFjaChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXRoaXMuaWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmlkID0gXCJmdy10cmMtXCIgKyAoKyt1dWlkKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH0pKCksXG4gICAgICAgICAgICByZW1vdmVVbmlxdWVJZDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmVhY2goZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoL15mdy10cmMtXFxkKyQvLnRlc3QodGhpcy5pZCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICQodGhpcykucmVtb3ZlQXR0cihcImlkXCIpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH0pKTtcblxuICAgICQucmVuZGVyID0gV1NVLnJlbmRlcjtcbn0oKDxhbnk+d2luZG93KS5qUXVlcnksKDxhbnk+d2luZG93KS5qUXVlcnkpKTtcbiIsIihmdW5jdGlvbiAod2luZG93OiBhbnksIFVJOiBXU1V1aVN0YXRpYykge1xuICAgICBVSS50ZXN0ID0gZnVuY3Rpb24oKXtcbiAgICAgICAgV1NVLl9kKCdnZXQgdG8gdGhlIFVJJyk7XG4gICAgICAgIFdTVS5fZChVSSk7XG4gICAgICAgIFdTVS5fZCgnMTIxNCcubGVhZGluZ0NoYXJzKCcwJywgMTApKTtcbiAgICB9O1xuXG4gICAgLy8gY2FuIGV4dGVuZCB0aGlzXG4gICAgV1NVLnByaW1lKCdhY3Rpb25zLnR5cGVzJywgVUkpO1xufSAod2luZG93LCBXU1UucHJpbWUoJ3VpJywgV1NVKSApICk7XG4iLCIoZnVuY3Rpb24gKHdpbmRvdzogYW55LCBVVElMOiBXU1V1dGlsU3RhdGljKSB7XG4gICAgVVRJTC5kdW1wS2V5c1JlY3Vyc2l2ZWx5ID0gZnVuY3Rpb24gKG9iajogYW55LCByZWdleDogYW55KSB7XG4gICAgICAgIHZhciBrZXlzOiBhbnkgPSBbXTtcbiAgICAgICAgcmVnZXggPSByZWdleCB8fCBmYWxzZTtcbiAgICAgICAgdmFyIGNyZWF0ZUtleVBhdGggPSBmdW5jdGlvbiAoY3VycmVudEtleVBhdGg6IGFueSwga2V5OiBhbnkpIHtcbiAgICAgICAgICAgIHJldHVybiBjdXJyZW50S2V5UGF0aCArIChjdXJyZW50S2V5UGF0aCA/ICcuJyA6ICcnKSArIGtleTtcbiAgICAgICAgfTtcbiAgICAgICAgKGZ1bmN0aW9uIChwYXRoOiBhbnksIGFueTogYW55KSB7XG4gICAgICAgICAgICB2YXIgaTogYW55LCBrOiBhbnksIGN1cnJlbnRQYXRoOiBhbnk7XG4gICAgICAgICAgICBpZiAoIFdTVS5kZWZpbmVkKGFueSxcImFycmF5XCIpICkge1xuICAgICAgICAgICAgICAgIGZvciAoaSA9IDA7IGkgPCBhbnkubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgY3VycmVudFBhdGggPSBjcmVhdGVLZXlQYXRoKHBhdGgsIChpKS50b1N0cmluZygpKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGZhbHNlICE9PSByZWdleCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHBtYXRjaCA9IHJlZ2V4LmV4ZWMoY3VycmVudFBhdGgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG51bGwgIT09IHBtYXRjaCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGtleXMucHVzaChjdXJyZW50UGF0aCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBrZXlzLnB1c2goY3VycmVudFBhdGgpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGFyZ3VtZW50cy5jYWxsZWUoY3VycmVudFBhdGgsIGFueVtpXSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIGlmICggIVdTVS5kZWZpbmVkKGFueSxcInN0cmluZ1wiKSApIHtcbiAgICAgICAgICAgICAgICBmb3IgKGsgaW4gYW55KSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChhbnkuaGFzT3duUHJvcGVydHkoaykpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGN1cnJlbnRQYXRoID0gY3JlYXRlS2V5UGF0aChwYXRoLCBrKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChmYWxzZSAhPT0gcmVnZXgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgcm1hdGNoID0gcmVnZXguZXhlYyhjdXJyZW50UGF0aCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG51bGwgIT09IHJtYXRjaCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBrZXlzLnB1c2goY3VycmVudFBhdGgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAga2V5cy5wdXNoKGN1cnJlbnRQYXRoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGFyZ3VtZW50cy5jYWxsZWUoY3VycmVudFBhdGgsIGFueVtrXSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pKCcnLCBvYmopO1xuICAgICAgICByZXR1cm4ga2V5cztcbiAgICB9O1xufSAod2luZG93LCBXU1UucHJpbWUoJ3V0aWxpdGllcycsIFdTVSkgKSApO1xuIiwiKGZ1bmN0aW9uICh3aW5kb3c6IGFueSwgVVRJTDogV1NVdXRpbFN0YXRpYykge1xuICAgICBVVElMLnRlc3QgPSBmdW5jdGlvbigpe1xuICAgICAgICBXU1UuX2QoJ2dldCB0byB0aGUgV1NVdXRpbFN0YXRpYycpO1xuICAgICAgICBXU1UuX2QoVVRJTCk7XG4gICAgICAgIFdTVS5fZCgnMTIxNCcubGVhZGluZ0NoYXJzKCcwJywgMTApKTtcbiAgICB9O1xuICAgIC8vIGNhbiBleHRlbmQgdGhpc1xuICAgIFdTVS5wcmltZSgnYWN0aW9ucy50eXBlcycsIFVUSUwpO1xufSAod2luZG93LCBXU1UucHJpbWUoJ3V0aWxpdGllcycsIFdTVSkgKSApO1xuIl19
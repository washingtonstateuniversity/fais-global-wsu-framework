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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbmxpbmUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvc2NyaXB0cy9wb2x5ZmlsbHMvYXJyYXkucHJvdG90eXBlLmluZGV4b2YudHMiLCIuLi8uLi9zcmMvc2NyaXB0cy9wb2x5ZmlsbHMvYXJyYXkucHJvdG90eXBlLnJlbW92ZS50cyIsIi4uLy4uL3NyYy9zY3JpcHRzL3BvbHlmaWxscy9vYmplY3QuYXNzaWduLnRzIiwiLi4vLi4vc3JjL3NjcmlwdHMvcG9seWZpbGxzL3N0cmluZy5wcm90b3R5cGUuZW5kc1dpdGgudHMiLCIuLi8uLi9zcmMvc2NyaXB0cy9wb2x5ZmlsbHMvc3RyaW5nLnByb3RvdHlwZS5sZWFkaW5nQ2hhci50cyIsIi4uLy4uL3NyYy9zY3JpcHRzL3BvbHlmaWxscy9zdHJpbmcucHJvdG90eXBlLnRvQ2FtZWxDYXNlLnRzIiwiLi4vLi4vc3JjL3NjcmlwdHMvcG9seWZpbGxzL3dpbmRvdy5tYXRjaE1lZGlhLnRzIiwiLi4vLi4vc3JjL3NjcmlwdHMvY29yZS9tYWlubGluZS50cyIsIi4uLy4uL3NyYy9zY3JpcHRzL3VpL21haW5saW5lLnRzIiwiLi4vLi4vc3JjL3NjcmlwdHMvdXRpbGl0aWVzL2R1bXBLZXlzUmVjdXJzaXZlbHkvZHVtcEtleXNSZWN1cnNpdmVseS50cyIsIi4uLy4uL3NyYy9zY3JpcHRzL3V0aWxpdGllcy9tYWlubGluZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxPQUFPLEVBQUU7SUFDMUIsS0FBSyxDQUFDLFNBQVMsQ0FBQyxPQUFPLEdBQUcsVUFBUyxHQUFHLEVBQUUsS0FBSztRQUN6QyxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxJQUFJLENBQUMsQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUU7WUFDcEQsSUFBSSxJ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QUMsQ0FBQztBQUNOLENBQUMsQ0FBRSxNQUFNLEVBQUUsR0FBRyxDQUFDLEtBQUssQ0FBQyxXQUFXLEVBQUUsR0FBRyxDQUFDLENBQUUsQ0FBRSxDQUFDO0FDekMzQyxDQUFDLFVBQVUsTUFBVyxFQUFFLElBQW1CO0lBQ3RDLElBQUksQ0FBQyxJQUFJLEdBQUc7UUFDVCxHQUFHLENBQUMsRUFBRSxDQUFDLDBCQUEwQixDQUFDLENBQUM7UUFDbkMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNiLEdBQUcsQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQztJQUN6QyxDQUFDLENBQUM7SUFFRixHQUFHLENBQUMsS0FBSyxDQUFDLGVBQWUsRUFBRSxJQUFJLENBQUMsQ0FBQztBQUNyQyxDQUFDLENBQUUsTUFBTSxFQUFFLEdBQUcsQ0FBQyxLQUFLLENBQUMsV0FBVyxFQUFFLEdBQUcsQ0FBQyxDQUFFLENBQUUsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImlmICghQXJyYXkucHJvdG90eXBlLmluZGV4T2YpIHtcbiAgICBBcnJheS5wcm90b3R5cGUuaW5kZXhPZiA9IGZ1bmN0aW9uKG9iaiwgc3RhcnQpIHtcbiAgICAgICAgZm9yIChsZXQgaSA9IChzdGFydCB8fCAwKSwgaiA9IHRoaXMubGVuZ3RoOyBpIDwgajsgaSsrKSB7XG4gICAgICAgICAgICBpZiAodGhpc1tpXSA9PT0gb2JqKSB7IHJldHVybiBpOyB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIC0xO1xuICAgIH07XG59XG4iLCJpZiAoIUFycmF5LnByb3RvdHlwZVtcInJlbW92ZVwiXSkge1xuICAgIEFycmF5LnByb3RvdHlwZVtcInJlbW92ZVwiXSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIHdoYXQ6IGFueSwgYSA9IGFyZ3VtZW50cywgTCA9IGEubGVuZ3RoLCBheDogYW55O1xuICAgICAgICB3aGlsZSAoTCAmJiB0aGlzLmxlbmd0aCkge1xuICAgICAgICAgICAgd2hhdCA9IGFbLS1MXTtcbiAgICAgICAgICAgIHdoaWxlICgoYXggPSB0aGlzLmluZGV4T2Yod2hhdCkpICE9PSAtMSkge1xuICAgICAgICAgICAgICAgIHRoaXMuc3BsaWNlKGF4LCAxKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG59XG4iLCJpZiAodHlwZW9mIE9iamVjdC5hc3NpZ24gIT0gJ2Z1bmN0aW9uJykge1xuICBPYmplY3QuYXNzaWduID0gZnVuY3Rpb24odGFyZ2V0OmFueSkge1xuICAgICd1c2Ugc3RyaWN0JztcbiAgICBpZiAodGFyZ2V0ID09IG51bGwpIHtcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0Nhbm5vdCBjb252ZXJ0IHVuZGVmaW5lZCBvciBudWxsIHRvIG9iamVjdCcpO1xuICAgIH1cblxuICAgIHRhcmdldCA9IE9iamVjdCh0YXJnZXQpO1xuICAgIGZvciAodmFyIGluZGV4ID0gMTsgaW5kZXggPCBhcmd1bWVudHMubGVuZ3RoOyBpbmRleCsrKSB7XG4gICAgICB2YXIgc291cmNlID0gYXJndW1lbnRzW2luZGV4XTtcbiAgICAgIGlmIChzb3VyY2UgIT0gbnVsbCkge1xuICAgICAgICBmb3IgKHZhciBrZXkgaW4gc291cmNlKSB7XG4gICAgICAgICAgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzb3VyY2UsIGtleSkpIHtcbiAgICAgICAgICAgIHRhcmdldFtrZXldID0gc291cmNlW2tleV07XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiB0YXJnZXQ7XG4gIH07XG59XG4iLCJpZiAoIVN0cmluZy5wcm90b3R5cGUuZW5kc1dpdGgpIHtcbiAgICBTdHJpbmcucHJvdG90eXBlLmVuZHNXaXRoID0gZnVuY3Rpb24gKGNoYXJzOiBzdHJpbmcpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc3Vic3RyKC1jaGFycy5sZW5ndGgpID09PSBjaGFycztcbiAgICB9O1xufVxuIiwiaWYgKCFTdHJpbmcucHJvdG90eXBlLmxlYWRpbmdDaGFycykge1xuICAgIFN0cmluZy5wcm90b3R5cGUubGVhZGluZ0NoYXJzID0gZnVuY3Rpb24gKGNoYXJzOiBzdHJpbmd8bnVtYmVyLCBsZW5ndGg6IG51bWJlcik6IHN0cmluZyAge1xuICAgICAgICBpZihsZW5ndGg+MCl7XG4gICAgICAgICAgICByZXR1cm4gKGNoYXJzLnRvU3RyaW5nKCkucmVwZWF0KGxlbmd0aCkgKyB0aGlzKS5zdWJzdHIoLWxlbmd0aCk7IC8vbnVtYmVyIGlzIHBvc2l0aXZlLCBzbyBjdXQgZnJvbSByaWdodCBha2EgbGVhZGluZ1xuICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgIHJldHVybiAodGhpcyArIGNoYXJzLnRvU3RyaW5nKCkucmVwZWF0KC1sZW5ndGgpKS5zdWJzdHIoMCwtbGVuZ3RoKTtcbiAgICAgICAgfVxuICAgIH07XG59XG4iLCJpZiAoIVN0cmluZy5wcm90b3R5cGUudG9DYW1lbENhc2UpIHtcbiAgICBTdHJpbmcucHJvdG90eXBlLnRvQ2FtZWxDYXNlID0gZnVuY3Rpb24oKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucmVwbGFjZSgvKD86Xlxcd3xbQS1aXXwtfFxcYlxcdykvZyxcbiAgICAgICAgKGx0cjphbnksIGlkeDphbnkpID0+IGlkeCA9PT0gMFxuICAgICAgICAgICAgICAgID8gbHRyLnRvTG93ZXJDYXNlKClcbiAgICAgICAgICAgICAgICA6IGx0ci50b1VwcGVyQ2FzZSgpXG4gICAgICAgICkucmVwbGFjZSgvXFxzK3wtL2csICcnKTtcbiAgICB9O1xufVxuIiwiLyohIG1hdGNoTWVkaWEoKSBwb2x5ZmlsbCAtIFRlc3QgYSBDU1MgbWVkaWEgdHlwZS9xdWVyeSBpbiBKUy5cbiAgICBBdXRob3JzICYgY29weXJpZ2h0IChjKSAyMDEyOiBTY290dCBKZWhsLCBQYXVsIElyaXNoLCBOaWNob2xhcyBaYWthcywgRGF2aWQgS25pZ2h0LiBEdWFsIE1JVC9CU0QgbGljZW5zZVxuICAgIHx8IGFsdGVyZWQgdG8gd29yayBmb3IgdHlwZXNjcml0cHQgYnkgSmVyZW15IEJhc3MgaW4gMjAxNiAqL1xuKDxhbnk+d2luZG93KS5tYXRjaE1lZGlhID0gd2luZG93Lm1hdGNoTWVkaWEgfHwgKCg8YW55PndpbmRvdykubWF0Y2hNZWRpYSA9IGZ1bmN0aW9uKCkge1xuICAgICd1c2Ugc3RyaWN0JztcblxuICAgIC8vIEZvciBicm93c2VycyB0aGF0IHN1cHBvcnQgbWF0Y2hNZWRpdW0gYXBpIHN1Y2ggYXMgSUUgOSBhbmQgd2Via2l0XG4gICAgbGV0IHN0eWxlTWVkaWEgPSAod2luZG93LnN0eWxlTWVkaWEgfHwgKDxhbnk+d2luZG93KS5tZWRpYSk7XG5cbiAgICAvLyBGb3IgdGhvc2UgdGhhdCBkb24ndCBzdXBwb3J0IG1hdGNoTWVkaXVtXG4gICAgaWYgKCFzdHlsZU1lZGlhKSB7XG4gICAgICAgIGxldCBzdHlsZTogYW55ICA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3N0eWxlJyksXG4gICAgICAgICAgICBzY3JpcHQ6IGFueSA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdzY3JpcHQnKVswXSxcbiAgICAgICAgICAgIGluZm86IGFueSAgID0gbnVsbDtcblxuICAgICAgICBzdHlsZS50eXBlICA9ICd0ZXh0L2Nzcyc7XG4gICAgICAgIHN0eWxlLmlkICAgID0gJ21hdGNobWVkaWFqcy10ZXN0JztcblxuICAgICAgICBzY3JpcHQucGFyZW50Tm9kZS5pbnNlcnRCZWZvcmUoc3R5bGUsIHNjcmlwdCk7XG5cbiAgICAgICAgLy8gJ3N0eWxlLmN1cnJlbnRTdHlsZScgaXMgdXNlZCBieSBJRSA8PSA4IGFuZCAnd2luZG93LmdldENvbXB1dGVkU3R5bGUnIGZvciBhbGwgb3RoZXIgYnJvd3NlcnNcbiAgICAgICAgaW5mbyA9ICgnZ2V0Q29tcHV0ZWRTdHlsZScgaW4gd2luZG93KSAmJiB3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZShzdHlsZSwgbnVsbCkgfHwgc3R5bGUuY3VycmVudFN0eWxlO1xuXG4gICAgICAgIHN0eWxlTWVkaWEgPSB7XG4gICAgICAgICAgICBtYXRjaE1lZGl1bTogZnVuY3Rpb24obWVkaWE6IGFueSkge1xuICAgICAgICAgICAgICAgIGxldCB0ZXh0ID0gJ0BtZWRpYSAnICsgbWVkaWEgKyAneyAjbWF0Y2htZWRpYWpzLXRlc3QgeyB3aWR0aDogMXB4OyB9IH0nO1xuXG4gICAgICAgICAgICAgICAgLy8gJ3N0eWxlLnN0eWxlU2hlZXQnIGlzIHVzZWQgYnkgSUUgPD0gOCBhbmQgJ3N0eWxlLnRleHRDb250ZW50JyBmb3IgYWxsIG90aGVyIGJyb3dzZXJzXG4gICAgICAgICAgICAgICAgaWYgKHN0eWxlLnN0eWxlU2hlZXQpIHtcbiAgICAgICAgICAgICAgICAgICAgc3R5bGUuc3R5bGVTaGVldC5jc3NUZXh0ID0gdGV4dDtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBzdHlsZS50ZXh0Q29udGVudCA9IHRleHQ7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgLy8gVGVzdCBpZiBtZWRpYSBxdWVyeSBpcyB0cnVlIG9yIGZhbHNlXG4gICAgICAgICAgICAgICAgcmV0dXJuIGluZm8ud2lkdGggPT09ICcxcHgnO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgIH1cblxuICAgIHJldHVybiBmdW5jdGlvbihtZWRpYTogYW55KSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBtYXRjaGVzOiBzdHlsZU1lZGlhLm1hdGNoTWVkaXVtKG1lZGlhIHx8ICdhbGwnKSxcbiAgICAgICAgICAgIG1lZGlhOiBtZWRpYSB8fCAnYWxsJ1xuICAgICAgICB9O1xuICAgIH07XG59KCkpO1xuIiwiZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJodG1sXCIpWzBdLnNldEF0dHJpYnV0ZSgnZGF0YS11c2VyYWdlbnQnLCBuYXZpZ2F0b3IudXNlckFnZW50KTtcbi8vIHRvIGhlbGwgd2l0aCB0aGluZ3MsIGxldCB0aGUgZGV2IGRlY2lkZSBpZiB0aGV5IHdhbnQgdG8gc2V0IGJyb3dzZXIgc3BlY2lmaWMgd2hhdCBoYXZlIHlvdS5cbi8vIGFpbSBpcyB0byBhc3N1bWUgYW55b25lIG1hc2tpbmcgdGhlaXIgYWdlbnQga25vdyB3aGF0IHRoZXkgYXJlXG4vLyBnZXR0aW5nIGluIGZvciBhbmQgaXMgc3RpbGwgYWNjb3VudGFibGUgZm9yIHRvby5cblxuXG4vLyBDb3BpZWQgd2l0aCBwZXJtaXNzaW9uIGZyb20gZmxleGVkXG4oPGFueT53aW5kb3cpLldTVSA9ICg8YW55PndpbmRvdykuV1NVIHx8IHt9O1xuXG4oZnVuY3Rpb24gKHc6IFdTVXN0YXRpYykge1xuICAgIC8qKlxuICAgICAqIENoZWNrIGlmIHRoZSBmaXJzdCBhcmd1bWVudCBpcyBub3QgdW5kZWZpbmVkIGZpcnN0IHRvIHNwZWVkIGNoZWNrXG4gICAgICogdGhlbiBzZXQgdG8gY2hlY2sgaWYgdHlwZSBkZWZpbmVkIGFzIHRoZSBzZWNvbmQgYXJndW1lbnQgcmVwZXJzZW50cy5cbiAgICAgKiBhIG11bHRpIHRvb2wgdG8gc3Ryb25nIHR5cGUgdGhpbmdzIGJ5IGNoZWNraW5nIHR5cGUgbW9zdCBjb21tb25cbiAgICAgKiB1c2UgaXMgYHcuZGVmaW5lZChvYmopYCBidXQgYHcuZGVmaW5lZChvYmosalF1ZXJ5KWAgaXMgc3VwZXIgaGFuZHkgdG9vXG4gICAgICpcbiAgICAgKiBAcGFyYW0geyp9IG5zXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IFt0eXBlXSBuYW1lZCB0eXBlIHRvIHJlc29sdmUgdG9cbiAgICAgKiBAcmV0dXJuc1xuICAgICAqL1xuICAgIHcuZGVmaW5lZCA9IGZ1bmN0aW9uKG5zOiBhbnksIHR5cGU/OiBzdHJpbmcpIHtcbiAgICAgICAgaWYgKCd1bmRlZmluZWQnID09PSB0eXBlb2YgbnMpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoICd1bmRlZmluZWQnICE9PSB0eXBlb2YgdHlwZSApIHtcbiAgICAgICAgICAgIGlmICgnYXJyYXknID09PSB0eXBlKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHR5cGVvZiBucyA9PT0gJ29iamVjdCcgJiZcbiAgICAgICAgICAgICAgICAgICAgT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKG5zKSA9PT0gJ1tvYmplY3QgQXJyYXldJztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICgnc3RyaW5nJyA9PT0gdHlwZSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwobnMpID09PSAnW29iamVjdCBTdHJpbmddJztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICgnbnVtYmVyJyA9PT0gdHlwZSkge1xuICAgICAgICAgICAgICAgIHJldHVybiAhdy5kZWZpbmVkKG5zLCAnYXJyYXknKSAmJiAobnMgLSBwYXJzZUZsb2F0KCBucyApICsgMSkgPj0gMDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICggJ29iamVjdCcgPT09IHR5cGUgKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChucykgPT09ICdbb2JqZWN0IE9iamVjdF0nO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKCAnbnVsbCcgPT09IHR5cGUgKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChucykgPT09ICdbb2JqZWN0IE51bGxdJztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICggJ3VuZGVmaW5lZCcgIT09IHR5cGVvZiBucyAmJiB0eXBlb2YgbnMgIT09IHR5cGUgJiYgdHlwZW9mIG5zID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgdHlwZSA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gbnMgaW5zdGFuY2VvZiB0eXBlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuICd1bmRlZmluZWQnICE9PSB0eXBlb2YgbnMgJiYgdHlwZW9mIG5zID09PSB0eXBlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBTdGlsbCB1cCBmb3IgY29uc2lkZXJhdGlvbi4gIG5vdCBpbiBjdXJyZW50IGZvcm0gYnV0IGFzIHNob3J0Y3V0P1xuICAgICAqXG4gICAgICogQHBhcmFtIHsqfSBuc1xuICAgICAqIEBwYXJhbSB7Kn0gW3ZhbF1cbiAgICAgKiBAcGFyYW0geyp9IFtuc19yb290XVxuICAgICAqIEByZXR1cm5zXG4gICAgICovXG4gICAgdy5kZWZpbmUgPSBmdW5jdGlvbihuczogYW55LCB2YWw/OiBhbnksIG5zX3Jvb3Q/OiBhbnkpIHtcbiAgICAgICAgbGV0IHBhcmVudCA9IG5zO1xuICAgICAgICBpZiAoIXcuZGVmaW5lZChucywgJ29iamVjdCcpKSB7XG4gICAgICAgICAgICBwYXJlbnQgPSB3LnByaW1lKG5zLCBuc19yb290KTtcbiAgICAgICAgfVxuICAgICAgICB0cnkgeyAvLyB0ZXN0aW5nIGNhc3VlIGlmIGl0IGRvZXMgZmFpbCB3ZWxsIGl0IGRpZCBhbmQgdGhhdCBjb3VsZCBiZSB1c2VmdWxcbiAgICAgICAgICAgIHBhcmVudCA9IHZhbDsgLy8gd29ycmllZCB0aGlzIHdpbGwgbm90IHVwZGF0ZSBwYXJlbnQgbnMgMTAwXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICAgdy5fZChlKTtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBTZXQgdXAgY29udGFpbmluZyBvYmplY3QgYW5kIG1lcmdlIGFsbCBpdGVtcyBmcm9tIG1lcmdlIGxpc3QuXG4gICAgICpcbiAgICAgKiBAcGFyYW0geyp9IG9ialxuICAgICAqIEByZXR1cm5zIGNvbmNhdGVuYXRlZCBvYmplY3Q7XG4gICAgICovXG4gICAgdy5tZXJnZSA9IGZ1bmN0aW9uKG9iajogYW55KSB7XG4gICAgICAgIGxldCBvdXQ6IGFueSA9IHt9O1xuICAgICAgICBpZighdy5kZWZpbmVkKG9iaiwnb2JqZWN0Jykpe1xuICAgICAgICAgICAgcmV0dXJuIG91dDtcbiAgICAgICAgfVxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG9iai5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgZm9yIChsZXQgcCBvZiBPYmplY3Qua2V5cyhvYmpbaV0pICkgeyAvLyBsZXQgcCBpbiBvYmpbaV0pIHtcbiAgICAgICAgICAgICAgICBvdXRbcF0gPSBvYmpbaV1bcF07XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG91dDtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogYWxtb3N0IHRoZSBzYW1lIGFzIHcucHJpbWUgYnV0IGp1c3QgbWFzaGVzIHRoZSBjb2xsaXNpb24gb2YgbnMgd2hlcmVcbiAgICAgKiB3LnByaW1lIGlzIGlzIHRoZSBkZWNpZGVyXG4gICAgICpcbiAgICAgKiBAcGFyYW0gey4uLmFueVtdfSBwXG4gICAgICogQHJldHVybnNcbiAgICAgKi9cbiAgICB3LmV4dGVuZCA9IGZ1bmN0aW9uKC4uLnA6IGFueVtdKSB7XG4gICAgICAgIGxldCBvcHRpb25zLCBuYW1lLCBzcmMsIGNvcHksIGNsb25lLFxuICAgICAgICAgICAgdGFyZ2V0ID0gYXJndW1lbnRzWzBdIHx8IHt9LFxuICAgICAgICAgICAgaSA9IDEsXG4gICAgICAgICAgICBsZW5ndGggPSBhcmd1bWVudHMubGVuZ3RoLFxuICAgICAgICAgICAgZGVlcCA9IGZhbHNlO1xuXG4gICAgICAgIC8vIEhhbmRsZSBhIGRlZXAgY29weSBzaXR1YXRpb25cbiAgICAgICAgaWYgKCB0eXBlb2YgdGFyZ2V0ID09PSAnYm9vbGVhbicgKSB7XG4gICAgICAgICAgICBkZWVwID0gdGFyZ2V0O1xuICAgICAgICAgICAgLy8gU2tpcCB0aGUgYm9vbGVhbiBhbmQgdGhlIHRhcmdldFxuICAgICAgICAgICAgdGFyZ2V0ID0gYXJndW1lbnRzWyBpIF0gfHwge307XG4gICAgICAgICAgICBpKys7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBIYW5kbGUgY2FzZSB3aGVuIHRhcmdldCBpcyBhIHN0cmluZyBvciBzb21ldGhpbmcgKHBvc3NpYmxlIGluIGRlZXAgY29weSlcbiAgICAgICAgaWYgKCAhdy5kZWZpbmVkKHRhcmdldCwgJ29iamVjdCcpICYmICF3LmRlZmluZWQodGFyZ2V0LCAnZnVuY3Rpb24nKSApIHtcbiAgICAgICAgICAgIHRhcmdldCA9IHt9O1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gRXh0ZW5kIGZsZXhlZCBpdHNlbGYgaWYgb25seSBvbmUgYXJndW1lbnQgaXMgcGFzc2VkXG4gICAgICAgIGlmICggaSA9PT0gbGVuZ3RoICkge1xuICAgICAgICAgICAgdGFyZ2V0ID0gdGhpcztcbiAgICAgICAgICAgIGktLTtcbiAgICAgICAgfVxuXG4gICAgICAgIGZvciAoIDsgaSA8IGxlbmd0aDsgaSsrICkge1xuICAgICAgICAgICAgLy8gT25seSBkZWFsIHdpdGggbm9uLW51bGwvdW5kZWZpbmVkIHZhbHVlc1xuICAgICAgICAgICAgaWYgKCAob3B0aW9ucyA9IGFyZ3VtZW50c1sgaSBdKSAhPSBudWxsICkge1xuICAgICAgICAgICAgICAgIC8vIEV4dGVuZCB0aGUgYmFzZSBvYmplY3RcbiAgICAgICAgICAgICAgICBmb3IgKCBuYW1lIGluIG9wdGlvbnMgKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICggIW9wdGlvbnMuaGFzT3duUHJvcGVydHkobmFtZSkgKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBzcmMgPSB0YXJnZXRbIG5hbWUgXTtcbiAgICAgICAgICAgICAgICAgICAgY29weSA9IG9wdGlvbnNbIG5hbWUgXTtcblxuICAgICAgICAgICAgICAgICAgICAvLyBQcmV2ZW50IG5ldmVyLWVuZGluZyBsb29wXG4gICAgICAgICAgICAgICAgICAgIGlmICggdGFyZ2V0ID09PSBjb3B5ICkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAvLyBSZWN1cnNlIGlmIHdlJ3JlIG1lcmdpbmcgcGxhaW4gb2JqZWN0cyBvciBhcnJheXNcbiAgICAgICAgICAgICAgICAgICAgaWYgKCBkZWVwICYmIGNvcHkgJiYgdy5kZWZpbmVkKGNvcHksICdvYmplY3QnKSApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICggdy5kZWZpbmVkKGNvcHksICdhcnJheScpICkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsb25lID0gc3JjICYmIHcuZGVmaW5lZChzcmMsICdhcnJheScpID8gc3JjIDogW107XG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsb25lID0gc3JjICYmIHcuZGVmaW5lZChzcmMsICdvYmplY3QnKSA/IHNyYyA6IHt9O1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gTmV2ZXIgbW92ZSBvcmlnaW5hbCBvYmplY3RzLCBjbG9uZSB0aGVtXG4gICAgICAgICAgICAgICAgICAgICAgICB0YXJnZXRbIG5hbWUgXSA9IHcuZXh0ZW5kKCBkZWVwLCBjbG9uZSwgY29weSApO1xuICAgICAgICAgICAgICAgICAgICAvLyBEb24ndCBicmluZyBpbiB1bmRlZmluZWQgdmFsdWVzXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoIGNvcHkgIT09IHVuZGVmaW5lZCApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRhcmdldFsgbmFtZSBdID0gY29weTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICAvLyBSZXR1cm4gdGhlIG1vZGlmaWVkIG9iamVjdFxuICAgICAgICByZXR1cm4gdGFyZ2V0O1xuICAgIH07XG5cblxuICAgIC8qKlxuICAgICAqIEJyZWFrIHVwIGlucHV0IGludG8gYW4gYXJyYXkgaW4gb3JkZXIgb2YgZGVmaW5lZCBuYW1lc3BhY2VcbiAgICAgKiByZWN1cnNlIHdoZW4gbm90IGEgc3RyaW5nLlxuICAgICAqXG4gICAgICogQHBhcmFtIHsqfSBfbnNcbiAgICAgKiBAcmV0dXJucyB7Kn0gaWYgYSBzdHJpbmcgaW5wdXQgc3BsaXQgdG8gYXJyYXkgb24gZG90XG4gICAgICogQGZpbmFsIHthcnJheVtzdHJpbmddfVxuICAgICAqL1xuICAgIHcucGFyc2VfbnMgPSBmdW5jdGlvbiAoX25zOiBhbnkpOiBhbnkgeyAvLyBzaG91bGQgYmUgYWJsZSB0byByZWZhY3RvciB0aGlzIGJpdFxuICAgICAgICBsZXQgb3V0OiBhbnkgPSBbXTtcbiAgICAgICAgaWYgKCAhdy5kZWZpbmVkKF9ucywgJ29iamVjdCcpICkgeyAvLyBlZyBzdHJpbmcgb3IgbnVtYmVyIC8vd2FzICdvYmplY3QnICE9PSB0eXBlb2YgX25zXG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIG91dCA9IF9ucy50b1N0cmluZygpLnNwbGl0KCcuJyk7XG4gICAgICAgICAgICB9IGNhdGNoIChlKSB7IC8vIHNvIGF0IHRoaXMgcG9pbnQgaXQgd2FzIG5vdCBhbiBvYmplY3QsIG51bWJlciBvciBzdHJpbmcuLi4gd2hhdCBpcyBpdD9cbiAgICAgICAgICAgICAgICB3Ll9pKGUsIF9ucyk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgX25zLmZvckVhY2goZnVuY3Rpb24gKG9iajogYW55KSB7XG4gICAgICAgICAgICAgICAgb3V0ID0gb3V0LmNvbmNhdCh3LnBhcnNlX25zKG9iaikpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG91dDtcbiAgICB9O1xuXG4gICAgIC8qKlxuICAgICAqIFRha2UgbmFtZXNwYWNlIG9iamVjdCwgcGFyc2UgaXQsIGNoZWNrIGZvciByb290IG9iamVjdCBwYXNzZWQgYXNcbiAgICAgKiBzZWNvbmQgYXJndW1lbnQsIHRoZW4gc3RhcnQgdGhlcmUuICBBcHBseSBvcHRpb25zIG9mIHNldHRpbmcgYSB2YWx1ZVxuICAgICAqIGlmIHNldCBhcyBvdmVycmlkZSBvciBtZXJnZSBpZiBucyBjb2xsaXNpb24gb2NjdXJzXG4gICAgICpcbiAgICAgKiBAcGFyYW0geyp9IG5zXG4gICAgICogQHBhcmFtIHsqfSBbbnNfcm9vdF1cbiAgICAgKiBAcGFyYW0geyp9IFtvcHRpb25zXVxuICAgICAqIEByZXR1cm5zXG4gICAgICovXG4gICAgdy5nZXRfbnMgPSBmdW5jdGlvbiAobnM6IGFueSkge1xuICAgICAgICBsZXQgcGFyZW50ID0gd2luZG93LCAvLyBhbGFpcyB0byB3b3JrIHdpdGhcbiAgICAgICAgICAgIHBsOiBudW1iZXIsXG4gICAgICAgICAgICBpOiBudW1iZXIsXG4gICAgICAgICAgICBvdXQ6IGFueSA9IG51bGw7XG5cbiAgICAgICAgbGV0IHBhcnRzOiBhbnkgPSB3LnBhcnNlX25zKG5zKTtcbiAgICAgICAgcGwgPSBwYXJ0cy5sZW5ndGg7XG4gICAgICAgIGZvciAoaSA9IDA7IGkgPCBwbDsgaSsrKSB7XG4gICAgICAgICAgICAvLyBjcmVhdGUgYSBwcm9wZXJ0eSBpZiBpdCBkb2VzbnQgZXhpc3RcbiAgICAgICAgICAgIGlmICggdy5kZWZpbmVkKCBwYXJlbnRbcGFydHNbaV1dICkgfHwgKChpID09PSBwbCAtIDEpKSApIHtcbiAgICAgICAgICAgICAgICBsZXQgdmFsdWUgPSBwYXJlbnRbcGFydHNbaV1dIHx8IHt9O1xuICAgICAgICAgICAgICAgIG91dCA9IHZhbHVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcGFyZW50ID0gcGFyZW50W3BhcnRzW2ldXTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gb3V0O1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBTdGlsbCB1cCBmb3IgY29uc2lkZXJhdGlvbi5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBuc19wYXRoIGxvYWQgbnMgYnkgZmlsZVxuICAgICAqIEBwYXJhbSB7Kn0gW2NhbGxiYWNrXSBkbyBzb21ldGhpbmcgYWZ0ZXJcbiAgICAgKi9cbiAgICB3LmluY2x1ZGVkID0gW107IC8vIHRyYWNrZXJcbiAgICB3LmluY2x1ZGUgPSBmdW5jdGlvbiAobnNfcGF0aDogc3RyaW5nLCBjYWxsYmFjaz86IGFueSl7XG4gICAgICAgIGlmICh3LmRlZmluZWQobnNfcGF0aCxcInN0cmluZ1wiKSAmJiAhdy5kZWZpbmVkKHcuaW5jbHVkZWRbbnNfcGF0aF0pKSB7IC8vIGlmIGl0IGlzIGxvYWRlZCBkb24ndCB3b3JyeVxuICAgICAgICAgICAgbGV0IHNycHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzY3JpcHQnKTtcbiAgICAgICAgICAgIGlmICggdy5kZWZpbmVkKGNhbGxiYWNrLCAnZnVuY3Rpb24nKSApIHtcbiAgICAgICAgICAgICAgICBzcnB0LmFkZEV2ZW50TGlzdGVuZXIoJ2xvYWQnLCBjYWxsYmFjayk7IC8vIHBhc3MgbXkgaG9pc3RlZCBmdW5jdGlvblxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgc3JwdC5zcmMgPSBuc19wYXRoICsgJy5qcyc7XG4gICAgICAgICAgICB3LmluY2x1ZGVkLnB1c2gobnNfcGF0aCk7XG4gICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdoZWFkJykuYXBwZW5kQ2hpbGQoc3JwdCk7XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogU2V0IGRlYnVnIHRvIGNvbnNvbGUuICB0aGluayBmaWVsZCBkZXRlY3RvciB3aGVuIGxlYXZpbmcgaW4gcHJvZHVjdGlvbi5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7Kn0gb3V0cHV0XG4gICAgICogQHJldHVybnMge2Jvb2xlYW59IHN0YXRlIG9mIGNvbXBsZXRpb25cbiAgICAgKi9cbiAgICB3Ll9kID0gZnVuY3Rpb24ob3V0cHV0OiBhbnkpIHtcbiAgICAgICAgLy8gcmV0dXJuIGZvciBjb25zaXN0ZW5jeVxuICAgICAgICAgdy5kZWZpbmVkKFdTVS5zdGF0ZS5kZWJ1ZykgJiYgV1NVLnN0YXRlLmRlYnVnICYmICg8YW55PndpbmRvdykuY29uc29sZS5kZWJ1ZyhvdXRwdXQpOyAvLyB0c2xpbnQ6ZGlzYWJsZS1saW5lXG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIFNldCBsb2cgdG8gY29uc29sZS4gIHRoaW5rIGZpZWxkIGRldGVjdG9yIHdoZW4gbGVhdmluZyBpbiBwcm9kdWN0aW9uLlxuICAgICAqXG4gICAgICogQHBhcmFtIHsqfSBhXG4gICAgICogQHBhcmFtIHsqfSBiXG4gICAgICogQHJldHVybnMgIHtib29sZWFufSBzdGF0ZSBvZiBjb21wbGV0aW9uXG4gICAgICovXG4gICAgdy5faSA9IGZ1bmN0aW9uKGE6IGFueSwgYjogYW55KSB7XG4gICAgICAgIC8vIHJldHVybiBmb3IgY29uc2lzdGVuY3lcbiAgICAgICAgIHcuZGVmaW5lZChXU1Uuc3RhdGUuZGVidWcpICYmIFdTVS5zdGF0ZS5kZWJ1ZyAmJiAoPGFueT53aW5kb3cpLmNvbnNvbGUuaW5mbyhhLCBiKTsgLy8gdHNsaW50OmRpc2FibGUtbGluZVxuICAgIH07XG5cblxuICAgIC8qKlxuICAgICAqIFRha2UgbmFtZXNwYWNlIG9iamVjdCwgcGFyc2UgaXQsIGNoZWNrIGZvciByb290IG9iamVjdCBwYXNzZWQgYXNcbiAgICAgKiBzZWNvbmQgYXJndW1lbnQsIHRoZW4gc3RhcnQgdGhlcmUuICBBcHBseSBvcHRpb25zIG9mIHNldHRpbmcgYSB2YWx1ZVxuICAgICAqIGlmIHNldCBhcyBvdmVycmlkZSBvciBtZXJnZSBpZiBucyBjb2xsaXNpb24gb2NjdXJzXG4gICAgICpcbiAgICAgKiBAcGFyYW0geyp9IG5zXG4gICAgICogQHBhcmFtIHsqfSBbbnNfcm9vdF1cbiAgICAgKiBAcGFyYW0geyp9IFtvcHRpb25zXVxuICAgICAqIEByZXR1cm5zXG4gICAgICovXG4gICAgdy5wcmltZSA9IGZ1bmN0aW9uIChuczogYW55LCBuc19yb290PzogYW55LCBvcHRpb25zPzogYW55KSB7XG4gICAgICAgIG5zX3Jvb3QgPSBuc19yb290IHx8IHdpbmRvdzsgLy8gc2V0IHVwIHRoZSByb290IG9iamVjdFxuICAgICAgICAvLyBtYWtlIGlzIGRvIG9uZSBjYW4ganVzdCBwdXQgaW4gYSB2YWx1ZSBhbmQgdGFrZSB0aGUgZGVmYXVsdHNcbiAgICAgICAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge3ZhbHVlOiBuZXcgT2JqZWN0fTtcbiAgICAgICAgb3B0aW9ucyA9ICF3LmRlZmluZWQob3B0aW9ucy52YWx1ZSkgfHwgIXcuZGVmaW5lZChvcHRpb25zLCAnb2JqZWN0JykgPyB7dmFsdWUgOiBvcHRpb25zfSA6IG9wdGlvbnM7XG4gICAgICAgIC8vIGh1bGsgc21hc2g/XG4gICAgICAgIG9wdGlvbnMgPSBPYmplY3QuYXNzaWduKHtvdmVycmlkZTogZmFsc2UsIG1lcmdlOiB0cnVlLCBkZWVwOiB0cnVlfSwgb3B0aW9ucyk7IC8vIHNwZWVkIGl0IGluIHdlIHRydXN0IGl0XG5cbiAgICAgICAgbGV0IHBhcmVudCA9IG5zX3Jvb3QsIC8vIGFsaWFzIHRvIHdvcmsgd2l0aFxuICAgICAgICAgICAgcGw6IG51bWJlcixcbiAgICAgICAgICAgIGk6IG51bWJlcjtcblxuICAgICAgICBsZXQgcGFydHM6IGFueSA9IHcucGFyc2VfbnMobnMpO1xuICAgICAgICBwbCA9IHBhcnRzLmxlbmd0aDtcbiAgICAgICAgZm9yIChpID0gMDsgaSA8IHBsOyBpKyspIHtcbiAgICAgICAgICAgIC8vIGNyZWF0ZSBhIHByb3BlcnR5IGlmIGl0IGRvZXNuJ3QgZXhpc3RcbiAgICAgICAgICAgIGlmICggIXcuZGVmaW5lZCggcGFyZW50W3BhcnRzW2ldXSApIHx8ICgoaSA9PT0gcGwgLSAxKSkgKSB7XG4gICAgICAgICAgICAgICAgbGV0IHZhbHVlID0gdy5kZWZpbmVkKHBhcmVudFtwYXJ0c1tpXV0pID8gcGFyZW50W3BhcnRzW2ldXSA6IHt9O1xuICAgICAgICAgICAgICAgIGlmICggKGkgPT09IHBsIC0gMSkgJiYgdy5kZWZpbmVkKG9wdGlvbnMudmFsdWUpKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICggdy5kZWZpbmVkKHZhbHVlKSAmJiB3LmRlZmluZWQoIG9wdGlvbnMubWVyZ2UgKSAmJiB0cnVlID09PSBvcHRpb25zLm1lcmdlICkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCB3LmRlZmluZWQob3B0aW9ucy52YWx1ZSwgJ3N0cmluZycpIHx8IHcuZGVmaW5lZChvcHRpb25zLnZhbHVlLCAnbnVtYmVyJykgKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gcmVhbGx5PyAgbG9sIHdoeSB3b3VsZCB5b3U/ICBidXQgcmVnYXJkbGVzcyBkb24ndCBidWlsZCB3YWxscyBzbyBsZWF2ZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlID0gdmFsdWUgKyBvcHRpb25zLnZhbHVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmICggdy5kZWZpbmVkKG9wdGlvbnMudmFsdWUsICdib29sZWFuJykgKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWUgPSBvcHRpb25zLnZhbHVlID09PSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZSA9IHcuZXh0ZW5kKG9wdGlvbnMuZGVlcCwgdmFsdWUsIG9wdGlvbnMudmFsdWUpOyAvLyBPYmplY3QuYXNzaWduKHZhbHVlLCBvcHRpb25zLnZhbHVlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmICggdHJ1ZSA9PT0gb3B0aW9ucy5vdmVycmlkZSApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlID0gb3B0aW9ucy52YWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBwYXJlbnRbcGFydHNbaV1dID0gdmFsdWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBwYXJlbnQgPSBwYXJlbnRbcGFydHNbaV1dO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBwYXJlbnQ7XG4gICAgfTtcblxuICAgIHcucmVuZGVyID0gZnVuY3Rpb24gKGh0bWw6YW55LCBvcHRpb25zOmFueSkge1xuICAgICAgICAvLyBAdG9kbyBhZGQgYmV0dGVyIGVycm9yIGhhbmRsaW5nIGZvciBlbXB0eXMgYXQgdGhlIGxlYXN0XG4gICAgICAgIHZhciByZSwgYWRkOmFueSwgbWF0Y2gsIGN1cnNvciwgY29kZTphbnksIHJlRXhwOmFueSwgcmVzdWx0O1xuXG4gICAgICAgIHJlID0gLzwlKC4rPyklPi9nO1xuICAgICAgICByZUV4cCA9IC8oXiggKT8odmFyfGlmfGZvcnxlbHNlfHN3aXRjaHxjYXNlfGJyZWFrfHt8fXw7KSkoLiopPy9nO1xuICAgICAgICBjb2RlID0gXCJ2YXIgcj1bXTtcXG5cIjtcbiAgICAgICAgY3Vyc29yID0gMDtcblxuICAgICAgICBhZGQgPSBmdW5jdGlvbiAobGluZTphbnksIGpzOmFueSkge1xuICAgICAgICAgICAgaWYgKGpzKSB7XG4gICAgICAgICAgICAgICAgY29kZSArPSBsaW5lLm1hdGNoKHJlRXhwKSA/IGxpbmUgKyBcIlxcblwiIDogXCJyLnB1c2goXCIgKyBsaW5lICsgXCIpO1xcblwiO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBjb2RlICs9IGxpbmUgIT09IFwiXCIgPyBcInIucHVzaCgnXCIgKyBsaW5lLnJlcGxhY2UoLycvZywgXCJcXFwiXCIpICsgXCInKTtcXG5cIiA6IFwiXCI7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gYWRkO1xuICAgICAgICB9O1xuXG4gICAgICAgIHdoaWxlICgobWF0Y2ggPSByZS5leGVjKGh0bWwpKSkge1xuICAgICAgICAgICAgYWRkKGh0bWwuc2xpY2UoY3Vyc29yLCBtYXRjaC5pbmRleCkpKG1hdGNoWzFdLCB0cnVlKTtcbiAgICAgICAgICAgIGN1cnNvciA9IG1hdGNoLmluZGV4ICsgbWF0Y2hbMF0ubGVuZ3RoO1xuICAgICAgICB9XG4gICAgICAgIGlmKFdTVS5kZWZpbmVkKGh0bWwsJ3N0cmluZycpKXtcbiAgICAgICAgICAgIGFkZChodG1sLnN1YnN0cihjdXJzb3IsIGh0bWwubGVuZ3RoIC0gY3Vyc29yKSk7XG4gICAgICAgICAgICBjb2RlID0gKGNvZGUgKyBcInJldHVybiByLmpvaW4oJycpO1wiKS5yZXBsYWNlKC9bXFxyXFx0XFxuXS9nLCBcIlwiKTtcbiAgICAgICAgICAgIHJlc3VsdCA9IG5ldyBGdW5jdGlvbihjb2RlKS5hcHBseShvcHRpb25zKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH07XG5cblxuXG4gICAgbGV0IGZ1bm5pZXMgPSBbXG4gICAgICAgIHsgdTogJ0EgbG90IGFib3V0IGxpdmluZzsnLCBsOiAnQSBsaXR0bGUgYWJvdXQgbG92ZS4uLicgfVxuICAgICAgICAsIHsgdTogJ0dvaW5nIGZvciBkaXN0YW5jZS4uLicsIGw6ICdnb2luZyBmb3Igc3BlZWQhIScgfVxuICAgICAgICAsIHsgdTogJ0lcXCd2ZSBnb3QgZnJpZW5kcycsIGw6ICdpbiBjb2RlIHBsYWNlcy4uLicgfVxuICAgICAgICAsIHsgdTogJ01hbWEuLi4nLCBsOiAnSSBqdXN0IGtpbGxlZCBhIGJ1ZycgfSBdO1xuICAgICAgICBsZXQgZnVubnkgPSBmdW5uaWVzW01hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIGZ1bm5pZXMubGVuZ3RoKV07XG5cbiAgICAgICAgY29uc29sZS5sb2coICclYyAgICAgIF9fXyAgICAgICAgICAgX19fICAgICAgICAgICBfX19cXG4nXG4gICAgICAgICsgJyAgICAgL1xcXFwgIFxcXFwgICAgICAgICAvXFxcXF9fXFxcXCAgICAgICAgIC9cXFxcICBcXFxcXFxuJ1xuICAgICAgICArICcgICAgX1xcXFw6XFxcXCAgXFxcXCAgICAgICAvOi8gXy9fICAgICAgICBcXFxcOlxcXFwgIFxcXFwgICAgICAgICcgKyBmdW5ueS51ICsgJ1xcbidcbiAgICAgICAgKyAnICAgL1xcXFwgXFxcXDpcXFxcICBcXFxcICAgICAvOi8gL1xcXFwgIFxcXFwgICAgICAgIFxcXFw6XFxcXCAgXFxcXCAgICAgICAnICsgZnVubnkubCArICdcXG4nXG4gICAgICAgICsgJyAgX1xcXFw6XFxcXCBcXFxcOlxcXFwgIFxcXFwgICAvOi8gLzo6XFxcXCAgXFxcXCAgIF9fXyAgXFxcXDpcXFxcICBcXFxcXFxuJ1xuICAgICAgICArICcgL1xcXFwgXFxcXDpcXFxcIFxcXFw6XFxcXF9fXFxcXCAvOi9fLzovXFxcXDpcXFxcX19cXFxcIC9cXFxcICBcXFxcICBcXFxcOlxcXFxfX1xcXFxcXG4nXG4gICAgICAgICsgJyBcXFxcOlxcXFwgXFxcXDpcXFxcLzovICAvIFxcXFw6XFxcXC86LyAvOi8gIC8gXFxcXDpcXFxcICBcXFxcIC86LyAgLyAgICBfX19fX19fX18gICAgX19fX19fX19fXFxuJ1xuICAgICAgICArICcgIFxcXFw6XFxcXCBcXFxcOjovICAvICAgXFxcXDo6LyAvOi8gIC8gICBcXFxcOlxcXFwgIC86LyAgLyAgICAvIF9fX18vICAgXFx8ICAvICBfLyBfX18vXFxuJ1xuICAgICAgICArICcgICBcXFxcOlxcXFwvOi8gIC8gICAgIFxcXFwvXy86LyAgLyAgICAgXFxcXDpcXFxcLzovICAvICAgIC8gL18gIC8gL3wgfCAgLyAvIFxcXFxfXyBcXFxcXFxuJ1xuICAgICAgICArICcgICAgXFxcXDo6LyAgLyAgICAgICAgLzovICAvICAgICAgIFxcXFw6Oi8gIC8gICAgLyBfXy8gLyBfX18gfF8vIC8gX19fLyAvXFxuJ1xuICAgICAgICArICcgICAgIFxcXFwvX18vICAgICAgICAgXFxcXC9fXy8gICAgICAgICBcXFxcL19fLyAgICAvXy8gICAvXy8gIHxfL19fXy8vX19fXy9cXG4nXG4gICAgICAgICwgICdmb250LWZhbWlseTptb25vc3BhY2UnKTtcblxuXG5cbiAgICB3LnByaW1lKCdzdGF0ZScsICAgdywgICAgICAgeyB2YWx1ZToge30sICAgICAgICAgICAgb3ZlcnJpZGU6IGZhbHNlIH0pOyAvLyBob25lc3RseSB0aGlzIHNob3VsZG4ndCBiZSB0aGlzIHdheSwgc2hvdWxkIGJlIHNtYXJ0ZXJcbiAgICB3LnByaW1lKCdkZWJ1ZycsICAgdy5zdGF0ZSwgeyB2YWx1ZTogZmFsc2UsICAgICAgICAgb3ZlcnJpZGU6IGZhbHNlLCBtZXJnZTogZmFsc2UgfSk7XG4gICAgdy5wcmltZSgnZW52JywgICAgIHcuc3RhdGUsIHsgdmFsdWU6ICdkZXZlbG9wbWVudCcsIG92ZXJyaWRlOiBmYWxzZSwgbWVyZ2U6IGZhbHNlIH0pO1xuICAgIHcucHJpbWUoJ2NvbnNvbGUnLCB3LnN0YXRlLCB7IHZhbHVlOiB0cnVlLCAgICAgICAgICBvdmVycmlkZTogZmFsc2UsIG1lcmdlOiBmYWxzZSB9KTtcbiAgICBjb25zb2xlLmxvZygnYzonICsgdy5zdGF0ZS5jb25zb2xlLnRvU3RyaW5nKCkgKyAnOmQ6JyAgKyB3LnN0YXRlLmRlYnVnLnRvU3RyaW5nKCkgKyAnOmU6JyArIHcuc3RhdGUuZW52LnRvU3RyaW5nKCkudG9Mb3dlckNhc2UoKSApO1xuICAgIGlmICggKCAhdy5zdGF0ZS5kZWJ1ZyAmJiB3LnN0YXRlLmVudi50b1N0cmluZygpLnRvTG93ZXJDYXNlKCkgIT09ICdkZXZlbG9wbWVudCcgKVxuICAgICAgICAgfHwgIXcuc3RhdGUuY29uc29sZSApIHtcbiAgICAgICAgdy5jb25zb2xlID0gY29uc29sZTtcbiAgICAgICAgY29uc29sZS5sb2coJy0tIFR1cm5pbmcgY29uc29sZSAoZ2VuZXJhbCBzdGRfb3V0KSBPRkYnKTtcbiAgICAgICAgY29uc29sZS5sb2cgPSBjb25zb2xlLmRlYnVnID0gY29uc29sZS5pbmZvID0gY29uc29sZS53YXJuID0gZnVuY3Rpb24oICkge307XG4gICAgfVxuXG59KFdTVSkpO1xuXG5cblxuLypcbiogalF1ZXJ5IGhlbHBlcnMuICBNYXkgbW92ZSBhd2F5IGZyb20gaGVyZSwgYnV0IG11c3QgcHJveHkgYW55dGhpbmdcbiovXG4oZnVuY3Rpb24oJCxqUXVlcnkpeyAvLyB0aGlzIHdpbGwgZGVwZW5kIG9uIGpRdWVyeVxuICAgIGpRdWVyeS5leHByW1wiOlwiXS5yZWdleCA9IGZ1bmN0aW9uIChlbGVtOmFueSwgaW5kZXg6YW55LCBtYXRjaDphbnkpIHtcbiAgICAgICAgdmFyIG1hdGNoUGFyYW1zID0gbWF0Y2hbM10uc3BsaXQoXCIsXCIpLFxuICAgICAgICAgICAgdmFsaWRMYWJlbHMgPSAvXihkYXRhfGNzcyk6LyxcbiAgICAgICAgICAgIGF0dHIgPSB7XG4gICAgICAgICAgICAgICAgbWV0aG9kOiBtYXRjaFBhcmFtc1swXS5tYXRjaCh2YWxpZExhYmVscykgP1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1hdGNoUGFyYW1zWzBdLnNwbGl0KFwiOlwiKVswXSA6IFwiYXR0clwiLFxuICAgICAgICAgICAgICAgIHByb3BlcnR5OiBtYXRjaFBhcmFtcy5zaGlmdCgpLnJlcGxhY2UodmFsaWRMYWJlbHMsIFwiXCIpXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgcmVnZXhGbGFncyA9IFwiaWdcIixcbiAgICAgICAgICAgIHJlZ2V4ID0gbmV3IFJlZ0V4cChtYXRjaFBhcmFtcy5qb2luKFwiXCIpLnJlcGxhY2UoL15cXHMrfFxccyskL2csIFwiXCIpLCByZWdleEZsYWdzKTtcbiAgICAgICAgcmV0dXJuIHJlZ2V4LnRlc3QoalF1ZXJ5KGVsZW0pW2F0dHIubWV0aG9kXShhdHRyLnByb3BlcnR5KSk7XG4gICAgfTtcbiAgICAkLmZuLm92ZXJmbG93biA9IGZ1bmN0aW9uICgpIHsgbGV0IGUgPSB0aGlzWzBdOyByZXR1cm4gZS5zY3JvbGxIZWlnaHQgPiBlLmNsaWVudEhlaWdodCB8fCBlLnNjcm9sbFdpZHRoID4gZS5jbGllbnRXaWR0aDsgfTtcbiAgICAvL3RhcmdldGVkLnVuaXF1ZUlkKCk7IHwgcmVtb3ZlVW5pcXVlSWQoKSAvLyBqUXVlcnkgZXh0XG4gICAgKGZ1bmN0aW9uIChmYWN0b3J5KSB7XG4gICAgICAgIGlmICggV1NVLmRlZmluZWQoICg8YW55PiB3aW5kb3cpLmRlZmluZSwgXCJmdW5jdGlvblwiKSAmJiAoPGFueT4gd2luZG93KS5kZWZpbmUuYW1kKSB7XG4gICAgICAgICAgICAvLyBBTUQuIFJlZ2lzdGVyIGFzIGFuIGFub255bW91cyBtb2R1bGUuXG4gICAgICAgICAgICAoPGFueT4gd2luZG93KS5kZWZpbmUoW1wianF1ZXJ5XCIsIFwiLi92ZXJzaW9uXCJdLCBmYWN0b3J5KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8vIEJyb3dzZXIgZ2xvYmFsc1xuICAgICAgICAgICAgZmFjdG9yeShqUXVlcnkpO1xuICAgICAgICB9XG4gICAgfShmdW5jdGlvbiAoJDphbnkpIHtcbiAgICAgICAgcmV0dXJuIGpRdWVyeS5mbi5leHRlbmQoe1xuICAgICAgICAgICAgdW5pcXVlSWQ6IChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgdmFyIHV1aWQgPSAwO1xuICAgICAgICAgICAgICAgIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmVhY2goZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCF0aGlzLmlkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5pZCA9IFwiZnctdHJjLVwiICsgKCsrdXVpZCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9KSgpLFxuICAgICAgICAgICAgcmVtb3ZlVW5pcXVlSWQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5lYWNoKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKC9eZnctdHJjLVxcZCskLy50ZXN0KHRoaXMuaWQpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLnJlbW92ZUF0dHIoXCJpZFwiKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9KSk7XG5cbiAgICAkLnJlbmRlciA9IFdTVS5yZW5kZXI7XG59KCg8YW55PndpbmRvdykualF1ZXJ5LCg8YW55PndpbmRvdykualF1ZXJ5KSk7XG4iLCIoZnVuY3Rpb24gKHdpbmRvdzogYW55LCBVSTogV1NVdWlTdGF0aWMpIHtcbiAgICAgVUkudGVzdCA9IGZ1bmN0aW9uKCl7XG4gICAgICAgIFdTVS5fZCgnZ2V0IHRvIHRoZSBVSScpO1xuICAgICAgICBXU1UuX2QoVUkpO1xuICAgICAgICBXU1UuX2QoJzEyMTQnLmxlYWRpbmdDaGFycygnMCcsIDEwKSk7XG4gICAgfTtcblxuICAgIC8vIGNhbiBleHRlbmQgdGhpc1xuICAgIFdTVS5wcmltZSgnYWN0aW9ucy50eXBlcycsIFVJKTtcbn0gKHdpbmRvdywgV1NVLnByaW1lKCd1aScsIFdTVSkgKSApO1xuIiwiKGZ1bmN0aW9uICh3aW5kb3c6IGFueSwgVVRJTDogV1NVdXRpbFN0YXRpYykge1xuICAgIFVUSUwuZHVtcEtleXNSZWN1cnNpdmVseSA9IGZ1bmN0aW9uIChvYmo6IGFueSwgcmVnZXg6IGFueSkge1xuICAgICAgICB2YXIga2V5czogYW55ID0gW107XG4gICAgICAgIHJlZ2V4ID0gcmVnZXggfHwgZmFsc2U7XG4gICAgICAgIHZhciBjcmVhdGVLZXlQYXRoID0gZnVuY3Rpb24gKGN1cnJlbnRLZXlQYXRoOiBhbnksIGtleTogYW55KSB7XG4gICAgICAgICAgICByZXR1cm4gY3VycmVudEtleVBhdGggKyAoY3VycmVudEtleVBhdGggPyAnLicgOiAnJykgKyBrZXk7XG4gICAgICAgIH07XG4gICAgICAgIChmdW5jdGlvbiAocGF0aDogYW55LCBhbnk6IGFueSkge1xuICAgICAgICAgICAgdmFyIGk6IGFueSwgazogYW55LCBjdXJyZW50UGF0aDogYW55O1xuICAgICAgICAgICAgaWYgKCBXU1UuZGVmaW5lZChhbnksXCJhcnJheVwiKSApIHtcbiAgICAgICAgICAgICAgICBmb3IgKGkgPSAwOyBpIDwgYW55Lmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICAgICAgICAgICAgICAgIGN1cnJlbnRQYXRoID0gY3JlYXRlS2V5UGF0aChwYXRoLCAoaSkudG9TdHJpbmcoKSk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChmYWxzZSAhPT0gcmVnZXgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBwbWF0Y2ggPSByZWdleC5leGVjKGN1cnJlbnRQYXRoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChudWxsICE9PSBwbWF0Y2gpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBrZXlzLnB1c2goY3VycmVudFBhdGgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAga2V5cy5wdXNoKGN1cnJlbnRQYXRoKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBhcmd1bWVudHMuY2FsbGVlKGN1cnJlbnRQYXRoLCBhbnlbaV0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSBpZiAoICFXU1UuZGVmaW5lZChhbnksXCJzdHJpbmdcIikgKSB7XG4gICAgICAgICAgICAgICAgZm9yIChrIGluIGFueSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoYW55Lmhhc093blByb3BlcnR5KGspKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjdXJyZW50UGF0aCA9IGNyZWF0ZUtleVBhdGgocGF0aCwgayk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZmFsc2UgIT09IHJlZ2V4KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHJtYXRjaCA9IHJlZ2V4LmV4ZWMoY3VycmVudFBhdGgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChudWxsICE9PSBybWF0Y2gpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAga2V5cy5wdXNoKGN1cnJlbnRQYXRoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGtleXMucHVzaChjdXJyZW50UGF0aCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBhcmd1bWVudHMuY2FsbGVlKGN1cnJlbnRQYXRoLCBhbnlba10pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9KSgnJywgb2JqKTtcbiAgICAgICAgcmV0dXJuIGtleXM7XG4gICAgfTtcbn0gKHdpbmRvdywgV1NVLnByaW1lKCd1dGlsaXRpZXMnLCBXU1UpICkgKTtcbiIsIihmdW5jdGlvbiAod2luZG93OiBhbnksIFVUSUw6IFdTVXV0aWxTdGF0aWMpIHtcbiAgICAgVVRJTC50ZXN0ID0gZnVuY3Rpb24oKXtcbiAgICAgICAgV1NVLl9kKCdnZXQgdG8gdGhlIFdTVXV0aWxTdGF0aWMnKTtcbiAgICAgICAgV1NVLl9kKFVUSUwpO1xuICAgICAgICBXU1UuX2QoJzEyMTQnLmxlYWRpbmdDaGFycygnMCcsIDEwKSk7XG4gICAgfTtcbiAgICAvLyBjYW4gZXh0ZW5kIHRoaXNcbiAgICBXU1UucHJpbWUoJ2FjdGlvbnMudHlwZXMnLCBVVElMKTtcbn0gKHdpbmRvdywgV1NVLnByaW1lKCd1dGlsaXRpZXMnLCBXU1UpICkgKTtcbiJdfQ==
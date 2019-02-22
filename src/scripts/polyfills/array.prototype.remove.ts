if (!Array.prototype["remove"]) {
    Array.prototype["remove"] = function () {
        var what: any, a = arguments, L = a.length, ax: any;
        while (L && this.length) {
            what = a[--L];
            while ((ax = this.indexOf(what)) !== -1) {
                this.splice(ax, 1);
            }
        }
        return this;
    }
}

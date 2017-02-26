if (!Array.prototype.indexOf) {
    Array.prototype.indexOf = function(obj, start) {
        for (let i = (start || 0), j = this.length; i < j; i++) {
            if (this[i] === obj) { return i; }
        }
        return -1;
    };
}

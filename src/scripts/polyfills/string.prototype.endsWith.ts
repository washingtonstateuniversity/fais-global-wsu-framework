if (!String.prototype.endsWith) {
    String.prototype.endsWith = function (chars: string) {
        return this.substr(-chars.length) === chars;
    };
}

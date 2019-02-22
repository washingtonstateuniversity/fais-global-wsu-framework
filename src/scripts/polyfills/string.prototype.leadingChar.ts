if (!String.prototype.leadingChars) {
    String.prototype.leadingChars = function (chars: string|number, length: number): string  {
        if(length>0){
            return (chars.toString().repeat(length) + this).substr(-length); //number is positive, so cut from right aka leading
        }else{
            return (this + chars.toString().repeat(-length)).substr(0,-length);
        }
    };
}

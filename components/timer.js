import { Injectable } from "@angular/core";
var Timer = (function () {
    function Timer() {
        this.fns = [];
        this.commands = [];
        this.ing = false;
    }
    Timer.prototype.start = function () {
        if (this.ing === true)
            return;
        this.ing = true;
        this.nextTime = +new Date();
        this.process();
    };
    Timer.prototype.process = function () {
        var _this = this;
        while (this.commands.length) {
            this.commands.shift()();
        }
        var diff = +new Date() - this.nextTime, count = 1 + Math.floor(diff / 100);
        diff = 100 - diff % 100;
        this.nextTime += 100 * count;
        var frequency, step, i, len;
        for (i = 0, len = this.fns.length; i < len; i += 2) {
            frequency = this.fns[i + 1];
            // 100/s
            if (0 === frequency) {
                this.fns[i](count);
                // 1000/s
            }
            else {
                // 先把末位至0，再每次加2
                frequency += 2 * count - 1;
                step = Math.floor(frequency / 20);
                if (step > 0) {
                    this.fns[i](step);
                }
                // 把末位还原成1
                this.fns[i + 1] = frequency % 20 + 1;
            }
        }
        if (this.ing)
            setTimeout(function () { _this.process(); }, diff);
    };
    Timer.prototype.add = function (fn, frequency) {
        var _this = this;
        this.commands.push(function () {
            _this.fns.push(fn);
            _this.fns.push(frequency === 1000 ? 1 : 0);
            _this.ing = _this.fns.length > 0;
        });
    };
    Timer.prototype.remove = function (fn) {
        var _this = this;
        this.commands.push(function () {
            var i = _this.fns.indexOf(fn);
            if (i !== -1) {
                _this.fns.splice(i, 2);
            }
            _this.ing = _this.fns.length > 0;
        });
    };
    return Timer;
}());
export { Timer };
Timer.decorators = [
    { type: Injectable },
];
/** @nocollapse */
Timer.ctorParameters = function () { return []; };
//# sourceMappingURL=timer.js.map
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("@angular/core"), require("@angular/common"));
	else if(typeof define === 'function' && define.amd)
		define(["@angular/core", "@angular/common"], factory);
	else if(typeof exports === 'object')
		exports["ngx-countdown.umd"] = factory(require("@angular/core"), require("@angular/common"));
	else
		root["ngx-countdown.umd"] = factory(root["@angular/core"], root["@angular/common"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_0__, __WEBPACK_EXTERNAL_MODULE_4__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 5);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_0__;

/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__angular_core__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__timer__ = __webpack_require__(2);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CountdownComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var CountdownComponent = (function () {
    function CountdownComponent(el, renderer, timer) {
        this.el = el;
        this.renderer = renderer;
        this.timer = timer;
        this.start = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        this.finished = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        this.notify = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        this.frequency = 1000;
        this._notify = {};
        this.hands = [];
        this.left = 0;
        this.timer.start();
    }
    CountdownComponent.prototype.ngOnInit = function () {
        this.init();
    };
    CountdownComponent.prototype.ngOnDestroy = function () {
        this.destroy();
    };
    CountdownComponent.prototype.ngOnChanges = function (changes) {
        if (!changes.config.firstChange) {
            this.destroy().init();
        }
    };
    CountdownComponent.prototype.restart = function () {
        this.destroy().init();
        this.timer.start();
    };
    CountdownComponent.prototype.init = function () {
        var me = this;
        var el = me.el.nativeElement;
        me.config = Object.assign({
            leftTime: 0,
            template: '$!h!时$!m!分$!s!秒',
            size: 'lite',
            effect: 'normal',
            varRegular: /\$\!([\-\w]+)\!/g,
            clock: ['d', 100, 2, 'h', 24, 2, 'm', 60, 2, 's', 60, 2, 'u', 10, 1]
        }, me.config);
        this.cls = "count-down " + me.config.size + " " + me.config.className;
        // 分析markup
        var tmpl = el.innerHTML || me.config.template;
        me.config.varRegular.lastIndex = 0;
        el.innerHTML = tmpl.replace(me.config.varRegular, function (str, type) {
            // 时钟频率校正.
            if (type === 'u' || type === 's-ext')
                me.frequency = 100;
            // 生成hand的markup
            var content = '';
            if (type === 's-ext') {
                me.hands.push({ type: 's' });
                me.hands.push({ type: 'u' });
                content = me.html('', 's', 'handlet') +
                    me.html('.', '', 'digital') +
                    me.html('', 'u', 'handlet');
            }
            else {
                me.hands.push({ type: type });
            }
            return me.html(content, type, 'hand');
        });
        var clock = me.config.clock;
        me.hands.forEach(function (hand) {
            var type = hand.type, base = 100, i;
            hand.node = el.querySelector(".hand-" + type);
            // radix, bits 初始化
            for (i = clock.length - 3; i > -1; i -= 3) {
                if (type === clock[i]) {
                    break;
                }
                base *= clock[i + 1];
            }
            hand.base = base;
            hand.radix = clock[i + 1];
            hand.bits = clock[i + 2];
        });
        me.getLeft();
        me.reflow();
        // bind reflow to me
        var _reflow = me.reflow;
        me.reflow = function (count) {
            if (count === void 0) { count = 0; }
            return _reflow.apply(me, [count]);
        };
        // 构建 notify
        if (me.config.notify) {
            me.config.notify.forEach(function (time) {
                if (time < 1)
                    throw new Error('由于当结束会调用 finished，所以 notify 通知必须全是正整数');
                time = time * 1000;
                time = time - time % me.frequency;
                me._notify[time] = true;
            });
        }
        me.start.emit();
        me.timer.add(me.reflow, me.frequency);
        // show
        el.style.display = 'inline';
        return me;
    };
    CountdownComponent.prototype.destroy = function () {
        this.timer.remove(this.reflow);
        return this;
    };
    /**
     * 更新时钟
     */
    CountdownComponent.prototype.reflow = function (count) {
        if (count === void 0) { count = 0; }
        var me = this;
        me.left = me.left - me.frequency * count;
        me.hands.forEach(function (hand) {
            hand.lastValue = hand.value;
            hand.value = Math.floor(me.left / hand.base) % hand.radix;
        });
        me.repaint();
        if (me._notify[me.left]) {
            me.notify.emit(me.left);
        }
        if (me.left < 1) {
            me.finished.emit(0);
            this.destroy();
        }
    };
    /**
     * 重绘时钟
     */
    CountdownComponent.prototype.repaint = function () {
        var me = this;
        if (me.config.repaint) {
            me.config.repaint.apply(me);
            return;
        }
        var content;
        me.hands.forEach(function (hand) {
            if (hand.lastValue !== hand.value) {
                content = '';
                me.toDigitals(hand.value, hand.bits).forEach(function (digital) {
                    content += me.html(digital.toString(), '', 'digital');
                });
                hand.node.innerHTML = content;
            }
        });
    };
    /**
     * 获取倒计时剩余帧数
     */
    CountdownComponent.prototype.getLeft = function () {
        var left = this.config.leftTime * 1000, end = this.config.stopTime;
        if (!left && end)
            left = end - new Date().getTime();
        this.left = left - left % this.frequency;
    };
    /**
     * 生成需要的html代码，辅助工具
     */
    CountdownComponent.prototype.html = function (con, className, type) {
        if (con instanceof Array) {
            con = con.join('');
        }
        switch (type) {
            case 'hand':
            case 'handlet':
                className = type + ' hand-' + className;
                break;
            case 'digital':
                if (con === '.') {
                    className = type + ' ' + type + '-point ' + className;
                }
                else {
                    className = type + ' ' + type + '-' + con + ' ' + className;
                }
                break;
        }
        return '<span class="' + className + '">' + con + '</span>';
    };
    /**
     * 把值转换为独立的数字形式
     */
    CountdownComponent.prototype.toDigitals = function (value, bits) {
        value = value < 0 ? 0 : value;
        var digitals = [];
        // 把时、分、秒等换算成数字.
        while (bits--) {
            digitals[bits] = value % 10;
            value = Math.floor(value / 10);
        }
        return digitals;
    };
    return CountdownComponent;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], CountdownComponent.prototype, "config", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(),
    __metadata("design:type", Object)
], CountdownComponent.prototype, "start", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(),
    __metadata("design:type", Object)
], CountdownComponent.prototype, "finished", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(),
    __metadata("design:type", Object)
], CountdownComponent.prototype, "notify", void 0);
CountdownComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'countdown',
        template: "<ng-content></ng-content>",
        host: {
            '[class]': 'cls'
        },
        styles: ["\n.count-down{display:none;color:#808080;font-size:12px;font-family:arial, '5b8b4f53'}.count-down span{text-decoration:none}.count-down .clock{font-weight:bold}.count-down .hand{margin:0 3px}.count-down .digital{color:#f60;font-size:14px;font-weight:normal}.count-down.medium .digital{color:#404040;font-size:24px}.count-down.large .hand{display:inline-block;padding:0 2px;width:32px;height:35px;line-height:35px;box-sizing:initial;background:url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAF8AAAAjCAYAAADyrNZPAAAAIGNIUk0AAHolAACAgwAA+f8AAIDpAAB1MAAA6mAAADqYAAAXb5JfxUYAAAAGYktHRAD/AP8A/6C9p5MAAAAJcEhZcwAACxMAAAsTAQCanBgAAAHRSURBVGje7doxihtBEEbhV0NHwjCgRAYfwIMDH8BsugfYK0g6gMFX2NTgA+gsmxi8NzBStKnB0cJKkfovB17JJ+ipAndHAiXva0rFCMY2mw3AO+ArcPP6ec7zC3gEvux2uyeA7XYb2TOb1dbr9Xvgh5ktzSykyN1x92fgE1Cje+ayFne/N7Pl5YvAM7r7PVCT9DS3Fne/NbMUUHe/5e/lp+hpbS2Sxiw/b0lvALL0tLaW1x0U3QL8WzNZelpbiySGYYhuAUASQJqe1tYiKc2kXS4/S09ra187gdYi6Tpx0efSkaWntbWvnUBrv/xAa187gdZ++YHWvnYCrX3yA6198gOtRRKLxSK6BYDj8QiQpqe1tdRaORwO0S0AjOMIkKantbVIYrVaRbcAcDqdANL0tLb2nR9o7U87gdZ++YHWfvmB1n75gdYiifP5HN1yDQLS9LS2FknUWqNbrkFAmp7W1j75gdbi7mkm7fJ8n6WntbVPfqA11T/c/+7tBXd/ljRGxwCY2QtQs/S0thZJD+5+Fz1tZoaZPQA1Q88cVpum6QPwXdIyCmxmDMNweT+f6J65rMXdfwIfzeybmd0Ab2fu+Q08uvvn/X7/BDBNU2TPbNY/RYn/l73uadIAAAAASUVORK5CYII=\") no-repeat}.count-down.large .digital{color:#fff;font-size:28px}.count-down.large .hand-s-ext{width:59px;background-position:-36px 0}\n    "],
        encapsulation: __WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewEncapsulation"].None
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"],
        __WEBPACK_IMPORTED_MODULE_0__angular_core__["Renderer"],
        __WEBPACK_IMPORTED_MODULE_1__timer__["a" /* Timer */]])
], CountdownComponent);



/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__angular_core__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Timer; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

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
Timer = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])()
], Timer);



/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_common__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_common___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__angular_common__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__angular_core__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__component__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__timer__ = __webpack_require__(2);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CountdownModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




var CountdownModule = (function () {
    function CountdownModule() {
    }
    return CountdownModule;
}());
CountdownModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["NgModule"])({
        imports: [__WEBPACK_IMPORTED_MODULE_0__angular_common__["CommonModule"]],
        providers: [__WEBPACK_IMPORTED_MODULE_3__timer__["a" /* Timer */]],
        declarations: [__WEBPACK_IMPORTED_MODULE_2__component__["a" /* CountdownComponent */]],
        exports: [__WEBPACK_IMPORTED_MODULE_2__component__["a" /* CountdownComponent */]]
    })
], CountdownModule);



/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_4__;

/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__components_component__ = __webpack_require__(1);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "CountdownComponent", function() { return __WEBPACK_IMPORTED_MODULE_0__components_component__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_module__ = __webpack_require__(3);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "CountdownModule", function() { return __WEBPACK_IMPORTED_MODULE_1__components_module__["a"]; });




/***/ })
/******/ ]);
});
//# sourceMappingURL=ngx-countdown.umd.js.map
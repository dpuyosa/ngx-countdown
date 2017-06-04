import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CountdownComponent } from './component';
import { Timer } from './timer';
var CountdownModule = (function () {
    function CountdownModule() {
    }
    return CountdownModule;
}());
export { CountdownModule };
CountdownModule.decorators = [
    { type: NgModule, args: [{
                imports: [CommonModule],
                providers: [Timer],
                declarations: [CountdownComponent],
                exports: [CountdownComponent]
            },] },
];
/** @nocollapse */
CountdownModule.ctorParameters = function () { return []; };
//# sourceMappingURL=module.js.map
import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
var RefresherExample = /** @class */ (function () {
    function RefresherExample() {
    }
    RefresherExample.prototype.doRefresh = function (event) {
        console.log('Begin async operation');
        setTimeout(function () {
            console.log('Async operation has ended');
            event.target.complete();
        }, 2000);
    };
    RefresherExample = tslib_1.__decorate([
        Component({
            selector: 'refresher-example',
            templateUrl: 'refresher-example.html',
            styleUrls: ['./refresher-example.css'],
        }),
        tslib_1.__metadata("design:paramtypes", [])
    ], RefresherExample);
    return RefresherExample;
}());
export { RefresherExample };
//# sourceMappingURL=refresh.js.map
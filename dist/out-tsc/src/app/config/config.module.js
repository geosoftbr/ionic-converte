import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { ConfigPage } from './config.page';
var routes = [
    {
        path: '',
        component: ConfigPage
    }
];
var ConfigPageModule = /** @class */ (function () {
    function ConfigPageModule() {
    }
    ConfigPageModule = tslib_1.__decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                IonicModule,
                RouterModule.forChild(routes)
            ],
            declarations: [ConfigPage]
        })
    ], ConfigPageModule);
    return ConfigPageModule;
}());
export { ConfigPageModule };
//# sourceMappingURL=config.module.js.map
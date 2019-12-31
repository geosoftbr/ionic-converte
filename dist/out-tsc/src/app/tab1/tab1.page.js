import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { DolarTurismoService } from '../dolar-turismo.service';
var Tab1Page = /** @class */ (function () {
    function Tab1Page(dolarTurismo) {
        this.dolarTurismo = dolarTurismo;
    }
    Tab1Page.prototype.ngOnInit = function () {
        var _this = this;
        this.dolarTurismo.getRemoteData().subscribe(function (data) {
            _this.parseJson(data);
            _this.valDol = document.getElementsByName("valUs")[0]; //pega valor do campo
            console.log("[tab1.page.ts - ngOnInit] - Iniciando Conversão");
            console.log("[tab1.page.ts - ngOnInit] - Tipo da Transação " + _this.tipoTran);
            console.log("[tab1.page.ts - ngOnInit] - Valor de Entrada " + _this.valDol);
            console.log("[tab1.page.ts - ngOnInit] - Preparando para converter por " + _this.ask);
            _this.valEntrada = parseFloat(_this.valDol);
            _this.dolarTurismo.convertValue(_this.tipoTran, _this.valEntrada, _this.ask);
        }, function (error) {
            console.log(error);
        });
    };
    Tab1Page.prototype.parseJson = function (data) {
        {
            var jsonArray = data[0];
            this.ask = jsonArray.ask;
            this.create_date = jsonArray.create_date;
            this.varBid = jsonArray.varBid;
            this.name = jsonArray.name;
            var d = this.varBid;
            if (d > 0) {
                this.color = "danger";
            }
            else {
                this.color = "success";
            }
            console.log('[tab1.page.ts - parseJson] Cor Selecionada => ' + this.color);
            console.log('[tab1.page.ts - parseJson] Ultima atualização ' + this.create_date);
            console.log('[tab1.page.ts - parseJson] Cotação - ' + this.ask);
        }
    };
    Tab1Page.prototype.onChange = function ($event) {
        var txt = $event.target.options[$event.target.options.selectedIndex].text;
        console.log("Selecionado: " + txt);
    };
    Tab1Page = tslib_1.__decorate([
        Component({
            selector: 'app-tab1',
            templateUrl: 'tab1.page.html',
            styleUrls: ['tab1.page.scss']
        }),
        tslib_1.__metadata("design:paramtypes", [DolarTurismoService])
    ], Tab1Page);
    return Tab1Page;
}());
export { Tab1Page };
//# sourceMappingURL=tab1.page.js.map
import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { DolarTurismoService } from '../dolar-turismo.service';
import { AlertController } from '@ionic/angular';
var Tab1Page = /** @class */ (function () {
    function Tab1Page(dolarTurismo, alertController) {
        this.dolarTurismo = dolarTurismo;
        this.alertController = alertController;
        this.tipos = [
            { nome: 'Dinheiro' },
            { nome: 'Cartão' },
            { nome: 'Entrega no Brasil' },
        ];
        //trType: string;
        this.txMoney = 0.011; // 1,1%
    }
    Tab1Page.prototype.presentAlert = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var alert;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.alertController.create({
                            header: 'Vish!',
                            subHeader: this.subErr,
                            message: this.errMsg,
                            buttons: ['OK']
                        })];
                    case 1:
                        alert = _a.sent();
                        return [4 /*yield*/, alert.present()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    Tab1Page.prototype.ngOnInit = function () {
        var _this = this;
        this.dolarTurismo.getRemoteData().subscribe(function (data) {
            _this.parseJson(data);
            //let vDol: HTMLElement = document.getElementById('valUs');
            //let vBR: HTMLElement = document.getElementById('valBr');
            //console.log("[tab1.page.ts - ngOnInit] - Default > Dinheiro");
            //console.log("[tab1.page.ts - ngOnInit] - valor campo dolar: "+ vDol.innerHTML);
            //this.valDol = vDol.innerHTML;
            //console.log("[tab1.page.ts - ngOnInit] - Iniciando Conversão")
            //this.tipoTran = "Dinheiro"; //default => Dinheiro
            //this.firstVal = this.valDol * this.ask;
            //this.taxas = (this.firstVal * this.txMoney).toFixed(2);
            //console.log("[tab1.page.ts - ngOnInit] - Tipo da Transação "+ this.tipoTran)
            //console.log("[tab1.page.ts - ngOnInit] - Valor de Entrada "+ this.valDol)
            if (_this.ask == null) {
                _this.subErr = 'Erro de Conexão';
                _this.errMsg = 'Não consegui pegar o valor do Dolar Turismo. \n Tente de novo mais tarde';
                _this.presentAlert();
                console.log("[tab1.page.ts - ngOnInit] - Erro na consulta do dólar turismo");
            }
            else {
                console.log("[tab1.page.ts - ngOnInit] - Pronto para converter por " + _this.ask);
            }
            //this.valEntrada = parseFloat(this.valDol);
            //this.newVal = this.dolarTurismo.convertValue(this.tipoTran,this.valDol, this.ask);
            //vBR.innerHTML = this.newVal;
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
            //console.log('[tab1.page.ts - parseJson] Cor Selecionada => '+ this.color);
            //console.log('[tab1.page.ts - parseJson] Ultima atualização '+ this.create_date);
            //console.log('[tab1.page.ts - parseJson] Cotação - ' + this.ask);
        }
    };
    Tab1Page.prototype.onChange = function () {
        var _this = this;
        var txt;
        if (this.trType == null) {
            txt = "";
            this.subErr = 'Selecione a Forma de Pagamento!';
            this.errMsg = 'Não consigo fazer nada se você não selecionar a forma de pagamento!';
            this.presentAlert();
        }
        else {
            txt = this.trType;
        }
        var vBR = document.getElementById('valBr');
        //console.log("[tab1.page.ts - onChange] - yada valUs => "+ this.valUs);
        this.dolarTurismo.getRemoteData().subscribe(function (data) {
            _this.parseJson(data);
            _this.tipoTran = txt.nome;
            //pega valor digitado em Dolar
            //let vDol: HTMLElement = document.getElementById('valUs');
            if (_this.valUs == null) {
                _this.valDol = 0;
            }
            else {
                _this.valDol = _this.valUs;
            }
            //console.log("[tab1.page.ts - onChange] - Iniciando Conversão")
            //console.log("[tab1.page.ts - onChange] - Tipo da Transação "+ this.tipoTran)
            //console.log("[tab1.page.ts - onChange] - Valor de Entrada "+ this.valDol)
            //console.log ("[tab1.page.ts - onChange] - Preparando para converter por "+ this.ask)
            _this.valEntrada = parseFloat(_this.valDol);
            _this.newVal = _this.dolarTurismo.convertValue(_this.tipoTran, _this.valEntrada, _this.ask);
            vBR.innerHTML = _this.newVal;
        }, function (error) {
            console.log(error);
        });
    };
    Tab1Page.prototype.abrepesquisa = function () {
        window.open("https://forms.gle/yfY4kFpicVHFo5ACA", "_blank");
    };
    Tab1Page.prototype.converte = function () {
        var _this = this;
        console.log("Entrando na função Converte");
        var txt;
        if (this.trType == null) {
            txt = "";
            this.subErr = 'Selecione a Forma de Pagamento!';
            this.errMsg = 'Não consigo fazer nada se você não selecionar a forma de pagamento!';
            this.presentAlert();
        }
        else {
            txt = this.trType;
        }
        var vBR = document.getElementById('valBr');
        //console.log("[tab1.page.ts - onChange] - yada valUs => "+ this.valUs);
        this.dolarTurismo.getRemoteData().subscribe(function (data) {
            _this.parseJson(data);
            _this.tipoTran = txt.nome;
            //pega valor digitado em Dolar
            //let vDol: HTMLElement = document.getElementById('valUs');
            if (_this.valUs == null) {
                _this.valDol = 0;
                _this.subErr = 'Digite o valor em Dolar...';
                _this.errMsg = '...senão eu não posso converter!';
                _this.presentAlert();
            }
            else {
                _this.valDol = _this.valUs;
            }
            //console.log("[tab1.page.ts - onChange] - Iniciando Conversão")
            //console.log("[tab1.page.ts - onChange] - Tipo da Transação "+ this.tipoTran)
            //console.log("[tab1.page.ts - onChange] - Valor de Entrada "+ this.valDol)
            //console.log ("[tab1.page.ts - onChange] - Preparando para converter por "+ this.ask)
            _this.valEntrada = parseFloat(_this.valDol);
            _this.newVal = _this.dolarTurismo.convertValue(_this.tipoTran, _this.valEntrada, _this.ask);
            vBR.innerHTML = _this.newVal;
        }, function (error) {
            console.log(error);
        });
    };
    Tab1Page = tslib_1.__decorate([
        Component({
            selector: 'app-tab1',
            templateUrl: 'tab1.page.html',
            styleUrls: ['tab1.page.scss']
        }),
        tslib_1.__metadata("design:paramtypes", [DolarTurismoService, AlertController])
    ], Tab1Page);
    return Tab1Page;
}());
export { Tab1Page };
//# sourceMappingURL=tab1.page.js.map
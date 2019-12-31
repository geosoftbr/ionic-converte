import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
var DolarTurismoService = /** @class */ (function () {
    function DolarTurismoService(http) {
        this.http = http;
        console.log('[dolar-Turismo.service.ts] Buscando cotação do dolar turismo');
    }
    DolarTurismoService.prototype.getRemoteData = function () {
        //mudar para http://economia.awesomeapi.com.br/USD-BRLT/1?format=json quando for buscar o valor remoto.
        //fazer seleção automática, atualização do json e identificação de online e offline
        return this.http.get('http://economia.awesomeapi.com.br/USD-BRLT/1?format=json');
        //return this.http.get('assets/data/dolar.json'); //Local
    };
    ;
    DolarTurismoService.prototype.convertValue = function (transType, valIn, dolIn) {
        //pega o valor de valIn e faz o calculo da conversão e converte usando o valor do dolar que vem pela variavel dolIn
        console.log("[dolar-turismo-service.ts] entrei na funcao para converter os valores! ");
        var valOut;
        var dolInNum;
        var valDirect;
        var transType;
        var taxes;
        var valTaxMoney;
        var valTaxCredit;
        var valTaxDelivery;
        var txtPay;
        var valTax;
        valTaxMoney = 0.011; // 1,1%
        valTaxCredit = 0.0638; // 6,38%
        valTaxDelivery = 0.6; // 60%
        dolInNum = parseFloat(dolIn);
        if (transType == "1") {
            taxes = valTaxMoney;
            txtPay = "Dinheiro";
        }
        else if (transType == "2") {
            taxes = valTaxCredit;
            txtPay = "Cartão de Crédito";
        }
        else if (transType == "3") {
            taxes = valTaxDelivery;
            txtPay = "Entrega";
        }
        console.log('[dolar-turismo-service.ts] Transação selecionada: ' + txtPay);
        valDirect = valIn * dolInNum;
        valTax = valDirect * taxes;
        valOut = (valTax + valDirect);
        valOut = valOut.toFixed(2);
        console.log("[dolar-turismo-service.ts] Imposto pago: " + valTax);
        console.log("[dolar-turismo-service.ts] Conversão com taxa (" + txtPay + "): " + valOut);
        return valOut;
    };
    DolarTurismoService = tslib_1.__decorate([
        Injectable({
            providedIn: 'root'
        }),
        tslib_1.__metadata("design:paramtypes", [HttpClient])
    ], DolarTurismoService);
    return DolarTurismoService;
}());
export { DolarTurismoService };
//# sourceMappingURL=dolar-turismo.service.js.map
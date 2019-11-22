import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from "rxjs/operators";
import { NumberValueAccessor } from '@angular/forms/src/directives';

@Injectable({
  providedIn: 'root'
})
export class DolarTurismoService {

  constructor(public http: HttpClient) {     

    console.log('[dolar-Turismo.service.ts] Buscando cotação do dolar turismo');
  }
    getRemoteData(){
      //mudar para http://economia.awesomeapi.com.br/USD-BRLT/1?format=json quando for buscar o valor remoto.
      //return this.http.get('http://economia.awesomeapi.com.br/USD-BRLT/1?format=json');
      return this.http.get('assets/data/dolar.json'); //Local
    };
    convertValue(transType:string, valIn:number, dolIn:any){
      //pega o valor de valIn e faz o calculo da conversão e converte usando o valor do dolar que vem pela variavel dolIn
      var valOut: any;
      var dolInNum: number;
      var valDirect: number;
      var transType: string;
      var taxes:number;
      var valTaxMoney: number;
      var valTaxCredit: number;
      var valTaxDelivery: number;
      var txtPay: string;
      var valTax:number;
      
      valTaxMoney = 0.011; // 1,1%
      valTaxCredit = 0.0638; // 6,38%
      valTaxDelivery = 0.6; // 60%
      
      dolInNum = parseFloat(dolIn);

      if (transType=="1"){
        taxes = valTaxMoney;
        txtPay = "Dinheiro";
      }else if (transType=="2"){
        taxes = valTaxCredit;
        txtPay = "Cartão de Crédito";
      }else if(transType=="3"){
        taxes = valTaxDelivery;
        txtPay = "Entrega";
      }
      console.log('[dolar-turismo-service.ts] Transação selecionada: '+txtPay);
      valDirect = valIn * dolInNum;
      valTax = valDirect * taxes;
      valOut = (valTax + valDirect);
      valOut = valOut.toFixed(2);
      console.log("[dolar-turismo-service.ts] Imposto pago: "+ valTax)
      console.log("[dolar-turismo-service.ts] Conversão com taxa ("+ txtPay +"): "+ valOut)
      return valOut;
    }

}

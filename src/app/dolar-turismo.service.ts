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
      //fazer seleção automática, atualização do json e identificação de online e offline
      return this.http.get('http://economia.awesomeapi.com.br/USD-BRLT/1?format=json');
      //return this.http.get('assets/data/dolar.json'); //Local
    };

    convertValue(transType:string, valIn:number, dolIn:any){
      //pega o valor de valIn e faz o calculo da conversão e converte usando o valor do dolar que vem pela variavel dolIn
      console.log("[dolar-turismo-service.ts] entrei na funcao para converter os valores! ")
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

      if (transType=="Dinheiro"){
        taxes = valTaxMoney;
        txtPay = "Dinheiro";
      }else if (transType=="Cartão"){
        taxes = valTaxCredit;
        txtPay = "Cartão de Crédito";
      }else if(transType=="Entrega no Brasil"){
        taxes = valTaxDelivery;
        txtPay = "Entrega";
      } else if (transType==null){ //default = dinheiro
        taxes = valTaxMoney;
        txtPay = "Dinheiro";        
      }
      
      console.log('[dolar-turismo-service.ts] Transação selecionada: '+txtPay); 
      //default = dinheiro (1)

      valDirect = valIn * dolInNum;
      valTax = valDirect * taxes;
      valOut = (valTax + valDirect);
      valOut = valOut.toFixed(2);
      console.log("[dolar-turismo-service.ts] Imposto pago: "+ valTax.toFixed(2))
      //<small>Valor do imposto pago: R$ {{ taxas }}</small>
      let vTax: HTMLElement = document.getElementById('valImposto')
      vTax.innerHTML = "<small>Valor do imposto pago: R$ "+ valTax.toFixed(2) +"</small>"
      console.log("[dolar-turismo-service.ts] Conversão com taxa ("+ txtPay +"): "+ valOut)
      return valOut;
    }

    getFieldVals(fieldId:string): number {
     var num: number


       return num
    }

}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class DolarTurismoService {

  constructor(public http: HttpClient) {     

    console.log('[dolar-Turismo.service.ts] Buscando cotação do dolar turismo');
  }
    getRemoteData(){
     //mudar para http://economia.awesomeapi.com.br/USD-BRLT/1?format=json quando for buscar o valor remoto.
     //conexão local: 'assets/data/dolar.json'
      return this.http.get('http://economia.awesomeapi.com.br/USD-BRLT/1?format=json');
    };
    convertValue(valIn:number, dolIn:number){
      //pega o valor de valIn e faz o calculo da conversão e converte usando o valor do dolar que vem pela variavel dolIn
      var valOut: number,
      valOut = valIn * dolIn;
      return valOut;
    }

}

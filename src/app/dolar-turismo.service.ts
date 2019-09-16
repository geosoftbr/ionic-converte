import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class DolarTurismoService {

  constructor(public http: HttpClient) {     

    console.log('Buscando cotação do dolar turismo');
  }
    getRemoteData(){
     //mudar para http://economia.awesomeapi.com.br/USD-BRLT/1?format=json quando for buscar o valor remoto.
      return this.http.get('assets/data/dolar.json');
  
    };

}

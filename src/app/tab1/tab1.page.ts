import { Component, ErrorHandler} from '@angular/core';
import { DolarTurismoService } from '../dolar-turismo.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})

export class Tab1Page {
ask:number;
create_date:string;
varBid:number;
name:string;
color:string;
tipoTran:string;
valEntrada:number;
valDol: any;

  constructor(public dolarTurismo: DolarTurismoService) {}
  ngOnInit() {
    this.dolarTurismo.getRemoteData().subscribe(
      data=>{
        this.parseJson(data);


        var e = (document.getElementById("types")) as HTMLSelectElement;
        var sel = e.selectedIndex;
        var opt = e.options[sel]
        //console.log(opt.toString);
        //var sel = e.selectedOptions;
        //var opt = e.options[sel];
        var tTran = (<HTMLOptionElement>opt).value;

        let vDol: HTMLElement = document.getElementById('valUs');

        console.log("valor campo dolar: "+ vDol.innerHTML);
        console.log("Tipo da transacao "+ sel.toString)
        

        //this.valDol =  el //pega valor do campo
        

        console.log("[tab1.page.ts - ngOnInit] - Iniciando Conversão")
        console.log("[tab1.page.ts - ngOnInit] - Tipo da Transação "+ this.tipoTran)
        console.log("[tab1.page.ts - ngOnInit] - Valor de Entrada "+ this.valDol)
        console.log ("[tab1.page.ts - ngOnInit] - Preparando para converter por "+ this.ask)
        this.valEntrada = parseFloat(this.valDol);
        this.dolarTurismo.convertValue(this.tipoTran,this.valEntrada, this.ask );

      }, error =>{
        console.log(error);
      }
    );

  }
  
  parseJson(data: Object) {
    {
        let jsonArray = data[0];

        this.ask = jsonArray.ask;
        this.create_date = jsonArray.create_date;
        this.varBid = jsonArray.varBid;
        this.name = jsonArray.name;

        var d = this.varBid;
        if (d > 0){
          this.color = "danger"
        } 
        else{
          this.color = "success";
        }

        console.log('[tab1.page.ts - parseJson] Cor Selecionada => '+ this.color);
        console.log('[tab1.page.ts - parseJson] Ultima atualização '+ this.create_date);
        console.log('[tab1.page.ts - parseJson] Cotação - ' + this.ask);
      }

  }
  onChange($event){
    let txt = $event.target.value
    this.dolarTurismo.getRemoteData().subscribe(
      data=>{
        this.parseJson(data);

        this.tipoTran = txt;
        this.valDol = (<HTMLScriptElement[]><any>document.getElementById("valUs"))[0]; //pega valor do campo

        console.log("[tab1.page.ts - onChange] - Iniciando Conversão")
        console.log("[tab1.page.ts - onChange] - Tipo da Transação "+ this.tipoTran)
        console.log("[tab1.page.ts - onChange] - Valor de Entrada "+ this.valDol)
        console.log ("[tab1.page.ts - onChange] - Preparando para converter por "+ this.ask)
        this.valEntrada = parseFloat(this.valDol);
        this.dolarTurismo.convertValue(this.tipoTran,this.valEntrada, this.ask );

      }, error =>{
        console.log(error);
      }
    );
    
  }
}

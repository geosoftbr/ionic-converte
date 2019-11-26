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

  constructor(public dolarTurismo: DolarTurismoService) {}
  ngOnInit() {
    this.dolarTurismo.getRemoteData().subscribe(
      data=>{
        //console.log(data);
        this.parseJson(data);
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
     //console.log ("Preparando para converter por "+ this.ask);
      //this.dolarTurismo.convertValue("1",1, this.ask);
  }
 
}

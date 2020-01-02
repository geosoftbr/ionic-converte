import { Component, ErrorHandler} from '@angular/core';
import { DolarTurismoService } from '../dolar-turismo.service';
import { AlertController } from '@ionic/angular';

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
tipoTran:any;
valEntrada:number;
valDol: any;
taxas: any;
firstVal: number;
newVal: any;
errMsg: string;

public trType:any;
public valUs:any;

tipos = [
  { nome: 'Dinheiro' },
  { nome: 'Cartão' },
  { nome: 'Entrega no Brasil' },
];

//trType: string;

txMoney = 0.011; // 1,1%

  constructor(public dolarTurismo: DolarTurismoService) {}
  
  public alertController: AlertController

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Erro!',
      subHeader: 'Você fez algo errado!',
      message: this.errMsg,
      buttons: ['OK']
    });

    await alert.present();
  }

  ngOnInit() {
    this.dolarTurismo.getRemoteData().subscribe(
      data=>{
        this.parseJson(data);

        let vDol: HTMLElement = document.getElementById('valUs');
        let vBR: HTMLElement = document.getElementById('valBr');

        console.log("[tab1.page.ts - ngOnInit] - Default > Dinheiro");
        console.log("[tab1.page.ts - ngOnInit] - valor campo dolar: "+ vDol.innerHTML);
        this.valDol = vDol.innerHTML;

        console.log("[tab1.page.ts - ngOnInit] - Iniciando Conversão")
        this.tipoTran = "Dinheiro"; //default => Dinheiro
        this.firstVal = this.valDol * this.ask;
        this.taxas = (this.firstVal * this.txMoney).toFixed(2);

        console.log("[tab1.page.ts - ngOnInit] - Tipo da Transação "+ this.tipoTran)
        console.log("[tab1.page.ts - ngOnInit] - Valor de Entrada "+ this.valDol)
        console.log ("[tab1.page.ts - ngOnInit] - Preparando para converter por "+ this.ask)
        
        this.valEntrada = parseFloat(this.valDol);
        this.newVal = this.dolarTurismo.convertValue(this.tipoTran,this.valDol, this.ask);
        vBR.innerHTML = this.newVal;

      }, error =>{
        console.log(error);
        this.errMsg = (error);
        
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
  onChange(){


    let txt = this.trType;
    let vBR: HTMLElement = document.getElementById('valBr');

    console.log("[tab1.page.ts - onChange] - yada valUs => "+ this.valUs);
    this.dolarTurismo.getRemoteData().subscribe(
      data=>{
        this.parseJson(data);
        
        this.tipoTran = txt.nome;

        if(txt.nome===null){
          
        }
      
        //pega valor digitado em Dolar
        //let vDol: HTMLElement = document.getElementById('valUs');

        this.valDol = this.valUs;

        console.log("[tab1.page.ts - onChange] - Iniciando Conversão")
        console.log("[tab1.page.ts - onChange] - Tipo da Transação "+ this.tipoTran)
        console.log("[tab1.page.ts - onChange] - Valor de Entrada "+ this.valDol)
        console.log ("[tab1.page.ts - onChange] - Preparando para converter por "+ this.ask)

        this.valEntrada = parseFloat(this.valDol);
        this.newVal = this.dolarTurismo.convertValue(this.tipoTran,this.valEntrada, this.ask );
        vBR.innerHTML = this.newVal;

      }, error =>{
        console.log(error);
        this.errMsg = (error);

        
      }
    );
    
  }
}

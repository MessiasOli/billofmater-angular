import { Component, Input, OnInit } from '@angular/core';
import { Menus } from "../../model/menus"
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  currentMessage : string = "O encontro da preparação com a oportunidade gera o que chamamos de sorte!";
  constructor() { }

  ngOnInit(): void {
  }

  public changeMsg(caption: string){
    if(caption == "home"){
      this.currentMessage = "O encontro da preparação com a oportunidade gera o que chamamos de sorte!";
    }
    if(caption == "process"){
      this.currentMessage = "Seja criativo, invente, faça diferente porque o óbvio, todos fazem.";
    }
    if(caption == "registerInput"){
      this.currentMessage = "Não importa o tamanho do problema, o importante é encará-lo com bom humor!"
    }
    if(caption == "billofmaterial"){
      this.currentMessage = "A melhor preparação para amanhã é fazendo o seu melhor hoje."
    }
    if(caption == "resume"){
      this.currentMessage = "Seja paciente e confie no processo. Você não come a fruta no mesmo dia que planta a semente."
    }
  }
}

import { Menus } from './menus';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  constructor() { }

  
  ngOnInit(): void {
  }

  buttons: Menus = new Menus()
  
  changeMsg(param : string){
    console.log('param :>> ', param);
  }

  selected(caption: string){
    this.buttons.home = caption == "home"
    this.buttons.process = caption == "process"
    this.buttons.registerInput = caption == "registerInput"
    this.buttons.billofmaterial = caption == "billofmaterial"
  }
}

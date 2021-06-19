import { Menus } from '../../model/menus';
import { Component, OnInit, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';

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
  
  @Output()
  msgBuss = new EventEmitter()

  selected(caption: string){
    this.buttons.home = caption == "home"
    this.buttons.process = caption == "process"
    this.buttons.registerInput = caption == "registerInput"
    this.buttons.billofmaterial = caption == "billofmaterial"
    this.msgBuss.emit(caption);
  }
}

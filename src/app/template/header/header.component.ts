import { Component, OnInit } from '@angular/core';

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

}

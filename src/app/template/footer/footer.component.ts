import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  constructor() { }
  activeBar: Boolean = true; 
  
  ngOnInit(): void {
  }

  switchBar(){
    this.activeBar = !this.activeBar;
    let body = document.querySelector("body");
    if(body)
      body.style.cursor = this.activeBar ? "progress" : "default"
  }

}

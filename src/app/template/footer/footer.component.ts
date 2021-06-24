import { Component, OnInit } from '@angular/core';
import { SwitchWaitService } from '../../services/switch-wait.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  constructor(private switchService: SwitchWaitService) { }
  activeBar: boolean = false;
  
  ngOnInit(): void {
    this.switchService.action().subscribe( _ =>{
      this.switchBar()
    }, (error) => console.log("error", error ))
  }

  public switchBar(){
    this.activeBar = !this.activeBar;
    let body = document.querySelector("html");
    if(body)
      body.style.cursor = this.activeBar ? "progress" : "default"
  }

}

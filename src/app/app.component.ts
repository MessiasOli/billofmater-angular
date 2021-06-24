import { FooterComponent } from './template/footer/footer.component';
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { HeaderComponent } from './template/header/header.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent implements AfterViewInit {
  ngAfterViewInit(): void {}
  title = 'proj-algular';
  
  @ViewChild(HeaderComponent, { static: false } )
  header!: HeaderComponent;

  @ViewChild(FooterComponent, { static: false})
  footer!: FooterComponent;

  transferMsg(msg: string){
    this.header.changeMsg(msg)
  }

  waiting(){
    this.footer.switchBar();
  }
}

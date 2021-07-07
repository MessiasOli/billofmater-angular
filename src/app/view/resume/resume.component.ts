import { ResumeService } from './../../services/resume.service';
import { ProcessResume } from './../../model/processResume';
import { Component, OnInit } from '@angular/core';
import { SwitchWaitService } from 'src/app/services/switch-wait.service';

@Component({
  selector: 'app-resume',
  templateUrl: './resume.component.html',
  styleUrls: ['./resume.component.css']
})
export class ResumeComponent implements OnInit {

  constructor(private service: ResumeService, private wait : SwitchWaitService) { }
  resume:ProcessResume[] = []
  displayedColumns: string[] = [ "id" , "process", "value", "unitmensurement", "amount"];

  async ngOnInit(): Promise<void> {
    this.wait.switchWait();
    this.resume =  await this.service.getResume()
    this.wait.switchWait();
  }
}


import { MemoryService } from '../../services/memory.service';
import { Component, OnInit, Output } from '@angular/core';
import { SwitchWaitService } from '../../services/switch-wait.service';

@Component({
  selector: 'app-process',
  templateUrl: './process.component.html',
  styleUrls: ['./process.component.css']
})
export class ProcessComponent implements OnInit {

  constructor(private repo: MemoryService, private wait : SwitchWaitService) { }

  ngOnInit(): void {
    this.wait.switchWait();
    setTimeout(() => {
      console.log('repo :>> ', this.repo.GetAllProcess());
      this.wait.switchWait();
    }, 3000);
  }

}

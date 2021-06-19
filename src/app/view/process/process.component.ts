import { MemoryService } from './../../services/memory.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-process',
  templateUrl: './process.component.html',
  styleUrls: ['./process.component.css']
})
export class ProcessComponent implements OnInit {

  constructor(private repo: MemoryService) { }

  ngOnInit(): void {
    console.log('this.repo.GetAllProcess() :>> ', this.repo.GetAllProcess());
  }

}

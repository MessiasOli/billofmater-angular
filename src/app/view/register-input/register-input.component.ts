import { MemoryService } from '../../services/memory.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register-input',
  templateUrl: './register-input.component.html',
  styleUrls: ['./register-input.component.css']
})
export class RegisterInputComponent implements OnInit {

  constructor(private repository: MemoryService) { 
    
  }

  ngOnInit(): void {
    console.log('this.repository :>> ', this.repository.GetAllMaterials());
  }

}

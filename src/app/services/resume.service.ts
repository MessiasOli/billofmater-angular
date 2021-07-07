import { ProcessResume } from './../model/processResume';
import { BillOfMaterialService } from './bill-of-material.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ResumeService {
  constructor(
    private bom: BillOfMaterialService
  ) {}

  async getResume() :  Promise<ProcessResume[]> {
    let process: ProcessResume [] = await this.bom.getProcess();
    
    process.forEach(async p => {
      let materials = await this.bom.getReport(p.id);  
      let total = 0
      materials.forEach(m => {
        total += m.value
      })
      p.amount = total;
    })

    return process;
  }
}

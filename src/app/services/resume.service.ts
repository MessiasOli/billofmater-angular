import { ProcessResume } from './../model/processResume';
import { BillOfMaterialService } from './bill-of-material.service';
import { Injectable } from '@angular/core';
import { BillOfMaterial } from '../model/bill-of-material';

@Injectable({
  providedIn: 'root'
})
export class ResumeService {
  constructor(
    private bom: BillOfMaterialService
  ) {}
  private process: ProcessResume[] = []
  private billofMaterial: BillOfMaterial[][] = []

  private async loadMaterials(){
    for (let p of this.process) {
      let bill = await this.bom.getReport(p.id)
      if(bill)
        this.billofMaterial.push(bill)  
      else
        this.billofMaterial.push([]) 
    }
  }
  
  async getResume() :  Promise<ProcessResume[]> {
    let totalProcess: number = 0;
    this.process = [];
    this.process = await this.bom.getProcess();

    this.process.push({
      id: "",
      process: "",
      unitmensurement: "TOTAL",
      amount: 0
    })

    console.log('totalProcess :>> ', totalProcess);
    
    await this.loadMaterials();

    this.process.forEach((p, i) => {
      let total = 0
      if(this.billofMaterial[i]){
        this.billofMaterial[i].forEach(m => total += m.value)
        p.amount = total;
        totalProcess += total;
        console.log('totalProcess :>> ', totalProcess);
      }
    })

    this.process[this.process.length-1].amount = totalProcess;

    return this.process;
  }
}

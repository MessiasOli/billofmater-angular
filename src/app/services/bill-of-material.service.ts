import { Material } from 'src/app/model/material';
import { BillOfMaterial } from './../model/bill-of-material';
import { RepositoryService } from 'src/app/database/repository.service';
import { Injectable } from '@angular/core';
import { Process } from '../model/process';

@Injectable({
  providedIn: 'root'
})
export class BillOfMaterialService {

  constructor(
    private repository: RepositoryService
  ) { }

  async getProcess(){
    return this.repository.GetAllProcess()
  }

  async getReport(idProcess: string):Promise<BillOfMaterial[]>{
    let process :Process = await this.repository.GetProcess(idProcess)
    let materials:Material[] = await this.repository.GetAllMaterialsByProcess(idProcess)
    let report: BillOfMaterial[] = []
    let total: number = 0

    materials.forEach(mat=> {
      let bom: BillOfMaterial = {
        id: mat.idmaterial,
        description: mat.description,
        amount: process.value ? process.value * mat.specificvalue : 0,
        specificvalue: mat.specificvalue,
        value: process.value ? process.value * mat.specificvalue * mat.price : 0,
        specificunit: `${mat.unitmensurement}/${process.unitmensurement}`
      }
      total += bom.value

      report.push(bom);
    });

    if(report.length == 0)
      return []

    let bom: BillOfMaterial = {
      id: "",
      amount: "",
      specificunit: "TOTAL",
      description: "",
      value: total
    }
    report.push(bom);
    return report
  }


}

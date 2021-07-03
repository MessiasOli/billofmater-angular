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

    console.log('process :>> ', process);
    console.log('materials :>> ', materials);

    materials.forEach(mat=> {
      let bom: BillOfMaterial = new BillOfMaterial
      bom.id = mat.idmaterial
      bom.description = mat.description
      bom.amount = process.value * mat.specificvalue
      bom.specificvalue = mat.specificvalue
      bom.value = process.value * mat.specificvalue * mat.price
      bom.specificunit = `${mat.unitmensurement}/${process.unitmensurement}`

      console.log('bom :>> ', bom);

        report.push(bom);
    });

    return report
  }


}

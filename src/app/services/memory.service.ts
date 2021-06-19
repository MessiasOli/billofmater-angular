import { Material } from '../model/material';
import { Injectable } from '@angular/core';
import { Process } from '../model/process';
import { IRepository } from "./interface/IRepository"

@Injectable({
  providedIn: 'root'
})
export class MemoryService implements IRepository {

  repoMaterials : Material[] = [
    {
      idarea: "asdas",
      idmaterial: "asdasd",
      description: "Açúcar",
      price: 15.55,
      specificvalue: 0.052,
      unitmensurement: "gr"
    }
  ]

  repoProcess: Process[] =[
    {
      id : "1",
      nameOfArea: "Bolo",
      unitmensurement: "kg",
      value: 15.55
    }
  ]

  constructor() { }
  AddMaterial(mat: Material): boolean {
    this.repoMaterials.push(mat)
    return true;
  }
  GetAllMaterials(): Material[] {
    return this.repoMaterials;
  }
  GetMaterial(id: string): Material {
    let mat = this.repoMaterials.find(mat => mat.idmaterial == id)
    return mat ? mat : new Material();
  }
  DeleteMaterials(id: string): void {
    this.repoMaterials = this.repoMaterials.filter(mat => mat.idmaterial == id)
  }
  UpdateMaterials(mat: Material): Material {
    this.repoMaterials.forEach(m =>{
      if(m.idmaterial == mat.idmaterial)
        m = {...mat}
    })
    return this.GetMaterial(mat.idmaterial)
  }


  AddProcess(process: Process): boolean {
    this.repoProcess.push(process)
    return true;
  }
  GetAllProcess(): Process[] {
    return this.repoProcess
  }
  GetProcess(id: string): Process {
    let process = this.repoProcess.find(p => p.id == id)
    return process ? process : new Process();
  }
  DeleteProcess(id: string): void {
    this.repoProcess = this.repoProcess.filter(p => p.id == id)
  }
  UpdateProcess(process: Process): Process {
    this.repoProcess.forEach(p =>{
      if(p.id == process.id)
        p = {...process}
    })
    return this.GetProcess(process.id)
  }
}

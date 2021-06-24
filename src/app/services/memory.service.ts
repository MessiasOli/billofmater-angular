import { Material } from '../model/material';
import { Injectable } from '@angular/core';
import { Process } from '../model/process';
import { IrepositoryGateway } from "./interface/IRepository"

@Injectable({
  providedIn: 'root'
})
export class MemoryService implements IrepositoryGateway {

  repoMaterials : Material[] = []
  repoProcess: Process[] =[]

  constructor() {
    this.repoMaterials = [
      {
        idprocess: "1",
        idmaterial: "1",
        description: "Açúcar 1",
        price: 15.55,
        specificvalue: 0.052,
        unitmensurement: "gr"
      },
      {
        idprocess: "2",
        idmaterial: "2",
        description: "Açúcar 2",
        price: 15.55,
        specificvalue: 0.052,
        unitmensurement: "gr"
      }
    ]
  
    this.repoProcess = [
      {
        id : "1",
        process: "Bolo",
        unitmensurement: "kg",
        value: 15.55
      },
      {
        id : "2",
        process: "Cobertura",
        unitmensurement: "kg",
        value: 15.55
      },
    ]
   }
  AddMaterial(mat: Material): boolean {
    this.repoMaterials.push(mat)
    return true;
  }
  GetAllMaterials(idProcess:string): Material[] {
    return this.repoMaterials.filter(mat => mat.idprocess == idProcess);
  }
  GetMaterial(id: string): Material {
    let mat = this.repoMaterials.find(mat => mat.idmaterial == id)
    return mat ? mat : new Material();
  }

  DeleteMaterials(id: string, idProcess: string): void {
    let index = this.repoMaterials.findIndex(mat => mat.idmaterial == id && mat.idprocess == idProcess)
    this.repoMaterials.splice(index, 1)
  }

  UpdateMaterials(mat: Material): Material {
    this.repoMaterials.map((m, i) =>{
      if(m.idmaterial == mat.idmaterial && m.idprocess == mat.idprocess){
        this.repoMaterials[i] = mat
      }
    })
    console.log("Atualizado", this.repoMaterials)
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

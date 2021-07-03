import { Material } from '../model/material';
import { Injectable } from '@angular/core';
import { Process } from '../model/process';
import { IRepository } from "../interface/IRepository"

@Injectable({
  providedIn: 'root'
})
export class MemoryService implements IRepository {

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
  async AddMaterial(mat: Material): Promise<boolean> {
    this.repoMaterials.push(mat)
    return true;
  }

  async GetAllMaterials(): Promise<Material[]> {
    return this.repoMaterials;
  }

  async GetAllMaterialsByProcess(idProcess:string): Promise<Material[]> {
    return this.repoMaterials.filter(mat => mat.idprocess == idProcess);
  }

  GetMaterial(id: string): Material {
    let mat = this.repoMaterials.find(mat => mat.idmaterial == id)
    return mat ? mat : new Material();
  }

  async DeleteMaterials(id: string, idProcess: string): Promise<boolean> {
    let length = this.repoMaterials.length
    let index = this.repoMaterials.findIndex(mat => mat.idmaterial == id && mat.idprocess == idProcess)
    this.repoMaterials.splice(index, 1)

    if(length == this.repoMaterials.length)
      return false;
    return true;
  }

  async UpdateMaterials(mat: Material): Promise<Material>{
    this.repoMaterials.map((m, i) =>{
      if(m.idmaterial == mat.idmaterial && m.idprocess == mat.idprocess){
        this.repoMaterials[i] = mat
      }
    })
    console.log("Atualizado", this.repoMaterials)
    return this.GetMaterial(mat.idmaterial)
  }


  async AddProcess(process: Process): Promise<boolean>{
    this.repoProcess.push(process)
    return true;
  }
  async GetAllProcess(): Promise<Process[]> {
    return this.repoProcess
  }
  GetProcess(id: string): Process {
    let process = this.repoProcess.find(p => p.id == id)
    return process ? process : new Process();
  }

  async DeleteProcess(id: string): Promise<boolean> {
    let length = this.repoProcess.length
    let index = this.repoProcess.findIndex(p => p.id == id)
    this.repoProcess.splice(index, 1)

    if(length == this.repoProcess.length)
      return false;
    return true;
  }

  async UpdateProcess(process: Process): Promise<Process> {
    this.repoProcess.forEach(p =>{
      if(p.id == process.id)
        p = {...process}
    })
    return this.GetProcess(process.id)
  }
}

import axios from "axios"
import { IRepository } from './interface/IRepository';
import { Injectable } from '@angular/core';
import { Material } from '../model/material';
import { Process } from '../model/process';

export var URL_API = "https://b-bom-ra-sc3009572.herokuapp.com/api"
//export var URL_API = "http://localhost:8080/api"
@Injectable({
  providedIn: 'root'
})
export class DbMongooseService implements IRepository {
  processList: Process[] = []
  constructor() {
    this.processList = [
      {
        id : "1",
        process: "Processo 1",
        unitmensurement: "kg",
        value: 15.55
      },
      {
        id : "2",
        process: "Processo 2",
        unitmensurement: "kg",
        value: 100
      },
    ]
   }

  async AddMaterial(mat: Material):Promise<boolean> {
    await axios.post(`${URL_API}/material`, mat)
      .then(res => res.data).then(data => {
        console.log('data :>> ', data);
      })
      .catch(err => {
        console.log(err)
        return false
      }
      )

      return true
  }

  async GetAllMaterials(id: string): Promise<Material[]> {
    let listMat :Material[] = []
    await axios.get(`${URL_API}/material`)
      .then(res => res.data).then(data => {
        console.log('daata :>> ', data);
        listMat = data;
      })
      .catch(console.log)
    return listMat.filter(mat => mat.idprocess == id);
  }

  GetMaterial(id: string): Material {
    throw new Error('Method not implemented.');
  }

  async DeleteMaterials(id: string, idProcess: string): Promise<void> {
    await axios.delete(`${URL_API}/material/${id}/${idProcess}`)
    .then(res => res.data).then(data => {
      console.log('data :>> ', data);
    })
    .catch(err => {
      console.log(err)
    }
    )
  }

  async UpdateMaterials(mat: Material): Promise<Material> {
    let matForUpdate: Material = new Material () 
    
    matForUpdate.idmaterial = mat.idmaterial;
    matForUpdate.idprocess = mat.idprocess;
    matForUpdate.description = mat.description;
    matForUpdate.price = mat.price;
    matForUpdate.specificvalue = mat.specificvalue;
    matForUpdate.unitmensurement = mat.unitmensurement;

    console.log('mat :>> ', matForUpdate);
    await axios.put(`${URL_API}/material`, matForUpdate)
      .then(res => {console.log(res); return res.data}).then(data => {
        console.log('daata :>> ', data);
      })
      .catch(console.log)
    return matForUpdate
  }

  AddProcess(process: Process): boolean {
    throw new Error('Method not implemented.');
  }
  GetAllProcess(): Process[] {
    return this.processList;
  }
  GetProcess(id: string): Process {
    throw new Error('Method not implemented.');
  }
  DeleteProcess(id: string): void {
    throw new Error('Method not implemented.');
  }
  UpdateProcess(process: Process): Process {
    throw new Error('Method not implemented.');
  }
}


import axios, { AxiosInstance }  from "axios"
import { IRepository } from '../interface/IRepository';
import { Injectable } from '@angular/core';
import { Material } from '../model/material';
import { Process } from '../model/process';

//export var URL_API:string = "https://b-bom-ra-sc3009572.herokuapp.com/api"
export var URL_API = "http://localhost:8080/api"
@Injectable({
  providedIn: 'root'
})
export class DbMongooseService implements IRepository {
  processList: Process[] = []
  api: AxiosInstance

  constructor() {
    this.api = axios.create({
      baseURL: URL_API,
      headers: {
        'Access-Control-Allow-Origin' : '*',
        'Access-Control-Allow-Methods' : 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
      }
    })
  }

  async AddMaterial(mat: Material):Promise<boolean> {
    await this.api.post(`/material`, mat)
      .then(res => res.data).then(data => {
        console.log('data :>> ', data);
        return true
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
    await this.api.get(`/material`)
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

  async DeleteMaterials(idProcess: string, id: string): Promise<boolean> {
    let result:boolean = false;
    await this.api.delete(`/material/${idProcess}/${id}`)
    .then(res => res.data).then(data => {
      console.log('data :>> ', data);
      result = true
    })
    .catch(err => {
      console.log(err)
    })
    return result;
  }

  async UpdateMaterials(mat: Material): Promise<Material> {
    let matForUpdate: Material = {
      idmaterial: mat.idmaterial,
      idprocess: mat.idprocess,
      description: mat.description,
      price: mat.price,
      specificvalue: mat.specificvalue,
      unitmensurement: mat.unitmensurement
    }
    
    console.log('mat :>> ', matForUpdate);
    await this.api.put(`/material`, matForUpdate)
      .then(res => {console.log(res); return res.data}).then(data => {
      })
      .catch(console.log)
    return matForUpdate
  }

  async AddProcess(process: Process): Promise<boolean> {
    let result: boolean = false
    await axios.post(`${URL_API}/process`, process)
      .then(res => {
        if(res.status == 200)
          result = true
        else
          result = false
      })
      .catch(err => {
        console.log(err)
        result = false
      })
      return result
  }

  async GetAllProcess(): Promise<Process[]> {
    let process : Process[] = []
    await axios.get(`${URL_API}/process`)
      .then(res => {return res.data}).then(data => {
        process = data;
      })
      .catch(err => {
        console.log(err)
        return []
      })
      return process
  }

  GetProcess(id: string): Process {
    throw new Error('Method not implemented.');
  }

  async DeleteProcess(id: string): Promise<boolean> {
    let result: boolean = false
    await this.api.delete(`/process/${id}`)
    .then(res => res.data).then(data => {
      console.log('data :>> ', data);
      result = true;
    })
    .catch(err => {
      console.log(err)
      result = false
    })
    return result;
  }

  async UpdateProcess(process: Process): Promise<Process> {
    let pro: Process = {
      id: process.id,
      process: process.process,
      unitmensurement: process.unitmensurement,
      value: process.value
    }

    console.log('pro :>> ', pro);
    await this.api.put(`/process`, pro)
      .then(res => {console.log(res); return res.data}).then(data => {
      })
      .catch(console.log)
    return pro;
  }
}

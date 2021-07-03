import { RepositoryService } from 'src/app/database/repository.service';
import { Service } from './../interface/IService';
import { Injectable } from '@angular/core';
import { Material } from '../model/material';

@Injectable({
  providedIn: 'root'
})
export class MeterialService implements Service<Material> {
  constructor(private repository: RepositoryService) { }
  
  async Add(mat: Material): Promise<boolean> {
    return await this.repository.AddMaterial(mat);
  }

  async Remove(mat: Material): Promise<boolean> {
    return await this.repository.DeleteMaterials(mat.idprocess, mat.idmaterial);
  }

  async Update(mat: Material): Promise<Material> {
    return await this.repository.UpdateMaterials(mat)
  }

  FildAll(): Promise<Material[]> {
    return this.repository.GetAllMaterials();
  }

  FindAllByProcess(idProcess : string){
    return this.repository.GetAllMaterialsByProcess(idProcess);
  }

  async Find(id: string): Promise<Material> {
    return (await this.repository.GetAllMaterials()).find(m => m.idmaterial == id) || new Material
  }

  async hasMaterial(idProcess:string, id:string):Promise<string>{
    let description:string = ""
    await this.FindAllByProcess(idProcess).then(data => {
      data.forEach(mat => {
        if (mat.idmaterial == id){
          description = mat.description;
        }
      })
    })
    return description;
  }
}

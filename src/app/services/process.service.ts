import { Material } from 'src/app/model/material';
import { RepositoryService } from '../database/repository.service';
import { Service } from './../interface/IService';
import { Injectable } from '@angular/core';
import { Process } from '../model/process';

@Injectable({
  providedIn: 'root'
})
export class ProcessService implements Service<Process> {

  constructor(private repository: RepositoryService) { }
  async Add(process: Process): Promise<boolean> {
    return this.repository.AddProcess(process)
  }

  async Remove(pro: Process): Promise<boolean> {
    return await this.repository.DeleteProcess(pro.id);
  }

  async CanRemoveProcess(pro: Process, forceDelete: boolean): Promise<number> {
    let material: Material[] = await this.repository.GetAllMaterialsByProcess(pro.id);

    if(!forceDelete && material.length > 0){
      return 1
    }

    material.forEach(mat => {this.repository.DeleteMaterials(mat.idprocess, mat.idmaterial)})
    if(await this.Remove(pro)){
      return 0
    }
    else
      return -1
  }

  async Update(proEdited: Process): Promise<Process> {
    return await this.repository.UpdateProcess(proEdited)
  }

  async FildAll(): Promise<Process[]> {
    return this.repository.GetAllProcess();
  }

  async Find(id: string): Promise<Process> {
    return (await this.repository.GetAllProcess()).find(p => p.id == id) || new Process
  }
}

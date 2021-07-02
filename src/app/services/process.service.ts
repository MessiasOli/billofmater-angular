import { RepositoryService } from '../database/repository.service';
import { Service } from './../interface/IService';
import { Injectable } from '@angular/core';
import { Process } from '../model/process';

@Injectable({
  providedIn: 'root'
})
export class ProcessService implements Service<Process> {

  constructor(private repository: RepositoryService) { }
  Add(any: Process): Promise<boolean> {
    throw new Error('Method not implemented.');
  }
  Remove(any: Process): Promise<boolean> {
    throw new Error('Method not implemented.');
  }
  Update(any: Process): Promise<boolean> {
    throw new Error('Method not implemented.');
  }
  async FildAll(): Promise<Process[]> {
    return await this.repository.GetAllProcess();
  }
  Find(id: string): Promise<Process> {
    throw new Error('Method not implemented.');
  }
}

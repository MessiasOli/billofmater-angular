import { MemoryService } from '../services/memory.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RepositoryService extends MemoryService {
  constructor() {
    super()
   } 
}

import { DbMongooseService } from '../services/db-mongoose.service';
import { MemoryService } from '../services/memory.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RepositoryService extends DbMongooseService {
  constructor() {
    super()
   } 
}

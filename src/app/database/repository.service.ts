import { DbMongooseService } from './db-mongoose.service';
import { MemoryService } from './memory.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RepositoryService extends DbMongooseService {
  constructor() {
    super()
   } 
}

import { Process } from 'src/app/model/process';
import { Material } from './../../model/material';

export interface IRepository {
  AddMaterial(mat:Material): boolean
  GetAllMaterials():Material[]
  GetMaterial(id: string):Material
  DeleteMaterials(id: string):void
  UpdateMaterials(mat:Material):Material

  AddProcess(process:Process): boolean
  GetAllProcess():Process[]
  GetProcess(id: string):Process
  DeleteProcess(id: string):void
  UpdateProcess(process:Process):Process
}
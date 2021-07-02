import { Process } from '../model/process';
import { Material } from '../model/material';

export interface IRepository {
  AddMaterial(mat:Material): Promise<boolean>
  GetAllMaterials(id: string):Promise<Material[]>
  GetMaterial(id: string):Material
  DeleteMaterials(id: string,  idProcess: string):void
  UpdateMaterials(mat:Material):Promise<Material>

  AddProcess(process:Process): boolean
  GetAllProcess():Process[]
  GetProcess(id: string):Process
  DeleteProcess(id: string):void
  UpdateProcess(process:Process):Process
}
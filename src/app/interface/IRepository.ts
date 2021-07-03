import { Process } from '../model/process';
import { Material } from '../model/material';

export interface IRepository {
  AddMaterial(mat:Material): Promise<boolean>
  GetAllMaterials(id: string): Promise<Material[]>
  GetMaterial(id: string):Material
  DeleteMaterials(id: string,  idProcess: string):Promise<boolean>
  UpdateMaterials(mat:Material):Promise<Material>

  AddProcess(process:Process): Promise<boolean>
  GetAllProcess():Promise<Process[]>
  GetProcess(id: string):Process
  DeleteProcess(id: string):Promise<boolean>
  UpdateProcess(process:Process):Promise<Process>
}
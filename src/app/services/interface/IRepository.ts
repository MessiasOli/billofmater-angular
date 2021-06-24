import { Process } from '../../model/process';
import { Material } from '../../model/material';

export interface IrepositoryGateway {
  AddMaterial(mat:Material): boolean
  GetAllMaterials(id: string):Material[]
  GetMaterial(id: string):Material
  DeleteMaterials(id: string,  idProcess: string):void
  UpdateMaterials(mat:Material):Material

  AddProcess(process:Process): boolean
  GetAllProcess():Process[]
  GetProcess(id: string):Process
  DeleteProcess(id: string):void
  UpdateProcess(process:Process):Process

}
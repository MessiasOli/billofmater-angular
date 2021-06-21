import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Material } from 'src/model/material';
import { ToolsService } from './../../services/tools.service';
import { Component, Inject, OnInit } from '@angular/core';
import { Process } from 'src/model/process';
import { MemoryService } from 'src/services/memory.service';
import { SwitchWaitService } from 'src/services/switch-wait.service';

@Component({
  selector: 'app-register-input',
  templateUrl: './register-input.component.html',
  styleUrls: ['./register-input.component.css']
})

export class RegisterInputComponent implements OnInit {
  displayedColumns: string[] = [ "edit", "idmaterial" , "description", "price", "specificvalue", "unitmensurement"];
  checked = false;
  constructor(
      private repository: MemoryService, 
      private wait : SwitchWaitService,
      private tools : ToolsService,
      public dialog : MatDialog
  ) { }
  
    ngOnInit(): void {
      this.wait.switchWait();
      this.materials = this.repository.GetAllMaterials();
      this.process = this.repository.GetAllProcess();
      console.log('this.materials :>> ', this.materials);
      this.wait.switchWait();
    }

  materials : Material[] = []
  selectedMaterial?: Material
  process : Process[] = []
  selectedProcess: string = "";

  openDialog(): void{
    const dialogRef = this.dialog.open(
      DialogRegister, {width: '500px',
      data: new Material}
    );

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.selectedMaterial = result;
      if(this.selectedMaterial)
        this.materials.push(this.selectedMaterial)
      console.log('this.materials :>> ', this.materials);
    });
  }
  
  async updateMaterials() {
    this.wait.switchWait();
    let toSave = 0;
    let saved = 0;
    await this.materials.forEach(async (mat) => {
      let matEdited : Material = this.copyMaterial(mat);
      if (!this.IsEmpty(matEdited)) {
        toSave++;
        console.log("matEdited :>> ", matEdited);
        matEdited.idprocess = !matEdited.idprocess
          ? this.getSelectedIdProcess()
          : matEdited.idprocess;
        this.repository.UpdateMaterials(matEdited)
      }
    });
    if (toSave == saved) this.tools.Request("Atualização realizada com sucesso!");

    setTimeout(() => this.loadMaterials(''), 1000);
    this.wait.switchWait();
  }

  getSelectedIdProcess() {
    let area = this.process.find((a) => a.process == this.selectedProcess);
    return area ? area.id : '';
  }

  async loadMaterials(processid : string) {
    processid = processid ? processid : this.selectedProcess;

    this.materials = new Array();
    let p = this.process.find((a) => a.process == processid);
    this.materials = this.repository.GetAllMaterials();
    console.log("Materiais carregados :>> ", this.materials.length);
    for (let i = 0; i < 10; i++)
      this.materials.push({ ...new Material });
  }

  deleteMaterials(){
    this.tools.Request("Teste")
  }

  IsEmpty(mat : Material) {    
    if (
      !mat.idprocess &&
      !mat.idmaterial &&
      !mat.description &&
      !mat.specificvalue &&
      !mat.price &&
      !mat.unitmensurement
    )
      return true;
    return false;
  }

  copyMaterial(mat: Material) : Material {
    let matEdited : Material = {
      idprocess: mat.idprocess,
      idmaterial: mat.idmaterial,
      description: mat.description,
      price: mat.price,
      specificvalue: mat.specificvalue,
      unitmensurement: mat.unitmensurement,
    };
    return matEdited;
  }
}

@Component({
  selector: 'dialog-register',
  templateUrl: 'dialog-register.html',
  styleUrls: ['./register-input.component.css']
})
export class DialogRegister {

  constructor(
    public dialogRef:  MatDialogRef<DialogRegister>,
    @Inject(MAT_DIALOG_DATA) public material: Material
  ) {}

  onNoClick(): void { 
    this.dialogRef.close();
  }
}
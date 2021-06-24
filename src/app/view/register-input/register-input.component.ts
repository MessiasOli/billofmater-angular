import { RepositoryService } from './../../services/repository.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Material } from '../../model/material';
import { Component, Inject, OnInit } from '@angular/core';
import { Process } from '../../model/process';
import { SwitchWaitService } from '../../services/switch-wait.service';
import { MatTable } from '@angular/material/table';
import { ViewChild } from '@angular/core';

@Component({
  selector: 'app-register-input',
  templateUrl: './register-input.component.html',
  styleUrls: ['./register-input.component.css']
})

export class RegisterInputComponent implements OnInit {
  
  displayedColumns: string[] = [ "edit", "idmaterial" , "description", "price", "specificvalue", "unitmensurement"];
  materials : Material[] = []
  process : Process[] = []
  selectedProcess: string = "";
  selectedProcessId: string = "";
  selectedMaterial: string = "";

  @ViewChild(MatTable) table !: MatTable<Material>;

  constructor(
      private repository: RepositoryService, 
      private wait : SwitchWaitService,
      public dialog : MatDialog,
  ) { }
  
  ngOnInit(): void {
    this.wait.switchWait();
    this.process = this.repository.GetAllProcess();
    this.materials = this.repository.GetAllMaterials(this.selectedProcessId);
    this.wait.switchWait();
  }

  openDialogRegister(matForEdit?: Material): void{
      matForEdit = matForEdit == undefined ? new Material : matForEdit
      const dialogRef = this.dialog.open(
        DialogRegister, 
        {
          width: '500px',
          data: matForEdit
        }
    );
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if (!result)
        return
      let selectedMat : Material = result;
      if(!this.IsEmpty(selectedMat)){
        if(!selectedMat.idprocess)
        {
          selectedMat.idprocess = this.selectedProcessId
          this.repository.AddMaterial(selectedMat)
        }
        else
        {
          console.log("Material editado")
          this.repository.UpdateMaterials(selectedMat)
        }

        this.loadMaterials();
        this.table.renderRows()
        console.log('this.materials :>> ', this.materials);
      }
    });
  }

  async loadMaterials() {
      this.materials = this.repository.GetAllMaterials(this.selectedProcessId);
  }

  async delete(idmaterial: string, description: string){
    const dialogRef = this.dialog.open( DialogQuestion, { width: '350px', data: description });
    dialogRef.afterClosed().subscribe(result => {
      if (result){
        this.repository.DeleteMaterials(idmaterial, this.selectedProcessId)
        this.loadMaterials()
        this.table.renderRows()
      }
    });
  }

  openDialog(description: string): boolean{

    return false;
  }

  update(idmaterial:string)
  {
    let matEdited : Material | undefined = this.materials.find(mat => mat.idmaterial == idmaterial)
    if (matEdited)
      this.openDialogRegister({...matEdited})
    this.table.renderRows()
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

  onChange(id:string){
    this.selectedProcessId = id
    this.loadMaterials()
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

@Component({
  selector: 'dialog-question',
  templateUrl: 'dialog-question.html',
  styleUrls: ['./register-input.component.css']
})
export class DialogQuestion {
  constructor(
    public dialogRef:  MatDialogRef<DialogQuestion>,
    @Inject(MAT_DIALOG_DATA) public description: string 
    ) {}
  onClick(res: boolean): void { 
    this.dialogRef.close(res);
  }
}
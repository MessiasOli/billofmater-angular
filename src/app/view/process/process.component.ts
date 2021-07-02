import { Process } from './../../model/process';

import { MemoryService } from '../../services/memory.service';
import { Component, Inject, OnInit } from '@angular/core';
import { SwitchWaitService } from '../../services/switch-wait.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Material } from 'src/app/model/material';
import { FormControl, Validators } from '@angular/forms';
import { MyErrorStateMatcher } from '../register-input/register-input.component';
import { RepositoryService } from 'src/app/services/repository.service';
import { MatTable } from '@angular/material/table';
import { ViewChild } from '@angular/core';

@Component({
  selector: 'app-process',
  templateUrl: './process.component.html',
  styleUrls: ['./process.component.css']
})
export class ProcessComponent implements OnInit {

  constructor(
    private repository: MemoryService, 
    private wait : SwitchWaitService,
    public dialog : MatDialog
  ) { }
  @ViewChild(MatTable) table !: MatTable<Material>;
  displayedColumns: string[] = [ "edit", "id" , "process", "value", "unitmensurement"];
  process: Process[] = []
  newProcess: boolean = false
  processForEdit?: Process

  ngOnInit(): void {
    this.wait.switchWait();
    this.process = this.repository.GetAllProcess()
    this.wait.switchWait();
  }

  openDialogRegister(){
    if(this.processForEdit == undefined){
      this.processForEdit =  new Process
      this.newProcess = true
    }else{
      this.newProcess = false
    }

      const dialogRef = this.dialog.open(
        DialogProcessRegister, 
        {
          width: '500px',
          data: this.processForEdit
        }
    );
    dialogRef.afterClosed().subscribe( async result => {
      if (!result)
        return
      console.log('result :>> ', result);

      if(!this.IsEmpty(result)){
        if(this.processForEdit)
        {
          await this.repository.AddMaterial(result)
        }
        else
        {
          console.log("Material editado")
          await this.repository.UpdateMaterials(result)
        }

        await this.loadProcess();
        if (this.table) {
          this.table.setNoDataRow(null)
          this.table.renderRows()
        }
        console.log('Finalizado a atualização :>> ', this.process);
      }
    });
  }

  update(id:string){

  }

  delete(id:string){

  }

  loadProcess():Process[]{
    return []
  }

  IsEmpty(process: Process):boolean{
    return true
  }

}

@Component({
  selector: 'dialog-process-register',
  templateUrl: 'dialog-process-register.html',
  styleUrls: ['./process.component.css']
})
export class DialogProcessRegister implements OnInit {
  constructor(
    public repository : RepositoryService,
    public dialogRef:  MatDialogRef<DialogProcessRegister>,
    @Inject(MAT_DIALOG_DATA) public material: Material
  ) {}

  ngOnInit(): void {
    this.newMaterial = this.material.idmaterial ? false : true
    if(!this.newMaterial){
      this.idmaterial.disable();
    }
  }

  idmaterial = new FormControl('',[ Validators.required])
  description = new FormControl('',[Validators.required])
  price = new FormControl('',[Validators.required])
  specificvalue = new FormControl('',[Validators.required])
  unitmensurement = new FormControl('',[Validators.required])
  matcher = new MyErrorStateMatcher();
  public materialConflicted: string = ''
  public idValidated: boolean = false;
  newMaterial : boolean = false;

  async validateId():Promise<boolean>{
    let isInvalid = false
    let idProcess = this.material.idprocess
    await this.repository.GetAllMaterials(idProcess).then(data => {
      data.forEach(mat => {
        if (mat.idmaterial == this.material.idmaterial){
          this.materialConflicted = mat.description;
          isInvalid = true
        }
      })
    })
    return isInvalid
  }

  async onClick(res:boolean) { 
    console.log('res :>> ', res);
    if(res && await this.validateId() && this.newMaterial){
      this.idValidated = true
      return
    }
    else if(!res){
      this.dialogRef.close()
      return
    }

    if(this.checkAllFieldsOK()){
      console.log('material editado *** :>> ', this.material);
      this.dialogRef.close({...this.material});
    }

    this.material = new Material;
  }

  onKewDown(event:any){
    this.idValidated = false;
  }

  checkAllFieldsOK():boolean{
    if (this.idmaterial.status == "INVALID" ||
        this.description.status == "INVALID" ||
        this.price.status == "INVALID" ||
        this.specificvalue.status == "INVALID" ||
        this.unitmensurement.status == "INVALID")
      return false
    return true
  }
}

@Component({
  selector: 'dialog-question',
  templateUrl: '../dialog/dialog-question.html',
  styleUrls: ['./process.component.css']
})
export class DialogProcessQuestion {
  constructor(
    public dialogRef:  MatDialogRef<DialogProcessQuestion>,
    @Inject(MAT_DIALOG_DATA) public description: string 
    ) {}
  onClick(res: boolean): void { 
    this.dialogRef.close(res);
  }
}

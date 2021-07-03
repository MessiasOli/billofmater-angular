import { Service } from './../../interface/IService';
import { ProcessService } from './../../services/process.service';
import { Process } from './../../model/process';
import { Component, Inject, OnInit } from '@angular/core';
import { SwitchWaitService } from '../../services/switch-wait.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl, Validators } from '@angular/forms';
import { MyErrorStateMatcher } from '../register-input/register-input.component';
import { RepositoryService } from 'src/app/database/repository.service';
import { MatTable } from '@angular/material/table';
import { ViewChild } from '@angular/core';

@Component({
  selector: 'app-process',
  templateUrl: './process.component.html',
  styleUrls: ['./process.component.css']
})
export class ProcessComponent implements OnInit {

  constructor(
    private service: ProcessService,
    private wait : SwitchWaitService,
    public dialog : MatDialog
  ) { }
  @ViewChild(MatTable) table !: MatTable<Process>;
  displayedColumns: string[] = [ "edit", "id" , "process", "value", "unitmensurement"];
  process: Process[] = []
  newProcess: boolean = false
  processForEdit?: Process

  async ngOnInit(): Promise<void> {
    this.wait.switchWait();
    this.process = await this.service.FildAll()
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
    });
    dialogRef.afterClosed().subscribe( async result => {
      if (!result)
        return
      console.log('result :>> ', result);

      if(this.processForEdit)
      {
        await this.service.Add(result)
      }
      else
      {
        console.log("Material editado")
        await this.service.Update(result)
      }

      await this.loadProcess();
      if (this.table) {
        this.table.setNoDataRow(null)
        this.table.renderRows()
      }
      console.log('Finalizado a atualização :>> ', this.process);
    });
  }

  update(id:string){

  }

  delete(id:string){

  }

  loadProcess():Process[]{
    return []
  }

}

@Component({
  selector: 'dialog-process-register',
  templateUrl: 'dialog-process-register.html',
  styleUrls: ['./process.component.css']
})
export class DialogProcessRegister implements OnInit {
  constructor(
    public service : ProcessService,
    public dialogRef:  MatDialogRef<DialogProcessRegister>,
    @Inject(MAT_DIALOG_DATA) public process: Process
  ) {}

  ngOnInit(): void {
    this.newProcess = this.process.id ? false : true
    if(!this.newProcess){
      this.idProcess.disable();
    }
  }

  idProcess = new FormControl('',[ Validators.required])
  description = new FormControl('',[Validators.required])
  value = new FormControl('',[Validators.required])
  unitmensurement = new FormControl('',[Validators.required])
  matcher = new MyErrorStateMatcher();
  public processConflicted: string = ''
  public idValidated: boolean = false;
  newProcess : boolean = false;

  async validateId():Promise<boolean>{
    let isInvalid = false
    await this.service.FildAll().then(data => {
      data.forEach(p => {
        if (p.id == this.process.id){
          this.processConflicted = p.process;
          isInvalid = true
        }
      })
    })
    return isInvalid
  }

  async onClick(res:boolean) { 
    console.log('res :>> ', res);
    if(res && await this.validateId() && this.newProcess){
      this.idValidated = true
      return
    }
    else if(!res){
      this.dialogRef.close()
      return
    }

    if(this.checkAllFieldsOK()){
      console.log('material editado *** :>> ', this.process);
      this.dialogRef.close({...this.process});
    }

    this.process = new Process;
  }

  onKewDown(event:any){
    this.idValidated = false;
  }

  checkAllFieldsOK():boolean{
    if (this.idProcess.status == "INVALID" ||
        this.description.status == "INVALID" ||
        this.value.status == "INVALID" ||
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

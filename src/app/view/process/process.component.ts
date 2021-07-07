import { ToolsService } from './../../services/tools.service';
import { Question } from './../../model/question';
import { ProcessService } from './../../services/process.service';
import { Process } from './../../model/process';
import { Component, Inject, OnInit } from '@angular/core';
import { SwitchWaitService } from '../../services/switch-wait.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl, Validators } from '@angular/forms';
import { MyErrorStateMatcher } from '../register-input/register-input.component';
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
    public dialog : MatDialog,
    private tools : ToolsService
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

  openDialogRegister(processForEdit?: Process){
    if(processForEdit == undefined){
      processForEdit =  new Process
      this.newProcess = true
    }else{
      this.newProcess = false
    }

    const dialogRef = this.dialog.open(
      DialogProcessRegister, 
      {
        width: '500px',
        data: {...processForEdit}
    });
    dialogRef.afterClosed().subscribe( async result => {
      if (!result)
        return

      if(this.newProcess){
        if(await this.service.Add(result))
          this.tools.alert("Processo inserido com sucesso!")
      } else {
        if(await this.service.Update(result))
          this.tools.alert("Processo editado com sucesso!")
      }

      this.reload();
      console.log('Finalizado a atualização :>> ', this.process);
    });
  }

  update(id:string){
    let processForEdit = this.process.find(p => p.id == id) || new Process
    this.openDialogRegister(processForEdit)
  }

  async delete(id:string){
    let processForDelete: Process = this.process.find(p => p.id == id) || new Process

    const dialogRef = this.dialog.open( DialogProcessQuestion, { 
      data: {
        question: "Deseja apagar este processo: ", 
        description: processForDelete.process 
      }
    });
    dialogRef.afterClosed().subscribe(async result => {
      let conflict = 0
      if(result){
        conflict = await this.service.CanRemoveProcess(processForDelete, false)
        if(conflict == 1){
          const canDelete = this.dialog.open(DialogProcessQuestion, {
            data: {
              question: "Há materiais cadastrados para este processo, deseja continuar", 
              description: ""
            }   
          })
          canDelete.afterClosed().subscribe(async res => {
            if (res){
              conflict = await this.service.CanRemoveProcess(processForDelete, true)
              if(conflict == 0) {
                this.reload();
                this.tools.alert("Processo e materiais apagados com sucesso!")
              }
              if(conflict == -1) this.tools.alertError();
            }

          })
        }
        if(conflict == 0){
          this.reload();
          this.tools.alert("Processo apagado com sucesso!")
        }
        if(conflict == -1) this.tools.alertError()
      }
    })
  }

  async reload(){
    await this.loadProcess();
    if (this.table) {
      this.table.setNoDataRow(null)
      this.table.renderRows()
    }
  }

  async loadProcess():Promise<void>{
    this.process = await this.service.FildAll();
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
    @Inject(MAT_DIALOG_DATA) public model: Question 
    ) {}
  onClick(res: boolean): void { 
    this.dialogRef.close(res);
  }
}

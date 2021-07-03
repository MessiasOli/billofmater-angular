import { ToolsService } from './../../services/tools.service';
import { ProcessService } from './../../services/process.service';
import { Question } from './../../model/question';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Material } from '../../model/material';
import { Component, Inject, OnInit } from '@angular/core';
import { Process } from '../../model/process';
import { SwitchWaitService } from '../../services/switch-wait.service';
import { MatTable } from '@angular/material/table';
import { ViewChild } from '@angular/core';
import { ErrorStateMatcher } from '@angular/material/core';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { MeterialService } from 'src/app/services/meterial.service';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState( control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

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
  newMaterial: boolean = false;

  @ViewChild(MatTable) table !: MatTable<Material>;

  constructor(
      private serviceMat: MeterialService, 
      private servicePro: ProcessService, 
      private wait : SwitchWaitService,
      public dialog : MatDialog,
      private tools : ToolsService
  ) { }
  
  async ngOnInit(): Promise<void> {
    this.process = await this.servicePro.FildAll();
    this.loadMaterials()
  }

  openDialogRegister(matForEdit?: Material){
    if(matForEdit == undefined){
      matForEdit =  new Material
      this.newMaterial = true
    }else{
      this.newMaterial = false
    }

      matForEdit.idprocess = this.selectedProcessId
      const dialogRef = this.dialog.open(
        DialogInputRegister, { data: matForEdit }
    );
    dialogRef.afterClosed().subscribe( async result => {
      if (!result)
        return

      if(this.newMaterial)
      {
        result.idprocess = this.selectedProcessId
        if(await this.serviceMat.Add(result))
          this.tools.alert("Material adicionado com sucesso!")
        else
          this.tools.alertError()
      }
      else
      {
        console.log("Material editado")
        if(await this.serviceMat.Update(result))
          this.tools.alert("Material Atualizado com sucesso!")
        else
          this.tools.alertError()
      }

      await this.loadMaterials();
      if (this.table) {
        this.table.setNoDataRow(null)
        this.table.renderRows()
      }
    })
  }

  async loadMaterials() {
    this.wait.switchWait();
    this.materials = []
    this.materials = await this.serviceMat.FindAllByProcess(this.selectedProcessId);
    this.wait.switchWait();
  }

  async delete(idmaterial: string, description: string){
    const dialogRef = this.dialog.open( DialogQuestion, { 
      data: { question: "Deseja apagar apagar esse material: ", description: description } });
      
    dialogRef.afterClosed().subscribe(async result => {
      if (result){
        let matToDelete: Material = this.materials.find(m => m.idmaterial = idmaterial) || new Material

        if(await this.serviceMat.Remove(matToDelete))
          this.tools.alert("Material deletado com sucesso!")
        else
          this.tools.alertError()

        await this.loadMaterials()
        if (this.table) 
          this.table.renderRows()
      }
    });
  }

  update(idmaterial:string)
  {
    let matEdited : Material | undefined = this.materials.find(mat => mat.idmaterial == idmaterial)
    if (matEdited)
      this.openDialogRegister({...matEdited})
  }

  onChange(id:string){
    this.selectedProcessId = id
    this.loadMaterials()
  }
}

@Component({
  selector: 'dialog-input-register',
  templateUrl: 'dialog-input-register.html',
  styleUrls: ['./register-input.component.css']
})
export class DialogInputRegister implements OnInit {
  constructor(
    public service : MeterialService,
    public dialogRef:  MatDialogRef<DialogInputRegister>,
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
    this.materialConflicted = await this.service.hasMaterial(this.material.idprocess, this.material.idmaterial)
    return this.materialConflicted != ""
  }

  async onClick(res:boolean) { 
    if(res && await this.validateId() && this.newMaterial){
      this.idValidated = true
      return
    }
    else if(!res){
      this.dialogRef.close()
      return
    }

    if(this.checkAllFieldsOK()){
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
  styleUrls: ['./register-input.component.css']
})
export class DialogQuestion {
  constructor(
    public dialogRef:  MatDialogRef<DialogQuestion>,
    @Inject(MAT_DIALOG_DATA) public model: Question,
    ) {}
  onClick(res: boolean): void { 
    this.dialogRef.close(res);
  }
}
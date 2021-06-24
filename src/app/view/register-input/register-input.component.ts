
import { RepositoryService } from './../../services/repository.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Material } from '../../model/material';
import { Component, Inject, OnInit } from '@angular/core';
import { Process } from '../../model/process';
import { SwitchWaitService } from '../../services/switch-wait.service';
import { MatTable } from '@angular/material/table';
import { ViewChild } from '@angular/core';
import { ErrorStateMatcher } from '@angular/material/core';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';


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
    if(matForEdit == undefined){
      matForEdit =  new Material
      this.newMaterial = true
    }else{
      this.newMaterial = false
    }

      matForEdit.idprocess = this.selectedProcessId
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
      console.log('result :>> ', result);

      if(!this.IsEmpty(result)){
        if(this.newMaterial)
        {
          result.idprocess = this.selectedProcessId
          this.repository.AddMaterial(result)
        }
        else
        {
          console.log("Material editado")
          this.repository.UpdateMaterials(result)
        }

        this.loadMaterials();
        if (this.table) 
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

    if (this.table) 
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
export class DialogRegister implements OnInit {
  constructor(
    public repository : RepositoryService,
    public dialogRef:  MatDialogRef<DialogRegister>,
    @Inject(MAT_DIALOG_DATA) public material: Material
  ) {}

  ngOnInit(): void {
    this.newMaterial = this.material.idmaterial ? false : true
    if(!this.newMaterial)
      this.idmaterial.disable();
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

  validateId():boolean{
    let isInvalid = false
    let idProcess = this.material.idprocess
    this.repository.GetAllMaterials(idProcess).forEach(mat => {
      if (mat.idmaterial == this.material.idmaterial){
        this.materialConflicted = mat.description;
        isInvalid = true
      }
    })
    return isInvalid
  }

  onClick(res:boolean): void { 
    if(res && this.validateId() && this.newMaterial){
      this.idValidated = true
      return
    }
    else if(!res)
      this.dialogRef.close()
    
    if(this.checkAllFieldsOK())
      this.dialogRef.close(this.material);
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
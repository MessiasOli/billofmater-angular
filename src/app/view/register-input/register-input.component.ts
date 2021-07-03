
import { RepositoryService } from '../../database/repository.service';
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
  
  async ngOnInit(): Promise<void> {
    this.process = await this.repository.GetAllProcess();
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
        DialogInputRegister, 
        {
          width: '500px',
          data: matForEdit
        }
    );
    dialogRef.afterClosed().subscribe( async result => {
      if (!result)
        return
      console.log('result :>> ', result);

      if(!this.IsEmpty(result)){
        if(this.newMaterial)
        {
          result.idprocess = this.selectedProcessId
          await this.repository.AddMaterial(result)
        }
        else
        {
          console.log("Material editado")
          await this.repository.UpdateMaterials(result)
        }

        await this.loadMaterials();
        if (this.table) {
          this.table.setNoDataRow(null)
          this.table.renderRows()
        }
        console.log('Finalizado a atualização :>> ', this.materials);
      }
    });
  }

  async loadMaterials() {
    this.wait.switchWait();
    this.materials = []
    this.materials = await this.repository.GetAllMaterials(this.selectedProcessId);
    console.log('this.materials :>> ', this.materials);
    this.wait.switchWait();
  }

  async delete(idmaterial: string, description: string){
    const dialogRef = this.dialog.open( DialogQuestion, { width: '500px', data: description });
    dialogRef.afterClosed().subscribe(async result => {
      if (result){
        await this.repository.DeleteMaterials(this.selectedProcessId,idmaterial)
        await this.loadMaterials()
        if (this.table) 
          this.table.renderRows()
      }
    });
  }

  update(idmaterial:string)
  {
    let matEdited : Material | undefined = this.materials.find(mat => mat.idmaterial == idmaterial)
    console.log('matEdited :>> ', matEdited);
    if (matEdited)
      this.openDialogRegister({...matEdited})
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
    console.log('id :>> ', id);
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
    public repository : RepositoryService,
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
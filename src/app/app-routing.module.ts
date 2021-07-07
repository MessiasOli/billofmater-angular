import { ResumeComponent } from './view/resume/resume.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './view/home/home.component'
import { RegisterInputComponent } from './view/register-input/register-input.component'
import { ProcessComponent } from './view/process/process.component'
import { BillOfMaterialComponent } from './view/bill-of-material/bill-of-material.component'


const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: "home"
  },
  {
    path: "*",
    redirectTo: "home"
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'process',
    component: ProcessComponent
  },
  {
    path: 'registerInput',
    component: RegisterInputComponent
  },
  {
    path:"billofmaterial",
    component: BillOfMaterialComponent
  },
  {
    path:"resume",
    component: ResumeComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

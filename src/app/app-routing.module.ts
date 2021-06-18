import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './view/home/home.component'
import { RegisterInputComponent } from './view/register-input/register-input.component'
import { ProcessComponent } from './view/process/process.component'
import { BillOfMaterialComponent } from './view/bill-of-material/bill-of-material.component'


const routes: Routes = [
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
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

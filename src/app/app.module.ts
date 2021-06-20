import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FooterComponent } from '../template/footer/footer.component';
import { HeaderComponent } from '../template/header/header.component';
import { MenuComponent } from '../template/menu/menu.component';
import { ContentComponent } from '../template/content/content.component';
import { HomeComponent } from '../view/home/home.component';
import { BillOfMaterialComponent } from '../view/bill-of-material/bill-of-material.component';
import { RegisterInputComponent } from '../view/register-input/register-input.component';
import { ProcessComponent } from '../view/process/process.component';
import { FormmaterialComponent } from '../view/formmaterial/formmaterial.component';


import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';


@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HeaderComponent,
    MenuComponent,
    ContentComponent,
    HomeComponent,
    BillOfMaterialComponent,
    RegisterInputComponent,
    ProcessComponent,
    FormmaterialComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatProgressBarModule,
    MatToolbarModule,
    MatCardModule,
    MatSelectModule,
    MatButtonModule,
    MatSnackBarModule,
    MatIconModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { NgModule } from '@angular/core';
import { BrowserModule} from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatToolbarModule} from '@angular/material/toolbar';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import {MatIconModule} from '@angular/material/icon';
import {MatSidenavModule} from '@angular/material/sidenav';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { TrendsComponent } from './trends/trends.component';
import { HeaderComponent } from './header/header.component'
import {MatSelectModule} from '@angular/material/select';
import {MatButtonModule} from '@angular/material/button';
import { GetProfsService } from './get-profs.service';
import { HttpClientModule } from '@angular/common/http';
import {MatTableModule} from '@angular/material/table';
import {MatCardModule} from '@angular/material/card';
import { ProfsComponent } from './profs/profs.component';
import {MatDividerModule} from '@angular/material/divider';
import {MatDialogModule} from '@angular/material/dialog';
import { DialogComponent } from './dialog/dialog.component';
import {MatInputModule} from '@angular/material/input';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';



@NgModule({
  imports:[ 
    BrowserModule,
   FormsModule, 
   MatToolbarModule,
   MatIconModule,
   MatSidenavModule,
   BrowserAnimationsModule,
   AppRoutingModule,
   MatSelectModule,
   MatButtonModule,
   HttpClientModule,
   MatTableModule,
   MatCardModule,
   ReactiveFormsModule,
   MatDividerModule,
   MatDialogModule,
   MatInputModule,
   ServiceWorkerModule.register('ngsw-worker.js')
   ],
  declarations: [ AppComponent, HomeComponent, TrendsComponent, HeaderComponent, ProfsComponent, DialogComponent ],
  bootstrap:    [ AppComponent ],
  providers: [GetProfsService],
  entryComponents: [DialogComponent],
})
export class AppModule { }

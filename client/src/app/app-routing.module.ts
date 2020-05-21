import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from './home/home.component'
import {TrendsComponent} from './trends/trends.component'
import { ProfsComponent } from './profs/profs.component';

const routes: Routes = [
  {path:'',component:HomeComponent},
  {path:'trends',component:TrendsComponent},
  {path:'prof/:name',component:ProfsComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

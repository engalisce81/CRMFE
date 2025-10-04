import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListUnitComponent } from './list-unit/list-unit.component';
import { CreateUnitComponent } from './create-unit/create-unit.component';
import { UpdateUnitComponent } from './update-unit/update-unit.component';

const routes: Routes = [
  {path:"",pathMatch:'full',component:ListUnitComponent},
  {path:"create",pathMatch:'full',component:CreateUnitComponent},
  {path:"update/:id",pathMatch:'full',component:UpdateUnitComponent},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UnitRoutingModule { }

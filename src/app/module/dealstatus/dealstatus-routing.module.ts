import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListDealstatusComponent } from './list-dealstatus/list-dealstatus.component';
import { CreateDealstatusComponent } from './create-dealstatus/create-dealstatus.component';
import { UpdateDealstatusComponent } from './update-dealstatus/update-dealstatus.component';

const routes: Routes = [
  {path:'',pathMatch:'full',component:ListDealstatusComponent},
  {path:'create',pathMatch:'full',component:CreateDealstatusComponent},
  {path:'update/:id',pathMatch:'full',component:UpdateDealstatusComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DealstatusRoutingModule { }

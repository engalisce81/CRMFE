import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListLeadComponent } from './list-lead/list-lead.component';
import { CreateLeadComponent } from './create-lead/create-lead.component';
import { UpdateLeadComponent } from './update-lead/update-lead.component';

const routes: Routes = [
  {path:'',pathMatch:'full',component:ListLeadComponent},
  {path:'create',pathMatch:'full',component:CreateLeadComponent},
  {path:'update/:id',pathMatch:'full',component:UpdateLeadComponent}

  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LeadRoutingModule { }

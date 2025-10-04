import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListDealComponent } from './list-deal/list-deal.component';
import { CreateDealComponent } from './create-deal/create-deal.component';
import { UpdateDealComponent } from './update-deal/update-deal.component';

const routes: Routes = [
  {path:'',pathMatch:'full',component:ListDealComponent},
  {path:'create',pathMatch:'full',component:CreateDealComponent},
  {path:'update/:id',pathMatch:'full',component:UpdateDealComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DealRoutingModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListFinishComponent } from './list-finish/list-finish.component';
import { CreateFinishComponent } from './create-finish/create-finish.component';
import { UpdateFinishComponent } from './update-finish/update-finish.component';

const routes: Routes = [
  {path:'' ,pathMatch:'full' ,component:ListFinishComponent},
  {path:'create' ,pathMatch:'full' ,component:CreateFinishComponent},
  {path:'update/:id' ,pathMatch:'full' ,component:UpdateFinishComponent}


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FinishRoutingModule { }

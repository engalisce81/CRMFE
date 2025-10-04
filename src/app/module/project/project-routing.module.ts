import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListProjectComponent } from './list-project/list-project.component';
import { CreateProjectComponent } from './create-project/create-project.component';
import { UpdateProjectComponent } from './update-project/update-project.component';

const routes: Routes = [
  {path:'' , pathMatch:'full' ,component:ListProjectComponent},
  {path:'create' , pathMatch:'full' ,component:CreateProjectComponent},
  {path:'update/:id' , pathMatch:'full' ,component:UpdateProjectComponent}


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectRoutingModule { }

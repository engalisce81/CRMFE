import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListFloorComponent } from './list-floor/list-floor.component';
import { CreateFloorComponent } from './create-floor/create-floor.component';
import { UpdateFloorComponent } from './update-floor/update-floor.component';

const routes: Routes = [
  {path:'',pathMatch:'full',component:ListFloorComponent},
  {path:'create',pathMatch:'full',component:CreateFloorComponent},
  {path:'update/:id',pathMatch:'full',component:UpdateFloorComponent}


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FloorRoutingModule { }

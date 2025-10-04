import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  
  {
    path: '',
    pathMatch: 'full',
    loadChildren: () => import('./home/home.module').then(m => m.HomeModule),
  },

  {
    path: 'units',
    loadChildren: () => import('./module/unit/unit.module').then(m => m.UnitModule),
  },

  {
    path: 'projects',
    loadChildren: () => import('./module/project/project.module').then(m => m.ProjectModule),
  },
  
  {
    path: 'leads',
    loadChildren: () => import('./module/lead/lead.module').then(m => m.LeadModule),
  },

  {
    path: 'finishes',
    loadChildren: () => import('./module/finish/finish.module').then(m => m.FinishModule),
  },
  
  {
    path: 'floors',
    loadChildren: () => import('./module/floor/floor.module').then(m => m.FloorModule),
  },
   {
    path: 'deals',
    loadChildren: () => import('./module/deal/deal.module').then(m => m.DealModule),
  },
   {
    path: 'dealstatuses',
    loadChildren: () => import('./module/dealstatus/dealstatus.module').then(m => m.DealstatusModule),
  },
  
  {
    path: 'accountc',
    loadChildren: () => import('./module/account-custom/account-custom.module').then(m => m.AccountCustomModule),
  },

  {
    path: 'account',
    loadChildren: () => import('@abp/ng.account').then(m => m.AccountModule.forLazy()),
  },
  
  {
    path: 'identity',
    loadChildren: () => import('@abp/ng.identity').then(m => m.IdentityModule.forLazy()),
  },
  
  {
    path: 'tenant-management',
    loadChildren: () =>
      import('@abp/ng.tenant-management').then(m => m.TenantManagementModule.forLazy()),
  },
  
  {
    path: 'setting-management',
    loadChildren: () =>
      import('@abp/ng.setting-management').then(m => m.SettingManagementModule.forLazy()),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {})],
  exports: [RouterModule],
})
export class AppRoutingModule {}

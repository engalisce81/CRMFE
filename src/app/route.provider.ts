import { RoutesService, eLayoutType } from '@abp/ng.core';
import { APP_INITIALIZER } from '@angular/core';

export const APP_ROUTE_PROVIDER = [
  { provide: APP_INITIALIZER, useFactory: configureRoutes, deps: [RoutesService], multi: true },
];

function configureRoutes(routesService: RoutesService) {
  return () => {
    routesService.add([
      {
        path: '/',
        name: '::Menu:Home',
        iconClass: 'fas fa-home',
        order: 1,
        layout: eLayoutType.application,
      },
      {
        path: 'units',
        name: 'الوحدات',
        iconClass: 'fas fa-home',
        order: 2,
        layout: eLayoutType.application,
      },
      {
        path: 'projects',
        name: 'المشاريع',
        iconClass: 'fas fa-home',
        order: 3,
        layout: eLayoutType.application,
      },
      {
        path: 'leads',
        name: 'العملاء',
        iconClass: 'fas fa-home',
        order: 4,
        layout: eLayoutType.application,
      },
      {
        path: 'finishes',
        name: 'نوع التشطيب',
        iconClass: 'fas fa-home',
        order: 5,
        layout: eLayoutType.application,
      },
      
      {
        path: 'floors',
        name: 'الطوابق',
        iconClass: 'fas fa-home',
        order: 6,
        layout: eLayoutType.application,
      },

      {
        path: 'deals',
        name: 'الاتفاقيات',
        iconClass: 'fas fa-home',
        order: 7,
        layout: eLayoutType.application,
      },

      {
        path: 'dealstatuses',
        name: 'نوع الاتفاقيات',
        iconClass: 'fas fa-home',
        order: 7,
        layout: eLayoutType.application,
      },
    ]);
  };
}

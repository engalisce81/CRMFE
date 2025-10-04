import type { CreateUpdateUnitDto, UnitDto } from './models';
import { RestService, Rest } from '@abp/ng.core';
import type { PagedResultDto } from '@abp/ng.core';
import { Injectable } from '@angular/core';
import type { LookupDto } from '../lookups/models';
import type { ResponseApi } from '../response/models';

@Injectable({
  providedIn: 'root',
})
export class UnitService {
  apiName = 'Default';
  

  create = (input: CreateUpdateUnitDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, ResponseApi<UnitDto>>({
      method: 'POST',
      url: '/api/app/unit',
      body: input,
    },
    { apiName: this.apiName,...config });
  

  delete = (id: string, config?: Partial<Rest.Config>) =>
    this.restService.request<any, void>({
      method: 'DELETE',
      url: `/api/app/unit/${id}`,
    },
    { apiName: this.apiName,...config });
  

  get = (id: string, config?: Partial<Rest.Config>) =>
    this.restService.request<any, ResponseApi<UnitDto>>({
      method: 'GET',
      url: `/api/app/unit/${id}`,
    },
    { apiName: this.apiName,...config });
  

  getList = (pageNumber: number, pageSize: number, search: string, config?: Partial<Rest.Config>) =>
    this.restService.request<any, PagedResultDto<UnitDto>>({
      method: 'GET',
      url: '/api/app/unit',
      params: { pageNumber, pageSize, search },
    },
    { apiName: this.apiName,...config });
  

  getUnitsLookup = (config?: Partial<Rest.Config>) =>
    this.restService.request<any, PagedResultDto<LookupDto>>({
      method: 'GET',
      url: '/api/app/unit/units-lookup',
    },
    { apiName: this.apiName,...config });
  

  update = (id: string, input: CreateUpdateUnitDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, ResponseApi<UnitDto>>({
      method: 'PUT',
      url: `/api/app/unit/${id}`,
      body: input,
    },
    { apiName: this.apiName,...config });

  constructor(private restService: RestService) {}
}

import type { CreateUpdateUnitTypeDto, UnitTypeDto } from './models';
import { RestService, Rest } from '@abp/ng.core';
import type { PagedResultDto } from '@abp/ng.core';
import { Injectable } from '@angular/core';
import type { LookupDto } from '../lookups/models';
import type { ResponseApi } from '../response/models';

@Injectable({
  providedIn: 'root',
})
export class UnitTypeService {
  apiName = 'Default';
  

  create = (input: CreateUpdateUnitTypeDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, ResponseApi<UnitTypeDto>>({
      method: 'POST',
      url: '/api/app/unit-type',
      body: input,
    },
    { apiName: this.apiName,...config });
  

  delete = (id: string, config?: Partial<Rest.Config>) =>
    this.restService.request<any, void>({
      method: 'DELETE',
      url: `/api/app/unit-type/${id}`,
    },
    { apiName: this.apiName,...config });
  

  get = (id: string, config?: Partial<Rest.Config>) =>
    this.restService.request<any, ResponseApi<UnitTypeDto>>({
      method: 'GET',
      url: `/api/app/unit-type/${id}`,
    },
    { apiName: this.apiName,...config });
  

  getList = (pageNumber: number, pageSize: number, search: string, config?: Partial<Rest.Config>) =>
    this.restService.request<any, PagedResultDto<UnitTypeDto>>({
      method: 'GET',
      url: '/api/app/unit-type',
      params: { pageNumber, pageSize, search },
    },
    { apiName: this.apiName,...config });
  

  getUnittypesLookup = (config?: Partial<Rest.Config>) =>
    this.restService.request<any, PagedResultDto<LookupDto>>({
      method: 'GET',
      url: '/api/app/unit-type/unittypes-lookup',
    },
    { apiName: this.apiName,...config });
  

  update = (id: string, input: CreateUpdateUnitTypeDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, ResponseApi<UnitTypeDto>>({
      method: 'PUT',
      url: `/api/app/unit-type/${id}`,
      body: input,
    },
    { apiName: this.apiName,...config });

  constructor(private restService: RestService) {}
}

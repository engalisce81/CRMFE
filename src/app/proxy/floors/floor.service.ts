import type { CreateUpdateFloorDto, FloorDto } from './models';
import { RestService, Rest } from '@abp/ng.core';
import type { PagedResultDto } from '@abp/ng.core';
import { Injectable } from '@angular/core';
import type { LookupDto } from '../lookups/models';
import type { ResponseApi } from '../response/models';

@Injectable({
  providedIn: 'root',
})
export class FloorService {
  apiName = 'Default';
  

  create = (input: CreateUpdateFloorDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, ResponseApi<FloorDto>>({
      method: 'POST',
      url: '/api/app/floor',
      body: input,
    },
    { apiName: this.apiName,...config });
  

  delete = (id: string, config?: Partial<Rest.Config>) =>
    this.restService.request<any, void>({
      method: 'DELETE',
      url: `/api/app/floor/${id}`,
    },
    { apiName: this.apiName,...config });
  

  get = (id: string, config?: Partial<Rest.Config>) =>
    this.restService.request<any, ResponseApi<FloorDto>>({
      method: 'GET',
      url: `/api/app/floor/${id}`,
    },
    { apiName: this.apiName,...config });
  

  getFloorsLookup = (config?: Partial<Rest.Config>) =>
    this.restService.request<any, PagedResultDto<LookupDto>>({
      method: 'GET',
      url: '/api/app/floor/floors-lookup',
    },
    { apiName: this.apiName,...config });
  

  getList = (pageNumber: number, pageSize: number, search: string, config?: Partial<Rest.Config>) =>
    this.restService.request<any, PagedResultDto<FloorDto>>({
      method: 'GET',
      url: '/api/app/floor',
      params: { pageNumber, pageSize, search },
    },
    { apiName: this.apiName,...config });
  

  update = (id: string, input: CreateUpdateFloorDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, ResponseApi<FloorDto>>({
      method: 'PUT',
      url: `/api/app/floor/${id}`,
      body: input,
    },
    { apiName: this.apiName,...config });

  constructor(private restService: RestService) {}
}

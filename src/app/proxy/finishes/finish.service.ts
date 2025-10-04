import type { CreateUpdateFinishDto, FinishDto } from './models';
import { RestService, Rest } from '@abp/ng.core';
import type { PagedResultDto } from '@abp/ng.core';
import { Injectable } from '@angular/core';
import type { LookupDto } from '../lookups/models';
import type { ResponseApi } from '../response/models';

@Injectable({
  providedIn: 'root',
})
export class FinishService {
  apiName = 'Default';
  

  create = (input: CreateUpdateFinishDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, ResponseApi<FinishDto>>({
      method: 'POST',
      url: '/api/app/finish',
      body: input,
    },
    { apiName: this.apiName,...config });
  

  delete = (id: string, config?: Partial<Rest.Config>) =>
    this.restService.request<any, void>({
      method: 'DELETE',
      url: `/api/app/finish/${id}`,
    },
    { apiName: this.apiName,...config });
  

  get = (id: string, config?: Partial<Rest.Config>) =>
    this.restService.request<any, ResponseApi<FinishDto>>({
      method: 'GET',
      url: `/api/app/finish/${id}`,
    },
    { apiName: this.apiName,...config });
  

  getFinishesLookup = (config?: Partial<Rest.Config>) =>
    this.restService.request<any, PagedResultDto<LookupDto>>({
      method: 'GET',
      url: '/api/app/finish/finishes-lookup',
    },
    { apiName: this.apiName,...config });
  

  getList = (pageNumber: number, pageSize: number, search: string, config?: Partial<Rest.Config>) =>
    this.restService.request<any, PagedResultDto<FinishDto>>({
      method: 'GET',
      url: '/api/app/finish',
      params: { pageNumber, pageSize, search },
    },
    { apiName: this.apiName,...config });
  

  update = (id: string, input: CreateUpdateFinishDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, ResponseApi<FinishDto>>({
      method: 'PUT',
      url: `/api/app/finish/${id}`,
      body: input,
    },
    { apiName: this.apiName,...config });

  constructor(private restService: RestService) {}
}

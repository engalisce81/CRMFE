import type { CreateUpdateLeadDto, LeadDto } from './models';
import { RestService, Rest } from '@abp/ng.core';
import type { PagedResultDto } from '@abp/ng.core';
import { Injectable } from '@angular/core';
import type { LookupDto } from '../lookups/models';
import type { ResponseApi } from '../response/models';

@Injectable({
  providedIn: 'root',
})
export class LeadService {
  apiName = 'Default';
  

  create = (input: CreateUpdateLeadDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, ResponseApi<LeadDto>>({
      method: 'POST',
      url: '/api/app/lead',
      body: input,
    },
    { apiName: this.apiName,...config });
  

  delete = (id: string, config?: Partial<Rest.Config>) =>
    this.restService.request<any, void>({
      method: 'DELETE',
      url: `/api/app/lead/${id}`,
    },
    { apiName: this.apiName,...config });
  

  get = (id: string, config?: Partial<Rest.Config>) =>
    this.restService.request<any, ResponseApi<LeadDto>>({
      method: 'GET',
      url: `/api/app/lead/${id}`,
    },
    { apiName: this.apiName,...config });
  

  getLeadsLookup = (config?: Partial<Rest.Config>) =>
    this.restService.request<any, PagedResultDto<LookupDto>>({
      method: 'GET',
      url: '/api/app/lead/leads-lookup',
    },
    { apiName: this.apiName,...config });
  

  getList = (pageNumber: number, pageSize: number, search: string, config?: Partial<Rest.Config>) =>
    this.restService.request<any, PagedResultDto<LeadDto>>({
      method: 'GET',
      url: '/api/app/lead',
      params: { pageNumber, pageSize, search },
    },
    { apiName: this.apiName,...config });
  

  update = (id: string, input: CreateUpdateLeadDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, ResponseApi<LeadDto>>({
      method: 'PUT',
      url: `/api/app/lead/${id}`,
      body: input,
    },
    { apiName: this.apiName,...config });

  constructor(private restService: RestService) {}
}

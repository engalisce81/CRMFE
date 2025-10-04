import type { AuditedEntityDto, EntityDto } from '@abp/ng.core';

export interface CreateUpdateDealDto {
  leadId?: string;
  unitId?: string;
  dealStatusId?: string;
  amount: number;
}

export interface CreateUpdateDealStatusDto {
  name?: string;
  points: number;
}

export interface DealDto extends AuditedEntityDto<string> {
  leadId?: string;
  leadName?: string;
  unitId?: string;
  unitName?: string;
  userId?: string;
  userName?: string;
  dealStatusId?: string;
  dealStatusName?: string;
  amount: number;
}

export interface DealStatusDto extends EntityDto<string> {
  name?: string;
  points: number;
}

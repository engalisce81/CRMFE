import type { AuditedEntityDto } from '@abp/ng.core';

export interface CreateUpdatePointDto {
  userId?: string;
  points: number;
}

export interface PointDto extends AuditedEntityDto<string> {
  userId?: string;
  points: number;
}

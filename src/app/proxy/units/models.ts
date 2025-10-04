import type { AuditedEntityDto } from '@abp/ng.core';

export interface CreateUpdateUnitDto {
  name?: string;
  description?: string;
  code?: string;
  bedroomCount: number;
  bedroomDescription?: string;
  bathroomCount: number;
  bathroomDescription?: string;
  ownerName?: string;
  ownerPhoneNumber?: string;
  notes?: string;
  area: number;
  price: number;
  location?: string;
  stateless: boolean;
  floorId?: string;
  unitTypeId?: string;
  projectId?: string;
  finishId?: string;
  logoUrl?: string;
  isCompany: boolean;
}

export interface CreateUpdateUnitTypeDto {
  name?: string;
}

export interface UnitDto extends AuditedEntityDto<string> {
  name?: string;
  description?: string;
  code?: string;
  bedroomCount: number;
  bedroomDescription?: string;
  bathroomCount: number;
  bathroomDescription?: string;
  ownerName?: string;
  ownerPhoneNumber?: string;
  notes?: string;
  area: number;
  price: number;
  location?: string;
  stateless: boolean;
  floorId?: string;
  floorName?: string;
  unitTypeId?: string;
  unitTypeName?: string;
  projectId?: string;
  projectName?: string;
  finishId?: string;
  finishName?: string;
  logoUrl?: string;
  isCompany: boolean;
}

export interface UnitTypeDto extends AuditedEntityDto<string> {
  name?: string;
}

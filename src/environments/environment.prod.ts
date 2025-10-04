import { Environment } from '@abp/ng.core';

const baseUrl = 'http://localhost:4200';

export const environment = {
  production: true,
  application: {
    baseUrl,
    name: 'Company',
    logoUrl: '',
  },
  oAuthConfig: {
    issuer: 'https://company-api-production.up.railway.app/',
    redirectUri: baseUrl,
    clientId: 'Company_App',
    responseType: 'code',
    scope: 'offline_access Company',
    requireHttps: true
  },
  apis: {
    default: {
      url: 'https://company-api-production.up.railway.app',
      rootNamespace: 'Charge.Company',
    },
  },
} as Environment;

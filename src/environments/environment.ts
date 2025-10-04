import { Environment } from '@abp/ng.core';

const baseUrl = 'http://localhost:4200';

export const environment = {
  production: false,
  application: {
    baseUrl,
    name: 'Company',
    logoUrl: '',
  },
  oAuthConfig: {
    issuer: 'https://localhost:44329/',
    redirectUri: baseUrl,
    clientId: 'Company_App',
    responseType: 'code',
    scope: 'offline_access Company',
    requireHttps: true,
  },
  apis: {
    default: {
      url: 'https://localhost:44329',
      rootNamespace: 'Charge.Company',
    },
  },
} as Environment;

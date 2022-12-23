export type SANDBOX = {
  clientId: string
  clientSecret: string
  env: 'SANDBOX'
  devid?: string
  redirectUri?: string
  baseUrl?: string
};
export type PRODUCTION = {
  clientId: string
  clientSecret: string
  env: 'PRODUCTION'
  devid?: string
  redirectUri?: string
  baseUrl?: string
};
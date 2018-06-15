export type cookieMetadata = {
  name: string,
  value: string,
  expiry?: Date | number | string,
  path?: string
};

export type retrievedCookieNameValuePair = {
  name: string,
  value: string,
  raw: string
};

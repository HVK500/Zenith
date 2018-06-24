export type CookieMetadata = {
  name: string,
  value: string,
  expiry?: Date | number | string,
  path?: string
};

export type RetrievedCookieNameValuePair = {
  name: string,
  value: string,
  raw: string
};

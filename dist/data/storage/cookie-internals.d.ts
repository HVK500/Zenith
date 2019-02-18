export interface CookieMetadata {
    name: string;
    value: string;
    expiry?: Date | number | string;
    path?: string;
}
export interface RetrievedCookieNameValuePair {
    name: string;
    value: string;
    raw: string;
}

export interface RequestEventHandlers {
  afterSend?: (xhr: XMLHttpRequest, options: RequestOptions) => void;
  beforeSend?: (xhr: XMLHttpRequest, options: RequestOptions) => void;
  complete?: (xhr: XMLHttpRequest, status: number) => void;
  error?: (xhr: XMLHttpRequest, errorType: string, error: string | Error) => void;
  progress?: (xhr: XMLHttpRequest) => void;
  // // A function to be called when the request finishes excuting the 'success' or 'error' callbacks
  // // 5	5xx Server errors
  // // 4	4xx Client errors
  // // 3	3xx Redirection
  // // 2	2xx Success
  // // 1	1xx Informational responses
  // statusCodes?: {};
  success?: (data: any, status?: number, xhr?: XMLHttpRequest) => void;
  timeout?: { time: number, callback: (event: any) => void };
}

export interface RequestOptions {
  params?: { [paramName: string]: string } | string;
  method?: string;
  sendData?: any;
  contentType?: string;
  mimeType?: string;
  responseType?: string;
  headers?: { [key: string]: string };
  async?: boolean;
  cache?: boolean;
  username?: string;
  password?: string;
  handlers?: RequestEventHandlers;
}

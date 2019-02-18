/**
 *
 *
 * @export
 * @interface RequestEventHandlers
 */
export interface RequestEventHandlers {

  /**
   *
   */
  state?: { [stateNumber: string]: (xhr: XMLHttpRequest) => void };

  /**
   *
   */
  status?: { [statusNumber: string]: (xhr: XMLHttpRequest) => void };

  /**
   * The abort event is fired when the loading of a resource has been aborted.
   */
  abort?: (xhr: XMLHttpRequest) => void;

  /**
   * This event is fired after send off the Ajax request.
   */
  afterSend?: (xhr: XMLHttpRequest) => void;

  /**
   * This event is fired before send off the Ajax request.
   */
  beforeSend?: (xhr: XMLHttpRequest) => void;

  /**
   * The complete event is fired when the request has reached the end, regardless of whether the request was successful or failed.
   */
  complete?: (xhr: XMLHttpRequest) => void;

  /**
   * The error event is fired when an error has occured while making a request or during the request.
   */
  error?: (message: string, errorType?: string, xhr?: XMLHttpRequest) => void;

  /**
   * The progress event is fired to indicate that an operation is in progress.
   */
  progress?: (xhr: XMLHttpRequest) => void;

  /**
   * The loadstart event is fired when progress has begun on the loading of a resource.
   */
  loadStart?: (xhr: XMLHttpRequest) => void;

  /**
   * The load event is fired when a resource and its dependent resources have finished loading.
   */
  load?: (xhr: XMLHttpRequest) => void;

  /**
   * The loadend event is fired when progress has stopped on the loading of a resource (e.g. after "error", "abort", or "load" have been dispatched).
   */
  loadEnd?: (xhr: XMLHttpRequest) => void;

  /**
   * The success event is fired when the request has been successful.
   */
  success?: (data: any, xhr?: XMLHttpRequest) => void;

  /**
   * The timeout event is fired when Progression is terminated due to preset time expiring.
   */
  timeout?: { time: number, callback: (event: any) => void };
}

/**
 *
 *
 * @export
 * @interface RequestOptions
 */
export interface RequestOptions {
  /**
   *
   */
  params?: { [paramName: string]: string } | URLSearchParams;

  /**
   *
   */
  method?: string;

  /**
   *
   */
  sendData?: any;

  /**
   *
   */
  contentType?: string;

  /**
   *
   */
  mimeType?: string;

  /**
   *
   */
  responseType?: string;

  /**
   *
   */
  headers?: { [header: string]: string };

  /**
   *
   */
  async?: boolean;

  /**
   *
   */
  cache?: boolean;

  /**
   *
   */
  username?: string;

  /**
   *
   */
  password?: string;

  /**
   *
   */
  handlers?: RequestEventHandlers;
}

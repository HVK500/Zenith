import { Common } from '../Zenith/Common';
import { Conditions } from '../Zenith/Common/Conditions';
import { Dom } from '../Zenith/Dom';
import { Element } from '../Zenith/Dom/Element';
import { Events } from '../Zenith/Dom/Events';
import { StringExtensions } from '../Zenith/Common/Extensions/StringExtensions';

/**
 *
 *
 * @export
 * @class Comms
 */
export class Comms {

	// private static callbackFramer = {
	// 	success: (context: XMLHttpRequest, options: RequestOptions, origin: string) => {
	// 		return (data: any) => {
	// 			// Logger.information(`Requested from "${options.endpoint}"${options.contentType ? ', "' + options.contentType + '" as the contentType' : ''} - Server succussfully responded with data${options.contentType === 'script' ? '.' : ' however, the data was not used in the plugin.'}`, { path: [ origin, 'default success callback' ], delimiter: '->' });
	// 			const status = StringExtensions.toString(context.status);

	// 			if (!!options.success) {
	// 				options.success(data, status, context);
	// 			}

	// 			if (!!options.complete) {
	// 				options.complete(context, status);
	// 			}
	// 		};
	// 	},
	// 	error: (context: XMLHttpRequest, options: RequestOptions) => {
	// 		return (err: any) => {
	// 			const status = StringExtensions.toString(context.status);

	// 			if (!!options.error) {
	// 				options.error(context, status, err);
	// 			}

	// 			if (!!options.complete) {
	// 				options.complete(context, status);
	// 			}
	// 		};
	// 	}
	// 	// ,
	// 	// serverStatus: (status: number, origin: string) => {
	// 	// 	return (data: any) => {
	// 	// 		Common.noop();
	// 	// 		//Logger.error(`Server responded with a ${status}.`, { path: [ origin, `default ${status} status callback` ], delimiter: '->' });
	// 	// 	};
	// 	// }
	// };

	/**
	 *
	 *
	 * @private
	 * @static
	 * @param {RequestOptions} options
	 * @returns {RequestOptions}
	 * @memberOf Comms
	 */
	private static setStandardRequestOptions(options: RequestOptions): RequestOptions {
		options.method = options.method || 'GET';
		options.contentType = options.contentType || 'application/x-www-form-urlencoded; charset=UTF-8';
		// options.mimeType || 'text/plain';
		// options.responseType = options.responseType || 'text';
		options.async = options.async || true;
		options.cache = options.cache || true;
		options.sendData = options.sendData || null;

		return options;
	}

	/**
	 *
	 *
	 * @private
	 * @static
	 * @param {XMLHttpRequest} xhr
	 * @param {RequestEventHandlers} handlers
	 * @returns {{ afterSend: Function, beforeSend: Function }}
	 * @memberOf Comms
	 */
	private static attachRequestEvents(xhr: XMLHttpRequest, handlers: RequestEventHandlers): { afterSend: Function, beforeSend: Function } {
		// "readystatechange" | "abort" | "error" | "load" | "loadend" | "loadstart" | "progress" | "timeout"
		let result = {
			error: Common.noop,
			afterSend: Common.noop,
			beforeSend: Common.noop,
		}

		if (!handlers) return;

		const defaultCompleteHandler = (xhr: XMLHttpRequest, status: number) => {
			handlers.complete && handlers.complete(xhr, status);
		};

		switch (true) {
			case !!handlers.afterSend: {
				result.afterSend = handlers.afterSend;
			}
			case !!handlers.beforeSend: {
				result.beforeSend = handlers.beforeSend;
			}
			// case !!handlers.complete: {
			// 	// Complete
			// }
			case !!handlers.error || !!handlers.complete: {
				const errorHandler = () => {
					handlers.error && handlers.error(xhr, '', ''); // TODO: Figure out if the two last params are needed
					defaultCompleteHandler(xhr, xhr.status);
				};

				result.error = errorHandler;

				handlers.error && Events.on(xhr, 'error', errorHandler, false);
			}
			case !!handlers.progress: {
				// Progress
				Events.on(xhr, 'progress', () => {
					handlers.progress(xhr);
				}, false);
			}
			// case !!handlers.statusCodes: {
			// 	// StatusCode
			// }
			case !!handlers.success: {
				// Setup the default success callback
				Events.on(xhr, 'readystatechange', () => {
					if ((xhr.readyState !== 4 && !(xhr.status >= 200 && xhr.status < 300))) return;
					handlers.success(xhr.response, xhr.status, xhr);
					defaultCompleteHandler(xhr, xhr.status);
				}, false);
			}
			case !!(handlers.timeout && handlers.timeout.time && handlers.timeout.callback): {
				xhr.timeout = handlers.timeout.time;
				Events.on(xhr, 'timeout', (event) => {
					handlers.timeout.callback(event);
				}, false);
			}
		}

		return result;
	}

	/**
	 *
	 *
	 * @static
	 * @param {string} baseUrl
	 * @returns {string}
	 * @memberOf Comms
	 */
	static cacheBust(baseUrl: string): string {
		const bustIt = { _: StringExtensions.toString(new Date().getTime) };
		return Comms.params(baseUrl, bustIt);
	}

	/**
	 *
	 *
	 * @static
	 * @param {string} baseUrl
	 * @param {({ [paramName: string]: string } | string)} value
	 * @returns
	 * @memberOf Comms
	 */
	static params(baseUrl: string, value: { [paramName: string]: string } | string) {
		const containsStart = StringExtensions.contains(baseUrl, '?');
		let result = containsStart ? '' : '?';

		if (Conditions.isObject(value)) {
			Common.each(value, (paramName, paramValue, index) => {
				// If empty, skip
				if (Conditions.isNullOrEmpty(paramName)) return;
				const param = StringExtensions.concat(paramName, '=', paramValue);
				result += index === 0 && !containsStart ? param : StringExtensions.concat('&', param);
			});
		} else if (Conditions.isString(value)) {
			result = Conditions.beginsWith(<string>value, '?') ? <string>value : StringExtensions.concat(result, value);
		}

		return StringExtensions.concat(baseUrl, encodeURIComponent(result));
	}

	/**
	 *
	 *
	 * @static
	 * @param {string} src
	 * @param {() => void} [callback]
	 * @param {string} [container='head']
	 * @memberOf Comms
	 */
	static getScript(src: string, callback?: () => void, container: string = 'head'): void { // TODO: Figure what to do with the callback
		// Disable caching for this request
		Comms.request(src, {
			cache: false,
			handlers: {
				success: (scriptContent, status, xhr): void => {
					Dom.appendTo(scriptContent, container);
				}
			}
		});
	}

	/**
	 *
	 *
	 * @static
	 * @param {string} src
	 * @param {() => void} [callback]
	 * @memberOf Comms
	 */
	static getJsonp(src: string, callback?: () => void): void { // TODO: Figure what to do with the callback
		// Disable cache for this request - use cache busting timestamp
		Dom.appendTo(Element.create('script')
			.setAttribute('src', Comms.cacheBust(src)).element);
	}

	/**
	 *
	 *
	 * @static
	 * @param {string} url
	 * @param {RequestOptions} [options]
	 * @returns {(any | void)}
	 * @memberOf Comms
	 */
	static request(url: string, options?: RequestOptions): any | void {
		const xhr = new XMLHttpRequest();

		// Set option defaults here
		options = Comms.setStandardRequestOptions(options);

		let processHandlers = null;

		try {
			processHandlers = Comms.attachRequestEvents(xhr, options.handlers);

			// Prepare the request url with the required params to be appended
			if (options.params) {
				url = Comms.params(url, options.params);
			}

			if (!options.cache) {
				url = Comms.cacheBust(url);
			}

			xhr.open(options.method, url, options.async, options.username, options.password);

			processHandlers.beforeSend(xhr, options);
			xhr.send(options.sendData);
			processHandlers.afterSend(xhr, options);
		} catch (err) {
			processHandlers.error();
		}
	}

}

interface RequestEventHandlers {
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

interface RequestOptions {
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

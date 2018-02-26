

/*$
 * @stop
 */

define('minified', function() {

	///#/snippet commonAmdStart
		///#snippet webVars
		/*$
		 * @id WEB
		 * @doc no
		 * @required
		 * This id allows identifying whether the Web module is available.
		 */
	
		/**
		 * @const
		 */
		var _window = window;
	
		/**
		 * @const
		 * @type {!string}
		 */
		var MINIFIED_MAGIC_NODEID = 'Nia';
	
		/**
		 * @const
		 * @type {!string}
		 */
		var MINIFIED_MAGIC_PREV = 'NiaP';
	
		var setter = {}, getter = {};
	
		var idSequence = 1;  // used as node id to identify nodes, and as general id for other maps
	
	
		/*$
		 * @id ready_vars
		 * @dependency
		 */
		/** @type {!Array.<function()>} */
		var DOMREADY_HANDLER = /^[ic]/.test(document['readyState']) ? _null : []; // check for 'interactive' and 'complete'
		/*$
		 * @id animation_vars
		 * @dependency
		 */
		var animationHandlers = {}; // global map of id->run() currently active
		var animationHandlerCount = 0; // number of active handlers
	
		/*$
		 * @stop
		 */
	
		///#/snippet webVars
		///#snippet utilVars
		/*$
		 * @id UTIL
		 * @doc no
		 * @required
		 * This id allows identifying whether the Util module is available.
		 */
	
		var _null = null;
	
		/** @const */
		var undef;
	
		/*$
		 * @id date_constants
		 * @dependency
		 */
		function val3(v) {return v.substr(0,3);}
		var MONTH_LONG_NAMES = split('January,February,March,April,May,June,July,August,September,October,November,December', /,/g);
		var MONTH_SHORT_NAMES = map(MONTH_LONG_NAMES, val3); // ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
		var WEEK_LONG_NAMES = split('Sunday,Monday,Tuesday,Wednesday,Thursday,Friday,Saturday', /,/g);
		var WEEK_SHORT_NAMES = map(WEEK_LONG_NAMES, val3); 
		var MERIDIAN_NAMES = split('am,pm', /,/g);
		var MERIDIAN_NAMES_FULL = split('am,am,am,am,am,am,am,am,am,am,am,am,pm,pm,pm,pm,pm,pm,pm,pm,pm,pm,pm,pm', /,/g);
	
		var FORMAT_DATE_MAP = {
				'y': ['FullYear', nonOp],
				'Y': ['FullYear', function(d) { return d % 100; }],
				'M': ['Month', plusOne],
				'n': ['Month', MONTH_SHORT_NAMES],
				'N': ['Month', MONTH_LONG_NAMES],
				'd': ['Date', nonOp],
				'm': ['Minutes', nonOp],
				'H': ['Hours', nonOp],
				'h': ['Hours', function(d) { return (d % 12) || 12; }],
				'k': ['Hours', plusOne],
				'K': ['Hours', function(d) { return d % 12; }],
				's': ['Seconds', nonOp],
				'S': ['Milliseconds', nonOp],
				'a': ['Hours', MERIDIAN_NAMES_FULL],
				'w': ['Day', WEEK_SHORT_NAMES],
				'W': ['Day', WEEK_LONG_NAMES],
				'z': ['TimezoneOffset', function(d, dummy, timezone) {
					if (timezone)
						return timezone;
	
					var sign = d > 0 ? '-' : '+'; 
					var off = d < 0 ? -d : d; 
					return sign + pad(2, Math.floor(off/60)) + pad(2, off%60); 
				}]
			};
	
		var PARSE_DATE_MAP = {
				'y': 0,      // placeholder -> ctorIndex
				'Y': [0, -2000],
				'M': [1,1], // placeholder -> [ctorIndex, offset|value array]
				'n': [1, MONTH_SHORT_NAMES], 
				'N': [1, MONTH_LONG_NAMES],
				'd': 2,
				'm': 4,
				'H': 3,
				'h': 3,
				'K': [3,1],
				'k': [3,1],
				's':  5,
				'S':  6,
				'a': [3, MERIDIAN_NAMES]
			};
	
		/*$
		 * @stop
		 */
	
		/** @const */
		var MAX_CACHED_TEMPLATES = 99;
		var templateCache={}; // template -> function
		var templates = [];   // list of MAX_CACHED_TEMPLATES templates
	
		///#/snippet utilVars
		///#snippet commonFunctions
	
		/** @param s {?} */
		function toString(s) { 
			return s!=_null ? ''+s : '';
		}
		/**
		 * @param s {?}
		 * @param o {string}
		 */
		function isType(s,o) {
			return typeof s == o;
		}
		/** @param s {?} */
		function isString(s) {
			return isType(s, 'string');
		}
		function isObject(f) {
			return !!f && isType(f, 'object');
		}
		function isNode(n) {
			return n && n['nodeType'];
		}
		function isNumber(n) {
			return isType(n, 'number');
		}
		function isDate(n) {
			return isObject(n) && !!n['getDay'];
		}
		function isBool(n) {
			return n === true || n === false;
		}
		function isValue(n) {
			var type = typeof n;
			return type == 'object' ? !!(n && n['getDay']) : (type == 'string' || type == 'number' || isBool(n));
		}
		function nonOp(v) {
			return v;
		}
		function plusOne(d) { 
			return d+1; 
		}
		function replace(s, regexp, sub) {
			return toString(s).replace(regexp, sub != _null ? sub : '');
		}
		function escapeRegExp(s) {
			return replace(s, /[\\\[\]\/{}()*+?.$|^-]/g, "\\$&");
		}
		function trim(s) {
			return replace(s, /^\s+|\s+$/g);
		}
		function eachObj(obj, cb, ctx) {
			for (var n in obj)
				if (obj.hasOwnProperty(n))
					cb.call(ctx || obj, n, obj[n]);
			return obj;
		} 
		function each(list, cb, ctx) {
			if (list)
				for (var i = 0; i < list.length; i++)
					cb.call(ctx || list, list[i], i);
			return list;
		}
		function filter(list, filterFuncOrObject, ctx) {
			var r = []; 
			var f = isFunction(filterFuncOrObject) ? filterFuncOrObject : function(value) { return filterFuncOrObject != value; };
			each(list, function(value, index) {
				if (f.call(ctx || list, value, index))
					r.push(value);
			});
			return r;
		}
		function collector(iterator, obj, collectFunc, ctx) {
			var result = [];
			iterator(obj, function (a, b) {
				if (isList(a = collectFunc.call(ctx || obj, a, b))) // extreme variable reusing: a is now the callback result
					each(a, function(rr) { result.push(rr); });
				else if (a != _null)
					result.push(a);
			});
			return result;
		}
		function collectObj(obj, collectFunc, ctx) {
			return collector(eachObj, obj, collectFunc, ctx);
		}
		function collect(list, collectFunc, ctx) {
			return collector(each, list, collectFunc, ctx);
		}
		function keyCount(obj) {
			var c = 0;
			eachObj(obj, function(key) { c++; });
			return c;
		}
		function keys(obj) { // use Object.keys? in IE>=9
			var list = [];
			eachObj(obj, function(key) { list.push(key); });
			return list;
		}
		function map(list, mapFunc, ctx) {
			var result = [];
			each(list, function(item, index) {
				result.push(mapFunc.call(ctx || list, item, index));
			});
			return result;
		}
		function startsWith(base, start) {
			if (isList(base)) {
				var s2 = _(start); // convert start as we don't know whether it is a list yet
				return equals(sub(base, 0, s2.length), s2);
			}
			else
				return start != _null && base.substr(0, start.length) == start;
		}
		function endsWith(base, end) {
			if (isList(base)) {
				var e2 = _(end);
				return equals(sub(base, -e2.length), e2) || !e2.length;
			}
			else
				return end != _null && base.substr(base.length - end.length) == end;
		}
		function reverse(list) {
			var len = list.length;
			if (isList(list))
				return new M(map(list, function() { return list[--len]; }));
			else
				return replace(list, /[\s\S]/g, function() { return list.charAt(--len); });
		}
		function toObject(list, value) {
			var obj = {};
			each(list, function(item, index) {
				obj[item] = value;
			});
			return obj;
		}
		function copyObj(from, to) {
			var dest = to || {};
					for (var name in from)
						dest[name] = from[name];
					return dest;
		}
		function merge(list, target) {
			var o = target;
			for (var i = 0; i < list.length; i++)
				o = copyObj(list[i], o);
			return o;
		}
		function getFindFunc(findFunc) {
			return isFunction(findFunc) ? findFunc : function(obj, index) { if (findFunc === obj) return index; };
		}
		function getFindIndex(list, index, defaultIndex) {
			return index == _null ? defaultIndex : index < 0 ? Math.max(list.length+index, 0) : Math.min(list.length, index);
		}
		function find(list, findFunc, startIndex, endIndex) {
			var f = getFindFunc(findFunc);
			var e = getFindIndex(list, endIndex, list.length);
			var r;
			for (var i = getFindIndex(list, startIndex, 0); i < e; i++)
				if ((r = f.call(list, list[i], i)) != _null)
					return r;
		}
		function findLast(list, findFunc, startIndex, endIndex) {
			var f = getFindFunc(findFunc);
			var e = getFindIndex(list, endIndex, -1);
			var r;
			for (var i = getFindIndex(list, startIndex, list.length-1); i > e; i--)
				if ((r = f.call(list, list[i], i)) != _null)
					return r;
		}
		function sub(list, startIndex, endIndex) {
			var r = [];
			if (list) {
				var e = getFindIndex(list, endIndex, list.length);
				for (var i = getFindIndex(list, startIndex, 0); i < e; i++)
					r.push(list[i]);
			}
			return r;
		 }
		function array(list) {
			return map(list, nonOp);
		}
		function unite(list) {
			return function() {
				return new M(callList(list, arguments));
			};
		}
		function uniq(list) {
			var found = {};
			return filter(list, function(item) {
				if (found[item])
					return false;
				else
					return found[item] = 1;
			});
		}
		function intersection(list, otherList) {
			var keys = toObject(otherList, 1);
			return filter(list, function(item) {
				var r = keys[item];
				keys[item] = 0;
				return r;
			});
		}
		function contains(list, value) { // TODO: can Array.indexOf be used in >IE8?
			for (var i = 0; i < list.length; i++)
				if (list[i] == value)
					return true;
			return false;
		}
		// equals if a and b have the same elements and all are equal. Supports getters.
		function equals(x, y) {
			var a = isFunction(x) ? x() : x;
			var b = isFunction(y) ? y() : y;
			var aKeys;
			if (a == b)
				return true;
			else if (a == _null || b == _null)
				return false;
			else if (isValue(a) || isValue(b))
				return isDate(a) && isDate(b) && +a==+b;
			else if (isList(a)) {
				return (a.length == b.length) &&
					!find(a, function(val, index) {
						if (!equals(val, b[index]))
							return true;
					});
			}
			else {
				return !isList(b) &&
					((aKeys = keys(a)).length == keyCount(b)) && 
					!find(aKeys, function(key) {
							if (!equals(a[key],b[key]))
								return true;
					});
			}
		}
	
		function call(f, fThisOrArgs, args) {
			if (isFunction(f))
				return f.apply(args && fThisOrArgs, map(args || fThisOrArgs, nonOp));
		}
		function callList(list, fThisOrArgs, args) {
			return map(list, function(f) { return call(f, fThisOrArgs, args);});
		}
		function bind(f, fThis, beforeArgs, afterArgs) {
			return function() {
				return call(f, fThis, collect([beforeArgs, arguments, afterArgs], nonOp));
			};
		}
		function partial(f, beforeArgs, afterArgs) {
			return bind(f, this, beforeArgs, afterArgs);
		}
		function pad(digits, number) {
			var signed = number < 0 ? '-' : '';
			var preDecimal = (signed?-number:number).toFixed(0);
			while (preDecimal.length < digits)
				preDecimal = '0' + preDecimal;
			return signed + preDecimal;
		}
	
		function processNumCharTemplate(tpl, input, fwd) {
			var inHash;
			var inputPos = 0;
			var rInput = fwd ? input : reverse(input);
			var s = (fwd ? tpl : reverse(tpl)).replace(/./g, function(tplChar) {
				if (tplChar == '0') {
					inHash = false;
					return rInput.charAt(inputPos++) || '0';
				}
				else if (tplChar == '#') {
					inHash = true;
					return rInput.charAt(inputPos++) || '';
				}
				else
					return inHash && !rInput.charAt(inputPos) ? '' : tplChar;
			});
			return fwd ? s : (input.substr(0, input.length - inputPos) + reverse(s));
		}
	
		function getTimezone(match, idx, refDate) { // internal helper, see below
			if (idx == _null || !match)
				return 0;
			return parseFloat(match[idx]+match[idx+1])*60 + parseFloat(match[idx]+match[idx+2]) + refDate.getTimezoneOffset();
		}
	
		// formats number with format string (e.g. "#.000", "#,#", "00000", "000.00", "000.000.000,00", "000,000,000.##")
		// choice syntax: <cmp><value>:<format>|<cmp><value>:<format>|... 
		// e.g. 0:no item|1:one item|>=2:# items
		// <value>="null" used to compare with nulls.
		// choice also works with strings or bools, e.g. ERR:error|WAR:warning|FAT:fatal|ok
		function formatValue(fmt, value) {
			var format = replace(fmt, /^\?/);
			if (isDate(value)) {
				var timezone, match;
	
				if (match = /^\[(([+-])(\d\d)(\d\d))\]\s*(.*)/.exec(format)) {
					timezone = match[1];
					value = dateAdd(value, 'minutes', getTimezone(match, 2, value));
					format = match[5];
				}
	
				return replace(format, /(\w)(\1*)(?:\[([^\]]+)\])?/g, function(s, placeholderChar, placeholderDigits, params) {
					var val = FORMAT_DATE_MAP[placeholderChar];
					if (val) {
						var d = value['get' + val[0]]();
						var optionArray = (params && params.split(','));
	
						if (isList(val[1])) 
							d = (optionArray || val[1])[d];
						else
							d = val[1](d, optionArray, timezone);
						if (d != _null && !isString(d))
							d = pad(placeholderDigits.length+1, d);
						return d;
					}
					else
						return s;
				});
	
			}
			else 
				return find(format.split(/\s*\|\s*/), function(fmtPart) {
					var match, numFmtOrResult;
					if (match = /^([<>]?)(=?)([^:]*?)\s*:\s*(.*)$/.exec(fmtPart)) {
						var cmpVal1 = value, cmpVal2 = +(match[3]);
						if (isNaN(cmpVal2) || !isNumber(cmpVal1)) {
							cmpVal1 = (cmpVal1==_null) ? "null" : toString(cmpVal1); // not ""+value, because undefined is treated as null here
							cmpVal2 = match[3];
						}
						if (match[1]) {
							if ((!match[2] && cmpVal1 == cmpVal2 ) ||
									(match[1] == '<'  && cmpVal1 > cmpVal2)  ||
									(match[1] == '>'  && cmpVal1 < cmpVal2))
								return _null;
						}
						else if (cmpVal1 != cmpVal2)
							return _null;
						numFmtOrResult = match[4];
					}
					else
						numFmtOrResult = fmtPart;
	
					if (isNumber(value))
						return numFmtOrResult.replace(/[0#](.*[0#])?/, function(numFmt) {
							var decimalFmt = /^([^.]+)(\.)([^.]+)$/.exec(numFmt) || /^([^,]+)(,)([^,]+)$/.exec(numFmt);
							var signed = value < 0 ? '-' : '';
							var numData = /(\d+)(\.(\d+))?/.exec((signed?-value:value).toFixed(decimalFmt ? decimalFmt[3].length:0));
							var preDecimalFmt = decimalFmt ? decimalFmt[1] : numFmt;
							var postDecimal = decimalFmt ? processNumCharTemplate(decimalFmt[3], replace(numData[3], /0+$/), true) : '';
	
							return 	(signed ? '-' : '') + 
									(preDecimalFmt == '#' ? numData[1] : processNumCharTemplate(preDecimalFmt, numData[1])) +
									(postDecimal.length ? decimalFmt[2] : '') +
									postDecimal;
						});
					else
						return numFmtOrResult;
				});
		}
		// returns date; null if optional and not set; undefined if parsing failed
		function parseDate(fmt, date) {
			var indexMap = {}; // contains reGroupPosition -> typeLetter or [typeLetter, value array]
			var reIndex = 1;
			var timezoneOffsetMatch;
			var timezoneIndex;
			var match;
	
			var format = replace(fmt, /^\?/);
			if (format!=fmt && !trim(date))
				return _null;
	
			if (match = /^\[([+-])(\d\d)(\d\d)\]\s*(.*)/.exec(format)) {
				timezoneOffsetMatch = match;
				format = match[4];
			}
	
			var parser = new RegExp(format.replace(/(.)(\1*)(?:\[([^\]]*)\])?/g, function(wholeMatch, placeholderChar, placeholderDigits, param) {
				if (/[dmhkyhs]/i.test(placeholderChar)) {
					indexMap[reIndex++] = placeholderChar;
					var plen = placeholderDigits.length+1;
					return "(\\d"+(plen<2?"+":("{1,"+plen+"}"))+")";
				}
				else if (placeholderChar == 'z') {
					timezoneIndex = reIndex;
					reIndex += 3;
					return "([+-])(\\d\\d)(\\d\\d)";
				}
				else if (/[Nna]/.test(placeholderChar)) {
					indexMap[reIndex++] = [placeholderChar, param && param.split(',')];
					return "([a-zA-Z\\u0080-\\u1fff]+)";
				}
				else if (/w/i.test(placeholderChar))
						return "[a-zA-Z\\u0080-\\u1fff]+";
				else if (/\s/.test(placeholderChar))
					return "\\s+"; 
				else 
					return escapeRegExp(wholeMatch);
			}));
	
			if (!(match = parser.exec(date)))
				return undef;
	
			var ctorArgs = [0, 0, 0, 0, 0, 0,  0];
			for (var i = 1; i < reIndex; i++) {
				var matchVal = match[i];
				var indexEntry = indexMap[i];
				if (isList(indexEntry)) { // for a, n or N
					var placeholderChar = indexEntry[0];
					var mapEntry  = PARSE_DATE_MAP[placeholderChar];
					var ctorIndex = mapEntry[0];
					var valList = indexEntry[1] || mapEntry[1];
					var listValue = find(valList, function(v, index) { if (startsWith(matchVal.toLowerCase(), v.toLowerCase())) return index; });
					if (listValue == _null)
						return undef;
					if (placeholderChar == 'a')
						ctorArgs[ctorIndex] += listValue * 12;
					else
						ctorArgs[ctorIndex] = listValue;
				}
				else if (indexEntry) { // for numeric values (yHmMs)
					var value = parseFloat(matchVal);
					var mapEntry  = PARSE_DATE_MAP[indexEntry];
					if (isList(mapEntry))
						ctorArgs[mapEntry[0]] += value - mapEntry[1];
					else
						ctorArgs[mapEntry] += value;
				}
			}
			var d = new Date(ctorArgs[0], ctorArgs[1], ctorArgs[2], ctorArgs[3], ctorArgs[4], ctorArgs[5], ctorArgs[6]);
			return dateAdd(d, 'minutes', -getTimezone(timezoneOffsetMatch, 1, d) - getTimezone(match, timezoneIndex, d));
		}
		// format ?##00,00##
		// returns number; null if optional and not set; undefined if parsing failed
		function parseNumber(fmt, value) {
			var format = replace(fmt, /^\?/);
			if (format!=fmt && !trim(value))
				return _null;
			var decSep = (/(^|[^0#.,])(,|[0#.]*,[0#]+|[0#]+\.[0#]+\.[0#.,]*)($|[^0#.,])/.test(format)) ? ',' : '.';
			var r = parseFloat(replace(replace(replace(value, decSep == ',' ? /\./g : /,/g), decSep, '.'), /^[^\d-]*(-?\d)/, '$1'));
			return isNaN(r) ? undef : r;
		}
		function now() {
			return new Date();
		}
		function dateClone(date) {
			return new Date(+date);
		}
		function capWord(w) { 
			return w.charAt(0).toUpperCase() + w.substr(1); 
		}
		function dateAddInline(d, cProp, value) {
			d['set'+cProp](d['get'+cProp]() + value);
			return d;
		}
		function dateAdd(date, property, value) {
			if (value == _null)
				return dateAdd(now(), date, property);
			return dateAddInline(dateClone(date), capWord(property), value);
		}
		function dateMidnight(date) {
			var od = date || now();
			return new Date(od.getFullYear(), od.getMonth(), od.getDate());
		}
		function dateDiff(property, date1, date2) {
			var d1t = +date1;
			var d2t = +date2;
			var dt = d2t - d1t;
			if (dt < 0)
				return -dateDiff(property, date2, date1);
	
			var propValues = {'milliseconds': 1, 'seconds': 1000, 'minutes': 60000, 'hours': 3600000};
			var ft = propValues[property];
			if (ft)
				return dt / ft;
	
			var cProp = capWord(property);
			var calApproxValues = {'fullYear': 8.64e7*365, 'month': 8.64e7*365/12, 'date': 8.64e7}; // minimum values, a little bit below avg values
			var minimumResult = Math.floor((dt / calApproxValues[property])-2); // -2 to remove the imperfections caused by the values above
	
			var d = dateAddInline(new Date(d1t), cProp, minimumResult);
			for (var i = minimumResult; i < minimumResult*1.2+4; i++) { // try out 20% more than needed, just to be sure
				if (+dateAddInline(d, cProp, 1) > d2t)
					return i;
			}
			// should never ever be reached
		}
	
		function ucode(a) {
			return '\\u' + ('0000' + a.charCodeAt(0).toString(16)).slice(-4);
		}
	
		function escapeJavaScriptString(s) {
			return replace(s, /[\x00-\x1f'"\u2028\u2029]/g, ucode);
		}
	
		// reimplemented split for IE8
		function split(str, regexp) {
	
			return str.split(regexp);
		}
	
		function template(template, escapeFunction) {
			if (templateCache[template])
				return templateCache[template];
			else {
				var funcBody = 'with(_.isObject(obj)?obj:{}){'+
					map(split(template, /{{|}}}?/g), function(chunk, index) {
						var match, c1 = trim(chunk), c2 = replace(c1, /^{/), escapeSnippet  = (c1==c2) ? 'esc(' : '';
						if (index%2) { // odd means JS code
							if (match = /^each\b(\s+([\w_]+(\s*,\s*[\w_]+)?)\s*:)?(.*)/.exec(c2))
								return 'each('+(trim(match[4])?match[4]:'this')+', function('+match[2]+'){';
							else if (match = /^if\b(.*)/.exec(c2))
								return 'if('+match[1]+'){';
							else if (match = /^else\b\s*(if\b(.*))?/.exec(c2))
								return '}else ' + (match[1]  ? 'if('+match[2] +')' : '')+'{';
							else if (match = /^\/(if)?/.exec(c2))
								return match[1] ? '}\n' : '});\n';
							else if (match = /^(var\s.*)/.exec(c2))
								return match[1]+';';
							else if (match = /^#(.*)/.exec(c2))
								return match[1];
							else if (match = /(.*)::\s*(.*)/.exec(c2))
								return 'print('+escapeSnippet+'_.formatValue("'+escapeJavaScriptString(match[2])+'",'+(trim(match[1])?match[1]:'this')+(escapeSnippet&&')')+'));\n';
							else
								return 'print('+escapeSnippet+(trim(c2)?c2:'this')+(escapeSnippet&&')')+');\n';
						}
						else if (chunk){
							return 'print("'+escapeJavaScriptString(chunk)+'");\n';
						}
					}).join('')+'}';
				var f = (new Function('obj', 'each', 'esc', 'print', '_', funcBody));
				var t = function(obj, thisContext) {
					var result = [];
					f.call(thisContext || obj, obj, function(obj, func) {
						if (isList(obj))
							each(obj, function(value, index) { func.call(value, value, index); });
						else
							eachObj(obj, function(key, value) { func.call(value, key, value); });
					}, escapeFunction || nonOp, function() {call(result['push'], result, arguments);}, _);
					return result.join('');
				};
				if (templates.push(t) > MAX_CACHED_TEMPLATES)
					delete templateCache[templates.shift()];
				return templateCache[template] = t; 
			}
		}
	
		function escapeHtml(s) {
			return replace(s, /[<>'"&]/g, function(s) {
				return '&#'+s.charCodeAt(0)+';';
			});
		}	
	
		function formatHtml(tpl, obj) { 
			return template(tpl, escapeHtml)(obj); 
		}
	
		function listBindArray(func) {
			return function(arg1, arg2) {
				return new M(func(this, arg1, arg2));
			};
		}
		function listBind(func) {
			return function(arg1, arg2, arg3) {
				return func(this, arg1, arg2, arg3);
			};
		}
		function funcArrayBind(func) {
			return function(arg1, arg2, arg3) {
				return new M(func(arg1, arg2, arg3));
			};
		}
	
		///#/snippet commonFunctions
		///#snippet webFunctions
	
		// note: only the web version has the f.item check
		function isFunction(f) {
			return typeof f == 'function' && !f['item']; // item check as work-around for webkit bug 14547
		}
	
		function isList(v) {
			return v && v.length != _null && !isString(v) && !isNode(v) && !isFunction(v) && v !== _window;
		}
	
		// used by IE impl of on() only
		function push(obj, prop, value) {
			(obj[prop] = (obj[prop] || [])).push(value);
		}
		// used by IE impl of on()/off() only
		function removeFromArray(array, value) {
			for (var i = 0; array && i < array.length; i++) 
				if (array[i] === value) 
					array['splice'](i--, 1);
		}
	
		function extractNumber(v) {
			return parseFloat(replace(v, /^[^\d-]+/));
		}
	
		// retrieves the node id of the element, create one if needed.
		function getNodeId(el) {
			return (el[MINIFIED_MAGIC_NODEID] = (el[MINIFIED_MAGIC_NODEID] || ++idSequence));
		}
	
		// collect variant that filters out duplicate nodes from the given list, returns a new array
		function collectUniqNodes(list, func) {
			var result = [];
			var nodeIds = {};
			var currentNodeId;
	
			flexiEach(list, function(value) {
				flexiEach(func(value), function(node) {
					if (!nodeIds[currentNodeId = getNodeId(node)]) {
						result.push(node);
						nodeIds[currentNodeId] = true;
					}
				});
			});
			return result;
		}
	
		// finds out the 'natural' height of the first element, the one if $$slide=1
		function getNaturalHeight(elementList, factor) {
			var q = {'$position': 'absolute', '$visibility': 'hidden', '$display': 'block', '$height': _null};
			var oldStyles = elementList['get'](q);
			var h = elementList['set'](q)['get']('clientHeight');
			elementList['set'](oldStyles);
			return h*factor + 'px';
		}
	
	
	
	
		// @condblock !ie8compatibility 
		function on(subSelector, eventSpec, handler, args, bubbleSelector) {
			if (isFunction(eventSpec))
				return this['on'](_null, subSelector, eventSpec, handler, args);
			else if (isString(args)) 
				return this['on'](subSelector, eventSpec, handler, _null, args);
			else
				return this['each'](function(baseElement, index) {
					flexiEach(subSelector ? dollarRaw(subSelector, baseElement) : baseElement, function(registeredOn) {
						flexiEach(toString(eventSpec).split(/\s/), function(namePrefixed) {
							var name = replace(namePrefixed, /[?|]/g);
							var prefix = replace(namePrefixed, /[^?|]/g);
							var capture = (name == 'blur' || name == 'focus') && !!bubbleSelector; // bubble selectors for 'blur' and 'focus' registered as capuring!
							var triggerId = idSequence++;
	
							// returns true if processing should be continued
							function triggerHandler(eventName, event, target) {
								var match = !bubbleSelector;
								var el = bubbleSelector ? target : registeredOn;
								if (bubbleSelector) {
									var selectorFilter = getFilterFunc(bubbleSelector, registeredOn);
									while (el && el != registeredOn && !(match = selectorFilter(el)))
										el = el['parentNode'];
								}
								return (!match) || (name != eventName) || ((handler.apply($(el), args || [event, index]) && prefix=='?') || prefix == '|');
							};
	
							function eventHandler(event) {
								if (!triggerHandler(name, event, event['target'])) {
									event['preventDefault']();
									event['stopPropagation']();
								}
							};
	
							registeredOn.addEventListener(name, eventHandler, capture);
	
							if (!registeredOn['M']) 
								registeredOn['M'] = {};
							registeredOn['M'][triggerId] = triggerHandler;                  // to be called by trigger()
	
							handler['M'] = collector(flexiEach, [handler['M'], function () { // this function will be called by off()
								registeredOn.removeEventListener(name, eventHandler, capture);
								delete registeredOn['M'][triggerId];
							}], nonOp);
	
						});
					});
				});
		}
		// @condend !ie8compatibility 
	
	
		// @condblock !ie8compatibility 
		function off(handler) {
			callList(handler['M']);
			handler['M'] = _null;
		}
		// @condend !ie8compatibility 
	
		// for remove & window.unload, IE only
		function detachHandlerList(dummy, handlerList) {
			flexiEach(handlerList, function(h) {
				h.element.detachEvent('on'+h.eventType, h.handlerFunc);
			});
		}
	
		function ready(handler) {
			if (DOMREADY_HANDLER)
				DOMREADY_HANDLER.push(handler);
			else
				setTimeout(handler, 0);
		}
	
		function $$(selector, context, childrenOnly) {
			return dollarRaw(selector, context, childrenOnly)[0];
		}
	
		function EE(elementName, attributes, children) {
			var e = $(document.createElement(elementName));
			// @condblock UTIL
			// this attributes != null check is only required with Util's isObject() implementation. Web's isObject() is simpler.
			return (isList(attributes) || (attributes != _null && !isObject(attributes)) ) ? e['add'](attributes) : e['set'](attributes)['add'](children);
			// @condend UTIL
			// @cond !UTIL return (isList(attributes) || (!isObject(attributes)) ) ? e['add'](attributes) : e['set'](attributes)['add'](children);
		}
	
		function clone(listOrNode) {
			return collector(flexiEach, listOrNode, function(e) {
				var c;
				if (isList(e))
					return clone(e);
				else if (isNode(e)) {
					c = e['cloneNode'](true); 
					c['removeAttribute'] && c['removeAttribute']('id');
					return c;
				}
					else
						return e;
			});
		 }
	
		/*$
		 * @stop
		 */
	
		function $(selector, context, childOnly) { 
			// @condblock ready
			return isFunction(selector) ? ready(selector) : new M(dollarRaw(selector, context, childOnly));
			// @condend
			// @cond !ready return new M(dollarRaw(selector, context));
		}
	
		// implementation of $ that does not produce a Minified list, but just an array
	
	
	
	
	
	
	
	
	
	
		// @condblock !ie7compatibility
		function dollarRaw(selector, context, childOnly) { 
			function flatten(a) { // flatten list, keep non-lists, remove nulls
						return isList(a) ? collector(flexiEach, a, flatten) : a;
			 }
			 function filterElements(list) { // converts into array, makes sure context is respected
						return filter(collector(flexiEach, list, flatten), function(node) {
								 var a = node;
								 while (a = a['parentNode'])
											if (a == context[0] || childOnly)
													 return a == context[0];
								 // fall through to return undef
						});
			 }
	
			 if (context) {
						if ((context = dollarRaw(context)).length != 1)
								 return collectUniqNodes(context, function(ci) { return dollarRaw(selector, ci, childOnly);});
						else if (isString(selector)) {
								if (isNode(context[0]) != 1)
							return [];
						else 
									return childOnly ? filterElements(context[0].querySelectorAll(selector)) : context[0].querySelectorAll(selector);
						}
						else
								 return filterElements(selector);
	
			 }
			 else if (isString(selector))
						return document.querySelectorAll(selector);
			 else
						return collector(flexiEach, selector, flatten);
		};
		// @condend !ie7compatibility
	
		// If context is set, live updates will be possible. 
		// Please note that the context is not evaluated for the '*' and 'tagname.classname' patterns, because context is used only
		// by on(), and in on() only nodes in the right context will be checked
		function getFilterFunc(selector, context) {
			function wordRegExpTester(name, prop) {
				var re = RegExp('(^|\\s+)' + name + '(?=$|\\s)', 'i');
				return function(obj) {return  name ? re.test(obj[prop]) : true;};
			}
	
			var nodeSet = {};
			var dotPos = nodeSet;
			if (isFunction(selector))
				return selector;
			else if (isNumber(selector))
				return function(v, index) { return index == selector; };
			else if (!selector || selector == '*' ||
					 (isString(selector) && (dotPos = /^([\w-]*)\.?([\w-]*)$/.exec(selector)))) {
				var nodeNameFilter = wordRegExpTester(dotPos[1], 'tagName');
				var classNameFilter = wordRegExpTester(dotPos[2], 'className');
				return function(v) {
					return isNode(v) == 1 && nodeNameFilter(v) && classNameFilter(v);
				};
			}
			else if (context) 
				return function(v) { 
					return $(selector, context)['find'](v)!=_null; // live search instead of node set, for on()
				};
			else {
				$(selector)['each'](function(node) {
					nodeSet[getNodeId(node)] = true;
				});
				return function(v) { 
					return nodeSet[getNodeId(v)]; 
				};
			}	
		}
	
		function getInverseFilterFunc(selector) {
			var f = getFilterFunc(selector);
			return function(v) {return f(v) ? _null : true;};
		}
		///#/snippet webFunctions
	
		///#snippet extrasFunctions
		function flexiEach(list, cb) {
			if (isList(list))
				each(list, cb);
			else if (list != _null)
				cb(list, 0);
			return list;
		}
	
		function Promise() {
					this['state'] = null; 
					this['values'] = []; 
					this['parent'] = null; 
		}
	
		/*$
		 * @id promise
		 * @name _.promise()
		 * @syntax _.promise()
		 * @syntax _.promise(otherPromises...)
		 * @module WEB+UTIL
		 * 
		 * Creates a new ##promiseClass#Promise##, optionally assimilating other promises. If no other promise is given, 
		 * a fresh new promise is returned. 
		 *
		 * The returned promise provides the methods ##fulfill() and ##reject() that can be called directly to change the promise's state,
		 * as well as the more powerful ##fire().
		 * 
		 * If one promise is given as parameter, the new promise assimilates the given promise as-is, and just forwards 
		 * fulfillment and rejection with the original values.
		 *
		 * If more than one promise are given, it will assimilate all of them with slightly different rules:
		 * <ul><li>the new promise is fulfilled if all assimilated promises have been fulfilled. The fulfillment values
		 *         of all assimilated promises are given to the handler as arguments. Note that the fulfillment values themselves are always 
		 *         arrays, as a promise can have several fulfillment values in Minified's implementation.</li>
		 * <li>when one of the promises is rejected, the new promise is rejected immediately. The rejection handler gets the 
		 *     promises rejection value (first argument if it got several) as first argument, an array of the result values 
		 *     of all promises as a second (that means one array of arguments for each promise), and the index of the failed 
		 *     promise as third.
		 * </li></ul>
		 * 
		 * @example A simple promise that is fulfilled after 1 second, using Minified's invocation syntax:
		 * <pre>var p = _.promise();
		 * setTimeout(function() { 
		 *     p.fire(true); 
		 * }, 1000);
		 * </pre>
		 *
		 * @example Request three files in parallel. When all three have been downloaded, concatenate them into a single string.
			 * <pre>
			 * var files = _('fileA.txt', 'fileA.txt', 'fileC.txt');
			 * var content;
			 * _.promise(files.map(function(file) {
			 *      return $.request('get', '/txts/' + file);
			 * })).then(function(fileRslt1, fileRslt2, fileRslt3) {
			 *      content = _(fileRslt1, fileRslt2, fileRslt3).map( function(result) { return result[0]; }).join('');
			 * }).error(function(status, response, xhr, url) {
			 *    alert('failed to load file '+url);
			 * });
			 * </pre>
		 * 
		 * @param otherPromises one or more promises to assimilate (varargs). You can also pass lists of promises.
		 * @return the new promise.
		 */
		function promise() {
			var deferred = [];   // this function calls the functions supplied by then()
	
			var assimilatedPromises = arguments;
			var assimilatedNum = assimilatedPromises.length;
			var numCompleted = 0; // number of completed, assimilated promises
			var rejectionHandlerNum = 0;
	
			var obj = new Promise();
	
			obj['errHandled'] = function() {
				rejectionHandlerNum++;
				if (obj['parent'])
					obj['parent']['errHandled']();
			};
	
			/*$
			 * @id fire
			 * @name promise.fire()
			 * @syntax _.fire(newState)
			 * @syntax _.fire(newState, values)
			 * @module WEB+UTIL
			 * 
			 * Changes the state of the promise into either fulfilled or rejected. This will also notify all ##then() handlers. If the promise
			 * already has a state, the call will be ignored.
			 *
			 * <var>fire()</var> can be invoked as a function without context ('this'). Every promise has its own instance.
			 * 
			 * @example A simple promise that is fulfilled after 1 second, using Minified's invocation syntax:
			 * <pre>var p = _.promise();
			 * setTimeout(function() { 
			 *     p.fire(true, []); 
			 * }, 1000);
			 * </pre>
			 *
			 * @example Call <var>fire()</var> without a context:
			 * <pre>var p = _.promise(function(resolve, reject) {
					 *     setTimeout(resolve.fire, 1000);
			 * });
			 * </pre>
			 *
			 * @param newState <var>true</var> to set the Promise to fulfilled, <var>false</var> to set the state as rejected. If you pass <var>null</var> or
			 * <var>undefined</var>, the promise's state does not change.
			 * @param values optional an array of values to pass to ##then() handlers as arguments. You can also pass a non-list argument, which will then 
			 *               be passed as only argument.
			 * @return the promise 
			 */
			var fire = obj['fire'] = function(newState, newValues) {
				if (obj['state'] == null && newState != null) {
					obj['state'] = !!newState;
					obj['values'] = isList(newValues) ? newValues : [newValues];
					setTimeout(function() {
						each(deferred, function(f) {f();});
					}, 0);
				}
				return obj;
			};
	
			// use promise varargs
			each(assimilatedPromises, function assimilate(promise, index) {
				try {
							if (promise['then'])
											promise['then'](function(v) {
													var then;
													if ((isObject(v) || isFunction(v)) && isFunction(then = v['then']))
															assimilate(v, index);
													else {
															obj['values'][index] = array(arguments);
															if (++numCompleted == assimilatedNum)
																	fire(true, assimilatedNum < 2 ? obj['values'][index] : obj['values']);
													}
											}, 
											function(e) {
													obj['values'][index] = array(arguments);
													fire(false, assimilatedNum < 2 ? obj['values'][index] : [obj['values'][index][0], obj['values'], index]);
											});
					else
						promise(function() {fire(true, array(arguments));}, function() {fire(false, array(arguments)); });
				}
				catch (e) {
					fire(false, [e, obj['values'], index]);
				}
			});
	
			/*$
			 * @id stop
			 * @name promise.stop()
			 * @syntax promise.stop()
			 * @module WEB+UTIL
			 * Stops an ongoing operation, if supported. Currently the only promises supporting this are those returned by ##request(), ##animate(), ##wait() and
			 * ##asyncEach(). 
			 * stop() invocation will be propagated over promises returned by ##then() and promises assimilated by ##promise(). You only need to invoke stop
			 * with the last promise, and all dependent promises will automatically stop as well. 
			 * 
			 *  <var>stop()</var> can be invoked as a function without context ('this'). Every promise has its own instance.
			 *
			 * @return In some cases, the <var>stop()</var> can return a value. This is currently only done by ##animate() and ##wait(), which will return the actual duration.
			 *         ##asyncEach()'s promise will also return any value it got from the promise that it stopped.
			 *
			 * @example Animation chain that can be stopped.
			 * <pre>
			 * var div = $('#myMovingDiv').set({$left: '0px', $top: '0px'});
			 * var prom = div.animate({$left: '200px', $top: '0px'}, 600, 0)
			 *    .then(function() {
			 *           return _.promise(div.animate({$left: '200px', $top: '200px'}, 800, 0), 
			 *                            div.animate({$backgroundColor: '#f00'}, 200));
			 *    }).then(function() {
			 *           return div.animate({$left: '100px', $top: '100px'}, 400);
			 *    });
			 *    
			 * $('#stopButton').on('click', prom.stop);
			 * </pre>
			 */   
			obj['stop'] = function() {
				each(assimilatedPromises, function(promise) {
					if (promise['stop'])
						promise['stop']();
				});
	
				return obj['stop0'] && call(obj['stop0']);
			};
	
			/*$
			 * @id then
			 * @name promise.then()
			 * @syntax promise.then()
			 * @syntax promise.then(onSuccess)
			 * @syntax promise.then(onSuccess, onError)
			 * 
			 * @module WEB
			 * Registers two callbacks that will be invoked when the ##promise#Promise##'s asynchronous operation finished 
			 * successfully (<var>onSuccess</var>) or an error occurred (<var>onError</var>). The callbacks will be called after  
			 * <var>then()</var> returned, from the browser's event loop.
			 * You can chain <var>then()</var> invocations, as <var>then()</var> returns another Promise object that you can attach to. 
					 *
			 * The full distribution of Minified implements the Promises/A+ specification, allowing interoperability with other Promises frameworks. 
			 *
			 * <strong>Note:</strong> If you use the Web module, you will get a simplified Promises implementation that cuts some corners. The most notable
			 * difference is that when a <code>then()</code> handler throws an exception, this will not be caught and the promise returned by 
			 * <code>then</code> will not be automatically rejected.
			 *
			 * @example Simple handler for an HTTP request. Handles only success and ignores errors.
			 * <pre>
			 * $.request('get', '/weather.html')
			 *     .then(function(txt) {
			 *        alert('Got response!');
			 *     });
			 * </pre>
			 *
			 * @example Including an error handler.
			 * <pre>
			 * $.request('get', '/weather.html')
			 *     .then(function(txt) {
			 *        alert('Got response!');
			 *     }, function(err) {
			 *        alert('Error!');
			 *     }));
			 * </pre>
			 *
			 * @example Chained handler.
			 * <pre>
			 * $.request('get', '/weather.do')
			 *     .then(function(txt) {
			 *        showWeather(txt);
			 *     }
			 *     .then(function() {
			 *        return $.request('get', '/traffic.do');
			 *     }
			 *     .then(function(txt) {
			 *        showTraffic(txt);
			 *     }
			 *     .then(function() {
			 *        alert('All result displayed');
			 *     }, function() {
			 *        alert('An error occurred');
			 *     });
			 * </pre>
			 *
			 * @param onSuccess optional a callback function to be called when the operation has been completed successfully. The exact arguments it receives depend on the operation.  
			 *                           If the function returns a ##promise#Promise##, that Promise will be evaluated to determine the state of the promise returned by <var>then()</var>. If it returns any other value, the 
			 *                           returned Promise will also succeed. If the function throws an error, the returned Promise will be in error state.
			 *                           Pass <var>null</var> or <var>undefined</var> if you do not need the success handler. 
			 * @param onError optional a callback function to be called when the operation failed. The exact arguments it receives depend on the operation. If the function returns a ##promise#Promise##, that promise will
			 *                           be evaluated to determine the state of the Promise returned by <var>then()</var>. If it returns anything else, the returned Promise will 
			 *                           have success status. If the function throws an error, the returned Promise will be in the error state.
			 *                           You can pass <var>null</var> or <var>undefined</var> if you do not need the error handler. 
			 * @return a new ##promise#Promise## object. If you specified a callback for success or error, the new Promises's state will be determined by that callback if it is called.
			 *         If no callback has been provided and the original Promise changes to that state, the new Promise will change to that state as well.
			 */   
			var then = obj['then'] = function (onFulfilled, onRejected) {
				var promise2 = promise();
				var callCallbacks = function() {
					try {
						var f = (obj['state'] ? onFulfilled : onRejected);
						if (isFunction(f)) {
													(function resolve(x) {
															try {
																	var then, cbCalled = 0;
																	if ((isObject(x) || isFunction(x)) && isFunction(then = x['then'])) {
											if (x === promise2)
												throw new TypeError();
											then.call(x, function(x) { if (!cbCalled++) resolve(x); }, function(value) { if (!cbCalled++) promise2['fire'](false, [value]);});
											promise2['stop0'] = x['stop'];
																	}
																	else
																			promise2['fire'](true, [x]);
															}
															catch(e) {
																	if (!(cbCalled++)) {
																			promise2['fire'](false, [e]);
																			if (!rejectionHandlerNum)
											throw e;
																	}
															}
													})(call(f, undef, obj['values']));
											}
											else
													promise2['fire'](obj['state'], obj['values']);
					}
					catch (e) {
						promise2['fire'](false, [e]);
						if (!rejectionHandlerNum)
							throw e;
					} 
				};
				if (isFunction(onRejected))
					obj['errHandled']();
				promise2['stop0'] = obj['stop'];
				promise2['parent'] = obj;
				if (obj['state'] != null)
					setTimeout(callCallbacks, 0);
				else
					deferred.push(callCallbacks);
				return promise2;
			};
	
			/*$
			 * @id always
			 * @group REQUEST
			 * @name promise.always()
			 * @syntax promise.always(callback)
			 * @configurable default
			 * @module WEB+UTIL
			 * Registers a callback that will always be called when the ##promise#Promise##'s operation ended, no matter whether the operation succeeded or not.
			 * This is a convenience function that will call ##then() with the same function for both arguments. It shares all of its semantics.
			 *
			 * @example Simple handler for a HTTP request.
			 * <pre>
			 * $.request('get', '/weather.html')
			 *     .always(function() {
			 *        alert('Got response or error!');
			 *     });
			 * </pre>
			 *
			 * @param callback a function to be called when the operation has been finished, no matter what its result was. The exact arguments depend on the operation and may
			 *                 vary depending on whether it succeeded or not. If the function returns a ##promise#Promise##, that Promise will
			 *                 be evaluated to determine the state of the returned Promise. If provided and it returns regularly, the returned promise will 
			 *                 have success status. If it throws an error, the returned Promise will be in the error state.
			 * @return a new ##promise#Promise## object. Its state is determined by the callback.
			 */
					obj['always'] = function(func) { return then(func, func); };
	
			/*$
			 * @id error
			 * @group REQUEST
			 * @name promise.error()
			 * @syntax promise.error(callback)
			 * @configurable default
			 * @module WEB, UTIL
			 * Registers a callback that will be called when the operation failed.
			 * This is a convenience function that will invoke ##then() with only the second argument set.  It shares all of its semantics.
			 *
			 * @example Simple handler for a HTTP request.
			 * <pre>
			 * $.request('get', '/weather.html')
			 *     .error(function() {
			 *        alert('Got error!');
			 *     });
			 * </pre>
			 *
			 * @param callback a function to be called when the operation has failed. The exact arguments depend on the operation. If the function returns a ##promise#Promise##, that Promise will
			 *                           be evaluated to determine the state of the returned Promise. If it returns regularly, the returned Promise will 
			 *                           have success status. If it throws an error, the returned Promise will be in error state.
			 * @return a new ##promise#Promise## object. Its state is determined by the callback.
			 */  
					obj['error'] = function(func) { return then(0, func); };
	
					return obj;
			}
	
		///#/snippet extrasFunctions
		///#snippet extrasDocs
			/*$
		 * @id length
		 * @group SELECTORS
		 * @requires dollar
		 * @name list.length
		 * @syntax length
			 * @module WEB, UTIL
		 * 
		 * Contains the number of elements in the ##list#Minified list##.
		 * 
		 * @example With Web module:
		 * <pre>
		 * var list = $('input');
		 * var myValues = {};
		 * for (var i = 0; i &lt; list.length; i++)
		 *    myValues[list[i].name] = list[i].value;
		 * </pre>
		 * 
		 * @example With Util module:
		 * <pre>
		 * var list = _(1, 2, 3);
		 * var sum = 0;
		 * for (var i = 0; i &lt; list.length; i++)
		 *    sum += list[i];
		 * </pre>
		 */
		/*$
		 * @stop 
		 */
		///#/snippet extrasDocs
	
		///#snippet utilM
	
		/*
		 * syntax: M(list, assimilateSublists)
		 *         M(null, singleElement) 
		 * 
		 * 
		 */
		/** @constructor */
		function M(list, assimilateSublists) {
			var self = this, idx = 0;
			if (list)
				for (var i = 0, len = list.length; i < len; i++) {
					var item = list[i];
					if (assimilateSublists && isList(item))
						for (var j = 0, len2 = item.length; j < len2; j++)
							self[idx++] = item[j];
					else 
						self[idx++] = item;
				}
			else
				self[idx++] = assimilateSublists;
	
			self['length'] = idx;
			self['_'] = true;
		}
	
		function _() {
			return new M(arguments, true);
		}
	
		///#/snippet utilM
	
		//// LIST FUNCTIONS ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	
		copyObj({
			///#snippet utilListFuncs
		/*$
		 * @id each
		 * @group LIST
		 * @requires
		 * @configurable default
		 * @name .each()
		 * @altname _.each()
		 * @syntax list.each(callback)
		 * @syntax list.each(callback, ctx)
		 * @syntax _.each(list, callback)
		 * @syntax _.each(list, callback, ctx)
		 * @module UTIL, WEB
		 * Invokes the given function once for each item in the list. The function will be called with the item as first parameter and 
		 * the zero-based index as second. Unlike JavaScript's built-in <var>forEach()</var> it will be invoked for each item in the list, 
		 * even if it is <var>undefined</var>.
		 *
		 * @example Creates the sum of all list entries. 
		 * <pre>
		 * var sum = 0;
		 * _(17, 4, 22).each(function(item, index) {
		 *     sum += item;
		 * });
		 * </pre>
		 *
		 * @example The previous example with a native array:
		 * <pre>
		 * var sum = 0;
		 * _.each([17, 4, 22], function(item, index) {
		 *     sum += item;
		 * });
		 * </pre>
		 * 
		 * @example This goes through all h2 elements of the class 'section' on a web page and changes their content:
		 * <pre>
		 * $('h2.section').each(function(item, index) {
		 *     item.innerHTML = 'Section ' + index + ': ' + item.innerHTML;
		 * });
		 * </pre>
		 * 
		 * @param list a list to iterate. Can be an array, a ##list#Minified list## or any other array-like structure with 
		 *             <var>length</var> property.
		 * @param callback The callback <code>function(item, index)</code> to invoke for each list element. 
		 *                 <dl><dt>item</dt><dd>The current list element.</dd>
		 *                 <dt>index</dt><dd>The second the zero-based index of the current element.</dd>
		 * 			       <dt class="this">this</dt><dd>The given context if not null. Otherwise the list.</dd>
		 *                 The callback's return value will be ignored.
		 * @param ctx optional a context to pass to the callback as 'this'. Only supported in UTIL module.
		 * @return the list
		 * 
		 * @see ##per() works like <var>each()</var>, but wraps the list elements in a list.
		 * @see ##find() can be used instead of <var>each()</var> if you need to abort the loop.
		 * @see ##eachObj() iterates through the properties of an object.
		 */
		'each': listBind(each),
	
		/*$
		 * @id filter
		 * @group LIST
		 * @requires 
		 * @configurable default
		 * @name .filter()
		 * @altname _.filter()
		 * @syntax list.filter(filterFunc)
		 * @syntax list.filter(filterFunc, ctx)
		 * @syntax list.filter(value)
		 * @syntax _.filter(list, filterFunc)
		 * @syntax _.filter(list, filterFunc, ctx)
		 * @syntax _.filter(list, value)
				* @module WEB, UTIL
		 * Creates a new ##list#Minified list## by taking an existing list and omitting certain elements from it. You
		 * can either specify a callback function to approve those items that will be in the new list (all modules), or 
		 * you can pass a value to remove from the new list (Util module only).
		 *  
		 * If the callback function returns true, the item is shallow-copied in the new list, otherwise it will be removed.
		 * For values, a simple equality operation (<code>==</code>) will be used.
		 *
		 * @example Removing all instances of the number 10 from a list:
		 * <pre>
		 * var list = _([4, 10, 22, 7, 2, 19, 10]).filter(10);
		 * </pre>
		 *
		 * @example Removing all numbers over 10 from a list:
		 * <pre>
		 * var list = _([4, 22, 7, 2, 19]).filter(function(item, index) {
		 *     return item &lt;= 10;
		 * });
		 * </pre>
		 * 
		 * @example The previous example with a native array is input. Note that the result is always a ##list#Minified list##:
		 * <pre>
		 * var list = _.filter([4, 22, 7, 2, 19], function(item, index) {
		 *     return item &lt;= 10;
		 * });
		 * </pre>
		 * 
		 * @example Creates a list of all unchecked checkboxes on a web page:
		 * <pre>
		 * var list = $('input').filter(function(item, index) {
		 *     return item.getAttribute('type') == 'checkbox' && item.checked;
		 * });
		 * </pre>
		 * 
		 * @param list a list to filter. A list to use as input. Can be an array, a ##list#Minified list## or any other array-like structure with 
		 *             <var>length</var> property.
		 * @param filterFunc The filter callback <code>function(item, index)</code> that decides which elements to include:
		 *        <dl><dt>item</dt><dd>The current list element.</dd>
		 *        <dt>index</dt><dd>The second the zero-based index of the current element.</dd>
		 *        <dt class="this">this</dt><dd>The given context if not null. Otherwise the list.</dd>
		 *        <dt class="returnValue">(callback return value)</dt><dd><var>true</var> to include the item in the new list, <var>false</var> to omit it.</dd></dl>  
		 * @param ctx optional a context to pass to the callback as 'this'. Only supported in UTIL module.
		 * @param value a value to remove from the list. It will be determined which elements to remove using <code>==</code>. Must not
		 *              be a function. Requires Util module.
		 * @return the new, filtered ##list#list##
		 * 
		 * @see ##only() offers selector-based filtering.
		 */
		'filter': listBindArray(filter),
	
		/*$ 
		 * @id collect 
		 * @group LIST 
		 * @requires 
		 * @configurable default 
		 * @name .collect()
		 * @altname _.collect
		 * @syntax list.collect(collectFunc) 
		 * @syntax list.collect(collectFunc, ctx) 
		 * @syntax _.collect(list, collectFunc)
		 * @syntax _.collect(list, collectFunc, ctx)
				* @module WEB, UTIL
		 * Creates a new ##list#Minified list## from the current list using the given callback function. 
		 * The callback is invoked once for each element of the current list. The callback results will be added to the result list. 
		 * The callback can return 
		 * <ul> 
		 * <li>an array or another list-like object. Its content will be appended to the resulting list.</li> 
		 * <li>a regular object which will be appended to the list</li> 
		 * <li><var>null</var> (or <var>undefined</var>), which means that no object will be added to the list. 
		 * If you need to add <var>null</var> or <var>undefined</var> to the result list, put it into a single-element array.</li> 
		 * </ul>
		 * 
		 * @example Goes through a list of numbers. Numbers over 10 will be removed. Numbers 5 and below stay. Numbers between 6 and 
		 * 10 will be replaced by two numbers whose sum is the original value.
		 * <pre> 
		 * var texts = _(3, 7, 11, 5, 19, 3).collect(function(number, index) { 
		 *     if (number > 10)
		 *         return null;           // remove numbers >10
		 *     else if (number > 5)
		 *         return [5, number-5];  // replace with two entries
		 *     else
		 *         return number;         // keep lower numbers
		 * }); 
		 * </pre> 
		 *  
		 * @example Goes through input elements on a web page. If they are text inputs, their value will be added to the list: 
		 * <pre> 
		 * var texts = $('input').collect(function(input) { 
		 *     if (input.getAttribute('type') != null || input.getAttribute('type') == 'text') 
		 *         return input.value; 
		 *     else 
		 *         return null; // ignore 
		 * }); 
		 * </pre> 
		 * 
		 * @example Creates a list of all children of the selected list. 
		 * <pre> 
		 * var childList = $('.mySections').collect(function(node) { 
		 *     return node.childNodes; // adds a while list of nodes 
		 * }); 
		 * </pre> 
		 * 
		 * @example Goes through selected input elements. For each hit, the innerHTML is added twice, once in lower case and once in upper case: 
		 * <pre> 
		 * var elements = $('input.myTexts').collect(function(item) { 
		 *     return [item.innerHTML.toLowerCase(), item.innerHTML.toUpperCase()]; 
		 * }); 
		 * </pre> 
		 * 
		 * @param list a list to transform. Can be an array, a ##list#Minified list## or any other array-like structure with 
		 *             <var>length</var> property.
		 * @param collectFunc The callback <code>function(item, index)</code> to invoke for each item:
		 * <dl><dt>item</dt><dd>The current list element.</dd><dt>index</dt><dd>The second the zero-based index of the current element.</dd>
		 *        <dt class="this">this</dt><dd>The given context if not null. Otherwise the list.</dd>
		 *        <dt class="returnValue">(callback return value)</dt><dd>If the callback returns a list, its elements will be added to 
		 *        the result list. Other objects will also be added. Nulls and <var>undefined</var> will be ignored and not be added to 
		 *        the new result list. </dd></dl>
		 * @param ctx optional a context to pass to the callback as 'this'. Only supported in UTIL module.
		 * @return the new ##list#list##
		 * 
		 * @see ##map() is a simpler version of <var>collect()</var> that can be useful if there is a 1:1 mapping between
		 *      input and output list.
		 */ 
		'collect': listBindArray(collect),
	
		/*$ 
		 * @id map 
		 * @group LIST 
		 * @requires
		 * @configurable default 
		 * @name .map()
		 * @altname _.map()
		 * @syntax list.map(mapFunc) 
		 * @syntax list.map(mapFunc, ctx) 
		 * @syntax _.map(list, mapFunc)
		 * @syntax _.map(list, mapFunc, ctx)
				* @module UTIL
		 * Creates a new ##list#Minified list## from the current list using the given callback function. 
		 * The callback is invoked once for each element of the current list. The callback results will be added to the result list.
		 *  
		 * <var>map()</var> is a simpler version of ##collect(). Unlike <var>collect()</var>, it always creates lists of the same size as the input list, but 
		 * it is easier to use if the resulting list should contain nulls or nested list.
		 * 
		 * @example Goes through a list of numbers and creates a new list with each value increased by 1:
		 * <pre> 
		 * var inced = _(3, 7, 11, 5, 19, 3).map(function(number, index) { 
		 *     return number + 1;
		 * }); 
		 * </pre> 
		 * 
		 * @example The previous example with a native array is input. Note that the result is always a ##list#Minified list##:
		 * <pre> 
		 * var inced = _.map([3, 7, 11, 5, 19, 3], function(number, index) { 
		 *     return number + 1;
		 * }); 
		 * </pre> 
		 * 
		 * @param list a list to transform. Can be an array, a ##list#Minified list## or any other array-like structure with 
		 *             <var>length</var> property.
		 * @param mapFunc The callback <code>function(item, index)</code> to invoke for each item:
		 * <dl><dt>item</dt><dd>The current list element.</dd><dt>index</dt><dd>The second the zero-based index of the current element.</dd>
		 *        <dt class="this">this</dt><dd>The given context if not null. Otherwise the list.</dd>
		 *        <dt class="returnValue">(callback return value)</dt><dd>This value will replace the original value in the new list.</dd></dl>
		 * @param ctx optional a context to pass to the callback as 'this'.
		 * @return the new ##list#list##
		 * 
		 * @see ##collect() is a more powerful version of <var>map()</var>.
		 */ 
		'map': listBindArray(map),
	
		/*$ 
		 * @id toobject
		 * @group LIST 
		 * @requires
		 * @configurable default 
		 * @name .toObject()
		 * @altname _.toObject()
		 * @syntax list.toObject(value)
		 * @syntax _.toObject(keyList, value)
		 * @module UTIL
		 * Creates an object map from a list of keys and a single values.
		 * <var>toObject()</var> goes through all values of the key list and adds a property with this key and the given a value.
	
		 * @example Create a simple object map:
		 *  <pre> 
		 *  var map = _.toObject(['a', 'b', 'c'], 1);  // creates {a:1, b:1, c:1}
		 * </pre> 
		 * 
		 * @example Same result, but with a list method:
		 *  <pre> 
		 *  var map = _('a', 'b', 'c').toObject(1);  // creates {a:1, b:1, c:1}
		 * </pre> 
		 * 
		 * @param keyList A list or array to use for the keys of the new object.
		 * @param value the value to use
		 * @return the new object
		 */ 
		'toObject': listBind(toObject),
	
		/*$ 
		 * @id equals
		 * @group LIST 
		 * @requires
		 * @configurable default 
		 * @name .equals()
		 * @altname _.equals()
		 * @syntax list.equals(otherObject)
		 * @syntax _.equals(thisObject, otherObject)
		 * @module UTIL
		 * Checks whether two values, lists or objects are equal in a deep comparison.
		 * 
		 * First <var>equals()</var> checks whether it got a function as parameter. 
		 * If yes, it will be invoked without arguments and <var>equals()</var> calls itself recursively with the function's result.
		 * 
		 * Once both values are no functions anymore, the values will be evaluated, If the first value is...
		 * <ul><li>...<var>null</var> or <var>undefined</var>, they are only equal if the other one is also either <var>null</var> or <var>undefined</var>.</li>
		 * <li>...a value as defined by ##_.isValue(), but not a Date, they are equal if the other value is the same type and is equal according to the '==' operator.</li>
		 * <li>...a Date, they are equal if the other value is a Date representing the same time.</li>
		 * <li>...a list or array, they are equal if the other value is also either a list or an array, has the same number of items and all items equal the items of the other
		 *         list at the same position. The equality of list items is determined recursively using the same rules, so you can also nest lists.</li>
		 * <li>...a function, it will be invoked without arguments and its return value is evaluated using these rules as if the value has been passed. </li>
		 * <li>...any other object, they are equal if they contain exactly the same keys (as defined by ##_.eachObj()) and all values are equal as determined using these rules
		 *      recursively.</li>
		 * </ul>
		 * 
		 * Please note that, according to the rules, a ##list#Minified list## is equal to an array, as long as their content is equal. <var>equals</var> does not 
		 * differentiate between <var>null</var> and <var>undefined</var>.
		 *
		 * <var>equals</var> is commutative. If you swap the parameters, the result is the same as long as no functions are involved.
		 * 
		 * @example Compare a list and an array:
		 *  <pre> 
		 *  _.equals([1, 2, 3], _(1, 2, 3));  // returns true
		 * </pre> 
		 * 
		 * @example Same result, but with a list method:
		 *  <pre> 
		 *  _(1, 2, 3).equals([1, 2, 3]);  // returns true
		 * </pre> 
		 * 
		 * @param thisObject The first reference to evaluate.
		 * @param otherObject The second reference to evaluate.
		 * @return true if both references are equal. False otherwise.
		 */ 
		'equals': listBind(equals),
	
		/*$ 
		 * @id sub
		 * @group LIST 
		 * @requires  
		 * @configurable default 
		 * @name .sub()
		 * @altname _.sub()
		 * @syntax list.sub(startIndex) 
		 * @syntax list.sub(startIndex, endIndex) 
		 * @syntax _.sub(list, startIndex) 
		 * @syntax _.sub(list, startIndex, endIndex) 
		 * @module WEB, UTIL
		 * Returns a new ##list#Minified list## containing only the elements in the specified range. If there are no elements in the range,
		 * an empty list is returned.
		 * Negative indices are supported and will be added to the list's length, thus allowing you to specify ranges at the list's end.
		 *
		 * If you only want to have a single element from the list, you can only use ##only().
		 *
		 * @example Takes only the second and third element:
		 * <pre> 
		 * var secndAndThird = _(5, 6, 7, 8, 9).sub(2, 4);
		 * </pre> 
		 *
		 * @example The same using an array:
		 * <pre> 
		 * var secndAndThird = _.sub([5, 6, 7, 8, 9], 2, 4);
		 * </pre> 
		 *
		 * @example Adds some text the 3rd to 5th list elements:
		 * <pre> 
		 * $('#myList li').sub(3, 6).add('Hello');
		 * </pre> 
		 *
		 * @example Clears all elements but the first:
		 * <pre> 
		 * $('#myList li').sub(1).fill();
		 * </pre> 
		 *
		 * @example Changes the class of the last list element:
		 * <pre> 
		 * $('#myList li').sub(-1).set('+lastItem');
		 * </pre> 
		 * 
		 * @param list A list to use as input. Can be an array, a ##list#Minified list## or any other array-like structure with 
		 *             <var>length</var> property.
		 * @param startIndex the 0-based position of the sub-list start. If negative, the list's length is added and the position is relative
		 *                   to the list's end.
		 * @param endIndex optional the 0-based position of the sub-list end. If negative, the list's length is added and the position is relative
		 *                   to the list's end. If omitted or null, all elements following the <var>startIndex</var> are included in the result.
		 * @return a new ##list#list## containing only the items in the index range. 
		 */ 
		'sub': listBindArray(sub),
	
		/*$ 
		 * @id reverse
		 * @group LIST 
		 * @requires  
		 * @configurable default 
		 * @name .reverse()
		 * @altname _.reverse()
		 * @syntax list.reverse() 
		 * @syntax _.reverse(list) 
		 * @syntax _.reverse(string) 
		 * @module UTIL
		 * Returns a new ##list#Minified list## or string with the input's elements/characters in reverse order. The first element is swapped 
		 * with the last, the second with the second to last and so on.
		 *
		 * @example Changes the order of a list:
		 * <pre> 
		 * var rev = _('a', 'b', 'c').reverse(); // returns _('c', 'b', 'a')
		 * </pre> 
		 * 
		 * @example The same with an array:
		 * <pre> 
		 * var rev = _.reverse(['a', 'b', 'c']); // returns _('c', 'b', 'a')
		 * </pre> 
		 * 
		 * @example Or a string:
		 * <pre> 
		 * var rev = _.reverse("abc"); // returns _("cba")
		 * </pre> 
		 * 
		 * @param list A list to use as input. Can be an array, a ##list#Minified list## or any other array-like structure with 
		 *             <var>length</var> property.
		 * @param string A string to use as input
		 * @return a new ##list#list## or string with the input in reverse order. 
		 */ 
		'reverse': listBind(reverse),
	
		/*$ 
		 * @id find 
		 * @group LIST 
		 * @requires
		 * @configurable default 
		 * @name .find()
		 * @altname _.find()
		 * @syntax list.find(findFunc) 
		 * @syntax list.find(element) 
		 * @syntax list.find(findFunc, startIndex) 
		 * @syntax list.find(element, startIndex) 
		 * @syntax _.find(list, findFunc) 
		 * @syntax _.find(list, element) 
		 * @syntax _.find(list, findFunc, startIndex) 
		 * @syntax _.find(list, element, startIndex) 
		 * @module WEB, UTIL
		 * Finds a specific value in the list. There are two ways of calling <var>find()</var>:
		 * <ol>
		 * <li>With a value as argument. Then <var>find()</var> will search for the first occurrence of an identical value in the list,
		 *     using the '===' operator for comparisons, and return the index. If it is not found,
		 *     <var>find()</var> returns <var>undefined</var>.</li>
		 * <li>With a callback function. <var>find()</var> will then call the given function for each list element until the function 
		 *     returns a value that is not <var>null</var> or <var>undefined</var>. This value will be returned.</li>
		 * </ol>
		 * 
		 * <var>find()</var> can also be used as an alternative to ##each() if you need to abort the loop.
		 *
		 * @example Finds the first negative number in the list:
		 * <pre> 
		 * var i = _(1, 2, -4, 5, 2, -1).find(function(value, index) { if (value &lt; 0) return index; }); // returns 2
		 * </pre> 
	
		 * @example Finds the index of the first 5 in the array:
		 * <pre> 
		 * var i = _.find([3, 6, 7, 6, 5, 4, 5], 5); // returns 4 (index of first 5)
		 * </pre> 
		 *
		 * @example Determines the position of the element with the id '#wanted' among all li elements:
		 * <pre> 
		 * var elementIndex = $('li').find($$('#wanted'));
		 * </pre> 
		 * 
		 * @example Goes through the elements to find the first div that has the class 'myClass', and returns this element:
		 * <pre> 
		 * var myClassElement = $('div').find(function(e) { if ($(e).is('.myClass')) return e; });
		 * </pre> 
		 * 
		 * @param list A list to use as input. Can be an array, a ##list#Minified list## or any other array-like structure with 
		 *             <var>length</var> property.
		 * @param findFunc The callback <code>function(item, index)</code> that will be invoked for every list item until it returns a non-null value:
		 * <dl><dt>item</dt><dd>The current list element.</dd><dt>index</dt><dd>The second the zero-based index of the current element.</dd>
		 *        <dt class="this">this</dt><dd>This list.</dd>
		 *        <dt class="returnValue">(callback return value)</dt><dd>If the callback returns something other than <var>null</var> or
		 *        <var>undefined</var>, <var>find()</var> will return it directly. Otherwise it will continue. </dd></dl>
		 * @param element the element to search for
		 * @param startIndex optional the 0-based index of the first element to search.
		 * @return if called with an element, either the element's index in the list or <var>undefined</var> if not found. If called with a callback function,
		 *         it returns either the value returned by the callback or <var>undefined</var>.
		 *         
		 * @see ##findLast() is the equivalent to <var>find()</var> for the list's end.
		 */ 
		 'find': listBind(find),
	
		/*$ 
		 * @id findlast
		 * @group LIST 
		 * @requires
		 * @configurable default 
		 * @name .findLast()
		 * @altname _.findLast()
		 * @syntax list.findLast(findFunc) 
		 * @syntax list.findLast(element) 
		 * @syntax list.findLast(findFunc, startIndex) 
		 * @syntax list.findLast(element, startIndex) 
		 * @syntax _.findLast(list, findFunc) 
		 * @syntax _.findLast(list, element) 
		 * @syntax _.findLast(list, findFunc, startIndex) 
		 * @syntax _.findLast(list, element, startIndex) 
		 * @module WEB, UTIL
		 * Finds the last occurrence of value in the list. There are two ways of calling <var>findLast()</var>:
		 * <ol>
		 * <li>With a value as argument. Then <var>findLast()</var> will search for the first occurrence of an identical value in the list,
		 *     using the '===' operator for comparisons, and return the index. If it is not found,
		 *     <var>findLast()</var> returns <var>undefined</var>.</li>
		 * <li>With a callback function. <var>findLast()</var> will then call the given function for each list element until the function 
		 *     returns a value that is not <var>null</var> or <var>undefined</var>. This value will be returned.</li>
		 * </ol>
		 *
		 * @example Finds the first negative number in the list:
		 * <pre> 
		 * var i = _(1, 2, -4, 5, 2, -1, 2).findLast(function(value, index) { if (value &lt; 0) return index; }); // returns 5
		 * </pre> 
		 *
		 * @example Finds the index of the last 5 in the array:
		 * <pre> 
		 * var i = _.findLast([3, 6, 7, 6, 5, 4, 5], 5); // returns 6
		 * </pre> 
		 *
		 * @example Determines the last position of the element with the id '#wanted' among all &lt;li> elements:
		 * <pre> 
		 * var elementIndex = $('li').findLast($$('#wanted'));
		 * </pre> 
		 * 
		 * @example Goes through the elements to find the last &lt;div> that has the class 'myClass', and returns this element:
		 * <pre> 
		 * var myClassElement = $('div').find(function(e) { if ($(e).is('.myClass')) return e; });
		 * </pre> 
		 * 
		 * @param list A list to use as input. Can be an array, a ##list#Minified list## or any other array-like structure with 
		 *             <var>length</var> property.
		 * @param findFunc The callback <code>function(item, index)</code> that will be invoked for every list item until it returns a non-null value:
		 * <dl><dt>item</dt><dd>The current list element.</dd><dt>index</dt><dd>The second the zero-based index of the current element.</dd>
		 *        <dt class="this">this</dt><dd>This list.</dd>
		 *        <dt class="returnValue">(callback return value)</dt><dd>If the callback returns something other than <var>null</var> or
		 *        <var>undefined</var>, <var>find()</var> will return it directly. Otherwise it will continue. </dd></dl>
		 * @param element the element to search for
		 * @param startIndex optional the 0-based index of the first element to search.
		 * @return if called with an element, either the element's index in the list or <var>undefined</var> if not found. If called with a callback function,
		 *         it returns either the value returned by the callback or <var>undefined</var>.
		 *         
		 * @see ##find() is the equivalent to find values at the end of a list.
		 */ 
		 'findLast': listBind(findLast),
	
		/*$ 
		 * @id startswith 
		 * @group LIST 
		 * @requires
		 * @configurable default 
		 * @name .startsWith()
		 * @altname _.startsWith()
		 * @syntax list.startsWith(otherList) 
		 * @syntax _.startsWith(list, otherList) 
		 * @syntax _.startsWith(baseString, otherString) 
		 * @module UTIL
		 * Checks whether the list or string starts with the other string or list.
		 *
		 * If you compare lists, each item of the other list is compared with the item at the same position of the
		 * base list using ##_.equals(). Arrays can be used interchangably with lists. If the first argument is a list and the second is
		 * not, it will be converted to a list.
		 * 
		 * If you compare strings, each character of the other string is compared with the character at the same position of the
		 * base string.
		 * 
		 *
		 * @example Checks whether a list starts with [1, 2]:
		 * <pre> 
		 * var r = _(1, 2, 3, 4, 5).startsWith([1, 2]);   // returns true
		 * </pre> 
	
		 * @example The same using an array as base list:
		 * <pre> 
		 * var r = _.startsWith([1, 2, 3, 4, 5], [1, 2]); // returns true
		 * </pre> 
	
		 * @example Checks a string:
		 * <pre> 
		 * var r = _.startsWith("Cookie", "C"); // returns true
		 * </pre> 
		 *
		 * @param list A list to check. Can be an array, a ##list#Minified list## or any other array-like structure with 
		 *             <var>length</var> property.
		 * @param otherList A list to find at the beginning of the other string. Can be an array, a ##list#Minified list## or any other 
		 *             array-like structure with <var>length</var> property.  If it is not a list, it will be converted into a single-element list.
		 * @param baseString a string to check
		 * @param otherString the string to find at the beginning of the other string
		 * @return true if the base list or string starts with the other list/string. False otherwise.
		 * 
		 * @see ##endsWith() is the equivalent for the list's or string's end.
		 */ 
		 'startsWith': listBind(startsWith),
	
		/*$ 
		 * @id endswith 
		 * @group LIST 
		 * @requires
		 * @configurable default 
		 * @name .endsWith()
		 * @altname _.endsWith()
		 * @syntax list.endsWith(otherList) 
		 * @syntax _.endsWith(list, otherList) 
		 * @syntax _.endsWith(baseString, otherString) 
		 * @module UTIL
		 * Checks whether the list or string ends with the other string or list.
		 *
		 * If you compare lists, each item of the other list is compared with the item at the same position relative to the end of the
		 * base list using ##_.equals(). Arrays can be used interchangably with lists. If the first argument is a list and the second is
		 * not, it will be converted to a list.
		 * 
		 * If you compare strings, each character of the other string is compared with the character at the same position relative to the end 
		 * of the base string.
		 * 
		 *
		 * @example Checks whether a list ends with [4, 5]:
		 * <pre> 
		 * var r = _(1, 2, 3, 4, 5).startsWith([4, 5]);   // returns true
		 * </pre> 
	
		 * @example The same using an array as base list:
		 * <pre> 
		 * var r = _.startsWith([1, 2, 3, 4, 5], [4, 5]); // returns true
		 * </pre> 
	
		 * @example Checks a string:
		 * <pre> 
		 * var r = _.startsWith("Cookie", "okie"); // returns true
		 * </pre> 
		 *
		 * @param list A list to check. Can be an array, a ##list#Minified list## or any other array-like structure with 
		 *             <var>length</var> property.
		 * @param otherList A list to find at the end of the other string. Can be an array, a ##list#Minified list## or any other 
		 *             array-like structure with <var>length</var> property. If it is not a list, it will be converted into a single-element list.
		 * @param baseString a string to check
		 * @param otherString the string to find at the end of the other string
		 * @return true if the base list or string ends with the other list/string. False otherwise.
		 * 
		 * @see ##startsWith() is the equalent for the beginning of a list or string.
		 */ 
		 'endsWith': listBind(endsWith),
	
		/*$ 
		 * @id contains 
		 * @group LIST 
		 * @requires
		 * @configurable default 
		 * @name .contains()
		 * @altname _.contains()
		 * @syntax list.contains(item) 
		 * @syntax _.contains(list, item) 
		 * @module UTIL
		 * Checks whether the list contains the given item.
		 *
		 * Each item of the other list is compared with the item using ##_.equals(). The function
		 * returns <var>true</var> as soon as one list item equals the requested item.
		 * 
		 *
		 * @example Checks whether a list contains a 5:
		 * <pre> 
		 * var r = _(1, 2, 3, 4, 5).contains(5);   // returns true
		 * </pre> 
		 *
		 * @example The same using an array:
		 * <pre> 
		 * var r = _.contains([1, 2, 3, 4, 5], 5); // returns true
		 * </pre> 
		 *
		 * @param list A list to check. Can be an array, a ##list#Minified list## or any other array-like structure with 
		 *             <var>length</var> property.
		 * @param item The item to search.
		 * @return true if the list contains the item. False otherwise.
		 * 
		 * @see ##find() finds the position of a list element's fist occurrence.
		 * @see ##findLast() finds the last position of a list element.
		 */ 
		 'contains': listBind(contains),
	
		/*$ 
		 * @id call 
		 * @group LIST 
		 * @requires
		 * @configurable default 
		 * @name .call()
		 * @altname _.call()
		 * @syntax list.call() 
		 * @syntax list.call(args) 
		 * @syntax list.call(fThis) 
		 * @syntax list.call(fThis, args) 
		 * @syntax _.call(list) 
		 * @syntax _.call(list, args) 
		 * @syntax _.call(list, fThis) 
		 * @syntax _.call(list, fThis, args) 
		 * @module UTIL
		 * Calls all functions in the list.
		 *
		 * <var>call</var> goes through all list items and, if they are functions, calls them with the specified arguments. 
		 * Elements that are not functions will be ignored. The return values of the functions will be written into a list
		 * of the same size and order as original list. If a input list item is not a function, the corresponding value in the result 
		 * list will be <var>undefined</var>.
		 *
		 * @param list A list containing the functions to call. Can be an array, a ##list#Minified list## or any other array-like structure with 
		 *             <var>length</var> property.
		 * @param args optional A list or array of arguments to pass to the functions.
		 * @param fThis optional If set, a value to pass as <var>this</var>. Please note that if you use a list as <var>fThis</var>,
		 *              you must set <var>args</var> also to an (possibly empty) array.
		 * @return A list containing the return values of the called functions, or <var>undefined</var> for list items that were not 
		 *         functions.
		 */ 
		'call': listBindArray(callList),
	
		/*$ 
		 * @id array 
		 * @group LIST 
		 * @requires
		 * @configurable default 
		 * @name .array()
		 * @altname _.array()
		 * @syntax list.array() 
		 * @syntax _.array(list) 
		 * @module UTIL
		 * Converts a ##list#Minified list## or other array-like structure into a native JavaScript array.
		 *
		 * @param list The list to convert. Can be an array, a ##list#Minified list## or any other array-like structure with 
		 *             <var>length</var> property.
		 * @return A native array containing a shallow copy of the input array's values.
		 */
		'array': listBind(array),
	
		/*$ 
		 * @id unite 
		 * @group LIST 
		 * @requires
		 * @configurable default 
		 * @name .unite()
		 * @altname _.unite()
		 * @syntax list.unite() 
		 * @syntax _.unite(list) 
		 * @module UTIL
		 * Takes a list of functions as input to create a new function that calls all input functions with the same
		 * arguments. 
		 *
		 * @param list The list of functions. Can be an array, a ##list#Minified list## or any other array-like structure with 
		 *             <var>length</var> property.
		 * @return A function that will invoke all underlying functions with the arguments is has been called with. The function
		 *         returns a ##list#Minified list## of result values, using the same mechanics as ##_.call().
		 */
		'unite': listBind(unite), 
	
		/*$ 
		 * @id merge 
		 * @group LIST 
		 * @requires
		 * @configurable default 
		 * @name .merge()
		 * @altname _.merge()
		 * @syntax list.merge() 
		 * @syntax list.merge(target) 
		 * @syntax _.merge(list) 
		 * @syntax _.merge(list, target) 
		 * @module UTIL
		 * Takes a list of objects and copies the properties into the target object. If no target object has been given, a new object will be created.
		 * Values will be shallow-copied. If a property is in the list more than once, the last one will be used.
		 *
		 * @param list The list of objects. Can be an array, a ##list#Minified list## or any other array-like structure with 
		 *             <var>length</var> property.
		 * @param target optional a target object to copy the properties to. If no target is given, <var>merge()</var creates a new object.
		 * @return a new object that contains the pro
		 * @see ##_.extend() is similar, but uses varargs.
		 * @see ##_.copyObj() copies a single object.
		 */
		'merge': listBind(merge), 
	
		/*$ 
		 * @id uniq 
		 * @group LIST 
		 * @requires
		 * @configurable default 
		 * @name .uniq()
		 * @altname _.uniq()
		 * @syntax list.uniq() 
		 * @syntax _.uniq(list) 
		 * @module UTIL
		 * Takes a list of values and removes all duplicates. If a value occurs more than once in the input list, only the first occurrence
		 * will be kept and all following occurrences will be filtered out.
		 * 
		 * Uses object properties to keep track which values already occurred. This means that it only works with simple values that can
		 * be converted to strings.  
		 *
		 * @param list The list of values. Can be an array, a ##list#Minified list## or any other array-like structure with 
		 *             <var>length</var> property.
		 * @return A ##list#Minified list## without duplicates.
		 */
		'uniq': listBindArray(uniq),
	
		/*$ 
		 * @id intersection 
		 * @group LIST 
		 * @requires
		 * @configurable default 
		 * @name .intersection()
		 * @altname _.intersection() 
		 * @syntax list.intersection(otherList) 
		 * @syntax _.intersection(list, otherList) 
		 * @module UTIL
		 * Takes two input lists to create a new list containing only those values that exist in both input lists.
		 * 
		 * Uses object properties to keep track which values exist. This means that it only works with simple values that can
		 * be converted to strings.  
		 *
		 * @param list The list of values. Can be an array, a ##list#Minified list## or any other array-like structure with 
		 *             <var>length</var> property.
		 * @param otherList The other list of values. Can be an array, a ##list#Minified list## or any other array-like structure with 
		 *             <var>length</var> property.
		 * @return A ##list#Minified list## containing only the duplicate values.
		 */
		'intersection': listBindArray(intersection), 
	
		/*$ 
		 * @id join 
		 * @group LIST 
		 * @requires
		 * @configurable default 
		 * @name .join() 
		 * @syntax list.join() 
		 * @syntax list.join(separator) 
		 * @module UTIL
		 * Converts list elements into strings and joins them into a single string, optionally separated with the given separator.
		 * This method is identical to Array's built-in <var>join()</var> method and also uses it internally.
		 *
		 * @example Join a few string:
		 * <pre>var joined = _('Harry', 'Bert', 'Tom', 'Bo').join(', '); // returns 'Harry, Bert, Tom, Bo'</pre>
		 *
		 * @param separator optional a separator to put between the joined strings. If omitted, the string "," (comma) will be used.
		 * @param otherList The other list of values. Can be an array, a ##list#Minified list## or any other array-like structure with 
		 *             <var>length</var> property.
		 * @return the resulting string
		 */
		'join': function(separator) {
			return map(this, nonOp).join(separator);
		},
	
		/*$ 
		 * @id reduce 
		 * @group LIST 
		 * @requires
		 * @configurable default 
		 * @name .reduce() 
		 * @syntax list.reduce(callback, memo) 
		 * @module UTIL
		 * Reduces the list into a single value with the help of a callback function. This callback will be called once for
		 * each element, with the return value of the previous invocation as parameter. <var>reduce()</var> returns the
		 * return value of the last invocation.
		 *
		 * @example Sum up some numbers:
		 * <pre>var sum = _(1, 2, 3).reduce(function(memo, item, index) { return memo + item; }, 0);
		 *
		 * @param callback The callback <code>function(memo, item, index)</code> to invoke for each list element. 
		 *                 <dl><dt>memo</dt><dd>On the first invocation, the <var>memo</var> argument given to <var>reduce()</var>. On
		 *                 all further invocation, this is the return value of the previous invocation.</dd>
		 *                 <dt>item</dt><dd>The current list element.</dd>
		 *                 <dt>index</dt><dd>The second the zero-based index of the current element.</dd>
		 *                 <dt class="this">this</dt><dd>This list.</dd>
		 *                 <dt class="returnValue">(callback return value)</dt><dd>Will be used as <var>memo</var> 
		 *                 argument of the next invocation. The last return value will be returned by <var>reduce()</var>.</dd></dl>
		 *                 
		 * @param memo the initial value that will be passed as <var>memo</var> argument to the callback on its very first invocation.
		 * @return the resulting value. If the list was empty, it returns the <var>memo</var> argument.
		 */
		'reduce': function(callback, memo) {
			each(this, function(elem, index) {
				memo = callback.call(this, memo, elem, index);
			});
			return memo;
		},
	
		/*$ 
		 * @id sort 
		 * @group LIST 
		 * @requires
		 * @configurable default 
		 * @name .sort() 
		 * @syntax list.sort() 
		 * @syntax list.sort(cmpFunc) 
		 * @module UTIL
		 * Sorts the list elements and returns a new, sorted list. You can specify a function to compare two elements.
		 * If you don't, the list elements will be converted into strings and sorted lexicographically.
		 * 
		 * <var>sort()</var> uses Array's method of the same name internally and shares its properties.
		 *    
		 * @example Sort a few names:
		 * <pre>var sorted = _('Harry', 'Bert', 'Tom', 'Bo').sort(); // returns _('Bo', 'Bert', 'Harry', 'Tom')</pre>
		 *    
		 * @param cmpFunc optional an optional <code>function(a, b)</code> to compare two list elements. It must return a number &lt;0 if <var>a</var> is smaller, than <var>b</var> 
		 *                         &gt;0 if <var>b</var> is larger and 0 if both are equal. If the function is omitted, the list elements will be converted into strings and compared 
		 *                        lexicographically.
		 * @return a new, sorted list
		 */
		'sort': function(func) {
			return new M(map(this, nonOp).sort(func));
		}
		/*$
		 * @stop 
		 */
		//@cond !sort dummySort:0
		,
		///#/snippet utilListFuncs
		///#snippet webListFuncs
	
		/*$
		 * @id remove
		 * @group SELECTORS
		 * @requires dollar
		 * @configurable default
		 * @name .remove()
		 * @syntax list.remove()
			* @module WEB
		 * Removes all elements in the list from the DOM tree.
		 * 
		 * On Minified builds with IE compatibility, <var>remove()</var> will also remove all event handlers in the
		 * removed DOM nodes to prevent memory leaks.
		 * 
		 * @example Removes the element with the id 'myContainer', including all children, from the DOM tree.
		 * <pre>
		 * $('#myContainer').remove(); 
		 * </pre>
		 */
		 'remove': function() {
			flexiEach(this, function(obj) {
	
				obj['parentNode'].removeChild(obj);
			});
		 },
	
		 /*$
			* @id text
			* @group SELECTORS
			* @requires dollar
			* @configurable default
			* @name .text()
			* @syntax list.text()
			* @module WEB
			* Returns the concatenated text content of all nodes in the list. 
			* This is done by going recursively through all elements and their children. The values of text and CDATA nodes
			* will be appended to the resulting string. Without legacy support, Minified will obtain the data using
			* the <var>textContent</var> property of all nodes.
			* 
			* Please note that unlike jQuery's <var>text()</var>, Minified's will not set text content. Use ##fill() to set text.
			* 
			* @example Returns the text of the element with the id 'myContainer'.
			* <pre>
			* var content = $('#myContainer').text(); 
			* </pre>
			* 
			* @return the concatenated text content of the nodes
			*/
		 'text': function () {
			return collector(flexiEach, this, function(e) {return e['textContent'];})['join']('');
		 },
	
		 /*$
			* @id trav
			* @group SELECTORS
			* @requires each
			* @configurable default
			* @name .trav()
			* @syntax list.trav(property)
			* @syntax list.trav(property, selector)
			* @syntax list.trav(property, selector, maxDepth)
			* @syntax list.trav(property, maxDepth)
			* @syntax list.trav(property, filterFunc)
			* @syntax list.trav(property, filterFunc, maxDepth)
			* @module WEB
			* Traverses each DOM node in the list using the given property; creates a new list that includes each visited node,
			* optionally filtered by the given selector.
			* 
			* <var>trav()</var> traverses the DOM tree for each list element until it finds a <var>null</var>.  
			* All visited nodes that match the given selector are added to the result list. If no selector is given,
			* only elements will be added. Duplicates will be automatically be removed from the resulting list.
			* 
			* Instead of the selector, you can also specify a function that evaluates whether an element matches.
			* 
			* DOM provides the following properties for traveral:
			* <table>
			* <tr><th>firstChild</th><td>Contains the first child.</td></tr>
			* <tr><th>firstElementChild</th><td>Contains the first element (not in IE &lt; 9).</td></tr>
			* <tr><th>lastChild</th><td>Contains the last child element.</td></tr>
			* <tr><th>lastElementChild</th><td>Contains the last child element (not in IE &lt; 9).</td></tr>
			* <tr><th>nextElementSibling</th><td>Contains the element that follows the current node (not in IE &lt; 9).</td></tr>
			* <tr><th>nextSibling</th><td>Contains the node that follows the current node (see also ##next() ).</td></tr>
			* <tr><th>parentNode</th><td>Contains the node's parent (see also ##up() ).</td></tr>
			* <tr><th>previousElementSibling</th><td>Contains the element that precedes the current node (not in IE &lt; 9).</td></tr>
			* <tr><th>previousSibling</th><td>Contains the node that precedes the current node.</td></tr>
			* </table>
			* 
			* @example Returns a list of all parent nodes, direct and indirect:
			* <pre>
			* var parents = $('.myElements').trav('parentNode'); 
			* </pre>
			*
			* @example Returns a list of all direct siblings of the original list:
			* <pre>
			* var parents = $('.sibs').trav('nextSibling', '*', 1); 
			* </pre>
			* 
			* @example Returns a list of all parent nodes, direct and indirect, that have the class 'specialParent':
			* <pre>
			* var parents = $('.myElements').trav('parentNode', '.specialParent'); 
			* </pre>
			* 
			* @example Returns a list of all direct parent nodes that are tables and have the class 'specialParent':
			* <pre>
			* var parents = $('.myElements').trav('parentNode', 'table.specialParent', 1); 
			* </pre>
			*
			 * @parm property the name of the property to traverse.
			* @param selector optional any selector valid for #dollar#$(), including CSS selectors and lists.
			*        <br/>Selectors are optimized for '*', '.classname', 'tagname' and 'tagname.classname'. The performance for other selectors
			*        is relative to the number of matches for the selector in the document. Default is '*', which includes all elements
			*        (but no other nodes such as text nodes).
		 * @param filterFunc a <code>function(node)</code> returning <var>true</var> for those nodes that match.
			* @param maxDepth optional the maximum number of steps to traverse. Defaults to unlimited.
			* @return the new list containing all visited nodes. Nodes of the original list are not included, unless they
			*         have been visited when traversing another node. Duplicate nodes will be automatically removed.
			*         
			* @see ##up() finds exactly one parent element that matches a selector.
			* @see ##next() finds one or more siblings that match a selector.
			*/
		'trav': function(property, selector, maxDepth) {
			var isNum = isNumber(selector);
			var f = getFilterFunc(isNum ? _null : selector); 
			var max = isNum ? selector : maxDepth;
			return new M(collectUniqNodes(this, function(node) {
					var r = [];
					var c = node;
					while ((c = c[property]) && r.length != max) // note that maxDepth and max can be undef
						if (f(c))
							r.push(c);
					return r;
				}));
		},
	
		/*$
			* @id next
			* @group SELECTORS
			* @requires trav
			* @configurable default
			* @name .next()
			* @syntax list.next()
			* @syntax list.next(selector)
			* @syntax list.next(maxDepth)
			* @syntax list.next(selector, maxDepth)
			* @syntax list.next(filterFunc)
			* @syntax list.next(filterFunc, maxDepth)
			* @module WEB
			* Finds the next sibling elements matching the given selector or filter function for each list element, and returns the results as a list.
			* By default, only one match is returned per list element, but you can increase the number of results using the second argument. 
			* You can get an infinite number of results per list element by passing -1.
			* 
			* <var>next(selector, maxDepth)</var> is just a shortcut for <code>trav('nextSibling', selector, maxDepth||1)</code>. 
			* <var>next()</var> uses ##trav() to traverse the DOM tree using <var>nextSibling</var> for each list element, until it either finds a 
			* matching element the specified amount of matches or there are no more elements. All matches will added to the result list. 
			* The result list is filtered to include only unique elements.
		 * 
			* Instead of the selector, you can also specify a function that evaluates whether an element matches.
			* 
			* @example Returns the immediate sibling element of a node:
			* <pre>
			* var parent = $('#child').next(); 
			* </pre>
			*
			* @example Returns the next &lt;hr> element following the node:
			* <pre>
			* var parent = $('#child').next('hr'); 
			* </pre>
			*
			* @example Returns all &lt;hr> elements following the node:
			* <pre>
			* var parent = $('#child').next('hr', -1); 
			* </pre>
			*
			* @example Returns the next 2 sibling elements of a node:
			* <pre>
			* var parent = $('#child').next(2); 
			* </pre>
			*
			* @example Returns all following siblings of a node:
			* <pre>
			* var parent = $('#child').next(-1); 
			* </pre>
			*
			* @example Returns a list of all direct sibling elements that have a class that starts with 'special':
			* <pre>
			* var specialSiblings = $('.myElements').next(function(node) {
			*     return /(^|\\s)special/.test(node.className);
			* }); 
			* </pre>
			*
			 * @parm property the name of the property to traverse.
			* @param selector optional any selector valid for #dollar#$(), including CSS selectors and lists.
			*        <br/>Selectors are optimized for '*', '.classname', 'tagname' and 'tagname.classname'. The performance for other selectors
			*        is relative to the number of matches for the selector in the document. Default is '*', which includes all elements.
		 * @param filterFunc a <code>function(node)</code> returning <var>true</var> for those nodes that match.
			* @param maxSiblings optional the maximum number of siblings to include per list element. Defaults to 1.
			* @return the new list that contains matching siblings elements. Duplicate nodes will be automatically removed.
			*         
			* @see ##trav() allows you to select other relatives such as preceding siblings or children.
			*/
		'next': function(selector, maxSiblings) {
			return this['trav']('nextSibling', selector, maxSiblings||1);
		},
	
		/*$
			* @id up
			* @group SELECTORS
			* @requires trav
			* @configurable default
			* @name .up()
			* @syntax list.up()
			* @syntax list.up(selector)
			* @syntax list.up(filterFunc)
			* @syntax list.up(selector, parentNum)
			* @syntax list.up(filterFunc, parentNum)
			* @module WEB
			* Finds the closest parents matching the given selector or filter function for each list element, and returns the results as a list.
			* 
			* <var>up(selector)</var> is just a shortcut for <code>trav('parentNode', selector, parentNum)</code>. 
			* <var>up()</var> uses ##trav() to traverse the DOM tree using <var>parentNode</var> for each list element, until it either finds a 
			* matching element or the tree's root has been reached. All matches will added to the result list, at most one for each item in the
			* original list. The result list is filtered to include only unique elements.
		 * 
			* Instead of the selector, you can also specify a function that evaluates whether an element matches.
			* 
			* @example Returns the immediate parent of a node:
			* <pre>
			* var parent = $('#child').up(); 
			* </pre>
			*
			* @example Returns all table elements that the list elements are directly contained in.
			* <pre>
			* var tables = $('td.selected').up('table'); 
			* </pre>
			* 
			* @example Returns a list of all direct parent nodes that have a class that starts with 'special':
			* <pre>
			* var specialParents = $('.myElements').up(function(node) {
			*     return /(^|\\s)special/.test(node.className);
			* }); 
			* </pre>
			*
			 * @parm property the name of the property to traverse.
			* @param selector optional any selector valid for #dollar#$(), including CSS selectors and lists.
			*        <br/>Selectors are optimized for '*', '.classname', 'tagname' and 'tagname.classname'. The performance for other selectors
			*        is relative to the number of matches for the selector in the document. Default is '*', which includes all elements.
		 * @param filterFunc a <code>function(node)</code> returning <var>true</var> for those nodes that match.
		 * @param maxParents maximum number of parents to return per list element. Default is 1.
			* @return the new list that contains matching parent elements. Duplicate nodes will be automatically removed.
			*         
			* @see ##trav() allows you to match more than one element. You can also select other relatives such as siblings or children.
			*/
		'up': function(selector, maxParents) {
			return this['trav']('parentNode', selector, maxParents||1);
		},
	
		 /*$
			* @id select
			* @group SELECTORS
			* @requires dollar
			* @configurable default
			* @name .select()
			* @syntax list.select(selector)
			* @syntax list.select(selector, childrenOnly)
			* @module WEB
			* Executes a selector with the list as context. <code>list.select(selector, childrenOnly)</code> is equivalent 
			* to <code>$(selector, list, childrenOnly)</code>. 
			* 
			* @example Returns a list of all list elements:
			* <pre>
			* var parents = $('ol.myList').select('li', true); 
			* </pre>
			* 
			* @example Returns a list of all child elements:
			* <pre>
			* var children = $('.myElements').select('*', true); 
			* </pre>
			* 
			* @param selector a selector or any other valid first argument for #dollar#$().
			* @param childrenOnly optional if set, only direct children of the context nodes are included in the list. Children of children will be filtered out. If omitted or not 
			*             true, all descendants of the context will be included. 
			* @return the new list containing the selected descendants.
			* 
			* @see ##only() executes a selector on the list elements, instead of their descendants.
			*/
		'select': function(selector, childOnly) {
			return $(selector, this, childOnly);
		},
	
		 /*$
			* @id is
			* @group SELECTORS
			* @requires find each
			* @configurable default
			* @name .is()
			* @syntax list.is()
			* @syntax list.is(selector)
			* @syntax list.is(filterFunc)
			* @module WEB
			* Checks whether all elements in the list match the given selector. Returns <var>true</var> if they all do, or <var>false</var>
			* if at least one does not.
			* 
			* One common use for <var>is()</var> is to check whether an element has a certain CSS class.
			* 
			* Please note that this method is optimized for the four simple selector forms '*', '.classname', 'tagname' 
			* and 'tagname.classname'. If you use any other kind of selector, be aware that selectors that match
			* many elements in the document can be slow.
			* 
			* @example Checks whether the element has the class 'myClass':
			* <pre>
			* var isMyClass = $('#myElement').is('.myClass'); 
			* </pre>
			* 
			* @example Checks whether the list contains only table rows:
			* <pre>
			* var areRows = $('.myRows').is('tr'); 
			* </pre>
			* 
			* @param selector optional any selector valid for #dollar#$(), including CSS selectors and lists.
			*        <br/>Selectors are optimized for '*', '.classname', 'tagname' and 'tagname.classname'. The performance for other selectors
			*        is relative to the number of matches for the selector in the document. Default is '*', which checks whether all list items
			*        are HTML elements.
			* @param filterFunc a <code>function(node)</code> returning <var>true</var> for those nodes that are approved.
			* @return <var>true</var> if all list elements match the selector. <var>false</var> otherwise.
			* 
			* @see ##only() removes elements from a list that do not match a selector.
			*/
		'is': function(selector) {
			return !this['find'](getInverseFilterFunc(selector));
		},
	
		 /*$
			* @id only
			* @group SELECTORS
			* @requires filter
			* @configurable default
			* @name .only()
			* @syntax list.only()
			* @syntax list.only(selector)
			* @syntax list.only(filterFunc)
			* @syntax list.only(index)
		 * @module COMMENT only(index) is always available. All others variants are only in the Web module.
			* Returns a new list that contains only those elements that match the given selector, match the callback function
			* or have the given index. If no parameter has been given, the method keeps all HTML elements 
			* and removes everything else (same as '*').
			* 
			* When you use selectors, please note that this method is optimized for the four simple 
			* selector forms '*', '.classname', 'tagname' and 'tagname.classname'. If you use any other kind of 
			* selector, be aware that selectors that match many elements can be slow.
			* 
			* @example Returns only those list elements have the classes 'listItem' and 'myClass':
			* <pre>
			* var myLis = $('li.listItem').only('.myClass'); 
			* </pre>
			* 
			* @example Returns a list of all forms:
			* <pre>
			* var forms = $('#content *').only('form'); 
			* </pre>
			* 
			* @param selector any selector valid for #dollar#$(), including CSS selectors and lists. 
			*        <br/>Selectors are optimized for '*', '.classname', 'tagname' and 'tagname.classname'. The performance for other selectors
			*        depends on the number of matches for the selector in the document. Default is '*', which keeps all elements
			*        (but no other nodes such as text nodes).
			* @param filterFunc a <code>function(node)</code> returning <var>true</var> for those nodes that are approved.
			* @param index the index of the element to keep. All elements with other index will be omitted. If there is no element
			*        with this index in the list, the returned list is empty.
			* @return a new list containing only elements matched by the selector/function/index.
			* 
			* @see ##not() creates a list of all elements not matching the selector.
			* @see ##select() executes a selector on the descendants of the list elements.
			* @see ##filter() offers function-based filtering.
			*/
		'only': function(selector) {
			return new M(filter(this, getFilterFunc(selector)));
		},
	
		 /*$
			* @id not
			* @group SELECTORS
			* @requires filter
			* @configurable default
			* @name .not()
			* @syntax list.not()
			* @syntax list.not(selector)
			* @syntax list.not(filterFunc)
			* @syntax list.not(index)
			* @module WEB
			* Returns a new list that contains only those elements that do not match the given selector, callback function
			* or have the given index. If no parameter has been given, the method removes all HTML elements 
			* and keeps the rest (same as '*').
			* 
			* When you use selectors, please note that this method is optimized for the four simple 
			* selector forms '*', '.classname', 'tagname' and 'tagname.classname'. If you use any other kind of 
			* selector, be aware that selectors that match many elements can be slow.
			* 
			* @example Returns only those list elements have the classes 'listItem' but not 'myClass':
			* <pre>
			* var myLis = $('li.listItem').not('.myClass'); 
			* </pre>
			* 
			* @example Returns a list of all elements except forms:
			* <pre>
			* var forms = $('#content *').not('form'); 
			* </pre>
			* 
			* @param selector any selector valid for #dollar#$(), including CSS selectors and lists. 
			*        <br/>Selectors are optimized for '*', '.classname', 'tagname' and 'tagname.classname'. The performance for other selectors
			*        depends on the number of matches for the selector in the document. Default is '*', which removes all elements
			*        (but keeps other nodes such as text nodes).
			* @param filterFunc a <code>function(node)</code> returning <var>true</var> for those nodes that should be removed.
			* @param index the index of the element to remove. All elements with other index will be kept. If there is no element
			*        with this index in the list, the returned list is identical to the original list.
			* @return a new list containing only elements not matched by the selector/function/index.
			* 
			* @see ##only() is the opposite of <var>not()</var> - it keeps all elements that match the selector.
			*/
		'not': function(selector) {
			return new M(filter(this, getInverseFilterFunc(selector)));
		},
	
			/*$
			* @id get
			* @group SELECTORS
			* @requires dollar
			* @configurable default
			* @name .get()
			* @syntax list.get(name)
			* @syntax list.get(name, toNumber)
			* @syntax list.get(list)
			* @syntax list.get(list, toNumber)
			* @syntax list.get(map)
			* @syntax list.get(map, toNumber)
			* @module WEB
			* Retrieves properties, attributes and styles from the list's first element. The syntax to request those values is mostly identical with ##set(). You can either
			* get a single value if you specify only one name, or get an object map when you specify several names using an array or an object map.
			* 
		 * The <var>name</var> parameter defines what kind of data you are reading. The following name schemes are supported:
		 * <table>
		 * <tr><th>Name Schema</th><th>Example</th><th>Sets what?</th><th>Description</th></tr>
		 * <tr><td>name</td><td>innerHTML</td><td>Property</td><td>A name without prefix of '$' or '@' gets a property of the object.</td></tr>
		 * <tr><td>@name</td><td>@href</td><td>Attribute</td><td>Gets the HTML attribute using getAttribute().</td></tr>
		 * <tr><td>%name</td><td>%phone</td><td>Data-Attribute</td><td>Gets a data attribute using getAttribute(). Data attributes are
		 *         attributes whose names start with 'data-'. '%myattr' and '@data-myattr' are equivalent.</td></tr>
		 * <tr><td>$name</td><td>$fontSize</td><td>CSS Property</td><td>Gets a style using the element's <var>style</var> object. 
		 *             The syntax for the CSS styles is camel-case (e.g. "$backgroundColor", not "$background-color"). Shorthand properties like "border" or "margin" are 
		 *             not supported. You must use the full name, e.g. "$marginTop". Minified will try to determine the effective style
			*             and thus will return the value set in style sheets if not overwritten using a regular style.</td></tr>
		 * <tr><td>$</td><td>$</td><td>CSS Classes</td><td>A simple <var>$</var> returns the CSS classes of the element and is identical with "className".</td></tr>
		 * <tr><td>$$</td><td>$$</td><td>Style</td><td>Reads the element's style attribute in a browser-independent way. On legacy IEs it uses
		 *             <var>style.cssText</var>, and on everything else just the "style" attribute.</td></tr>
		 * <tr><td>$$show</td><td>$$show</td><td>Show/Hide</td><td>Returns 1 if the element is visible and 0 if it is not visible. An element counts as
		 * visible if '$visibility' is not 'hidden' and '$display' is not 'none'. Other properties will be ignored, even if they can also be used to hide the element.</td></tr>
		 * <tr><td>$$fade</td><td>$$fade</td><td>Fade Effect</td><td>The name '$$fade' returns the opacity of the element as a value between 0 and 1.
		 * 			   '$$fade' will also automatically evaluate the element's 'visibility' and 'display' styles to find out whether the element is actually visible.</td></tr>
		 * <tr><td>$$slide</td><td>$$slide</td><td>Slide Effect</td><td>'$$slide' returns the height of the element in pixels with a 'px' suffix and is equivalent to '$height'.
		 * Please note that you can pass that 'px' value to '$$slide' in ##set(), which will then set the according '$height'.</td></tr>
		 * <tr><td>$$scrollX, $$scrollY</td><td>$$scrollY</td><td>Scroll Coordinates</td><td>The names '$$scrollX' and
		 *             '$$scrollY' can be used on <code>$(window)</code> to retrieve the scroll coordinates of the document.
		 *             The coordinates are specified in pixels without a 'px' unit postfix.</td></tr>
		 * </table>
			* 
			* @example Retrieves the id, title attribute and the background color of the element '#myElement':
			* <pre>
			* var id = $('#myElement).get('id'); 
			* var title = $('#myElement).get('@title'); 
			* var bgColor = $('#myElement).get('$backgroundColor'); 
			* </pre>
			*
			* @example Retrieves the id, title attribute and the background color of the element '#myElement' as a map:
			* <pre>
			* var m = $('#myElement).get(['id', '@title', '$backgroundColor']); 
			* var id = m.id;
			* var title = m['@title'];
			* var bgColor = m.$backgroundColor;
			* </pre>
			*
			* @example Uses ##get() and ##set() to reposition an element:
			* <pre>
			* var coords = $('#myElement').get({$top: 0, $left: 0}, true); 
			* coords.$top = coords.$top + 10 + 'px';
			* coords.$left = coords.$left + 20 + 'px';
			* $('#myElement').set(coords);
			* </pre>
			* Please note that the values of $top and $left in the <var>get()</var> invocation do not matter and will be ignored!
			*
		 * @param name the name of a single property or attribute to modify. Unprefixed names set properties, a '$' prefix sets CSS styles and
		 *        '@' sets attributes. Please see the table above for special properties and other options.
			* @param list in order to retrieve more than one value, you can specify several names in an array or list. <var>get()</var> will then return an object map
			*        containing the values.
			* @param map if you specify an object that is neither list nor string, <var>get()</var> will use it as a map of property names. Each property name will be requested. 
			* The values of the properties in the map will be ignored. <var>get()</var> will then return a new object map containing of results.
			* @param toNumber if 'true', <var>get()</var> converts all returned values into numbers. If they are strings, 
			*                 <var>get()</var> removes any non-numeric characters before the conversion. This is useful when you request 
			*                 a CSS property such as '$marginTop'  that returns a value with a unit suffix, like "21px". <var>get()</var> will convert it 
			*                 into a number and return 21. If the returned value is not parsable as a number, <var>NaN</var> will be returned.
			* @return if <var>get()</var> was called with a single name, it returns the corresponding value. 
			*         If a list or map was given, <var>get()</var> returns a new object map with the names as keys and the values as values.
			*         It returns <var>undefined</var> if the list is empty.
		 *
			* @see ##set() sets values using the same property syntax.
			*/
		'get': function(spec, toNumber) {
			var self = this;
			var element = self[0];
	
			if (element) {
				if (isString(spec)) {
					var match = /^(\W*)(.*)/.exec(replace(spec, /^%/,'@data-'));
					var prefix = match[1];
					var s;
	
					if (getter[prefix])
						s = getter[prefix](this, match[2]);
					else if (spec == '$') 
						s = self['get']('className');
					else if (spec == '$$') {
							s = self['get']('@style');
					}
					else if (spec == '$$slide')
						s = self['get']('$height');
					else if (spec == '$$fade' || spec == '$$show') {
						if  (self['get']('$visibility') == 'hidden' || self['get']('$display') == 'none')
							s = 0;
						else if (spec == '$$fade') {
							s = 
								isNaN(self['get']('$opacity', true)) ? 1 : self['get']('$opacity', true); 
						}
						else // $$show
							s = 1;
					}
					else if (prefix == '$') {
							s = _window['getComputedStyle'](element, _null)['getPropertyValue'](replace(match[2], /[A-Z]/g, function (match2) {  return '-' + match2.toLowerCase(); }));
					}
					else if (prefix == '@')
						s = element.getAttribute(match[2]);
					else
						s = element[match[2]];
					return toNumber ? extractNumber(s) : s;
				}
				else {
					var r = {};
					(isList(spec) ? flexiEach : eachObj)(spec, function(name) {
						r[name] = self['get'](name, toNumber);
					});
					return r;
				}
			}
		},
	
		/*$
		 * @id set
		 * @group SELECTORS
		 * @requires dollar get
		 * @configurable default
		 * @name .set()
		 * @syntax list.set(name, value)
		 * @syntax list.set(properties)
		 * @syntax list.set(cssClasses)
			* @module WEB
		 * 
		 * Modifies the list's elements by setting their properties, attributes, CSS styles and/or CSS classes. You can either supply a 
		 * single name and value to set only one property, or you can provide an object that contains name/value pairs to describe more than one property.
		 * More complex operations can be accomplished by supplying functions as values. They will then be called for each element that will
		 * be set.
		 *
		 * The <var>name</var> parameter defines what kind of data you are setting. The following name schemes are supported:
		 * 
		 * <table>
		 * <tr><th>Name Schema</th><th>Example</th><th>Sets what?</th><th>Description</th></tr>
		 * <tr><td>name</td><td>innerHTML</td><td>Property</td><td>A name without prefix of '$' or '@' sets a property of the object.</td></tr>
		 * <tr><td>@name</td><td>@href</td><td>Attribute</td><td>Sets the HTML attribute using setAttribute(). In order to stay compatible with Internet Explorer 7 and earlier, 
		 *             you should not set the attributes '@class' and '@style'. Instead use '$' and '$$' as shown below.</td></tr>
		 * <tr><td>%name</td><td>%phone</td><td>Data-Attribute</td><td>Sets a data attribute using setAttribute(). Data attributes are
		 *         attributes whose names start with 'data-'. '%myattr' and '@data-myattr' are equivalent.</td></tr>
		 * <tr><td>$name</td><td>$fontSize</td><td>CSS Property</td><td>Sets a style using the element's <var>style</var> object.
		 *         The syntax for the CSS styles is camel-case (e.g. "$backgroundColor", not "$background-color"). </td></tr>
		 * <tr><td>$</td><td>$</td><td>CSS Classes</td><td>A simple <var>$</var> modifies the element's CSS classes using the object's <var>className</var> property. The value is a 
		 *             space-separated list of class names. If prefixed with '-' the class is removed, a '+' prefix adds the class and a class name without prefix toggles the class.
		 *             The name '$' can also be omitted if <var>set</var> is called with class names as only argument.</td></tr>
		 * <tr><td>$$</td><td>$$</td><td>Style</td><td>Sets the element's style attribute in a browser-independent way.</td></tr>
		 * <tr><td>$$show</td><td>$$show</td><td>Show/Hide</td><td>If <var>true</var> or a number not 0, it will make sure the element is visible by
		 *         making sure '$display' is not 'none' and by setting '$visibility' to 'visible'. Please see ##show() for details. If the value is <var>false</var> or 0, it
		 *         will be hidden by setting '$display' to 'none'.</td></tr>
		 * <tr><td>$$fade</td><td>$$fade</td><td>Fade Effect</td><td>The name '$$fade' sets the opacity of the element in a browser-independent way. The value must be a number
		 *              between 0 and 1. '$$fade' will also automatically control the element's 'visibility' style. If the value is 0,
		 *             the element's visibility will automatically be set to 'hidden'. If the value is larger, the visibility will be set to 
		 *             'visible'. '$$fade' only works with block elements.</td></tr>
		 * <tr><td>$$slide</td><td>$$slide</td><td>Slide Effect</td><td>The name '$$slide' allows a vertical slide-out or slide-in effect. The value must be a number
		 *              between 0 and 1 and will be used to set the element's '$height'. '$$slide' will also automatically control the element's 'visibility' 
		 *              style. If the value is 0, the element's visibility will automatically be set to 'hidden'. If the value is larger, 
		 *              the visibility will be set to 'visible'. '$$slide' only works with block elements and will not set the
		 *              element's margin or padding. If you need a margin or padding, you should wrap the elements in a simple &lt;div>.</td></tr>
		 * <tr><td>$$scrollX, $$scrollY</td><td>$$scrollY</td><td>Scroll Coordinates</td><td>The names '$$scrollX' and
		 *             '$$scrollY' can be used on <code>$(window)</code> to set the scroll coordinates of the document.
		 *             The coordinates are specified in pixels, but must not use a 'px' unit postfix.</td></tr>
		 * </table>
		 *
		 * @example Unchecking checkboxes:
		 * <pre>
		 * $('input.checkbox').set('checked', false);
		 * </pre>
		 * 
		 * @example Changing the <var>innerHTML</var> property of an element:
		 * <pre>
		 * $('#toc').set('innerHTML', 'Content');
		 * </pre>
		 * 
		 * @example Changing attributes:
		 * <pre>
		 * $('a.someLinks').set('@href', 'http://www.example.com/');
		 * </pre>
		 * 
		 * @example Removing attributes:
		 * <pre>
		 * $('a.someLinks').set('@title', null);
		 * </pre>
		 * 
		 * @example Changing styles:
		 * <pre>
		 * $('.bigText').set('$fontSize', 'x-large');
		 * </pre>
		 * 
		 * @example Adding and removing CSS classes:
		 * <pre>
		 * $('.myElem').set('$', '+myClass -otherClass');
		 * </pre>
		 *  
		 * @example Toggling a CSS class:
		 * <pre>
		 * $('.myElem').set('$', 'on');
		 * </pre>
		 * 
		 * @example Shortcut for CSS manipulation:
		 * <pre>
		 * $('.myElem').set('+myClass -otherClass on');
		 * </pre>
		 * 	 
		 * @example Making an element transparent:
		 * <pre>
		 * $('.seeThrough').set('$$fade', 0.5);
		 * </pre>
		 * 	  
		 * @example Making an element visible. Note that $$fade will set the element's display style to 'block' and visibility style to 'visible'.
		 * <pre>
		 * $('.myElem').set('$$fade', 1);
		 * </pre>
		 * 
		 * @example Using a map to change several properties:
		 * <pre>
		 * $('input.checkbox').set({checked: false,
		 *                          '@title': 'Check this'});
		 * </pre>
		 * 
		 * @example Changing CSS with a map:
		 * <pre>
		 * $('.importantText').set({$fontSize: 'x-large',
		 *                          $color: 'black',
		 *                          $backgroundColor: 'red',
		 *                          $: '+selected -default'});
		 * </pre>
		 * 
		 * @example You can specify a function as value to modify a value instead of just setting it:
		 * <pre>
		 * $('h2').set('innerHTML', function(oldValue, index) { 
		 *     return 'Chapter ' + index + ': ' + oldValue.toUpperCase(); 
		 * });
		 * </pre>
		 * 
		 * @param name the name of a single property or attribute to modify. Unprefixed names set properties, a '$' prefix sets CSS styles and
		 *        '@' sets attributes. Please see the table above for special properties and other options.
		 * @param value the value to set. If value is <var>null</var> and name specified an attribute, the attribute will be removed.
		 * If dollar ('$') has been passed as name, the value can contain space-separated CSS class names. If prefixed with a '+' the class will be added,
		 * with a '-' prefix the class will be removed. Without prefix, the class will be toggled.
		 * If <var>value</var> is a function, the <code>function(oldValue, index, obj)</code> will be invoked for each list element 
		 * to evaluate the new value: 
		 * <dl><dt>oldValue</dt><dd>The old value of the property to be changed, as returned by ##get().
		 * For the CSS style names, this is the computed style of the property </dd>
		 * <dt>index</dt><dd>The list index of the object owning the property</dd>
		 * <dt>obj</dt><dd>The list element owning the property.</dd>
		 * <dt class="returnValue">(callback return value)</dt><dd>The value to be set.</dd></dl>
		 * Functions are not supported by '$'.
		 * @param properties a Object as map containing names as keys and the values to set as map values. See above for the name and value syntax.
		 * @param cssClasses if <var>set()</var> is invoked with a string as single argument, the name "$" (CSS classes) is assumed and the argument is the
		 *                   value. See above for CSS syntax.
		 *                   Instead of a string, you can also specify a <code>function(oldValue, index, obj)</code> to modify the existing classes. 
		 * @return the list
		 * 
		 * @see ##get() retrieves values using the same property syntax.
		 * @see ##animate() animates values using the same property syntax.
		 * @see ##toggle() can toggle between two sets of values.
		 * @see ##dial() allows smooth transitions between two sets of values.
		 */
		 'set': function (name, value) {
			 var self = this;
			 if (value !== undef) {
				 var match = /^(\W*)(.*)/.exec(replace(replace(name, /^\$float$/, 'cssFloat'), /^%/,'@data-'));
				 var prefix = match[1];
	
				 if (setter[prefix])
					 setter[prefix](this, match[2], value);
				 else if (name == '$$fade') {
					 this['set']({'$visibility': value ? 'visible' : 'hidden', '$opacity': value});
				 }
				 else if (name == '$$slide') {
					 self['set']({'$visibility': value ? 'visible' : 'hidden', '$overflow': 'hidden', 
									 '$height': /px/.test(value) ? value : function(oldValue, idx, element) { return getNaturalHeight($(element), value);}
												});
				 }
				 else if (name == '$$show') {
					 if (value) 
						 self['set']({'$visibility': value ? 'visible' : 'hidden', '$display': ''}) // that value? part is only for gzip
								 ['set']({'$display': function(oldVal) {                                // set for 2nd time: now we get the stylesheet's $display
									 return oldVal == 'none' ? 'block' : oldVal;
								}}); 
					 else 
						 self['set']({'$display': 'none'});
				 }
					else if (name == '$$') {
						self['set']('@style', value);
				 }
				 else
					 flexiEach(this, function(obj, c) { 
						 var newValue = isFunction(value) ? value($(obj)['get'](name), c, obj) : value;
						 if (prefix == '$') {
							 if (match[2])
								 obj['style'][match[2]] = newValue;
							 else {
								 flexiEach(newValue && newValue.split(/\s+/), function(clzz) { 
									 var cName = replace(clzz, /^[+-]/);
	
									 if (/^\+/.test(clzz))
									 obj['classList'].add(cName);
									 else if (/^-/.test(clzz))
									 obj['classList'].remove(cName);
									 else
									 obj['classList'].toggle(cName);
								 });
							 }
						 }
								 else if (name == '$$scrollX')
								obj['scroll'](newValue, $(obj)['get']('$$scrollY'));
								 else if (name == '$$scrollY')
								obj['scroll']($(obj)['get']('$$scrollX'), newValue);
						 else if (prefix == '@') {
							 if (newValue == _null)  
								 obj.removeAttribute(match[2]);
							 else
							 obj.setAttribute(match[2], newValue);
						 }
						 else
							 obj[match[2]] = newValue;
					 });
			 }
			 else if (isString(name) || isFunction(name))
				 self['set']('$', name);
			 else
				 eachObj(name, function(n,v) { self['set'](n, v); });
			 return self;
		 },
	
		/*$
		 * @id show
		 * @group ELEMENT
		 * @requires set
		 * @configurable default
		 * @name .show()
		 * @syntax list.show()
			* @module WEB
		 * Make the invisible element of the list visible. It does so by setting '$visibility' to 'visible' and making sure that 
		 * the '$display' style is not 'none'. Calling <var>show()</var> is the same as using ##set() to set '$$show' to 1.
		 * 
		 * First it will clear the element's direct '$display' style to remove any 'none' value that may be there. This helps
		 * if the element was hidden using the style attribute, or if it has been hidden using ##hide(). If the
		 * '$display' value is still null, it assumes that it has been hidden using a stylesheet and sets '$display' to 'none'.
		 * 
		 * Please note that because of the way <var>show()</var> works, it will not work correctly if you have hidden a non-block
		 * element like a table row using a stylesheet. In that case you can not use <var>show()</var> but should set '$display' manually using ##set().
		 *  
		 * Other properties that may hide elements, like '$opacity', are not modifed by <var>show()</var>.
		 *  
		 * @example Showing elements:
		 * <pre>
		 * $('.hidden').show();
		 * </pre> 
		 * 
		 * @return the current list
		 * 
		 * @see ##hide() hides elements.
		 * @see ##set() can do the same by setting '$$show' to 1, and is also still required for some non-block elements.
		 * @see ##animate() can be used with a '$$fade' or '$$slide' if you want to animate the element.
		 */
		 'show': function() {
			 return this['set']('$$show', 1);
		 },
	
		/*$
		 * @id hide
		 * @group ELEMENT
		 * @requires set
		 * @configurable default
		 * @name .hide()
		 * @syntax list.hide()
			* @module WEB
		 * Hides the elements of the list. It does so by writing 'none' into the '$display' style. This is the same as calling
		 * ##set() with the property name '$$show' and the value 0. 
		 * 
		 * Other properties that may hide elements, like '$visibility' or '$opacity', are not modifed by <var>hide()</var>.
		 *  
		 * @example Hiding elements:
		 * <pre>
		 * $('.visible').hide();
		 * </pre> 
		 * 
		 * @return the current list
		 * 
		 * @see ##show() makes elements visible.
		 * @see ##set() can do the same by setting '$$show' to 0.
		 * @see ##animate() can be used with a '$$fade' or '$$slide' if you want to animate the element.
		 */
		 'hide': function() {
			 return this['set']('$$show', 0);
		 },
	
		/*$
		 * @id add
		 * @group ELEMENT
		 * @requires dollar each
		 * @configurable default
		 * @name .add()
		 * @syntax list.add(text)
		 * @syntax list.add(node)
		 * @syntax list.add(list)
		 * @syntax list.add(factoryFunction)
			* @module WEB
		 * Adds the given node(s) as children to the list's HTML elements. If a string has been given, it will be added as text node.
		 * DOM nodes will be added directly. If you pass a list, all its elements will be added using the rules above.
		 *
		 * When you pass a DOM node and the target list has more than one element, the original node will be added to the first list element,
		 * and ##clone#clones## to all following list elements.
		 * 
		 * ##EE(), ##HTML() and ##clone() are compatible with <var>add()</var> and can help you create new HTML nodes.
		 *
		 * @example Using the following HTML:
		 * <pre>
		 * &lt;div id="comments">Here is some text.&lt;br/>&lt;/div>
		 * </pre> 
		 * The next line appends a text node to the div:
		 * <pre>
		 * $('#comments').add('Some additional text.');
		 * </pre>
		 * This results in:
		 * <pre>
		 * &lt;div id="comments">Here is some text.&lt;br/>Some additional text.&lt;/div>
		 * </pre> 
		 *
		 * @example Using the following HTML: 
		 * <pre>
		 * &lt;ul id="myList">
		 *   &lt;li>First list entry&lt;/li>
		 *   &lt;li>Second list entry&lt;/li>
		 * &lt;/ul>
		 * </pre>
		 * The following Javascript adds an element to the list:
		 * <pre>
		 * $('#myList').add(EE('li', 'My extra point');
		 * </pre>
		 * This results in
		 * <pre>
		 * &lt;ul id="myList">
		 *   &lt;li>First list entry&lt;/li>
		 *   &lt;li>Second list entry&lt;/li>
		 *   &lt;li>My extra point&lt;/li>
		 * &lt;/ul>
		 * </pre>
		 *
		 * @example Use a list to add several elements at once:
		 * <pre>
		 * $('#comments').add([
		 *      EE('br'), 
		 *     'Some text', 
		 *     EE('span', {'className': 'highlight'}, 'Some highlighted text')
		 * ]);
		 * </pre>
		 *
		 * @example If you need to customize the content, you can write a factory function:
		 * <pre>
		 * $('.chapter').add(function(parent, index) { return EE('h2', 'Chapter number ' + index); });
		 * </pre>
		 *
		 * @param text a string or number to add as text node
		 * @param node a DOM node to add to the list. If the list has more than one element, the given node will be added to the first element.
		 *             For all additional elements, the node will be cloned using ##clone().
		 * @param list a list containing text and/or nodes. May also contain nested lists with nodes or text..
		 * @param factoryFunction a <code>function(listItem, listIndex)</code> that will be invoked for each list element to create the nodes: 
		 * <dl><dt>listItem</dt><dd>The list element that will receive the new children.</dd>
		 * <dt>listIndex</dt><dd>The index of the list element that will receive the new children.</dd>
		 * <dt class="returnValue">(callback return value)<dt><dd>The node(s) to be added to the list element.
		 * Can be either a string for a text node, an HTML element or a list containing strings and/or DOM nodes.
		 * If a function is returned, it will be invoked recursively with the same arguments.</dd></dl>
		 * @return the current list
		 * 
		 * @see ##fill() works like <var>add()</var>, but deletes all children before adding the new nodes.
		 * @see ##addFront() adds nodes as first child, not as last.
		 * @see ##addAfter() adds nodes not as children but as siblings.
		 * @see ##addBefore() also adds nodes not as children but as siblings.
		 * @see ##replace() replaces existing nodes.
		 */
		'add': function (children, addFunction) {
			return this['each'](function(e, index) {
				var lastAdded;
				function appendChildren(c) {
					if (isList(c))
						flexiEach(c, appendChildren);
					else if (isFunction(c))
						appendChildren(c(e, index));
					else if (c != _null) {   // must check null, as 0 is a valid parameter 
						var n = isNode(c) ? c : document.createTextNode(c);
						if (lastAdded)
							lastAdded['parentNode']['insertBefore'](n, lastAdded['nextSibling']);
						else if (addFunction)
							addFunction(n, e, e['parentNode']); 
						else
							e.appendChild(n);
						lastAdded = n;
					}
				}
				appendChildren(index &&!isFunction(children) ? clone(children) : children);
			});
		},
	
		/*$
		 * @id fill
		 * @group ELEMENT
		 * @requires dollar add remove each
		 * @configurable default
		 * @name .fill()
		 * @syntax list.fill()
		 * @syntax list.fill(text)
		 * @syntax list.fill(node)
		 * @syntax list.fill(list)
		 * @syntax list.fill(factoryFunction)
			* @module WEB
		 * Sets the content of the list's HTML elements, replacing old content. If a string has been given, it will be added as text node.
		 * DOM nodes will be added directly. If you pass a list, all its elements will be added using the rules above.
		 *
		 * When you pass a DOM node and the target list has more than one element, the original node will be added to the first list element,
		 * and ##clone#clones## to all following list elements.
		 * 
		 * ##EE(), ##HTML() and ##clone() are compatible with <var>fill()</var> and can help you create new HTML ndoes.
		 *
		 * Call <var>fill()</var> without arguments to remove all children from a node.
		 * 
		 * @example Using the following HTML:
		 * <pre>
		 * &lt;div id="status">Done&lt;/div>
		 * </pre> 
		 * <var>fill()</var> with a simple string replaces the element's content with the new text:
		 * <pre>
		 * $('#status').fill('Please Wait..');
		 * </pre>
		 * Results in:
		 * <pre>
		 * &lt;div id="status">Please Wait..&lt;/div>
		 * </pre> 
		 *
		 * @example Pass an element to replace the old content with the element:
		 * <pre>
		 * $('#status').fill(EE('span', {'className': 'bold'}, 'Please Wait...'));
		 * </pre>
		 * With the previous example's HTML, this would create this:
		 * <pre>
		 * &lt;div id="status">&lt;span class='bold'>Please Wait..&lt;/span>&lt;/div>
		 * </pre> 
		 *
		 * @example You can also pass a list of elements and texts:
		 * <pre>
		 * $('#status').fill(['Here', EE('br'), 'are', EE('br'), 'four', EE('br'), 'lines.]);
		 * </pre>
		 *
		 * @example Or a complete structure built using EE:
		 * <pre>
		 * $('#myListContainer').fill([
		 *     EE('h2', 'My List'), 
		 *     EE('ol', [EE('li', 'First Item'), EE('li', 'Second Item'), EE('li', 'Third Item')])
		 * ]);
		 * </pre>
		 *
		 * @example You can write a factory function that re-creates the list for every instance:
		 * <pre>
		 * $('.listContainers').fill(function(e, index) { return [
		 *     EE('h2', 'List Number '+index), 
		 *     EE('ol', [EE('li', 'First Item'), 
		 *     EE('li', 'Second Item'), 
		 *     EE('li', 'Third Item')
		 * ])]});
		 * </pre>
		 *
		 * @example <var>fill()</var> without arguments deletes the content of the list elements:
		 * <pre>
		 * $('.listContainers').fill();
		 * </pre>
		 *
		 * @param text a string to set as text node of the list elements
		 * @param node a DOM node to add to the list. If the list has more than one element, the given node will be added to the first element.
		 *             For all additional elements, the node will be cloned using ##clone().
		 * @param list a list containing text and/or nodes. May also contain nested lists with nodes or text..
		 * @param factoryFunction a <code>function(listItem, listIndex)</code> that will be invoked for each list element to create the nodes: 
		 * <dl><dt>listItem</dt><dd>The list element that will receive the new children.</dd>
		 * <dt>listIndex</dt><dd>The index of the list element that will receive the new children.</dd>
		 * <dt class="returnValue">(callback return value)<dt><dd>The node(s) to be added to the list element.
		 * Can be either a string for a text node, an HTML element or a list containing strings and/or DOM nodes.
		 * If a function is returned, it will be invoked recursively with the same arguments.</dd></dl>
		 * @return the current list
		 * 
		 * @see ##add() works like <var>fill()</var>, but does not delete children.
		 * @see ##addFront() adds nodes as first child, not as last.
		 * @see ##addAfter() adds nodes not as children but as siblings.
		 * @see ##addBefore() also adds nodes not as children but as siblings.
		 * @see ##replace() replaces existing nodes.
		 * @see ##ht() is a alternative for replacing element content with a HTML snippet.
		 */
		'fill': function (children) {
			return this['each'](function(e) { $(e['childNodes'])['remove'](); })['add'](children);
		},
	
		/*$
		 * @id addafter
		 * @group ELEMENT
		 * @requires dollar add
		 * @configurable default
		 * @name .addAfter()
		 * @syntax list.addAfter(text)
		 * @syntax list.addAfter(node)
		 * @syntax list.addAfter(list)
		 * @syntax list.addAfter(factoryFunction)
			* @module WEB
		 * Inserts the given text or element(s) as siblings after each HTML element in the list. 
		 * If a string has been given, it will be added as text node.
		 * DOM nodes will be added directly. If you pass a list, all its elements will be added using the rules above.
		 *
		 * When you pass a DOM node and the target list has more than one element, the original node will be added to the first list element,
		 * and ##clone#clones## to all following list elements.
		 * 
		 * ##EE(), ##HTML() and ##clone() are compatible with <var>addAfter()</var> and can help you create new HTML ndoes.
		 *
		 * @example Using the following HTML:
		 * <pre>
		 * &lt;div>
		 *   &lt;div id="mainText">Here is some text&lt;/div>
		 * &lt;/div>
		 * </pre>   
		 * Use addAfter() with a simple string to add a text node.
		 * <pre>
		 * $('#mainText').addAfter('Disclaimer: bla bla bla');
		 * </pre>
		 * This results in the following HTML:
		 * <pre>
		 * &lt;div>
		 *   &lt;div id="mainText">Here is some text&lt;/div>
		 *   Disclaimer: bla bla bla
		 * &lt;/div>
		 * </pre>   
		 *
		 * @example You can also pass an element:
		 * <pre>
		 * $('#mainText').addAfter(EE('span', {'className': 'disclaimer'}, 'Disclaimer: bla bla bla'));
		 * </pre>
		 * With the previous example's HTML, this would create this:
		 * <pre>
		 * &lt;div>
		 *   &lt;div id="mainText">Disclaimer: bla bla bla&lt;/div>
		 *   &lt;span class="disclaimer">WARNING&lt;/span>
		 * &lt;/div>
		 * </pre> 
		 *
		 * @param text a string to add as text node to the list elements
		 * @param node a DOM node to add to the list. If the list has more than one element, the given node will be added to the first element.
		 *             For all additional elements, the node will be cloned using ##clone().
		 * @param list a list containing text and/or nodes. May also contain nested lists with nodes or text..
		 * @param factoryFunction a <code>function(listItem, listIndex)</code> that will be invoked for each list element to create the nodes:
		 * <dl><dt>listItem</dt><dd>The list element that will receive the new children.</dd>
		 * <dt>listIndex</dt><dd>The index of the list element that will receive the new children.</dd>
		 * <dt class="returnValue">(callback return value)<dt><dd>The node(s) to be added to the list element.
		 * Can be either a string for a text node, an HTML element or a list containing strings and/or DOM nodes.
		 * If a function is returned, it will be invoked recursively with the same arguments.</dd></dl>
		 * @return the current list
		 *
		 * @see ##fill() replaces all children with new nodes.
		 * @see ##add() adds elements as last child.
		 * @see ##addFront() adds nodes as first child.
		 * @see ##addBefore() also adds nodes as next sibling but as preceding sibling.
		 * @see ##replace() replaces existing nodes.
		 */
		'addAfter': function (children) {
			return this['add'](children, function(newNode, refNode, parent) { parent['insertBefore'](newNode, refNode['nextSibling']); });
		},
	
		/*$
		 * @id addbefore
		 * @group ELEMENT
		 * @requires dollar add
		 * @configurable default
		 * @name .addBefore()
		 * @syntax list.addBefore(text)
		 * @syntax list.addBefore(node)
		 * @syntax list.addBefore(list)
		 * @syntax list.addBefore(factoryFunction)
			* @module WEB
		 * Inserts the given text or element(s) as siblings in front of each HTML element in the list. 
		 * If a string has been given, it will be added as text node.
		 * DOM nodes will be added directly. If you pass a list, all its elements will be added using the rules above.
		 *
		 * When you pass a DOM node and the target list has more than one element, the original node will be added to the first list element,
		 * and ##clone#clones## to all following list elements.
		 * 
		 * ##EE(), ##HTML() and ##clone() are compatible with <var>addBefore()</var> and can help you create new HTML ndoes.
		 *
		 * @example Using the following HTML:
		 * <pre>
		 * &lt;div>
		 *   &lt;div id="mainText">Here is some text&lt;/div>
		 * &lt;/div>
		 * </pre>  
		 * addBefore() adds text in front of the selected list items.
		 * <pre>
		 * $('#mainText').addBefore('COMMENT');
		 * </pre>
		 * This results in:
		 * <pre>
		 * &lt;div>
		 *   COMMENT
		 *   &lt;div id="mainText">Here is some text&lt;/div>
		 * &lt;/div>
		 * </pre>  
		 *
		 * @example You can also pass an Element Factory:
		 * <pre>
		 * $('#mainText').addBefore(EE('span', {'className': 'important'}, 'WARNING'));
		 * </pre>
		 * With the previous example's HTML, this would create this HTML:
		 * <pre>
		 * &lt;div>
		 *   &lt;span class="important">WARNING&lt;/span>
		 *   &lt;div id="mainText">Here is some text&lt;/div>
		 * &lt;/div>
		 * </pre> 
		 *
		 * @example Lists of elements and nodes are possible as well.
		 * <pre>
		 * $('#status').addBefore([EE('hr'), 'WARNING']);
		 * </pre>
		 *
		 * @param text a string to add as text node to the list elements
		 * @param node a DOM node to add to the list. If the list has more than one element, the given node will be added to the first element.
		 *             For all additional elements, the node will be cloned using ##clone().
		 * @param list a list containing text and/or nodes. May also contain nested lists with nodes or text..
		 * @param factoryFunction a <code>function(listItem, listIndex)</code> that will be invoked for each list element to create the nodes: 
		 * <dl><dt>listItem</dt><dd>The list element that will receive the new children.</dd>
		 * <dt>listIndex</dt><dd>The index of the list element that will receive the new children.</dd>
		 * <dt class="returnValue">(callback return value)<dt><dd>The node(s) to be added to the list element.
		 * Can be either a string for a text node, an HTML element or a list containing strings and/or DOM nodes.
		 * If a function is returned, it will be invoked recursively with the same arguments.</dd></dl>
		 * @return the current list
		 *
		 * @see ##fill() replaces all children with new nodes.
		 * @see ##add() adds elements as last child.
		 * @see ##addFront() adds nodes as first child.
		 * @see ##addAfter() adds nodes as siblings after the list element(s).
		 * @see ##replace() replaces existing nodes.
		 */
		'addBefore': function (children) {
			return this['add'](children, function(newNode, refNode, parent) { parent['insertBefore'](newNode, refNode); });
		},
	
		/*$
		 * @id addfront
		 * @group ELEMENT
		 * @requires dollar add
		 * @configurable default
		 * @name .addFront()
		 * @syntax list.addFront(text)
		 * @syntax list.addFront(node)
		 * @syntax list.addFront(list)
		 * @syntax list.addFront(factoryFunction)
			* @module WEB
		 * Adds the given node(s) as children to the list's HTML elements. Unlike ##add(), the new nodes will be the first children and not the last.
		 * If a string has been given, it will be added as text node.
		 * DOM nodes will be added directly. If you pass a list, all its elements will be added using the rules above.
		 *
		 * When you pass a DOM node and the target list has more than one element, the original node will be added to the first list element,
		 * and ##clone#clones## to all following list elements.
		 *
		 * ##EE(), ##HTML() and ##clone() are compatible with <var>addFront()</var> and can help you create new HTML ndoes.
		 *
		 * @example Using the following HTML:
		 * <pre>
		 * &lt;div id="comments">Here is some text.&lt;br/>&lt;/div>
		 * </pre> 
		 * Add a text to the div:
		 * <pre>
		 * $('#comments').addFront('Some additional text. ');
		 * </pre>
		 * This results in:
		 * <pre>
		 * &lt;div id="comments">Some additional text. Here is some text.&lt;br/>&lt;/div>
		 * </pre> 
		 *
		 * @example Using the following HTML: 
		 * <pre>
		 * &lt;ul id="myList">
		 *   &lt;li>First list entry&lt;/li>
		 *   &lt;li>Second list entry&lt;/li>
		 * &lt;/ul>
		 * </pre>
		 * The following Javascript adds an element to the list:
		 * <pre>
		 * $('#myList').addFront(EE('li', 'My extra point'));
		 * </pre>
		 * This results in
		 * <pre>
		 * &lt;ul id="myList">
		 *   &lt;li>My extra point&lt;/li>
		 *   &lt;li>First list entry&lt;/li>
		 *   &lt;li>Second list entry&lt;/li>
		 * &lt;/ul>
		 * </pre>
		 *
		 * @example Use a list to add several elements at once:
		 * <pre>
		 * $('#comments').addFront([
		 *      EE('br'), 
		 *      'Some text', 
		 *      EE('span', {'className': 'highlight'}, 'Some highlighted text')
		 * ]);
		 * </pre>
		 *
		 * @param text a string to add as text node to the list elements
		 * @param node a DOM node to add to the list. If the list has more than one element, the given node will be added to the first element.
		 *             For all additional elements, the node will be cloned using ##clone().
		 * @param list a list containing text and/or nodes. May also contain nested lists with nodes or text..
		 * @param factoryFunction a <code>function(listItem, listIndex)</code> that will be invoked for each list element to create the nodes:
		 * <dl><dt>listItem</dt><dd>The list element that will receive the new children.</dd>
		 * <dt>listIndex</dt><dd>The index of the list element that will receive the new children.</dd>
		 * <dt class="returnValue">(callback return value)<dt><dd>The node(s) to be added to the list element.
		 * Can be either a string for a text node, an HTML element or a list containing strings and/or DOM nodes.
		 * If a function is returned, it will be invoked recursively with the same arguments.</dd></dl>
		 * @return the current list
		 * 
			* @see ##fill() replaces all children with new nodes.
		 * @see ##add() adds elements as last child.
		 * @see ##addAfter() adds nodes not as children but as siblings.
		 * @see ##addBefore() also adds nodes not as children but as siblings.
		 * @see ##replace() replaces existing nodes.
		 */
		'addFront': function (children) {
			return this['add'](children, function(newNode, refNode) { refNode['insertBefore'](newNode, refNode['firstChild']); });
		},
	
		/*$
		 * @id replace
		 * @group ELEMENT
		 * @requires dollar add
		 * @configurable default
		 * @name .replace()
		 * @syntax list.replace(text)
		 * @syntax list.replace(node)
		 * @syntax list.replace(list)
		 * @syntax list.replace(factoryFunction)
			* @module WEB
		 * Replaces the list items with the the given node(s) in the DOM tree. 
		 * If a string has been given, it will be set as text node.
		 * DOM nodes will be added directly. If you pass a list, all its elements will be added using the rules above.
		 *
		 * When you pass a DOM node and the target list has more than one element, the original node will be added to the first list element,
		 * and ##clone#clones## to all following list elements.
		 * 
		 * ##EE(), ##HTML() and ##clone() are compatible with <var>replace()</var> and can help you create new HTML ndoes.
		 *
		 * @example Using the following HTML:
		 * <pre>
		 * &lt;div id="comments">
		 *    &lt;div id="commentOne">My old comment.&lt;/div>
		 * &lt;/div>
		 * </pre> 
		 * This replaces the div 'commentOne':
		 * <pre>
		 * $('#commentOne').replace('Some new comment.');
		 * </pre>
		 * The resulting HTML is:
		 * <pre>
		 * &lt;div id="comments">
		 *    Some new comment.
		 * &lt;/div>
		 * </pre> 
		 * Please note that not only the text has changed, but the whole &lt;div> has been replaced. If you only want to replace the element's text content
		 * you should use ##fill() instead of <var>replace()</var>.
		 *
		 * @example Using the following HTML: 
		 * <pre>
		 * &lt;ul id="myList">
		 *   &lt;li>First list entry&lt;/li>
		 *   &lt;li>Second list entry&lt;/li>
		 * &lt;/ul>
		 * </pre>
		 * The following example will replace <strong>only the first &lt;li> element</strong>:
		 * <pre>
		 * $('#myList li').sub(0, 1).replace(EE('li', 'My extra point'));
		 * </pre>
		 * This results in
		 * <pre>
		 * &lt;ul id="myList">
		 *   &lt;li>My extra point&lt;/li>
		 *   &lt;li>Second list entry&lt;/li>
		 * &lt;/ul>
		 * </pre>
		 *
		 *
		 * @param text a text for the text nodes that replace the list elements
		 * @param node a DOM node to add to the list. If the list has more than one element, the given node will be added to the first element.
		 *             For all additional elements, the node will be cloned using ##clone().
		 * @param list a list containing text and/or nodes. May also contain nested lists with nodes or text..
		 * @param factoryFunction a <code>function(listItem, listIndex)</code> that will be invoked for each list element to determine its content: 
		 * <dl><dt>listItem</dt><dd>The list element that will receive the new children.</dd>
		 * <dt>listIndex</dt><dd>The index of the list element that will receive the new children.</dd>
		 * <dt class="returnValue">(callback return value)<dt><dd>The node(s) to be added to the list element.
		 * Can be either a string for a text node, an HTML element or a list containing strings and/or DOM nodes.
		 * If a function is returned, it will be invoked recursively with the same arguments.</dd></dl>
		 * @return the current list
		 * 
			* @see ##fill() replaces all children with new nodes.
		 * @see ##add() adds elements as last child.
		 * @see ##addFront() adds nodes as first child.
		 * @see ##addAfter() adds nodes not as children but as siblings.
		 * @see ##addBefore() also adds nodes not as children but as siblings.
		 */
		'replace': function (children) {
			return this['add'](children, function(newNode, refNode, parent) { parent['replaceChild'](newNode, refNode); });
		},
	
		/*$
		 * @id clone
		 * @group ELEMENT
		 * @requires each
		 * @configurable default
		 * @name .clone()
		 * @syntax list.clone()
			* @module WEB
		 * Clones all HTML nodes in the given list by creating a deep copy of them. Nested lists will be automatically flattened. 
		 * Everything else will be copied as-is into the new list.
		 *
		 * <var>clone()</var> uses the browser's <var>cloneNode()</var> function to clone HTML internally, but will remove the ids from
		 * all HTML top-level elements. This allows you to specify an element to clone by id without creating duplicate ids in the document.
		 * The ids of child elements will removed.
		 * 
		 * Please note that clone() does work with SVG, but will not remove ids from SVG.
		 * 
		 * Please note that event handlers will not be cloned.
		 * 
		 * @example Using the following HTML:
		 * <pre>
		 * &lt;div id="comments">
		 *    &lt;div id="comment1">My comment.&lt;/div>
		 * &lt;/div>
		 * </pre> 
		 * Creating a clone:
		 * <pre>
		 * var myClone = $('#comment1').clone();
		 * </pre>
		 * Adding it below the original:
		 * <pre>
		 * $('#comments').add(myClone);
		 * </pre> 
		 *
		 * @return the list containing copies of all supported items in the original list.
		 * 
		 * @see ##add() can add a cloned element to the HTML document.
		 */
		'clone': listBindArray(clone),
	
		/*$
		 * @id animate
		 * @group ANIMATION
		 * @requires loop dollar dial get
		 * @configurable default
		 * @name .animate()
		 * @syntax list.animate(properties)
		 * @syntax list.animate(properties, durationMs)
		 * @syntax list.animate(properties, durationMs, linearity)
		 * @syntax list.animate(properties, durationMs, interpolationFunc)
			* @module WEB
		 * Animates the items of the list by modifying their properties, CSS styles and attributes. <var>animate()</var> can work with numbers, strings that contain exactly one
		 * number, and with colors in the CSS notations 'rgb(r,g,b)', '#rrggbb' or '#rgb'.
		 *
		 * When you invoke the function, it will first read all old values from the object and extract their numbers and colors. These start values will be compared to 
		 * the destination values that have been specified in the given properties. Then <var>animate()</var> will create a background task using ##$.loop() that updates the 
		 * specified properties in frequent intervals so that they transition to their destination values.
		 *
		 * The start values will be obtained using ##get(). It is recommended to set the start values using ##set() before you start the animation, even if this is not
		 * always required.
		 *
		 * You can define the kind of transition using the <var>linearity</var> parameter. If you omit it or pass 0, animate's default algorithm will cause a smooth transition
		 * from the start value to the end value. If you pass 1, the transition will be linear, with a sudden start and end of the animation. Any value between 0 and 1 
		 * is also allowed and will give you a transition that is 'somewhat smooth'. 
		 * 
		 * Instead of the <var>linearity</var> function you can provide your own interpolation <code>function(startValue, endValue, t)</code> which will be
		 * called every time an interpolated value is required. <var>startValue</var> and <var>endValue</var> define the start and end values. <var>t</var>
		 * is a value between 0 and 1 that specifies the current state of the transition. The function must return the <var>startValue</var> for 0 and 
		 * the <var>endValue</var> for 1. For values between 0 and 1, the function should return a transitional value.
		 *
		 * If the start value of a property is a string containing a number, <var>animate()</var> will always ignore all the surrounding text and use the destination value as a template 
		 * for the value to write. This can cause problems if you mix units in CSS. For example, if the start value is '10%' and you specify an end value of '20px', animate
		 * will do an animation from '10px' to '20px'. It is not able to convert units. 
		 *
		 * <var>animate()</var> does not only support strings with units, but any string containing exactly one number. This allows you, among other things, to work with 
		 * IE-specific CSS properties.
		 * For example, you can transition from a start value 'alpha(opacity = 0)' to 'alpha(opacity = 100)'. 
		 *
		 * When you animate colors, <var>animate()</var> is able to convert between the three notations rgb(r,g,b), #rrggbb or #rgb. You can use them interchangeably, but you can not 
		 * use color names such as 'red'.
		 *
		 * Instead of the end value, you can also specify a <code>function(oldValue, index, obj)</code> to calculate the actual end value. 
		 *
		 * To allow more complex animation, <var>animate()</var> returns a ##promiseClass#Promise## that is fulfilled when the animation has finished. You can also stop
		 * a running animation by calling the promise's ##stop() function. If you only use the Web module, <var>stop()</var> is only available in the promise returned by
		 * <var>animate()</var>. If you have the full package, the stop function will be propagated and can be called at any point of a promise chain.
		 *
		 * @example Move an element:
		 * <pre>
		 * $('#myMovingDiv').set({$left: '0px', $top: '0px'})                // start values
		 *                  .animate({$left: '50px', $top: '100px'}, 1000);  // animation
		 * </pre>
		 *
		 * @example Change the color of an element:
		 * <pre>
		 * $('#myBlushingDiv').set({$backgroundColor: '#000000'})
		 *                    .animate({$backgroundColor: '#ff0000'}, 1000);
		 * </pre>
		 * 
		 * @example Using a function to calulate the values for animation:
		 * <pre>
		 * $('#myMovingDiv').animate({$left: function(v) { return (parseFloat(v) + 100) + 'px'; }}, 1000);  
		 * </pre>
		 * 
		 * @example Fade-out effect:
		 * <pre>
		 * $('#myFadingDiv').animate({$$fade: 0}, 1000);
		 * </pre>
		 * 
			* @example Slide-in effect:
		 * <pre>
		 * $('#myInvisibleDiv').animate({$$show:1, $$slide: 1}, 1000);
		 * </pre>
		 *
		 *
		 * @example Stopping a simple animation. This requires only the Web module.
		 * <pre>
		 * var div = $('#myMovingDiv').set({$left: '0px', $top: '0px'});
		 * var p = div.animate({$left: '800px', $top: '0px'}, 5000, 0);
		 * $('#stopButton').on('click', p.stop);
		 * });
		 * </pre>
		 *
		 * @example Chained animation using ##promiseClass#Promise## callbacks. The element is first moved to the position 200/0, then to 200/200
		 *          and finally moves to 100/100.
		 *          A stop button allows you to interrupt the animation.<br/>
		 *          Please note that while chaining animations requires only the Web module,  
		 *          stopping a chained animation requires the full distribution with both Web and Util module. Only the complete Promises implementation 
		 *          supports this.
		 * <pre>
		 * var div = $('#myMovingDiv').set({$left: '0px', $top: '0px'});
		 * var p = div.animate({$left: '200px', $top: '0px'}, 600, 0)
		 *    .then(function() {
		 *           return div.animate({$left: '200px', $top: '200px'}, 800, 0);
		 *    }).then(function() {
		 *           return div.animate({$left: '100px', $top: '100px'}, 400);
		 *    });
		 *    
		 *  $('#stopButton').on('click', p.stop); // stopping requires Web+Util modules!
		 * });
		 * </pre>
		 *
		 *
		 * @param properties a property map describing the end values of the corresponding properties. The names can use the
		 *                   set() syntax ('@' prefix for attributes, '$' for styles, '$$fade' for fading,  '$$slide' for slide effects, 
		 *                   '$$scrollX' and '$$scrollY' for scroll coordinates). 
		 *                   Values must be either numbers, numbers with units (e.g. "2 px") or colors ('rgb(r,g,b)', '#rrggbb' or '#rgb') or
		 *                   a <code>function(oldValue, index, obj)</code>  to determine the new value. The function  will be invoked for each list element 
		 *                   to evaluate the new value: 
		 *                   <dl><dt>oldValue</dt><dd>The old value of the property to be changed, as returned by ##get().
		 *                   For the CSS style names, this is the computed style of the property </dd>
		 *                   <dt>index</dt><dd>The list index of the object owning the property</dd>
		 *                   <dt>obj</dt><dd>The list element owning the property.<dd>
		 *                   <dt class="returnValue">(callback return value)</dt><dd>The destination value to be set.</dd></dl> 
		 * @param durationMs optional the duration of the animation in milliseconds. Default: 500ms.
		 * @param linearity optional defines whether the animation should be linear (1), very smooth (0) or something in between. Default: 0.
		 * @param interpolationFunc optional an interpolation <code>function(startValue, endValue, t)</code> which will be
		 *             called every time an interpolated value is required:
		 *             <dl>
		 *             <dt>startValue</dt><dd>The start value of the transition.</dd>
		 *             <dt>endValue</dt><dd>The end value of the transition.</dd>
		 *             <dt>t</dt><dd>A value between 0 and 1 that specifies the state of the transition.</dd>
		 *             <dt class="returnValue">(callback return value)</dt><dd>The value at the time <var>t</var>.</dd>
		 *             </dl> 
		 * @return a ##promiseClass#Promise## object to monitor the animation's progress. 
		 *         It is fulfilled when the animation ended, and rejected if the animation had been stopped.
		 *         The fulfillment handler will be called as <code>function(list)</code>:
		 *         <dl><dt>list</dt><dd>A reference to the animated list.</dd></dl> 
		 *         The rejection handler is called as <code>function()</code> without arguments. 
		 *         The returned promise also has property 'stop', which is a function. Invoke the function without arguments to
		 *         interrupt a running animation. It will return the animations actual duration in ms. 
		 *         
		 * @see ##toggle() can be used to define animations between two states.
		 * @see ##$.loop() allows you to write more complex animations.
		 */	
		'animate': function (properties, duration, linearity) {
			var prom = promise(); 
			var self = this;
			var dials = collector(flexiEach, this, function(li, index) {
				var elList = $(li), dialStartProps, dialEndProps = {};
				eachObj(dialStartProps = elList.get(properties), function(name, start) {
					var dest = properties[name];
					dialEndProps[name] = isFunction(dest) ? dest(start, index, li) : 
						name == '$$slide' ? getNaturalHeight(elList, dest) : dest;
				});
				return elList['dial'](dialStartProps, dialEndProps, linearity);
			});
	
			var durationMs = duration || 500;
			var loopStop;
	
			prom['stop0'] = function() { prom['fire'](false); return loopStop(); };
	
			// start animation
			loopStop = $.loop(function(timePassedMs) {
				callList(dials, [timePassedMs/durationMs]);
	
				if (timePassedMs >= durationMs) {
					loopStop();
					prom['fire'](true, [self]);
				}
			});
			return prom;		
		},
	
		/*$
		 * @id dial
		 * @group ANIMATION
		 * @requires get set
		 * @configurable default
		 * @name .dial()
		 * @syntax list.dial(state1, state2)
		 * @syntax list.dial(state1, state2, linearity)
		 * @syntax list.dial(state1, state2, interpolationFunc)
		 * @module WEB
		 * 
		 * Creates a function allows you to set all list members to one of two states or any transitional state between them. 
		 * The states are specified using ##set() - compatible object maps containing the properties to set.
		 * Pass 0 to the function to set the first state for all list members, or 1 to set the second state.
		 * Any value between 0 and 1 will cause <var>dial()</var> to interpolate between the two states.
		 * Interpolation is supported for all numeric values, including those that have a string suffix (e.g. 'px' unit), 
		 * and for colors in all RGB notations (e.g. '#f00', '#f0d1ff' or 'rgb(23,0,100)').
		 *
		 * You can use the optional third parameter to define the kind of interpolation to use for values between 0 and 1.
		 * If 0, the dial uses a smooth, cubic interpolation. For 1 it uses linear interpolation. Values between 0 and 1
		 * will mix both algorithms. You can also specify your own interpolation function.
		 *
		 * @example Creates a dial function that changes the background color of the page.
		 * <pre>
		 * var light = $('body').dial({$backgroundColor: #000}, {$backgroundColor: #fff});
		 * light(0);     // set the first state (background color to #000)
		 * light(1);     // sets second state (background color to #fff).
		 * light(0.5);  // interpolates between two states, sets background color to #888.
		 * light(0.25);  // interpolates between two states, sets background color to #444.
		 * </pre>
		 * 
		 * @param state1 a property map in ##set() syntax describing the first state of the properties. The properties will be set for all elements of the list.
		 * @param state2 a property map describing the second state of the properties. Uses ##set() syntax. 
		 * @param linearity optional defines whether the animation should be linear (1), very smooth (0) or something in between. Default: 0. Ignored if durationMs is 0.
		 * @param interpolationFunc optional an interpolation <code>function(startValue, endValue, t)</code> which will be called every time
		 *       an interpolated value is required: 
		 *           <dl>
			*             <dt>startValue</dt><dd>The start value of the transition.</dd>
			*             <dt>endValue</dt><dd>The end value of the transition.</dd>
			*           <dt>t</dt><dd>A value between 0 and 1 that specifies the state of the transition.</dd>
			*             <dt class="returnValue">(callback return value)</dt><dd>The value at the time <var>t</var>.</dd>
			*             </dl> 		 
			* @return a dial function <code>function(newPosition)</code> that will set the state.
		 *             <dl>
		 *             <dt>newPosition</dt><dd>If 0 or lower, set the list members to the first state. 
		 *             If 1 or higher, sets them to the second state. For any value betweeen 0 and 1, the list members
		 *             will be set to interpolated values.</dd>
		 *             </dl>
		 *             
		 * @see ##toggle() is a related function that allows you to define two states and automatically animate between them.
		 */
		'dial': function (properties1, properties2, linf) {
			var self = this;
			var linearity = linf || 0;
			var interpolate = isFunction(linearity) ? linearity : function(startValue, endValue, t) {
				return t * (endValue - startValue) * (linearity + (1-linearity) * t * (3 - 2*t)) + startValue; 
			};
	
			function getColorComponent(colorCode, index) {
				return (/^#/.test(colorCode)) ?
					parseInt(colorCode.length > 6 ? colorCode.substr(index*2+1, 2) : ((colorCode=colorCode.charAt(index+1))+colorCode), 16)
					:
					extractNumber(colorCode.split(',')[index]);
			}
			return function(t) {
				eachObj(properties1, function(name, start) {
					var end=properties2[name], i = 0; 
					self['set'](name, t<=0?start:t>=1?end:
						 (/^#|rgb\(/.test(end)) ? // color in format '#rgb' or '#rrggbb' or 'rgb(r,g,b)'?
									('rgb('+ Math.round(interpolate(getColorComponent(start, i), getColorComponent(end, i++), t)) // expression repeated, gzip will do the rest
									+ ',' + Math.round(interpolate(getColorComponent(start, i), getColorComponent(end, i++), t))
									+ ',' + Math.round(interpolate(getColorComponent(start, i), getColorComponent(end, i++), t))
										+ ')')
								:
									replace(end, /-?[\d.]+/, toString(interpolate(extractNumber(start), extractNumber(end), t)))
					);
				});
			};
		},
	
		/*$
		 * @id toggle
		 * @group ANIMATION
		 * @requires animate set
		 * @configurable default
		 * @name .toggle()
		 * @syntax list.toggle(cssClasses)
		 * @syntax list.toggle(state1, state2)
		 * @syntax list.toggle(state1, state2, durationMs)
		 * @syntax list.toggle(state1, state2, durationMs, linearity)
		 * @syntax list.toggle(state1, state2, durationMs, interpolationFunction)
		 * @module WEB
		 * 
		 * Creates a function that switches between the two given states for the list. The states use the ##set() property syntax. You can also
		 * just pass a string of CSS classes, as you do with <var>set()</var>.
		 *
		 * If no duration is given, the returned function changes the state immediately using ##set(). If a duration has been passed, the returned function
		 * uses ##animate() to smoothly transition the state. If the returned function is invoked while an animation is running, it interrupts the 
		 * animation and returns to the other state.
		 *
		 *
		 * @example Creates a toggle function that changes the background color of the page.
		 * <pre>
		 * var light = $('body').set({$backgroundColor: #000}, {$backgroundColor: #fff});
		 * light();      // toggles state to second state
		 * light(false); // sets first state (background color to #000).
		 * light(true);  // sets second state (background color to #fff).
		 * light();      // toggles state to first state
		 * </pre>
		 * 
		 * @example Takes the previous function, but adds it as an onclick event handler that toggles the color.
		 * <pre>
		 * var light = $('body').toggle({$backgroundColor: #000}, {$backgroundColor: #fff});
		 * $('#mySwitch').on('click', light);
		 * </pre>
		 *
		 * @example Using an animated transition by passing a duration:
		 * <pre>
		 * var dimmer = $('body').toggle({$backgroundColor: #000}, {$backgroundColor: #fff}, 500);
		 * $('#mySwitch').on('click', dimmer);
		 * </pre>
		 *
		 * @example Toggling CSS classes using the full syntax:
		 * <pre>
		 * var t = $('#myElement').toggle({$: '-myClass1 -myClass2'}, {$: '+myClass1 +myClass2'});
		 * $('#myController').on('click', t);
		 * </pre>
		 *
		 * @example There is a shortcut for toggling CSS classes. Just list them space-separated in a string:
		 * <pre>
		 * var t = $('#myElement').toggle('myClass1 myClass2');
		 * </pre>
		 * 
		 * @param cssClasses a string containing space-separated CSS class names to toggle. Classes are disabled in the first state
		 *                   and enabled in the second.
		 * @param state1 a property map in ##set() syntax describing the initial state of the properties. The properties will automatically be set when the
		 *                   <var>toggle()</var> function is created. The properties will be set for all elements of the list.
		 * @param state2 a property map describing the second state of the properties. Uses ##set() syntax, like the other state. 
		 * @param durationMs optional if set, the duration of the animation in milliseconds. By default, there is no animation and the 
		 * 					 properties will be changed immediately.
		 * @param linearity optional defines whether the animation should be linear (1), very smooth (0) or something in between. Default: 0. Ignored if durationMs is 0.
		 * @param interpolationFunc optional an interpolation <code>function(startValue, endValue, t)</code> for the animation which will be called every 
		 *     time an interpolated value is required: 
		 *           <dl>
			*             <dt>startValue</dt><dd>The start value of the transition.</dd>
			*             <dt>endValue</dt><dd>The end value of the transition.</dd>
			*           <dt>t</dt><dd>A value between 0 and 1 that specifies the state of the transition.</dd>
			*             <dt class="returnValue">(callback return value)</dt><dd>The value at the time <var>t</var>.</dd>
			*             </dl> 		 
			* @return a toggle function <code>function(newState)</code> that will toggle between the two states, or set a specific state.
		 *             <dl>
		 *             <dt>newState (optional)</dt><dd>If a boolean <var>true</var> or <var>false</var> is given, 
		 *             the toggle will set the first or second state respectively. If called with any other value, or without a value,
		 *             the function toggles to the other state.</dd>
		 *             </dl>
		 *             
		 * @see ##dial() is a similar function that allows you to smoothly interpolate between two states.
		 *
		 */
		'toggle': function(stateDesc1, stateDesc2, durationMs, linearity) {
			var self = this;
			var state = false;
			var promise;
			var stateDesc;
	
			if (stateDesc2) {
				self['set'](stateDesc1);
				return function(newState) {
						if (newState !== state) {
							stateDesc = (state = (newState===true||newState===false ? newState : !state)) ? stateDesc2 : stateDesc1;
	
							if (durationMs) 
								(promise = self['animate'](stateDesc, promise ? promise['stop']() : durationMs, linearity))['then'](function(){promise=_null;});
							else
								self['set'](stateDesc);
						}
					};
			}
			else
				return self['toggle'](replace(stateDesc1, /\b(?=\w)/g, '-'), replace(stateDesc1, /\b(?=\w)/g, '+'));
		},
	
		/*$
		 * @id values
		 * @group REQUEST
		 * @requires each
		 * @configurable default
		 * @name .values()
		 * @syntax list.values()
		 * @syntax list.values(dataMap)
		 * @module WEB
		 * Creates a name/value map from the given form. values() looks at the list's form elements and writes each element's name into the map,
		 * using the element name as key and the element's value as value. As there can be more than one value with the same name, 
		 * the map's values are arrays if there is more than one value with the same name in the form. If an element does not
		 * have a name, its id will be used. Elements without name and id will be ignored.
		 *
		 * values() will use all elements in the list that have a name, such as input, textarea and select elements. For form elements in the list, all child form
		 * elements will be serialized.
		 * 
		 * The map format returned by values() is exactly the format used by request().
		 * 
		 * Please note that when you include an input element more than once, for example by having the input itself and its form in the list, the
		 * value will be included twice in the list.
		 *
		 * @example Serialize a form and send it as request parameters:
		 * <pre>
		 * $.request('get', '/exampleService', $('#myForm').values(), resultHandler);
		 * </pre>
		 * 
		 * @example Serialize only some selected input fields:
		 * <pre>
		 * var data = $('#myText, input.myRadios').values();
		 * </pre>
		 * 
		 * @param dataMap optional an optional map to write the values into. If not given, a new empty map will be created
		 * @return a map containing name->value pairs, using strings as name and value. If there is more than one value with the same name,
		 *         <var>values()</var> creates an array containing all values. 
		 *       
		 * @see ##$.request() can submit form data serialized by <var>values()</var> as HTTP POST.
		 */
		'values': function(data) {
			var r = data || {};
			this['each'](function(el) {
				var n = el['name'] || el['id'], v = toString(el['value']);
				if (/form/i.test(el['tagName']))
					$(el['elements'])['values'](r);
				else if (n && (!/ox|io/i.test(el['type']) || el['checked'])) { // ox|io => short for checkbox, radio
					r[n] = r[n] == _null ? v : collector(flexiEach, [r[n], v], nonOp);
				}
			});
			return r;
		},
	
		/*$
		 * @id offset
		 * @group SELECTORS
		 * @requires dollar
		 * @configurable default
		 * @name .offset()
		 * @syntax list.offset()
		 * Returns the pixel page coordinates of the list's first element. Page coordinates are the pixel coordinates within the document, 
		 * with 0/0 being the upper left corner, independent of the user's current view (which depends on the user's current scroll position and zoom level).
		 *
		 * @example Displays the position of the element with the id 'myElement' in the element 'resultElement':
		 * <pre>
		 * var pos = $('#myElement').offset();
		 * $('#resultElement').ht('#myElement's position is left={x} top={y}', pos);
		 * </pre>
		 *
		 * @param element the element whose coordinates should be determined
		 * @return an object containing pixel coordinates in two properties 'x' and 'y'
		 * 
		 * @see ##get() can be used to read more general properties of a list element.
		 */
		'offset': function() {
			var elem = this[0];
			var dest = {'x': 0, 'y': 0};
			while (elem) {
				dest['x'] += elem['offsetLeft'];
				dest['y'] += elem['offsetTop'];
				elem = elem['offsetParent'];
			}
			return dest;
		},
	
		/*$
		 * @id on
		 * @group EVENTS
		 * @requires dollar each
		 * @configurable default
		 * @name .on()
		 * @syntax list.on(names, eventHandler)
		 * @syntax list.on(selector, names, eventHandler)
		 * @syntax list.on(names, customFunc, args)
		 * @syntax list.on(selector, names, customFunc, args)
		 * @syntax list.on(names, eventHandler, bubbleSelector)
		 * @syntax list.on(names, customFunc, args, bubbleSelector)
		 * @module WEB
		 * Registers the function as event handler for all items in the list.
		 * 
		 * By default, Minified cancels event propagation and disables element's default behavior for all elements that have an event handler. 
		 * You can override this, either by prefixing the event name with a '|', or by prefixing them with '?' and returning a <var>true</var>  
		 * in the handler. Both will reinstate the original JavaScript behavior. 
		 * 
		 * Handlers are called with the original event object as first argument, the index of the source element in the 
		 * list as second argument and 'this' set to the source element of the event (e.g. the button that has been clicked). 
		 * 
		 * Instead of the event objects, you can also pass an array of arguments that will be passed instead of event object and index. 
		 *
		 * Optionally you can specify two a selector strings to qualify only certain events. The first one is a selector
		 * that allows you to select only specific children of the list elements. This is mostly useful for adding events to DOM trees
		 * generated using ##HTML() or ##EE().
		 * 
		 * The second type of selector is the bubble selector that allows you to receive only events that bubbled up from 
		 * elements matching the selector. The selector is executed in the context of the element you registered on to identify whether the
		 * original target of the event qualifies. If not, the handler is not called.
		 * 
		 * Minified always registers event handlers with event bubbling enabled. Event capture is not supported.
		 * 
		 * Event handlers can be unregistered using #off#$.off().
		 * 
		 * @example Adds a handler to all divs which paints the div background color to red when clicked. 
		 * <pre>
		 * $('div').on('click', function() {
		 *    this.style.backgroundColor = 'red';    // 'this' contains the element that caused the event
		 * });
		 * </pre>
		 *
		 * @example Registers a handler to call a method setStatus('running') using an inline function:
		 * <pre>
		 * $('#myButton').on('click', function() {
		 *    setStatus('running');
		 * });
		 * </pre>
		 * The previous example can bere written like this, using <var>on()</var>'s <var>args</var> parameter:
		 * <pre>
		 * $('#myButton').on('click', setStatus, ['running']);
		 * </pre>
		 *
		 * @example Adds two handlers on an input field. The event names are prefixed with '|' and thus keep their original behavior: 
		 * <pre>
		 * $('#myInput').on('|keypress |keydown', function() {
		 *    // do something
		 * });
		 * </pre>
		 * 
		 * @example Adds a click handler that will abort the operation by returning false, unless the user confirms it:
		 * <pre>
		 * $('#myLink').on('?click', function() {
		 *    return window.confirm('Really leave?');
		 * });
		 * </pre>
		 * 
		 * @example Adds a button and registers a click handler for it using a sub-selector.
		 * <pre>
		 * $('#myForm').add(HTML("&lt;li>&ltbutton>click me&lt/button>&lt/li>").on('button', 'click', myClickHandler));
		 * </pre>
		 * 
		 * @example Adds listeners for all clicks on a table's rows using the bubble selector 'tr'.
		 * <pre>
		 * $('#table').on('change', 'tr', function(event, index, selectedIndex) {
		 *    alert("Click on table row number: " + selectedIndex);
		 * }, 'tr');
		 * </pre>
		 * Please note that bubble selectors will even listen to events for
		 * table rows that have been added <strong>after you registered for the events</strong>.
		 * 
		 * @param selector optional a selector string for ##dollar#$()## to register the event only on those children of the list elements that
		 *                match the selector. 
		 *                Supports all valid parameters for <var>$()</var> except functions.            
		 * @param names the space-separated names of the events to register for, e.g. 'click'. Case-sensitive. The 'on' prefix in front of 
		 *             the name must not used. You can register the handler for more than one event by specifying several 
		 *             space-separated event names. If the name is prefixed
		 *             with '|' (pipe), the event will be passed through and the event's default actions will be executed by the browser. 
		 *             If the name is prefixed with '?', the event will only be passed through if the handler returns <var>true</var>.
		 * @param eventHandler the callback <code>function(event, index)</code> to invoke when the event has been triggered:
		 * 		  <dl>
			*             <dt>event</dt><dd>The original DOM event object.</dd>
			*             <dt>index</dt><dd>The index of the target object in the ##list#Minified list## .</dd>
			*             <dt class="this">this</dt><dd>A ##list#Minified list## containing the target element as only item (same as <var>event.target</var>).</dd>
			*             <dt class="returnValue">(callback return value)</dt><dd>The return value will only be used if the event name prefix was '?'.
			*             Then, a return value <var>false</var> will stop all further processing of the event and disable event bubbling.
			*             <var>true</var> will keep the event alive.</dd>
			*             </dl>
		 * @param customFunc a function to be called instead of a regular event handler with the arguments given in <var>args</var>.
		 *                   'this' will be a ##list#Minified list## containing the target element as only item (same element as <var>event.target</var>).
		 * @param args optional an array of arguments to pass to the custom callback function instead of the event objects. If omitted, the function is
		 *             called as event handler with the event object as argument.
		 * @param bubbleSelector optional a selector string for ##dollar#$()## to receive only events that bubbled up from an
		 *                element that matches this selector.
		 *                Supports all valid parameters for <var>$()</var> except functions. Analog to ##is(), 
		 *                the selector is optimized for the simple patterns '.classname', 'tagname' and 'tagname.classname'.                
		 * @return the list
		 * @see ##off() allows you to unregister an event handler.
		 * @see ##onClick() as a shortcut for 'click' events.
		 * @see ##onOver() to simplify mouseover/mouseout events.
		 * @see ##onFocus() as convenient way to register for focus events.
		 * @see ##onChange() to get notified when an input's content changes.
		 */
		'on': on,
	
		/*$
		 * @id onover
		 * @group EVENTS
		 * @requires on dollar up
		 * @configurable default
		 * @name .onOver()
		 * @syntax list.onOver(handler)
		 * @syntax list.onOver(selector, handler)
		 * @syntax list.onOver(handler, bubbleSelector)
		 * @module WEB
		 * Registers a function to be called whenever the mouse pointer enters or leaves one of the list's elements.
		 * The handler is called with a boolean parameter, <var>true</var> for entering and <var>false</var> for leaving,
		 * which allows you to use any ##toggle() function as handler.
		 * 
		 * @example Creates a toggle that animates the element on mouse over:
		 * <pre>
		 * $('#mouseSensitive').onOver($('#mouseSensitive').toggle({$color:'#000'}, {$color:'#f00'}, 500));
		 * </pre>
		 * 
		 * @param selector optional a selector string for ##dollar#$()## to register the event only on those children of the list elements that
		 *                match the selector. 
		 *                Supports all valid parameters for <var>$()</var> except functions.           
		 * @param toggle the callback <code>function(isOver, event)</code> to invoke when the event has been triggered:
		 * 		  <dl>
			*             <dt>isOver</dt><dd><var>true</var> if mouse is entering any element, <var>false</var> when leaving.</dd>
			*             <dt>event</dt><dd>The original event object given to ##on().</dd>
			*             <dt class="this">this</dt><dd>A ##list#Minified list## containing the target element that caused the event as only item.</dd>
			*             </dl>
		 * @return the list
		 * @see ##on() provides low-level event registration.
		 */
		'onOver': function(subSelect, toggle) {
			var self = this, curOverState = []; 
			if (isFunction(toggle))
				return this['on'](subSelect, '|mouseover |mouseout', function(ev, index) {
					var relatedTarget = ev['relatedTarget'];
					var overState = ev['type'] != 'mouseout';
					if (curOverState[index] !== overState) {
						if (overState || (!relatedTarget) || (relatedTarget != self[index] && !$(relatedTarget)['up'](self[index]).length)) {
							curOverState[index] = overState;
							toggle.call(this, overState, ev);
						}
					}
				});
			else
				return this['onOver'](_null, subSelect);
		},
	
		/*$
		 * @id onfocus
		 * @group EVENTS
		 * @requires on dollar 
		 * @configurable default
		 * @name .onFocus()
		 * @syntax list.onFocus(handler)
		 * @syntax list.onFocus(selector, handler)
		 * @module WEB
		 * Registers a function to be called when a list element either gets the focus or the focus is removed (blur).
		 * The handler is called with a boolean parameter, <var>true</var> for entering and <var>false</var> for leaving,
		 * which allows you to use any ##toggle() function as handler.
		 * 
		 * @example Creates a toggle that changes the text color of the element on focus:
		 * <pre>
		 * $('#focusSensitive').onFocus($('#focusSensitive').toggle({$color:'#000'}, {$color:'#f00'}, 100));
		 * </pre>
		 * 
		 * @param selector optional a selector string for ##dollar#$()## to register the event only on those children of the list elements that
		 *                match the selector. 
		 *                Supports all valid parameters for <var>$()</var> except functions.           
		 * @param toggle the callback <code>function(hasFocus)</code> to invoke when the event has been triggered:
		 * 		  <dl>
			*             <dt>hasFocus</dt><dd><var>true</var> if an element gets the focus, <var>false</var> when an element looses it.</dd>
			*             <dt class="this">this</dt><dd>A ##list#Minified list## containing the target element that caused the event as only item.</dd>
			*             </dl>      
		 * @param bubbleSelector optional a selector string for ##dollar#$()## to receive only events that bubbled up from an
		 *                element that matches this selector.
		 *                Supports all valid parameters for <var>$()</var> except functions. Analog to ##is(), 
		 *                the selector is optimized for the simple patterns '.classname', 'tagname' and 'tagname.classname'.                
		 * @return the list
		 * @see ##on() provides low-level event registration.
		 */
		'onFocus': function(selector, handler, bubbleSelector) {
			if (isFunction(handler))
				return this['on'](selector, '|blur', handler, [false], bubbleSelector)
							 ['on'](selector, '|focus', handler, [true], bubbleSelector);
			else
				return this['onFocus'](_null, selector, handler);
		},
	
		/*$
		 * @id onchange
		 * @group EVENTS
		 * @requires on dollar each
		 * @configurable default
		 * @name .onChange()
		 * @syntax list.onChange(handler)
		 * @syntax list.onChange(selector, handler)
		 * @syntax list.onChange(handler, bubbleSelector)
		 * @syntax list.onChange(selector, handler, bubbleSelector)
		 * @module WEB
		 * Registers a handler to be called whenever content of the list's input fields changes. The handler is
		 * called in realtime and does not wait for the focus to change. Text fields, text areas, selects as well
		 * as checkboxes and radio buttons are supported. The handler is called with the new value as first argument.
		 * For selects the value is the first selected item, but the function will be called for every change.
		 * The value is boolean for checkbox/radio buttons and a string for all other types. 
		 * 
		 * Please note that the handler may be called on the user's first interaction even without an actual content change. After that, 
		 * the handler will only be called when the content actually changed.
		 * 
		 * On legacy IE platforms, <var>onChange</var> tries to report every change as soon as possible. When used with bubbling selector, 
		 * some text changes may not be reported before the input loses focus. This is because there is no reliable event to report text 
		 * changes that also supports bubbling. 
		 * 
		 * @example Creates a handler that writes the input's content into a text node:
		 * <pre>
		 * $('#myField').onChange(function(newValue, index, ev) { $('#target').fill(newValue); });
		 * </pre>
		 * 
		 * @param selector optional a selector string for ##dollar#$()## to register the event only on those children of the list elements that
		 *                match the selector. 
		 *                Supports all valid parameters for <var>$()</var> except functions.            
		 * @param handler the callback <code>function(newValue, index, ev)</code> to invoke when the event has been triggered:
		 * 		  <dl>
			*             <dt>newValue</dt><dd>For text fields and selects the new <var>value</var> string. 
			*              For checkboxes/radio buttons it is the boolean returned by <var>checked</var>.</dd>
			*             <dt>index</dt><dd>The index of the target element in the ##list#Minified list## .</dd>
			*             <dt class="this">this</dt><dd>A ##list#Minified list## containing the target element that caused the event as only item.</dd>
			*             </dl>
		 * @param bubbleSelector optional a selector string for ##dollar#$()## to receive only events that bubbled up from an
		 *                element that matches this selector.
		 *                Supports all valid parameters for <var>$()</var> except functions. Analog to ##is(), 
		 *                the selector is optimized for the simple patterns '.classname', 'tagname' and 'tagname.classname'.                
		 * @return the list
		 * @see ##on() provides low-level event registration.
		 */
		'onChange': function onChange(subSelect, handler, bubbleSelector) {
			if (isFunction(handler)) {
	
				return this['on'](subSelect, '|input |change |click',  function(ev, index) { // |change for select elements, |click for checkboxes...
				var e = this[0];
				var v = /ox|io/i.test(e['type']) ? e['checked'] : e['value'];
				if (e[MINIFIED_MAGIC_PREV] != v) {
				handler.call(this, e[MINIFIED_MAGIC_PREV] = v, index);
				}
				}, bubbleSelector); 
			}
			else
				return this['onChange'](_null, subSelect, handler); 
	
		},
	
		/*$
		 * @id onclick
		 * @group EVENTS
		 * @requires on 
		 * @configurable default
		 * @name .onClick()
		 * @syntax list.onClick(handler)
		 * @syntax list.onClick(customFunc, args)
		 * @syntax list.onClick(selector, handler)
		 * @syntax list.onClick(selector, customFunc, args)
		 * @module WEB
		 * Registers a function to be called for 'click' events. This is only a convenience method and identical to calling
		 * ##on() with 'click' as event type.
		 * You can specify a sub-selector to register only for specific children of the list elements, and you can
		 * specify arguments to pass to the handler instead of the default event object.
		 * 
		 * Event handlers registered using <var>onClick()</var> can be unregistered using ##$.off().
		 * 
		 * @example Says hello if you click:
		 * <pre>
		 * $('#sayHello').onClick(function() { window.alert('Hello!'); });
		 * </pre>
		 * 
		 * @example Using arguments:
		 * <pre>
		 * function saySomething(what) { window.alert(what); }
		 * 
		 * $('#sayHello').onClick(saySomething, ['Hello!']);
		 * $('#sayBye').onClick(saySomething, ['Goodbye!']);
		 * </pre>
		 * 
			* @example Creates an event handler that toggles the color of the text on click:
		 * <pre>
		 * $('#changeColor').onClick($('#colorChanger').toggle({$color:'#000'}, {$color:'#f00'}, 100));
		 * </pre>
		 * @param selector optional a selector string for ##dollar#$()## to register the event only on those children of the list elements that
		 *                match the selector. 
		 *                Supports all valid parameters for <var>$()</var> except functions.            
		 * @param eventHandler the callback <code>function(event, index)</code> to invoke when the event has been triggered:
		 * 		  <dl>
			*             <dt>event</dt><dd>The original DOM event object.</dd>
			*             <dt>index</dt><dd>The index of the target object in the ##list#Minified list## .</dd>
			*             <dt class="this">this</dt><dd>A ##list#Minified list## containing the target element as only item (same element as <var>event.target</var>).</dd>
			*        </dl>
		 * @param customFunc a function to be called instead of a regular event handler with the arguments given in <var>args</var>.
		 *                   'this' will be a ##list#Minified list## containing the target element as only item (same element as <var>event.target</var>).
		 * @param args optional an array of arguments to pass to the custom callback function instead of the event objects. If omitted, the function is
		 *             called as event handler with the event object as argument.
		 * @param bubbleSelector optional a selector string for ##dollar#$()## to receive only events that bubbled up from an
		 *                element that matches this selector.
		 *                Supports all valid parameters for <var>$()</var> except functions. Analog to ##is(), 
		 *                the selector is optimized for the simple patterns '.classname', 'tagname' and 'tagname.classname'.                
		 * @return the list	 
		 * @see ##on() provides low-level event registration.
		 * @see ##off() can unregister <var>onClick</var> event handlers.
		 */
		'onClick': function(subSelect, handler, args, bubbleSelector) {
				 if (isFunction(handler))
					 return this['on'](subSelect, 'click', handler, args, bubbleSelector);
				 else
					 return this['onClick'](_null, subSelect, handler, args);
		},
	
		/*$
		 * @id trigger
		 * @group EVENTS
		 * @requires on each
		 * @configurable default
		 * @name .trigger()
		 * @syntax list.trigger(name)
		 * @syntax list.trigger(name, eventObject)
		 * @module WEB
		 * 
		 * Triggers event handlers registered with ##on().
		 * Any event that has been previously registered using ##on() can be invoked with <var>trigger()</var>. Please note that 
		 * it will not simulate the default behavior on the elements, such as a form submit when you click on a submit button. Event bubbling
		 * is supported, thus unless there's an event handler that cancels the event, the event will be triggered on all parent elements.
		 * 
		 * 
		 * @example Simulates a 'click' event on the button. 
		 * <pre>
		 * $('#myButton').trigger('click');
		 * </pre>
		 *
		 * @param name a single event name to trigger
		 * @param eventObj optional an object to pass to the event handler, provided the handler does not have custom arguments.
		 *                 Anything you pass here will be directly given to event handlers as event object, so you need to know what 
		 *                 they expect.
		 * @return the list
		 * @see ##on() registers events that can be triggered.
		 */
		'trigger': function (eventName, eventObj) {
			return this['each'](function(element, index) {
				var bubbleOn = true, el = element;
				while(el && bubbleOn) {
				eachObj(el['M'], function(id, f) {
				bubbleOn = bubbleOn && f(eventName, eventObj, element); 
				});
				el = el['parentNode'];
				}
			});
		}
	
		 /*$
			* @stop
			*/
			// @cond !trigger dummyTrigger:0
			,
			///#/snippet webListFuncs
		///#snippet extrasListFuncs
	
			/*$ 
			 * @id per
			 * @group LIST 
			 * @requires
			 * @configurable default 
			 * @name .per() 
			 * @syntax list.per(callback) 
			 * @syntax list.per(subSelector, callback) 
			 * @module UTIL
			 * Invokes the handler function for each list element with a single-element list containing only this element. It is very similar to
			 * ##each(), but instead of giving the element itself it wraps the element in a ##list#Minified list##. Additionally, you can specify 
			 * a sub-selector to iterate over the descendants matches by the selector instead of the list elements. 
			 *
			 * @example Create a mouseover toggle for a list:
			 * <pre>$('.toggler').per(function(el, i) {
			 *     el.onOver(el.toggle('myeffect'));
			 * });</pre>
			 * 
			 * @example Create click handlers for elements in a list:
			 * <pre>$('#list').add(HTML('{{each}}&lt;li>{{this.name}} &lt;a class="del" href="#">Delete&lt;/a>&lt;/li>{{each}}', items)
			 *                .per('.del', function(el, index) {
			 *                   el.on('click', deleteItemByName, [items[index].name]);
			 *                }));</pre>
			 *
			 * @param subSelector optional a selector as valid as first argument for #dollar#$(), to identify the descendants to iterate over.
			 * @param callback The callback <code>function(itemList, index)</code> to invoke for each list element. 
			 *                 <dl><dt>item</dt><dd>The current list element wrapped in a Minfified list.</dd>
			 *                 <dt>index</dt><dd>The second the zero-based index of the current element.</dd>
			 *                 <dt class="this">this</dt><dd>The list that is being iterated. If a sub-selector
			 *                 is being used, it is the list that resulted from using the sub-selector.</dd></dl>
			 *                 The callback's return value will be ignored.
			 * @return the list. Even if you specified a sub-selector, it will always return the original list.
			 */
			'per': function(subSelector, handler) {
				if (isFunction(subSelector))
					for (var len = this.length, i = 0; i < len; i++)
						subSelector.call(this, new M(_null, this[i]), i);
				else
					$(subSelector, this)['per'](handler);
				return this;
			},
	
			/*$
			 * @id ht
			 * @group ELEMENT
			 * @requires set template
			 * @configurable default
			 * @name .ht()
			 * @syntax list.ht(templateString, object...)
			 * @syntax list.ht(templateFunction, object...)
			 * @syntax list.ht(idSelector, object...)
			 * @module WEB+UTIL
			 * Replaces the content of the list elements with the HTML generated using the given template. The template uses
			 * ##template() syntax and HTML-escaped its output using ##escapeHtml(). 
			 * 
			 * @example When you have a HTML snippet like this:
			 * <pre>
			 * &lt;div id="price">&lt;/div>
			 * </pre> 
			 * Then you can format the price value like this:
			 * <pre>
			 * var price = 14.9;
			 * $('#price').ht('&lt;b>${{::0.00}}&lt;/b>', price);
			 * </pre>
			 * Results in:
			 * <pre>
			 * &lt;div id="price">&lt;b>$14.90&lt;/b>&lt;/div>
			 * </pre> 
			 *
			 * @example Render a list of names:
			 * <pre>
			 * var names = [ {first: 'James', last: 'Sullivan'}, 
			 *               {first: 'Michael', last: 'Wazowski'} ];
			 * $('#list').ht('&lt;h2>{{listName}}&lt;/h2>'+
			 *               '&lt;ul>{{each n: names}}&lt;li>{{n.first}} {{n.last}}&lt;/li>{{/each}}&lt;/ul>', 
			 *               {listName: 'Guys', names: names});
			 * </pre>
			 * The code creates this:
			 * <pre>
			 * &lt;h2>Guys&lt;/h2>
			 * &lt;ul>&lt;li>James Sullivan&lt;li>&lt;li>Michael Wazowski&lt;/li>&lt;/ul>
			 * </pre> 
			 * 
			 * @example You can store templates in &lt;script&gt; tags. First you need to create a &lt;script&gt; tag with a type not
			 *          supported by the browser and put your template in there, like this:
			 * <pre>&lt;script id="myTimeTpl" type="minified-template"&gt;The time is {{HH:mm:ss}}.&lt;/script&gt;</pre>
			 * Then you can specify the tag's id directly to access it:
			 * <pre>$('#timeDisplay').ht('#myTimeTpl', new Date());</pre>
			 *
			 * @param templateString the template using ##template() syntax. Please note, because this is a template, you should
			 *                     avoid creating the template itself dynamically, as compiling templates is expensive and
			 *                     Minified will cache only a limited number of templates. Exception: If the template string does not use
			 *                     any template functionality (no {{}}), it does not need to be compiled and won't be cached.<br/>
			 *                     The template will use ##escapeHtml() as escape function, so all template substitutions will be HTML-escaped,
			 *                     unless you use triple curly-braces.
			 * @param templateFunction instead of a HTML template, <var>ht()</var> can also use a template function, e.g. one
			 *                         created by ##template(). It will be invoked with the object as only argument.
			 * @param idSelector if you pass an ID CSS selector in the form "#myScript", Minified will recognize this and use the content 
			 *                   of the specified &lt;script> element as template. This allows you to put your template into 
			 *                   a &lt;script&gt; tag with a non-JavaScript type (see example). Any string that starts with '#' and does not
			 *                   contain any spaces is used as selector.
			 * @param object optional one or more objects to pass to the template. If object is not set, the template is called with <var>undefined</var>
			 *                        as object. If exactly one object is given, it is passed directly to the template. If you specify more than one 
			 *                        object, they are ##merge#merged##.
			 * @return the current list
			 * 
			 * @see ##HTML() creates only the nodes and can be used with ##add() and other methods to add the nodes to the DOM, giving you more flexibility than <var>ht()</var>.
			 */
			'ht': function(htmlTemplate, object) {
				var o = arguments.length > 2 ? merge(sub(arguments, 1)) : object;
				return this['set']('innerHTML', isFunction(htmlTemplate) ? htmlTemplate(o) : 
																			/{{/.test(htmlTemplate) ? formatHtml(htmlTemplate, o) : 
																			/^#\S+$/.test(htmlTemplate) ? formatHtml($$(htmlTemplate)['text'], o) : htmlTemplate);
			 }
			/*$
			 * @stop
			 */
			// @cond !ht dummyHt:0
		///#/snippet extrasListFuncs
		}, M.prototype);
	
		//// DOLLAR FUNCTIONS ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
		copyObj({
		///#snippet webDollarFuncs
		/*$
		* @id request
		* @group REQUEST
		* @requires 
		* @configurable default
		* @name $.request()
		* @syntax $.request(method, url)
		* @syntax $.request(method, url, data)
		* @syntax $.request(method, url, data, settings)
		* @module WEB
		* Initiates a HTTP request to the given URL, using XMLHttpRequest. It returns a ##promiseClass#Promise## object that allows you to obtain the result.
		* 
		* @example Invokes a REST web service and parses the resulting document using JSON:
		* <pre>
		* $.request('get', 'http://service.example.com/weather', {zipcode: 90210})
		*    .then(function(txt) {
		*         var json = $.parseJSON(txt);
		*         $('#weatherResult').fill('Today's forecast is is: ' + json.today.forecast);
		*    })
		*    .error(function(status, statusText, responseText) {
		*         $('#weatherResult').fill('The weather service was not available.');
		*    });
		* </pre>
		* 
		* @example Sending a JSON object to a REST web service:
		* <pre>
		* var myRequest = {         // create a request object that can be serialized via JSON
		*      request: 'register',
		*      entries: [
		*        {name: 'Joe',
		*      	    job: 'Plumber'
		*        }
		*      ]};
		* 
		* function failureHandler() {
		*   $('#registrationResult').fill('Registration failed');
		* }
		*
		* $.request('post', 'http://service.example.com/directory', $.toJSON(myRequest))
		*     .then(function(txt) {
		*        if (txt == 'OK')
		*             $('#registrationResult').fill('Registration succeeded');
		*        else
		*              failureHandler();
		*        })
		*     .error(failureHandler);
		* </pre>
		* 
		* @example Using HTTP authentication and a custom XMLHttpRequest property.
		* <pre>var handler = $.request('get', 'http://service.example.com/userinfo', null, {xhr: {withCredentials: true}, user: 'me', pass: 'secret'});</pre>
		*
		* 
		* @param method the HTTP method, e.g. 'get', 'post' or 'head' (rule of thumb: use 'post' for requests that change data 
		*             on the server, and 'get' to request data). Not case sensitive.
		* @param url the server URL to request. May be a relative URL (relative to the document) or an absolute URL. Note that unless you do something 
		*             fancy on the server (keyword to google:  Access-Control-Allow-Origin), you can only call URLs on the server your script originates from.
		* @param data optional data to send in the request, either as POST body or as URL parameters. It can be either a plain object as map of 
		*             parameters (for all HTTP methods), a string (for all HTTP methods), a DOM document ('post' only) or a FormData object ('post' only). 
		*             If the method is 'post', it will be sent as body, otherwise parameters are appended to the URL. In order to send several parameters with the 
		*             same name, use an array of values in the map. Use null as value for a parameter without value.
		* @param settings optional a map of additional parameters. Supports the following properties (all optional):
		* <dl><dt>headers</dt><dd>a map of HTTP headers to add to the request. Note that you should use the proper capitalization for the
		*                header 'Content-Type', if you set it, because otherwise it may be overwritten.</dd>
		* <dt>xhr</dt><dd>a map of properties to set in the XMLHttpRequest object before the request is sent, for example <code>{withCredentials: true}</code>.</dd>
		* <dt>user</dt><dd>username for HTTP authentication, together with the <var>pass</var> parameter</dd>
		* <dt>pass</dt><dd>password for HTTP authentication, together with the <var>user</var> parameter</dd>
		* </dl>
		* @return a ##promiseClass#Promise## containing the request's status. If the request has successfully completed with a HTTP status 2xx, 
		*         the promise's completion handler will be called as <code>function(text, xhr)</code>:
		*         <dl><dt>text</dt><dd>The response sent by the server as text.</dd>
		*         <dt>xhr</dt><dd>The XMLHttpRequest used for the request. This allows you to retrieve the response in different
		*         formats (e.g. <var>responseXml</var> for an XML document</var>), to retrieve headers and more.</dd></dl>
		*         The failure handler will be called as <code>function(statusCode, statusText, text)</code>:
		*         <dl><dt>statusCode</dt><dd>The HTTP status (never 200; 0 if no HTTP request took place).</dd>
		*         <dt>text</dt><dd>The response's body text, if there was any, or the exception as string if the browser threw one.</dd>
		*         <dt>xhr</dt><dd>The XMLHttpRequest used for the request. This allows you to retrieve the response in different
		*         formats (e.g. <var>responseXml</var> for an XML document</var>), to retrieve headers and more..</dd></dl>
		*         The returned promise supports ##stop(). Calling <var>stop()</var> will invoke the XHR's <var>abort()</var> method.
		*         The underlying XmlHttpRequest can also be obtained from the promise's <var>xhr</var> property.
		*         
		* @see ##values() serializes an HTML form in a format ready to be sent by <var>$.request</var>.
		* @see ##$.parseJSON() can be used to parse JSON responses.
		* @see ##$.toJSON() can create JSON messages.
		* @see ##_.format() can be useful for creating REST-like URLs, if you use JavaScript's built-in <var>escape()</var> function.
		*/
		'request': function (method, url, data, settings0) {
			var settings = settings0 || {}; 
			var xhr, callbackCalled = 0, prom = promise(), dataIsMap = data && (data['constructor'] == settings['constructor']);
			try {
				prom['xhr'] = xhr = new XMLHttpRequest();
	
				prom['stop0'] = function() { xhr['abort'](); };
				// @condend
	
				if (dataIsMap) { // if data is parameter map...
					data = collector(eachObj, data, function processParam(paramName, paramValue) {
						return collector(flexiEach, paramValue, function(v) { 
							return encodeURIComponent(paramName) + ((v != _null) ?  '=' + encodeURIComponent(v) : '');
						});
					}).join('&');
				}
	
				if (data != _null && !/post/i.test(method)) {
					url += '?' + data;
					data = _null;
				}
	
				xhr['open'](method, url, true, settings['user'], settings['pass']);
				if (dataIsMap && /post/i.test(method))
					xhr['setRequestHeader']('Content-Type', 'application/x-www-form-urlencoded');
	
				eachObj(settings['headers'], function(hdrName, hdrValue) {
					xhr['setRequestHeader'](hdrName, hdrValue);
				});
				eachObj(settings['xhr'], function(name, value) {
					xhr[name] = value;
				});
	
				xhr['onreadystatechange'] = function() {
					if (xhr['readyState'] == 4 && !callbackCalled++) {
						if (xhr['status'] >= 200 && xhr['status'] < 300)
							prom['fire'](true, [xhr['responseText'], xhr]);
						else
							prom['fire'](false, [xhr['status'], xhr['responseText'], xhr]);
					}
				};
	
				xhr['send'](data);
			}
			catch (e) {
				if (!callbackCalled) 
					prom['fire'](false, [0, _null, toString(e)]);
			}
	
			return prom;
		},
	
		/*
		 * JSON Module. Uses browser built-ins or json.org implementation if available. Otherwise its own implementation,
		 * originally based on public domain implementation http://www.JSON.org/json2.js / http://www.JSON.org/js.html.
		 * Extremely simplified code, made variables local, removed all side-effects (especially new properties for String, Date and Number).
		 */
	
		/*$
		* @id tojson
		* @group JSON
		* @requires  
		* @configurable default
		* @name $.toJSON()
		* @syntax $.toJSON(value)
		* @module WEB
		* Converts the given value into a JSON string. The value may be a map-like object, an array or list, a string, number, boolean or null.
			 * If you build Minified without Internet Explorer compatibility, this is just an alias for <var>JSON.stringify</var>.
		*
		* The following types are supported by the built-in implementation:
		* <ul>
		*   <li>Objects (direct properties will be serialized)</li>
		*   <li>Arrays/Lists (with <var>length</var> property)</li>
		*   <li>Strings</li>
		*   <li>Numbers</li>
		*   <li>Boolean</li>
		*   <li>null</li>
		* </ul>
		* Any other types in your JSON tree, especially Dates, should be converted into Strings before being passed to <var>toJSON</var>.
		*
		* @example Converts an object into a JSON object:
		* <pre>
		* var myObj = {name: 'Fruits', roles: ['apple', 'banana', 'orange']};
		* var jsonString = $.toJSON(myObj);
		* </pre>
		* 
		* @param value the value (map-like object, array/list, string, number, boolean or null)
		* @return the JSON string
		* 
		* @see ##$.parseJON() parses JSON structures.
		*/
		'toJSON': JSON.stringify,
	
		/*$
		* @id parsejson
		* @group JSON
		* @requires 
		* @configurable default
		* @name $.parseJSON()
		* @syntax $.parseJSON(text)
		* @module WEB
		* Parses a string containing JSON and returns the de-serialized object.
		* 
		* In Minified builds without Internet Explorer 7 compatibility, the browser's built-in function 
		* <var>JSON.parse</var> is used for de-serialization.
		 *
		* Only if you have a legacy-build without IE7 support, and you are actually running on IE7 or earlier, 
		* Minified will actually use its own implementation. Because of subtle differences between the
		* browser implementation and Minified's own you need to test your code thoroughly in this constellation,
		* but but it is a recommended security practise to use the browser implementation whenever possible.
		*
		* @example Parsing a JSON string:
		* <pre>
		* var jsonString = "{name: 'Fruits', roles: ['apple', 'banana', 'orange']}";
		* var myObj = $.parseJSON(jsonString);
		* </pre>
		*
		* @param text the JSON string
		* @return the resulting JavaScript object. <var>Undefined</var> if not valid.
		* @see ##$.toJSON() converts JavaScript objects to JSON.
		*/
		'parseJSON': JSON.parse,
	
		/*$
		* @id ready
		* @group EVENTS
		* @requires ready_vars ready_init
		* @configurable default
		* @name $.ready()
		* @syntax $.ready(handler)
		* @module WEB
		* Registers a handler to be called as soon as the HTML has been fully loaded in the browser. Does not necessarily wait for images and other elements, 
		* only the main HTML document needs to be complete. On older browsers it is the same as <var>window.onload</var>. 
		* 
		* If you call <var>ready()</var> after the page is completed, the handler is scheduled for invocation in the event loop as soon as possible.
		*
		* A shortcut for <var>ready()</var> is to call ##dollar#$()## with the handler function. It does the same with fewer characters.
		*
		* @example Registers a handler that sets some text in an element:
		* <pre>
		* $.ready(function() {
		*   $('#someElement').fill('ready() called');
		* });
		* </pre>
		*
		* @param handler the <code>function()</code> to be called when the HTML is ready.
		* @see ##dollar#$()## calls <var>ready()</var> when invoked with a function, offering a more convenient syntax.
		*/
		'ready': ready,
	
		/*$
		* @id loop
		* @group ANIMATION
		* @requires animation_vars 
		* @configurable default
		* @name $.loop()
		* @syntax $.loop(paintCallback)
		* @module WEB
		* Runs an animation loop. The given callback method will be invoked repeatedly to create a new animation frame.
		* In modern browsers, <var>requestAnimationFrame</var> will be used to invoke the callback every time the browser is ready for a new 
		* animation frame. 
		* The exact frequency is determined by the browser and may vary depending on factors such as the time needed to 
		* render the current page, the screen's framerate and whether the page is currently visible to the user. 
		* In older browsers the callback function will be invoked approximately every 33 milliseconds.
		* 
		* An animation loop runs indefinitely. To stop it, you have two options:
		* <ul><li>Invoke the <var>stop()</var> function that <var>$.loop()</var> that will return.</li>
		* <li>The animation callback receives the same <var>stop()</var> function as second argument, so the callback can end the animation itself.</li>
		* </ul>
		*
		* @example Animates a div by moving along in a circle.
		* <pre>
		*   var myDiv = $$('#myAnimatedDiv');
		*   var rotationsPerMs = 1000;                           // one rotation per second
		*   var radius = 100;
		*   var d = 3000;                                        // duration in ms
		*   $.loop(function(t, stopFunc) {
		*     var a = 2 * Math.PI * Math.min(t, d) / rotationsPerMs; // angular position
		*     myDiv.style.left = (radius * Math.cos(a) + ' px';
		*     myDiv.style.top = (radius * Math.sin(a) + ' px';
		*     if (t > d)                                         // time is up: call stopFunc()!
		*       stopFunc();
		*   });
		* </pre>
		*
		* @param paintCallback a callback <code>function(timestamp, stopFunc)</code> that will be invoked repeatedly to prepare a frame. Parameters given to callback:
		* <dl>
		*            <dt>timestamp</dt><dd>The number of miliseconds since the animation's start (possibly as high-precision double, if the browser supports this).</dd>
		*            <dt>stop</dt><dd>Call this <code>function()</code> to stop the currently running animation.</dd>
		* </dl>
		* The callback's return value will be ignored.
		* @return a <code>function()</code> that stops the currently running animation. This is the same function that is also given to the callback.
		* 
		* @see ##animate() for simple, property-based animations.
		*/
		'loop': function(paintCallback) {
			var startTimestamp;
			var currentTime = 0;
			var id = idSequence++;
			var requestAnim = _window['requestAnimationFrame'] || function(f) { setTimeout(function() { f(+new Date()); }, 33); }; // 30 fps as fallback
			function raFunc(ts) {
				eachObj(animationHandlers, function(id, f) { f(ts); });
				if (animationHandlerCount) 
					requestAnim(raFunc);
			}; 
			function stop() {
				if (animationHandlers[id]) {
					delete animationHandlers[id];
					animationHandlerCount--;
				}
				return currentTime;
			} 
			animationHandlers[id] = function(ts) {
				startTimestamp = startTimestamp || ts;
				paintCallback(currentTime = ts - startTimestamp, stop);
			};
	
			if (!(animationHandlerCount++)) 
				requestAnim(raFunc);
			return stop; 
		},
	
		/*$
		 * @id off
		 * @group EVENTS
		 * @requires on
		 * @configurable default
		 * @name $.off()
		 * @syntax $.off(handler)
			* @module WEB
		 * Removes the given event handler. The call will be ignored if the given handler has not been registered using ##on(). 
		 * If the handler has been registered for more than one element or event, it will be removed from all instances.
		 * 
		 * Please note that you can not unregister event handlers registered using ##onOver() or ##onChange().
		 * 
		 * @example Adds a handler to an element:
		 * <pre>
		 * function myEventHandler() {
		 *    this.style.backgroundColor = 'red';        // 'this' contains the element that caused the event
		 * }
		 * $('#myElement').on('click', myEventHandler);  // add event handler
		 *
		 * window.setInterval(function() {               // after 5s, remove event handler
		 *    $.off(myEventHandler);
		 * }, 5000);
		 * </pre>
		 * 
		 * @param handler the handler to unregister, as given to ##on(). It must be a handler that has previously been registered using ##on().
		 *                If the handler is not registered as event handler, the function does nothing.
		 *                
		 * @see ##on() registers an event handler.
		 */
		'off': off
	
		 /*$
			* @stop
			*/
		// @cond !off dummyOff:null
		,
		///#/snippet webDollarFuncs
			///#snippet extrasDollarFuncs
	
			/*$
			 * @id setcookie
			 * @group COOKIE
			 * @configurable default
			 * @name $.setCookie()
			 * @syntax $.setCookie(name, value)
			 * @syntax $.setCookie(name, value, dateOrDays)
			 * @module WEB+UTIL
			 * Creates, updates or deletes a cookie. If there is an an existing cookie
			 * of the same name, will be overwritten with the new value and settings.
			 * 
			 * To delete a cookie, overwrite it with an expiration date in the past. The easiest way to do this is to 
			 * use <code>-1</code> as third argument.
			 *
			 * @example Reads the existing cookie 'numberOfVisits', increases the number and stores it:
			 * <pre>
			 * var visits = $.getCookie('numberOfVisits');
			 * $.setCookie('numberOfVisits', 
			 *                      visits ? (parseInt(visits) + 1) : 1,   // if cookie not set, start with 1
			 *                      365);                                  // store for 365 days
			 * </pre>
			 * 
			 * @example Deletes the cookie 'numberOfVisits':
			 * <pre>
			 * $.setCookie('numberOfVisits', '', -1);
			 * </pre>
			 * 
			 * @param name the name of the cookie. This should ideally be an alphanumeric name, as it will not be escaped by Minified and this
			 *             guarantees compatibility with all systems.
			 *             If it contains a '=', it is guaranteed not to work, because it breaks the cookie syntax. 
			 * @param value the value of the cookie. All characters can be used. Non-Alphanumeric other than "*@-_+./" will be escaped using the 
			 *              JavaScript <var>escape()</var> function, unless you set the optional <var>dontEscape</var> parameter.
			 * @param dateOrDays optional specifies when the cookie expires. Can be either a Date object or a number that specifies the
			 *                   amount of days. If not set, the cookie has a session lifetime, which means it will be deleted as soon as the
			 *                   browser has been closed. If the number negative or the date in the past, the cookie will be deleted.
			 * @param dontEscape optional if set, the cookie value is not escaped. Note that without escaping you can not use every possible
			 *                    character (e.g. ";" will break the cookie), but it may be needed for interoperability with systems that need
			 *                    some non-alphanumeric characters unescaped or use a different escaping algorithm.
			 * @see ##$.getCookie() reads a cookie.
	
			 */
			'setCookie': function(name, value, dateOrDays, dontEscape) {
				document.cookie = name + '=' + (dontEscape ? value : escape(value)) + 
					(dateOrDays ? ('; expires='+(isObject(dateOrDays) ? dateOrDays : new Date((+new Date()) + dateOrDays * 8.64E7)).toUTCString()) : '');
			},
	
			/*$
			 * @id getcookie
			 * @group COOKIE
			 * @requires
			 * @configurable default
			 * @name $.getCookie()
			 * @syntax $.getCookie(name)
			 * @syntax $.getCookie(name, dontUnescape)
			 * @module WEB+UTIL
			 * Returns the cookie with the given name. 
			 *
			 * @example Reads the existing cookie 'numberOfVisits' and displays the number in the element 'myCounter':
			 * <pre>
			 * var visits = $.getCookie('numberOfVisits');
			 * if (!visits)    // check whether cookie set. Null if not
			 *     $('#myCounter').set('innerHML', 'Your first visit.');
			 * else
			 *     $('#myCounter').set('innerHTML', 'Visit No ' + visits);
			 * </pre>
			 *  
			 * @param name the name of the cookie. Should consist of alphanumeric characters, percentage, minus and underscore only, as it will not be escaped. 
			 *             You may want to escape the name using <var>encodeURIComponent()</var> if it contains any other characters.
			 * @param dontUnescape optional if set and true, the value will be returned unescaped. Use this parameter only if the value has been encoded
			 *                     in a special way and not with the standard JavaScript <var>encode()</var> method.
			 * @return the value of the cookie, or <var>null</var> if not found. Unless <var>dontUnescape</var> has been set, the value has been unescaped
			 *         using JavaScript's <code>unescape()</code> function.
			 *
			 * @see ##$.setCookie() sets a cookie.
			 */
			'getCookie': function(name, dontUnescape) {
				var regexp, match = (regexp = new RegExp('(^|;)\\s*'+name+'=([^;]*)').exec(document.cookie)) && regexp[2];
				return dontUnescape ? match : match && unescape(match);
			},
	
			/*$
			 * @id wait
			 * @group EVENTS
			 * @configurable default
			 * @requires promise
			 * @name $.wait()
			 * @syntax $.wait()
			 * @syntax $.wait(durationMs)
			 * @syntax $.wait(durationMs, args)
			 * @module WEB+UTIL
			 *
			 * Creates a new  ##promise#Promise## that will be fulfilled as soon as the specified number of milliseconds have passed. This is mainly useful for animation,
			 * because it allows you to chain delays into your animation chain.
			 * 
			 * The operation can be interrupted by calling the promise's ##stop() function.
			 *
			 * @example Chained animation using Promise callbacks. The element is first moved to the position 200/0, then to 200/200, waits for 50ms 
			 *          and finally moves to 100/100.
			 * <pre>
			 * var div = $('#myMovingDiv').set({$left: '0px', $top: '0px'});
			 * div.animate({$left: '200px', $top: '0px'}, 600, 0)
			 *    .then(function() {
			 *           div.animate({$left: '200px', $top: '200px'}, 800, 0);
			 *    }).then(function() {
			 *    	     return _.wait(50);
			 *    }).then(function() {
			 *           div.animate({$left: '100px', $top: '100px'}, 400);
			 *    });
			 * });
			 * </pre>
			 *
			 *
			 * @param durationMs optional the number of milliseconds to wait. If omitted, the promise will be fulfilled as soon as the browser can run it
			 *                   from the event loop.
			 * @param args optional an array or list of arguments to pass to the promise handler
			 * @return a ##promise#Promise## object that will be fulfilled when the time is over, or fail when the promise's ##stop() has been called. 
			 *         The promise argument of a fulfilled promise is the <var>args</var> parameter as given to <var>wait()</var>. The returned promise supports ##stop()
			 *         to interrupt the promise.
			 */
			'wait': function(durationMs, args) {
				var p = promise();
				var id = setTimeout(function() { 
					p['fire'](true, args); 
				}, durationMs);
				p['stop0'] = function() { p['fire'](false); clearTimeout(id); };
				return p;
			}
	
			/*$
			 * @stop
			 */
			// @cond !wait dummyWait:0
	
			///#/snippet extrasDollarFuncs
		}, $);
	
		//// UNDERSCORE FUNCTIONS ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	
		copyObj({
			///#snippet utilUnderscoreFuncs
			 // @condblock filter
			'filter': funcArrayBind(filter),
			 // @condend
			 // @condblock collect
			'collect': funcArrayBind(collect),
			 // @condend
			 // @condblock map
			'map': funcArrayBind(map),
			 // @condend
			 // @condblock sub
			'sub': funcArrayBind(sub),
			 // @condend
			 // @condblock reverse
			'reverse': reverse,
			 // @condend
			 // @condblock each
			'each': each,
			 // @condend
			 // @condblock each
			'toObject': toObject,
			 // @condend
			 // @condblock find
			'find': find,
			 // @condend
			 // @condblock findlast
			'findLast': findLast,
			 // @condend
			 // @condblock contains
			'contains': contains,
			 // @condend
			 // @condblock startswith
			 'startsWith': startsWith,
			 // @condend
			 // @condblock endswith
			 'endsWith': endsWith,
			 // @condend
			 // @condblock equals
			'equals': equals,
			 // @condend
			 // @condblock call
			'call': funcArrayBind(callList),
			 // @condend
			 // @condblock array
			'array': array,
			 // @condend
			 // @condblock unite
			'unite': unite,
			 // @condend
			 // @condblock merge
			'merge': merge,
			 // @condend
			 // @condblock uniq
			'uniq': funcArrayBind(uniq),
			 // @condend
			 // @condblock intersection
			'intersection': funcArrayBind(intersection),
			 // @condend
	
			/*$ 
			 * @id keys 
			 * @group OBJECT 
			 * @requires
			 * @configurable default 
			 * @name _.keys() 
			 * @syntax _.keys(obj) 
			 * @module UTIL
			 * Creates a ##list#Minified list## containing all property names of the specified object. Only direct properies are
			 * included, not inherited ones. The order of the keys in the list is undefined and runtime-specific.
			 *
			 * @example Using <var>keys()</var>:
			 * <pre>var obj = {a: 2, b: 52};
			 * var keys = _.keys(obj);  // keys contains ['a', 'b'] now
			 * </pre>
			 *
			 * @param object The object to gather keys from.
			 * @return A Minified list containing the property names.
			 * 
			 * @see ##_.values() returns the values of an object as a list.
			 */
			'keys': funcArrayBind(keys),
	
			/*$ 
			 * @id objvalues 
			 * @group OBJECT 
			 * @requires
			 * @configurable default 
			 * @name _.values() 
			 * @syntax _.values(obj) 
			 * @module UTIL
			 * Creates a ##list#Minified list## containing all property values of the specified object. Only direct properies are
			 * included, not inherited ones. The order of the values in the list is undefined and runtime-specific.
			 *
			 * @example Using <var>values()</var>:
			 * <pre>var obj = {a: 2, b: 52};
			 * var values = _.values(obj);  // keys contains [2, 52] now
			 * </pre>
			 * 
			 * @param object The object to gather values from.
			 * @return A Minified list containing the property names.
			 * 
			 * @see ##_.keys() retrieves the property names of an object as a list.
			 */
			'values': funcArrayBind(function(obj, keys) {
				var list = [];
				if (keys)
					each(keys, function(value) { list.push(obj[value]); });
				else
					eachObj(obj, function(key, value) { list.push(value); });
				return list;
			}),
	
			/*$
			 * @id copyobj
			 * @group OBJECT
			 * @requires 
			 * @configurable default
			 * @name _.copyObj()
			 * @syntax _.copyObj(from)
			 * @syntax _.copyObj(from, to)
			 * @module UTIL
			 * Copies every property of the first object into the second object. The properties are copied as shallow-copies. 
			 * 
			 *  @example Copying properties:
			 * <pre>var target = {a:3, c: 3};
			 * _.copyObj({a: 1, b: 2}, target); // target is now {a: 1, b: 2, c: 3}</pre>
			 *
			 *  @example Inline property merge:
			 * <pre>var target = _.copyObj({a: 1, b: 2}, {a:3, c: 3}); // target is now {a: 1, b: 2, c: 3}</pre>
			 *
			 *  @example Duplicating an object:
			 * <pre>var target = _.copyObj({a: 1, b: 2}); // target is now {a: 1, b: 2}</pre>
			 *
			 * @param from the object to copy from
			 * @param to optional the object to copy to. If not given, a new object will be created.
			 * @return the object that has been copied to
			 * 
			 * @see ##_.extend() is very similar to <var>copyObj()</var>, but with a slightly different syntax.
			 * @see ##_.merge() copies a list of objects into a new object.
			 */
			'copyObj': copyObj, 
	
			/*$
			 * @id extend
			 * @group OBJECT
			 * @requires 
			 * @configurable default
			 * @name _.extend()
			 * @syntax _.extend(target, src...)
			 * @module UTIL
			 * Copies every property of the source objects into the first object. The source objects are specified using variable arguments. 
			 * There can be more than one. 
			 * The properties are copied as shallow-copies.
			 * 
			 * <b>Please note:</b> Unlike jQuery, <var>extend</var> does not directly add a function to extend Minified, although
			 * you can use it to for this. To add a function to ##list#Minified lists##, add a property to
			 * ##M#MINI.M##. If you want to extend <var>$</var> or <var>_</var>, just assign the new function(s) as property.
			 * 
			 *  @example Copying properties:
			 * <pre>var target = {a:3, c: 3};
			 * _.extend(target, {a: 1, b: 2}); // target is now {a: 1, b: 2, c: 3}</pre>
			 *
			 *  @example Using several source values:
			 * <pre>var extend = _.extend({a: 1, b: 2}, {a:3, c: 3}, {d: 5}); // target is now {a: 1, b: 2, c: 3, d: 5}</pre>
			 *
			 * @param target the object to copy to
			 * @param src the object(s) to copy from. Variable argument, there can be any number of sources. Nulls and <var>undefined</var>
			 *            parameters will be ignored.
			 * @return the target
			 *
			 * @see ##_.copyObj() is very similar to <var>extend()</var>, but with a slightly different and more straightforward syntax.
			 * @see ##_.merge() copies a list of objects into a new object.
			 */
			'extend': function(target) {
				return merge(sub(arguments, 1), target);
			},
	
			/*$ 
			 * @id range 
			 * @group FUNC 
			 * @requires
			 * @configurable default 
			 * @name _.range() 
			 * @syntax _.range(end) 
			 * @syntax _.range(start, end) 
			 * @module LIST
			 * Creates a new ##list#Minified list## containing an interval of numbers from <var>start</var> (inclusive)
			 * until <var>end</var> (exclusive). <var>start</var> can also be omitted to start at 0.
			 *
			 * @example Creates some ranges
			 * <pre>var l123 = _.range(1, 4);      // same as _(1, 2, 3)
			 * var l0123 = _.range(3);        // same as _(0, 1, 2)
			 * var neg123 = _.range(-3, 0);   // same as _(-3, -2, -1)
			 * var empty = _.range(2,1);      // same as _()</pre>	
			 *
			 * @param start optional the start number. If omitted, the range starts at 0.
			 * @param end the end of the range (exclusive)
			 * @return the new Minfied list containing the numbers. Empty is <var>start</var> is not smaller than <var>end</var>.
			 */		
			'range': function(start, end) {
				var r = [], e = (end==_null) ? start : end;
				for (var i = (end!=_null)?start:0; i < e; i++)
					r.push(i);
				return new M(r);
			},
	
			/*$ 
			 * @id bind 
			 * @group FUNC 
			 * @requires
			 * @configurable default 
			 * @name _.bind() 
			 * @syntax _.bind(f, fThis) 
			 * @syntax _.bind(f, fThis, beforeArgs) 
			 * @syntax _.bind(f, fThis, beforeArgs, afterArgs) 
			 * @module UTIL
			 * Creates a new function that calls the given function bound to the given object as 'this', and optionally with the specified 'pre-filled' arguments
			 * to be appended or prepended to the arguments you all the new function with.
			 *
			 * See also ##_.partial(), if you do not need to set 'this'.
			 *
			 * @example Create a method that multiplies all list elements:
			 * <pre>function mul(factor) { return this.map(function(v) { return v * factor; }; }
			 * var myList = _(1, 2, 3);
			 * var mulMyList = _.bind(mul, myList);       // binding only 'this'
			 * var mulMyList5 = _.bind(mul, myList, 5);   // binding 'this' and prepending a parameter
			 * 
			 * var myList4 = mulMyList(4); // returns _(4, 8, 12)
			 * var myList5 = mulMyList(); // returns _(5, 10, 15)</pre>	
			 *
			 * @param f the function to bind
			 * @param fThis the object to pass as 'this'. Please note JavaScript's limitations for 'this'. If you attempt to pass a string or number, they will be wrapped using
			 *              JavaScript's wrapper classes String and Number.
			 * @param beforeArgs optional either a list of values to insert in front of the arguments, or a single non-list value to put in front. If null or not set,
			 *                             there won't be any arguments inserted. If you need to insert a <var>null</var>, <var>undefined</var> or a list, just wrap them in an array 
			 *                             (e.g. <code>[null]</code>).
			 * @param afterArgs optional either a list of values to append to the end of the arguments, or a single non-list value to append. If null or not set,
			 *                             there won't be any arguments appended. If you need to append a <var>null</var>, <var>undefined</var> or a list, just wrap them in an array 
			 *                             (e.g. <code>[null]</code>).
			 * @return the new function that will invoke <var>f</var> with its arguments modified as specified about.
			 * 
			 * @see _.partial() is similar to <var>bind()</var>, but without the 'this' argument.
			 */
			'bind': bind,
	
			/*$ 
				* @id partial 
			 * @group FUNC 
			 * @requires
			 * @configurable default 
			 * @name _.partial() 
			 * @syntax _.partial(f, beforeArgs) 
			 * @syntax _.partial(f, beforeArgs, afterArgs) 
			 * @module UTIL
			 * Creates a new function that calls the given function with some arguments pre-filled. You can specify one or more arguments to 
			 * be put in front of the arguments list as well as arguments that will be appended to the argument list.
			 *
			 * See also ##_.bind(), if you want to set 'this' as well. <var>partial()</var> calls the wrapped function with the 'this' the 
			 * wrapper has been called with.
			 * 
			 * @example Create functions that divide:
			 * <pre>function div(a, b) { return a / b; }
			 * var div5 = _.partial(add, 5);         // like function(a) { return 5 / a; }
			 * var divBy5 = _.partial(add, null, 5); // like function(a) { return a / 5; }
			 * </pre>
			 *
			 * @example Create functions that remove characters from the beginning and/or end of a string:
			 * <pre>// This function multiplies the first <var>count</var> items of the <var>list</var> by <var>factor</var>
			 * function multiply(list, count, factor) { 
			 *     return list.map(function(v, index) { 
			 *         return index &lt; count ? factor * v : v; 
			 *     }); 
			 * }
			 * 
			 * var mul3by2 = _.partial(multiply, null, [3, 2]); 
			 * var r1 = mul10by2(_(1, 2, 3, 4, 5));   // returns _(2, 4, 6, 4, 5)
			 * 
			 * var mul123 = _.partial(multiply, [_(1, 2, 3)]);                // array wrapper required to pass a list!
			 * var r2 = mul123(2, 5);                 // returns _(5, 10, 3)
			 * 
			 * var mul12345By2 = _.partial(multiply, [_(1, 2, 3, 4, 5)], 2);  // array wrapper required!
			 * var r3 = mul12345By2(3);               // returns _(2, 4, 6, 4, 5)
			 * </pre>
			 *
			 * @param f the function to bind
			 * @param beforeArgs either a list of values to insert in front of the arguments, or a single non-list value to put in front. If null or not set,
			 *                             there won't be any arguments inserted. If you need to insert a <var>null</var>, <var>undefined</var> or a list, just wrap them in an array 
			 *                             (e.g. <code>[null]</code>).
			 * @param afterArgs optional either a list of values to append to the end of the arguments, or a single non-list value to append. If null or not set,
			 *                             there won't be any arguments appended. If you need to append a <var>null</var>, <var>undefined</var> or a list, just wrap them in an array 
			 *                             (e.g. <code>[null]</code>).
			 * @return the resulting string
			 * 
			 * @see ##_.bind() is similar to <var>partial()</var>, but allows you to set 'this'.
			 */
			'partial': partial,
	
			/*$
			 * @id eachobj
			 * @group OBJECT
			 * @requires 
			 * @configurable default
			 * @name _.eachObj()
			 * @syntax _.eachObj(obj, callback)
			 * @syntax _.eachObj(obj, callback, ctx)
			 * @module UTIL
			 * Invokes the given function once for each property of the given object. The callback is not invoked for inherited properties.
			 *
			 * @example Dumps all properties of an object.
			 * <pre>
			 * var s = '';
			 * _.eachObj({a: 1, b: 5, c: 2}, function(key, value) {
			 *     s += 'key=' + key + ' value=' + value + '\n';
			 * });
			 * </pre>
			 * 
			 * @param obj the object to use
			 * @param callback The callback <code>function(key, value)</code> to invoke for each property. 
			 *                 <dl><dt>key</dt><dd>The name of the current property.</dd>
			 *                 <dt>value</dt><dd>The value of the current property.</dd>
			 *                 <dt class="this">this</dt><dd>The given context. If not set, the object itself.</dd>
			 *                 The callback's return value will be ignored.
			 * @param ctx optional a context to pass to the callback as 'this'.
			 * @return the object
			 * 
			 * @see ##_.each() iterates through a list.
			 */
			'eachObj': eachObj,
	
			/*$
			 * @id mapobj
			 * @group OBJECT
			 * @requires 
			 * @configurable default
			 * @name _.mapObj()
			 * @syntax _.mapObj(obj, callback)
			 * @syntax _.mapObj(obj, callback, ctx)
			 * @module UTIL
			 * Creates a new object with the same properties but different values using the given callback function. The function is called
			 * for each property of the input object to provice a new value for the property.
			 *
			 * @example Increases the values of all properties.
			 * <pre>
			 * var r = _.mapObj({a: 1, b: 5, c: 2}, function(key, value) {
			 *     return value + 1;
			 * });
			 * // r is now {a: 2, b: 6, c: 2}
			 * </pre>
			 * 
			 * @param obj the object to use
			 * @param callback The callback <code>function(key, value)</code> to invoke for each property. 
			 *                 <dl><dt>key</dt><dd>The name of the current property.</dd>
			 *                 <dt>value</dt><dd>The value of the current property.</dd>
			 *                 <dt class="this">this</dt><dd>The given context. If not set, the object itself.</dd>
			 *                 <dt class="returnValue">(callback return value)</dt><dd>This value will replace the original value in the new object.</dd></dl>
			 * @param ctx optional a context to pass to the callback as 'this'.
			 * @return the new object
			 * 
			 * @see ##_.filterObj() filters an object.
			 * @see ##map() maps a list.
			 */
			'mapObj': function(obj, mapFunc, ctx) {
				var result = {};
				eachObj(obj, function(key, value) {
					result[key] = mapFunc.call(ctx || obj, key, value);
				});
				return result;
			},
	
			/*$
			 * @id filterobj
			 * @group OBJECT
			 * @requires 
			 * @configurable default
			 * @name _.filterObj()
			 * @syntax _.filterObj(obj, filterFunc)
			 * @syntax _.filterObj(obj, filterFunc, ctx)
			 * @module UTIL
			 * Creates a new object that contains only those properties of the input object that have been approved by the filter function.
			 *  
			 * If the callback function returns true, the property and its value are shallow-copied in the new object, otherwise it will be removed.
			 *
			 * @example Removing all values over 10 from an object:
			 * <pre>
			 * var list = _.filterObj({a: 4, b: 22, c: 7, d: 2, e: 19}, function(key, value) {
			 *     return value &lt;= 10;
			 * });
			 * </pre>
			 * 
			 * @param obj the object to use
			 * @param callback The callback <code>function(key, value)</code> to invoke for each property. 
			 *                 <dl><dt>key</dt><dd>The name of the current property.</dd>
			 *                 <dt>value</dt><dd>The value of the current property.</dd>
			 *                 <dt class="this">this</dt><dd>The given context. If not set, the object itself.</dd>
			 *                 <dt class="returnValue">(callback return value)</dt><dd><var>true</var> to include the property in the new object, <var>false</var> to omit it.</dd></dl>
			 * @param ctx optional a context to pass to the callback as 'this'.
			 * @return the new object
			 * 
			 * @see ##_.mapObj() can be used to modify the values og an object.
			 */
			'filterObj': function(obj, f, ctx) {
				var r = {};
				eachObj(obj, function(key, value) {
					if (f.call(ctx || obj, key, value))
						r[key] = value;
				});
				return r;
			},
	
			/*$
			 * @id islist
			 * @group TYPE
			 * @requires 
			 * @configurable default
			 * @name _.isList()
			 * @syntax _.isList(obj)
			 * @module UTIL
			 * Checks whether the given object resembles a list or array. To qualify, it must have a <var>length</var> property, but must not be a string, a function or have a 
			 * <var>nodeType</var> property.
			 *
			 * @param obj the object to test
			 * @return <var>true</var> if the object is a list or array, <var>false</var> otherwise.
			 */
			'isList': isList,
	
			/*$
			 * @id isfunction
			 * @group TYPE
			 * @requires 
			 * @configurable default
			 * @name _.isFunction()
			 * @syntax _.isFunction(obj)
			 * @module UTIL
			 * Checks whether the given object is a function.
			 *
			 * @param obj the object to test
			 * @return <var>true</var> if the object is a function, <var>false</var> otherwise.
			 */
			'isFunction': isFunction,
	
			/*$
			 * @id isobject
			 * @group TYPE
			 * @requires 
			 * @configurable default
			 * @name _.isObject()
			 * @syntax _.isObject(obj)
			 * @module UTIL
			 * Checks whether the given reference is an object as defined by <var>typeof</var>.
			 *
			 * @param obj the object to test
			 * @return <var>true</var> if the object is an object, <var>false</var> otherwise.
			 */
			'isObject': isObject,
	
			/*$
			 * @id isnumber
			 * @group TYPE
			 * @requires 
			 * @configurable default
			 * @name _.isNumber()
			 * @syntax _.isNumber(obj)
			 * @module UTIL
			 * Checks whether the given reference is a number as defined by <var>typeof</var>.
			 *
			 * @param obj the object to test
			 * @return <var>true</var> if the object is a number, <var>false</var> otherwise.
			 * 
			 * @see ##_.isValue() matches basic types such as dates numbers.
			 */
			'isNumber': isNumber,
	
			/*$
			 * @id isbool
			 * @group TYPE
			 * @requires 
			 * @configurable default
			 * @name _.isBool()
			 * @syntax _.isBool(obj)
			 * @module UTIL
			 * Checks whether the given reference is a boolean <var>true</var>  or <var>false</var>.
			 *
			 * @param obj the object to test
			 * @return <var>true</var> if the object is a boolean, <var>false</var> otherwise.
			 *
			 * @see ##_.isValue() matches basic types such as booleans.
			 */
			'isBool': isBool,
	
			/*$
			 * @id isdate
			 * @group TYPE
			 * @requires 
			 * @configurable default
			 * @name _.isDate()
			 * @syntax _.isDate(obj)
			 * @module UTIL
			 * Checks whether the given object is a <var>Date</var>. To be recognized as a date, the object
			 * must pass ##_.isObject() and have a <var>getDate</var> property.
			 *
			 * @param obj the object to test
			 * @return <var>true</var> if the object is a <var>Date</var>, <var>false</var> otherwise.
			 * 
			 * @see ##_.isValue() matches basic types such as dates.
			 */
			'isDate': isDate,
	
			/*$
			 * @id isvalue
			 * @group TYPE
			 * @requires 
			 * @configurable default
			 * @name _.isValue()
			 * @syntax _.isValue(obj)
			 * @module UTIL
			 * Checks whether the given object is a value. Minified defines values as all basic types (strings, booleans and numbers)
			 * and Dates.
			 *
			 * @param obj the object to test
			 * @return <var>true</var> if the object is a value, <var>false</var> otherwise.
			 * 
			 * @see ##_.isString() checks for a string.
			 * @see ##_.isNumber() checks for a number.
			 * @see ##_.isBool() checks for a boolean.
			 * @see ##_.isDate() checks for a date.
			 */
			'isValue': isValue,
	
			/*$
			 * @id isstring
			 * @group TYPE
			 * @requires 
			 * @configurable default
			 * @name _.isString()
			 * @syntax _.isString(object)
			 * @module UTIL
			 * Checks whether the given reference is a string as defined by <var>typeof</var>.
			 *
			 * @param obj the object to test
			 * @return <var>true</var> if the object is a string, <var>false</var> otherwise.
			 * 
			 * @see ##_.isValue() matches basic types such as strings.
			 */
			'isString': isString,
	
			/*$
			 * @id tostring
			 * @group TYPE
			 * @requires 
			 * @configurable default
			 * @name _.toString()
			 * @syntax _.toString(obj)
			 * @module UTIL
			 * Converts the given object to a string. <var>null</var> and <var>undefined</var> will be converted to an empty string.
			 *
			 * @param obj the object to convert
			 * @return the resulting string
			 */
			'toString': toString,
	
			/*$
			 * @id dateclone
			 * @group DATE
			 * @requires 
			 * @configurable default
			 * @name _.dateClone()
			 * @syntax _.dateClone(date)
			 * @module UTIL
			 * Creates a new <var>Date</var> object that represents the same time as the given date.
			 *
			 * @param date the <var>Date</var> to clone
			 * @return the new <var>Date</var> copy
			 */
			'dateClone': dateClone,
	
			/*$
			 * @id dateadd
			 * @group DATE
			 * @requires 
			 * @configurable default
			 * @name _.dateAdd()
			 * @syntax _.dateAdd(date, property, value)
			 * @module UTIL
			 * Adds the specified time to the given <var>Date</var> and returns the result as a new <var>Date</var> .  The unit for the <var>value</var> can be any <var>Date</var>
			 * property that has get and set methods: 'fullYear', 'month', 'date', 'hours', 'minutes', 'seconds' or 'milliseconds'.
			 * 
			 * @example Calculate some dates based on the current time:
			 * <pre>var now = new Date();
			 * var yesterday = _.dateAdd(now, 'date', -1);
			 * var inOneHour = _.dateAdd(now, 'hours', 1);
			 * var tomorrow = _.dateAdd(now, 'date', 1);
			 * var inThreeMonths = _.dateAdd(now, 'month', 3);</pre>
			 *
			 * @param date the <var>Date</var> to add to
			 * @param property a property name to represent the unit of the <var>value</var>. Can be 'fullYear', 'month', 'date', 'hours', 'minutes', 'seconds' or 'milliseconds'.
			 * @param value the amount to add
			 * @return the new <var>Date</var> copy
			 */
			'dateAdd': dateAdd,
	
			/*$
			 * @id datediff
			 * @group DATE
			 * @requires 
			 * @configurable default
			 * @name _.dateDiff()
			 * @syntax _.dateDiff(property, date1, date2)
			 * @module UTIL
			 * 
			 * Calculates the time difference between both dates, using in the unit determined by the <var>property</var>.
			 * 
			 * If the unit is not calendar-based ('hours', 'minutes', 'seconds' or 'milliseconds')
			 * the result is calculated with full precision and not rounded. 
			 * If the unit is calendar-based ('fullYear', 'month', 'date'),
			 * the result is the amount of full units between those dates in the current time zone.
			 * 
			 * If <var>date2</var> is earlier than <var>date1</var>, the result is negative.
			 * 
			 * @example Calculate duration between two dates:
			 * <pre>function diff(d1, d2) {
			 *     return _.dateDiff('fullYears', d1, d2) + ' years,' +
			 *            _.dateDiff('months', d1, d2) + ' months and' +
			 *            _.dateDiff('date', d1, d2) + ' days';
			 * }</pre>
			 *
			 * @param date1 the first <var>Date</var>
			 * @param date2 the first <var>Date</var>
			 * @param property a property name to represent the unit of the <var>value</var>. Can be 'fullYear', 'month', 'date', 'hours', 'minutes', 'seconds' or 'milliseconds'.
			 * @return the time difference between the two dates. Negative if <var>date2</var> is earlier than <var>date1</var>.
			 */
			'dateDiff': dateDiff,
	
			/*$
			 * @id datemidnight
			 * @group DATE
			 * @requires 
			 * @configurable default
			 * @name _.dateMidnight()
			 * @syntax _.dateMidnight()
			 * @syntax _.dateMidnight(date)
			 * @module UTIL
			 * 
			 * Returns a new <var>Date</var> object with the same calendar date, but at midnight in the current time zone. If no parameter 
			 * is given, it returns the current day at midnight.
			 *
			 * @param date optional the <var>Date</var>. If omitted, the current date is used.
			 * @return a new <var>Date</var> representing midnight in the current time zone
			 */
			'dateMidnight': dateMidnight,
	
			/*$
			 * @id pad
			 * @group FORMAT
			 * @requires 
			 * @configurable default
			 * @name _.pad()
			 * @syntax _.pad(digits, number)
			 * @module UTIL
			 * 
			 * Converts a number into a string by 'padding' it with leading zeros until it has at least the given number of digits.
			 *
			 * @param digits the minimum number of digits for the number
			 * @param number the number to format
			 * @return the number converted to a string and padded with zeros
			 * 
			 * @see ##_.formatValue() offers real formatting of numbers.
			 */
			'pad' : pad,
	
			/*$
			 * @id formatvalue
			 * @group FORMAT
			 * @requires date_constants
			 * @configurable default
			 * @name _.formatValue()
			 * @syntax _.formatValue(format, value)
			 * @module UTIL
			 * 
			 * Formats a single value as a string, using the given format template.  It has support for numbers, dates, booleans and strings.
			 * 
			 * <b>Choice Formatting</b><br/>
			 * With a choice format, you can map input values into output values. In the format string the choices are separated by pipes ('|')
			 * and each choice has the format <code>&ltcmp>&ltvalue>:&lt;result></code>:
			 * <ul><li>&lt;cmp> is a comparison operator ('=', '>', '&lt;', '>=', '&lt;='), but can be omitted to check for equality.</li>
			 * <li>&lt;value> is the value as string.</li>
			 * <li>&lt;result> is the result, either a string or a number format</li></ul>
			 * You can have a default choice at the end without &lt;cmp> or &lt;value>.
			 * 
			 * <b>Examples</b> 
			 * <pre>_.formatValue('true:is True|is False', value);
			 * _.formatValue('&lt;5:under 5|&gt;=15:at least 15|=7:is seven|some other number', value);
			 * _.formatValue('1:one item|2:two items|&gt;3:many items', value);
			 * _.formatValue('ERR:error|WARN:warning|INFO:info|debug', value);
			 * </pre>
			 *
			 * <b>Number Formatting</b><br/> 
			 * Number formatting allows you to specify the number of digits before and optionally after the decimal separator, the decimal separator itself
			 * as well as how to group and decorate the digits. The following characters are used in the format:
			 * 
			 * <table><tr><th>Character</th><th>Description</th></tr>
			 * <tr><td>#</td><td>Optional digit before decimal separator.</td></tr>
			 * <tr><td>0</td><td>Required digit before decimal separator (0 if number is smaller).</td></tr>
			 * <tr><td>.</td><td>Decimal separator (if it occurs exactly once in the string)</td></tr>
			 * <tr><td>:</td><td>Required for choice formats. You can not use this in a number format.</td></tr>
			 * <tr><td>|</td><td>Required for choice formats. You can not use this in a number format.</td></tr>
			 * </table>
			 * 
			 * All other characters will stay unmodified in the format string. For negative numbers, a sign (-) is placed in front of the
			 * first digit.
			 * 
			 * If you don't provide sufficient pre-decimal placeholders for the number, the remaining digits will be put in front of the
			 * rest of the number, so the rendered number is always complete. However, there will be no grouping if there are no placeholders.
			 * 
			 * If you only define a group separator, but not a decimal separator, and you use a comma (,) or period (.) as separator, 
			 * the group separator must appear at least twice in the format. Otherwise it will be considered a decimal separator. 
			 *
			 * <b>Examples</b> 
			 * <pre>var v1  = _.formatValue('#', 15);           // '15'
			 * var v2  = _.formatValue('####', 15);        // '15'
			 * var v3  = _.formatValue('0000', 15);        // '0015'
			 * var v4  = _.formatValue('#.###', 15.14274); // '15.143'
			 * var v5  = _.formatValue('#.000', 15.14274); // '15.143'
			 * var v6  = _.formatValue('#.###', 15.1);     // '15.1'
			 * var v7  = _.formatValue('#.000', 15.1);     // '15.100'
			 * var v8  = _.formatValue('000,000', 15.1);   // '015,100'
			 * var v9  = _.formatValue('#.###', 15);       // '15'
			 * var v10 = _.formatValue('#.000', 15);       // '15.000'
			 * var v11 = _.formatValue('#,###', 15.1);     // '15,1' (comma as decimal separator)
			 * var v10 = _.formatValue('Total= $#.00 (VAT included)', 71);  // 'Total= $71.00 (VAT included)' (decoration)
			 * var v12 = _.formatValue('###,###,###', 92548);    // '92,548' (grouped digits)
			 * var v14 = _.formatValue('###.###.###,###', 92548.42); // '92.548,42' (comma as decimal separator)
			 * var v14 = _.formatValue('### ### ###.###', 92548.42); // '92 548,42' (space as decimal separator)
			 * var v15 = _.formatValue('&lt;10:#.00|&lt;100:#.0|#', 7.356); // '7.36' (choice format)
			 * var v16 = _.formatValue('&lt;10:#.00|&lt;100:#.0|#', 25.04); // '25.0' 
			 * var v17 = _.formatValue('&lt;10:#.00|&lt;100:#.0|#', 71.51); // '72' 
			 * </pre>
			 * 
			 * <b>Choice Number Formatting</b><br/>
			 * It is possible to combine number formatting with choices. You can also use additional characters in a number format.
			 * 
			 * <b>Examples</b> 
			 * <pre>_.formatValue('$#.00', 17);  // '$17.00'
			 * _.formatValue('0:no eggs|1:1 egg|>1:# eggs', 12);  // '12 eggs'
			 * </pre>
			 *
			 * <b>Date Formatting</b><br/> 
			 * In a date format, there are a number of reserved characters that represent parts of the date. If you repeat the same character, you
			 * specify the minimum number of digits. Some elements allow a comma-separated list of translations in angular brackets, see below.
			 * <table>
			 * <tr><th>Character</th><th>Description</th></tr>
			 * <tr><td>y</td><td>Year (4 digits)</td></tr>
			 * <tr><td>Y</td><td>Year (2 digits)</td></tr>
			 * <tr><td>M</td><td>Month (1-12)</td></tr>
			 * <tr><td>n</td><td>Month as short name ('Jan', 'Feb'...). Supports translations.</td></tr>
			 * <tr><td>N</td><td>Month as long name ('January', 'February'...). Supports translations.</td></tr>
			 * <tr><td>d</td><td>Day of month (1-31)</td></tr>
			 * <tr><td>m</td><td>Minutes (0-59)</td></tr> 
			 * <tr><td>H</td><td>Hours in 24h format (0-23)</td></tr>
			 * <tr><td>h</td><td>Hours in 12h format (1-12)</td></tr> 
			 * <tr><td>K</td><td>Hours in 0-based 12h format (0-11)</td></tr>
			 * <tr><td>k</td><td>Hours in 1-based 24h format (1-24)</td></tr> 
			 * <tr><td>s</td><td>Seconds (0-59)</td></tr>
			 * <tr><td>S</td><td>Milliseconds (0-999)</td></tr>
			 * <tr><td>a</td><td>Either 'am' or 'pm'. Supports translations.</td></tr>
			 * <tr><td>w</td><td>Day of week as short name ('Sun', 'Mon'...). Supports translations.</td></tr>
			 * <tr><td>W</td><td>Day of week as long name ('Sunday', 'Monday'...). Supports translations.</td></tr>
			 * <tr><td>z</td><td>Timezone offset, e.g. '+0700'</td></tr>
			 * </table>
			 * <var>formatValue</var> also supports formatting a date in a different timezone. You only need to put the timezone in brackets at the front of
			 * the format, e.g. '[+0100]'.
			 *
			 * <b>Examples</b> 
			 * <pre>var now = new Date();
			 * var v1  = _.formatValue('y-M-d', now);       // e.g. '2013-7-9'
			 * var v2  = _.formatValue('yyyy-MM-dd', now);  // e.g. '2013-07-09'
			 * var v3  = _.formatValue('yyyy-MM-ddTHH:mm:ss.SS z', now); // e.g. '2013-07-09T23:07:38.472 +0700'
			 * var v4  = _.formatValue('MM/dd/YY h:mm:ss a', now);       // e.g. '07/09/13 11:07:38 pm'
			 * var v5  = _.formatValue('dd.MM.yyyy HH:mm:ss', now);      // e.g. '09.07.2013 23:07:38'
			 * var v6  = _.formatValue('H:mm', now);                // e.g. '23:07'
			 * var v7  = _.formatValue('W, N d y', now);            // e.g. 'Tuesday, July 9 2013'
			 * var v8  = _.formatValue('Nd', now);                  // e.g. 'July9'
			 * var v9  = _.formatValue('d.N[Januar,Februar,M&auml;rz,April,Mai,Juni,Juli,'+
			 *             'August,September,Oktober,November,Dezember]', now); // German translation: '9. Juli'
			 * var v10 = _.formatValue('[+0100]yyyy-MM-dd h:mm a', now);  // different timezone: '2013-07-09 5:07 pm' 
			 * </pre>
			 *
			 * @param format the format that describes the output
			 * @param value the value to format. Either a Date, a number, a string or a value that can be converted to a string.
			 * @return the string-formatted value
			 * 
			 * @see ##_.pad() will pad a number with zeros.
			 * @see ##_.parseDate() parses a date.
			 * @see ##_.parseNumber() parses a number.
			 * @see ##_.format() allows more complex formats.
			 */
			'formatValue': formatValue,
	
			/*$
			 * @id parsedate
			 * @group FORMAT
			 * @requires date_constants
			 * @configurable default
			 * @name _.parseDate()
			 * @syntax _.parseDate(format, dateString)
			 * @module UTIL
			 * 
			 * Parses the given string as Date using the given format. The format specifies which date component is expected where in the string.
			 * It can also be used to specify the timezone of the input string, and it may specify whether an empty string (including strings containing
			 * only whitespace) is allowed.
			 *
			 * In the date format there are a number of reserved characters that are used as placeholders of date components. If you put a single
			 * character in the format, this will match numbers of any length. If you have two or more of the same character, this is recognized as
			 * fixed-length string.<br/>
			 * Some placeholders, such as month names, support translations. To parse dates in other languages, you can specify a comma-separated
			 * list of translations in brackets following the placeholder.<br/>
			 * The following placeholder characters are supported.
			 * <table>
			 * <tr><th>Character</th><th>Description</th></tr>
			 * <tr><td>y</td><td>Year (4 digits)</td></tr>
			 * <tr><td>Y</td><td>Year (2 digits, 2000-based)</td></tr>
			 * <tr><td>M</td><td>Month (1-12)</td></tr>
			 * <tr><td>n</td><td>Month as short name ('Jan', 'Feb'...). Supports translations.</td></tr>
			 * <tr><td>N</td><td>Month as long name ('January', 'February'...). Supports translations.</td></tr>
			 * <tr><td>d</td><td>Day of month (1-31)</td></tr>
			 * <tr><td>m</td><td>Minutes (0-59)</td></tr> 
			 * <tr><td>H</td><td>Hours in 24h format (0-23)</td></tr>
			 * <tr><td>h</td><td>Hours in 12h format (1-12)</td></tr> 
			 * <tr><td>K</td><td>Hours in 0-based 12h format (0-11)</td></tr>
			 * <tr><td>k</td><td>Hours in 1-based 24h format (1-24)</td></tr> 
			 * <tr><td>s</td><td>Seconds (0-59)</td></tr>
			 * <tr><td>S</td><td>Milliseconds (0-999)</td></tr>
			 * <tr><td>a</td><td>Either 'am' or 'pm'. Supports translations.</td></tr>
			 * <tr><td>w</td><td>Day of week as short name ('Sun', 'Mon'...). Supports translations.</td></tr>
			 * <tr><td>W</td><td>Day of week as long name ('Sunday', 'Monday'...). Supports translations.</td></tr>
			 * <tr><td>z</td><td>Timezone offset, e.g. '+0700'</td></tr>
			 * </table>
			 * If you prefix the input string with a question mark ('?'), this means that the date is optional. If the input string is empty or consists
			 * solely of whitespace, <var>parseDate</var> will return null.<br/>
			 * <var>parseDate()</var> also supports parsing a date in a different timezone. You only need to put the timezone in brackets at the front of
			 * the format, e.g. '[+0100]'.<br/>
			 * 
			 * All other characters  are expected to be identical in format and input string, with the exception of whitespace. Each whitespace character 
			 * in the format can match any number of other whitespace characters in the input string, but at least one.
			 *
			 * Any components that are not in the format will be set to 0. For example, if your format has only date, month and day, the resulting 
			 * date will be at midnight.
			 *
			 * @example Parsing dates in various formats.
			 * <pre>
			 * var v1  = _.parseDate('y-M-d', '2013-7-9');
			 * var v2  = _.parseDate('?yyyyMMdd', '20130709');
			 * var v3  = _.parseDate('?yyyyMMdd', ' ');  // returns null
			 * var v4  = _.parseDate('yyyy-MM-ddTHH:mm:ss.SS z', '2013-07-09T23:07:38.472 +0700');
			 * var v5  = _.parseDate('MM/dd/YY h:mm:ss a', '07/09/13 11:07:38 pm');
			 * var v6  = _.parseDate('dd.MM.yyyy HH:mm:ss', '09.07.2013 23:07:38');
			 * var v7  = _.parseDate('W, N d y', 'Tuesday, July 9 2013');
			 * var v8  = _.parseDate('d.N[Januar,Februar,Maerz,April,Mai,Juni,Juli,'+
			 *             'August,September,Oktober,November,Dezember] y', '9. Juli 2013'); // parsing german
			 * var v9  = _.parseDate('[+0100]yyyy-MM-dd h:mm a', '2013-07-09 5:07 pm');  // different timezone:  
			 * </pre>
			 *
			 * @param format the format that describes the output
			 * @param dateString the string-formatted date to parse
			 * @return the Date; <var>undefined</var> if parsing failed; or <var>null</var> if the string was empty and 
			 *              the date format is flagged as optional ('?' at the beginning)
			 *              
			 * @see ##_.formatValue() can format dates using the same syntax.
			 */
			'parseDate': parseDate,
	
			/*$
			 * @id parsenumber
			 * @group FORMAT
			 * @requires 
			 * @configurable default
			 * @name _.parseNumber()
			 * @syntax _.parseNumber(format, numberString)
			 * @module UTIL
			 * 
			 * Parses the given string as number using the given format. <var>parseNumber</var> uses the same format as <var>formatValue</var>,
			 * but does not support choices. These are the allowed placeholders in the format:
			 * <table>
			 * <tr><th>Character</th><th>Description</th></tr>
			 * <tr><td>#</td><td>Optional digit before decimal separator.</td></tr>
			 * <tr><td>0</td><td>Required digit before decimal separator (0 if number is smaller).</td></tr>
			 * <tr><td>_</td><td>Optional digit after decimal separator.</td></tr>
			 * <tr><td>9</td><td>Required digit after decimal separator (0 if number is smaller).</td></tr>
			 * <tr><td>.</td><td>Either decimal separator or group separator, depending on position.</td></tr>
			 * <tr><td>,</td><td>Either decimal separator or group separator, depending on position.</td></tr>
			 * </table>
			 *
			 * The format string is mainly used to find out what the decimal separator is ('.' or ','). It defaults to '.'. 
			 *
			 * <var>parseNumber</var> will ignore any non-numeric characters at the beginning or end of the input string.
			 *
			 * If you prefix the input string with a question mark ('?'), this means that the number is optional. If the input string is empty or consists
			 * solely of whitespace, <var>parseNumber</var> will return null.
			 *
			 * If the input string is not valid and can not be parsed,  <var>parseNumber</var> will return <var>undefined</var>.
			 *
			 * @example Parsing numbers in various formats.
			 * <pre>
			 * _.parseNumber('00.99', '2.1');      // returns 2.1
			 * _.parseNumber('00.99', '');          // returns undefined
			 * _.parseNumber('?00.99', '2.1');    // optional number. Returns 2.1
			 * _.parseNumber('?00.99', '');        // returns null
			 * _.parseNumber('0.9', '=2.1 inch'); // returns 2.1 (non-numeric characters ignored)
			 * _.parseNumber('0,9', '2,1');         // comma as decimal separator
			 * _.parseNumber('0,9', '2.1');         // returns 21!! '.' is used as group separator
			 * _.parseNumber('0.9', '20');         // returns 20 (number of digits ignored)
			 * _.parseNumber('0.9', '147.789');  // returns 147.789  (number of digits ignored)
			 * </pre>
			 *
			 * @param format the format that describes the input number
			 * @param numberString the string-formatted number to parse
			 * @return the resulting number; <var>undefined</var> if parsing failed; or <var>null</var> if the string was empty and 
			 *              the number format is flagged as optional ('?' at the beginning)
			 *              
			 * @see ##_.formatValue() can format numbers using the same syntax.
			 */
			'parseNumber': parseNumber,
	
			/*$
			 * @id trim
			 * @group STRING
			 * @requires 
			 * @configurable default
			 * @name _.trim()
			 * @syntax _.trim(s)
			 * @module UTIL
			 * Removes whitespace from the beginning and end of the given string and returns the result.
			 * 
			 * @example Removing whitespace
			 * <pre>_.trim('abc'); // no change: returns 'abc'
			 * _.trim('  abc '); // returns 'abc'
			 * _.trim(' a b c '); // returns 'a b c' (only whitespace at beginning and end is removed)</pre>
			 *
			 * @param s the string to trim. If not a string, it will be converted using ##_.toString().
			 * @return the trimmed string
			 */
			'trim': trim,
	
			/*$
			 * @id isempty
			 * @group STRING
			 * @requires 
			 * @configurable default
			 * @name _.isEmpty()
			 * @syntax _.isEmpty(s)
			 * @syntax _.isEmpty(list)
			 * @syntax _.isEmpty(s, ignoreWhitespace)
			 * @module UTIL
			 * Returns true if the given string or list is <var>null</var>, <var>undefined</var> or empty (zero length).
			 * If the second argument is <var>true</var>, the function will ignore whitespace in the string.
			 * 
			 * @example Checking empty
			 * <pre>_.isEmpty('abc');  // returns false
			 * _.isEmpty('');   // returns true
			 * _.isEmpty(null); // returns true
			 * _.isEmpty(' '); // returns false
			 * _.isEmpty(' ', true); // returns true
			 * 
			 * _.isEmpty([1, 2]); // returns false
			 * _.isEmpty([]);     // returns true
			 * </pre>
			 *
			 * @param s the string to check. May be <var>null</var> or <var>undefined</var>.
			 * @param list the list to check. May be <var>null</var> or <var>undefined</var>.
			 * @param ignoreWhitespace if true and a string was given, <var>isEmpty</var> will also return true if the string contains only whitespace.
			 * @return true if empty, false otherwise
			 */
			'isEmpty': function(s, ignoreWhitespace) {
				return s == _null || !s.length || (ignoreWhitespace && /^\s*$/.test(s));
			},
	
			/*$
			 * @id escaperegexp
			 * @group STRING
			 * @requires 
			 * @configurable default
			 * @name _.escapeRegExp()
			 * @syntax _.escapeRegExp(s)
			 * @module UTIL
			 * Escapes all reserved characters for regular expressions by preceding them with a backslash. 
			 * 
			 * @example Creating regular expressions for words:
			 * <pre>function createWordRE(s) {
			 *     return new RegExp('\b' + _.escapeRegExp(s) + '\b');
			 * }</pre>
			 *
			 * @param s the string to escape
			 * @return the escaped string
			 * 
			 * @see _.format() can use <var>escapeRegExp</var> as escape function.
			 * @see _.template() can use <var>escapeRegExp</var> as escape function.
			 */
			'escapeRegExp': escapeRegExp,
	
			/*$
			 * @id escapehtml
			 * @group STRING
			 * @requires 
			 * @configurable default
			 * @name _.escapeHtml()
			 * @syntax _.escapeHtml(s)
			 * @module UTIL
			 * Escapes all reserved characters for HTML so the string can be used in text or as attribute value. The escaped characters are
			 * '&amp;', '&lt;', '>', ''' (single quote) and '"' (double quote), and they will be escaped using char codes (e.g. '&amp;#123;').
			 * 
			 * @example Creating a HTML title
			 * <pre>function createTitle(s) {
			 *     return '&lt;h1>' + _.escapeHtml(s) + '&lt;/h1>';
			 * }</pre>
			 *
			 * @param s the string to escape
			 * @return the escaped string
			 * 
			 * @see _.formatHtml() uses <var>escapeHtml</var> for escaping.
			 * @see _.format() can use <var>escapeHtml</var> as escape function.
			 * @see _.template() can use <var>escapeHtml</var> as escape function.
			 */
			'escapeHtml': escapeHtml,
	
			/*$ 
			 * @id format 
			 * @group FORMAT
			 * @requires template
			 * @configurable default 
			 * @name _.format() 
			 * @syntax _.format()
			 * @syntax _.format(template, object)
			 * @syntax _.format(template, object, escapeFunction)
					* @module UTIL
			 * Formats an object using a ##template#template##. The template syntax is shared with ##_.template(). The only difference is that
			 * <var>format()</var> frees you from the extra step of creating the template. In any case, whether you use 
			 * <var>format()</var> or ##_.template(), the template will be cached. Be careful when you create templates dynamically, as 
			 * every template is cached and consumes memory.<br/>
			 * If you only want to format a single value, use ##_.formatValue().
			 * 
			 * @example Format a name:
			 * <pre>var s = _.formatHtml("{{first}} {{last}}", {first: 'Tim', last: 'Taylor'});</pre>
			 * 
			 * @example Format a list of dates:
			 * <pre>var s = _.format("{{each}}{{this :: yyyy-MM-dd}}{{/each}}", dateList);</pre>
			 * 
			 * @param template The ##template#template## as a string. The template, once created, will be cached. 
			 * @param object the object to format 
			 * @param escapeFunction optional The callback <code>function(inputString)</code> that will be used
			 *        to escape all output:
			 * <dl><dt>inputString</dt><dd>The string to escape.</dd>
			 *     <dt class="returnValue">(callback return value)</dt><dd>The escaped string.</dd></dl>
			 *        If no escapeFunction has been given, the output will not be escaped.
			 *        ##_.escapeHtml() can be used as an escape function for HTML, and ##_.escapeRegExp() for regular expressions. 
			 *        JavaScript's built-in <var>escape()</var> function can escape URL components. 
			 *        See ##_.htmlFormat() for a version of <var>format()</var> that already includes HTML escaping.
			 * @return the string created by the template
			 * 
			 * @see ##_.template() creates a template function, using the same syntax. 
			 * @see ##_.formatHtml() is a variant of <var>format()</var> with HTML-escpaping built it.
			 * @see ##_.formatValue() formats a single number or date.
			 * @see ##_.escapeRegExp() can be used by <var>format()</var> to escape regular expressions. 
			 */ 
			'format': function(tpl, object, escapeFunction) {
				return template(tpl, escapeFunction)(object);
			},
	
			/*$ 
			 * @id template 
			 * @group FORMAT
			 * @requires date_constants
			 * @configurable default 
			 * @name _.template() 
			 * @syntax _.template(template)
			 * @syntax _.template(template, escapeFunction)
					* @module UTIL
			 * Parses a Handlebars-like template to create a reusable template function.
			 * 
			 * The syntax of the template uses a syntax that superficially looks like 
			 * <a href="http://handlebarsjs.com/">Handlebars</a>. Unlike Handlebars, it is based on raw JavaScript expressions and thus gives you
			 * complete freedom, but also offers you shortcuts for formatting, iteration and conditionals. 
			 * 
			 * Every template can receive exactly one object as input. If you need more than one value as input, put all required values
			 * into an object.
			 * 
			 * Use double curly braces to embed a JavaScript expression and insert its result:
			 * <pre>{{a}} plus {{b}} is {{a+b}}</pre>
			 * 
			 * To use such a template, create it with <var>template()</var> and then execute the resulting function:
			 * <pre>var myTemplate = _.template('{{a}} plus {{b}} is {{a+b}}');
			 * var result = myTemplate({a: 5, b: 7});</pre>
			 * If you pass an object as input, its properties will be mapped using JavaScript's <code>with</code>
			 * statement and are available as variables throughout the template.
			 * 
			 * If you have only a simple value to render, you can pass it directly and access it through the pre-defined
			 * variable <var>obj</var>:
			 * <pre>var myTemplate = _.template('The result is {{obj}}.');
			 * var result = myTemplate(17);</pre>	     
			 * Alternatively, you could also access the input as <var>this</var>, but be aware that JavaScript wraps simples types
			 * such as Number and Boolean. <var>this</var> is the default, so you can omit it to get the same result:
			 * <pre>var myTemplate = _.template('The result is {{ }}.');
			 * var result = myTemplate(17);</pre>
			 * 
			 * Minified templates can use ##_.formatValue() formats directly. Just separate them from the expression by
			 * a double-colon:
			 * <pre>The price is {{obj::#.00}}.</pre>	     
			 * 
			 * Conditions can be expressed using <code>if</code> and <code>else</code>:
			 * <pre>Hello {{if visits==0}}New{{else if visits&lt;10}}Returning{{else}}Regular{{/if}} Customer.</pre>
			 * You can use any JavaScript expression as condition.
			 * 
			 * Use <code>each</code> to iterate through a list:
			 * <pre>var myTemplate = _.template(
			 * 	   '{{each names}}{{this.firstName}} {{this.lastName}}{{/each}}');
			 * var result = myTemplate({names: [{firstName: 'Joe', lastName: 'Jones'}, 
			 *                                  {firstName: 'Marc', lastName: 'Meyer'}]});</pre>
			 * <code>each</code> will iterate through the members of the given object. It 
			 * calls its body for each item and put a reference to the item into <var>this</var>.
			 * Optionally, you can specify up to two variables to store the value in and
			 * the zero-based index of the current item:
			 * <pre>var myTemplate = _.template(
			 * 	   '{{each value, index: names}}{{index}}. {{value.firstName}} {{value.lastName}}{{/each}}');
			 * </pre>
			 *
			 * If you do not pass an expression to <code>each</code>, it will take the list from <var>this</var>:
			 * <pre>var myTemplate = _.template('{{each value:}}{{value}};{{/each}}');
			 * var result = myTemplate([1, 2, 3]);</pre>
			 *  
			 * Beside lists, you can also iterate through the properties of an object. The property name will be stored
			 * in the first given parameter and the value in <var>this</var> and the second parameter:
			 * <pre>var myTemplate = _.template('{{each key, value: nicknames}}{{key}}: {{value}}{{/each}}');
			 * var result = myTemplate({nicknames: {Matt: 'Matthew', John: 'Jonathan'} });</pre>
			 * 
			 * Shorter version of the previous example that uses <var>this</var> for the value:
			 * <pre>var myTemplate = _.template('{{each key: nicknames}}{{key}}: {{this}}{{/each}}');</pre>
			 * 
			 * If you do not need the key, you can omit the variable specification:
			 * <pre>var myTemplate = _.template('{{each nicknames}}{{this}}{{/each}}');</pre>
			 *
			 * You can define your own variables, using the regular JavaScript syntax, with 'var':
			 * <pre>var myTemplate = _.template('{{var s=very.long.name, sum=a+b;}}{{s.desc}}, {{sum}}');</pre>
			 *
			 * In some situations, it may be inevitable to embed raw JavaScript in the template. 
			 * To embed JavaScript code, prefix the code with a '#':
			 * <pre>var myTemplate = _.template(
			 *     '{{each}}{{#var sum = 0; for (var i = 0; i &lt; 3; i++) sum += this.numbers[i]; }}{{sum}}{{/each}}');
			 * var result = myTemplate([['Foreword', 'Intro'], ['Something', 'Something else']]);</pre>
			 * 
			 * 
			 * By default, all output will be escaped. You can prevent this by using triple-curly-braces:
			 * <pre>Here's the original: {{{rawText}}}</pre>.
			 * 
			 * The template's JavaScript code is executed in a sandbox without access to global variables. Minified defines the
			 * following variables for you:
			 * <table>
			 * <tr><th>Name</th><th>Desciption</th></tr>
			 * <tr><td>this</td><td>The template object outside of <code>each</code>. Inside <code>each</code>s, the current value.</td></tr>
			 * <tr><td>obj</td><td>The parameter given to the template function.</td></tr>
			 * <tr><td>_</td><td>A reference to Minified Util.</td></tr>
			 * <tr><td>esc</td><td>The escape function given when the template has been defined. If no function has been given,
			 *                     a default function that returns the input unmodified.</td></tr>
			 * <tr><td>print</td><td>A <code>function(text,...)</code> that appends one or more strings to the template result.</td></tr>
			 * <tr><td>each</td><td>A <code>function(listOrObject, eachCallback)</code> that can iterate over lists or object properties.
			 * The <var>eachCallback</var> is a <code>function(key, value)</code> for objects or <code>function(value, index)</code>
			 * for arrays that will be invoked for each item.
			 * </table> 
			 * 
			 * Every template you create is already cached, so it not an expensive operation to call ##_.template() a second
			 * time with the same template. However, because of caching, you should be careful when creating templates
			 * dynamically, as this will fill the cache up quickly.
			 * 
			 * @param template The template as a string using the syntax described below. 
			 * @param escapeFunction optional The callback <code>function(inputString)</code> that will be used
			 *        to escape all output:
			 * <dl><dt>inputString</dt><dd>The string to escape.</dd>
			 *     <dt class="returnValue">(callback return value)</dt><dd>The escaped string.</dd></dl>
			 *        If no escapeFunction has been given, the output will not be escaped.
			 *        ##_.escapeHtml() can be used as an escape function for HTML, and ##_.escapeRegExp() for regular expressions. 
			 *        JavaScript's built-in <var>escape()</var> function can escape URL components. 
			 * @return the value returned by the last invocation of <var>func</var>
			 * 
			 * @see ##_.format() shares <var>template()</var>'s syntax but returns the result directly.
			 * @see ##_.formatHtml() is a variant of <var>format()</var> with HTML escaping.
			 * @see ##_.escapeHtml() can be used by <var>template()</var> to escape HTML. 
			 * @see ##_.escapeRegExp() can be used by <var>template()</var> to escape regular expressions. 
			 * @see ##HTML() creates a HTML element tree from a template.
			 */ 
			'template': template,
	
			/*$ 
			 * @id formathtml 
			 * @group FORMAT
			 * @requires template
			 * @configurable default 
			 * @name _.formatHtml() 
			 * @syntax _.formatHtml()
			 * @syntax _.formatHtml(template, object)
					* @module UTIL
			 * Formats an object using a ##template#template## with HTML escaping for the output. 
			 * The template syntax is shared with ##_.template(). Output in double curly braces is automatically escaped using ##_.escapeHtml(). 
			 * <var>formatHtml()</var> just creates a new template with HTML escaping and invokes it immediately.
			 * The template will be cached. Be careful when you create templates dynamically, as 
			 * every template is cached and consumes memory.<br/>
			 * If you only want to format a single value, use ##_.formatValue().
			 * 
			 * @example Format a name:
			 * <pre>var s = _.formatHtml("{{first}} {{last}}", {first: 'Tim', last: 'Taylor'});</pre>
			 * 
			 * @example Format a list of dates:
			 * <pre>var s = _.formatHtml("{{each}}{{::yyyy-MM-dd}}{{/each}}", dateList);</pre>
			 * 
			 * @param template The ##template#template## as a string. The template, once created, will be cached.
			 * @param object the object to format 
			 * @return the string created by the template
			 *
			 * @see ##ht() works uses <var>formatHtml</var> to set element's innerHTML. 
			 * @see ##HTML() create HTML nodes using <var>formatHtml</var>. 
			 * @see ##_.template() creates a template function, using the same syntax. 
			 * @see ##_.format() allows you to specify alternative escape mechanisms.
			 */ 
			 'formatHtml': formatHtml
			/*$
			 * @stop
			 */
	
			// @cond !format dummyFormatHtml:0
			,
	
		///#/snippet utilUnderscoreFuncs
			///#snippet extrasUnderscoreFuncs
			// @condblock promise
			'promise': promise
			// @condend promise
	
			/*$
			 * @stop
			 */
			// @cond !promise dummyPromise:0
	
			///#/snippet extrasUnderscoreFuncs
		}, _);
	
		////INITIALIZATION ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
		///#snippet webInit
		/*$
		 * @id ready_init
		 * @dependency
		 */
			document.addEventListener("DOMContentLoaded", function() {
				callList(DOMREADY_HANDLER);
				DOMREADY_HANDLER = _null;
			}, false);
		/*$
		 @stop
		 */
	
	
		///#/snippet webInit
	
		return {
		///#snippet extrasExports
	
			/*$
			 * @id html
			 * @group ELEMENT
			 * @requires template ht
			 * @configurable default
			 * @name HTML()
			 * @syntax HTML(templateString, object...)
			 * @syntax HTML(templateFunction, object...)
			 * @syntax HTML(idSelector, object...)
			 * @module WEB
			 * Creates a ##list#list## of HTML nodes from the given HTML template. The list is compatible with ##add(), ##fill() and related methods.
			 * The template uses the ##template() syntax with ##escapeHtml() escaping for values.
			 * 
			 * Please note that the function <var>HTML</var> will not be automatically exported by Minified. You should always import it
			 * using the recommended import statement:
			 * <pre>
			 * var MINI = require('minified'), $ = MINI.$, $$ = MINI.$$, EE = MINI.EE, <strong>HTML = MINI.HTML</strong>;
			 * </pre>
			 * 
			 * @example Creating a HTML element showing a number:
			 * <pre>
			 * &lt;div id="price">-&lt;/div>
			 * </pre> 
			 * Then the price can be set like this:
			 * <pre>
			 * var price = 14.9;
			 * $('#price').fill(HTML('&lt;b>${{::0.99}}&lt;/b>', price));
			 * </pre>
			 * Results in:
			 * <pre>
			 * &lt;div id="price">&lt;b>$14.90&lt;/b>&lt;/div>
			 * </pre> 
			 *
			 * @example Adding elements to an existing list:
			 * <pre>
			 * var names = [ {first: 'James', last: 'Sullivan'}, 
			 *               {first: 'Michael', last: 'Wazowski'} ];
			 * $('#list').add(HTML('{{each}}&lt;li>{{this.first}} {{this.last}}&lt;/li>{{/each}}', names);
			 * </pre>
			 * The code adds this to #list:
			 * <pre>
			 * &lt;li>James Sullivan&lt;li>&lt;li>Michael Wazowski&lt;/li>
			 * </pre> 
			 * 
			 * @example You can store templates in &lt;script&gt; tags. First you need to create a &lt;script&gt; tag with a type not
			 *          supported by the browser and put your template in there, like this:
			 * <pre>&lt;script id="myTimeTpl" type="minified-template"&gt;The time is {{HH:mm:ss}}.&lt;/script&gt;</pre>
			 * Then you can specify the tag's id directly to access it:
			 * <pre>$('#timeDisplay').fill(HTML('#myTimeTpl', new Date()));</pre>
			 *
			 * @param templateString the template using ##template() syntax. Please note, because this is a template, you should
			 *                     avoid creating the template itself dynamically, as compiling templates is expensive and
			 *                     Minified will cache only a limited number of templates. Exception: If the template string does not use
			 *                     any template functionality (no {{}}), it does not need to be compiled and won't be cached.
			 *                     The template will use ##escapeHtml() as escape function, so all template substitutions will be HTML-escaped,
			 *                     unless you use triple curly-braces.
			 * @param templateFunction instead of a HTML template <var>HTML()</var> also accepts a template function, e.g. one
			 *                         created by ##template(). It will be invoked with the object as only argument.
			 * @param idSelector if you pass an ID CSS selector in the form "#myScript", Minified will recognize this and use the content 
			 *                   of the specified &lt;script> element as template. This allows you to put your template into 
			 *                   a &lt;script&gt; tag with a non-JavaScript type (see example). Any string that starts with '#' and does not
			 *                   contain any spaces is used as selector.
			 * @param object optional one or more objects to pass to the template. If object is not set, the template is called with <var>undefined</var>
			 *                        as object. If exactly one object is given, it is passed directly to the template. If you specify more than one 
			 *                        object, they are ##merge#merged##.
			 * @return the list containing the new HTML nodes
			 *  
			 * @see ##ht() is a shortcut for <code>fill(HTML())</code>.
			 * @see ##EE() is a different way of creating HTML nodes.
			 */
			'HTML': function () {
				var div = EE('div');
					return  _(call(div['ht'], div, arguments)[0].childNodes);
			},
			/*$
			 * @stop
			 */
	
			///#/snippet extrasExports
			///#snippet utilExports
			/*$
			 * @id underscore
			 * @group LIST
			 * @name _()
			 * @syntax _(item...)
			 * @configurable default
			 * @module UTIL
			 * Creates a new Minified list. Supports variable arguments so you can add items directly to the list. For arguments that are lists 
			 * (as defined by ##_.isList()), the list content will be added to the new list. Unlike #dollar#$()#, this is not done recursively
			 * and thus you can create a list of lists by wrapping arguments in a list. Another difference between <var>_()</var> and <var>$()</var>
			 * is that <var>$()</var> will automatically remove <var>null</var> values while <var>_()</var> will keep them.
			 * 
			 * @example Creating an empty list:
			 * <pre>_()</pre>
			 * 
			 * @example Creating a list with three items:
			 * <pre>_(1, 2, 3)</pre>
			 * 
			 * @example Creating the same list, but by passing an array. One array level will be flattened:
			 * <pre>_([1, 2, 3])</pre>
			 * 
			 * @example Creating a list containing the arrays [1, 2] and [3, 4].
			 * <pre>_([[1, 2], [3, 4]])</pre>
			 * 
			 * @example Merging two lists:
			 * <pre>var a = _("a", "b", "c");
			 * var b = _("x", "y", "z");
			 * var merged = _(a, b);    // contains _("a", "b", "c", "x", "y", "z")
			 * </pre>
			 * 
			 * @example Adding two elements to a list:
			 * <pre>var a = _(1, 2, 3);
			 * var a4 = _(a, 4);       // contains _(1, 2, 3, 4)
			 * </pre>
			 * 
			 * @example Mixing different list types and single elements:
			 * <pre>_(1, [], [2, 3], _(), _(4, 5)); // same content as _(1, 2, 3, 4, 5)</pre>
			 * 
			 * @param item an item to add to the new list. If it is a list (as defined by ##_.isList()), its content will be to the new
			 *        ##Minified list#list## (but NOT recursively).
			 */
			'_': _,
			/*$
			 * @stop 
			 */
			///#/snippet utilExports
		///#snippet webExports
	
			/*$
			 * @id dollar
			 * @group SELECTORS
			 * @requires  
			 * @dependency yes
			 * @name $()
			 * @syntax $()
			 * @syntax $(selector)
			 * @syntax $(selector, context)
			 * @syntax $(selector, context, childOnly)
			 * @syntax $(list)
			 * @syntax $(list, context)
			 * @syntax $(list, context, childOnly)
			 * @syntax $(object)
			 * @syntax $(object, context)
			 * @syntax $(object, context, childOnly)
			 * @syntax $(domreadyFunction)
				* @module WEB
			 * Creates a new ##list#Minified list##, or register a DOMReady-handler. 
			 * The most common usage is with a CSS-like selector. <var>$()</var> will then create a list containing all elements of the current HTML
			 * document that fulfill the filter conditions. Alternatively you can also specify a list of objects or a single object. 
			 * Nested lists will automatically be flattened, and nulls will automatically be removed from the resulting list.
			 * If you call <var>$()</var> without any arguments, it will return an empty list.
			 * 
			 * Additionally, you can specify a second argument to provide a context. Contexts only make sense if you selected 
			 * HTML nodes with the first parameter. Then the context limits the resulting list to include only those nodes 
			 * that are descendants of the context nodes. The context can be either a selector, a list or a single HTML node, and will be 
			 * processed like the first argument. A third arguments allows you to limit the list to 
			 * only those elements that are direct children of the context nodes (so a child of a child would be filtered out).
			 *
			 * The lists created by <var>$()</var> are the same type as the ##list#Minified lists## created by Util's #underscore#_() constructor and other
			 * Util methods. All Util methods work on lists created by <var>$()</var>. If you want to add your own methods to those lists,
			 * use ##M#MINI.M##.
			 * 
			 * As a special shortcut, if you pass a function to <var>$()</var>, it will be registered using #ready#$.ready() to be executed 
			 * when the DOM model is complete.
			 *
			 * @example A simple selector to find an element by id.
			 * <pre>
			 * var l0 = $('#myElementId');
			 * </pre>
			 * 	 
			 * @example You can pass an object reference to create a list containing only this element:
			 * <pre>
			 * var l1 = $(document.getElementById('myElementId')); 
			 * </pre>
			 *
			 * @example Lists and arrays will be copied:
			 * <pre>
			 * var l2 = $([elementA, elementB, elementC]); 
			 * </pre>
			 * 	 
			 * @example Lists will be automatically flattened and nulls removed. So this list <var>l3</var> has the same content as <var>l2</var>:
			 * <pre>
			 * var l3 = $([elementA, [elementB, null, elementC], null]); 
			 * </pre>
			 * 	 
			 * @example This is a simple selector to find all elements with the given class.
			 * <pre>
			 * var l4 = $('.myClass');
			 * </pre>
			 * 	 
			 * @example A selector to find all elements of the given type.
			 * <pre>
			 * var l5 = $('input'); // finds all input elements
			 * </pre>
			 * 	 
			 * @example A selector to find all elements with the given type and class.
			 * <pre>
			 * var l6 = $('input.myRadio'); // finds all input elements with class 'myRadio'
			 * </pre>
			 * 	 
			 * @example A selector to find all elements that are descendants of the given element.
			 * <pre>
			 * var l7 = $('#myForm input'); // finds all input elements contained in the element myForm
			 * </pre>
			 * 	 
			 * @example A selector to find all elements that have either a CSS class 'a' or class 'b':
			 * <pre>
			 * var l8 = $('.a, .b'); // finds all elements that have class a or class b
			 * </pre>
			 * 	 
			 * @example A selector that finds all elements that are descendants of the element myDivision, are inside an element with the
			 * class .myForm and are input elements:
			 * <pre>
			 * var l9 = $('#myDivision .myForm input'); 
			 * </pre>
			 * 	 
			 * @example Contexts can make it easier to specify ancestors:
			 * <pre>
			 * var l10 = $('.myRadio', '#formA, #formB, #formC'); 
			 * </pre>
			 * The result is identical to:
			 * <pre>
			 * var l10 = $('#formA .myRadio, #formB .myRadio, #formC .myRadio'); 
			 * </pre>
			 * 
			 * @example Using one of the list functions, ##set(), on the list, and setting the element's text color. '$' at the beginning of the property name sets a CSS value.
			 * <pre>
			 * $('#myElementId').set('$color', 'red');
			 * </pre>
			 *
			 * @example Most list methods return the list you invoked them on, allowing you to chain them:
			 * <pre>
			 * $('#myForm .myRadio').addClass('uncheckedRadio')
			 *                      .set('checked', true)
			 *                      .on('click', function() {
			 *                             $(this).set({@: 'uncheckedRadio');
			 *                      });
			 * </pre>
			 * 
			 * @example Using $() as a #ready#$.ready() shortcut:
			 * <pre>
			 * $(function() {
			 *   // in here you can safely work with the HTML document
			 * });
			 * </pre>
			 * 
			 * @param selector a simple, CSS-like selector for HTML elements. It supports '#id' (lookup by id), '.class' (lookup by class),
			 *             'element' (lookup by elements) and 'element.class' (combined class and element). Use commas to combine several selectors.
			 *             You can also join two or more selectors by space to find elements which are descendants of the previous selectors.
			 *             For example, use 'div' to find all div elements, '.header' to find all elements containing a class name called 'header', and
			 *             'a.popup' for all a elements with the class 'popup'. To find all elements with 'header' or 'footer' class names, 
			 *             write '.header, .footer'. To find all divs elements below the element with the id 'main', use '#main div'.
			 *             The selector "*" will return all elements.
			 * @param list a list to copy. It can be an array, another Minified list, a DOM nodelist or anything else that has a <var>length</var> property and
			 *             allows read access by index. A shallow copy of the list will be returned. Nulls will be automatically removed from the copy. Nested lists 
			 *             will be flattened, so the result only contains nodes.
			 * @param object an object to create a single-element list containing only the object. If the argument is null, an empty list will be returned.
			 * @param domreadyFunction a function to be registered using #ready#$.ready().
			 * @param context optional an optional selector, node or list of nodes which specifies one or more common ancestor nodes for the selection. The context can be specified as
			 *             a selector, a list or using a single object, just like the first argument.
			 *             The returned list will contain only descendants of the context nodes. All others will be filtered out. 
			 * @param childOnly optional if set, only direct children of the context nodes are included in the list. Children of children will be filtered out. If omitted or not 
			 *             true, all descendants of the context will be included. 
			 * @return the array-like ##list#Minified list## object containing the content specified by the selector. 
			 *             Please note that if the first argument was a list, the existing order will be kept. If the first argument was a simple selector, the nodes are in document order. 
			 *             If you combined several selectors using commas, only the individual results of the selectors will keep the document order, 
			 *             but will then be joined to form a single list. This list will
			 *             not be in document order anymore, unless you use a build without legacy IE support.
			 *             Duplicate nodes will be removed from selectors, but not from lists.
			 *             
			 * @see #underscore#_() is Util's alternative constructor for ##list#Minified lists##
			 * @see ##dollardollar#$$()## works like <var>$()</var>, but returns the resulting list's first element.
			 */
			'$': $,
	
			/*$
			 * @id dollardollar
			 * @group SELECTORS
			 * @requires 
			 * @configurable default
			 * @name $$()
			 * @syntax $(selector)
			 * @syntax $(selector, context)
			 * @syntax $(selector, context, childOnly)
			 * @shortcut $$() - It is recommended that you assign MINI.$$ to a variable $$.
				* @module WEB
			 * Returns a DOM object containing the first match of the given selector, or <var>undefined</var> if no match was found. 
			 * <var>$$</var> allows you to easily access an element directly. It is the equivalent to writing <code>$(selector)[0]</code>.
			 *
			 * Please note that the function <var>$$</var> will not be automatically exported by Minified. You should always import it
			 * using the recommended import statement:
			 * <pre>
			 * var MINI = require('minified'), $ = MINI.$, $$ = MINI.$$, EE = MINI.EE;
			 * </pre>
			 * 
			 * @example Select the checkbox 'myCheckbox':
			 * <pre>
			 * $$('#myCheckbox').checked = true;
			 * </pre>
			 * 
			 * @param selector a simple, CSS-like selector for the element. Uses the same syntax as #dollar#$(). The most common
			 *                 parameter for this function is the id selector with the syntax "#id".
			 * @param context optional an optional selector, node or list of nodes which specifies one or more common ancestor nodes for the selection. The context can be specified as
			 *             a selector, a list or using a single object, just like the first argument.
			 *             The returned list will contain only descendants of the context nodes. All others will be filtered out. 
			 * @param childOnly optional if set, only direct children of the context nodes are included in the list. Children of children will be filtered out. If omitted or not 
			 *             true, all descendants of the context will be included. 
			 * @return a DOM object of the first match, or <var>undefined</var> if the selector did not return at least one match
			 * 
			 * @see ##dollar#$()## creates a list using the selector, instead of returning only the first result.
			 */
			'$$': $$,
	
			/*$
			 * @id ee
			 * @group ELEMENT
			 * @requires dollar set add
			 * @configurable default
			 * @name EE()
			 * @syntax EE(elementName)
			 * @syntax EE(elementName, properties)
			 * @syntax EE(elementName, children)
			 * @syntax EE(elementName, properties, children)
			 * @shortcut EE() - It is recommended that you assign MINI.EE to a variable EE.
				* @module WEB
			 * Creates a new HTML Element, wrapped in a  ##list#Minified list##, optionally with attributes and children.
			 * Typically it will be used to insert elements into the DOM tree using ##add() or a similar function. 
			 *
			 * Please note that the function <var>EE</var> will not be automatically exported by Minified. You should always import it
			 * using the recommended import statement:
			 * <pre>
			 * var MINI = require('minified'), $ = MINI.$, $$ = MINI.$$, EE = MINI.EE;
			 * </pre>
			 * 
			 * @example Creating a simple &lt;span> element with some text:
			 * <pre>
			 * var mySpan = EE('span', 'Hello World'); 
			 * </pre>
			 * This is the result:
			 * <pre>
			 *  &lt;span>Hello World&lt;/span> 
			 * </pre>
			 * 
			 * @example Adding the '&lt;span>Hello World; &lt;span> element to all elements with the class '.greeting':
			 * <pre>
			 * $('.greeting').add(EE('span', 'Hello World')); 
			 * 
			 * @example Creating a &lt;span> element with style and some text:
			 * <pre>
			 * var span2 = EE('span', {'@title': 'Greetings'}, 'Hello World'); 
			 * </pre>
			 * The last line creates this:
			 * <pre>
			 *  &lt;span title="Greetings">Hello World&lt;/span> 
			 * </pre>
			 * 
			 * @example Creating a &lt;form> element with two text fields, labels and a submit button:
			 * <pre>var myForm = EE('form', {'@method': 'post'}, [
			 *     EE('label', {'@for': 'nameInput'}, 'Name:'),
			 *     EE('input', {'@id': 'nameInput', '@type': 'input'}),
			 *     EE('br'),
			 *     EE('label', {'@for': 'ageInput'}, 'Age:'),
			 *     EE('input', {'@id': 'ageInput', '@type': 'input'}),
			 *     EE('br'),
			 *     EE('input', {'@type': 'submit, '@value': 'Join'})
			 * ]); 
			 * </pre>
			 * results in (newlines and indentation added for readability):
			 * <pre>
			 * 	&lt;form method="post>
			 *     &lt;label for="nameInput">Name:&lt;/label>
			 *     &lt;input id="nameInput" type="input"/>
			 *     &lt;br/>
			 *     &lt;label for="ageInput"/>Age:&lt;/label>
			 *     &lt;input id="ageInput" type="input"/>
			 *     &lt;br/>
			 *     &lt;input value="Join" type="submit"/>
			 *  &lt;/form>
			 * </pre>
			 * 
			 * @example If you only want to add an attribute under a certain condition, 
			 * a simple trick is to pass null as value if you do not need it:
			 * <pre>
			 * var myInput = EE('input', {
			 * 				'@id': 'myCheckbox', 
			 * 				'@type': 'checkbox', 
			 * 				'@checked': shouldBeChecked() ? 'checked' : null
			 * 			});
			 * </pre>
			 * 
			 * @example You can set styles directly using a $ prefix for the name:
			 * <pre>
			 * var myStylesSpan = EE('span', {$color: "red", $fontWeight: "bold"}, "I'm styled");
			 * </pre>
			 * 
			 * @example ##on() makes it very easy to attach event handlers to the new elements directly after creating them:
			 * <pre>
			 * $('#target').add(EE('input', {'@name': "myInput"}).on('change', inputChanged));
			 * });
			 * </pre>
			 * 
			 * @param elementName the element name to create (e.g. 'div')
			 * @param properties optional an object which contains a map of attributes and other values. Uses the ##set() syntax: 
			 * 					 Attribute values are prefixed with '@', data attributes with '%', CSS styles with '$' and 
			 *                   regular properties can be set without prefix.
			 *                   If the attribute value is null, the attribute will omitted (styles and properties can be set to null). 
			 *                   In order to stay compatible with Internet Explorer 7 and earlier, you should not set the 
			 *                   attributes '@class' and '@style'. Instead set the property 'className' instead of '@class' and set 
			 *                   styles using the '$' syntax.
			 * @param children optional  a node or a list of nodes to be added as children. Strings will be converted to text nodes. 
			 *                         Functions will be invoked and their return value will be used. Lists can be 
			 *                         nested and will then automatically be flattened. Null elements in lists will be ignored. 
			 *                         The syntax is exactly like ##add().
			 * @return the HTML Element wrapped in a Minified list
			 */
			'EE': EE,
	
			/*$
			 * @id M
			 * @name M
			 * @syntax MINI.M
				* @module WEB, UTIL
			 * 
			 * Exposes the internal class used by all  ##list#Minified lists##. This is mainly intended to allow you adding your
			 * own functions.
			 * 
			 * @example Adding a function printLength() to <var>M</var>:
			 * <pre>
			 * MINI.M.prototype.printLength = function() { console.log(this.length); };
			 * </pre>
			 */
			'M': M,
	
			/*$
			 * @id getter
			 * @requires get
			 * @name MINI.getter
			 * @syntax MINI.getter
			 * @module WEB
			 * 
			 * Exposes a map of prefix handlers used by ##get(). You can add support for a new prefix in <var>get()</var>
			 * by adding a function to this map. The prefix can be any string consisting solely of non-alphanumeric characters
			 * that's not already used by Minified. 
			 * 
			 * You must not replace <var>getters</var> by a new map, but must always modify the existing map.
			 * 
			 * The function's signature is <code>function(list, name)</code> where
			 * <dl><dt>list</dt><dd>Is the Minified list to get the value from. By convention you should always use only the first element. The list is
			 *                      non-empty and the first elememt can't be null or undefined (get() automatically returns <var>undefined</var> in 
			 *                      all other case).</dd>
			 *     <dt>name</dt><dd>The name of the property. That's the part AFTER the prefix.</dd>
			 *     <dt class="returnValue">(callback return value)</dt><dd>The value to return to the user.</dd></dl>
			 * 
			 * @example Adding a shortcut '||' for accessing border style properties:
			 * <pre>
			 * MINI.getter['||'] = function(list, name) {
			 * 	return list.get('$border' + name.replace(/^[a-z]/, function(a) { return a.toUpperCase()});
			 * };
			 * 
			 * var borderColor = $('#box').get('||color'); // same as '$borderColor'
			 * var borderLeftRadius = $('#box').get('||leftRadius'); // same as '$borderLeftRadius'
			 * </pre>
			 *
			 * @example Adding XLink attribute support to get(). This is useful if you work with SVG. The prefix is '>'.
			 * <pre>
			 * MINI.getter['>'] = function(list, name) {
			 * 	return list[0].getAttributeNS('http://www.w3.org/1999/xlink', name);
			 * };
			 * 
			 * var xlinkHref = $('#svgLink').get('>href');
			 * </pre>
			 */
			'getter': getter,
	
			/*$
			 * @id setter
			 * @requires set
			 * @name MINI.setter
			 * @syntax MINI.setter
			 * @module WEB
			 * 
			 * Exposes a map of prefix handlers used by ##set(). You can add support for a new prefix in <var>set()</var>
			 * by adding a function to this map. The prefix can be any string consisting solely of non-alphanumeric characters
			 * that's not already used by Minified. 
			 * 
			 * You must not replace <var>setters</var> by a new map, but must always modify the existing map.
			 * 
			 * The function's signature is <code>function(list, name, value)</code> where
			 * <dl><dt>list</dt><dd>Is the Minified list to use.</dd>
			 *     <dt>name</dt><dd>The name of the property. That's the part AFTER the prefix.</dd>
			 *     <dt>value</dt><dd>Either the value to set, or a callback function to create the value that you must call for each
			 *     value (see ##set() ).</dd>
			 *     </dl>
			 *
			 * If you provide complete ##get() and ##set() support for a prefix, you are also able to use it in other Minified
			 * function such as ##animate() and ##toggle().
			 * 
			 * @example Adding a shortcut '||' for accessing border style properties. As it's just calling ##set() for an existing
			 * property, it is not required to extra code for the callback.
			 * <pre>
			 * MINI.setter['||'] = function(list, name, value) {
			 * 	list.set('$border' + name.replace(/^[a-z]/, function(a) { return a.toUpperCase()}, value);
			 * };
			 * 
			 * $('#box').set('||color', 'red');   // same as set('$borderColor', 'red')
			 * $('#box').set('||leftRadius', 4);  // same as set('$borderLeftRadius', 4)
			 * </pre>
			 *
			 * @example Adding XLink attribute support to set(). This is useful if you work with SVG. The prefix is '>'.
			 * <pre>
			 * MINI.setter['>'] = function(list, name, value) {
			 * 	list.each(function(obj, index) {
			 * 		var v;
			 * 		if (_.isFunction(value))
			 * 			v = value(obj.getAttributeNS('http://www.w3.org/1999/xlink', name), index, obj);
			 * 		else 
			 * 			v = value;
			 *		
			 *		if (v == null)
			 *			obj.removeAttributeNS('http://www.w3.org/1999/xlink', name);
			 *		else
			 *			obj.setAttributeNS('http://www.w3.org/1999/xlink', name, v);
			 *	});
			 * };
			 * 
			 * $('#svgLink').set('>href', 'http://minifiedjs.com/');
			 * </pre>
			 */
			'setter': setter
			/*$
			 * @stop 
			 */
			///#/snippet webExports
		};
	
	///#snippet commonAmdEnd
	});
	///#/snippet commonAmdEnd
	///#snippet  webDocs
	
	/*$
	 * @id list
	 * @name Minified Lists
	 * @module WEB, UTIL
	 * 
	 * <i>Minified lists</i> are Array-like objects provided by Minified. Like a regular JavaScript array, 
	 * they provide a <var>length</var> property and you can access their content using the index operator (<code>a[5]</code>). 
	 * However, they do not provide the same methods as JavaScript's native array and are designed to be immutable, so
	 * there is no direct way to add something to a Minified list. Instead Minified provides a number of functions and methods
	 * that take a list and create a modified copy which, for example, may contain additional elements.
	 *
	 * Minified lists are typically created either using the Web module's #dollar#$()</a></code> function or with the Util module's
	 * #underscore#_()</a></code> function, but many functions in the Util module also return a Minified list.
	 * 
	 * The Util module provides a function ##_.array() that converts a Minified list to a regular JavaScript array.
	 */
	
	/*$
	 * @id promiseClass
	 * @name Promise
	 * @module WEB, UTIL
	 * 
	 * <i>Promises</i> are objects that represent the future result of an asynchronous operation. When you start such an operation, using #request#$.request(),
	 * ##animate(), or ##wait(), you will get a Promise object that allows you to get the result as soon as the operation is finished.
	 * 
	 * Minified's full distribution ships with a <a href="http://promises-aplus.github.io/promises-spec/">Promises/A+</a>-compliant implementation of Promises that should
	 * be able to interoperate with most other Promises implementations. Minified's Web module in stand-alone distribution comes with a limited implementation.
	 * See below for details.
	 * 
	 * What may be somewhat surprising about this Promises specification is that the only standard-compliant way to access the result is to 
	 * register callbacks. They will be invoked as soon as the operation is finished. 
	 * If the operation already ended when you register the callbacks, the callback will then just be called from the event loop as soon
	 * as possible (but never while the ##then() you register them with is still running).<br/>
	 * This design forces you to handle the operation result asynchronously and disencourages 'bad' techniques such as polling.
	 * 
	 * The central method of a Promise, and indeed the only required function in Promises/A+, is ##then(). It allows you to register
	 * two callback methods, one for success (called 'fulfillment' in Promises/A+ terminology) and one for failures (called 'rejection' in Promises/A+).
	 * 
	 * This example shows you how to use <var>then()</var>:
	 * <pre>
	 * $.request('get', 'http://example.com/weather?zip=90210')
	 *  .then(function success(result) {
	 *      alert('The weather is ' + result);
	 *  }, function error(exception) {
	 *  	alert('Something went wrong');
	 *  });
	 * </pre>
	 * 
	 * What makes Promises so special is that ##then() itself returns a new Promise, which is based on the Promise <var>then()</var> was called on, but can be
	 * modified by the outcome of callbacks. Both arguments to <var>then()</var> are optional, and you can also write the code like this:
	 * <pre>
	 * $.request('get', 'http://example.com/weather?zip=90210')
	 *  .then(function success(result) {
	 *      alert('The weather is ' + result);
	 *  })
	 *  .then(null, function error(exception) {
	 *  	alert('Something went wrong');
	 *  });
	 * </pre>
	 * 
	 * Because the first ##then() returns a new Promise based on the original Promise, the second <var>then()</var> will handle errors of the request just like 
	 * the first one did. There is only one subtle difference in the second example: the error handler will not only be called if the request failed, 
	 * but also when the request succeded but the success handler threw an exception. That's one of the two differences between the original Promise and 
	 * the Promise returned by <var>then()</var>. Any exception thrown in a callback causes the new Promise to be in error state. 
	 * 
	 * Before I show you the second difference between the original Promise and the new Promise, let me make the example a bit more readable 
	 * by using ##error(), which is not part of Promises/A+, but a simple extension by Minified. It just registers the failure callback without 
	 * forcing you to specify <var>null</var> as first argument: 
	 * <pre>
	 * $.request('get', 'http://example.com/weather?zip=90210')
	 *  .then(function success(result) {
	 *      alert('The weather is ' + result);
	 *  })
	 *  .error(function error(exception) {  // error(callback) is equivalent to then(null, callback)
	 *  	alert('Something went wrong');
	 *  });
	 * </pre>
	 * 
	 * A very powerful capability of Promises is that you can easily chain them. If a ##then() callback returns a value, the new Promise returned 
	 * by <var>then()</var> will be marked as success (fulfilled) and this value is the result of the operation. If a callback returns a Promise, 
	 * the new Promise will assume the state of the returned Promise. You can use the latter to create chains of asynchronous operations, 
	 * but you still need only a single error handler for all of them and you do not need to nest functions to achieve this:
	 * <pre>
	 * $.request('get', 'http://example.com/zipcode?location=Beverly+Hills,+CA')
	 *  .then(function(resultZip) {
	 *      return $.request('get', 'http://example.com/weather', {zip: resultZip});
	 *  })
	 *  .then(function(resultWeather) {
	 *      alert('The weather in Beverly Hills is ' + resultWeather);
	 *  })
	 *  .error(function(exception) {
	 *  	alert('Something went wrong');
	 *  });
	 * </pre>
	 *  
	 * Only the full Minified distribution allows you to create promises yourself, using the ##promise() function. The Promises/A+ 
	 * specification does not specify how to fulfill a promise, but in Minified's implementation every Promise object has a function <code>fire()</code>  
	 * that needs to be called when the promise result is ready. It requires two arguments.
	 * The first is a boolean, <var>true</var> for a successful operation and <var>false</var> for a failure. The second is an array or list containing the
	 * arguments to call the corresponding ##then() handler with.
	 * 
	 * The following example is a function, similar to ##wait(), that returns a Promise which succeeds after the given amount 
	 * of milliseconds has passed.
	 * It then fulfills the promise with the number of milliseconds as argument. 
	 * 
	 * <pre>
	 * function timeout(durationMs) {
	 *		var p = _.promise();
	 *		setTimeout(function() { p.fire(true, [durationMs]); }, durationMs);
	 *		return p;
	 * }
	 * </pre>
	 * Call it like this: 
	 * <pre>
	 * timeout(1000).then(function(ms) { window.alert(ms+ ' milliseconds have passed.'); });
	 * </pre>
	 * 
	 * <h3>Limited Promises Implementation in Web module</h3>
	 * If you use only the Web module, instead of the full implementation, the promises implementation is not fully Promises/A+ compliant. 
	 * One major difference is that it does not allow you create promises yourself. The only way to get a promise in the Web module 
	 * is from functions like ##animate() and ##request(). The other difference is that the interoperability with other promises frameworks 
	 * is limited, even though it should be good enough most of the time.
	 *
	 * There are two things you may run into when you use Web's simplified implementation with a complete implementation:
	 * <ol><li>The simplified implementation does not support recursive thenables. So when you register callbacks with ##then(), 
	 * you can return a promise or a thenable, but only if that promise is not also returning a promise.</li>
	 * <li>Many corner cases required by the Promises/A+ specification are not handled. When interoperating using 
	 * reasonable implementations, you may never run into this, but Promises/A+ has detailed rules for things like ##then() 
	 * methods implemented as dynamic getter and returning a new value on each invocation or throwing exceptions. If you need 
	 * a water-proof implementation, you need to use the complete implementation in Minified's full package.</li></ol>
	 */
	/*$
	 * @stop
	 */
	
	///#/snippet  webDocs
	
	
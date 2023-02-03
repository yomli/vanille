/*!
 * Vanille
 * Licensed MIT (https://github.com/yomli/vanille/blob/main/LICENSE)
 */
'use strict';

/* See comments of https://dev.to/mrahmadawais/use-instead-of-document-queryselector-all-in-javascript-without-jquery-3ef1 */
// const $ = (css, parent = document) => parent.querySelector(css);
// const $$ = (css, parent = document) => Array.from(parent.querySelectorAll(css));
const $ = (q, d = document) =>
	/#\S+$/.test(q)							// check if query asks for ID
	? d.querySelector.bind(d)(q)			// if so, return one element
	: [...d.querySelectorAll.bind(d)(q)];	// else, return all elements in an array.

const body = document.body;
const html = document.documentElement;


// Core
let _ = (obj) => {
	if (typeof obj === 'string') return $(obj);
	else return obj;
};
// Creating a new object inheriting and returning Arrays
const Vanille = (function () {
	let args = [].slice.call(arguments);
	let arr = new Array();
	let arrPush = arr.push;
	args.forEach((arg) => arr.push(arg));
	args = null;
	arr.push = (args) => arrPush.apply(this, arguments);

	/* ~~~~ Custom functions ~~~~ */
	// Classes
	arr.addClass = (classname) => addClass(arr[0], classname);
	arr.removeClass = (classname) => removeClass(arr[0], classname);
	arr.toggleClass = (classname) => toggleClass(arr[0], classname);
	arr.hasClass = (classname) => hasClass(arr[0], classname);
	// Content
	arr.clone = () => clone(arr[0]);
	arr.remove = () => remove(arr[0]);
	arr.replace = (newObj) => replace(arr[0], newObj);
	arr.prepend = (content) => prepend(arr[0], content);
	arr.append = (content) => append(arr[0], content);
	arr.before = (content) => before(arr[0], content);
	arr.after = (content) => after(arr[0], content);
	arr.clear = () => clear(arr[0]);
	// Attributes
	arr.attr = (att, val) => attr(arr[0], att, val);
	arr.removeAttr = (att) => removeAttr(arr[0], att);
	arr.style = (css) => style(arr[0], css);
	arr.id = () => id(arr[0]);
	arr.href = () => href(arr[0]);
	arr.computedStyle = (att) => computedStyle(arr[0], att);
	arr.fadeTo = (opacity) => fadeTo(arr[0], opacity);
	// Events
	arr.on = (ev, funct) => on(ev, arr[0], funct);
	arr.onClickOutside = (callback) => onClickOutside(arr[0], callback);
	// Visibility
	arr.show = (type = '') => show(arr[0], type);
	arr.hide = () => hide(arr[0]);
	arr.toggle = (type = '') => toggle(arr[0], type);
	// Helpers
	arr.foreach = (funct) => Array.prototype.forEach.call(arr[0], funct);
	arr.shuffle = () => arr[0].sort(() => .5 - Math.random());

	// Return an array with our custom functions
	return arr;
});

// Same as $, but we always get an Array
const $$ = (str) => new Vanille($(str));
// Text

// Generate a GUID
// Returns: '9b259142-4421-4d36-bd7c-19d4f50a95ed'
const newUUID = () => {
	return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
		(c ^
			(crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
		).toString(16)
	);
};

// Generate pseudo-random ID
// Returns: '_83940342'
const newID = () => '_' + Math.random().toString(16).substr(6, 14);

// Get selected text
// Returns 'my selected text'
const getSelectedText = () => window.getSelection().toString();

// Get HTML without tags
const strigTags = (html) => (new DOMParser().parseFromString(html, 'text/html')).body.textContent || '';

// Get a string with accented characters replaced by their ASCII counterpart
// Returns "Creme brulee"
const replaceAccents = (str) => str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');

// Get url-compatible string
// Returns 'my-compatible-string'
const urlSlug = (str) => str.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '');

// Encode string to base64
const encodeBase64 = (str) => window.btoa(unescape(encodeURIComponent(str)));

// Decode string from base64 to ASCII
const decodeBase64 = (str) => {
	let r = window.atob(str), ret = r;
	try {
		ret = decodeURIComponent(escape(r));
	} catch (e) {
		return r;
	}
	return ret;
};

// Arrays

// Foreach function
const foreach = (obj, funct) => {
	obj = _(obj); if (!obj || obj.length == 0) { return false; }
	if (obj.length) Array.prototype.forEach.call(obj, funct);
};

// Sort an array of objects
const sortBy = (arr, k) => arr.concat().sort((a, b) => (a[k] > b[k]) ? 1 : ((a[k] < b[k]) ? -1 : 0));

// Shuffle an array
const shuffle = (arr) => arr.sort(() => .5 - Math.random());

// Create an array of numbers between min and max
const range = (min, max) => Array.from({ length: Number(max - min + 1) }, (_, i) => Number(min + i));

// Location

// Redirect from http://mydomain.com to https://mydomain.com
// Usage: httpsRedirect();
const httpsRedirect = () => { if (location.protocol !== 'https:') location.protocol = 'https:' };

// Refresh page
// Usage: refresh();
const refresh = () => location.reload();

// math

// Returns a random number between min and max
const rand = (min, max) => Number(Math.floor(Math.random() * (max - min + 1)) + min);

// Misc

// Checks if is valid JSON
// Usage: isValidJSON('{ "name": "My Name", "age": 33}');
// returns boolean
const isValidJSON = (str) => {
	try {
		JSON.parse(str);
		return true;
	} catch (err) {
		return false;
	}
};

// Convert an array to CSV
// Usage: array2CSV(["one", "two"], ["three", "four"])
// Returns '"one","two"\n"three","four"'
const array2csv = (arr, delimiter = ',') => {
	arr.map((row) => row.map((value) => `'${value}'`).join(delimiter)).join('\n');
};
// Ajax and API Calls

// DOM results
let _txtTarget = (txt, target) => {
	if (target) {
		target = _(target);
		if (target instanceof HTMLInputElement) { // If it's an input element
			target.value = txt;
		} else if (!target[0]) {
			target.innerHTML = txt;
		} else if (target.length) {
			for (let el of target) el.innerHTML = txt;
		}
	}
};

/* Usage :
ajax("http://myurl/?version", 'GET', '', '#btn', function (t,s) { 
			if (s == 200) {
				console.log(t);
			} else {
				console.log(s);
			}
		 });
*/
const ajax = (url, method = 'GET', data = '', target = '', callback = false) => {		
	// Sending request
	var xhr = new XMLHttpRequest;
	xhr.open(method, url, true);
	if (method.toLowerCase() == 'post')
		xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xhr.send(data);
	// Managing response
	xhr.onreadystatechange = () => {
		if (xhr.readyState !== 4) return; // Only run if request complete
		if (xhr.readyState === 4 && xhr.status === 200) {
			var res = JSON.parse(xhr.responseText);
			if (callback) { callback(res, xhr.status) }
			_txtTarget(res, target);
		} else {
			if (callback) { callback(xhr.responseText, xhr.status) }
		}
	};
};
/* Usage: same as ajax() but can post form just by id it in the call:
fetchAPI(url,'POST',$('#myForm'))
/* To construct raw post data:
'title=' + encodeURIComponent('My title') + '&body=' + encodeURIComponent(bodyText)
*/
const fetchAPI = (url, method = 'GET', data = '', target = '', callback = false) => {
	// Initialization
	let ini = { method: method };
	if (method.toLowerCase() == 'post' && data) { // Post as form data or raw
		ini = (data instanceof HTMLFormElement) 
			? { method: method, body: new FormData(data) } 
			: { method: method, body: data };
	}
	// Sending request
	fetch(url, ini)
		.then((res) => {
			// Managing response
			if (res.ok && res.status == '200') {
				return res.json();
			} else {
				// Create error object and reject
				let err = new Error("HTTP status code: " + res.status);
				err.response = res;
				err.status = res.status;
				throw err;
			}
		})
		.then((json) => {
			_txtTarget(json, target);
			if (callback) callback(json, true);
		})
		.catch((err) => { if (callback) callback(err, false) });
};// Classes

const addClass = (obj, classname) => {
	obj = _(obj); if (!obj || obj.length == 0) { return false; }
	let _acl = (el, cl) => {
		if (el.classList) el.classList.add(cl);
		else el.className += ' ' + cl;
	};
	if (!obj[0]) _acl(obj, classname);
	else obj.forEach(_acl(el, classname));
};

const removeClass = (obj, classname) => {
	obj = _(obj); if (!obj || obj.length == 0) { return false; }
	let _rcl = (el, cl) => {
		if (el.classList) el.classList.remove(cl);
		else el.className = el.className.replace(new RegExp('(^| )' + cl.split(' ').join('|') + '( |$)', 'gi'), ' ');
	};
	if (!obj[0]) _rcl(obj, classname);
	else obj.forEach(_rcl(obj, classname));
};

const toggleClass = (obj, classname) => {
	obj = _(obj); if (!obj || obj.length == 0) { return false; }
	let _tcl = (el, cl) => {
		if (el.classList) el.classList.toggle(cl);
		else {
			let classes = el.className.split(' ');
			let idx = classes.indexOf(cl);
			if (idx >= 0) classes.splice(idx, 1);
			else classes.push(cl);
			el.className = classes.join(' ');
		}
	};
	if (!obj[0]) _tcl(obj, classname);
	else obj.forEach(_tcl(el, classname));
};

const hasClass = (obj, classname) => {
	obj = _(obj); if (!obj || obj.length == 0) { return false; }
	if (obj[0]) obj = obj[0];
	return obj.className && new RegExp("(\\s|^)" + classname + "(\\s|$)").test(obj.className);
};
// Content
const create = (type, att = '') => {
	let obj = document.createElement(type);
	if (att) {
		for (let [key, val] of Object.entries(att)) {
			attr(obj, key, val);
		}
	}
	if (attr(obj, 'id') == null) attr(obj, 'id' , type + '_' + Math.random().toString(16).substr(6, 14));
	return obj;
};
const clone = (obj) => {
	obj = _(obj); if (!obj || obj.length == 0) { return false; }
	if (!obj[0]) return obj.cloneNode();
	else for (let el of obj) el.cloneNode();
};
const remove = (obj) => {
	obj = _(obj); if (!obj || obj.length == 0) { return false; }
	if (!obj[0]) obj.parentNode.removeChild(obj);
	else for (let el of obj) el.parentNode.removeChild(el);
};
const replace = (obj, newObj) => {
	obj = _(obj); if (!obj || obj.length == 0) { return false; }
	if (!obj[0]) obj.parentNode.replaceChild(newObj, obj);
	else for (let el of obj) el.parentNode.replaceChild(newObj, el);
};
const prepend = (obj, content) => {
	obj = _(obj); if (!obj || obj.length == 0) { return false; }
	if (!obj[0]) obj.innerHTML = content + obj.innerHTML;
	else for (let el of obj) el.innerHTML = content + el.innerHTML;
};
const append = (obj, content) => {
	obj = _(obj); if (!obj || obj.length == 0) { return false; }
	if (!obj[0]) obj.innerHTML+= content;
	else for (let el of obj) el.innerHTML+= content;
};
const before = (obj, content) => {
	obj = _(obj); if (!obj || obj.length == 0) { return false; }
	if (!obj[0]) obj.insertAdjacentHTML('beforebegin', content);
	else for (let el of obj) el.insertAdjacentHTML('beforebegin', content);
};
const after = (obj, content) => {
	obj = _(obj); if (!obj || obj.length == 0) { return false; }
	if (!obj[0]) obj.insertAdjacentHTML('afterend', content);
	else for (let el of obj) el.insertAdjacentHTML('afterend', content);
};
const clear = (obj) => {
	obj = _(obj); if (!obj || obj.length == 0) { return false; }
	if (!obj[0]) obj.innerHTML = '';
	else for (let el of obj) el.innerHTML = '';
};

// Attributes
const attr = (obj, att, val) => {
	obj = _(obj); if (!obj || obj.length == 0) { return false; }
	if (!obj[0]) {
		if (val != undefined) { obj.setAttribute(att, val); }
		else {
			if (obj.getAttribute) return obj.getAttribute(att);
			else return false;
		}
	} else {
		if (val != undefined) { for (let el of obj) el.setAttribute(att, val); }
		else {
			let attList = [];
			for (let el of obj) attList[el] = el.getAttribute(att);
			return attList;
		}
	}
};
const removeAttr = (obj, att) => {
	obj = _(obj); if (!obj || obj.length == 0) { return false; }
	if (!obj[0]) obj.removeAttribute(att);
	else for (let el of obj) el.removeAttribute(att);

};
const style = (obj, css) => { return attr(obj, 'style', css) };
const id = (obj) => { return attr(obj, 'id') };
const href = (obj) => { return attr(obj, 'href') };
const computedStyle = (obj, att) => {
	obj = _(obj); if (!obj || obj.length == 0) { return false; }
	return window.getComputedStyle(obj).getPropertyValue(att);
};
const fadeTo = (obj, opacity) => { return style(obj, 'opacity:' + opacity + ';') };
// DOM related
const fistIn = (obj, q = '') => {
	obj = _(obj); if (!obj || obj.length == 0) { return false; }
	if (q) return obj.querySelector(q);
	else return obj.children[0];
};
const lastIn = (obj, q = '') => {
	obj = _(obj); if (!obj || obj.length == 0) { return false; }
	if (q) {
		let childs = obj.querySelectorAll(q);
		if (!childs) return false;
		if (!childs.length) return childs;
		return childs[childs.length-1];
	} else return obj.lastElementChild;
};
const parent = (obj, degree = 1) => {
	obj = _(obj); if (!obj || obj.length == 0) { return false; }
	if (degree == 1) return obj.parentNode;
	else {
		for (var i = 1; i <= degree; i++) {
			obj = obj.parentNode;
		}
		return obj;
	}
};
const siblings = (obj) => {
	obj = _(obj); if (!obj || obj.length == 0) { return false; }
	return [].slice.call(obj.parentNode.children).filter((child) => (child !== obj));
};
const nextSibling = (obj) => {
	obj = _(obj); if (!obj || obj.length == 0) { return false; }
	return obj.nextElementSibling;
};
const previousSibling = (obj) => {
	obj = _(obj); if (!obj || obj.length == 0) { return false; }
	return obj.previousElementSibling;
};
const isDescendant = (obj, par) => {
	obj = _(obj); if (!obj || obj.length == 0) { return false; }
	par = _(par); if (!par || par.length == 0) { return false; }
	return par.contains(obj);
};
const hasFocus = (obj) => {
	obj = _(obj); if (!obj || obj.length == 0) { return false; }
	return (obj === document.activeElement);
};
// Events

// Usage: when_ready(function);
// Note that document.addEventListener is unreliable, so we use window instead
const when_ready = (funct) => window.addEventListener('DOMContentLoaded', funct, false);

// Usage : on('click', '#btn', e => { e.target.style.backgroundColor = 'red' })
const on = (ev, obj, funct, opts = false) => {
	obj = (obj === '' || typeof obj === 'undefined') ? window.document : _(obj);
	if (!obj[0]) obj.addEventListener(ev, funct, opts);
	else for (let el of obj) el.addEventListener(ev, funct, opts);
};

// Usage: onDomChange(function);
const onDomChange = (funct) => on('DOMSubtreeModified', '', funct);

const onClickOutside = (obj, callback) => {
	obj = _(obj); if (!obj || obj.length == 0) { return false; }
	document.addEventListener('click', (e) => {
		if (!obj.contains(e.target)) callback();
	});
};
// Form
// Convert form data into object
// Usage: form2object('#form')
// returns { email: 'test@e.mail', name: 'My Name' }
const form2object = (form) => {
	form = _(form); if (!form || form.length == 0) { return false; }
	return Array.from(new FormData(form)).reduce(
		(acc, [key, val]) => ({
			...acc,
			[key]: val
		}), {});
};

// Same but stringify for JSON
const form2json = (form) => {
	return JSON.stringify(form2object(form));
};
// Visibility
const show = (obj, type = '') => {
	obj = _(obj); if (!obj || obj.length == 0) { return false; }
	if (!obj[0]) obj.style.display = type;
	else for (let el of obj) el.style.display = type;
};
const hide = (obj) => { show(obj, 'none'); };
const toggle = (obj, type = '') => {
	obj = _(obj); if (!obj || obj.length == 0) { return false; }
	let _tgl = (valTgl, val1, val2) => {
		if (valTgl == val1) return val2;
		else return val1;
	};
	if (!obj[0]) obj.style.display = _tgl(obj.style.display, 'none', type);
	else for (let el of obj) el.style.display = _tgl(el.style.display, 'none', type);
};

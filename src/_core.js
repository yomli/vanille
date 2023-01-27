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

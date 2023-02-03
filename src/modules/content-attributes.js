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

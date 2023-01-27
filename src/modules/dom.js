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

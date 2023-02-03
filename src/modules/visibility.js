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

// Classes

const addClass = (obj, classname) => {
	obj = _(obj); if (!obj || obj.length == 0) { return false; }
	let _acl = (el, cl) => {
		if (el.classList) el.classList.add(cl);
		else el.className += ' ' + cl;
	};
	if (!obj[0]) _acl(obj, classname);
	else obj.map(el => { _acl(el, classname) });
};

const removeClass = (obj, classname) => {
	obj = _(obj); if (!obj || obj.length == 0) { return false; }
	let _rcl = (el, cl) => {
		if (el.classList) el.classList.remove(cl);
		else el.className = el.className.replace(new RegExp('(^| )' + cl.split(' ').join('|') + '( |$)', 'gi'), ' ');
	};
	if (!obj[0]) _rcl(obj, classname);
	else obj.map(el => { _rcl(obj, classname); });
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
	else obj.map(el => { _tcl(el, classname); });
};

const hasClass = (obj, classname) => {
	obj = _(obj); if (!obj || obj.length == 0) { return false; }
	if (obj[0]) obj = obj[0];
	return obj.className && new RegExp("(\\s|^)" + classname + "(\\s|$)").test(obj.className);
};

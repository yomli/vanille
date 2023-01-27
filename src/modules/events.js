// Events

// Usage: when_ready(function);
// Note that document.addEventListener is unreliable, so we use window instead
const when_ready = (funct) => window.addEventListener('DOMContentLoaded', funct, false);

// Usage : on('click', '#btn', e => { e.target.style.backgroundColor = 'red' })
const on = (ev, obj, funct, opts = false) => {
	obj = (obj === '' || typeof obj === 'undefined') ? window.document : _(obj);
	if (!obj[0]) obj.addEventListener(ev, funct, opts);
	else obj.map(el => { el.addEventListener(ev, funct, opts); });
};

// Usage: onDomChange(function);
const onDomChange = (funct) => on('DOMSubtreeModified', '', funct);

const onClickOutside = (obj, callback) => {
	obj = _(obj); if (!obj || obj.length == 0) { return false; }
	document.addEventListener('click', (e) => {
		if (!obj.contains(e.target)) callback();
	});
};

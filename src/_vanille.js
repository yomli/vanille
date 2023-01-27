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

let importList = [
'_core.js',
'_vanille.js',
'_helpers.js',
'modules/ajax-api.js',
'modules/classes.js',
'modules/content-attributes.js',
'modules/dom.js',
'modules/events.js',
'modules/forms.js',
"modules/visibility.js",
];

// Import all you need
[].forEach.call(importList, (el) => {
	let scriptTag = document.createElement('script');
	scriptTag.src = el;
	document.head.appendChild(scriptTag);
});

/*
	Then encapsulate your code:

	var ready = function() {
		...
	}
	window.addEventListener('load', ready, false);

*/

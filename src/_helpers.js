// Text

// Generate a GUID
// Returns: '9b259142-4421-4d36-bd7c-19d4f50a95ed'
const newUUID = () => {
	([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
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

// Get url-compatible string
// Returns 'my-compatible-string'
const urlSlug = (str) => str.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '');

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

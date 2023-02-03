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
};
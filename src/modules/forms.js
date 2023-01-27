// Form
// Convert form data into object
// Usage: form2object('#form')
// returns { email: 'test@e.mail', name: 'My Name' }
const form2object = (form) => {
	form = _(form); if (!form || form.length == 0) { return false; }
	return Array.from(new FormData(form)).reduce(
		(acc, [key, val]) => ({
			...acc,
			[key]: val
		}), {});
};

// Same but stringify for JSON
const form2json = (form) => {
	return JSON.stringify(form2object(form));
};

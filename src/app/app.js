// Components
var listItem = {
	container: 'userList',
	template: '<div><h3>{{name}}</h3></div>'
};

var addPanel = {
	container: 'mainbody',
	template: '<div><input type="text" id="nameText" /><button id="addUser">Add</button></div>',
	binds: {
		'nameText.value': 'selectedText',
		'ageText.value': 'selectedAge'
	},
	actions: {
		'addUser.onclick': 'addUser'
	}
};

app.addComponent(listItem);
app.addComponent(addPanel);

// Connections
var addUser = {
	input: { name: 'selectedText', age: 'selectedAge' },
	output: {
		action: 'push',
		model: 'users'
	}
}

app.addConnection('addUser', addUser);

// Models
app.models = {
	users: [],
	selectedText: '',
	selectedAge: 0
};

// Signals
app.addSignal('addUser', app.dataConnections.addUser);


// Startup
app.init();
// Connections
var Connection = function (connection) {
	connection.invoke = function () {
		var output = {};
		for (var key in this.input) {
			output[key] = app.models[this.input[key]];
		}

		if (this.output.action) {
			app.models[this.output.model][this.output.action](output);
		} else {
			app.models[this.output.model][this.output.action] = output;
		}
	};
};

// Databinding
var app = {
	databind: function () {
		for (var index = 0; index < this.components.length; index++) {
			var component = this.components[index];
			for (var key in component.binds) {
				var parts = key.split('.'),
					control = parts[0],
					property = parts[1],
					model = component.binds[key];

				this.models[model] = document.getElementById(control)[property];
			}
		}
	},
	eventbind: function () {
		for (var index = 0; index < this.components.length; index++) {
			var component = this.components[index];
			if (component.actions) {
				for (var key in component.actions) {
					var parts = key.split('.'),
						control = parts[0],
						eventName = parts[1],
						application = this;

					document.getElementById(control)[eventName] = function () {
						application.databind();
						application.signals[component.actions[key]].invoke();
					};
				}
			}
		};
	},
	models: {},
	
	signals: [],
	
	addSignal: function(name, signal){
		this.signals[name] = signal;
	},
	
	components: [],
	
	addComponent: function(component){
		this.components.push(component);
	},
	
	dataConnections: [],

	addConnection: function (name, connection) {
		Connection.call(this, connection);
		this.dataConnections[name] = connection;
	},

	init: function () {
		this.eventbind();
		this.databind();
	}
};




 


srmtApp.factory('ModelFactory', ModelFactory);

function ModelFactory() {

	var user = {
		"username" : "",
		"password" : ""
	};

	var languages = [ {
		"name" : "English",
		"code" : "EN"
	}, {
		"name" : "తెలుగు",
		"code" : "TE"
	} ];

	this.getModel = function(modelName) {
		if (modelName.toLowerCase() == 'user') {
			return angular.copy(user);
		} else if (modelName.toLowerCase() == 'languages') {
			return angular.copy(languages);
		}
	};

	return this;
}
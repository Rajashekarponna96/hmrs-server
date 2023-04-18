srmtApp.factory('ValidationFactory', ValidationFactory);

function ValidationFactory() {

	this.hasValue = function(object) {
		return (object != undefined && object != null && object.trim() != "")
	};
	return this;
}
srmtApp.service('userService', userService);
function userService($q) {
	var _userdb = new PouchDB('user', {
		adapter : 'websql'
	});
	var _customerdb = new PouchDB('customer', {
		adapter : 'websql'
	});
	this.addUser = function(user) {
		return $q.when(_userdb.post(user));
	};
	this.addCustomer = function(customer) {
		return $q.when(_customerdb.post(customer));
	};
	this.deleteDb = function(dbName) {
		return $q.when(_userdb.destroy());
	};
	this.getAllUsers = function() {
		return $q.when(_userdb.allDocs({
			include_docs : true
		}));
	};
}
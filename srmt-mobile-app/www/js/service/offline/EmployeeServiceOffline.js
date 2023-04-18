angular.module('srmt').service("employeeServiceOffline", function($q) {
	var _employeeDb = new PouchDB('employee', {
		adapter : 'websql'
	});
	this.deleteDb = function() {
		return $q.when(_employeeDb.destroy().then(function(response) {
			_employeeDb = new PouchDB('employee', {
				adapter : 'websql'
			});
		}));
	};
	this.findByDoc_Id = function(docId) {
		return $q.when(_employeeDb.get(docId));
	};
	this.put = function(document) {
		return $q.when(_employeeDb.post(document));
	};
	this.getAllDocs = function() {
		return $q.when(_employeeDb.allDocs({
			include_docs : true
		}));
	};
	this.deleteDocument = function(document) {
		return $q.when(_employeeDb.remove(document));
	};
})
angular.module('srmt').service("loginServiceOffline", function($q) {
	var _userDb = new PouchDB('user', {
		adapter : 'websql'
	});
	this.deleteDb = function() {
		return $q.when(_userDb.destroy().then(function(response) {
			_userDb = new PouchDB('user', {
				adapter : 'websql'
			});
		}));
	};
	this.findByDoc_Id = function(docId) {
		return $q.when(_userDb.get(docId));
	};
	this.put = function(document) {
		return $q.when(_userDb.post(document));
	};
	this.getAllDocs = function() {
		return $q.when(_userDb.allDocs({
			include_docs : true
		}));
	};
	this.deleteDocument = function(document) {
		return $q.when(_userDb.remove(document));
	};
	this.bulkPost = function(documents) {
		return $q.when(_userDb.bulkDocs(documents));
	};

})
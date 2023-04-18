angular.module('srmt').service("clientServiceOffline", function($q) {
	var _clientDb = new PouchDB('client', {
		adapter : 'websql'
	});
	this.deleteDb = function() {
		return $q.when(_clientDb.destroy().then(function(response) {
			_clientDb = new PouchDB('client', {
				adapter : 'websql'
			});
		}));
	};
	this.findByDoc_Id = function(docId) {
		return $q.when(_clientDb.get(docId));
	};
	this.put = function(document) {
		return $q.when(_clientDb.post(document));
	};
	this.getAllDocs = function() {
		return $q.when(_clientDb.allDocs({
			include_docs : true
		}));
	};
	this.deleteDocument = function(document) {
		return $q.when(_clientDb.remove(document));
	};
	this.bulkPost = function(clients) {
		return $q.when(_clientDb.bulkDocs(clients));
	};

})
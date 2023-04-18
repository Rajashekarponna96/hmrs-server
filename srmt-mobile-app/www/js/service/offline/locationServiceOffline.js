angular.module('srmt').service("locationServiceOffline", function($q) {
	var _locationDb = new PouchDB('location', {
		adapter : 'websql'
	});
	this.deleteDb = function() {
		return $q.when(_locationDb.destroy().then(function(response) {
			_locationDb = new PouchDB('location', {
				adapter : 'websql'
			});
		}));
	};
	this.findByDoc_Id = function(docId) {
		return $q.when(_locationDb.get(docId));
	};
	this.put = function(document) {
		return $q.when(_locationDb.post(document));
	};
	this.getAllDocs = function() {
		return $q.when(_locationDb.allDocs({
			include_docs : true
		}));
	};
	this.deleteDocument = function(document) {
		return $q.when(_locationDb.remove(document));
	};
	
	this.bulkPost = function(documents) {
		return $q.when(_locationDb.bulkDocs(documents));
	};
	
	

})
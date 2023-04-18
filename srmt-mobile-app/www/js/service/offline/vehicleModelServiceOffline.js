angular.module('srmt').service("vehicleModelServiceOffline", function($q) {
	var _vehicleModelDb = new PouchDB('vehicleModel', {
		adapter : 'websql'
	});
	this.deleteDb = function() {
		return $q.when(_vehicleModelDb.destroy().then(function(response) {
			_vehicleModelDb = new PouchDB('vehicleModel', {
				adapter : 'websql'
			});
		}));
	};
	this.findByDoc_Id = function(docId) {
		return $q.when(_vehicleModelDb.get(docId));
	};
	this.put = function(document) {
		return $q.when(_vehicleModelDb.post(document));
	};
	this.getAllDocs = function() {
		return $q.when(_vehicleModelDb.allDocs({
			include_docs : true
		}));
	};
	this.deleteDocument = function(document) {
		return $q.when(_vehicleModelDb.remove(document));
	};
	this.bulkPost = function(documents) {
		return $q.when(_vehicleModelDb.bulkDocs(documents));
	};
	

})
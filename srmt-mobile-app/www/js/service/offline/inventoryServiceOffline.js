angular.module('srmt').service("inventoryServiceOffline", function($q) {
	var _inventoryDb = new PouchDB('inventory', {
		adapter : 'websql'
	});
	this.deleteDb = function() {
		return $q.when(_inventoryDb.destroy().then(function(response) {
			_inventoryDb = new PouchDB('inventory', {
				adapter : 'websql'
			});
		}));
	};
	this.findByDoc_Id = function(docId) {
		return $q.when(_inventoryDb.get(docId));
	};
	this.put = function(document) {
		return $q.when(_inventoryDb.post(document));
	};
	this.getAllDocs = function() {
		return $q.when(_inventoryDb.allDocs({
			include_docs : true
		}));
	};
	this.deleteDocument = function(document) {
		return $q.when(_inventoryDb.remove(document));
	};
	this.bulkPost = function(documents) {
		return $q.when(_inventoryDb.bulkDocs(documents));
	};
	

})
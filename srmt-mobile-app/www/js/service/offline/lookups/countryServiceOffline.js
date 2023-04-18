angular.module('srmt').service("countryServiceOffline", function($q) {
	var _countryDb = new PouchDB('Country', {
		adapter : 'websql'
	});
	this.addBulkCountries = function(countries) {
		return $q.when(_countryDb.bulkDocs(countries));
	};
	this.deleteDb = function(dbName) {
		return $q.when(_countryDb.destroy());
	};
	this.findByDoc_Id = function(docId) {
		return $q.when(_countryDb.get(docId));
	}
	this.getAllCountries = function() {
		return $q.when(_countryDb.allDocs({
			include_docs : true
		}));
	};
})
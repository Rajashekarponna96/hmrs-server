angular.module('srmt').service("onlineCountryService",
		function($http, HRM_CONFIG) {

			this.getCountries = function() {
				return $http.get(HRM_CONFIG.URL.GET_ALL_COUNTRIES());
			};
		})
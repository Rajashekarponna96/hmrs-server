angular.module('srmt').service(
		"lookupService",
		function($http, HRM_CONFIG) {

			this.getCountries = function() {
				return $http.get(HRM_CONFIG.URL.GET_COUNTRIES());
			};
			this.getStates = function(id) {
				return $http
						.get(HRM_CONFIG.URL.GET_STATES_BY_COUNTRY_ID(id));
			};
			this.getDistricts = function(id) {
				return $http.get(HRM_CONFIG.URL
						.GET_DISTRICTS_BY_STATE_ID(id));
			};
			this.getCities = function(id) {
				return $http.get(HRM_CONFIG.URL
						.GET_CITIES_BY_DISTRICT_ID(id));
			};
		});
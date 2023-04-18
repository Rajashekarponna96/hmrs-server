angular.module('srmt').service("onlineDistrictService",
		function($http, HRM_CONFIG) {
			this.getDistricts = function(stateId) {
				return $http.get(HRM_CONFIG.URL.GET_ALL_DISTRICTS_BY_STATE_ID(stateId))
			}
		})
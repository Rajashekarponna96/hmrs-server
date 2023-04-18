angular.module('srmt').service(
		"dateDifferenceService",
		function($http, HRM_CONFIG) {
			this.getDateDifference = function(fromDate, toDate) {
				return $http.get(HRM_CONFIG.URL.GET_DATES_DIFFERENCE(fromDate,
						toDate));
			};
		})
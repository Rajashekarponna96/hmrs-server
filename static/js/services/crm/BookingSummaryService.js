angular.module('srmt').service(
		"BookingSummaryService",
		function($http, CRM_CONFIG) {

			this.searchBookingSummary = function(dataUrl) {
				return $http.get(CRM_CONFIG.URL
						.SEARCH_BOOKING_SUMMARY(dataUrl));
			};

			this.getCount = function(countUrl) {
				return $http.get(CRM_CONFIG.URL
						.GET_BOOKING_SUMMARY_COUNT(countUrl));
			};

			this.reportForBookingSummary = function(dataUrl) {
				return $http.get(CRM_CONFIG.URL
						.GET_REPORT_FOR_BOOKING_SUMMARY(dataUrl), {
					responseType : 'arraybuffer'
				});
			};

		})
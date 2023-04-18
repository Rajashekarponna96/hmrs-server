angular.module('srmt').service(
		"appointmentServiceOnline",
		function($http, HRM_CONFIG, CRM_CONFIG) {

			this.getAppointmentList = function(empId, page, size) {
				return $http.get(CRM_CONFIG.URL.GET_APPOINTMENTS(empId, page, size));
			};

		})
angular.module('srmt')
		.service(
				"attendanceService",
				function($http, HRM_CONFIG) {
					this.getAttendanceList = function(date) {
						return $http.get(HRM_CONFIG.URL
								.GET_ATTENDANCE_LIST(date))
					};
					this.uploadAttendance = function(document) {
						return $http.post(HRM_CONFIG.URL.UPLOAD_ATTENDANCE(),
								document);
					};
					this.updateEmpAttendance = function(id, attendance) {
						return $http.put(HRM_CONFIG.URL.UPDATE_ATTENDANCE(id),
								attendance);
					};
					this.attendanceSearchForAllEmployees = function(dataUrl) {
						return $http.get(HRM_CONFIG.URL.ATTENDANCE_SEARCH_FOR_EMPLOYEE(dataUrl));
					};
					this.attendanceSearchForAllEmployeesCount = function(dataUrl) {
						return $http.get(HRM_CONFIG.URL.ATTENDANCE_SEARCH_FOR_EMPLOYEE_COUNT(dataUrl));
					};
					this.attendanceSearchForAllReportees = function(superiorId,dataUrl) {
						return $http.get(HRM_CONFIG.URL.ATTENDANCE_SEARCH_FOR_REPORTEE(superiorId,dataUrl));
					};
					this.attendanceSearchForAllreporteesCount = function(superiorId,dataUrl) {
						return $http.get(HRM_CONFIG.URL.ATTENDANCE_SEARCH_FOR_REPORTEE_COUNT(superiorId,dataUrl));
					};

				})
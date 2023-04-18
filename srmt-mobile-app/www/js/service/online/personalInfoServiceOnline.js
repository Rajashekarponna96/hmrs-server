srmtApp.service('onlinePersonalInfoService',function($http,HRM_CONFIG){
	
	this.getSalesRepresentative=function(id){
		return $http.get(HRM_CONFIG.URL.FIND_EMPLOYEE_BY_ID(id))
	}
	
	
	
})
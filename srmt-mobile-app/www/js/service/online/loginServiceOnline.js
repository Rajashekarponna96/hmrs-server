srmtApp.service('onlineLoginService',function($http,HRM_CONFIG){
	
	this.doLogin=function(user){
		return $http.post(HRM_CONFIG.URL.DO_LOGIN(),user)
	}
	this.doLoginForSalesRep=function(user){
		return $http.post(HRM_CONFIG.URL.DO_LOGIN_FOR_SALES_REP(),user)
	}
	
})
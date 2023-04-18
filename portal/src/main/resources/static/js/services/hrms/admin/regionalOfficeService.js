angular.module('srmt').service("regionalOfficeService",function($http,HRM_CONFIG,COMMON_CONFIG){
	console.log("in service");
	this.addRegionalOffice = function(regionalOfficeMaster){
		return $http.post(HRM_CONFIG.URL.ADD_REGIONAL_OFFICE(),regionalOfficeMaster);
	};
	this.getRegionalOfficeList = function(page,size){
		return $http.get(HRM_CONFIG.URL.GET_REGIONAL_OFFICE_LIST(page,size));
	};
	this.deleteRegionalOffice = function(id){
		return $http.delete(HRM_CONFIG.URL.DELETE_REGIONAL_OFFICE(id));
	};
	this.updateRegionalOffice = function(id,regionalOffice){
		return $http.put(HRM_CONFIG.URL.UPDATE_REGIONAL_OFFICE(id),regionalOffice);
	};
	
	
	this.getCountries=function(){
		return $http.get(COMMON_CONFIG.URL.GET_COUNTRIES());
	};
	this.getStates=function(id){
		return $http.get(COMMON_CONFIG.URL.GET_STATES_BY_COUNTRY_ID(id));
	};
	this.getDistricts=function(id){
		return $http.get(COMMON_CONFIG.URL.GET_DISTRICTS_BY_STATE_ID(id));
	};
	this.getCities=function(id){
		return $http.get(COMMON_CONFIG.URL.GET_CITIES_BY_DISTRICT_ID(id));
	};
	this.getCount=function(){
		return $http.get(HRM_CONFIG.URL.REGIONAL_OFFICE_COUNT());
	};
	this.getBranchesByregionalOfficeId=function(id){
		return $http.get(HRM_CONFIG.URL.GET_BRANCHES_BY_REGIONAL_OFFICE_ID(id));
	}
	
});
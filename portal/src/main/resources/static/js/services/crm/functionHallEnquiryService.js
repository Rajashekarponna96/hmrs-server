
angular.module('srmt').service("functionHallEnquiryService",function($http,CRM_CONFIG){
	
	this.addFunctionHallEnquiry=function(functionHallEnquiry){
		return $http.post(CRM_CONFIG.URL.ADD_FUNCTION_HALL_ENQUIRY(),functionHallEnquiry);
	};
	
	this.getFunctionHallEnquiriesList = function(page,size){
		return $http.get(CRM_CONFIG.URL.GET_ALL_FUNCTION_HALL_ENQUIRY(page,size));
	};
	this.updateFunctionHallEnquiry = function(id,functionHallEnquiry){
		return $http.put(CRM_CONFIG.URL.UPDATE_FUNCTION_HALL_ENQUIRY(id),functionHallEnquiry);
	};
	this.getCount = function(dataUrl){
		return $http.get(CRM_CONFIG.URL.SEARCH_ENQUIRYCOUNT(dataUrl));
	};
	
	this.searchEnquiry=function(dataUrl){
		return $http.get(CRM_CONFIG.URL.SEARCH_ENQUIRY(dataUrl));
	}
	
	this.getAllFunctionHallEnquiriesSortByDate=function(page,size){
		return $http.get(CRM_CONFIG.URL.GET_ALL_ENQUIRIES_SORT_BY_DATE(page,size))
	}
})
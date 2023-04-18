angular.module('srmt').service("countryService",function($http,HRM_CONFIG){
	
	this.getCountryList=function(page, size){
		return $http.get(HRM_CONFIG.URL.GET_COUNTRY_LIST(page, size));
		//return $http.get("http://localhost:8080/RESTfulExample/json/product/get");
	};
	
	this.getCountries=function(){
		return $http.get(HRM_CONFIG.URL.GET_ALL_COUNTRIES())
	};
	
	this.addCountry=function(country){
		return $http.post(HRM_CONFIG.URL.ADD_COUNTRY(),country)
	};
	
	this.updateCountry=function(id,country){
		return $http.put(HRM_CONFIG.URL.UPDATE_COUNTRY(id),country)
	};
	
	this.getCount = function(){
		return $http.get(HRM_CONFIG.URL.GET_COUNTRIES_COUNT());
	};
	
})
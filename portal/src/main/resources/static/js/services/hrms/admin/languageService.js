angular.module('srmt').service("languageService",function($http,HRM_CONFIG){
	
	this.addLanguage = function(language){
		return $http.post(HRM_CONFIG.URL.ADD_LANGUAGE(),language);
	};
	
	this.updateLanguage = function(language){
		return $http.put(HRM_CONFIG.URL.UPDATE_LANGUAGE(language.id),language);
	};
	
	this.getLanguagesList = function(page,size){
		return $http.get(HRM_CONFIG.URL.GET_LANGUAGE_LIST(page,size));
	};
	this.getCount = function(){
		return $http.get(HRM_CONFIG.URL.GET_LANGUAGES_COUNT());
	};
	this.deleteLanguage = function(id){
		return $http.delete(HRM_CONFIG.URL.DELETE_LANGUAGE(id));
	};
	
});
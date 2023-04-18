angular.module('srmt').service("pimLanguageService", function($http, HRM_CONFIG) {
	
	this.getLanguages=function(page,size){
		return $http.get(HRM_CONFIG.URL.GET_LANGUAGE_LIST(page,size));
	};
	
	this.addLanguageProficiency = function(id,languageProficiency){
		return $http.post(HRM_CONFIG.URL.ADD_LANGUAGE_PROFICIENCY(id),languageProficiency)
	};
	
	this.getAllLanguageProficiency = function(page, size){
		return $http.get(HRM_CONFIG.URL.GET_LANGUAGE_PROFICIENCY_LIST(page,size));
	};
	
	this.getCount = function(){
		return $http.get(HRM_CONFIG.URL.GET_LANGUAGE_PROFICIENCY_COUNT());
	};
	
	this.updateLanguageProficiency = function(empid, langid, languageProficiency){
		return $http.put(HRM_CONFIG.URL.UPDATE_LANGUAGE_PROFICIENCY(empid,langid),languageProficiency);
	};
	
	this.deleteLanguageProficiency = function(empid, langid){
		return $http.delete(HRM_CONFIG.URL.DELETE_LANGUAGE_PROFICIENCY(empid,langid));
	}
})
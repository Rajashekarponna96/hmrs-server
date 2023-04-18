angular.module('srmt').service("documentationService",function($http,HRM_CONFIG){
	this.getDocumentCategories=function(page,size){
		return $http.get(HRM_CONFIG.URL.GET_ALL_DOCUMENT_CATEGORIES(page,size));
	};
	
	this.uploadDocument = function(){
		
	}
})
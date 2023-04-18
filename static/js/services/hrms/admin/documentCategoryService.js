angular.module('srmt').service('documentCategoryService',function($http,HRM_CONFIG){
	this.getAlldocumentCategories = function(page,size){
		return $http.get(HRM_CONFIG.URL.GET_DOCUMENT_CATEGORY_LIST(page,size));
	};
	this.addDocumentCategory = function(documentCategory){
		return $http.post(HRM_CONFIG.URL.ADD_DOCUMENT_CATEGORY(),documentCategory);
	};
	this.updateDocumentCategory = function(documentCategory){
		return $http.put(HRM_CONFIG.URL.UPDATE_DOCUMENT_CATEGORY(documentCategory.id),documentCategory);
	};
	this.deleteDocumentCategory = function(id){
		return $http.delete(HRM_CONFIG.URL.DELETE_DOCUMENT_CATEGORY(id));
	};
	this.getCount = function(){
		return $http.get(HRM_CONFIG.URL.GET_DOCUMENT_CATEGORY_COUNT());
	};
});
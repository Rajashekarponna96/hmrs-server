angular.module('srmt')
		.service(
				'documnetService',
				function($http, HRM_CONFIG) {

					this.addDocumnet = function(employeeId, documentCategory,
							document) {
						return $http.post(HRM_CONFIG.URL.POST_ADD_DUCUMENTS(
								employeeId, documentCategory), document);
					};
					this.updateDocumnet = function(empId, docId, document) {
						return $http.put(HRM_CONFIG.URL.PUT_UPDATE_DOCUMENT(empId, docId), document);
					};
					this.deleteDocuments = function(id,docId) {
						return $http.delete(HRM_CONFIG.URL.DELET_DOCUMENT(id,docId));
					};
					this.getDocumnets = function(id,category) {
						return $http.get(HRM_CONFIG.URL.GET_DOCUMENTS(id,category));
					};
					this.addDocumnets = function(catId, document){
						return $http.post(HRM_CONFIG.URL.ADD_DOCUMENT_BY_CATEGORY_ID(catId),document);
					};
					this.deleteDocumentByCategoryId = function(docId) {
						return $http.delete(HRM_CONFIG.URL.DELETE_DOCUMENT_BY_CAT_ID(docId));
					};
					
					this.updateDocumentByCategoryId = function(cat_id,doc){
						return $http.put(HRM_CONFIG.URL.UPDATE_DOCUMENT_BY_CAT_ID(cat_id),doc);
					};
					
					this.updateDocumentById=function(id,document){
						return $http.put(HRM_CONFIG.URL.UPDATE_DOCUMENT_BY_ID(id),document)
					}
				});

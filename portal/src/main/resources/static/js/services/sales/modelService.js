angular.module('srmt').service("modelService",
		function($http, SALES_CONFIG) {

			this.getAllModels = function() {
				return $http.get(SALES_CONFIG.URL.GET_MODELS());
			};

			this.addModel = function(model) {
				return $http.post(SALES_CONFIG.URL.ADD_MODEL(), model);
			};

			this.updateModel = function(id, model) {
				return $http.put(SALES_CONFIG.URL.UPDATE_MODEL(id), model);
			};
			this.getModelsByParentProductLineId = function(pplId) {
				return $http.get(SALES_CONFIG.URL.GET_MODELS_BY_PARENT_PRODUCT_LINE_ID(pplId));
			};


		})
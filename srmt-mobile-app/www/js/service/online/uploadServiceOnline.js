angular.module('srmt').service('onlineUploadService',
		function($http, HRM_CONFIG, HRM_UPLOAD_CONFIG) {

			this.imagePath = function(path) {
				return HRM_UPLOAD_CONFIG.URL.GET_IMAGE_PATH(path);
			}

		});

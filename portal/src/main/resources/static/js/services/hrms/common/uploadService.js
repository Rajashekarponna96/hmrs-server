angular.module('srmt').service('uploadService', function($http, HRM_CONFIG,HRM_UPLOAD_CONFIG, SALES_CONFIG) {

	this.uploadDocument = function(image) {

		var fd = new FormData();
		fd.append('file', image);

		return $http({
			method : 'POST',
			url : HRM_CONFIG.URL.POST_UPLOAD_IMAGE(),
			data : fd,
			transformRequest : angular.identity,
			headers : {
				'Content-Type' : undefined
			}
		}).success(function(data, status, headers, config) {

			return data;
		}).error(function(data, status, headers, config) {
			return data;
		});
	}
	
	this.uploadAttendance = function(image) {

		var fd = new FormData();
		fd.append('file', image);

		return $http({
			method : 'POST',
			url : HRM_CONFIG.URL.POST_UPLOAD_ATTENDANCE(),
			data : fd,
			transformRequest : angular.identity,
			headers : {
				'Content-Type' : undefined
			}
		}).success(function(data, status, headers, config) {

			return data;
		}).error(function(data, status, headers, config) {
			return data;
		});
	}
	
	
	this.uploadInvoiceDump = function(document) {

		var fd = new FormData();
		fd.append('file', document);

		return $http({
			method : 'POST',
			url : SALES_CONFIG.URL.UPLOAD_INVOICE(),
			data : fd,
			transformRequest : angular.identity,
			headers : {
				'Content-Type' : undefined
			}
		}).success(function(data, status, headers, config) {

			return data;
		}).error(function(data, status, headers, config) {
			return data;
		});
	}
	
	
	this.imagePath=function(path){
		return HRM_UPLOAD_CONFIG.URL.GET_IMAGE_PATH(path);
	}
	
	

});

angular.module('srmt').controller(
		"uploadInvoiceDumpController",
		function($scope, notify, $filter, uploadService,
				$state, $stateParams, toaster, $localStorage) {
			$scope.document = {};
			$scope.documnetUploads = function(files) {
				uploadService.uploadInvoiceDump(files[0]).success(
						function(response) {
							$scope.document = response;
						}).error(function(error) {
					toaster.pop({
						type : 'error',
						body : error.message,
						showCloseButton : true,
						timeout : 4000
					});
				});
			};
		});
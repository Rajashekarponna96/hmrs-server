angular.module('srmt').controller(
		"lineOfBussinessController",
		function($scope, $state, segmentService, $stateParams,
				lineOfBussinessService, $localStorage, toaster) {


			$scope.getAllSegments = function() {
				segmentService.getAllSegments().then(
						function(response) {
							$scope.segmentsList = response.data;
						});
			};
			$scope.getAllLineOfBussiness = function() {
				lineOfBussinessService.getAllLineOfBussiness().then(
						function(response) {
							$scope.LOBList = response.data;
						});
			};

			$scope.addLineOfBussiness = function(lob) {
				lineOfBussinessService.addLineOfBussiness(lob)
						.then(function(response) {
							toaster.success({
								body : 'Added Successfully',
								showCloseButton : true,
								timeout : 4000
							});
							$scope.getAllLineOfBussiness();
						},

						function(error) {
							toaster.pop({
								type : 'error',
								body : error.data.message,
								showCloseButton : true,
								timeout : 4000
							});
						})
			};
			
			$scope.updateLineOfBussiness = function(lob) {
				lineOfBussinessService.updateLineOfBussiness(lob.id,lob)
						.then(function(response) {
							toaster.success({
								body : 'Updated Successfully',
								showCloseButton : true,
								timeout : 4000
							});
							$scope.lob={};
							$scope.index=false;
						},

						function(error) {
							toaster.pop({
								type : 'error',
								body : error.data.message,
								showCloseButton : true,
								timeout : 4000
							});
						})
			};
			$scope.index=false;
			
			$scope.editLineOfBussiness=function(lob){
				$scope.index=true;
				$scope.lob=lob;
			
			}

		})
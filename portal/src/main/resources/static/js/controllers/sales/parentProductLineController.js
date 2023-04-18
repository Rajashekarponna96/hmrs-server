angular.module('srmt').controller(
		"parentProductLineController",
		function($scope, $state, segmentService, $stateParams,
				vehicleTypeService, $localStorage, toaster, parentProductLineService) {

			$scope.getAllParentProductlines = function() {
				parentProductLineService.getAllParentProductlines().then(
						function(response) {
							$scope.parentProductLineList = response.data;
						});
			};
			$scope.getAllSegments = function() {
				segmentService.getAllSegments().then(
						function(response) {
							$scope.segmentsList = response.data;
						});
			};

			
			
			

			$scope.addParentProductLine = function(parentProductLine) {
				parentProductLineService
						.addParentProductLine(parentProductLine).then(
								function(response) {
									toaster.success({
										body : 'Added Successfully',
										showCloseButton : true,
										timeout : 4000
									});
									$scope.segment='';
									$scope.parentProductLine = {};
									$scope.getAllParentProductlines();
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
			$scope.updateParentProductLine = function(parentProductLine) {
				parentProductLineService.updateParentProductLine(parentProductLine.id,parentProductLine)
						.then(function(response) {
							toaster.success({
								body : 'Updated Successfully',
								showCloseButton : true,
								timeout : 4000
							});
							$scope.segment='';
							$scope.parentProductLine = {};
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
			
			$scope.editParentProductLine = function(parentProductLine){
				$scope.index=true;
				$scope.parentProductLine=parentProductLine;
			}
			
			$scope.data = [{
					"id":1,
					"title":"hello",
					"nodes":[{
						"id":11,
						"title": "hai there",
						"nodes":[]
					},
					{
						"id":11,
						"title": "hai there",
						"nodes":[]
					},
					{
						"id":11,
						"title": "asefsdf there",
						"nodes":[]
					}
					]
			}];
		})
angular.module('srmt').controller(
		"modelController",
		function($scope, $state, segmentService, $stateParams,modelService,
				vehicleTypeService, $localStorage, toaster, parentProductLineService) {

			$scope.getAllSegments = function() {
				segmentService.getAllSegments().then(
						function(response) {
							$scope.segmentsList = response.data;
						});
			};

			
			$scope.getAllParentProductLinesBySegmentId =  function(segmentId){
				parentProductLineService.getAllParentProductLinesBySegmentId(segmentId).then(
						function(response) {
							$scope.parentProductLines = response.data;
						})
			}

			

			$scope.addModel = function(model) {
				modelService.addModel(model).then(
								function(response) {
									toaster.success({
										body : 'Added Successfully',
										showCloseButton : true,
										timeout : 4000
									});
									
									$scope.model = {};
									$scope.getAllModels();
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
			$scope.updateModel = function(model) {
				modelService.updateModel(model.id,model)
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
			
			$scope.editModel = function(model){
				$scope.index=true;
				$scope.model=model;
			}
			
			$scope.getAllModels=function(){
				modelService.getAllModels().then(function(response){
					$scope.modelList=response.data;
				})
			}
			
			
		})
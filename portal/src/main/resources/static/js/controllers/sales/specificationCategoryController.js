angular.module('srmt').controller(
		"specificationCategoryController",
		function($scope, $state, segmentService, $stateParams,
				specificationCategoryService, $localStorage, toaster) {

			$scope.getAllSpecificationCategories = function() {
				specificationCategoryService.getAllSpecificationCategories()
						.then(function(response) {
							$scope.specificationCategoryList=response.data;

						})
			}

			/*$scope.addSpecificationCategory = function(specificationCategory) {
				specificationCategory.specfications=$scope.specifications;
				specificationCategoryService.addSpecificationCategory(specificationCategory)
						.then(function(response) {
							toaster.success({
								body : 'Added Successfully',
								showCloseButton : true,
								timeout : 4000
							});
							$scope.getAllspecificationCategory();
						},

						function(error) {
							toaster.pop({
								type : 'error',
								body : error.data.message,
								showCloseButton : true,
								timeout : 4000
							});
						})
			};*/

			$scope.updateSpecificationCategory = function(lob) {
				specificationCategoryService.updateSpecificationCategory(
						lob.id, lob).then(function(response) {
					toaster.success({
						body : 'Updated Successfully',
						showCloseButton : true,
						timeout : 4000
					});
					$scope.lob = {};
					$scope.index = false;
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
			$scope.index = false;

			$scope.editspecificationCategory = function(lob) {
				$scope.index = true;
				$scope.lob = lob;

			}
			$scope.specifications=[];
			
			$scope.addSpecification=function(specification){
				$scope.specifications.push(angular.copy(specification));
				$scope.specification={};
				
			}
			$scope.deleteSpecification=function(index){
				$scope.specifications.splice(index,1);
				
			}
			
			$scope.specificationCategories=[];
			$scope.addSpecificationCategory=function(){
				
				$scope.specificationCategory.specfications=$scope.specifications;
				$scope.specificationCategories.push(angular.copy($scope.specificationCategory));
				console.log($scope.specificationCategories);
				$scope.specificationCategory={};
				$scope.specificationCategory.specfications={};
				$scope.specifications=[];
				
			}
			
			

		})
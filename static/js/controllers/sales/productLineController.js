angular.module('srmt').controller(
		"productLineController",
		function($scope, $state, segmentService, $stateParams,productLineService,specificationCategoryService,vehicleColorService,
				vehicleTypeService, $localStorage, toaster, parentProductLineService,modelService) {

			
			$scope.productLineDetail=$stateParams.productline;
			$scope.categories = [];
			
			
			$scope.PerPage = 10;
			$scope.size = 10;
			$scope.page = 0;
			/**
			 * pagination logic
			 * 
			 * need to count total page in count menthos need to call count() in
			 * data list method.
			 * 
			 * need to call data list methis in $scope.$watchGroup([ 'page',
			 * 'size' ]
			 * 
			 * need to take care about sno neeed to check recods for page need
			 * to check totla records
			 */

			$scope.prevPage = function() {
				if ($scope.page > 0) {
					$scope.page--;
				}
			};

			$scope.prevPageDisabled = function() {
				return $scope.page === 0 ? "disabled" : "";
			};

			$scope.nextPage = function() {
				if ($scope.page < $scope.totalPages - 1) {
					$scope.page++;
				}
			};

			$scope.nextPageDisabled = function() {
				return $scope.page === $scope.totalPages - 1 ? "disabled" : "";
			};

			$scope.firstPage = function() {
				$scope.page = 0;
			};
			$scope.lastPage = function() {
				$scope.page = $scope.totalPages - 1;

			};
			$scope.recordsPerPage = function() {
				$scope.page = 0;
				$scope.size = $scope.PerPage;
			}

			$scope.$watchGroup([ 'page', 'size' ], function(newVal, oldVal) {
				$scope.getProductLines();
			});

			$scope.getCount = function() {
				productLineService.getCount().then(function(response) {
					$scope.count = response.data;
					$scope.totalPages = Math.ceil($scope.count / $scope.size);
				});
			};

			/**
			 * pagination logic
			 */
			console.log($scope.productLineDetail);
			$scope.goToViewProductLine=function(productline1){
				$state.go('home.tdv.viewProductLine',{
					productline:productline1
				})
			}
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

			
			$scope.getModelsByParentProductLineId =  function(parentProductLineId){
				modelService.getModelsByParentProductLineId(parentProductLineId).then(
						function(response) {
							$scope.Models = response.data;
						})
			}
			$scope.productLine={};
			console.log(angular.toJson($scope.productLine));
			
			$scope.getVehicleColors = function() {
				vehicleColorService.getVehicleColors().then(function(response) {
					$scope.colorList = response.data;
				})
			}
			$scope.getProductLines=function(){
				productLineService.getProductLines($scope.page,$scope.size).then(function(response){
					$scope.productLinesList=response.data;
					$scope.getCount();
				})
			}
			
			
			$scope.addProductLine = function(productLine) {
				console.log($scope.specificationCategories);
				productLine.categories=$scope.specificationCategories;
				productLineService.addProductLine(productLine)
						.then(function(response) {
							toaster.success({
								body : 'Added Successfully',
								showCloseButton : true,
								timeout : 4000
							});
							$state.go("home.tdv.productLineList");
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
			
			
			$scope.getAllSpecificationCategories = function() {
				specificationCategoryService.getAllSpecificationCategories()
						.then(function(response) {
							$scope.specificationCategoryList=response.data;

						})
			}
			
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
			$scope.specification={};
			$scope.addSpecification=function(){
				$scope.specifications.push(angular.copy($scope.specification));
			$scope.specification={};
			}
			
			

			$scope.specificationCategories=[];
			$scope.specificationCategory={};
			$scope.addSpecificationCategory=function(){
				$scope.specificationCategory.specifications=$scope.specifications;
				$scope.specificationCategories.push(angular.copy($scope.specificationCategory));
				console.log($scope.specificationCategories);
				$scope.specificationCategory={};
				$scope.specifications=[];
				
			}
			
			$scope.gotoAddSpecs = function(){
				console.log("next clicked");
				$state.go("home.tdv.productLine.prodctLineSpecification");
			}	
			
			$scope.getSpecificationCategoriesByProductLineId = function(productLineDetailId){
				productLineService.getSpecificationCategoriesByProductLineId(productLineDetailId).then(function(response){
					$scope.specificationCategories = response.data;
				})
			};
			
			$scope.gotoUpadeProductLine = function(productLine){
				
				$state.go("home.tdv.updateProductLine.updateProductLineDetails",{
					productline: productLine
				});
			};
			$scope.specificationCategory = {};
			$scope.updateSpecCategoryForUpdate = function(index,specCategory){
				console.log("in spe cat update");
				$scope.specificationCategory = specCategory;
				$scope.specificationCategory.specifications = specCategory.specifications;
			};
			
			$scope.addSpecificationForUpdate = function(spec){
				$scope.specificationCategory.specifications.push(angular.copy(spec));
			};
			$scope.updateSpecCategory = function(cat){
				$scope.categories.push(angular.copy(cat));
				$scope.specificationCategory = {};
			};
			
			$scope.updateProductLine = function(productLine){
				productLine.categories = $scope.categories;
				productLineService.updateProductLine(productLine.id, productLine).then(function(response){
					toaster.success({
						body : 'Added Successfully',
						showCloseButton : true,
						timeout : 4000
					});
				})
			};
			$scope.copyAllSpecCategories = function(specc){
				angular.copy(specc,categories);
			};
			
			$scope.deleteSpecification = function(index){
				$scope.specifications.splice(index, 1);
			};
			
			$scope.deleteSpecificationInUpdate = function(index){
				$scope.specificationCategory.specifications.splice(index,1);
			}
			
			
		
			
			
		})
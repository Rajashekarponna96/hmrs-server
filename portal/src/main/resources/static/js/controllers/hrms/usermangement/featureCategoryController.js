angular
		.module('srmt')
		.controller(
				"featureCategoryController",
				function($scope, featureService, notify,$localStorage,
						featureCategoryService,$state,$stateParams,toaster) {
					
					
					$scope.gotofeatureCategoryList = function() {
						$state.go('home.usermgmt.featureCategoryList')
					}
					$scope.gotoAddfeatureCategory = function() {
						$state.go('home.usermgmt.addFeatureCategory')
					}
					$scope.featureCategory=$stateParams.featureCategory;
					console.log($scope.featureCategory);
					$scope.gotoUpdatefeatureCategory = function(featureCategory) {
						$state.go('home.usermgmt.updateFeatureCategory',{
							featureCategory:featureCategory
						})
					}

					$scope.size = 10;
					$scope.page = 0;

					/**
					 * pagination logic
					 * 
					 * need to count total page in count menthos need to call
					 * count() in data list method.
					 * 
					 * need to call data list methis in $scope.$watchGroup([
					 * 'page', 'size' ]
					 * 
					 * need to take care about sno neeed to check recods for
					 * page need to check totla records
					 */
					$scope.getCount = function() {
						featureCategoryService.getCount().then(
								function(response) {
									$scope.count = response.data;
									$scope.totalPages = Math.ceil($scope.count
											/ $scope.size);
								});
					};

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
						return $scope.page === $scope.totalPages - 1 ? "disabled"
								: "";
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

					$scope.$watchGroup([ 'page', 'size' ], function(newVal,
							oldVal) {
						$scope.getFeatureCategories();
					});

					/**
					 * pagination logic
					 */

					$scope.addFeatureCategory = function(featureCategory) {
						featureCategory.features = $scope.features;
						featureCategoryService
								.addFeatureCategory(featureCategory)
								.then(
										function(response) {
											toaster
											.success({
											
												body : 'Added Successfully',
												showCloseButton : true,
												timeout : 4000
											});

													$scope.gotofeatureCategoryList();
										},
										function(error) {
											toaster.pop({
												type : 'error',
												body : error.data.message,
												showCloseButton : true,
												timeout : 4000
											});
										})
					}
					////FOR ADD FEATURE CATEGORY*********
					$scope.flag=false;
					$scope.features = [];
					$scope.addFeature = function() {
						$scope.flag=false;
						if($scope.selectedIndex==undefined){
							angular.forEach($scope.features,function(feature){
								console.log(feature.$$hashKey);
								console.log($scope.featureDetail.$$hashKey);
								if(feature.name==$scope.featureDetail.name){
									toaster.pop({
										type : 'error',
										body : 'duplicate entry for feature',
										showCloseButton : true,
										timeout : 8000
									});
									$scope.flag=true;
									$scope.featureDetail={};
								}
							})
							if($scope.flag==false){
								console.log($scope.features);
								
								$scope.features.push(angular.copy($scope.featureDetail));
								$scope.featureDetail={};
							}
							
							
						}else{
							console.log($scope.features);
							angular.forEach($scope.features,function(feature){
								if(feature.name==$scope.featureDetail.name){
									toaster.pop({
										type : 'error',
										body : 'Duplicate Entry for Feature',
										showCloseButton : true,
										timeout : 8000
									});
									$scope.flag=true;
									$scope.featureDetail={};
								}
							})
								if($scope.flag==false){
							$scope.features[$scope.selectedIndex]=angular.copy($scope.featureDetail);
							$scope.selectedIndex=undefined;
							$scope.featureDetail={};
						}
						}
						
					}
					$scope.deleteFeature=function(index){
						$scope.features.splice(index,1);
					}
					$scope.updateFeature=function(feature,index){
						$scope.selectedIndex=index;
						$scope.featureDetail=angular.copy(feature);
					}
					//****FOR UPDATE FEATURE CATEGORY*******///
					$scope.addFeatureForUpdate = function() {
						$scope.flag=false;
						if($scope.selectedIndex==undefined){
							angular.forEach($scope.featureCategory.features,function(feature){
								if(feature.name==$scope.featureDetail.name){
									toaster.pop({
										type : 'error',
										body : 'duplicate entry for feature',
										showCloseButton : true,
										timeout : 8000
									});
									$scope.flag=true;
									$scope.featureDetail={};
								}
								
								})
							if($scope.flag==false){
								$scope.featureCategory.features.push(angular.copy($scope.featureDetail));
								$scope.featureDetail={};
							}
						}else{
							$scope.flag=false;
							angular.forEach($scope.featureCategory.features,function(feature){
								if(feature.name==$scope.featureDetail.name){
									toaster.pop({
										type : 'error',
										body : 'duplicate entry for feature',
										showCloseButton : true,
										timeout : 8000
									});
									$scope.flag=true;
									$scope.featureDetail={};
								}
								
								})
							if($scope.flag==false){
							$scope.featureCategory.features[$scope.selectedIndex]=angular.copy($scope.featureDetail);
							$scope.selectedIndex=undefined;
							$scope.featureDetail={};
						}
						}
						
					}
					$scope.deleteFeatureForUpdate=function(index){
						$scope.featureCategory.features.splice(index,1);
					}
					$scope.updateFeatureForUpdate=function(feature,index){
						$scope.selectedIndex=index;
						$scope.featureDetail=angular.copy(feature);
					}
					///end**********
					$scope.getFeatureCategories=function(){
						
						featureCategoryService.getFeatureCategories(
						$scope.page,$scope.size).then(function(response){
							console.log("service called");
							$scope.featureCategoryList=response.data;
						})
					}
					$scope.updateFeatureCategory = function(featureCategory) {
						featureCategory.features = $scope.featureCategory.features;
						featureCategoryService
								.updateFeatureCategory(featureCategory.id,featureCategory)
								.then(
										function(response) {
											toaster
											.success({
											
												body : 'Updated Successfully',
												showCloseButton : true,
												timeout : 4000
											});

													$scope.gotofeatureCategoryList();
										},
										function(error) {
											toaster.pop({
												type : 'error',
												body : error.data.message,
												showCloseButton : true,
												timeout : 4000
											});
										})
					}
					
					

				});
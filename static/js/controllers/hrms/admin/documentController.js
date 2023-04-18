angular
		.module('srmt')
		.controller(
				'documentController',
				function($scope, $state, documentCategoryService, $stateParams,
						notify, $uibModal,$localStorage,toaster) {

					$scope.updateDocumentCategory = $stateParams.documentCategory;
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
						documentCategoryService.getCount().then(
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
						$scope.getAllDocumentCategories();
					});

					/**
					 * pagination logic
					 */

					console.log("in document controllelr");
					$scope.gotoAddDocumentCategory = function() {
						$state.go('home.addDocumentCategory');
					};
					$scope.gotoUpdateDocumentCategory = function(
							thisdocumentCategory) {
						$state.go('home.editDocumentCategory', {
							documentCategory : thisdocumentCategory
						});
					};
					$scope.gotoDocumentCategoryList = function() {
						$state.go('home.documentCategoryList');
					};
					$scope.gotoViewDocumentCategory = function(documentCategory) {
						$state.go('home.viewDocumentCategory', {
							documentCategory : documentCategory
						});
					};

					$scope.getAllDocumentCategories = function() {
						documentCategoryService
								.getAlldocumentCategories($scope.page,
										$scope.size)
								.then(
										function(response) {
											$scope.documentCategoryList = response.data;
											$scope.getCount();
										});
					};
					$scope.addDocumentCategory = function(documentCategory) {
						documentCategoryService.addDocumentCategory(
								$scope.documentCategory).then(function(response) {
									toaster
									.success({
									
										body : 'Added Successfully',
										showCloseButton : true,
										timeout : 4000
									});
									$scope.gotoDocumentCategoryList();
								},function(error) {
									/*Notification.error({
										message : '<h4><span class="glyphicon glyphicon-remove-circle"></span>'+error.data.message+'</h4>',
										positionX: 'center',
										delay : 2000
									});*/
								})
					};

					$scope.updateDocumentCategoryDetails = function(
							documentCategory) {
						console.log(" document category : "
								+ angular.toJson(documentCategory));
						documentCategoryService.updateDocumentCategory(
								$scope.updateDocumentCategory).then(function(response) {
									toaster
									.success({
									
										body : 'Updated Successfully',
										showCloseButton : true,
										timeout : 4000
									});
									$scope.gotoDocumentCategoryList();
								},function(error) {
									toaster.pop({
										type : 'error',
										body : error.data.message,
										showCloseButton : true,
										timeout : 4000
									});
								})
					};
					
					$scope.deleteDocumentCategory = function(id){
						documentCategoryService.deleteDocumentCategory(id).then(function(response) {
							Notification.error({
								message :  '<h4><span class="glyphicon glyphicon-info-sign"></span> Document Category deleted successfully.</h4>',
								positionX: 'center',
								delay : 2000
							});
							$scope.getAllDocumentCategories();
						},function(error) {
							toaster.pop({
								type : 'error',
								body : error.data.message,
								showCloseButton : true,
								timeout : 4000
							});
						})
					};
					
					$scope.deleteOpen = function(id) {
						$scope.delId = id;
						var modalInstance = $uibModal.open({

							templateUrl : 'myModalContent.html',
							controller : 'ModalInstanceCtrl',

						});

						modalInstance.result
								.then(
										function() {
											documentCategoryService
													.deleteDocumentCategory(id)
													.then(
															function(response) {
																/*Notification
																		.error({
																			message : '<h4><span class="glyphicon glyphicon-trash"></span> Document Category deleted successfully.</h4>',
																			positionX : 'center',
																			delay : 2000
																		});*/
																$scope
																		.getAllDocumentCategories();
															},
															function(error) {
																/*Notification
																		.error({
																			message : '<span class="glyphicon glyphicon-remove-circle"></span>'
																					+ error.data.message,
																			positionX : 'center',
																			delay : 2000
																		});*/
															})
										});
					};
					$scope.featureActionList = $localStorage.featureActionList;

					$scope.hasFeatureWithAction = function(name) {
						var feature=undefined;
						
						var found = false;
						angular.forEach($scope.featureActionList, function(
								featureAction) {
							
							if (featureAction.feature.name == name) {
								feature = featureAction;
							}
						});
						return feature;
						
					};

				});
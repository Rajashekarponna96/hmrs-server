angular.module('srmt').controller(
		"languageController",
		function($scope, $state, languageService, $stateParams,$uibModal, $localStorage,toaster) {

			$scope.languageDetails = $stateParams.languageData;
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
			};

			$scope.$watchGroup([ 'page', 'size' ], function(newVal, oldVal) {
				$scope.getAllLanguages();
			});

			$scope.getCount = function() {
				languageService.getCount().then(function(response) {
					$scope.count = response.data;
					$scope.totalPages = Math.ceil($scope.count / $scope.size);
				});
			};

			/**
			 * pagination logic gotoViewLeaveType(leaveType)
			 */

			$scope.gotoLanguageList = function() {
				$state.go('home.languageDetailsList');
			};

			$scope.gotoUpdateLanguage = function(language) {
				$state.go('home.updateLanguageDetail',{
					languageData : language
				});

			};

			$scope.gotoAddLanguageDetail = function() {
				$state.go('home.addLanguageDetail');
			};
			
			$scope.gotoViewLanguage = function(thisLanguage){
				$state.go('home.viewLanguageDetail',{
					languageData : thisLanguage
				});
			}

			$scope.getAllLanguages = function() {
				languageService.getLanguagesList($scope.page, $scope.size).then(
								function(response) {
									$scope.languageList = response.data;
									$scope.getCount();
								});
			};
			
			
			$scope.deleteLanguage = function(id){
				languageService.deleteLanguage(id).then(function(response){
					toaster
					.success({
					
						body : 'Deleted Successfully',
						showCloseButton : true,
						timeout : 4000
					});
					$scope.getAllLanguages();
				});
			};
			

			$scope.addLanguageDetail = function(language) {
				languageService.addLanguage(language).then(
						function(response) {
							toaster
							.success({
							
								body : 'Added Successfully',
								showCloseButton : true,
								timeout : 4000
							});
							$scope.gotoLanguageList();
						}, function(error) {
							toaster.pop({
								type : 'error',
								body : error.data.message,
								showCloseButton : true,
								timeout : 4000
							});
						});
			};
			
			$scope.updateLanguageDetail = function(language){
				languageService.updateLanguage(language).then(function(response) {
					toaster
					.success({
					
						body : 'Updated Successfully',
						showCloseButton : true,
						timeout : 4000
					});
					$scope.gotoLanguageList();
				}, function(error) {
					toaster.pop({
						type : 'error',
						body : error.data.message,
						showCloseButton : true,
						timeout : 4000
					});
				});
			};

			$scope.deleteOpen = function(id) {
				$scope.delId = id;
				var modalInstance = $uibModal.open({
					
					templateUrl: 'myModalContent.html',
				    controller: 'ModalInstanceCtrl',
				    	
				});

				modalInstance.result.then(function() {
					languageService.deleteLanguage(id).then(
							function(response) {
								/*Notification
										.error({
											message : '<h4><span class="glyphicon glyphicon-trash"></span>  Language deleted successfully.</h4>',
											positionX : 'center',
											delay : 2000
										});*/
								$scope.getAllLanguages();
							},function(error) {
								/*Notification.error({
									message : '<span class="glyphicon glyphicon-remove-circle"></span>'+error.data.message,
									positionX : 'center',
									delay : 2000
								});*/
							})
				});
			};	

			

		});
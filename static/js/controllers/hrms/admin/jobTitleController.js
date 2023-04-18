angular.module('srmt').controller(
		"jobTitleController",
		function($scope, $state, jobTitleService, $stateParams, Notification) {
			$scope.updateTitle = $stateParams.updateJobTitle;
			$scope.getJobTitle = $stateParams.jobTitle;
			console.log(angular.toJson($stateParams.updateJobTitle));
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
				$scope.getAllJobTitles();
			});

			$scope.getCount = function() {
				jobTitleService.getCount().then(function(response) {
					$scope.count = response.data;
					$scope.totalPages = Math.ceil($scope.count / $scope.size);
				});
			};

			/**
			 * pagination logic
			 */
			$scope.goTOjobTitleList = function() {
				$state.go('home.jobTitleList');
			};
			$scope.gotoUpdateJobTitle = function(thisupdateJobTitle) {
				console.log("asdf "+angular.toJson(thisupdateJobTitle));
				$state.go('home.updateJobTitle',{
					updateJobTitle:thisupdateJobTitle
					});
			};
			$scope.goTOAddjobTitle = function() {
				$state.go('home.addJobTitle');
			};

			$scope.addJobTitle = function() {

				console.log("title details: "
								+ angular.toJson($scope.jobTitle));
				jobTitleService.addJobTitles($scope.jobTitle).then(function(response) {
					Notification.success({
						message : '<h4><span class="glyphicon glyphicon-ok"></span>Job Title added successfully.</h4>',
						positionX: 'center',
						delay : 2000
					});
					$scope.goTOjobTitleList();
				},function(error) {
					Notification.error({
						message : '<h4><span class="glyphicon glyphicon-remove-circle"></span>'+error.data.message+'</h4>',
						positionX: 'center',
						delay : 2000
					});
				})
			};

			$scope.updateJobTitle = function() {
				jobTitleService.updateJobTitle($scope.updateTitle).then(function(response) {
					Notification.info({
						message : '<h4><span class="glyphicon glyphicon-info-sign"></span> Job Title updated successfully.</h4>',
						positionX: 'center',
						delay : 2000
					});
					$scope.goTOjobTitleList();
				},function(error) {
					Notification.error({
						message :'<h4><span class="glyphicon glyphicon-remove-circle"></span>'+error.data.message+'</h4>',
						positionX: 'center',
						delay : 2000
					});
				})
			};

			$scope.getAllJobTitles = function() {
				jobTitleService.getJobTitlesList($scope.page, $scope.size)
						.then(function(response) {
							$scope.jobTitleList = response.data;
							$scope.getCount();
						});
			};
			
			$scope.deleteJobTitle = function(id){
				jobTitleService.thisdeleteJobTitle(id).then(function(response) {
					Notification.success({
						message :'<h4><span class="glyphicon glyphicon-info-sign"></span>Deleted successfully</h4>',
						positionX: 'center',
						delay : 2000
					});
					$scope.getAllJobTitles();
				},function(error) {
					Notification.error({
						message : '<h4><span class="glyphicon glyphicon-remove-circle"></span>'+error.data.message+'</h4>',
						positionX: 'center',
						delay : 2000
					});
				})
			};
			
			$scope.viewJobTitle= function(thisjobTitle) {
				console.log("job title "+angular.toJson(thisjobTitle));
				$state.go('home.viewJobTitle', {
					jobTitle : thisjobTitle
				});
			};

		});
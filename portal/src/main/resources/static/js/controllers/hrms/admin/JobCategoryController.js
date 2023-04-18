angular
		.module('srmt')
		.controller(
				"JobCategoryController",
				function($scope, $state, jobCategoryService, $stateParams,
						Notification) {
					$scope.updateCategory = $stateParams.jobCategory;
					$scope.getJobCategory = $stateParams.viewJobCategory;
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
						$scope.getAllJobCategories();
					});

					$scope.getCount = function() {
						jobCategoryService.getCount().then(
								function(response) {
									$scope.count = response.data;
									$scope.totalPages = Math.ceil($scope.count
											/ $scope.size);
								});
					};

					/**
					 * pagination logic
					 */
					$scope.gotoAddJobCategory = function() {
						$state.go('home.addJobCategory');
					};

					$scope.gotoEditJobCategory = function(jobCategory) {
						$state.go('home.editJobCategory', {
							jobCategory : jobCategory
						});
					};

					$scope.getCount();
					$scope.gotoCategoryList = function() {
						$state.go('home.jobCategoryList');
					};

					$scope.getAllJobCategories = function() {
						jobCategoryService.getJobCategoryList($scope.page,
								$scope.size).then(function(response) {
							$scope.jobCategoryList = response.data;
							$scope.getCount();
						});
					};

					$scope.addCategory = function() {
						jobCategoryService
								.addJobCategory($scope.jobCategory)
								.then(
										function(response) {
											Notification
													.success({
														message : '<h4><span class="glyphicon glyphicon-info-sign"></span> Job Category added successfully.</h4>',
														positionX : 'center',
														delay : 2000
													});
											$scope.gotoCategoryList();
										}, function(error) {
											Notification.error({
												message : '<h4><span class="glyphicon glyphicon-remove-circle"></span>'+error.data.message+'</h4>',
												positionX : 'center',
												delay : 2000
											});
										})
					};

					$scope.deleteCategory = function(id) {
						jobCategoryService.deleteJobCategory(id)
						.then(function(response) {
									Notification.success({
										message : '<h4><span class="glyphicon glyphicon-info-sign"></span>Deleted successfully</h4>',
										positionX: 'center',
										delay : 2000
									});
									$scope.getAllJobCategories();
								},function(error) {
									Notification.error({
										message : '<h4><span class="glyphicon glyphicon-remove-circle"></span>'+error.data.message+'</h4>',
										positionX: 'center',
										delay : 2000
									});
								})
					};

					$scope.editCategory = function() {
						jobCategoryService.editJobCategory(
								$scope.updateCategory)
								.then(function(response) {
									Notification.info({
										message : '<h4><span class="glyphicon glyphicon-info-sign"></span> Job Category updated successfully.</h4>',
										positionX: 'center',
										delay : 2000
									});
									$scope.gotoCategoryList();
								},function(error) {
									Notification.error({
										message : '<h4><span class="glyphicon glyphicon-remove-circle"></span>'+error.data.message+'</h4>',
										positionX: 'center',
										delay : 2000
									});
								})
					};

					$scope.viewJobCategory = function(thisjobCategory) {
						console.log("job title "
								+ angular.toJson(thisjobCategory));
						$state.go('home.viewJobCategory', {
							viewJobCategory : thisjobCategory
						});
					};
				});
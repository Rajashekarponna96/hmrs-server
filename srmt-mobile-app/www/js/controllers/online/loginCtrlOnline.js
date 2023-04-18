function LoginCtrl($scope, $ionicPopover, $filter, $translate, $localStorage,
		$state, ModelFactory, $ionicPopup, ValidationFactory, userService,
		onlineLoginService, $cordovaNetwork, loginServiceOffline) {

	$scope.user = {};

	/*
	 * $scope.doLoginForSalesRep = function() {
	 * 
	 * console.log("$cordovaNetwork: " + angular.toJson($cordovaNetwork)); if
	 * ($cordovaNetwork != undefined && $cordovaNetwork.isOffline()) {
	 * $scope.doLoginServiceAsoffline(); } else { console.log("is online")
	 * delete $localStorage.usrCredentials; delete $localStorage.loginId;
	 * $localStorage.usrCredentials = "Basic " + btoa($scope.user.userName + ":" +
	 * $scope.user.password); $scope.doLoginServiceAsOnline(); }
	 * 
	 * $scope.doLoginServiceAsOnline(); };
	 */

	$scope.doLoginForSalesRep = function() {
		delete $localStorage.usrCredentials;
		delete $localStorage.loginId;
		$localStorage.usrCredentials = "Basic "
				+ btoa($scope.user.userName + ":" + $scope.user.password);

		onlineLoginService.doLoginForSalesRep($scope.user).then(
				function(response) {
					$localStorage.loginId = response.data.employeeId;
					$localStorage.$save();
					$scope.userData = response.data;
					console.log("success online");

					$state.go('app.dashboard');

				}, function(error) {
					alert(" online login failed");
				});
	};
	$scope.doLoginServiceAsoffline = function() {
		loginServiceOffline.getAllDocs().then(function(response) {
			if (response.rows.length > 0) {
				$state.go('app.dashboard');
			} else {
				alert("login failed");
			}
		});
	};

	$scope.goBack = function() {
		$state.go('app.dashboard');
	};

	$scope.gotoClientList = function() {
		console.log("IN client controller");
		$state.go("app.clientList");
	};
	$scope.user = ModelFactory.getModel('user');

	$scope.languages = ModelFactory.getModel('languages');
	$scope.Language = $scope.languages[0];
	$scope.usernameLabel = $filter('translate')('username');
	$scope.passwordLabel = $filter('translate')('password');

	$scope.selectLanguage = function() {
		console.log("Selected Lang: " + $scope.Language.code);
		$scope.preferredLanguage = $scope.Language;
		$translate.use($scope.Language.code);
		$scope.usernameLabel = $filter('translate')('username');
		$scope.passwordLabel = $filter('translate')('password');
	};

	$scope.isValidForm = function(user) {
		return (ValidationFactory.hasValue(user.username) && ValidationFactory
				.hasValue(user.password));
	};

}
srmtApp.controller('LoginCtrl', LoginCtrl);
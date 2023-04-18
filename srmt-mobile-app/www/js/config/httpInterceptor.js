srmtApp.config(function($httpProvider) {
	$httpProvider.interceptors.push(function($q, $injector, $localStorage) {

		return {
			request : function(request) {
				request.headers.authorization = $localStorage.usrCredentials;
				
				
				return request;
			},
			responseError : function(rejection) {

				if (rejection.status === 401) {
					console.log("Invalid credentials...");
					$injector.get('$state').transitionTo('login');
				}
				return $q.reject(rejection);
			},

			response : function(response) {
				return response;
			},
		};
	});
});

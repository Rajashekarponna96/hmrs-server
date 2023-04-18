srmtApp.service('ToastService',
 		function($rootScope, $timeout, $ionicPopup, $cordovaToast) {
			this.show = function(message, duration, position) {
				message = message || "There was a problem...";
				duration = duration || 'short';
				position = position || 'top';

				if (!!window.plugins) {
					// Use the Cordova Toast plugin
					$cordovaToast.show(message, duration, position);
				} else {
					if (duration == 'short') {
						duration = 2000;
					} else {
						duration = 5000;
					}

					var myPopup = $ionicPopup.show({
						template : "<div class='toast'>" + message + "</div>",
						scope : $rootScope,
						buttons : []
					});

					$timeout(function() {
						myPopup.close();
					}, duration);
				}
			};
		});
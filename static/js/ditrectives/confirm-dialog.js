angular.module('srmt').directive('confirmClick', ['$q', 'dialogModal', function($q, dialogModal) {
      return {
          link: function (scope, element, attrs) {
              // ngClick won't wait for our modal confirmation window to resolve,
              // so we will grab the other values in the ngClick attribute, which
              // will continue after the modal resolves.
              // modify the confirmClick() action so we don't perform it again
              // looks for either confirmClick() or confirmClick('are you sure?')
              var ngClick = attrs.ngClick.replace('confirmClick()', 'true')
                  .replace('confirmClick(', 'confirmClick(true,');

              // setup a confirmation action on the scope
              scope.confirmClick = function(msg) {
                  // if the msg was set to true, then return it (this is a workaround to make our dialog work)
                  if (msg===true) {
                      return true;
                  }
                  // msg can be passed directly to confirmClick('are you sure?') in ng-click
                  // or through the confirm-click attribute on the <a confirm-click="Are you sure?"></a>
                  msg = msg || attrs.confirmClick || 'Are you sure?';
                  // open a dialog modal, and then continue ngClick actions if it's confirmed
                  dialogModal(msg).result.then(function() {
                      scope.$eval(ngClick);
                  });
                  // return false to stop the current ng-click flow and wait for our modal answer
                  return false;
              };
          }
      }
  }])
.service('dialogModal', ['$modal', function($modal) {
      return function (message, title, okButton, cancelButton) {
          // setup default values for buttons
          // if a button value is set to false, then that button won't be included
          okButton = okButton===false ? false : (okButton || 'Confirm');
          cancelButton = cancelButton===false ? false : (cancelButton || 'Cancel');

          // setup the Controller to watch the click
          var ModalInstanceCtrl = function ($scope, $modalInstance, settings) {
              // add settings to scope
              angular.extend($scope, settings);
              // ok button clicked
              $scope.ok = function () {
                  $modalInstance.close(true);
              };
              // cancel button clicked
              $scope.cancel = function () {
                  $modalInstance.dismiss('cancel');
              };
          };

          // open modal and return the instance (which will resolve the promise on ok/cancel clicks)
          var modalInstance = $modal.open({
              template: '<div class="dialog-modal"> \
                  <div class="modal-header" ng-show="modalTitle"> \
                      <h3 class="modal-title">{{modalTitle}}</h3> \
                  </div> \
                  <div class="modal-body">{{modalBody}}</div> \
                  <div class="modal-footer"> \
                      <button class="btn btn-primary" ng-click="ok()" ng-show="okButton">{{okButton}}</button> \
                      <button class="btn btn-warning" ng-click="cancel()" ng-show="cancelButton">{{cancelButton}}</button> \
                  </div> \
              </div>',
              controller: ModalInstanceCtrl,
              resolve: {
                  settings: function() {
                      return {
                          modalTitle: title,
                          modalBody: message,
                          okButton: okButton,
                          cancelButton: cancelButton
                      };
                  }
              }
          });
          // return the modal instance
          return modalInstance;
      }
  }])
    
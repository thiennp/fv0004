'use strict';
kuvenoApp
	.controller('ModalCtrl', [
		'$rootScope',
		'$scope',
		'$modalInstance',
		function ($rootScope, $scope, $modalInstance) {
			$scope.close = function () {
				$modalInstance.dismiss('cancel');
			};
			$scope.send = function (type) {
				$modalInstance.dismiss('cancel');
			};
			$scope.addTinyMCETask = function () {
				if ($scope.addedTaskDescription === '') {
					$rootScope.$broadcast('removeTinyMCETask' + $rootScope.taskModalId);
				} else {
					$rootScope.addedTaskDescription = $scope.addedTaskDescription;
					$rootScope.addedTaskOwner = $scope.addedTaskOwner;
					$rootScope.addedTaskDuedate = moment($scope.addedTaskDuedate).format('DD/MM/YYYY');
					$rootScope.$broadcast('addTinyMCETask' + $rootScope.taskModalId);
				}
				$modalInstance.dismiss('cancel');
			};
		}
	]);
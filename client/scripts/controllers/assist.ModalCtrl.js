'use strict';
kuvenoApp
	.controller('ModalCtrl', [
		'$scope', '$modalInstance',
		function ($scope, $modalInstance) {
			$scope.close = function () {
				$modalInstance.dismiss('cancel');
			};
			$scope.send = function (type) {
				console.log(type);
				$modalInstance.dismiss('cancel');
			};
		}
	]);
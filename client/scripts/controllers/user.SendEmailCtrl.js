'use strict';
kuvenoApp
	.controller('SendEmailCtrl', [
		'$rootScope',
		'$scope',
		'AuthSrv',
		'DataSrv',
		'UserSrv',
		function ($rootScope, $scope, AuthSrv, DataSrv, UserSrv) {
			AuthSrv.verify().then(function (data) {
				if (data) {
					if ($rootScope.onBack) {
						$rootScope.onBack = false;
					} else {
						$rootScope.$stateHistory.push('user.SendEmail');
					}
					DataSrv.getData('User').then(function (result) {
						$rootScope.userWithEmail = [];
						for (var i in result) {
							if (result[i].email) {
								$rootScope.userWithEmail.push(result[i]);
							}
						}
						$rootScope.sendEmailTo = [];
						$rootScope.sendEmailCC = [];
						$rootScope.sendEmailBCC = [];
					});
				}
			});
			$scope.sendEmail = function () {
				var emailTo = [],
					emailCC = [],
					emailBCC = [],
					i;
				console.log($rootScope.sendEmailTo);
				for (i in $rootScope.sendEmailTo) {
					emailTo.push({
						'name': $rootScope.sendEmailTo[i].name,
						'email': $rootScope.sendEmailTo[i].email
					});
				}
				for (i in $rootScope.sendEmailCC) {
					emailCC.push({
						'name': $rootScope.sendEmailCC[i].name,
						'email': $rootScope.sendEmailCC[i].email
					});
				}
				for (i in $rootScope.sendEmailBCC) {
					emailBCC.push({
						'name': $rootScope.sendEmailBCC[i].name,
						'email': $rootScope.sendEmailBCC[i].email
					});
				}
				UserSrv.sendEmail(emailTo, emailCC, emailBCC, $scope.subject, $scope.content).then(function (data) {
					if (data) {
						$scope.success = true;
						$rootScope.sendEmailTo = [];
						$rootScope.sendEmailCC = [];
						$rootScope.sendEmailBCC = [];
						$rootScope.EmailTo = [];
						$rootScope.EmailCC = [];
						$rootScope.EmailBCC = [];
						$scope.subject = '';
						$scope.content = '';
					} else {
						$scope.error = true;
					}
				});
			};
		}
	]);
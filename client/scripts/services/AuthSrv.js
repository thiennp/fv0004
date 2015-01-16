'use strict';
kuvenoApp
	.factory('AuthSrv', [
		'$http',
		'$location',
		'$q',
		'$rootScope',
		'$state',
		'AssistSrv',
		'Facebook',
		'KuvenoUser',
		'LoggerSrv',
		'Meeting',
		'Organization',
		'Task',
		'Workgroup',
		function ($http, $location, $q, $rootScope, $state, AssistSrv, Facebook, KuvenoUser, LoggerSrv, Meeting, Organization, Task, Workgroup) {
			return {
				login: function (user) {
					var defer = $q.defer(),
						_self = this;
					KuvenoUser.login(user).$promise
						.catch(function (data) {
							defer.resolve({
								'error': true,
								'errorMessage': data.statusText
							});
						})
						.then(function (data) {
							var status = {
								'error': false,
								'errorMessage': ''
							};
							if (data) {
								if (data.user) {
									$rootScope.me = data.user;
									localStorage.setItem('user_id', $rootScope.me.id);
									localStorage.setItem('user_email', $rootScope.me.email);
									localStorage.setItem('user_firstname', $rootScope.me.firstname);
									localStorage.setItem('user_lastname', $rootScope.me.lastname);
									localStorage.setItem('user_title', $rootScope.me.title);
									_self.verify();
								} else {
									status = {
										'error': true,
										'errorMessage': 'Email or password is not correct'
									};
								}
							} else {
								status = {
									'error': true,
									'errorMessage': 'Network error'
								};
							}
							defer.resolve(status);
						});
					return defer.promise;
				},
				logout: function (user) {
					localStorage.removeItem('user_id');
					localStorage.removeItem('user_facebook_id');
					localStorage.removeItem('user_firstname');
					localStorage.removeItem('user_lastname');
					localStorage.removeItem('user_link');
					localStorage.removeItem('user_locale');
					localStorage.removeItem('user_name');
					localStorage.removeItem('user_timezone');
					localStorage.removeItem('user_updated_time');
					localStorage.removeItem('user_verified');
					localStorage.removeItem('user_avatar');
					localStorage.removeItem('user_country');
					localStorage.removeItem('user_email');
					localStorage.removeItem('user_title');
					$rootScope.me = {};
					var defer = $q.defer();
					KuvenoUser.logout().$promise
						.catch(function () {
							defer.resolve();
						})
						.then(function () {
							defer.resolve();
						});
					return defer.promise;
				},
				verify: function () {
					var defer = $q.defer();
					if ($rootScope.verified) {
						defer.resolve(true);
					} else {
						if (localStorage.user_id === void 0) {
							$rootScope.verified = true;
							defer.resolve(false);
							$state.go('auth.SignIn');
						} else {
							$rootScope.me = this.getUserData();
							var queryAll = function () {
									var meetingPromise = Meeting.findAll().$promise,
										taskCollection = Task.findAll().$promise,
										workgroupCollection = Workgroup.findAll().$promise;
									return $q.all([meetingPromise, taskCollection, workgroupCollection]);
								},

								taskStatus = function (task) {
									var completed = 0,
										overdue = 0;
									if (task.isCompleted) {
										completed = 1;
									} else {
										if (moment().diff(task.dueDate) > 0) {
											overdue = 1;
											$rootScope.overdueTaskList.push(task);
										}
									}
									return {
										'completed': completed,
										'overdue': overdue
									};
								};

							queryAll().then(function (data) {
								$rootScope.assignedTasks = 0;
								$rootScope.ownedTasks = 0;
								$rootScope.completedTasks = 0;
								$rootScope.overdueTasks = 0;
								$rootScope.meetingInvolved = 0;
								$rootScope.meetingComing = 0;
								$rootScope.groupInvolved = 0;
								$rootScope.organizationInvolved = 0;
								$rootScope.overdueTaskList = [];
								$rootScope.comingMeetingList = [];
								data[0].meetings.forEach(function (meeting) {
									if (moment().diff(meeting.meetingTime) > 0) {
										$rootScope.meetingInvolved++;
									} else {
										$rootScope.meetingComing++;
										$rootScope.comingMeetingList.push(meeting);
									}
								});
								data[1].tasks.forEach(function (task) {
									var status = taskStatus(task);
									$rootScope.overdueTasks += status.overdue;
									$rootScope.completedTasks += status.completed;
								});
								$rootScope.groupInvolved = data[2].workgroups.length;
							});
							$rootScope.verified = true;
							defer.resolve(true);
						}
					}
					return defer.promise;
				},
				verifyAuthen: function () {
					var _self = this;
					this.verify().then(function () {
						if (localStorage.user_id !== void 0) {
							$rootScope.me = _self.getUserData();
							if (localStorage.user_firstname && localStorage.user_lastname) {
								$location.path('#/user/profile');
							} else {
								$location.path('#/user/profile_update');
							}
						}
					});
				},
				facebookLogin: function () {
					var getFacebookInformation, storeUser;
					storeUser = function (response) {
						var defer = $q.defer();
						$rootScope.me = response;
						AssistSrv.localeToCountry(response.locale).then(function (data) {
							localStorage.setItem('user_facebook_id', response.id);
							localStorage.setItem('user_firstname', response.first_name);
							localStorage.setItem('user_lastname', response.last_name);
							localStorage.setItem('user_link', response.link);
							localStorage.setItem('user_locale', response.locale);
							localStorage.setItem('user_name', response.name);
							localStorage.setItem('user_timezone', response.timezone);
							localStorage.setItem('user_updated_time', response.updated_time);
							localStorage.setItem('user_verified', response.verified);
							localStorage.setItem('user_avatar', 'http://graph.facebook.com/' + response.id + '/picture');
							localStorage.setItem('user_country', data);
							$rootScope.me.country = localStorage.getItem('user_country');
							$rootScope.me.picture = localStorage.getItem('user_picture');
							defer.resolve($rootScope.user);
						});
						return defer.promise;
					};
					getFacebookInformation = function () {
						return Facebook.api('/me', function (response) {
							// var newUser = $wakanda.$ds.User.signUpNewFBUser(response.id);
							// $wakanda.$login(response.id, 'FB-login').then(function (data) {
							// 	if (data.result) {
							// 		$wakanda.$currentUser().then(function (user) {
							// 			var currentUser = $wakanda.$ds.User.$findOne(user.result.ID);
							// 			currentUser.$promise.then(function () {
							// 				localStorage.setItem('user_id', user.ID);
							// 				localStorage.setItem('user_email', user.email);
							// 				localStorage.setItem('user_title', user.title);
							// 				storeUser(response);
							// 				$state.go('user.Profile');
							// 			});
							// 		});
							// 	} else {
							// 		console.log(data);
							// 	}
							// });
						});
					};
					Facebook.getLoginStatus(function (response) {
						if (response.status === 'connected') {
							$rootScope.loggedIn = true;
						} else {
							$rootScope.loggedIn = false;
						}
						if ($rootScope.loggedIn === false) {
							Facebook.login(function (response) {
								if (response.status === 'connected') {
									$rootScope.loggedIn = true;
								} else {
									$rootScope.loggedIn = false;
								}
								if ($rootScope.loggedIn) {
									getFacebookInformation();
								} else {
									$rootScope.facebookLoginError = true;
								}
							});
						} else {
							getFacebookInformation();
						}
					});
				},
				checkPassword: function (password) {
					var defer = $q.defer();
					if (!localStorage.getItem('user_facebook_id')) {
						var user = {
							'email': localStorage.getItem('user_email'),
							'password': password
						};
						this.login(user).then(function (data) {
							defer.resolve(true);
						});
					} else {
						defer.resolve(true);
					}
					return defer.promise;
				},
				changePassword: function (password) {
					var defer = $q.defer();
					$rootScope.me.password = password;
					KuvenoUser.upsert($rootScope.me).$promise
						.catch(function () {
							LoggerSrv.logError('Error changing password');
							defer.resolve(false);
						})
						.then(function () {
							LoggerSrv.logError('Password changed successfully');
							defer.resolve(true);
						});
					return defer.promise;
				},
				getUserData: function () {
					var user = {
						'id': Number(localStorage.getItem('user_id')),
						'email': localStorage.getItem('user_email'),
						'title': localStorage.getItem('user_title'),
						'facebook_id': localStorage.getItem('user_facebook_id'),
						'firstname': localStorage.getItem('user_firstname'),
						'lastname': localStorage.getItem('user_lastname'),
						'link': localStorage.getItem('user_link'),
						'locale': localStorage.getItem('user_locale'),
						'name': localStorage.getItem('user_name'),
						'timezone': localStorage.getItem('user_timezone'),
						'updated_time': localStorage.getItem('user_updated_time'),
						'verified': localStorage.getItem('user_verified'),
						'avatar': localStorage.getItem('user_avatar'),
						'country': localStorage.getItem('user_country')
					};
					if (!user.avatar) {
						user.avatar = '/images/profile.png';
					}
					return user;
				}
			};
		}
	]);
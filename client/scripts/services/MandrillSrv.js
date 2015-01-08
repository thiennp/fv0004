'use strict';
kuvenoApp
	.factory('MandrillSrv', [
		'$q',
		function ($q) {
			return {
				// Send a new transactional message through Mandrill
				sendEmail: function (from_name, from_email, to, subject, html) {
					var defer = $q.defer(),
						m = new mandrill.Mandrill('lRyT8NnWtGkotN35IfqOKg', true);
					m.call('messages/send', {
						'key': 'lRyT8NnWtGkotN35IfqOKg',
						'message': {
							'html': html,
							'subject': subject,
							'from_email': from_email,
							'from_name': from_name,
							'to': to
						}
					}, function (data) {
						return defer.resolve(data);
					}, function (data) {
						console.log(data);
						return defer.reject(data);
					});
					return defer.promise;
				},
				// Return the senders that have tried to use this account, both verified and unverified
				listSender: function () {
					var defer = $q.defer(),
						m = new mandrill.Mandrill('lRyT8NnWtGkotN35IfqOKg', true);
					m.call('users/senders', {
						'key': 'lRyT8NnWtGkotN35IfqOKg'
					}, function (data) {
						return defer.resolve(data);
					}, function (data) {
						console.log(data);
						return defer.reject(data);
					});
					return defer.promise;
				}
			};
		}
	]);
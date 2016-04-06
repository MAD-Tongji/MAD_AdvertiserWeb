(function() {
  'use strict';

  angular
    .module('mad')
    .config(routerConfig);

  /** @ngInject */
  function routerConfig($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/');

    $stateProvider
      .state('app', {
        url: '/',
        views: {
            'header': {
                templateUrl: 'app/components/navbar-advert/navbar-advert.html',
                controller: 'HeaderCtrl'
            },
            'content': {
                templateUrl: 'app/main/main.html',
                controller: 'MainCtrl'
            },
            'footer': {
              templateUrl: 'app/components/footer-advert/footer-advert.html',
              controller: 'FooterCtrl'
            }
        }
      })
      .state('app.advert', {
        url: 'advert',
        views: {
            'content@': {
                templateUrl: 'app/advertisment/advertisment.html',
                controller: 'AdvertCtrl'
            }
        }
      })
      .state('app.advert.modify', {
        url: '/modify',
        views: {
            'content@': {
                templateUrl: 'app/advert-modify/advert-modify.html',
                controller: 'AdvertModifyCtrl'
            }
        }
      })
      .state('app.advert.detail', {
        url: '/detail',
        views: {
            'content@': {
                templateUrl: 'app/advert-detail/advert-detail.html',
                controller: 'AdvertDetailCtrl'
            }
        }
      })
      .state('app.advert.push', {
        url: '/push',
        views: {
            'content@': {
                templateUrl: 'app/advert-push/advert-push.html',
                controller: 'AdvertPushCtrl'
            }
        }
      })
      .state('app.account', {
          url: 'account',
          views: {
              'content@': {
                  templateUrl: 'app/account/account.html',
                  controller: 'AccountCtrl'
              }
          }
      })
      .state('app.account.recharge', {
          url: '/recharge',
          views: {
              'content@': {
                  templateUrl: 'app/account-recharge/account-recharge.html',
                  controller: 'AccountRechargeCtrl'
              }
          }
      })
      .state('app.account.refund', {
          url: '/refund',
          views: {
              'content@': {
                  templateUrl: 'app/account-refund/account-refund.html',
                  controller: 'AccountRefundCtrl'
              }
          }
      })
      .state('app.account.check', {
          url: '/check',
          views: {
              'content@': {
                  templateUrl: 'app/account-check/account-check.html',
                  controller: 'AccountCheckCtrl'
              }
          }
      })
      .state('app.statistics', {
          url: 'statistics',
          views: {
              'content@': {
                  templateUrl: 'app/statistics/statistics.html',
                  controller: 'AdvertSatisticsCtrl'
              }
          }
      })
      .state('app.statistics.detail', {
          url: '/detail',
          views: {
              'content@': {
                  templateUrl: 'app/statistics-detail/statistics-detail.html',
                  controller: 'SatisticsDetailCtrl'
              }
          }
      })
      .state('app.notification', {
          url: 'notification',
          views: {
              'content@': {
                  templateUrl: 'app/notification/notification.html',
                  controller: 'NotificationCtrl'
              }
          }
      })
      .state('app.login', {
          url: 'login',
          views: {
              'header@': {
                  templateUrl: 'app/components/navbar/navbar.html'
              },
              'content@': {
                  templateUrl: 'app/login/login.html'
              },
              'footer@': {
                  templateUrl: 'app/components/footer-advert/footer-advert.html',
                  controller: 'FooterCtrl'
              }
          }
      })
      .state('app.signup', {
          url: 'signup',
          views: {
              'header@': {
                  templateUrl: 'app/components/navbar/navbar.html'
              },
              'content@': {
                  templateUrl: 'app/signup/signup.html'
              },
              'footer@': {
                  templateUrl: 'app/components/footer-advert/footer-advert.html',
                  controller: 'FooterCtrl'
              }
          }
      });
  }

})();

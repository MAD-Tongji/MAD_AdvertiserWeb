(function() {
  'use strict';

  angular
    .module('mad')
    .factory('NoticeSrv', NoticeSrv);

  /** @ngInject */
  function NoticeSrv($compile, $timeout, $rootScope) {
    var notification = {};

  notification.timer = null;
  notification.__alert__ = function(css, title, text) {
    var template = ['<div class="notice fixed alert alert-dismissible ',
                      css,
                      '">',
                      '<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>',
                      '<strong>',
                      title,
                      '</strong>',
                      text,
                      '</div>'].join('');
    if (angular.element(document).find('.notice')) {
      angular.element(document).find('.notice').remove();
    }
    if (this.timer) {
      $timeout.cancel(this.timer);
    }
    angular.element(document).find('body').append($compile(template)($rootScope));
    this.timer = $timeout(function() {
      angular.element(document).find('.notice').remove();
    }, 5000);
  };

  notification.success = function(text) {
    this.__alert__('alert-success', '成功: ', text);
  };

  notification.error = function(text) {
    this.__alert__('alert-danger', '错误: ', text);

  };

  notification.notice = function(text) {
    this.__alert__('alert-info', '提示: ', text);
  };

  return notification;
    
    
  }
})();

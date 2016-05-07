(function() {
  'use strict';

  angular
    .module('mad')
    .factory('myInterceptor', myInterceptor);

  /** @ngInject */
  function myInterceptor($rootScope, $injector, TokenSrv, baseURL) {
    //   console.log('helloworld');
    var myInterceptor = {
                request: function (config) {
                    // 通过配置拦截器在发送请求前注入token
                    if (arguments[0].url.indexOf(baseURL) !== -1) {
                        if (arguments[0].method === 'GET' || arguments[0].method === 'DELETE' || arguments[0].method === 'OPTIONS') {
                            arguments[0].params = arguments[0].params || {};
                            // console.log(arguments);
                            arguments[0].params.token = TokenSrv.getToken();
                        }
                        if (arguments[0].method === 'POST' || arguments[0].method === 'PUT') {
                            arguments[0].data = arguments[0].data || {};
                            arguments[0].data.token = TokenSrv.getToken();
                        }
                    }

                    // 必须用过injector注入$state,  不然会有BUG,
                    // 详见http://stackoverflow.com/questions/20230691/injecting-state-ui-router-into-http-interceptor-causes-circular-dependency
                    var $state = $injector.get('$state');
                    // 不在登陆页面且未登陆
                    // console.log($state.current.url);
                    // if ( !$rootScope.logined && ($state.current.url !== '\\' && $state.current.url !== '^')) {
                    //     $injector.get('$state').go('login');
                    // }
                    // if (!token.getToken()) {
                    //     window.location.href = '#/login';
                    // }
                    return config;
                },
                response: function (response) {
                  // response.data.errCode === 101
                  // response.errCode = 101
                    if (response.data.errCode === 101) {
                        $injector.get('NoticeSrv').notice($injector.get('ErrorSrv').getError(response.data.errCode + ""));
                        window.location.href = '#/login';
                    }
                    if (response.data.errCode && response.data.errCode !== 0) {
                        $injector.get('NoticeSrv').error($injector.get('ErrorSrv').getError(response.data.errCode + ""));
                        console.log(response);
                    }


                    return response;
                }
            };
            return myInterceptor;
  }
})();

    

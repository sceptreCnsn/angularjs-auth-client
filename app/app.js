(function() {
  angular
    .module('app', ['auth0.auth0', 'ui.router', 'angular-jwt'])
    .config(config);

  config.$inject = [
    '$stateProvider',
    '$locationProvider',
    '$urlRouterProvider',
    '$httpProvider',
    'angularAuth0Provider',
    'jwtOptionsProvider'
  ];

  function config(
    $stateProvider,
    $locationProvider,
    $urlRouterProvider,
    $httpProvider,
    angularAuth0Provider,
    jwtOptionsProvider
  ) {
    $stateProvider
      .state('home', {
        url: '/',
        controller: 'HomeController',
        templateUrl: 'app/home/home.html',
        controllerAs: 'vm'
      })
      .state('callback', {
        url: '/callback',
        controller: 'CallbackController',
        templateUrl: 'app/callback/callback.html',
        controllerAs: 'vm'
      })
      .state('profile', {
        url: '/profile',
        controller: 'ProfileController',
        templateUrl: 'app/profile/profile.html',
        controllerAs: 'vm'
      });

    angularAuth0Provider.init({
      clientID: 'jQUyT0Jsh6fw70B4zWtxHHhvQfvFOZgH',
      domain: 'cnsnmms.auth0.com',
      responseType: 'token id_token',
      redirectUri: 'http://localhost:3000/callback',
      scope: 'openid profile',
      audience: 'https://cnsnmms.com/api'
    });

    jwtOptionsProvider.config({
      tokenGetter: function() {
        return localStorage.getItem('access_token');
      },
      whiteListedDomains: ['localhost']
    });

    $httpProvider.interceptors.push('jwtInterceptor');

    $urlRouterProvider.otherwise('/');

    $locationProvider.hashPrefix('');

    $locationProvider.html5Mode(true);
  }
})();

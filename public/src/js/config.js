'use strict';

// Setting up routes
angular.module('cryptichain').config(function ($routeProvider) {
    $routeProvider.
    when('/block/:blockId', {
        templateUrl: '/views/block.html',
        title: 'Block '
    }).
    when('/block-index/:blockHeight', {
        controller: 'BlocksController',
        templateUrl: '/views/redirect.html'
    }).
    when('/tx/:txId/:v_type?/:v_index?', {
        templateUrl: '/views/transaction.html',
        title: 'Transaction '
    }).
    when('/', {
        templateUrl: '/views/index.html',
        title: 'Home'
    }).
    when('/blocks', {
        templateUrl: '/views/block_list.html',
        title: 'Blocks List'
    }).
    when('/blocks-date/:blockDate?', {
        templateUrl: '/views/block_list.html',
        title: 'Blocks List'
    }).
    when('/address/:address', {
        templateUrl: '/views/address.html',
        title: 'Address'
    })
    .when("/activityGraph", {
        templateUrl : "/views/activityGraph.html",
        title: "Activity Graph"
    })
    .when("/topAccounts", {
        templateUrl : "/views/topAccounts.html",
        title: "Top Accounts"
    })
    .when("/networkMonitor", {
        templateUrl : "/views/networkMonitor.html",
        title: "Network Monitor"
    })
    .otherwise({
        templateUrl: '/views/404.html',
        title: 'Error'
    });
});

// Setting HTML5 location mode
angular.module('cryptichain')
  .config(function ($locationProvider) {
      $locationProvider.html5Mode(true);
      $locationProvider.hashPrefix('!');
  })
  .run(function ($rootScope, $route, $location, $routeParams, $anchorScroll, ngProgress, gettextCatalog) {
      gettextCatalog.currentLanguage = 'en';
      $rootScope.$on('$routeChangeStart', function () {
          ngProgress.start();
      });

      $rootScope.$on('$routeChangeSuccess', function () {
          ngProgress.complete();

          // Change page title, based on route information
          $rootScope.titleDetail = '';
          $rootScope.title = $route.current.title;
          $rootScope.isCollapsed = true;
          $rootScope.currentAddr = null;

          $location.hash($routeParams.scrollTo);
          $anchorScroll();
      });
  });

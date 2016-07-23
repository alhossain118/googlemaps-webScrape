'use strict';

var app = angular.module('myApp', ['ui.router', 'satellizer', 'btford.socket-io', 'uiGmapgoogle-maps'])
  .config(
    ['uiGmapGoogleMapApiProvider', function(GoogleMapApiProviders) {
        GoogleMapApiProviders.configure({
            china: true
        });
    }]
  )
  .config(function(uiGmapGoogleMapApiProvider) {
    uiGmapGoogleMapApiProvider.configure({
        key: 'process.env.MAPS_SECRET',
        v: '3.20', //defaults to latest 3.X anyhow
        libraries: 'weather,geometry,visualization'
    });
})

app.run(function($rootScope, User) {
  $rootScope.currentUser = {};
  User.setCurrent();
});

app.config(function($authProvider) {
  $authProvider.loginUrl = '/api/users/login';
  $authProvider.signupUrl = '/api/users/signup';

  $authProvider.facebook({
    clientId: '638147416343689',
    url: '/api/users/facebook'
  });
});

app.config(function($stateProvider, $urlRouterProvider) {

  $stateProvider
    .state('home', { url: '/', templateUrl: '/html/home.html' })
    .state('login', {
      url: '/login',
      templateUrl: '/html/login.html',
      controller: 'loginCtrl'
    })
    .state('register', {
      url: '/register',
      templateUrl: '/html/register.html',
      controller: 'registerCtrl'
    })
    .state('profile', {
      url: '/profile',
      templateUrl: '/html/profile.html',
      controller: 'profileCtrl',
      resolve: {
        Profile: function(User) {
          return User.getProfile();
        }
      }
    })
    .state('users', {
      url: '/users',
      templateUrl: '/html/users.html',
      controller: 'usersCtrl',
      resolve: {
        Users: function(User) {
          return User.getAll();
        }
      }
    })
    .state('searchMaps', {
      url: '/searchMaps',
      templateUrl: '/html/searchMaps.html',
      controller: 'searchMapsCtrl'
    })
    .state('searchMapsGoogleMaps', {
      url: '/searchMapsGoogleMaps/:latitudeId/maps/:longitudeId',
      templateUrl: '/html/searchMapsGoogleMaps.html',
      controller: 'searchMapsGoogleMapsCtrl'
    })

  $urlRouterProvider.otherwise('/');
});

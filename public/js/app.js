angular.module('yesOrNo', []).config(function($locationProvider, $urlRouterProvider){

  $locationProvider.html5Mode(true);
  $urlRouterProvider.otherwise('/')


})

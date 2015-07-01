// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var todoApp = angular.module('starter', ['ionic'])

todoApp.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
});


todoApp.config(function ($stateProvider,$urlRouterProvider) {
    $stateProvider
      .state('tab',{
        url: '/tab',
        abstract: true,
        cache:false,
        templateUrl: "templates/tabs.html"
      })
      
      .state('tab.list',{
        url: '/list',
        views:{
          'tab-list':{
            templateUrl: 'templates/list.html',
            cache:false,
            controller: 'GetAllController'
          }
        }
      })
      
      .state('tab.create',{
        url: '/create',
        views:{
          'tab-create':{
            templateUrl: 'templates/create.html',
            cache:false,
            controller: 'CreateTaskController'
          }
        }
      })



      $urlRouterProvider.otherwise('/tab/list');
      // .state(,)

})

todoApp.controller("CreateTaskController",function ($scope,$state) {
  // body...

  $scope.todo = new TODO();
  $scope.title = "";
  $scope.description = "";
  $scope.save = function () {
    // body...
    $scope.todo.save($scope.title,$scope.description);
    $state.go('tab.list');
  }

});

todoApp.controller("GetAllController",function  ($scope,$state) {
  // body...
  // $ionicHistory.clearCache().then(function(){ $state.go('tab.list')}
  // console.log("asdasd");
  
  $scope.todo = new TODO();
  $scope.tasks = new Array();
  $scope.tasks = $scope.todo.get('list');  
  $scope.moveItem = function (task,fromIndex,toIndex) {
    // body...
    $scope.tasks.splice(fromIndex,1);
    $scope.tasks.splice(toIndex,0,task);
  
  }

  $scope.delete = function (task) {
    // body...
    $scope.tasks.splice($scope.tasks.indexOf(task),1);
    $scope.todo.delete(task.id);
  }

});

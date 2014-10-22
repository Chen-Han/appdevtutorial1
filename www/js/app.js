/*
  Local Storage Code (Use as is)
*/
angular.module('ionic.utils', [])
.factory('$localstorage', ['$window', function($window) {
  return {
    set: function(key, value) {
      $window.localStorage[key] = value;
    },
    get: function(key, defaultValue) {
      return $window.localStorage[key] || defaultValue;
    },
    setObject: function(key, value) {
      $window.localStorage[key] = JSON.stringify(value);
    },
    getObject: function(key, defaultValue) {
      return JSON.parse($window.localStorage[key] || JSON.stringify(defaultValue));
    }
  }
}]);

/*
  Ionic default stuff
*/
angular.module('App', ['ionic','ngSanitize', 'ionic.utils'])

.run(function ($ionicPlatform, $localstorage) {
  $ionicPlatform.ready(function () {
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if (window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

/*
  Main controller
*/
.controller('MainCtrl', ['$scope', '$localstorage', function ($scope,$localstorage) {
  $scope.variable = $localstorage.get ('variable', 4);
  $scope.fields = $localstorage.getObject('fields', {
    a: {text: '', state:true},
    b: {text: ''}
  });
  $scope.output = "";
  $scope.$watch('fields', function (fields) {
    console.log('"fields": ' + JSON.stringify(fields, null, '\t'));
  }, true);
  $scope.save = function () {
    $localstorage.setObject('fields', $scope.fields);
  };
}]);
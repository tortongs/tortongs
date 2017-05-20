angular
  .module('app')
  .controller('PreferencesCtrl', function($scope) {
    var settings = require('electron-settings');

    $scope.preferences = settings.get('preferences');

    //Auto save the preferences on change
    $scope.$watch("preferences", function(){
      settings.set('preferences', $scope.preferences);
    }, true);

  });

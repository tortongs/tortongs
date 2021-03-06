// Global configuration

// Electron
var app = require('electron').remote.app;
var path = require('path');

// Database
var Datastore = require('nedb');
var db = new Datastore({ filename: app.getPath('userData') + path.sep + 'tortongs.db', autoload: true });
db.ensureIndex({ fieldName: 'magnet', unique: true }, function (err) {
  // If there was an error, err is not null
});

(function () {
    'use strict';

    var app = angular.module(
        'app',
        [
            'ngRoute',
            'ngMaterial',
            'ngAnimate'
        ]
    );
    app.config(
        [
            '$routeProvider',
            function ($routeProvider) {
                $routeProvider
                  .when('/', {
                        templateUrl: './scripts/home/home.html',
                        controller: 'HomeCtrl'
                    })
                  .when('/preferences', {
                        templateUrl: './scripts/preferences/preferences.html',
                        controller: 'PreferencesCtrl'
                    })
                  .otherwise({redirectTo: '/'});
            }
        ]
    );

    app.run(['$location', '$timeout', '$rootScope', '$mdSidenav', function($location, $timeout, $rootScope, $mdSidenav){
      // Module automatically included (only) in the Renderer process (Electron)
      //noinspection NodeRequireContents
      var remote = require('electron').remote;
      var Menu = remote.Menu;

      function buildToggler(navID) {
            return function() {
                // Component lookup should always be available since we are not using `ng-if`
                $mdSidenav(navID)
                .toggle();
            }
        };

        $rootScope.isMenuOpen = function(){
            return $mdSidenav('left').isOpen();
        };

      $rootScope.toggleLeft = buildToggler('left');
      

      var template = [
          {
              label: 'App',
              submenu: [
                  {
                      label: 'Home',
                      accelerator: 'CmdOrCtrl+H',
                      click: function() {
                          $timeout(function(){
                            $location.path('/');
                          });
                      }
                  },
                  {
                      label: 'Preferences',
                      accelerator: 'CmdOrCtrl+P',
                      click: function() {
                          $timeout(function(){
                            $location.path('/preferences');
                          });
                      }
                  },
                  {
                      label: 'Exit',
                      accelerator: 'CmdOrCtrl+Q',
                      role: 'close'
                  }
              ]
          },
          {
              label: 'Dev',
              submenu: [
                  {
                      label: 'Reload',
                      accelerator: 'CmdOrCtrl+R',
                      click: function(item, focusedWindow) {
                          if (focusedWindow)
                              focusedWindow.reload();
                      }
                  },
                  {
                      label: 'Toggle Full Screen',
                      accelerator: (function() {
                          if (process.platform == 'darwin')
                              return 'Ctrl+Command+F';
                          else
                              return 'F11';
                      })(),
                      click: function(item, focusedWindow) {
                          if (focusedWindow)
                              focusedWindow.setFullScreen(!focusedWindow.isFullScreen());
                      }
                  },
                  {
                      label: 'Toggle Developer Tools',
                      accelerator: (function() {
                          if (process.platform == 'darwin')
                              return 'Alt+Command+I';
                          else
                              return 'Ctrl+Shift+I';
                      })(),
                      click: function(item, focusedWindow) {
                          if (focusedWindow)
                              focusedWindow.toggleDevTools();
                      }
                  }
              ]
          }
      ];

      var menu = Menu.buildFromTemplate(template);
      Menu.setApplicationMenu(menu);
    }]);
})();

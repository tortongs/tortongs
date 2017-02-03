angular
  .module('app')
  .controller('HomeCtrl', function($scope, $http, $httpParamSerializerJQLike) {
    $scope.search = {
      text: ''
    };

    $scope.page = 1;
    $scope.results = [];

    /**
     * Reset the search.
     */
    $scope.resetSearch = function(){
      $scope.search = {
        text: ''
      };
    };

    /**
     * Search by the search object.
     */
    $scope.launchSearch = function(){
      var data = {
        cat: 0,
        page: $scope.page,
        srcrel: $scope.search.text
      };

      $http({
          method: 'POST',
          url: 'http://www.tntvillage.scambioetico.org/src/releaselist.php',
          data: $httpParamSerializerJQLike(data),
          headers: {'Content-Type': 'application/x-www-form-urlencoded'},
          paramSerializer: '$httpParamSerializerJQLike'
      }).then(function(result){
        console.log('All ok');
        $('table tr', result.data).each(function(index, tr){
          console.log(index, 'tr', tr);
          if(index > 0){
            var magnet = $('td:eq(1) a',tr).attr('href');
            var l = $('td:eq(3)',tr).text();
            var s = $('td:eq(4)',tr).text();
            var c = $('td:eq(5)',tr).text();
            var title = $('td:eq(6)',tr).text();
            $scope.results.push({
              magnet: magnet,
              l: l,
              s: s,
              c: c,
              title: title
            });
          }
        });
      }, function(error){
        console.error('Error', error);
      });
    };
  });

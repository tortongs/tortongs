angular
  .module('app')
  .controller('HomeCtrl', function($scope, $http, $httpParamSerializerJQLike) {
    $scope.search = {
      text: ''
    };

    $scope.currentPage = 1;
    $scope.totalPages = 1;
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
      $scope.results = [];
      var data = {
        cat: 0,
        page: $scope.currentPage,
        srcrel: $scope.search.text
      };

      $scope.executeSearch(data);
    };

    /**
     * Execute the search.
     * @param  {Object} params The data to use for search.
     */
    $scope.executeSearch = function(data){
      $http({
          method: 'POST',
          url: 'http://www.tntvillage.scambioetico.org/src/releaselist.php',
          data: $httpParamSerializerJQLike(data),
          headers: {'Content-Type': 'application/x-www-form-urlencoded'},
          paramSerializer: '$httpParamSerializerJQLike'
      }).then(function(result){
        console.log('All ok');
        $('table tr', result.data).each(function(index, tr){
          //console.log(index, 'tr', tr);
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
        var pagination = $(".total", result.data);
        $scope.totalPages = pagination.attr('a');
      }, function(error){
        console.error('Error', error);
      });
    };

    /**
     * Load more items.
     */
    $scope.loadMore = function(){
      $scope.currentPage++;
      var data = {
        cat: 0,
        page: $scope.currentPage,
        srcrel: $scope.search.text
      };
      $scope.executeSearch(data);
    };

    /**
     * Check if the are more pages to show.
     * @return {boolean} Returns true if there are more pages, false otherwise.
     */
    $scope.hasMorePages = function(){
      return ($scope.totalPages - $scope.currentPage) > 0;
    };
  });

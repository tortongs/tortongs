angular
  .module('app')
  .service('torrentDb', ['$q', function($q) {

    /**
     * Insert the given torrent in the db.
     * @param  {object} torrent The torrent to insert.
     */
    this.insert = function (torrent) {
        db.insert(torrent);
    };
    /**
     * Get all saved torrents.
     * @return {promise} A promise with all the saved torrents.
     */
    this.getAllSavedTorrents = function(){
      var deferred = $q.defer();
      db.find({}, function (err, docs) {
        deferred.resolve(docs);
      });
      return deferred.promise;
    };

    /**
     * Check if the given magnet url is already saved.
     * @param  {string} magnet The magnet url to check.
     * @return {promise}        A promise with the value true if the magnet url is already saved,
     * false otherwise.
     */
    this.exists = function(magnet){
      var deferred = $q.defer();
      db.count({ magnet: magnet }, function (err, count) {
          deferred.resolve(count > 0);
      });
      return deferred.promise;
    };

    /**
    * Remove the given torrent in the db.
     * @param  {string} magnet The magnet url of the torrent to remove.
     */
    this.remove = function (magnet) {
        db.remove({magnet: magnet});
    };
}]);

// Declare app level module which depends on views, and components
var app = angular.module('pbApp', [
  'ngRoute',
  'myApp.view1',
  'myApp.view2',
  'myApp.version',
  'ngTable'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/view1'});
}]);

app.factory('Session', ['$http', function($http) {
    return $http.get('/session').then(function(result) {
        return result.data.status;
    });
}]);

app.directive('menu', ['Session', function(Session) {
  function menu(scope, element, attrs) {
    Session.then(function(response){
      if (response){
        element.append('<nav class="navbar navbar-default">' +
                      ' <div class="container-fluid">' +
                      '  <ul class="nav navbar-nav">' +
                      '   <li><a href="/accounts">Dashboard</a></li>'+
                      '   <li><a href="/logout">Logout</a></li>' +
                      '  </ul>' +
                      ' </div>' +
                      '</nav>');
      }
    });
  }
  return {
    link: menu
  };
}]);

app.factory('dataTable',['$filter','NgTableParams','$http', function($filter,NgTableParams,$http){
  return {
    tableParams: function(controller, reference, id){
      return new NgTableParams({
          page : 1,
          count: 10
        }, {
          total: 0,
          getData: function($defer, params) {
            // Limit
            var query = "?limit=" + params.count();
            if (params.page() > 1){
              var skip = params.count() * (params.page() - 1);
              query = query + "&skip=" + skip;
            }

            // Sort
            var sort = params.sorting();
            var keys = Object.keys(sort);
            if (keys.length > 0){
              var order = sort[keys[0]];
              sortSplit = keys[0].split(".");
              if (sortSplit.length > 0){
                keys[0] = sortSplit[0];
              }
              query = query + "&sort=" + keys[0] + " " + order.toUpperCase();
            }

            // Filter
            var filter = params.filter();
            keys = Object.keys(filter);
            var where = "";
            if (keys[0] !== undefined){
              var field = keys[0];
              where = '{"' + field  + '":{"contains":"' + filter[keys[0]]  + '"}}';
              query = query + "&where=" + where;
            }

            if (id !== null){
              query = query + "&" + id;
            }

            $http.get("/" + controller + "/count").then(function(result,status){
              reference.total = result.data.count;
              params.total(reference.total);
            });

            $http.get("/" + controller + query).then(function(result,status){
              var orderedData = params.sorting() ? $filter('orderBy')(result.data, params.orderBy()) : result.data;
              total = params.total();
              $defer.resolve(result.data);
            });

          }
        });
    },

    getTotal: function(){

      return total;
    }
  };
}]);

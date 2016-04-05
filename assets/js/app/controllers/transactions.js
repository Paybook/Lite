//View widget.ejs
app.controller('transactionsController',function($scope,dataTable,$filter){

  $scope.$watch('id_account', function () {
      var id_account = $scope.id_account;
      $scope.tableParams = dataTable.tableParams('transactions', $scope, 'id_account=' + id_account);
  });

});

angular.module('tasksApp').controller('NavigationController', function($scope, LocationService) {

  $scope.tasks = function() {
    LocationService.tasks();
  }
});

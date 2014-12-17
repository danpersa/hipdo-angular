angular.module('tasksApp').service('TagsService', function() {
  this.tags = [
  'monday', 'tuesday', 'shopping', 'car'
  ];

  this.all = function() {
    return this.tags;
  }
});

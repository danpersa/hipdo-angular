angular.module('tasksApp').service('GroupedTasksService', function(TasksService, TagGroupsService) {

  this.byGroupKey = function(groupKey) {
    var group = TagGroupsService.get(groupKey);
    this.tags = group.tags;
    var groupedTasks = {};
    angular.forEach(this.tags, function(tag) {
      this[tag] = TasksService.byTags([tag]);
    }, groupedTasks);
    return groupedTasks;
  }
});

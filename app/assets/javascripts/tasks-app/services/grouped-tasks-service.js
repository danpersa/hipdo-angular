angular.module('tasksApp').service('GroupedTasksService', function(TasksService, TagGroupsService) {

  this.byGroupKey = function(groupKey, showCompletedTasks, showPastTasks, selectedTags) {
    var group = TagGroupsService.get(groupKey);
    this.tags = group.tags;
    var groupedTasks = {};
    angular.forEach(this.tags, function(tag) {
      this[tag] = TasksService.byTag(tag, showCompletedTasks, showPastTasks, selectedTags);
    }, groupedTasks);
    return groupedTasks;
  }
});

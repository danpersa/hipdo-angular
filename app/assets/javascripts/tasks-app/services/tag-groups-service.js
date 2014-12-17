angular.module('tasksApp').service('TagGroupsService', function() {
  this.tagGroups = [
  {
    name: 'Week Days',
    key: 'week-days',
    tags: ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday']
  },
  {
    name: 'Work',
    key: 'work',
    tags: ['angular', 'project-management']
  },
  {
    name: 'Shopping',
    key: 'shopping',
    tags: ['groceries', 'gadgets', 'presents']
  }
  ];

  this.all = function() {
    return this.tagGroups;
  }

  this.get = function(groupKey) {
    var index;
    for (index = 0; index < this.tagGroups.length; ++index) {
      if (this.tagGroups[index].key == groupKey) {
        return this.tagGroups[index];
      }
    }
    return null;
  }
});

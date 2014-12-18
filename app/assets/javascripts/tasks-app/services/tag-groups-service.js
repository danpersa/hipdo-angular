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

  this.currentId = 5;

  this.all = function() {
    return this.tagGroups;
  }

  this.create = function(tagGroup) {
    console.log('Create tag group: ' + tagGroup);
    tagGroup.key = 'tag-group-' + this.currentId;
    tagGroup.tags = [];
    this.currentId = this.currentId + 1;
    this.tagGroups.push(tagGroup);
    return tagGroup;
  }

  this.addTagToGroup = function(groupKey, tag) {
    var tagGroup = this.get(groupKey);
    tagGroup.tags.push(tag);
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

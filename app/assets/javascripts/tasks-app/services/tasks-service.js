angular.module('tasksApp').service('TasksService', function() {
  this.tasks = [
    {
      id: 1,
      name: 'Preprare for your birthday',
      description: 'Buy presents for christmas',
      dueDate: new Date(2015, 1, 3, 0, 0, 0, 0),
      completed: true,
      tags: ['monday', 'shopping']

    },
    {
      id: 2,
      name: 'Solve the car insurance papers',
      description: '',
      dueDate: new Date(2014, 12, 23, 0, 0, 0, 0),
      completed: false,
      tags: ['tuesday', 'shopping', 'car']

    },
    {
      id: 3,
      name: 'Buy presents for Christmas',
      description: 'Buy presents for christmas',
      dueDate: new Date(2014, 12, 22, 0, 0, 0, 0),
      completed: false,
      tags: ['tuesday', 'shopping']
    }
  ];

  this.currentId = 5;

  this.all = function() {
    return this.tasks;
  }

  this.byTags = function(selectedTags) {
    if (selectedTags.length === 0) {
      return this.tasks;
    }
    var filteredTasks = [];
    angular.forEach(this.tasks, function(task) {
      var b = false;
      angular.forEach(task.tags, function(tag) {
        if (selectedTags.indexOf(tag) != -1) {
          b = true;
        }
      });
      if (b) {
        this.push(task);
      }
    }, filteredTasks);
    return filteredTasks;
  }

  this.create = function(task) {
    console.log('Create ' + taskString(task));
    task.id = this.currentId;
    this.currentId = this.currentId + 1;
    this.tasks.push(task);
    return task;
  }

  this.delete = function(task) {
    console.log('Delete ' + taskString(task));
  }

  this.update = function(task) {
    console.log('Update ' + taskString(task));
  }


  function taskString(task) {
    return 'Task id: [' + task.id + '] name: [' + task.name + '] description: [' + task.description + '] dueDate: [' + task.dueDate + ']';
  }
});

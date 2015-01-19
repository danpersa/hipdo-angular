angular.module('tasksApp').service('TasksService',
  function(SelectedTagsService) {
    this.tasks = [
      {
        id: 1,
        name: 'Preprare for your birthday',
        description: 'Buy presents for christmas',
        dueDate: new Date(2015, 4, 2, 0, 0, 0, 0),
        completed: true,
        tags: ['monday', 'shopping']

      },
      {
        id: 2,
        name: 'Solve the car insurance papers',
        description: '',
        dueDate: new Date(2015, 11, 15, 0, 0, 0, 0),
        completed: false,
        tags: ['tuesday', 'shopping', 'car']

      },
      {
        id: 3,
        name: 'Buy presents for Christmas',
        description: 'Buy presents for christmas',
        dueDate: new Date(2014, 12, 16, 0, 0, 0, 0),
        completed: false,
        tags: ['tuesday', 'shopping', 'angular']
      },
      {
        id: 4,
        name: 'Go swimming',
        description: 'Go swimming',
        dueDate: new Date(2015, 4, 22, 0, 0, 0, 0),
        completed: false,
        tags: ['tuesday', 'shopping', 'angular']
      }
    ];

    this.currentId = 5;

    this.all = function() {
      return this.tasks;
    }

    this.isFiltered = function(task, showCompletedTasks, showPastTasks, selectedTags) {
      return isFiltered(task, showCompletedTasks, showPastTasks, selectedTags);
    }

    this.filter = function(showCompletedTasks, showPastTasks, selectedTags) {
      var filteredTasks = [];
      angular.forEach(this.tasks, function(task) {
        if (!isFiltered(task, showCompletedTasks, showPastTasks, selectedTags)) {
          this.push(task);
        }
      }, filteredTasks);
      return filteredTasks;
    }

    this.byTag = function(tag, showCompletedTasks, showPastTasks, selectedTags) {
      var filteredTasks = [];
      angular.forEach(this.tasks, function(task) {
        if (task.tags.indexOf(tag) !== -1
            && !isFiltered(task, showCompletedTasks, showPastTasks, selectedTags)) {
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
      for (i = 0; i < this.tasks.length; ++i) {
        var t = this.tasks[i];
        if (task.id === t.id) {
          this.tasks.splice(i, 1);
          return;
        }
      }
    }

    this.update = function(task) {
      console.log('Update ' + taskString(task));
    }

    this.isTaskCompleted = function(task) {
      return isTaskCompleted(task);
    }

    this.isPastTask = function(task) {
      return isPastTask(task);
    }
  });

angular.module('tasksApp').service('TasksService',
  function($rootScope, SelectedTagsService, localStorageService) {

    var tasksInStore = localStorageService.get('tasks');

    this.tasks = tasksInStore || [
      {
        id: 1,
        name: 'Preprare for your birthday',
        description: 'Buy presents for christmas',
        dueDate: '2015-04-02',
        completedDate: '2015-02-03',
        tags: ['monday', 'shopping']

      },
      {
        id: 2,
        name: 'Solve the car insurance papers',
        description: '',
        dueDate: '2015-11-15',
        tags: ['tuesday', 'shopping', 'car']

      },
      {
        id: 3,
        name: 'Buy presents for Christmas',
        description: 'Buy presents for christmas',
        dueDate: '2014-12-16',
        tags: ['tuesday', 'shopping', 'angular']
      },
      {
        id: 4,
        name: 'Go swimming tuesday',
        description: 'Go swimming',
        dueDate: '2015-04-22',
        tags: ['tuesday', 'shopping', 'angular']
      },
      {
        id: 5,
        name: 'Go swimming thursday',
        description: 'Go swimming',
        dueDate: '2015-04-22',
        tags: ['thursday', 'shopping', 'angular']
      },
      {
        id: 6,
        name: 'Go swimming sunday',
        description: 'Go swimming',
        dueDate: '2015-04-22',
        completedDate: '2015-03-08',
        tags: ['sunday', 'angular']
      },
      {
        id: 7,
        name: 'Go swimming monday',
        description: 'Go swimming',
        tags: ['monday', 'shopping']
      }
    ];

    this.currentId = 15;

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
      this.saveToLocalStorage();
      return task;
    }

    this.delete = function(task) {
      console.log('Delete ' + taskString(task));
      for (i = 0; i < this.tasks.length; ++i) {
        var t = this.tasks[i];
        if (task.id === t.id) {
          this.tasks.splice(i, 1);
          this.saveToLocalStorage();
          return;
        }
      }
    }

    this.addTagToTask = function(task, tag) {
      if (task.tags.indexOf(tag) !== -1) {
        return;
      }
      task.tags.push(tag);
      this.saveToLocalStorage();
    }

    this.removeTagFromTask = function(task, tag) {
      console.log('Remove tag ' + tag + ' from ' + taskString(task));
      var index = task.tags.indexOf(tag);
      task.tags.splice(index, 1);
      this.saveToLocalStorage();
    }

    this.update = function(task) {
      this.saveToLocalStorage();
      console.log('Update ' + taskString(task));
    }

    this.isTaskCompleted = function(task) {
      return isTaskCompleted(task);
    }

    this.isPastTask = function(task) {
      return isPastTask(task);
    }

    this.saveToLocalStorage = function() {
      localStorageService.set('tasks', this.tasks);
    }
  });

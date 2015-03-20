angular.module('tasksApp').controller('RenderTasksController',
  function($scope, TasksService, FiltersService) {

    $scope.updateTaskName = function(task, newTaskName) {
      console.log('Update Task Name: [' + newTaskName + '] old task name: ' + task.name);
      task.name = newTaskName;
      TasksService.update(task);
    }

    $scope.updateDueDate = function(task, index) {
      task.dueDate = Date.parse(task.dueDate);
      TasksService.update(task);
      if (!FiltersService.showingPastTasks() && TasksService.isPastTask(task)) {
        $scope.tasks.splice(index, 1);
      }
    }

    $scope.toggleTaskCompleted = function(task, index) {
      task.completed = !task.completed;
      if (task.completed) {
        task.completedDate = new Date();
      }
      TasksService.update(task);
      if (!FiltersService.showingCompletedTasks()) {
        $scope.tasks.splice(index, 1);
      }
    }

    $scope.removeTagFromTask = function(task, tag) {
      TasksService.removeTagFromTask(task, tag);
    }

    $scope.deleteTask = function(task, index) {
      console.log("Delete task index: " + index);
      TasksService.delete(task);
      $scope.tasks.splice(index, 1);
    }

    $scope.addTagToTask = function(task, event) {
      var newTag = event.currentTarget.value;
      event.currentTarget.value = "";
      TasksService.addTagToTask(task, newTag);
    };
});

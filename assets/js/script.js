// Retrieve tasks and nextId from localStorage
let taskList = JSON.parse(localStorage.getItem('tasks'));
let nextId = JSON.parse(localStorage.getItem('nextId'));

function readProjectsFromStorage () {
  let taskList = JSON.parse(localStorage.getItem('tasks'));

  if (!taskList) {
    taskList = [];
  }
  return taskList;
}

// Todo: create a function to generate a unique task id
function generateTaskId() {
  // Get the current timestamp
  const timestamp = new Date().getTime();
  // Generate a random number between 0 and 999
  const randomNum = Math.floor(Math.random() * 1000);
  //Combine timestamp and random number to create a unique ID
  const uniqueID = timestamp + '-' + randomNum;
  return uniqueID;
    }

// Todo: create a function to create a task card
function createTaskCard(task) {
  // Create task card elements
  const taskCard = $('<div>')
      .addClass('card w-75 task-card draggable my-3')
      .attr('data-task-id', task.id);
  const cardHeader = $('<div>').addClass('card-header h4').text(task.title);
  const cardBody = $('<div>').addClass('card-body');
  const cardDescription = $('<p>').addClass('card-text').text(task.description);
  const cardDueDate = $('<p>').addClass('card-text').text(task.dueDate);
  // Add delete button to remove task from task list
  const cardDeleteBtn = $('<button>')
    .addClass('btn btn-danger delete')
    .text('Delete')
    .attr('data-task-id', task.id);
  // Add event listener to delete button to remove task card
  cardDeleteBtn.on('click', handleDeleteTask);

  // Set card background color based on due date; only apply styles if due date exists and status is not 'done'
  if (task.dueDate && task.status !== 'done') {
    const now = dayjs();
    const taskDueDate = dayjs(task.dueDate, 'DD/MM/YYYY');
  
  // If the task is due today, make the card background color yellow; if it is overdue, make the background color red
    if (now.isSame(taskDueDate, 'day')) {
      taskCard.addClass('bg-warning text-white'); // Yellow card for nearing deadline
    } else if (now.isAfter(taskDueDate)) {
      taskCard.addClass('bg-danger text-white'); // Red cards for overdue
      cardDeleteBtn.addClass('border-light');
    }
  }

  // Append card elements to task card
  cardBody.append(cardDescription, cardDueDate, cardDeleteBtn);
  taskCard.append(cardHeader, cardBody);

  // Return the task card
  return taskCard;
}

// Todo: create a function to render the task list and make cards draggable
function renderTaskList() {

  if (!taskList) {
    taskList = [];
  }

  // Empty existing task cards out of the lanes
  const todoList = $('#todo-cards');
  todoList.empty();

  const inProgressList = $('#in-progress-cards');
  inProgressList.empty();

  const doneList = $('#done-cards');
  doneList.empty();

  // Loop through tasks and create cards for each status
  for (let task of taskList) {
    if (task.status === 'to-do') {
      todoList.append(createTaskCard(task));
    } else if (task.status === 'in-progress') {
      inProgressList.append(createTaskCard(task));
    } else if (task.status === 'done') {
      doneList.append(createTaskCard(task));
    }
  }

  // Use jQuery UI to make task cards draggable
  $('.draggable').draggable({
    opacity: 0.7,
    zIndex: 100,
    // Create a clone of the card that is dragged
    helper: function (e) {
      // Checks if the target of the drag event is the card itself or the child element; if it is the card itself it is cloned, otherwise find the draggable parent card and clone it
      const original = $(e.target).hasClass('ui-draggable')
        ? $(e.target)
        : $(e.target).closest('.ui-draggable');
      // Return the clone with the maxWidth set to the width of the original card
      return original.clone().css({
        maxWidth: original.outerWidth(),
      });
    },
  });
}

// Todo: create a function to handle adding a new task
function handleAddTask(event){
  event.preventDefault(); // Prevent browser's default behavior
  // Create object to contain the user input for each task from the form
  const task = {
    id: generateTaskId(),
    title: $('#taskTitle').val(),
    description: $('#taskDescription').val(),
    dueDate: $('#taskDueDate').val(),
    status: 'to-do' // Tasks set as default to 'to-do' so they first go to 'to-do' lane
  };

  // Add new tasks to task list and save updated task list in localStorage
  taskList.push(task);
  localStorage.setItem('tasks', JSON.stringify(taskList));
  renderTaskList();
  $('#taskTitle').val('');
  $('#taskDescription').val('');
  $('#taskDueDate').val('');
}

// Todo: create a function to handle deleting a task
function handleDeleteTask(event){
  event.preventDefault(); // Prevent browser's default behavior
  // Retrieving the value of the data-task-id attribute from the current element that triggered the delete event
  const taskId = $(this).attr('data-task-id');

  // Filtering out and removing the task with an id equal to the taskId from the taskList array
  taskList = taskList.filter((task) => task.id !== taskId);

  // Save updated taskList to localStorage
  localStorage.setItem('tasks', JSON.stringify(taskList));

  // Update task list
  renderTaskList();
}

// Todo: create a function to handle dropping a task into a new status lane
function handleDrop(event, ui) {

  // Get the task ID from the event
  const taskId = ui.draggable[0].dataset.taskId;
  
  // Get the id of the lane that the card was dropped into
  const newStatus = event.target.id;

  for (let task of taskList) {
    // ? Find the task card by the `id` and update the task status.
    if (task.id === taskId) {
      task.status = newStatus;
    }
  }
  // Save updated task array to localStorage
  localStorage.setItem('tasks', JSON.stringify(taskList));

  // Render the new task list data
  renderTaskList();
}

// Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
$(document).ready(function () {
  renderTaskList();

  // Add event listener to form, listen for submit event, and call the 'handleAddTask' function
   $('#taskForm').on('submit', handleAddTask);

  // Delegate click event listener to the parent element, then check if the target of the click is the delete button; if so, we call the 'handleDeleteTask' function
    $('.task-card').on('click', '.delete-task', handleDeleteTask);

  // Make lanes droppable
  $('.lane').droppable({
    accept: '.draggable',
    drop: handleDrop,
  });

  // Initialize the date picker
  $('#taskDueDate').datepicker({
    changeMonth: true,
    changeYear: true,
  });
});

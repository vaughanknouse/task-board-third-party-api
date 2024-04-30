# Third-Party APIs: Task Board

## Description

This week's challenge involves creating ***

## User Story

```md
AS A project team member with multiple tasks to organize
I WANT a task board 
SO THAT I can add individual project tasks, manage their state of progress and track overall project progress accordingly
```

## Acceptance Criteria

```md
GIVEN a task board to manage a project
WHEN I open the task board
THEN the list of project tasks is displayed in columns representing the task progress state (Not Yet Started, In Progress, Completed)
WHEN I view the task board for the project
THEN each task is color coded to indicate whether it is nearing the deadline (yellow) or is overdue (red)
WHEN I click on the button to define a new task
THEN I can enter the title, description and deadline date for the new task into a modal dialog
WHEN I click the save button for that task
THEN the properties for that task are saved in localStorage
WHEN I drag a task to a different progress column
THEN the task's progress state is updated accordingly and will stay in the new column after refreshing
WHEN I click the delete button for a task
THEN the task is removed from the task board and will not be added back after refreshing
WHEN I refresh the page
THEN the saved tasks persist
```

## Mock Up
The following image shows the web application's appearance: ***

![Shows first page of deployed web application in light mode entitled "My First Blog" as well as a form with labels and inputs for username, blog title, and blog content.](assets/images/Personal-blog-page-1-light.png)

![Shows second page of deployed web application in light mode with a list of blog post entries, including titles, content, and author of the posts.](assets/images/Personal-blog-page-2-light.png)


## Link to Deployed Application 

***


## Credits
***

Used the following sources as tutorials and guidelines:
https://github.com/ikatyang/emoji-cheat-sheet/blob/master/README.md

https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage

Also utilized the Xpert Learning assistant for some portions of my code:
https://bootcampspot.instructure.com/courses/5293/external_tools/313
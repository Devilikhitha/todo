// Main container
let container = document.createElement("div");
container.classList.add("inputContainer");
document.body.appendChild(container);

// Input element
let inputEl = document.createElement("input");
inputEl.type = 'text';
inputEl.placeholder = 'What needs to be done?';
inputEl.classList.add("textBox");
container.appendChild(inputEl);

// Save button
let buttonEl = document.createElement("button");
buttonEl.innerText = "Save";
buttonEl.classList.add("saveButton");
buttonEl.addEventListener("click", function () {
    // When Save button is clicked, add the task to the tasks array
    addTask(inputEl.value);
    // Clear the input field after saving
    inputEl.value = "";
});
container.appendChild(buttonEl);

// Tasks container
let tasksContainer = document.createElement("div");
tasksContainer.classList.add("taskContainer");
container.appendChild(tasksContainer);

// Tasks heading
let tasksHeading = document.createElement("h1");
tasksHeading.innerText = "My Tasks";
tasksContainer.appendChild(tasksHeading);

// Array to store tasks
let tasks = [];

// Function to add a task to the tasks container and array
function addTask(taskContent) {
    if (taskContent.trim() !== '') {
        // Add task to the tasks array
        tasks.push(taskContent);

        // Render tasks
        renderTasks();
    } else {
        // Alert when trying to add an empty task
        alert("Please enter a task before saving.");
    }
}

// Function to render tasks in the tasks container
function renderTasks() {
    // Clear previous tasks
    tasksContainer.innerHTML = '';

    // Append the heading again before rendering tasks
    tasksContainer.appendChild(tasksHeading);

    // Loop through tasks array and create task elements
    tasks.forEach((taskContent, index) => {
        let taskElement = document.createElement("div");
        taskElement.classList.add("task");

        // Task content
        let taskContentDiv = document.createElement("div");
        taskContentDiv.innerText = taskContent;
        taskElement.appendChild(taskContentDiv);

        // Button container for done and edit buttons
        let buttonContainer = document.createElement("div");

        // Done button
        let doneButton = document.createElement("button");
        doneButton.innerText = "Done";
        doneButton.classList.add("taskButton");
        doneButton.addEventListener("click", function () {
            // Mark the task as done
            taskContentDiv.classList.add("strike");
            let delButton = document.createElement("button");
            delButton.innerText = "Delete";
            delButton.classList.add("taskButton");
            delButton.addEventListener("click", function () {
                // Remove the entire task item from the tasks container
                taskElement.remove();
                // Remove the task from the tasks array
                tasks.splice(index, 1);
            });
            buttonContainer.appendChild(delButton);
            doneButton.disabled = true;
        });
        buttonContainer.appendChild(doneButton);

        // Edit button
        let editButton = document.createElement("button");
        editButton.innerText = "Edit";
        editButton.classList.add("taskButton");
        editButton.addEventListener("click", function () {
            // Reflect the task content in the input field
            inputEl.value = taskContent;

            // Remove the task from the tasks array
            tasks.splice(index, 1);

            // Render the updated tasks
            renderTasks();
        });
        buttonContainer.appendChild(editButton);

        taskElement.appendChild(buttonContainer);
        tasksContainer.appendChild(taskElement);
    });
}

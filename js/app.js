// Selectors
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todo");

// Event Listeners
document.addEventListener("DOMContentLoaded", getTodos);
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteCheck);
filterOption.addEventListener("click", filterTodo);

// Functions
function addTodo(event) {
	event.preventDefault();
	// Create Div
	const todoDiv = document.createElement("div");
	todoDiv.classList.add("todo");
	// Create LI
	const newTodo = document.createElement("li");
	newTodo.innerText = todoInput.value;
	newTodo.classList.add("todo-item");
	todoDiv.appendChild(newTodo);
	// Save to local storage
	saveLocalTodos(todoInput.value);
	// Checkbox
	const completedButton = document.createElement("button");
	completedButton.innerHTML = '<i class="fas fa-check"></i>';
	completedButton.classList.add("complete-btn");
	todoDiv.appendChild(completedButton);
	// Delete
	const trashButton = document.createElement("button");
	trashButton.innerHTML = '<i class="fas fa-trash"></i>';
	trashButton.classList.add("trash-btn");
	todoDiv.appendChild(trashButton);
	// Append to list
	todoList.appendChild(todoDiv);
	// Clear todo input value
	todoInput.value = "";
}

function deleteCheck(e) {
	const item = e.target;
	// Delete todo
	if (item.classList[0] === "trash-btn") {
		const todo = item.parentElement;
		// Animation
		todo.classList.add("fall");
		removeLocalTodos(todo);
		todo.addEventListener("transitionend", () => todo.remove());
	}

	// Mark as completed
	if (item.classList[0] === "complete-btn") {
		const todo = item.parentElement;
		todo.classList.toggle("completed");
	}
}

function filterTodo(e) {
	const todos = todoList.childNodes;
	todos.forEach((todo) => {
		switch (e.target.value) {
			case "all":
				todo.style.display = "flex";
				break;
			case "completed":
				if (todo.classList.contains("completed")) {
					todo.style.display = "flex";
				} else {
					todo.style.display = "none";
				}
				break;
			case "uncompleted":
				if (!todo.classList.contains("completed")) {
					todo.style.display = "flex";
				} else {
					todo.style.display = "none";
				}
				break;
		}
	});
}

function checkLocalTodos() {
	var todos = [];
	if (localStorage.getItem("todos") != null) {
		todos = JSON.parse(localStorage.getItem("todos"));
	}
	return todos;
}

function saveLocalTodos(todo) {
	todos = checkLocalTodos();
	todos.push(todo);
	localStorage.setItem("todos", JSON.stringify(todos));
}

function getTodos() {
	let todos = checkLocalTodos();
	todos.forEach((todo) => {
		// Create Div
		const todoDiv = document.createElement("div");
		todoDiv.classList.add("todo");
		// Create LI
		const newTodo = document.createElement("li");
		newTodo.innerText = todo;
		newTodo.classList.add("todo-item");
		todoDiv.appendChild(newTodo);
		// Checkbox
		const completedButton = document.createElement("button");
		completedButton.innerHTML = '<i class="fas fa-check"></i>';
		completedButton.classList.add("complete-btn");
		todoDiv.appendChild(completedButton);
		// Delete
		const trashButton = document.createElement("button");
		trashButton.innerHTML = '<i class="fas fa-trash"></i>';
		trashButton.classList.add("trash-btn");
		todoDiv.appendChild(trashButton);
		// Append to list
		todoList.appendChild(todoDiv);
	});
}

function removeLocalTodos(todo) {
	let todos = checkLocalTodos();
	const todoIndex = todo.children[0].innerText;
	todos.splice(todos.indexOf(todoIndex), 1);
	console.log(todos);
	localStorage.setItem("todos", JSON.stringify(todos));
}

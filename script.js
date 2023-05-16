/* bootcamp version 
//State der App
const todos = [
  {
    id: 0,
    description: "Einkaufen",
    done: false,
  },
  {
    id: 1,
    description: "Schlafen",
    done: true,
  },
];
const newTodo = document.querySelector("#new-todo");
const addButton = document.querySelector("#add-button");
const list = document.querySelector("#list");

function addTodo(todo) {
  const newTodo = {
    id: Date.now(),
    description: todo,
    done: false,
  };
  todos.push(newTodo);
}
// Zeige den aktuellen State im DOM an
function renderTodos() {
  list.innerHTML = "";

  for (let i = 0; i < todos.length; i++) {
    const todo = todos[i];

    const newLi = document.createElement("li");
    const text = document.createTextNode(todo.description);
    newLi.append(text);

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = todo.done;
    list.append(checkbox);

    checkbox.addEventListener("change", function () {
      todo.done = checkbox.checked;
    });

    list.append(newLi);
  }
}

addButton.addEventListener("click", function () {
  const newTodoText = newTodo.value;
  addTodo(newTodoText); // update des states
  renderTodos(); // state rendern
});

renderTodos();
*/

// State variables
let todos = [];
let currentFilter = "all"; // Current filter (all, done, undone)

// DOM elements
const todoInput = document.querySelector("#todoInput");
const addButton = document.querySelector("#addButton");
const todoList = document.querySelector("#todoList");
const removeButton = document.querySelector("#removeButton");
const showAllButton = document.querySelector("#showAllButton");
const showDoneButton = document.querySelector("#showDoneButton");
const showUndoneButton = document.querySelector("#showUndoneButton");

// Load todos from local storage on page load
loadTodos();

addButton.addEventListener("click", addTodo);
document.addEventListener("keydown", function (event) {
  if (event.code === "Enter") {
    addTodo();
  }
});
removeButton.addEventListener("click", removeDoneTodos);
showAllButton.addEventListener("click", () => setFilter("all"));
showDoneButton.addEventListener("click", () => setFilter("done"));
showUndoneButton.addEventListener("click", () => setFilter("undone"));

function addTodo() {
  const inputValue = todoInput.value.trim();
  if (inputValue === "") return; // Ignore empty todos
  if (
    todos.some(
      (todo) => todo.description.toLowerCase() === inputValue.toLowerCase()
    )
  ) {
    alert("Todo already exists!"); // Display duplicate todo error
    return;
  }

  const newTodo = {
    id: generateId(),
    description: inputValue,
    done: false,
  };

  todos.push(newTodo);
  saveTodos();
  renderTodos();

  todoInput.value = "";
}

function toggleTodoDone(id) {
  todos = todos.map((todo) =>
    todo.id === id ? { ...todo, done: !todo.done } : todo
  );
  saveTodos();
  renderTodos();
}

function removeDoneTodos() {
  todos = todos.filter((todo) => !todo.done);
  saveTodos();
  renderTodos();
}

function setFilter(filter) {
  currentFilter = filter;
  renderTodos();
}

function generateId() {
  return todos.length > 0 ? todos[todos.length - 1].id + 1 : 1;
}

function saveTodos() {
  localStorage.setItem("todos", JSON.stringify(todos));
}

function loadTodos() {
  const savedTodos = localStorage.getItem("todos");
  if (savedTodos) {
    todos = JSON.parse(savedTodos);
    renderTodos();
  }
}

function renderTodos() {
  todoList.innerHTML = "";
  const filteredTodos = filterTodos();

  filteredTodos.forEach((todo) => {
    const li = document.createElement("li");
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = todo.done;
    checkbox.addEventListener("change", () => toggleTodoDone(todo.id));
    li.appendChild(checkbox);
    li.appendChild(document.createTextNode(todo.description));
    todoList.appendChild(li);
  });
}

function filterTodos() {
  if (currentFilter === "all") {
    return todos;
  } else if (currentFilter === "done") {
    return todos.filter((todo) => todo.done);
  } else if (currentFilter === "undone") {
    return todos.filter((todo) => !todo.done);
  }
}

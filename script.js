const todoList = document.querySelector("#todoList");
const addButton = document.querySelector("#addButton");
const todoInput = document.querySelector("#todoInput");
const removeButton = document.querySelector("#removeButton");
const removeAllButton = document.querySelector("#removeAllButton");
const allTodos = document.querySelector('input[value="all"]');
const doneTodos = document.querySelector('input[value="done"]');
const undoneTodos = document.querySelector('input[value="undone"]');

let todos = [
  {
    id: 0,
    description: "Eis essen",
    done: false,
  },
  {
    id: 1,
    description: "Einkaufen",
    done: true,
  },
  {
    id: 2,
    description: "Nico huldigen 😛",
    done: false,
  },
];

// 1. Liste anzeigen
function renderTodos(filteredTodos) {
  // todo: render all todos in the ul
  todoList.innerHTML = "";
  filteredTodos.forEach((todo) => {
    // use filteredTodos instead todos
    const newLi = document.createElement("li");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = todo.done;
    newLi.append(checkbox);

    const todoText = document.createTextNode(todo.description);
    newLi.append(todoText);

    checkbox.addEventListener("change", function () {
      todo.done = checkbox.checked;
    });

    todoList.append(newLi);
  });
}

renderTodos(todos);

// 2. Neue Einträge hinzufügen

function addTodo(todo) {
  const newTodo = {
    id: Date.now(),
    description: todo,
    done: false,
  };
  todos.push(newTodo);
  filterTodos();
}

function handleTodoInput(event) {
  if (event.type === "click" || event.code === "Enter") {
    const newTodoText = todoInput.value.trim();

    if (newTodoText !== "") {
      todoInput.value = ""; // Reset input field after adding
      addTodo(newTodoText);

      filterTodos();
    }
  }
}
addButton.addEventListener("click", handleTodoInput);
document.addEventListener("keydown", handleTodoInput);

// 3. Bestehende Einträge löschen

function removeDoneTodos() {
  todos = todos.filter((todo) => !todo.done);
  filterTodos();
}
removeButton.addEventListener("click", removeDoneTodos);

function removeAllTodos() {
  todos = [];
  filterTodos();
}
removeAllButton.addEventListener("click", removeAllTodos);

// 4. Todos filtern
function filterTodos() {
  const filterType = document.querySelector(
    'input[name="filter"]:checked'
  ).value;

  if (filterType === "all") {
    renderTodos(todos);
  } else if (filterType === "done") {
    const filteredDoneTodos = todos.filter((todo) => todo.done);
    renderTodos(filteredDoneTodos);
  } else if (filterType === "undone") {
    const filteredUndoneTodos = todos.filter((todo) => !todo.done);
    renderTodos(filteredUndoneTodos);
  }
}

allTodos.addEventListener("click", filterTodos);
doneTodos.addEventListener("click", filterTodos);
undoneTodos.addEventListener("click", filterTodos);

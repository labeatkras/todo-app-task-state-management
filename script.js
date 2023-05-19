// 1. Liste anzeigen
// 2. Neue Einträge hinzufügen
// 3. Bestehende Einträge löschen
const list = document.querySelector("ul");

const todos = ["Eis essen", "Einkaufen", "Nico huldigen"];

function renderTodos() {
  // todo: render all todos in the ul
  const newLI = document.createElement("li");
  const todoText = document.createElement("todos");
  newLI.append(todoText);

  list.append(newLi);
}

render();

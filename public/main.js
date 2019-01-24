const addTodo = function() {
  fetch("/add")
    .then(res => res.text())
    .then(html => document.documentElement.innerHTML = html);
};

const displayData = function(res) {
  document.getElementById("mainContainer").innerHTML = res;
};

const createHTML = function(data) {
  return data.map(({ title, items }) => {
    let contents = `<h2>${title}</h2>`;
    contents += items
      .map(({ description, status }) => {
        return `<li>${description} - ${status}</li>`;
      })
      .join("");
    return contents;
  });
};

const initialize = function() {
  fetch("/todos")
    .then(res => res.json())
    .then(result => createHTML(result))
    .then(html => displayData(html));
};

window.onload = initialize;

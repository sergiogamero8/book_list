//Contructor de libros
function Book(title, author, isbn) {
  this.title = title;
  this.author = author;
  this.isbn = isbn;
}

//Contructor UI
function Ui() {}

Ui.prototype.addBooktoList = function (book) {
  const list = document.getElementById("book-list");
  //Crear un nuevo elemento tr
  const row = document.createElement("tr");

  row.innerHTML = `
      <td>${book.title}</td>
      <td>${book.author}</td>
      <td>${book.isbn}</td>
      <td><a href="#" class="delete">X</a></td>
      `;

  list.appendChild(row);
};
Ui.prototype.deleteBook = function (target) {
  target.parentElement.parentElement.remove();
};
//Método limpiar campos
Ui.prototype.clearFields = function () {
  (document.getElementById("title").value = ""),
    (document.getElementById("author").value = ""),
    (document.getElementById("isbn").value = "");
};
Ui.prototype.showAlert = function (msg, className) {
  //Crear un div para los mensages
  const div = document.createElement("div");
  //Añadir la classe
  div.className = `alert ${className}`;
  //Añadir el texto del mansage
  div.appendChild(document.createTextNode(msg));

  //Recoger el contenedor
  const contenedor = document.querySelector(".container");
  //Recoger el formulario
  const form = document.querySelector("#book-form");
  //Insertar el alert antes del formulario
  contenedor.insertBefore(div, form);

  //Esconder el alert
  setTimeout(function () {
    document.querySelector(".alert").remove();
  }, 2000);
};
//Evento Submit
document.getElementById("book-form").addEventListener("submit", function (e) {
  const title = document.getElementById("title").value,
    author = document.getElementById("author").value,
    isbn = document.getElementById("isbn").value;

  //Instanciar la UI
  const ui = new Ui();

  if (title === "" || author === "" || isbn === "") {
    ui.showAlert("Revisa los campos", "error");
  } else {
    //Instanciamos un libro
    const book = new Book(title, author, isbn);
    //Añadir el libro a la UI
    ui.addBooktoList(book);
    //Mostramos el alert
    ui.showAlert("Libro añadido corretcamente", "success");
    //Limpiar Campos
    ui.clearFields();
  }

  e.preventDefault();
});

//Evento para eliminar
document.getElementById("book-list").addEventListener("click", function (e) {
  if (e.target.className === "delete") {
    //Mostrar mensaje
    const ui = new Ui();

    //Eliminar libro de la Ui
    ui.deleteBook(e.target);
    ui.showAlert("El libro se ha eliminado correctamente", "success");
  }
});

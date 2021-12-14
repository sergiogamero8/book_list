//Clase Book
class Book {
  constructor(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
  }
}

//Local Storage
class Store {
  static getBooks() {
    let books;
    if (localStorage.getItem("books") === null) {
      books = [];
    } else {
      books = JSON.parse(localStorage.getItem("books"));
    }

    return books;
  }

  static addBook(book) {
    //traemos los books en un array
    const books = Store.getBooks();
    //Añadimos un libro
    books.push(book);
    //Guardamos el libro
    localStorage.setItem("books", JSON.stringify(books));
  }

  static displayBooks() {
    //traemos los books en un array
    const books = Store.getBooks();
    const ui = new Ui();
    books.forEach(function (book) {
      ui.addBooktoList(book);
    });
    console.log(books);
  }
  static deleteBook(isbn) {
    const books = Store.getBooks();

    books.forEach(function (book, indice) {
      console.log();
      if (book.isbn === isbn) {
        books.splice(indice, 1);
      }
    });

    //Guardamos el array sin el libro borrado
    localStorage.setItem("books", JSON.stringify(books));
  }
}
//Al cargar la Página creo la lista con los libros del Storage
document.addEventListener("DOMContentLoaded", Store.displayBooks);

//Contructor UI
class Ui {
  addBooktoList(book) {
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
  }
  deleteBook(target) {
    target.parentElement.parentElement.remove();
  }
  //Método limpiar campos
  clearFields() {
    (document.getElementById("title").value = ""),
      (document.getElementById("author").value = ""),
      (document.getElementById("isbn").value = "");
  }
  showAlert(msg, className) {
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
  }
}

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

    //Actualizamos el Storage
    Store.addBook(book);

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

    //Eliminar el libro del Storage
    Store.deleteBook(e.target.parentElement.previousElementSibling.textContent);

    ui.showAlert("El libro se ha eliminado correctamente", "success");
  }
});
marca_de_verificación_blanca;
ojos;
manos_levantadas;
Reaccionar;
Responder;

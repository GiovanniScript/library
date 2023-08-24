let myLibrary = [];

function Book(name, author, pages, readStatus) {
  return {
    name,
    author,
    pages,
    readStatus,
    bookID: myLibrary.length,
  };
}

function addBookToLibrary(name, author, pages, readStatus) {
  let newBook = Book(name, author, pages, readStatus);
  myLibrary.push(newBook);

  resetGrid();
  displayBooks();
}

function translateReadStatus(readStatus) {
  if (readStatus == true) {
    return "Completed";
  } else if (readStatus == false) {
    return "Unread";
  }
}

function removeBook(bookID) {
  myLibrary.splice(bookID, 1);
}

function editStatus(bookID) {
  if (myLibrary[bookID].readStatus == true) {
    myLibrary[bookID].readStatus = false;
  } else if (myLibrary[bookID].readStatus == false) {
    myLibrary[bookID].readStatus = true;
  }
}

function translateStatusButton(readStatus) {
  if (readStatus == true) {
    return "Unread";
  } else if (readStatus == false) {
    return "Complete";
  }
}

// User Interface
const body = document.querySelector("body");
const pageContainer = document.querySelector("#page");
const libraryContainer = document.querySelector(".library-grid-container");
const modal = document.querySelector("[data-modal]");
const newBookButton = document.querySelector(".new-book-btn");
const cancelNewBookButton = document.querySelector(".cancel-btn");
const createNewBook = document.querySelector(".create-book-btn");
const editStatusButton = document.querySelector(".edit-book-status-btn");
const removeBookButton = document.querySelector(".remove-book-btn");

function displayBooks() {
  myLibrary.forEach((book, index) => {
    const bookContainer = document.createElement("div");
    const bookContent = document.createElement("div");
    const title = document.createElement("h2");
    const author = document.createElement("p");
    const pages = document.createElement("p");
    const readStatus = document.createElement("p");
    const editStatusButton = document.createElement("button");
    const removeBookButton = document.createElement("button");
    bookContainer.setAttribute("class", "book-container mh-10 flex align-center h-fit-content");
    bookContent.setAttribute("class", "book-content");

    libraryContainer.appendChild(bookContainer);
    bookContainer.appendChild(bookContent);
    title.textContent = `${myLibrary[index].name}`;
    title.setAttribute("class", "title");
    author.textContent = `- ${myLibrary[index].author}`;
    author.setAttribute("class", "author");
    pages.textContent = `${myLibrary[index].pages} pages`;
    pages.setAttribute("class", "pages");
    readStatus.textContent = `${translateReadStatus(myLibrary[index].readStatus)}`;
    readStatus.setAttribute("class", "read-status");
    editStatusButton.textContent = `${translateStatusButton(myLibrary[index].readStatus)}`;
    editStatusButton.setAttribute("class", "edit-book-status-btn");
    removeBookButton.textContent = "Remove";
    removeBookButton.setAttribute("class", "remove-book-btn");

    bookContent.appendChild(title);
    bookContent.appendChild(author);
    bookContent.appendChild(pages);
    bookContent.appendChild(readStatus);
    bookContent.appendChild(editStatusButton);
    bookContent.appendChild(removeBookButton);

    editStatusButton.addEventListener("click", () => {
      editStatus(index);
      resetGrid();
      displayBooks();
    });

    removeBookButton.addEventListener("click", () => {
      removeBook();
      resetGrid();
      displayBooks();
    });
  });
}

function resetGrid() {
  libraryContainer.innerHTML = "";
}

newBookButton.addEventListener("click", () => {
  modal.showModal();
});

cancelNewBookButton.addEventListener("click", () => {
  modal.close();
});

createNewBook.addEventListener("click", () => {
  event.preventDefault();

  let title = document.querySelector("#title").value;
  let author = document.querySelector("#author").value;
  let pages = document.querySelector("#pages").value;
  let readStatus = document.querySelector("#read-status").checked;

  if (title !== "" && author !== "" && pages !== "") {
    modal.close();
    addBookToLibrary(title, author, pages, readStatus);
  }
});

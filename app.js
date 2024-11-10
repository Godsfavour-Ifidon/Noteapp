const addButton = document.querySelector(".addBtn");
const noteListWrapper = document.querySelector(".notes-list-wrapper");
const inputBox = document.querySelector(".input");
const errorMessage = document.querySelector(".error-message");
const deleteAllNotes = document.querySelector(".deleteAll");

let isEdit = null;
function saveToLocalStorage(saveText) {
  let notesLists;

  if (localStorage.getItem("notes") === null) {
    notesLists = [];
  } else {
    notesLists = JSON.parse(localStorage.getItem("notes"));
  }
  notesLists.push(saveText);
  localStorage.setItem("notes", JSON.stringify(notesLists));
}
function createNewNote(getText) {
  const li = document.createElement("li");
  const p = document.createElement("p");
  p.innerText = getText;
  li.appendChild(p);

  const editBtn = document.createElement("button");
  editBtn.innerText = "Edit";
  editBtn.classList.add("btn", "edit-Btn");

  const deleteBtn = document.createElement("button");
  deleteBtn.innerText = "Delete";
  deleteBtn.classList.add("btn", "delete-Btn");

  li.appendChild(editBtn);
  li.appendChild(deleteBtn);
  return li;
}

function addNewNote() {
  const getText = inputBox.value.trim();
  //   validate

  if (getText.length <= 0) {
    errorMessage.textContent = "Input must not be empty!";
    errorMessage.style.color = "red";
    setInterval(() => {
      errorMessage.textContent = "";
    }, 3000);

    return false;
  }

  function handleEditNote(noteToBeEdited) {
    let note = JSON.parse(localStorage.getItem("notes"));
    let index = note.indexOf(noteToBeEdited);
    // console.log(noteToBeEdited);
    note[index] = inputBox.value;
    localStorage.setItem("notes", JSON.stringify(note));
  }

  if (addButton.textContent === "Edit Note") {
    handleEditNote(isEdit.target.previousElementSibling.innerHTML);
    isEdit.target.previousElementSibling.innerHTML = getText;
    addButton.innerText = "Add Note";
    inputBox.value = "";
  } else {
    const newNote = createNewNote(getText);
    noteListWrapper.appendChild(newNote);
    inputBox.value = "";
    saveToLocalStorage(getText);
  }
}

function fetchNotes() {
  let notesLists;
  if (localStorage.getItem("notes" === null)) {
    notesLists = [];
  } else {
    notesLists = JSON.parse(localStorage.getItem("notes"));

    notesLists.forEach((item) => {
      const extractLi = createNewNote(item);
      noteListWrapper.appendChild(extractLi);
    });
  }
}

function removeFromLocalStorage(removeNotes) {
  let notesLists;

  if (localStorage.getItem("notes") === null) {
    notesLists = [];
  } else {
    notesLists = JSON.parse(localStorage.getItem("notes"));
  }

  const currentText = removeNotes.children[0].innerHTML;
  const index = notesLists.indexOf(currentText);
  notesLists.splice(index, 1);
  //   console.log(removeNotes.children[0].innerHTML);

  localStorage.setItem("notes", JSON.stringify(notesLists));
}

function handleDeleteOrEdit(e) {
  //   console.log(e.target.previousElementSibling, e.target.innerHTML);
  if (e.target.innerHTML === "Delete") {
    noteListWrapper.removeChild(e.target.parentElement);
    removeFromLocalStorage(e.target.parentElement);
    // console.log(e.target.parentElement);
  }

  if (e.target.innerHTML === "Edit") {
    inputBox.value = e.target.previousElementSibling.innerHTML;
    addButton.textContent = "Edit Note";
    inputBox.focus();
    isEdit = e;
  }
}

function deleteAllFromStorage(deleteall) {
  let notesLists;

  if (localStorage.getItem("notes") === null) {
    notesLists = [];
  } else {
    notesLists = JSON.parse(localStorage.getItem("notes"));
    const deleteNotes = notesLists.forEach((note) => note.innerHTML);
    notesLists.splice(deleteNotes);
  }
  localStorage.setItem("notes", JSON.stringify(deleteall));
}

deleteAllNotes.addEventListener("click", () => {
  while (noteListWrapper.firstChild) {
    noteListWrapper.removeChild(noteListWrapper.firstChild);
    deleteAllFromStorage(noteListWrapper.firstChild);
  }
});

addButton.addEventListener("click", addNewNote);
document.addEventListener("DOMContentLoaded", fetchNotes);
noteListWrapper.addEventListener("click", handleDeleteOrEdit);

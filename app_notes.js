let input_text = document.getElementById("input_text");
let add_btn = document.getElementById("add_button");
let div_notes = document.getElementById("div_notes");
let notes = JSON.parse(localStorage.getItem("div_notes")) || [];

const saveNotes = () => {
  localStorage.setItem("div_notes", JSON.stringify(notes));
};

let note_edit_text;

add_btn.addEventListener("click", () => {
  
  let value_text = input_text.value;
  let note_id = Date.now();
  let add_notes = document.createElement("div");
  let note_text = document.createElement("p");
  let buttons_container = document.createElement("div");

  let note_txt = {
    id: note_id,
    text: value_text,
  };

  add_notes.classList.add("add-notes");
  note_text.innerHTML = value_text;
  div_notes.appendChild(add_notes);
  add_notes.appendChild(note_text);
  add_notes.appendChild(buttons_container);

  buttons_container.classList.add("buttons-container");

  let button_edit = document.createElement("button");
  let button_delete = document.createElement("button");
  button_delete.classList.add("btn-delete");
  button_edit.classList.add("btn-edit");
  button_delete.textContent = "Delete";
  button_edit.textContent = "Edit";
  buttons_container.appendChild(button_edit);
  buttons_container.appendChild(button_delete);

  notes.push(note_txt);
  input_text.value = "";
  saveNotes();

  button_delete.addEventListener("click", () => {
    add_notes.remove();
    notes = notes.filter((note) => note.id !== note_id);

    saveNotes();
  });

  button_edit.addEventListener("click", () => {

    note_edit_text = document.createElement("textarea");
    note_edit_text.classList.add("note-edit-text");
    note_edit_text.value = value_text;

    add_notes.replaceChild(note_edit_text, note_text);

    button_delete.style.display = "none";
    button_edit.style.display = "none";

    let button_save = document.createElement("button");
    let button_cancel = document.createElement("button");
    button_save.classList.add("btn-save");
    button_cancel.classList.add("btn-cancel");
    button_save.textContent = "Save";
    button_cancel.textContent = "Cancel";
    buttons_container.appendChild(button_save);
    buttons_container.appendChild(button_cancel);

    button_cancel.addEventListener("click", () => {
      add_notes.replaceChild(note_text, note_edit_text);
      button_delete.style.display = "inline-block";
      button_edit.style.display = "inline-block";
      button_save.remove();
      button_cancel.remove();
    });

    button_save.addEventListener("click", () => {
      let updated_text = note_edit_text.value;
      note_text.innerHTML = updated_text;
      note_txt.text = updated_text;
      add_notes.replaceChild(note_text, note_edit_text);
      button_delete.style.display = "inline-block";
      button_edit.style.display = "inline-block";
      button_save.remove();
      button_cancel.remove();
      saveNotes();
    });
  });
});

editNote = (note_id) => {
  let add_notes = document.querySelector(`div.add-notes[data-id="${note_id}"]`);
  if (!add_notes) {
    console.error(`Note with id ${note_id} not found`);
    return;
  }
  let note_text = add_notes.querySelector("p");
  let buttons_container = add_notes.querySelector("div.buttons-container");

  let note_edit_text = document.createElement("textarea");
  note_edit_text.classList.add("note-edit-text");
  note_edit_text.value = note_text.innerHTML;

  add_notes.replaceChild(note_edit_text, note_text);

  let button_delete = buttons_container.querySelector(".btn-delete");
  let button_edit = buttons_container.querySelector(".btn-edit");
  button_delete.style.display = "none";
  button_edit.style.display = "none";

  let button_save = document.createElement("button");
  let button_cancel = document.createElement("button");
  button_save.classList.add("btn-save");
  button_cancel.classList.add("btn-cancel");
  button_save.textContent = "Save";
  button_cancel.textContent = "Cancel";
  buttons_container.appendChild(button_save);
  buttons_container.appendChild(button_cancel);

  button_cancel.addEventListener("click", () => {
    add_notes.replaceChild(note_text, note_edit_text);
    button_delete.style.display = "inline-block";
    button_edit.style.display = "inline-block";
    button_save.remove();
    button_cancel.remove();
  });

  button_save.addEventListener("click", () => {
    let updated_text = note_edit_text.value;
    note_text.innerHTML = updated_text;
    let note_index = notes.findIndex((note) => note.id === note_id);
    notes[note_index].text = updated_text;
    add_notes.replaceChild(note_text, note_edit_text);
    button_delete.style.display = "inline-block";
    button_edit.style.display = "inline-block";
    button_save.remove();
    button_cancel.remove();
    saveNotes();
  });
};

loadNotes = () => {
  notes.forEach((note) => {
    let add_notes = document.createElement("div");
    let note_text = document.createElement("p");
    let buttons_container = document.createElement("div"); // nuevo div

    add_notes.classList.add("add-notes");
    note_text.innerHTML = note.text;
    add_notes.setAttribute("data-id", note.id); // añadir el atributo "data-id"
    div_notes.appendChild(add_notes);
    add_notes.appendChild(note_text);
    add_notes.appendChild(buttons_container);

    buttons_container.classList.add("buttons-container");

    let button_edit = document.createElement("button");
    let button_delete = document.createElement("button");
    button_delete.classList.add("btn-delete");
    button_edit.classList.add("btn-edit");
    button_delete.textContent = "Delete";
    button_edit.textContent = "Edit";
    buttons_container.appendChild(button_edit);
    buttons_container.appendChild(button_delete);

    button_delete.addEventListener("click", () => {
      add_notes.remove();
      notes = notes.filter((note_item) => note_item.id !== note.id);
      saveNotes();
    });

    button_edit.addEventListener("click", () => {
      editNote(note.id);
    });
  });
};

loadNotes();

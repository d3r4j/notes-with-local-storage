export default class notesView {
    constructor(root, { onNoteSelect, onNoteAdd, onNoteEdit, onNoteDelete } = {}) {
        this.root = root;
        this.onNoteSelect = onNoteSelect;
        this.onNoteAdd = onNoteAdd;
        this.onNoteEdit = onNoteEdit;
        this.onNoteDelete = onNoteDelete;

        this.root.innerHTML = ` 
         <div class="notes__sidebar">
            <button type="button" class="notes__add">Add Notes</button>
            <div class="notes__list"></div>
        </div>
        <div class="notes__preview">
            <input class="notes__title" type="text" placeholder="New Note..">
            <textarea class="notes__body">Take Note..</textarea>
        </div>

        `

        const btnAddnote = this.root.querySelector(".notes__add");
        const inpTitle = this.root.querySelector(".notes__title");
        const inpBody = this.root.querySelector(".notes__body");


        btnAddnote.addEventListener("click", () => {
            this.onNoteAdd();
        });


        [inpTitle, inpBody].forEach(inputField => {
            inputField.addEventListener("blur", () => {
                const updatedTitle = inpTitle.value.trim();
                const updatedBody = inpBody.value.trim();


                this.onNoteEdit(updatedTitle, updatedBody)
            })

        });

        // console.log(this._createListItemHTML(300, "hey", "yo mf", new Date()));
        this.updateNotePreviewVisibility(false);

    }

    _createListItemHTML(id, title, body, updated) {
        const MAX_BODY_LENGTH = 60;
        return `
        <div class = "notes__list-item" data-note-id="${id}">
        <div class= "notes__small-title"> ${title} </div>
        <div class= "notes__small-body"> 
            ${body.substring(0, MAX_BODY_LENGTH)}
            ${body.length > MAX_BODY_LENGTH ? "..." : ""} 
        </div>
        <div class= "notes__small-updated"> 
            ${updated.toLocaleString(undefined, { dateStyle: "full", timeStyle: "short" })} 
        </div>
        </div>
        `
    }


    //update list of  notes in side bar 
    updateNoteList(notes) {
        const notesListContainer = this.root.querySelector(".notes__list");
        //empty list 
        notesListContainer.innerHTML = ""

        for (const note of notes) {
            const html = this._createListItemHTML(note.id, note.title, note.body, new Date(note.updated)); //update is a iso time stamp so we do new date
            notesListContainer.insertAdjacentHTML("beforeend", html);
        }
        // addinng select/delete events for each note / list-item

        notesListContainer.querySelectorAll(".notes__list-item").forEach(noteListItem => {
            noteListItem.addEventListener("click", () => {
                this.onNoteSelect(noteListItem.dataset.noteId);
            })

            noteListItem.addEventListener("dblclick", () => {
                // console.log("dblclick detected for note ID:", noteListItem.dataset.noteId);
                const doDelete = confirm("delete note?")
                if (doDelete) {
                    this.onNoteDelete(noteListItem.dataset.noteId);
                }
            })
        })
    }


    updateActiveNote(note) {
        this.root.querySelector(".notes__title").value = note.title;
        this.root.querySelector(".notes__body").value = note.body;
        this.root.querySelectorAll(".notes__list-item").forEach(noteListItem => {
            noteListItem.classList.remove("notes__list-item--selected")
        });
        this.root.querySelector(`.notes__list-item[data-note-id="${note.id}"]`).classList.add("notes__list-item--selected")
    }

    updateNotePreviewVisibility(visible) {
        this.root.querySelector(".notes__preview").style.visibility = visible ? "visible" : "hidden";
    }
}
import notesView from "./notesView.js";
import notesAPI from "./notesAPI.js"

export default class App {
    constructor(root) {
        this.notes = [];
        this.activeNote = null;
        this.view = new notesView(root, this._handlers());

        this._refreshNotes();
    }

    _refreshNotes() {
        const notes = notesAPI.getALLNotes()


        this._setNotes(notes);
        //if note is not empty then
        if (notes.length > 0) {

            this._setActiveNote(notes[0]) //most recent note will be at 1st position
        }
    }

    _setNotes(notes) {
        this.notes = notes; //keep reference to current list of notes
        this.view.updateNoteList(notes);
        this.view.updateNotePreviewVisibility(notes.length > 0);
    }

    _setActiveNote(note) {
        this.activeNote = note;
        this.view.updateActiveNote(note);

    }

    _handlers() {
        return {
            onNoteSelect: noteId => {
                // console.log("note selected" + noteId)
                const selectedNote = this.notes.find(note => note.id === parseInt(noteId, 10));
                this._setActiveNote(selectedNote);
            },
            onNoteAdd: () => {
                // console.log("note added")
                const newNote = {
                    title: "New Note",
                    body: "note details.."
                }
                notesAPI.saveNote(newNote);
                this._refreshNotes();
            },
            onNoteEdit: (title, body) => {
                // console.log("note edited" + title, body)
                notesAPI.saveNote(
                    {
                        id: this.activeNote.id,
                        title,
                        body
                    })

                this._refreshNotes();
            },

            onNoteDelete: noteId => {
                // console.log("note deleted" + noteId)

                notesAPI.deleteNote(parseInt(noteId, 10));
                this._refreshNotes()
            },
        };
    }
}
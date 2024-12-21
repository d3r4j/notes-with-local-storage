export default class notesAPI {
    static getALLNotes() {
        const notes = JSON.parse(localStorage.getItem("notesapp-notes") || "[]");
        return notes.sort((a, b) => {
            return new Date(a.updated) > new Date(b.updated) ? -1 : 1;
        });
    }

    static saveNote(noteToSave) {
        const notes = notesAPI.getALLNotes();
        const existing = notes.find(notes => notes.id === noteToSave.id);
        //edit or update

        if (existing) {
            existing.title = noteToSave.title
            existing.body = noteToSave.body
            existing.updated = new Date().toISOString();

        } else {
            noteToSave.id = Math.floor(Math.random() * 1000000)
            noteToSave.updated = new Date().toISOString();
            notes.push(noteToSave)



        }
        localStorage.setItem("notesapp-notes", JSON.stringify(notes));

    }

    static deleteNote(id) {
        const notes = notesAPI.getALLNotes(); // get existing notes 

        const newNotes = notes.filter(note => note.id != id)
        localStorage.setItem("notesapp-notes", JSON.stringify(newNotes))

    }


}
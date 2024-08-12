const chalk = require("chalk");
const fs = require("fs/promises");
const path = require('path');

const notesPath = path.join(__dirname, 'db.json');
//console.log(notesPath);

async function addNote(title) {
  // const notes = require("./db.json");
  const notes = await getNotes();
  
  // const notes = Buffer.from(buffer).toString('utf-8');
  
  
  const note = {
    title,
    id: Date.now().toString(),
  };

  notes.push(note);
  
  await fs.writeFile("./db.json", JSON.stringify(notes));
  console.log(chalk.bgGreen.inverse("Note was added"));
}

//addNote('Test');

async function getNotes() {
  const notes = await fs.readFile(notesPath, {encoding: 'utf-8'});
  return Array.isArray(JSON.parse(notes)) ? JSON.parse(notes) : [];
}

async function printNotes () {
  const notes = await getNotes();

  console.log(chalk.bgBlue('Here is the list of notes'));
  notes.forEach(note => {
    console.log(chalk.blue(note.id), chalk.blue(note.title));
  });
}

async function removeNote(id) {
  const notes = await getNotes();

  const newNotes = notes.filter((note) => note.id !== id);

  await fs.writeFile("./db.json", JSON.stringify(newNotes));
  console.log(chalk.bgGreen.inverse(`Note id:${id} was removed`));
}

module.exports = { addNote, printNotes, removeNote };
//export default (addNote, getNotes);

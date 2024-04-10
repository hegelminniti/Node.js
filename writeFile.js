const fs = require('node:fs');

const data = 'File di testo creato usando il metodo fs.writeFile()';

const filePath = 'example.txt';

fs.writeFile(filePath, data, (err) => {
  if (err) {
    console.error('Errore:', err);
  } else {
    console.log(`Il file "${filePath}" è stato creato con successo.`);
  }
});
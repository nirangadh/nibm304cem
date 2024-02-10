const fs = require('fs');

// Reading the contents of a file
fs.readFile('example.txt', 'utf8', (err, data) => {
    if (err) {
        console.error(err);
        return;
    }
    console.log('File Contents:', data);
});

// Writing data to a new file
const contentToWrite = 'This is some content to write to a file.';
fs.writeFile('newFile.txt', contentToWrite, (err) => {
    if (err) {
        console.error(err);
        return;
    }
    console.log('File has been written.');
});

// Checking if a file or directory exists
const fileOrDirPath = 'example.txt';
fs.access(fileOrDirPath, fs.constants.F_OK, (err) => {
    if (err) {
        console.error(`${fileOrDirPath} does not exist.`);
        return;
    }
    console.log(`${fileOrDirPath} exists.`);
});

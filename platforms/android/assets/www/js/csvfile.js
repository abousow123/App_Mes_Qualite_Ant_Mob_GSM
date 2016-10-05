/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


var txtToWrite = "Hi";
var createFileSuccess = false;
var CSVFileEntry = null;

/*
 * 
 * @returns {nothing}
 */

function createCSVAndSendByMail(data) {
    formatToCSVString(data);
    createCSVFile();
}


function createCSVFile() {

    window.requestFileSystem(window.TEMPORARY, 5 * 1024 * 102, onSuccessLoadFs, onErrorLoadFs);

}


function onSuccessLoadFs(fs) {
    alert('file system open: ' + fs.name);
    createFile(fs.root, "newTempFile.txt", false);
}


function createFile(dirEntry, fileName, isAppend) {
    // Creates a new file or returns the file if it already exists.
    dirEntry.getFile(fileName, {create: true, exclusive: false}, function (fileEntry) {

        writeFile(fileEntry, null, isAppend);

    }, onErrorCreateFile);

}

function writeFile(fileEntry, dataObj) {
    // Create a FileWriter object for our FileEntry.
    fileEntry.createWriter(function (fileWriter) {

        fileWriter.onwriteend = function () {
            alert("Successful file write...");
            readFile(fileEntry);
            createFileSuccess = true;
            CSVFileEntry = fileEntry;
        };

        fileWriter.onerror = function (e) {
            alert("Failed file write: " + e.toString());
        };

        // create a new Blob 
        
        dataObj = new Blob(['' + txtToWrite], {type: 'text/plain'});

        fileWriter.write(dataObj);
    });
}

function readFile(fileEntry) {

    fileEntry.file(function (file) {
        var reader = new FileReader();

        reader.onloadend = function () {
            alert("Successful file read: \n" + fileEntry.fullPath + "\n" + this.result);
//            displayFileData(fileEntry.fullPath + ": " + this.result);
        };

        reader.readAsText(file);

    }, onErrorReadFile);
}



/*
 * Format a JSON table into à CSV String and 
 * store it to txtToWrite variable defined above.
 * @param {JSON table} data
 * @returns {Nothing}
 */
function formatToCSVString(data) {
    doInsertOnDB('4h5mn', -83, 96, 1, '4h5mn-83961');
    txtToWrite = "Horodatage,Niveau du Signal(en Db),Niveau de Batterie,En charge,Hashkey";
    for (var i = 0; i < data.length; i++) {
        txtToWrite += data[i].horodatage + ","
                + data[i].niveau_signal + ","
                + data[i].niveau_batterie + ","
                + data[i].branchee + ","
                + data[i].hashkey + "\n";
    }
}

/*
 * 
 * onErrorXXX functions
 */

function onErrorLoadFs() {
    alert('Error: unable to load filesystem');
}

function onErrorCreateFile() {
    alert('Error: unable to create the file');
}

function onErrorReadFile() {
    alert('Error: unable to read the file');
}
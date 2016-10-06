/*
 * Propose le service qui cree le fichier qui cree et ecris dans le
 * fichier csv puis l'envoi par mail par l'intermediaire
 * du service email,
 * il prend en argument un objet JSON des données enregistrées
 * dans la base de données ==> createCSVAndSendByMail
 *
 *  A utiliser donc comme argument dans la fonction getData, le service
 *  de récupération des données de la BD (dans database.js)
 *
 *  e.g: getData(createCSVAndSendByMail)
 */


var txtToWrite = ""; //String que sera ecrit dans le fichier CSV

/*
 *
 * @returns {nothing}
 */

function createCSVAndSendByMail(data) {
    formatToCSVString(data);
    createCSVFile();
}


function createCSVFile() {

    window.requestFileSystem(window.PERSISTENT, 5 * 1024 * 102, onSuccessLoadFs, onErrorLoadFs);

}


function onSuccessLoadFs(fs) {
    alert('file system open: ' + fs.name);
    window.resolveLocalFileSystemURL(cordova.file.externalCacheDirectory, function (entry) {
        createFile(entry, "test.csv", false);
    });
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
            sendMail(fileEntry.toURL());
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
            alert("Successful file read: \n" + fileEntry.fullPath + "\n" + fileEntry.toURL() + "\n" + this.result);
        };

        reader.readAsText(file);

    }, onErrorReadFile);
}



/*
 * Format a JSON table into à CSV String and
 * store it to txtToWrite variable defined above.
 * Transforme un objet JSON contenant les données
 * enregistrées dans la base de données et
 * les transformes en une String au format CSV.
 * @param {JSON table} data
 * @returns {Nothing}
 */
function formatToCSVString(data) {
    var curentdateTime = getDate();
    doInsertOnDB(curentdateTime, -83, 96, 1, curentdateTime + '-83961');
    txtToWrite = "Horodatage,Niveau du Signal(en Db),Niveau de Batterie(Décibel),En charge,Hashkey\n";
    for (var i = 0; i < data.length; i++) {
        var enCharge = null;
        if (data[i].branchee)
            enCharge = 'Oui';
        else
            enCharge = 'Non';
        txtToWrite += data[i].horodatage + ","
                + data[i].niveau_signal + ","
                + data[i].niveau_batterie + ","
                + enCharge + ","
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
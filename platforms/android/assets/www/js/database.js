/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var db = null;
var data = null;

document.addEventListener('deviceready', function () {
//    alert('database on device ready');
    db = window.sqlitePlugin.openDatabase({name: 'signal.db', location: 'default'});
    db.transaction(populateDB, function (tx, error) {
        alert(error.message);
    });
}, false);

function populateDB(tx) {
//    alert('OnPopulateDB');
    var query = 'CREATE TABLE IF NOT EXISTS call_data' +
            ' (' +
            'horodatage VARCHAR(50) PRIMARY KEY,' +
            'niveau_signal INTEGER,' +
            'niveau_batterie INTEGER,' +
            'branchee INTEGER,' +
            'hashkey VARCHAR(200)' +
            ');';
    tx.executeSql(query, erreur);
}


function erreur(error) {
    alert(" erreur: " + error.message);
}

//it's for inserting data
function doInsertOnDB(horodatage, niveau_signal, niveau_batterie, branchee, hashkey) {
//    alert('on_doInsertOnDB');
    db.transaction(function (tx) {
        var query = 'INSERT INTO call_data(horodatage,niveau_signal,niveau_batterie,branchee,hashkey) VALUES(?,?,?,?,?);';
        tx.executeSql(query, ['"' + horodatage + '"', niveau_signal, niveau_batterie, branchee, '"' + hashkey + '"'], erreur);
    });
}


// it's for deleting data
function doDeleteAll() {
    db.transaction(function (tx) {
        tx.executeSql("delete from call_data;");
    }, erreur, function () {
        alert('data are deleted');
    });
}

function readAll() {
//    alert('on readAll');
    var myresult = [];
    var myObject = function (horodatage, niveau_signal, niveau_batterie, branchee, hashkey) {
        this.horodatage = horodatage;
        this.niveau_signal = niveau_signal;
        this.niveau_batterie = niveau_batterie;
        this.branchee = branchee;
        this.hashkey = hashkey;
    };
    var len = null;
    //permise me to exploit asynchronous transfer mode
    var def = $.Deferred();
//    if (db == null)
//        alert('db == null');
//    else
//        alert('db not null');
    db.transaction(function (tx) {
//        alert('on readAll/db.transaction');
        tx.executeSql('SELECT horodatage,niveau_signal,niveau_batterie,branchee,hashkey FROM call_data', [], function (tx, result) {
            len = result.rows.length;
            if (len > 0)
            {
                for (var i = 0; i < len; i++)
                {
                    myresult.push(new myObject(
                            result.rows.item(i).horodatage,
                            result.rows.item(i).niveau_signal,
                            result.rows.item(i).niveau_batterie,
                            result.rows.item(i).branchee,
                            result.rows.item(i).hashkey
                            ));
                }

                def.resolve(myresult);
            }
        }, erreur);
    });
//    alert('finished - readAll / db.transaction');
    return def.promise();
}
//just for test anonymous function in getData()
function test(t) {
    alert("goog job:" + t[0].horodatage);
}

// use this function to do what you like with data
// call it with your function to manipulate myresult
//myresult is an array
//you could use it like: (in a loop)
//myresult[i].horodatage or myresult[i].branchee etc...
function getData(anonymousfunction) {
//    alert('on getData');
    readAll().done(function (myresult) {
        anonymousfunction(myresult);
    });
}
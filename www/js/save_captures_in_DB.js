/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */





function startSavingDataInDB() {
    if (isfirstTime) {
        saveCurrentDataInDB();
        isfirstTime = false;
    }
    processSavingDataInDB = setInterval(saveCurrentDataInDB, 30000);
}

function stopSavingDataInDB() {
    clearInterval(processSavingDataInDB);
}

function clearSavedDataInDB() {
    doDeleteAll();
    isfirstTime = true;
}

//Add new line of current datas in the database
function saveCurrentDataInDB() {
    var curentdateTime = getDate();
    var signalDbm = getSignalDbm();
    var batterieLevel = getBatterieLevel();
    var batterieEnChargeInt = isBatteriePluggedInteger();
    var hashkey = "" + curentdateTime + signalDbm + batterieLevel + batterieEnChargeInt;

    //Update DB (insert value on DB)
    doInsertOnDB(curentdateTime, signalDbm, batterieLevel, batterieEnChargeInt, hashkey);
}

var processSavingDataInDB = null;
var isfirstTime = true;
/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

function sendMail(fileFullPath) {
    cordova.plugins.email.isAvailable(
            function (isAvailable) {
                if (isAvailable)
//                    alert('Service is available');
                    cordova.plugins.email.open({
                        to: '',
                        subject: 'Fichier CSV contenant des données capturées',
                        isHtml: true,
                        body: '<h1>Ci-joint un fichier CSV contenant les données capturées</h1>',
                        attachments: fileFullPath
                    });
                else
                    alert('Service is not available');
            }
    );
}
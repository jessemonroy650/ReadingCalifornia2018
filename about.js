var app = {
    version : '1.0.0',
    triggerEvent : 'click',

    // - https://videlais.com/2014/08/21/lessons-learned-from-detecting-apache-cordova/
    isCordovaApp : function () {
        return (typeof window.cordova !== "undefined");
    },
    //
    isKnownDevice : function (obj) {
        var validPGDevices = [
            'armv7',
            'iPad',
            'iPhone',
            'iPod'
        ];
        var i = 0, result = -1, answer = false;
        for (i = 0; i < validPGDevices.length; i++){
            // https://www.w3schools.com/jsref/jsref_search.asp
            result = obj.search(validPGDevices[i]);
            if (result != -1) {
                answer = validPGDevices[i]; break;
            }
        }
        return answer;
    },
    //
    goHome : function () {
        window.location = 'index.html';
    },
    //
    hook : function () {
        document.getElementById('home').addEventListener(app.triggerEvent, app.goHome, false);
    },
    //
    onDOMContentLoaded : function () {
        document.getElementById('navCodeName').innerHTML = navigator.appCodeName;
        document.getElementById('navName').innerHTML     = navigator.appName;
        document.getElementById('navVersion').innerHTML  = navigator.appVersion;
        document.getElementById('navPlatform').innerHTML = navigator.platform;
        //
        app.hook();
    },
    //
    onDeviceReady : function () {
        //alert("device ready.");
        // change from the default to a mobile device event
        app.triggerEvent = 'touchend';
        document.getElementById('triggerEvent').innerHTML   = app.triggerEvent;
        document.getElementById('appDirectory').innerHTML   = cordova.file.applicationDirectory;
    }
}

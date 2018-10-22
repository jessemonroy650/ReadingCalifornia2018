var app = {
    version : '1.0.0',
    triggerEvent : 'click',
    a1File     : "www/sounds/PeppersPatch1.ogg",
    audioFile  : "www/sounds/BuddyHolly-Everyday.ogg",
	volume     : 1.0,


    about : function () {
        window.location = 'about-us.html';
    },
    //
    toggleVolume : function () {
        el = document.getElementById('volume');
        if (volume > 0 ) {
            volume = 0.0;
            el.innerHTML = 'Audio&nbsp;is&nbsp;Off';
            el.classList.remove('button-action');
            el.classList.add('button-caution');
        } else {
            volume = 1.0;
            el.innerHTML = 'Audio&nbsp;is&nbsp;On';
            el.classList.remove('button-caution');
            el.classList.add('button-action');
        }
        readingAudio.volumeAudio(volume);		
    },
    //
    exitApp : function () {
        navigator.app.exitApp();
    },
    //

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
    onLoad : function () {
        //alert("body loaded.");
    },
    //
    hook : function () {
        document.getElementById('about').addEventListener(app.triggerEvent, app.about, false);
        document.getElementById('exitApp').addEventListener(app.triggerEvent, app.exitApp, false);
        document.getElementById('volume').addEventListener(app.triggerEvent, app.toggleVolume, false);
    },
    //
    onDOMContentLoaded : function () {
        app.hook();
    },
    //
    onDeviceReady : function () {
        //alert("device ready.");
        // change from the default to a mobile device event
        app.triggerEvent = 'touchend';
        //
        // Play some sound
        //
        readingAudio.init('runningStatus');
        readingAudio.playAudio(cordova.file.applicationDirectory + app.audioFile, 'success', 'errStatus');
    }
}

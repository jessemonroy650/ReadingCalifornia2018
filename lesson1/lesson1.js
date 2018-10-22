var lesson1 = {
    version      : '1.0.0',
    triggerEvent : 'click',
	volume       : 1.0,
    success      : 'success',
    error        : 'error',
    isMobileApp  : false,
    home         : '',
    forward      : '',
    back         : '',
    audioFile    : '',

    // - https://videlais.com/2014/08/21/lessons-learned-from-detecting-apache-cordova/
    isCordovaApp : function () {
        return (typeof window.cordova !== "undefined");
    },
    //
    goHome    : function () { window.location = lesson1.home; },
    goBack    : function () { window.location = lesson1.back; },
    goForward : function () { window.location = lesson1.forward; },
    play      : function () {
        if (lesson1.isMobileApp) {
            readingAudio.playAudio(lesson1.audioFile);
        } else {
            // This is a WebApp.
           var player = new Audio();
           player.src = 'file:' + lesson1.audioFile;
           console.log('file => ' + player.src);
           player.play();
        }
    },
    //
    toggleVolume : function () {
        // 
        el = document.getElementById('volume');
        if (lesson1.volume > 0 ) {
            lesson1.volume = 0.0;
            el.innerHTML = 'Audio&nbsp;is&nbsp;Off';
            el.classList.remove('button-action');
            el.classList.add('button-caution');
        } else {
            lesson1.volume = 1.0;
            el.innerHTML = 'Audio&nbsp;is&nbsp;On';
            el.classList.remove('button-caution');
            el.classList.add('button-action');
        }
        readingAudio.volumeAudio(lesson1.volume);		
    },
    //
    hook : function () {
        document.getElementById('goHome').addEventListener(lesson1.triggerEvent, lesson1.goHome, false);
        document.getElementById('goBack').addEventListener(lesson1.triggerEvent, lesson1.goBack, false);
        document.getElementById('replay').addEventListener(lesson1.triggerEvent, lesson1.play, false);
        document.getElementById('goForward').addEventListener(lesson1.triggerEvent, lesson1.goForward, false);
        //
        //document.getElementById('toggleVolume').addEventListener(lesson1.triggerEvent, lesson1.toggleVolume, false);
    },
    //
    init : function (file, s, e) {
        lesson1.audioFile = file;
        if (s) { lesson1.success   = s; }
        if (e) { lesson1.error     = e; }
    }
}

//
// PhoneGap is ready
//
function onDeviceReady() {
    //alert("device ready.");
    lesson1.isMobileApp  = lesson1.isCordovaApp();
    // change from the default to a mobile device event
    lesson1.triggerEvent = 'touchend';
    lesson1.init(cordova.file.applicationDirectory + lesson1.audioFile);
    //
    // Play some sound
    //
    lesson1.play();
}

//
//    Audio player
//
// v1.0.1 - 2013-01-26 - removed alert() from onError()
// v1.1.0 - 2015-03-23 - added volume control (should be global)
// v1.2.0 - 2018-09-14 - uncomment onError()
// v2.0.0 - 2018-10-16 - change to standalone Object module
// v2.0.1 - 2018-10-17 - update for general use; make sure there is a div Id when updating
var readingAudio = {
    my_media     : null,  // links Cordova plugin object
    mediaTimer   : null,  // in memory timer
    mediaPointer : 'readingAudioPosition', // elementId
    divRunning   : '',
    divStatus    : '',
    divErr       : '',

    init : function (runningStat, onScreenPtr) {
        if (runningStat) {
            readingAudio.divRunning   = runningStat;
        }
        if (onScreenPtr) {
            readingAudio.mediaPointer = onScreenPtr;
        }
        readingAudio.mediaTimer = null;
    },
    // running status
    runningStatus : function (status) {
        if (readingAudio.divRunning) {
            document.getElementById(readingAudio.divRunning).innerHTML = status;
        }
    },
    // onSuccess Callback
    onSuccess : function (stat) {
        var mediaStatus = {
            0 : 'none',     // Media.MEDIA_NONE    
            1 : 'starting', // Media.MEDIA_STARTING
            2 : 'running',  // Media.MEDIA_RUNNING 
            3 : 'paused',   // Media.MEDIA_PAUSED  
            4 : 'stopped'   // Media.MEDIA_STOPPED 
        };
        if (readingAudio.divStatus) {
            document.getElementById(readingAudio.divStatus).innerHTML = mediaStatus[stat];
        }
    },
    // onError Callback 
    onError :   function (error) {
        var mediaError  = {
            0 : 'aborted',       // MediaError.MEDIA_ERR_ABORTED
            1 : 'network',       // MediaError.MEDIA_ERR_NETWORK 
            2 : 'decode',        // MediaError.MEDIA_ERR_DECODE 
            3 : 'none supported' // MediaError.MEDIA_ERR_NONE_SUPPORTED
        };
        if (readingAudio.divErr) {
            document.getElementById(readingAudio.divErr).innerHTML   = mediaError[error];
        }
    },
    // Set audio position
    setAudioPosition : function (position) {
        if (readingAudio.mediaPointer) {
            document.getElementById(readingAudio.mediaPointer).innerHTML = position;
        }
    },
    //
    // Play audio
    //
    playAudio : function (src, divS, divEr) {
        //document.getElementById('runningStatus').innerHTML = 'loading ...';
        if (readingAudio.my_media == null) {
            // Create Media object from src
            readingAudio.my_media = new Media(src, readingAudio.onSuccess, readingAudio.onError, readingAudio.runningStatus);
        }
        if (divS)  { readingAudio.divStatus = divS; }
        if (divEr) { readingAudio.divErr    = divEr; }
        // else play current audio
        // Play audio
        readingAudio.my_media.play();

        // Update my_media position every second
        if (readingAudio.mediaTimer == null) {
            readingAudio.mediaTimer = setInterval(function() {
                // get my_media position
                readingAudio.my_media.getCurrentPosition(
                    // success callback
                    function(position) {
                        if (position > -1) {
                            readingAudio.setAudioPosition((position) + " sec");
                        }
                    },
                    // error callback
                    function(e) {
                        readingAudio.setAudioPosition("Error: " + e);
                    }
                )
            }, 1000);
        }
    },
    //
    // Pause audio
    // 
    pauseAudio : function () {
        if (readingAudio.my_media) {
            readingAudio.my_media.pause();
        }
        // XXX Need to pause timer/position pointer
    },
    // Stop audio
    stopAudio : function () {
        if (readingAudio.my_media) {
            readingAudio.my_media.stop();
        }
        // remove the background timer
        clearInterval(readingAudio.mediaTimer);
        readingAudio.mediaTimer = null;
    },
    // Control audio on/off
    // level = 0.0(all off)<->1.0(all on)
    volumeAudio : function (level) {
        readingAudio.my_media.setVolume(level);
    }
}

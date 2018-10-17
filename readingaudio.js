        //
        // Audio player
        //
        // v1.0.1 - 2013-01-26 - removed alert() from onError()
        // v1.1.0 - 2015-03-23 - added volume control (should be global)
        // v1.2.0 - 2018-09-14 - uncomment onError()
        // v2.0.0 - 2018-10-16 - change to standalone Object module
var readingAudio = {
    my_media     : null,  // links Cordova plugin object
    mediaTimer   : null,  // in memory timer
    mediaPointer : 'readingAudioPosition', // elementId

    init : function (onScreenPtr) {
        if (onScreenPtr) {
            readingAudio.mediaPointer = onScreenPtr;
        }
        readingAudio.mediaTimer = null;
    },
    // onSuccess Callback
    onSuccess : function () {
        var mediaStatus = {
            0 : 'none',     // Media.MEDIA_NONE    
            1 : 'starting', // Media.MEDIA_STARTING
            2 : 'running',  // Media.MEDIA_RUNNING 
            3 : 'paused',   // Media.MEDIA_PAUSED  
            4 : 'stopped'   // Media.MEDIA_STOPPED 
        };

    },
    // onError Callback 
    onError :   function (error) {
        var mediaError  = {
            0 : 'aborted',       // MediaError.MEDIA_ERR_ABORTED
            1 : 'network',       // MediaError.MEDIA_ERR_NETWORK 
            2 : 'decode',        // MediaError.MEDIA_ERR_DECODE 
            3 : 'none supported' // MediaError.MEDIA_ERR_NONE_SUPPORTED
        };


    },
    // Set audio position
    setAudioPosition : function (position) {
        document.getElementById(mediaPointer).innerHTML = position;
    },
    //
    // Play audio
    //
    playAudio : function (src) {
        if (readingAudio.my_media == null) {
            // Create Media object from src
            readingAudio.my_media = new Media(src, onSuccess, onError);
        }
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
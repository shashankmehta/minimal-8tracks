var m = {
    isPlaying: function(){
        if($('#player_pause_button').length === 1 && $('#player_pause_button').css('display') === 'block'){
            return true;
        }
        return false;
    },

    play: function(){
        $('#player_play_button').click();
    },

    pause: function(){
        $('#player_pause_button').click();
    },

    skip: function(){
        $('#player_skip_button').click();
        setTimeout(function(){
            m.getCurrentTrack();
        },1000);
    },

    togglePlay: function(){
        if(m.isPlaying() === true){
            $('#minimal .m-controls .toggle-play').removeClass('i-pause').addClass('i-play');
            m.pause();
        }
        else {
            $('#minimal .m-controls .toggle-play').removeClass('i-play').addClass('i-pause');
            m.play();
        }
    },

    createView: function(){

        var view = multiline(function(){/*
            <div id="minimal">
                <div class="m-close">&times;</div>
                <div class="m-content">
                    <div class="m-cover">
                        <img src="" alt="">
                        <div class="m-progress">
                            <div class="m-progress-meter"></div>
                        </div>
                    </div>
                    <div class="m-info">
                        <div class="m-controls">
                            <span class="m-icon toggle-play"></span>
                            <span class="i-skip m-icon"></span>
                        </div>
                        <div class="m-track">
                            <div class="m-t"></div>
                            <div class="m-a"></div>
                        </div>
                    </div>
                </div>
            </div>
        */});

        $('body').scrollTop(0);
        $('body').append(view).css('overflow', 'hidden');

        if(m.isPlaying() === true){
            $('#minimal .toggle-play').addClass('i-pause');
        }
        else {
            $('#minimal .toggle-play').addClass('i-play');
        }

        m.attachClickHandlers();
        m.appendImage();
        m.getCurrentTrack();
        m.setLoop();
    },

    appendImage: function(){
        var src = $('.mix_art_wrapper img').attr('src');
        $('#minimal .m-cover img').attr('src', src);
    },

    getCurrentTrack: function(){
        var t = $($('#now_playing .title_artist .t')[0]).text();
        var a = $($('#now_playing .title_artist .a')[0]).text();

        $('#minimal .m-track .m-t').text(t);
        $('#minimal .m-track .m-a').text(a);
    },

    removeView: function(){
        $('body').css('overflow', 'auto');
        $('#minimal').remove();

        if(window.localStorage.minimalPlaying !== undefined){
            clearInterval(window.localStorage.minimalPlaying);
            window.localStorage.minimalPlaying = undefined;
        }
    },

    attachClickHandlers: function(){
        $('#minimal .m-close').click(m.removeView);
        $('#minimal .m-controls .toggle-play').click(m.togglePlay);
        $('#minimal .m-controls .i-skip').click(m.skip);
    },

    progressHandler: function(percent){
        if(percent > 0.95){
            setTimeout(function(){
                m.getCurrentTrack();
            }, 1500);
        }

        var current = $('#minimal .m-progress-meter').width();
        var diff = percent - current / 300;
        var val = diff * 300;
        $('#minimal .m-progress-meter').animate({
            width: '+='+val
        }, 1000);
    },

    setLoop: function(){
        var total = $('#player_progress_bar').width();
        window.localStorage.minimalPlaying = setInterval(function(){
            var current = $('#player_progress_bar_meter').width();
            var percent = current / total;
            m.progressHandler(percent);
        }, 1000);
    },

    init: function(){
        if($('#minimal').length === 0){
            m.createView();
        }
        else {
            m.removeView();
        }
    }
}

m.init();
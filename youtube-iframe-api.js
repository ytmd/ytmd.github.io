var PLAYER;

// https://developers.google.com/youtube/iframe_api_reference
function setupIFrameAPI(){
  // 2. This code loads the IFrame Player API code asynchronously.
  var tag = document.createElement('script');
  tag.src = "https://www.youtube.com/iframe_api";
  var firstScriptTag = document.getElementsByTagName('script')[0];
  firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
}

// 3. This function creates an <iframe> (and YouTube player)
//  after the API code downloads.
function onYouTubeIframeAPIReady(){
  PLAYER = new YT.Player('ytplayer', {
    height: '390',
    width: '640',
    // videoId: 'EkwqPJZe8ms',
    events: {
      'onReady': onPlayerReady,
        'onStateChange': onPlayerStateChange
    }
  });
}

// 4. The API will call this function when the video player is ready.
function onPlayerReady(event) {
  init();
}

onPlayerReady.init = false;

// 5. The API calls this function when the player's state changes.
// The function indicates that when playing a video (state=1),
// the player should play for six seconds and then stop.
var playhead_loop;

function onPlayerStateChange(event) {
  console.log("onPlayerStateChange("+event.data+")");
  if (event.data == YT.PlayerState.PLAYING && playhead_loop == null) {
    let fps = 30;
    playhead_loop = setInterval(Timeline.updateTimelinePlayhead, 1000/fps);
  } else if (event.data == YT.PlayerState.PAUSED) {
    clearInterval(playhead_loop);
    playhead_loop = null;
  } else if (event.data == YT.PlayerState.UNSTARTED) {
    Timeline.createTimeLine();
  }
}

function stopVideo() {
  PLAYER.stopVideo();
}
class Timeline {
  static left = 0;
  static top = 0;
  static total_w = window.innerWidth;
  static tag_h = 45;
  static max_depth = 0;
  /* options */
  static tooltip_width_threshold = 25;

  static createTimeLine(){
    console.log("createTimeLine");
    Timeline.clearTimeline();
    Timeline.total_w = window.innerWidth;
    var timeline = document.getElementById('timeline');
    var dur = PLAYER.getDuration();

    var last_start = [];

    for (var i = 0; i <= Timeline.max_depth ; i++) {
      last_start[i] = dur; //when the last rectangle started, for that depth
    }
    console.log("last_start = "+last_start);
    for (var i = time_tags.length-1; i >= 0 ; --i) {
      let tt = time_tags[i]; //let is important because of the event listener
      let d = tt.depth;
      let end = last_start[d];
      for (var j = d-1; j >= 0; --j) {
        end = Math.min(last_start[j],end);
      }
      let current = document.createElement("span");
        current.setAttribute("class", "timelineElement");

      let x = (tt.getStartTimeAsSeconds()/dur)*Timeline.total_w+Timeline.left;
        x = Math.round(x);
      let w = ((end-tt.getStartTimeAsSeconds())/dur)*Timeline.total_w;
        w = Math.ceil(w);
      let style = "position:absolute;";
        style += "left:"+x+"px; "
        style += "top:"+(Timeline.top+tt.depth*Timeline.tag_h)+"px;";
        style += "width:"+w+"px;";
        style += "height:"+Timeline.tag_h+"px;";
        //style += "background-color:"+randomColor();

      if( w >= Timeline.tooltip_width_threshold ){
        current.textContent = tt.title;
      } else {
        current.addEventListener("mouseover", function(){
          console.log("mouse over on timetag:");
          console.log(tt);

          let tooltip = document.createElement("div");
            tooltip.setAttribute("class", "tooltip");
            tooltip.style.position = "absolute";
            tooltip.style.left = x+"px";
            tooltip.style.top = (10+Timeline.top+(tt.depth+1)*Timeline.tag_h)+"px";
            tooltip.textContent = tt.title
          timeline.appendChild(tooltip);
          current.addEventListener("mouseleave", () => tooltip.remove() );

        } );
      }

      current.addEventListener("click", function(e) {
        console.log(tt);
        let start = tt.getStartTimeAsSeconds();
        let proportPos = e.offsetX/w;
        let totalDurInSec = end-start;
        let time = start+proportPos*totalDurInSec;
        PLAYER.seekTo(time, true);
        Timeline.updateTimelinePlayhead( time );
      });

      current.setAttribute("style", style);
      timeline.appendChild(current);
      last_start[d] = tt.getStartTimeAsSeconds();
    }
    Timeline.updateTimelineDivDimensions();
  }

  static clearTimeline(){
    //document.getElementById('timeline').textContent = "";
    $("#timeline > .timelineElement").remove();
  }

  // pos = position in seconds
  static updateTimelinePlayhead( pos = null){
    var timeline = document.getElementById('timeline');
    var curr_time = pos == null ? PLAYER.getCurrentTime() : pos;
    var dur = PLAYER.getDuration();
    var x = (curr_time/dur)*Timeline.total_w;
    var playhead = document.getElementById("playhead");
        playhead.setAttribute("class", "timelinePlayhead");

    playhead.style.left = x+"px";
    playhead.style.top = Timeline.top+"px";
    playhead.style.height = (Timeline.tag_h*(Timeline.max_depth+1))+"px";

    timeline.appendChild(playhead); //trick to raise the playhead
  }

  static updateTimelineDivDimensions(){
    var tl = document.getElementById("timeline");
    tl.style.width = window.innerWidth+"px";
    tl.style.height = Timeline.tag_h*(Timeline.max_depth+1)+"px";
  }
}
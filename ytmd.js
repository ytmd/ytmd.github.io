//https://css-tricks.com/snippets/javascript/support-tabs-in-textareas/
var VIDEO_ID = "";

function init(){
	setEventListeners();
	parseURLQuery();
	parseMarkdownData();
	setTimeout( () => Timeline.createTimeLine(), 2000); //WORKAROUND
}

function setEventListeners(){
	document.getElementById("main_input").addEventListener("input", formUpdate);
	document.getElementById("video_input").addEventListener("input", videoInput);
	window.onresize = () => Timeline.createTimeLine();

	//allow the Tab key to create a tab char
	$("#main_input").on('keydown', function(e) {
	  var keyCode = e.keyCode || e.which;

	  if (keyCode == 9) {
	    e.preventDefault();
	    var start = this.selectionStart;
	    var end = this.selectionEnd;

	    // set textarea value to: text before caret + tab + text after caret
	    $(this).val($(this).val().substring(0, start)
	                + "\t"
	                + $(this).val().substring(end));

	    // put caret at right position again
	    this.selectionStart =
	    this.selectionEnd = start + 1;
	  }
	});
}

// called whenever the user updates the main form
function formUpdate(){
	updateURL();
	parseMarkdownData();
}

function updateURL(){
	var q = composeURLQuery();
	//https://developer.mozilla.org/en-US/docs/Web/API/History/replaceState
	window.history.replaceState(null, "", "?"+q);
}

//https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams
function composeURLQuery(){
	var s = document.getElementById("main_input").value;
		s = "txt="+encodeURIComponent(s); //tt = time tags
	var vid_id = VIDEO_ID;
		s = "v="+vid_id+"&"+s;
	return s;
}

function parseURLQuery(){
	var url = new URL(window.location.href);
	var param = url.searchParams;

	var v = param.get("v");
	if( v != "" && v != null ){
		PLAYER.loadVideoById({'videoId': v});
		VIDEO_ID = v;
	}

	var text = param.get("txt");
	if( text != null ){
		text = decodeURIComponent(text);
		document.getElementById("main_input").value = text;
	}
}

function parseMarkdownData(){
	var v = document.getElementById("main_input").value;
	var lines = v.split("\n");
	console.log("=====================");
	console.log(lines);
	clearPlaybackControls();
	time_tags.length = 0; //clear the array

	Timeline.max_depth = 0;
	for (var i = 0; i < lines.length ; ++i) {
		if( TimeTag.isTimeTag(lines[i]) ){
			var time_tag = new TimeTag(lines[i]);
			//time_tag.dbg();
			time_tags.push(time_tag);
			addPlaybackControl(time_tag);
			Timeline.max_depth = Math.max(time_tag.depth, Timeline.max_depth);
		} else {
			addPlaybackComment(lines[i]);
		}
	}
	console.log("time_tags.length = "+time_tags.length);
	//Timeline.createTimeLine(); //lags too much
}

function addPlaybackControl(time_tag){
	var btn = document.createElement("div");
	btn.innerHTML = time_tag.getTimeString()+" "+time_tag.title;
	btn.setAttribute("class", "time_tag");
	btn.style.paddingLeft = 35*time_tag.depth+"px";
	var playback_controls = document.getElementById('playback_controls');
	playback_controls.appendChild(btn);
	btn.addEventListener("click", function(){
		PLAYER.seekTo(time_tag.getStartTimeAsSeconds(), true);
		Timeline.updateTimelinePlayhead(time_tag.getStartTimeAsSeconds());
	});
}

function addPlaybackComment(str){
	var c = document.createElement("div");
	c.innerHTML = str;
	c.setAttribute("class", "playback_comment");
	var playback_controls = document.getElementById('playback_controls');
	playback_controls.appendChild(c);
}



//https://stackoverflow.com/questions/3955229/remove-all-child-elements-of-a-dom-node-in-javascript
function clearPlaybackControls(){
	var pbc = document.getElementById('playback_controls');
	//pbc.textContent = '';
	$("#playback_controls > *").remove();
}

function videoInput(){
	var v = document.getElementById('video_input').value;
	var id = "";
	var url;
	try {
		url = new URL(v);
		id = url.searchParams.get("v");
	} catch (err) {
		/* fail safe for errors in the URL. This make pasting the video input very permissive,
		   as long as you paste the part of the url with the video id */
		console.log(`"${v}" is not a valid URL. Trying to parse video id with regex`);
		var m = v.match("\\?v=([^&\\n]+)");
		if ( m ){
			console.log(`Video id found: ${m[1]}`);
			id = m[1];
		} else {
			console.log(`Video id not found. Trying ${v}`);
			id = v;
		}
	}
	PLAYER.loadVideoById({'videoId': id});
	VIDEO_ID = id;
	updateURL();
}
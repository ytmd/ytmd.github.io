var time_tags = [];

class TimeTag {
	//https://stackoverflow.com/questions/5367369/named-capturing-groups-in-javascript-regex
	static regex = "^(?<ident>\\s*|\\t*)(?:(?<h>\\d{1,2}):)?(?<min>\\d{1,2}):(?<s>\\d{2})(?:\\.(?<ms>\\d{1,3}))?\\s(?<txt>.*)";

	constructor(str){
		var matches = str.match(TimeTag.regex);
		//console.log(matches);
		if(matches == null ){
			throw new Error("TimeTag constructor error. Invalid string: "+str);
		}
		this.str = str;
		this.title = matches.groups.txt;

		this.start = [];

		// hours
		this.start[["h","num"]] = matches.groups.h != undefined ? parseInt(matches.groups.h) : 0;
		this.start[["h","txt"]] = matches.groups.h != undefined ? matches.groups.h : "";

		// minutes
		this.start[["min","num"]] = matches.groups.min != undefined ? parseInt(matches.groups.min) : 0;
		this.start[["min","txt"]] = matches.groups.min != undefined ? matches.groups.min : "";

		// seconds
		this.start[["s","num"]] = matches.groups.s != undefined ? parseInt(matches.groups.s) : 0;
		this.start[["s","txt"]] = matches.groups.s != undefined ? matches.groups.s : "";

		// miliseconds
		if ( matches.groups.ms != undefined ){
			if ( matches.groups.ms.length == 1){
				this.start[["ms","num"]] = 100*parseInt(matches.groups.ms);
			} else if ( matches.groups.ms.length == 2){
				this.start[["ms","num"]] = 10*parseInt(matches.groups.ms);
			} else {
				this.start[["ms","num"]] = parseInt(matches.groups.ms);
			}
		} else {
			this.start[["ms","num"]] = 0;
		}
		this.start[["ms","txt"]] = matches.groups.ms != undefined ? matches.groups.ms : "";

		this.depth = matches.groups.ident != null ? matches.groups.ident.length : 0;
	}

	getStartTimeAsSeconds(){
		var h = this.start[["h","num"]];
		var min = this.start[["min","num"]];
		var s = this.start[["s","num"]];
		var ms = this.start[["ms","num"]];
		var time = h*3600+min*60+s+ms/1000;
		return time;
	}

	getTimeString(){
		var out = this.start[["h","txt"]] != "" ? this.start[["h","txt"]]+":" : "";
			out += this.start[["min","txt"]] != "" ? this.start[["min","txt"]]+":" : "";
			out += this.start[["s","txt"]] != "" ? this.start[["s","txt"]] : "";
			out += this.start[["ms","txt"]] != "" ? "."+this.start[["ms","txt"]] : "";
		return out;
	}

	dbg(){
		console.log("TimeTag: "+this.str);
		console.log("	title: "+this.title);
		console.log("	start_time: "+this.start_time);
		console.log("	end_time: "+this.end_time);
		console.log("	depth: "+this.depth);
	}

	static isTimeTag(str){
		var matches = str.match(this.regex);
		if(matches == null ){
			return false;
		}
		return true;
	}
}
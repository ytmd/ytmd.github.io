function randomColor(){
	var s = "#";
	for (var i = 0; i < 6; i++) {
		var r = randomInt(0,15);
		switch(r){
			case 15: s+= "F"; break;
			case 14: s+= "E"; break;
			case 13: s+= "D"; break;
			case 12: s+= "C"; break;
			case 11: s+= "B"; break;
			case 10: s+= "A"; break;
			default: s+= r;
		}
	}
	return s;
}

function randomInt(min, max){
	return Math.floor(Math.random() * max+1) + min;
}
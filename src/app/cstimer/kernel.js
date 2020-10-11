"use strict";

export var kernel = function() {

	var scrambleReg = /^([\d]+)?([FRUBLDfrubldzxySME])(?:([w])|&sup([\d]);)?([2'])?$/;

	function parseScramble(scramble, moveMap) {
		var moveseq = [];
		var moves = scramble.split(' ');
		var m, w, f, p;
		for (var s=0; s<moves.length; s++) {
			m = scrambleReg.exec(moves[s]);
			if (m == null) {
				continue;
			}
			f = "FRUBLDfrubldzxySME".indexOf(m[2]);
			if (f > 14) {
				p = "2'".indexOf(m[5] || 'X') + 2;
				f = [0, 4, 5][f % 3];
				moveseq.push([moveMap.indexOf("FRUBLD".charAt(f)), 2, p]);
				moveseq.push([moveMap.indexOf("FRUBLD".charAt(f)), 1, 4-p]);
				continue;
			}
			w = f < 12 ? (~~m[1] || ~~m[4] || ((m[3] == "w" || f > 5) && 2) || 1) : -1;
			p = (f < 12 ? 1 : -1) * ("2'".indexOf(m[5] || 'X') + 2);
			moveseq.push([moveMap.indexOf("FRUBLD".charAt(f % 6)), w, p]);
		}
		return moveseq;
	}

	return {
		parseScramble: parseScramble
	};
}();

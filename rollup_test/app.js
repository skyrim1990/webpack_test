'use strict';

function sayA(a) {
	console.log(a);
}
var A = 3.1415926;

var b = function () {
	return {
		b: "B",
		sayB: function sayB(b) {
			console.log(b);
		}
	};
};

sayA(A);
/*
var b  = B();
b.sayB(b.B);
*/
b().sayB("B");
//console.log(ModelB.sayB("hello world !"));

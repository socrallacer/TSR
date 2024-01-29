'use strict'

let global1_let = "variable global 1"
var global2_var = "variable global 2"
let global3 = "variable global 3"

function f1 (arg) {
	global1_let = arg;   // Puedo también modificar las otras globales?
	global2_var = arg; 
	global3 = arg; 
	console.log ("global1= " + global1_let)
	console.log ("global2= " + global2_var)
	console.log ("global3= " + global3)
	var global4 = "SOY GLOBAL?"
}

function f2 () {

	let local1_let = 5;

	for (let let_i=0; let_i<5; let_i++) {
		console.log ("let_i: " + let_i)
	}

	//console.log ("fin --> let_i=" + let_i) // Me indica que let_i no existe

	for (var var_i=0; var_i<5; var_i++) {
		console.log ("var_i: " + var_i)
	}

	console.log ("fin --> var_i=" + var_i)
	//console.log ("fin --> let_i=" + let_i) 
	//Al usar use strict me indica que let_i no está definida, entiendo
	//Que se debe al ámbito.
	

	let local_let = var_i - 5; // Me equivoco al teclear "local_let1"
	console.log ("local1_let=" + local1_let)
	console.log ("local_let=" + local_let)

}

f1 ("nuevo valor");
f2 ();
console.log ("global1= " + global1_let);
console.log ("global2= " + global2_var);
console.log ("global3= " + global3);
console.log(global4)

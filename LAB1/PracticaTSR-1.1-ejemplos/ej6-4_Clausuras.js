function main(y){
	var traza="inicio";
	return f(y);
	
	function f(y){
		var x=100+y;//0,1,2,4,3,4
		
		console.log("\ttraza: ", traza);
		
		return (x%2) ? g0 : g1;

		function g0(){
			traza += "-g0";
			x++;//2,3,4
			console.log("g0: incremento de x:  "+x);//2,4
			return f(++y);//-98,-96
		}
		
		function g1(){
			traza += "-g1";
			y++;//-99,-98,-97,-96,-95
			console.log("g1: incremento de y:  "+y);//-99,-97,-95
			return f(y);	
		}
	}
}


var func = main(-100);
for (let i=0; i<10; i++) {
	func = func();
}


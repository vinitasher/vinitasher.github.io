(function(){
	function add(){
		var args = arguments;
		var sum=0;
		for(var i=0; i<args.length; i++){
			sum += args[i];
		}
		var ret = function(){
			if(!arguments.length){
				console.log(sum);
				return sum;
			}

			for(var i in arguments){
				sum += arguments[i];
			}
			return ret;
		}
		return ret;
	}	
	add(1,2,3)(4,5)(7)()
})()

//consider levels as in platform games like Super Mario. 
//A constructor here takes two arguments: 
//arrNumber:how many numbers are displayed 
//elNumber:how many questions for each level

function Level(arrNumber,elNumber){
	var upperLimit,lowerLimit,operator,questionArrs,answerArr,userAnswer,
	    doMath = {
	    	"+":function(x,y){return x+y},
	    	"-":function(x,y){return x-y},
	    	"*":function(x,y){return x*y},
	    	"/":function(x,y){return x/y}
	    };

    //initializing the level object by assigning values to the key variables
     this.init = function(){
    	upperLimit = document.getElementById("upperLimitInput").value;
        lowerLimit = document.getElementById("lowerLimitInput").value;

        operator = document.getElementById("operatorInput").value,

    //returns an array of arrays containing random numbers
        questionArrs = (function(arr, el) {
	        var i = 0,
	            result = [];
	        for (i; i < arrNumber; i++) {
	            var j=0,
	                arr =[];
	            for (j; j < elNumber; j++) {
	                var el,
	                    upper = (upperLimit? upperLimit:10),
	                    lower = (lowerLimit? lowerLimit:1);
	                el = Math.round(Math.random() * (upper - lower) + lower);
	                arr.push(el);
	            }
	            result.push(arr);
	        }
	        return result;
	    })(arrNumber,elNumber);

     //returns an array containing the answer numbers
	    answerArr = (function (quesArrs) {
		    var i = 0,
		        reArrange=[],
		        result = [],
		        arrLength = quesArrs.length,
		        elLength = quesArrs[0].length;

		    for (i; i < arrLength; i++) {
		        var j = 0,
		            arr = [];
		        for (j; j < elLength; j++) {
		            arr.push(quesArrs[j][i])
		        }
		        reArrange.push(arr)
		    };
		    
		    reArrange.map(function (elementArr) {
		        var answer = elementArr.reduce(function (prev, current) {
		            return doMath[operator](prev, current)
		        })
		        result.push(answer)
		    });

		    return result;

		})(questionArrs);

	this.getUserAnswer = function(){
		userAnswer = document.getElementById("userAnswerInput").value;
	};

    }


}
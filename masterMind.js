var inquirer = require('inquirer');
//returns a random in from [min,max)
function getRandomInt(min,max){
	return Math.floor(Math.random() * ( max - min )) + min;
}

function getPuzzle(length){
	var myPuzzle = [];
	for(var i = 0; i < length; i++){
		myPuzzle.push(getRandomInt(0,10));
	}
	return myPuzzle;
}

function getUserInput(length){
	var prompts = [];
	for(var i = 0 ; i < length; i++){
		var question = {};
		question.name = i.toString();
		question.type = "input";
		question.message = "enter number " + (i+1);
		prompts.push(question);
	}
	inquirer.prompt(prompts).then(function(answers){
		var ansArray = [];
		for(var i = 0; i < length; i ++){
			ansArray.push(parseInt(answers[i]));
		}
		if(turnNumber < maxTurns ){
			console.log(ansArray);
			// console.log(myPuzzle);
			//check answer
			var results = checkPuzzle(ansArray,myPuzzle);
			results.guess = ansArray;
			history.push(results);
			console.log(history);
			turnNumber ++;
			if(results.rightPlace === puzzleLength){
				console.log("you Win!");
			} else {
				//do this again
				getUserInput(length);
			}
		} else {
			console.log("You lose");
		}
	});
}

function checkPuzzle(input, puzzle){
	var inputCopy = [];
	//create copies of each array
	for (var i = 0; i <input.length;i++){
		inputCopy.push(input[i]);
	}
	var puzzleCopy = [];
	for (var i = 0; i <puzzle.length;i++){
		puzzleCopy.push(puzzle[i]);
	}
	var results = {
		rightPlace: 0,
		wrongPlace: 0
	};
	for(var i = 0; i <puzzleCopy.length; i++){
		for(var j = 0 ; j < inputCopy.length; j++){
			if(puzzleCopy[i] && inputCopy[j]){
				if(puzzleCopy[i] === inputCopy[j] && i === j){
					results.rightPlace ++;
					puzzleCopy[i] = undefined;
					inputCopy[j] = undefined;
				}
			}
		}
	}

	for(var i = 0; i <puzzleCopy.length; i++){
		for(var j = 0 ; j < inputCopy.length; j++){
			if(puzzleCopy[i] && inputCopy[j]){
				if(puzzleCopy[i] === inputCopy[j]){
					results.wrongPlace ++;
					puzzleCopy[i] = undefined;
					inputCopy[j] = undefined;
				}
			}
		}
	}
	return results;
}

var puzzleLength = 4;
var turnNumber = 0;
var maxTurns = 10;
var myPuzzle = getPuzzle(puzzleLength);
var history = [];
var myGuess = [];

function main(){
	getUserInput(puzzleLength);
}

main();
// ----------- VARIABLES -----------
var hang = {
	wordList: ["javascript","html","css","firebase","mysql"],
	selectedWord: "",
	lettersInWord: [],
	dashes: 0,
	partialWord: [],
	wrongGuess: []
};

var counter = {
	wins: 0,
	losses: 0,
	guessLeft: 0
};

// ----------- FUNCTIONS -----------

function startGame () {
	hang.selectedWord = hang.wordList[Math.floor(Math.random()*hang.wordList.length)];
	hang.lettersInWord = hang.selectedWord.split("");
	hang.dashes = hang.lettersInWord.length;

	// Reset
	counter.guessLeft=9;
	hang.wrongGuess=[];
	hang.partialWord=[];

	//Create right number of dashes
	for (var i=0; i<hang.dashes; i++) {
		hang.partialWord.push("_");
		document.querySelector("#wordToGuess").innerHTML = hang.partialWord.join(" ");
		document.querySelector("#wrongGuess").innerHTML = "";
	}

	console.log('selected word ', hang.selectedWord);
	console.log('letters in word ', hang.lettersInWord);
	console.log('dashes ', hang.dashes);
	console.log('partialWord ', hang.partialWord);
};

function checkLetters(letter) {
	// check if letter exists
	var isLetterInWord = false;
	for (var i=0; i<hang.dashes; i++) {
		if(hang.selectedWord[i] == letter) {
			isLetterInWord = true;
		}

	}	
	//check where in word letter exits, then populate partialWord array
	if(isLetterInWord){
		for (var i=0; i<hang.dashes; i++) {
			if(hang.selectedWord[i] == letter) {
				hang.partialWord[i] = letter;
			}
		}
	}
	
	// letter wasn't found
	else {
		hang.wrongGuess.push(letter);
		counter.guessLeft--;
	}

	console.log('partial word ', hang.partialWord);	
};

function roundComplete() {
	console.log("Win Count: " + counter.wins + " | Loss Count: " + counter.losses + " | Guesses Left: " + counter.guessLeft);

	// update html to reflect most recent info
	document.querySelector("#numGuesses").innerHTML = counter.guessLeft;
	document.querySelector("#wordToGuess").innerHTML = hang.partialWord.join(" ");
	document.querySelector("#wrongGuess").innerHTML = hang.wrongGuess.join(" ");

	// check if user won
	if(hang.lettersInWord.toString() == hang.partialWord.toString()) {
		document.querySelector("#wordToGuess").innerHTML = hang.partialWord.join(" ");
		counter.wins++;
		alert("You Won!");

		// Update the win counter in HTML
		document.querySelector("#winCounter").innerHTML=counter.wins;
		startGame();
	}

	// if user losses
	else if (counter.guessLeft == 0) {
		counter.losses++;
		alert("You lost");

		// update html
		document.querySelector("#lossCounter").innerHTML = counter.losses;
		startGame();
	}

};



// ----------- EVENT LISTENERS -----------

document.onkeyup = function(event) {
	console.log('key clicked');
	var letterGuessed = String.fromCharCode(event.keyCode).toLowerCase();
	checkLetters(letterGuessed);
	roundComplete();

	console.log('letterGuessed ', letterGuessed);
}

// ----------- START GAME -----------
startGame();

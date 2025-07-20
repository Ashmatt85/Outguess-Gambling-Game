function Outguess_Game(money){

    var userWon =false; // user won or lost
    var guessing = 0;
    var guessHistory = "";  //use string to gather user guesses

    const randomNumber = 50// Math.floor(Math.random() * 100) + 1; //Generate a random number



         var attempts= WholeNumberPrompt (" How many times would you like to guess? Max attempts are 10 " );

        
    
         if (question == "yes" && money == 0 ){

            money= WholeNumberPrompt (" Enter the amount you're bringing to the table ");
    
        }

    while ( attempts > 10 || attempts <= 0){

            alert(" Invalid entry. Max attempts cannot exceed 10");
            attempts= NumberPrompt (" How many times would you like to guess? Max attempts are 10").toFixed(0);
    
    } 

        var wager= WholeNumberPrompt (" Place your bets! What will be the wager? Enter no more than the cash you have. You have $" + money + " to wager ").toFixed(0); 
     
    while ( wager > money || wager <= 0){

        alert(" Invalid entry. Please your bet again.");
        wager= WholeNumberPrompt (" What will be the wager? Enter no more than the cash you have.")

    }    

    for( var i= attempts ; i >= 1 ; i--){     // Start guessing loop

       var guessing= NumberPrompt("Pick a number 1-100. You have " + i + " guesses ");

       guessHistory += "<li>" + guessing + "</li>";


    while (guessing < 1 || guessing > 100){

        alert("Invalid entry. Must be between 1-100");

        guessing= NumberPrompt("Pick a number 1-100. You have " + i + " guesses");

    }
    
    
     if (guessing < randomNumber){

        alert ("Sorry " + guessing + " is too low. ");

    } else if (guessing > randomNumber){

        alert( "Sorry " + guessing + " is too high. ");

    }  else  if (i === 0 && guessing !== randomNumber) {

        money -= wager;

    }
    
    if (guessing === randomNumber) {
        celebrateWin(); // Call the confetti function to trigger the animation
 
       var winWager= wager * i;
        money += winWager;   //adds winnage into money 

        roundsWon += 1;
        userWon = true;

        document.getElementById("win").innerHTML = ("<h2>Nice Win!!! You guessed " + randomNumber + " in " + (attempts -1 + 1) + " attempt !</h2>");
        document.getElementById("cash").innerHTML = ("<p> You won $ " + winWager + ". Your cash amount is $ " + money);
        document.getElementById("guesses").innerHTML = ("<ul> Here are your guesses : " + guessHistory + "</ul>");

         break; // Exit the loop if the user wins  

    }

}       
    
    if(!userWon){  // if user loses display this messages only
    
        money-= wager

    document.getElementById("lose").innerHTML += ("<h3>The correct number was " + randomNumber + " Better luck next time! </h3>");
    document.getElementById("wager").innerHTML += ("<p>You lost your wager of $ " + wager + ". Your total is $ " + money + ".</p>");
    document.getElementById("guess").innerHTML += ("<ul> Here are your guesses : "  + guessHistory  + "</ul>");
    }
       


if (money <= 0){

    alert(" Sorry you are out of cash");

    return money;
        
}
        roundsPlayed += 1; // Increment roundsPlayed
      
    return money;  //returning update money

}

var roundsWon = 0; //make rounds into string with condition return string back to accumulate for each round
var roundsPlayed= 0;
var winPercentage = 0;  // calculating win percentage

function displayWinPercentage() {

if(roundsPlayed > 0 ){ 
    winPercentage = (roundsWon / roundsPlayed) * 100;
}
else{
    winPercentage = 0; 
}
document.getElementById("percentage").innerHTML = (" <h3> Your winning percentage is : " + winPercentage.toFixed(2) + "% </h3>" )
}

 var money= WholeNumberPrompt ("  Welcome to the Outguess Game! Enter the amount you wish to bring to the table. ");  //ask user to begin the game

money = Outguess_Game(money);


 // declared variables 
 var replay= true;

while (replay){

    var question = prompt("Would you like to place another wager? (yes/no)").toLowerCase();

    if (question !== "yes"){

        replay = false;

        displayWinPercentage()    // Display win percentage when user is done playing

        alert ("Thanks for playing, Come back and play again soon.");

    } else if( question == "yes"){

       money = Outguess_Game(money);
        
   }

}


function NumberPrompt (msg){

    var input=prompt (msg)

    if (input === null) {  // User clicked cancel
        alert("Game exited. Your remaining money: $" + money);
        document.getElementById("percentage").innerHTML = "<h3>Game exited early. Your winning percentage is:" + winPercentage + "%</h3>";
        throw new Error ("Game exited");  // Stops further execution
    }

    while (isNaN(input)){

        alert("Input invalid. Please try again")
        input=prompt (msg);

    } return Number(input);


}

function WholeNumberPrompt (msg){

    var input=prompt (msg)

    if (input === null) {  // User clicked cancel
        alert("Game exited. Your remaining money: $" + money);
        document.getElementById("percentage").innerHTML = "<h3>Game exited early. Your winning percentage is: " + winPercentage + " %</h3>";
        throw new Error("Game exited");  // Stops further execution
    }
    while (!(parseInt(input) == input)) {

        alert("Input invalid. Please enter a whole number.");
        input = prompt(msg);
    
    } return Number(input);

}

function celebrateWin() {
    // Fire confetti immediately
    confetti(); // Call the function to celebrate the win
    confetti({
        particleCount: 800,
        spread: 180,
        origin: { y: 0.8 },
      });

    // Slight delay before showing alert so confetti appears
    setTimeout(() => {
    }, 300); // 300 milliseconds
    alert ("Congratulations! You guessed the correct number ");
}



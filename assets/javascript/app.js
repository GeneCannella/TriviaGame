    $(document).ready(function() {

        //declare global variables to hold session state
        var indexOfQuestion;
        var correctAnsCount, incorrectAnsCount, unansweredCount;


        //lets make the set of answers an array of answer objects
        var questionsArray = [
            ["Fiat", "500-correct", "white", "blue", "grey", "1"],
            ["Blah", "100", "two-correct", "four", "eight", "2"],
            ["Meh", "777", "sweet", "sour-correct", "spicy", "3"]
        ];

        console.log(questionsArray);

        // function declarations =============================

        //Principle of operation:
        //....declare a function each game progress state (waitToStart, waitForAnswer, displayAnswer, displaySessionStats)
        //....each state function will register a click handler and/or a timeout callback
        //....each state will also destroy all other handlers and callbacks so it's callback is the only one that can occur

        function initSession() {

            waitingToStart = true;
            waitingForAnswer = false;
            displayingAnswer = false;
            gameOver = false;

            initGame();
        }

        function initGame() {
            console.log("init occured");

            //reset answer counts
            correctAnsCount = 0;
            incorrectAnsCount = 0;
            unansweredCount = 0;

        }

        function waitToStart() {
            console.log("waitToStart occurred");

            //do stuff, then register a click handler for the start button

            //do stuff:
            //destroy outstanding event handlers (make this a func)(or is it sufficient just to empty the elements)
            //empty the gameBoard div
            $("#gameBoard").empty();
            //display a start button in the gameBoard div
            var startBtnHTML = "<button id='start' type='button' class='btn btn-primary btn-lg btn-block'>Start Game</button>";
            $("#gameBoard").append(startBtnHTML);

            // register a click handler to the start button 
            // clicking will move player to Q&A screen
            $("#start").on("click", waitForAnswer);
            console.log("waitForAnswer click handler registered");
            return;

        }

        function waitForAnswer() {
            console.log("waitForAnswer was called");

            //do stuff, then register a click handler for the answer buttons and a callback for the timeout

            //do stuff:
            //empty the gameBoard div
            $("#gameBoard").empty();

            //Get a random question from the questionsArray by first getting a random number to use as index
            indexOfQuestion = Math.floor(Math.random() * questionsArray.length);
            //console.log("indexOfQuestion = " + indexOfQuestion)

            var questionStr = questionsArray[indexOfQuestion][0];
            console.log("questionStr = " + questionStr);

            //display a question in the gameBoard div (don't actually need the id attr so far)
            var questionBtnHTML = "<button id='question' type='button' class='btn btn-primary btn-lg btn-block'>" + questionStr + "</button>";
            $("#gameBoard").append(questionBtnHTML);

            //display multiple choice buttons in gameBoard div
            for (var i = 1; i < 5; i++) {
                var $choiceElement = $("<button type='button' class='answer btn btn-primary btn-lg btn-block text-left'></button>");
                $choiceElement.attr("data-choice-num", i);
                $choiceElement.text(questionsArray[indexOfQuestion][i]);
                console.log($choiceElement);
                $("#gameBoard").append($choiceElement);
            }

            //start a counter
            //display time remaining
            //if time runs out, set unanswered true and return
            //if correctly answered, set correct true and return
            //if incorrectly answered, set correct false and return
            //return to main - do not call next state function

            $(".answer").on("click", displayAnswer);
            console.log("displayAnswer click handler registered");
            return;

        } //closes waitForAnswer, I think


        function nextStateFunc(a, b) {
            var x = a; //placeholder for testing
            var y = b; //placeholder for testing
            waitForAnswer();
            return;
        }


        function displayAnswer() {
            console.log("displayAnswer occurred");
            //empty the gameBoard div
            $("#gameBoard").empty();            


            //get the number of the choice made by the user
            var clickedAnswerStr = $(this).attr("data-choice-num"); 
            console.log("clickedAnswerStr = " + clickedAnswerStr + " " + typeof clickedAnswerStr);

            //check if user choice is correct
            var resultStr;
            var indexOfAnswerStr = questionsArray[indexOfQuestion][5];
            if (clickedAnswerStr == indexOfAnswerStr) {
                resultStr = "Correct!";
            } else {
                resultStr = "Incorrect!";
            }

            //display a right or wrong message in gameBoard div (don't actually need the id "result" so far)
            var resultBtnHTML = "<button id='result' type='button' class='btn btn-primary btn-lg btn-block'>" + resultStr + "</button>";
            $("#gameBoard").append(resultBtnHTML);
            
            //display the correct answer message in gameBoard div
            var correctAnswer = questionsArray[indexOfQuestion][parseInt(indexOfAnswerStr)];
            console.log("correctAnswer = " + correctAnswer);
            var correctAnswerBtnHTML = "<button type='button' class='btn btn-primary btn-lg btn-block'>" + correctAnswer + "</button>";
            $("#gameBoard").append(correctAnswerBtnHTML);
            
            //start a counter, but do not display time remaining
            //when timer expire call waitForAnswer if more questions, call displaySessionStats if no more questions

            // example from w3Schls  myVar = setTimeout(function(){ alertFunc("First param", "Second param"); }, 2000);
            timerVar = setTimeout(function(){ nextStateFunc("First param", "Second param"); }, 3000);

            //return to main 
            return;
        }




        function displaySessionStats() {
            //empty the gameBoard div
            //display correctAnsCount, incorrectAnsCount, unansweredCount in gameBoard div
            //display a play again button in gameBoard div
            //return to main when start button clicked - do not call next state function
        }







        //end global function declarations =============================

        initGame();
        waitToStart();




    }); //closes the document ready function
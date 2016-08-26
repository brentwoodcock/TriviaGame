var game = {
    correctAnswers: 0,
    incorrectAnswers: 0,
    unanswered: 0,
    number: 5,
    result: "unanswered",
    questions: [{
        text: "sample question 1",
        answers: ["incorrect answer 1", "incorrect answer 2", "correct answer", "incorrect answer 3"],
        correctIdx: 2,
        image: "http://s13.therealdeal.com/trd/up/2015/05/michael-jordan.jpg"
    }, {
        text: "sample question 2",
        answers: ["incorrect answer 1", "correct answer", "incorrect answer 2", "incorrect answer 3"],
        correctIdx: 1,
        image: "http://s13.therealdeal.com/trd/up/2015/05/michael-jordan.jpg"
    }, {
        text: "sample question 3",
        answers: ["incorrect answer 1", "incorrect answer 2", "incorrect answer 3", "correct answer"],
        correctIdx: 3,
        image: "http://s13.therealdeal.com/trd/up/2015/05/michael-jordan.jpg"
    }, {
        text: "sample question 4",
        answers: ["incorrect answer 1", "incorrect answer 2", "correct answer", "incorrect answer 3"],
        correctIdx: 2,
        image: "http://s13.therealdeal.com/trd/up/2015/05/michael-jordan.jpg"
    }],

    reset: function() {
        this.correctAnswers = 0;
        this.incorrectAnswers = 0;
        this.unanswered = 0;
        this.number = 5;
        $("#start").addClass("hide");
        $("#timeRem").empty();
        $("#question").empty();
        $(".answers").empty();
    },

    updateQuestion: function(idx) {
    	this.number = 5;
    	// Clear any buttons, text, or images that might've been present
        $("#start").addClass("hide");
        $("#reset").addClass("hide");
        $("#status").empty();
        // Show time remaining
        $("#timeRem").html("Time Remaining: " + this.number);
        // Update the question's text
        $("#question").html(this.questions[idx].text);
        // Update the answer buttons
        for (var i = 0; i < this.questions[idx].answers.length; i++) {
            var a = $("<button>");
            a.attr("id", "ans" + i);
            if (i === this.questions[idx].correctIdx) {
                a.addClass("correct");
            } else {
                a.addClass("incorrect");
            }
            a.text(this.questions[idx].answers[i]);
            $(".answers").append(a);
        }
    },

    updateToEnd: function(){
    	// Display stats
    	$("#question").html("All done, here's how you did!");
    	$("#status").html("Correct Answers: " + this.correctAnswers + "<br>Incorrect Answers: " + this.incorrectAnswers + "<br>Unanswered: " + this.unanswered);
    	// Display reset button
    	$("#reset").html("Start Over?").removeClass("hide");
    },

    showStatus: function(idx){
    	// Grab image for corresponding question
    	var a = $("<img>").attr("src", this.questions[idx].image);
    	// Clear time remaining and answers
    	$("#timeRem").empty();
    	$(".answers").empty();
    	// Show guess result and track stats for correct, incorrect, or unanswered guesses
    	switch (this.result) {
    		case "correct":
    			this.correctAnswers++;
    			$("#question").html("Correct!");
    			$("#status").html(a);
    			break;
    		case "incorrect":
    			this.incorrectAnswers++;
    			$("#question").html("Incorrect!");
    			$("#status").html("The correct answer was " + this.questions[idx].answers[this.questions[idx].correctIdx] + "<br>").append(a);
    			break;
    		case "unanswered":
    			this.unanswered++;
    			$("#question").html("Out of time!");
    			$("#status").html("The correct answer was " + this.questions[idx].answers[this.questions[idx].correctIdx] + "<br>").append(a);
    			break;
    		default:
    			break;
    	}
    }

}

$(document).ready(function() {
    var questionIdx = 0;
    var currentQues = game.questions[questionIdx];

    function run() {
        counter = setInterval(decrement, 1000);
    }

    function decrement() {
        game.number--;
        // Show number of seconds remaining in #timeRem tag
        $("#timeRem").html("Time Remaining: " + game.number);
        // Timer reaches 0 (unanswered guess case)
        if (game.number === 0) {
            game.result = "unanswered";
            game.showStatus(questionIdx);
            questionIdx++;
            pause();
        }
    }

    function stop() {
        clearInterval(counter);
    }

    // Pause the page while showing guess status then update to next question/end game stats
    function pause() {
    	stop();
    	setTimeout(function(){
    		if (questionIdx >= game.questions.length){
    			game.updateToEnd();
    		}else{
    			game.updateQuestion(questionIdx);
    			run();
    		}
    		}, 1000);
    }

    // Start Game button click
    $("#start").on("click", function() {
        game.updateQuestion(questionIdx);
        run();
    })

    // Answer button click
    $(".answers").on("click", function(event) {
        if ($(event.target).hasClass("correct")) {
            game.result = "correct";
            game.showStatus(questionIdx);
            questionIdx++;
            pause();
        } else {
            game.result = "incorrect";
            game.showStatus(questionIdx);
            questionIdx++;
            pause();
        }
    })

    // Reset button click
    $("#reset").on("click", function(event) {
    	game.reset();
    	questionIdx = 0;
    	game.updateQuestion(questionIdx);
    	run();
    })

})

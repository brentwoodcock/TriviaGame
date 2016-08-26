var game = {
    correctAnswers: 0,
    incorrectAnswers: 0,
    timeouts: 0,
    number: 5,
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
        text: "sample question 3",
        answers: ["incorrect answer 1", "incorrect answer 2", "correct answer", "incorrect answer 3"],
        correctIdx: 2,
        image: "http://s13.therealdeal.com/trd/up/2015/05/michael-jordan.jpg"
    }],

    reset: function() {
        this.correctAnswers = 0;
        this.incorrectAnswers = 0;
        this.timeouts = 0;
        this.number = 5;
        $("#start").html("Start");
        $("#timeRem").empty();
        $("#question").empty();
        $(".answers").empty();
    },

    updateQuestion: function(idx) {
        $("#start").empty();
        $("#status").empty();
        $("#timeRem").html("Time Remaining: " + this.number);
        // Update the question's text
        $("#question").html(this.questions[idx].text);
        // Update the answer buttons
        for (var i = 0; i < this.questions[idx].answers.length; i++) {
            var a = $("<button>");
            a.attr("id", "ans" + i);
            if (i === this.questions[idx].correctIdx){
            	a.addClass("correct");
            }else{
            	a.addClass("incorrect");
            }
            a.text(this.questions[idx].answers[i]);
            $(".answers").append(a);
        }
    }

}

$(document).ready(function() {
	var questionIdx = 0;
	var currentQues = game.questions[questionIdx];

    game.reset();

    function run() {
        counter = setInterval(decrement, 1000);
    }

    function decrement() {
        game.number--;
        // Show number of seconds remaining in #timeRem tag
        $("#timeRem").html("Time Remaining: " + game.number);
        console.log("tick tock");

        if (game.number === 0) {
            stop();
            questionIdx++;
            game.timeouts++;
        }
    }

    function stop() {
        clearInterval(counter);
    }

    // Start Game button click
    $("#start").on("click", function(){
    	game.updateQuestion(questionIdx);

	    run();
    })
    
    // Answer button click
    $(".answers").on("click", function(event){
    	var a = $("<img>").attr("src", currentQues.image);
    	if ($(event.target).hasClass("correct")){
    		game.correctAnswers++;
	    	$("#timeRem").empty();
	    	$(".answers").empty();
	    	$("#status").html("Correct!").append(a);
	    	stop();
	    	questionIdx++;
	    	setTimeout(function(){ 
	    		game.updateQuestion(questionIdx);
	    		run();
	    	}, 5000);
    	}else{
    		game.incorrectAnswers++;
    		$("#timeRem").empty();
    		$(".answers").empty();
    		$("#status").html("The correct answer was " + currentQues.answers[currentQues.correctIdx]).append(a);
    		stop();
    		questionIdx++;
    		setTimeout(function(){ 
	    		game.updateQuestion(questionIdx);
	    		run();
	    	}, 5000);
    	}	
    })


})

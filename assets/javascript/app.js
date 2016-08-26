var game = {
    wins: 0,
    losses: 0,
    timeouts: 0,
    questions: [{
        text: "sample question 1",
        answers: ["incorrect answer 1", "incorrect answer 2", "correct answer", "incorrect answer 4"],
        correctIdx: 3
    }, {
        text: "sample question 2",
        answers: ["incorrect answer 1", "incorrect answer 2", "correct answer", "incorrect answer 4"],
        correctIdx: 3
    }, {
        text: "sample question 3",
        answers: ["incorrect answer 1", "incorrect answer 2", "correct answer", "incorrect answer 4"],
        correctIdx: 3
    }, {
        text: "sample question 4",
        answers: ["incorrect answer 1", "incorrect answer 2", "correct answer", "incorrect answer 4"],
        correctIdx: 3
    }],

    reset: function() {
        this.wins = 0;
        this.losses = 0;
        this.timeouts = 0;
        $("#start").html("Start");
        $("#timeRem").empty();
        $("#question").empty();
        $(".answer").empty();
    },

    updateQues: function(idx) {
        $("#start").empty();
        $("#timeRem").html("Time Remaining: ");
        // Update the question's text
        $("#question").html(this.questions[idx].text);
        // Update the answer buttons
        for (var i = 0; i < this.questions[idx].answers.length; i++) {
            var a = $("<button>");
            a.text(this.questions[idx].answers[i]);
            $("#ans" + i).html(a);
        }
    }
}

$(document).ready(function() {
	game.reset();
	// game.updateQues(0);
})

var game = {
    correctAnswers: 0,
    incorrectAnswers: 0,
    unanswered: 0,
    number: 24,
    result: "unanswered",
    questions: [{
        text: "Who has won the most career championships as a player?",
        answers: ["Wilt Chamberlain", "Michael Jordan", "Bill Russell", "Kobe Bryant"],
        correctIdx: 2,
        correctText: "Bill Russell won an astounding 11 championships, all with the Boston Celtics.",
        image: "assets/images/bill-russell.png"
    }, {
        text: "Who has the most regular season coaching wins?",
        answers: ["Pat Riley", "Don Nelson", "Phil Jackson", "Jerry Sloan"],
        correctIdx: 1,
        correctText: "Don Nelson won 1,335 regular season games coaching the Bucks, Warriors, Knicks, and Mavericks.",
        image: "assets/images/don-nelson.jpg"
    }, {
        text: "Who has the most career playoff points?",
        answers: ["Kareem Abdul-Jabbar", "LeBron James", "Tim Duncan", "Michael Jordan"],
        correctIdx: 3,
        correctText: "While never missing the playoffs in 13 seasons, Michael Jordan scored 5,987 points in the postseason.",
        image: "assets/images/michael-jordan.jpeg"
    }, {
        text: "Who won the most MVP awards?",
        answers: ["Michael Jordan", "Larry Bird", "Kareem Abdul-Jabbar", "Wilt Chamberlain"],
        correctIdx: 2,
        correctText: "Kareem Abdul-Jabbar won MVP 6 times, beating Michael Jordan and Bill Russell who each won the award 5 times.",
        image: "assets/images/kareem.jpg"
    }, {
        text: "Who scored the most points in a single game?",
        answers: ["Wilt Chamberlain", "Carmelo Anthony", "Michael Jordan", "Kobe Bryant"],
        correctIdx: 0,
        correctText: "In a 169-147 win over the New York Knicks, Wilt Chamberlain scored 100 points, while also setting the record for most free throws made in a game.",
        image: "assets/images/wilt-chamberlain.jpg"
    }, {
        text: "Who holds the record for most assists in a single NBA Finals game?",
        answers: ["Rajon Rondo", "Magic Johnson", "John Stockton", "LeBron James"],
        correctIdx: 1,
        correctText: "Magic Johnson had 21 assists in a game 3 victory over the Boston Celtics in the 1984 Finals.",
        image: "assets/images/magic-johnson.jpeg"
    }, {
        text: "Who is the shortest player to have played in the NBA?",
        answers: ["Spud Webb", "Muggsy Bogues", "Nate 'Tiny' Archibald", "Earl Boykins"],
        correctIdx: 1,
        correctText: "At 5'3\", Muggsy Bogues is the shortest player to have ever played in the NBA.",
        image: "assets/images/muggsy-bogues.jpg"
    }, {
        text: "Which team had the worst record in a season?",
        answers: ["Philadelphia 76ers", "Los Angeles Clippers", "Charlotte Bobcats", "Denver Nuggets"],
        correctIdx: 2,
        correctText: "In a lockout shortened season, the 2012 Charlotte Bobcats went 7-59 for a NBA worst, 0.106 winning percentage.",
        image: "assets/images/bobcats-fans.jpg"
    }, {
        text: "Who has the best career 3 point shooting percentage?",
        answers: ["Steve Kerr", "Ray Allen", "Stephen Curry", "Steve Nash"],
        correctIdx: 0,
        correctText: "Steve Kerr has a career 3 point shooting percentage of 0.4540, slightly besting Stephen Curry, who has a 0.4437 3 point shooting percentage.",
        image: "assets/images/steve-kerr.jpg"
    }, {
        text: "Who is the only player to win 1,000 games with a single team?",
        answers: ["Kobe Bryant", "John Stockton", "Reggie Miller", "Tim Duncan"],
        correctIdx: 3,
        correctText: "Tim Duncan won 1,001 regular season games with the San Antonio Spurs. Robert Parrish and Kareem Abdul-Jabbar are the only other players to have more than 1,000 wins.",
        image: "assets/images/tim-duncan.jpg"
    }],

    reset: function() {
        this.correctAnswers = 0;
        this.incorrectAnswers = 0;
        this.unanswered = 0;
        this.number = 24;
        $("#start").addClass("hide");
        $("#timeRem").empty();
        $("#question").empty();
        $(".answers").empty();
    },

    updateQuestion: function(idx) {
        this.number = 24;
        // Hide any buttons
        $("#start").addClass("hide");
        $("#reset").addClass("hide");
        // Clear any text or images that might've been present
        $("#status").empty();
        // Show time remaining
        $("#timeRem").html("Time Remaining: <span id='timer'>" + this.number + "</span>");
        // Update the question's text
        $("#question").html(this.questions[idx].text);
        // Update the answer buttons
        for (var i = 0; i < this.questions[idx].answers.length; i++) {
            var a = $("<div>");
            a.attr("id", "ans" + i);
            if (i === this.questions[idx].correctIdx) {
                a.addClass("btn answerBtn correct");
            } else {
                a.addClass("btn answerBtn incorrect");
            }
            a.text(this.questions[idx].answers[i]);
            $(".answers").append(a);
        }
    },

    updateToEnd: function() {
        // Display stats
        $("#question").html("All done, here's how you did!");
        $("#status").html("Correct Answers: " + this.correctAnswers + "<br>Incorrect Answers: " + this.incorrectAnswers + "<br>Unanswered: " + this.unanswered);
        // Display reset button
        $("#reset").removeClass("hide");
    },

    showStatus: function(idx) {
        // Grab image for corresponding question
        var img = $("<img width='300' id='statusImage'>").attr("src", this.questions[idx].image).attr("alt", this.questions[idx].answers[this.questions[idx].correctIdx]);
        // Clear time remaining and answers
        $("#timeRem").empty();
        $(".answers").empty();
        // Show guess result and track stats for correct, incorrect, or unanswered results
        switch (this.result) {
            case "correct":
                this.correctAnswers++;
                $("#question").html("Correct!");
                $("#status").html(this.questions[idx].correctText + "<br>").append(img);
                break;
            case "incorrect":
                this.incorrectAnswers++;
                $("#question").html("Incorrect!");
                $("#status").html("The correct answer was " + this.questions[idx].answers[this.questions[idx].correctIdx] + ".<br>").append(img);
                break;
            case "unanswered":
                this.unanswered++;
                $("#question").html("Shot clock violation!");
                $("#status").html("The correct answer was " + this.questions[idx].answers[this.questions[idx].correctIdx] + ".<br>").append(img);
                break;
            default:
                break;
        }
    }

}

$(document).ready(function() {
    var questionIdx = 0;

    function run() {
        counter = setInterval(decrement, 1000);
    }

    function decrement() {
        game.number--;
        // Show number of seconds remaining in #timeRem tag
        $("#timeRem").html("Time Remaining: <span id='timer'>" + game.number + "</span>");
        // Timer reaches 0 (unanswered result case)
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

    // Pause the page while showing result status then update to next question/end game stats
    function pause() {
        stop();
        setTimeout(function() {
            if (questionIdx >= game.questions.length) {
                game.updateToEnd();
            } else {
                game.updateQuestion(questionIdx);
                run();
            }
        }, 8000);
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

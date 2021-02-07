'use strict';
// Colour picker background colours
const red = "rgb(217, 20, 12)";
const orange = "rgb(252, 136, 33)";
const yellow = "rgb(250, 213, 0)";
const green = "rgb(136, 199, 66)";
const blue = "rgb(41, 171, 233)";
const colourPickerColours = [red, orange, yellow, green, blue];

// Colour picker divs
// The user can pick one colour which then becomes the active colour
// This active cover will be used to fill in the grid with that particular colour
const redPick = $(".red");
const orangePick = $(".orange");
const yellowPick = $(".yellow");
const greenPick = $(".green");
const bluePick = $(".blue");

const colours = [redPick, orangePick, yellowPick, greenPick, bluePick];
let activeColor;

// Array for storing the randomly generated colours for the grid
let gridColours = [];

// Array for storing the colours that the player has remembered/guessed
let playerColours = [];

// Game levels
let easyGame;
let mediumGame;
let hardGame;

// Grid sizes
let gridWidth;
let gridHeight;
let gridSize;

let copyOfGridColours, secondCopyOfGridColours;

// Memorizing and playing times variables
let time, timer;

// Scoring system variables
let score, points, correctGuesses;
let highScore = localStorage.getItem("highScore");

if (highScore !== null) {
    $("#high-score").html(highScore);
} else {
    highScore = 0;
}

// Hide the colour picker until the playing time starts
$(".colour-picker").hide();

for (const colour of colours) {
    // This function sets the active colour for when the user is filling in the grid
    // It also gives the picked colour a larger border to make it more clear that it has been clicked on
    colour.click(function () {
        if (colour === redPick) {
            activeColor = red;
        } else if (colour === orangePick) {
            activeColor = orange;
        } else if (colour === yellowPick) {
            activeColor = yellow;
        } else if (colour === greenPick) {
            activeColor = green;
        } else if (colour === bluePick) {
            activeColor = blue;
        }

        for (const colour of colours) {
            // Remove border for inactive colours
            colour.removeClass("clicked-color");
        }
        // Increase size of border when colour is clicked on by the user
        colour.addClass("clicked-color");
    });
}

// Function that returns a random number between 0 and 4 inclusive
function generateRandomNumber() {
    return Math.floor(Math.random() * colourPickerColours.length);
}

// Function that returns an array containing random colours from the colourPickerColours array
function generateArray() {
    let randomIndex;
    gridColours = []; // reset gridColours array
    for (let i = 0; i < gridSize; i++) {
        randomIndex = generateRandomNumber();
        gridColours.push(colourPickerColours[randomIndex]);
    }
    return gridColours;
}

function generateGrid() {
    for (let i = 0; i < gridWidth; i++) {
        for (let j = 0; j < gridHeight; j++) {
            $(`#square-${i}-${j}`).css("background-color", gridColours.shift());
        }
    }
}

// Set up variables and UI for Easy game
function setUpEasyGame() {
    easyGame = true;
    mediumGame = false;
    hardGame = false;
    gridWidth = 3;
    gridHeight = 3;
    gridSize = 9;
    // Change grid size
    $(".row3").addClass("hidden");
    $(".row4").addClass("hidden");
    for (let i = 0; i < gridWidth; i++) {
        $(`#square-${i}-3`).addClass("hidden");
        $(`#square-${i}-4`).addClass("hidden");
    }
    copyOfGridColours = generateArray().slice();
    secondCopyOfGridColours = copyOfGridColours.slice();
    // Show the play button
    $("#play").removeClass("hidden");
    $(".message1").html("You have chosen Easy.");
}

// Set up variables and UI for Medium game
function setUpMediumGame() {
    easyGame = false;
    mediumGame = true;
    hardGame = false;
    gridWidth = 4;
    gridHeight = 4;
    gridSize = 16;
    // Change grid size
    $(".row3").removeClass("hidden");
    $(".row4").addClass("hidden");
    for (let i = 0; i < gridWidth; i++) {
        $(`#square-${i}-3`).removeClass("hidden");
        $(`#square-${i}-4`).addClass("hidden");
    }
    copyOfGridColours = generateArray().slice();
    secondCopyOfGridColours = copyOfGridColours.slice();
    $("#play").removeClass("hidden");
    $(".message1").html("You have chosen Medium.");
}

// Set up variables and UI for Hard game
function setUpHardGame() {
    easyGame = false;
    mediumGame = false;
    hardGame = true;
    gridWidth = 5;
    gridHeight = 5;
    gridSize = 25;
    // Change grid size
    $(".row3").removeClass("hidden");
    $(".row4").removeClass("hidden");
    for (let i = 0; i < gridWidth; i++) {
        $(`#square-${i}-3`).removeClass("hidden");
        $(`#square-${i}-4`).removeClass("hidden");
    }
    copyOfGridColours = generateArray().slice();
    secondCopyOfGridColours = copyOfGridColours.slice();
    $("#play").removeClass("hidden");
    $(".message1").html("You have chosen Hard, good luck!");
}

// Test generateGrid function
$("#play").click(function () {
    generateGrid();
    $("#play").addClass("hidden");
    $(".message1").html("Memorize the grid...");
    // Hide the buttons to prevent user changing the grid size during a game
    $(".game-level").addClass("hidden");
    memorizingTime();
    setTimeout(playingTime, (time + 1.1) * 1000); // Bug Fix: Add 1.1 seconds for Safari & Firefox browsers
});

// Memorizing Time function
function memorizingTime() {
    time = calculateMemorizingTime();
    timer = setInterval(function () {
        $(".timer").html(time);
        if (time === 0) {
            clearInterval(timer);
            $(".colour-picker").show();
            $("#finish").removeClass("hidden");
            $(".timer").html("GO!");
            $(".message1").html("Fill in the grid!");
            $(".colour-picker").css("pointer-events", "auto");
            // Set grid colour to lightgrey
            for (let i = 0; i < gridWidth; i++) {
                for (let j = 0; j < gridWidth; j++) {
                    $(`#square-${i}-${j}`).css("backgroundColor", "lightgrey");
                }
            }
        }
        time--;
    }, 1000);
}

// Function that returns the time allowed for the player for memorizing the grid
// Times are lower than what the actual game will be for testing purposes
function calculateMemorizingTime() {
    if (easyGame) {
        return 10;
    } else if (mediumGame) {
        return 20;
    } else if (hardGame) {
        return 30;
    }
}

// Function that returns the time allowed for the player for filling in the grid from memory
// Timers are lower than what the actual game will be for testing purposes
function calculatePlayingTime() {
    if (easyGame) {
        return 20;
    } else if (mediumGame) {
        return 40;
    } else if (hardGame) {
        return 60;
    }
}

// Playing time function
function playingTime() {
    time = calculatePlayingTime();
    $("#grid-area").css("pointer-events", "auto");
    timer = setInterval(function () {
        $(".timer").html(time);
        for (let i = 0; i < gridWidth; i++) {
            for (let j = 0; j < gridWidth; j++) {
                $(`#square-${i}-${j}`).click(function () {
                    $(this).css("background-color", activeColor);
                });
            }
        }
        // Display "Hurry!" message when time reaches 5 seconds
        if (time <= 5) {
            $(".message1").html("Hurry!");
        }
        if (time === 0) {
            clearInterval(timer);
            finishGame();
        }
        time--;
    }, 1000);
}

// Function for finishing the game
function finishGame() {
    clearInterval(timer);
    playerColours = [];
    score = 0;
    points = getPoints();
    saveGuesses();

    $("#finish").addClass("hidden");
    $("#play-again").removeClass("hidden");
    $(".message1").html("Game Over!");
    $(".timer").html("");
    // Prevent user clicking on grid and colour picker after game ended
    $("#grid-area").css("pointer-events", "none");
    $(".colour-picker").hide();
    for (const colour of colours) {
        // Remove border for active colour
        colour.removeClass("clicked-color");
    }
    calculateScore();
    showWrongGuesses();
}

// Function to calculate player score
function calculateScore() {
    /* Compare contents of the array containing the players guesses 
    to the array containing the original grid colours */
    correctGuesses = 0;
    for (let i = 0; i < gridSize; i++) {
        if (playerColours[i] === copyOfGridColours[i]) {
            score += points;
            correctGuesses++;
        }
    }
    // Check for amount of correct guesses
    if (correctGuesses !== gridSize) {
        // Do not display "Show Solution" button if player got all guesses correct
        $("#correct").removeClass("hidden");
        $(".message2").html(`You got ${correctGuesses} out of ${gridSize} correct!`);
    } else {
        // Display perfect score message
        $(".message2").html(`Perfect score! ${correctGuesses} out of ${gridSize}!`);
    }

    $(".showScore").html(`Your score: ${score}`);

    // Check for new high score
    if (score > highScore) {
        highScore = score;
        localStorage.setItem("highScore", score);
        $("#high-score").html(localStorage.getItem("highScore"));
        $(".high-score-message").html("Congratulations! New high score!");
    }
}

// Function that returns the points for each game level
function getPoints() {
    if (easyGame) {
        return 10;
    } else if (mediumGame) {
        return 20;
    } else if (hardGame) {
        return 30;
    }
}

// Function that loops through game grid and saves the colours that user has guessed
function saveGuesses() {
    for (let i = 0; i < gridWidth; i++) {
        for (let j = 0; j < gridWidth; j++) {
            playerColours.push(
                document.getElementById(`square-${i}-${j}`).style.backgroundColor
            );
        }
    }
}

// Function that changes opacity and add an "X" to each wrong cell in the grid
function showWrongGuesses() {
    for (let i = 0; i < gridWidth; i++) {
        for (let j = 0; j < gridWidth; j++) {
            if (playerColours.shift() !== copyOfGridColours.shift()) {
                $(`#square-${i}-${j}`).css("opacity", 0.8);
                $(`#square-${i}-${j}`).addClass("add-X");
            }
        }
    }
}

// Function to show solution
$("#correct").click(function () {
    for (let i = 0; i < gridWidth; i++) {
        for (let j = 0; j < gridWidth; j++) {
            $(`#square-${i}-${j}`).css("background-color", secondCopyOfGridColours.shift());
            $(`#square-${i}-${j}`).css("opacity", 1);
        }
    }
    return false; // prevent page jump
});

// Function to reset game
function resetGame() {
    $(".message1").html("Choose Easy, Medium or Hard!");
    $(".message2").html("");
    $(".showScore").html("");
    $(".timer").html("");
    $("#correct").addClass("hidden");
    $("#play-again").addClass("hidden");
    $(".game-level").removeClass("hidden");
    $(".high-score-message").html("");
    for (let i = 0; i < gridWidth; i++) {
        for (let j = 0; j < gridWidth; j++) {
            $(`#square-${i}-${j}`).css("backgroundColor", "lightgrey");
            $(`#square-${i}-${j}`).css("opacity", 1);
            $(`#square-${i}-${j}`).removeClass("add-X");
        }
    }
}

$("#easy").click(setUpEasyGame);
$("#medium").click(setUpMediumGame);
$("#hard").click(setUpHardGame);
$("#finish").click(finishGame);
$("#play-again").click(resetGame);

'use strict';
// Colour picker background colours
const red = "#D9140C";
const orange = "#FC8821";
const yellow = "#FAD500";
const green = "#88C742";
const blue = "#29ABE9";
// For easier debugging we will use the names of the colours
const colourPickerColours = ["red", "orange", "yellow", "green", "blue"];

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

$("#easy").click(function () {
    easyGame = true;
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
    generateArray();
    // Show the play button
    $("#play").removeClass("hidden");
});

$("#medium").click(function () {
    mediumGame = true;
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
    generateArray();
    $("#play").removeClass("hidden");
});

$("#hard").click(function () {
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
    generateArray();
    $("#play").removeClass("hidden");
});

// Test generateGrid function
$("#play").click(function () {
    generateGrid();
    $(".message1").html("Memorize the grid");
    // Hide the buttons to prevent user changing the grid size during a game
    $(".game-level").addClass("hidden");
    memorizingTime();
});

let time, timer;

function memorizingTime() {
    time = calculateMemorizingTime();
    timer = setInterval(function () {
        $(".timer").html(time);
        if (time === 0) {
            clearInterval(timer);
            $(".timer").html("GO!");
            $(".message1").html("Fill in the grid!");
            // Set grid colour to lightgrey
            for (let i = 0; i < gridWidth; i++) {
                for (let j = 0; j < gridWidth; j++) {
                    $(`#square-${i}-${j}`).css("backgroundColor", "lightgrey");
                }
            }
        }
        time--;
    }, 1000);
};


// Times are lower than what the actual game will be for testing purposes
function calculateMemorizingTime() {
    if (easyGame) {
        return 3;
    } else if (mediumGame) {
        return 6;
    } else if (hardGame) {
        return 9;
    }
}

// Timers are lower than what the actual game will be for testing purposes
function calculatePlayingTime() {
    if (easyGame) {
        return 5;
    } else if (mediumGame) {
        return 7;
    } else if (hardGame) {
        return 9;
    }
}


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
    gridColours = [];
    if (easyGame) {
        for (let i = 0; i < 9; i++) {
            randomIndex = generateRandomNumber();
            gridColours.push(colourPickerColours[randomIndex]);
        }
    } else if (mediumGame) {
        for (let i = 0; i < 16; i++) {
            randomIndex = generateRandomNumber();
            gridColours.push(colourPickerColours[randomIndex]);
        }
    } else if (hardGame) {
        for (let i = 0; i < 25; i++) {
            randomIndex = generateRandomNumber();
            gridColours.push(colourPickerColours[randomIndex]);
        }
    }
    return gridColours;
}

function generateGrid() {
    for (let i = 0; i < 5; i++) {
        for (let j = 0; j < 5; j++) {
            $(`#square-${i}-${j}`).css("background-color", gridColours.shift());
        }
    }
}

// Test functions
easyGame = false;
mediumGame = false;
hardGame = true;
generateArray();
generateGrid();
$("#play").click(generateGrid);



// Colour picker background colours
const red = "#D9140C";
const orange = "#FC8821";
const yellow = "#FAD500";
const green = "#88C742";
const blue = "#29ABE9";

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

$("#play").click(function () {
    for (let i = 0; i < 5; i++) {
        for (let j = 0; j < 5; j++) {
            $(`#square-${i}-${j}`).css("background-color", "pink");
        }
    }
})



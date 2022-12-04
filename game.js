// Two options
// 1. circle
// 2. x
let player = "circle";
let plays = 0;

// Debugging
let debug = true

let debugPrint = function (message) {
    if (debug) {
        console.log(message);
    }
}

let checkIfCellIsEmpty = function (event) {
    return event.target.innerHTML === "";
}

let checkWin = function () {
    let cells = document.querySelectorAll(".cell");
    let cellValues = [];
    for (let i = 0; i < cells.length; i++) {
        cellValues.push(cells[i].innerHTML);
    }
    debugPrint(cellValues);
    // Check rows
    for (let i = 0; i < 9; i += 3) {
        if (cellValues[i] !== "" && cellValues[i] === cellValues[i + 1] && cellValues[i] === cellValues[i + 2]) {
            return true;
        }
    }
    // Check columns
    for (let i = 0; i < 3; i++) {
        if (cellValues[i] !== "" && cellValues[i] === cellValues[i + 3] && cellValues[i] === cellValues[i + 6]) {
            return true;
        }
    }
    // Check diagonals
    if (cellValues[0] !== "" && cellValues[0] === cellValues[4] && cellValues[0] === cellValues[8]) {
        return true;
    }
    return cellValues[2] !== "" && cellValues[2] === cellValues[4] && cellValues[2] === cellValues[6];
}

let changePlayer = function () {
    if (player === "circle") {
        player = "x";
    } else {
        player = "circle";
    }

    document.getElementById("current-player").innerHTML = player;
}

let resetGame = function () {
    debugPrint("Resetting game");
    let cells = document.querySelectorAll(".cell");
    for (let i = 0; i < cells.length; i++) {
        cells[i].innerHTML = "";
    }
    plays = 0;
    player = "circle";
}

let cellClicked = function (event) {
    debugPrint("Clicked " + event.target);
    if (checkIfCellIsEmpty(event)) {
        debugPrint("Cell is empty");
        if (player === "circle") {
            event.target.innerHTML = `X`;
        } else {
            event.target.innerHTML = `O`;
        }

        changePlayer();

        setTimeout(function () {
            if (checkWin()) {
                alert("Player " + player + " won!");
                resetGame();
            }

            plays++;
            if (plays === 9) {
                alert("Game over");
                resetGame();
            }
        }, 100);
    }
}

// Event listener for the click event on table cells
document.querySelectorAll("td").forEach((cell) => {
    cell.addEventListener("click", cellClicked);
});
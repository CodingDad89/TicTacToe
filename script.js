let field = [
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
];

function init() {
    render();
}

let currentPlayer = "circle";

function render() {
    let container = document.getElementById("content");

    let board = document.createElement("div");
    board.classList.add("board");
    board.style.position = "relative"; // Für die Positionierung der Linie

    field.forEach((symbol, index) => {
        let cell = document.createElement("div");
        cell.classList.add("cell");

        if (symbol) {
            cell.textContent = symbol === "circle" ? "⭕" : "❌";
            cell.classList.add("disabled");
        }

        cell.addEventListener("click", function () {
            if (!field[index]) {
                field[index] = currentPlayer;
                cell.textContent = currentPlayer === "circle" ? "⭕" : "❌";
                cell.classList.add("disabled");

                let winnerCombination = checkWinner(field);
                if (winnerCombination) {
                    drawWinningLine(winnerCombination[0], winnerCombination[1], winnerCombination[2]);
                    setTimeout(() => {
                        alert(currentPlayer.toUpperCase() + " wins!");
                        resetGame();
                    }, 300);
                    return;
                }

                currentPlayer = currentPlayer === "circle" ? "cross" : "circle";
            }
        }, { once: true });

        if (index >= 3) cell.classList.add("border-top");
        if (index < 6) cell.classList.add("border-bottom");
        if (index % 3 === 1) {
            cell.classList.add("border-left");
            cell.classList.add("border-right");
        }

        board.appendChild(cell);
    });

    container.innerHTML = "";
    container.appendChild(board);
}

document.addEventListener("DOMContentLoaded", render);

function checkWinner(field) {
    const winningCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Horizontal
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Vertikal
        [0, 4, 8], [2, 4, 6] // Diagonal
    ];

    for (let combination of winningCombinations) {
        let [a, b, c] = combination;
        if (field[a] && field[a] === field[b] && field[a] === field[c]) {
            return [a, b, c];
        }
    }
    return null;
}

function drawWinningLine(a, b, c) {
    let cells = document.querySelectorAll(".cell");
    let line = document.createElement("div");
    line.classList.add("winning-line");

    let startCell = cells[a];
    let endCell = cells[c];
    let board = document.querySelector(".board");
    let boardRect = board.getBoundingClientRect();

    let startX = startCell.offsetLeft + startCell.offsetWidth / 2;
    let startY = startCell.offsetTop + startCell.offsetHeight / 2;
    let endX = endCell.offsetLeft + endCell.offsetWidth / 2;
    let endY = endCell.offsetTop + endCell.offsetHeight / 2;

    let deltaX = endX - startX;
    let deltaY = endY - startY;
    let length = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
    let angle = Math.atan2(deltaY, deltaX);

    line.style.width = `${length}px`;
    line.style.transform = `rotate(${angle}rad)`;
    line.style.left = `${startX}px`;
    line.style.top = `${startY}px`;

    board.appendChild(line);
}

function resetGame() {
    field = [null, null, null, null, null, null, null, null, null];
    render();
}




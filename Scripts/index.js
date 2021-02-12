var green = true;
document.getElementById("whosTurn").innerHTML = "GREEN's turn";

var array = [[8, 7, 6],[6, 7, 8],[8, 0, 0]];

function changeTurn() {
    var turn = document.getElementById("whosTurn");
    turn.innerHTML = (green) ? "GREEN's turn!" : "RED's turn!";
}

function changeColor(i) {
    var block = document.getElementById(i.toString());
    if (checkColor(block)) {
        block.classList.add((green) ? "greenBlock" : "redBlock");
        updateArray(i);
        green = (green) ? false : true;
        changeTurn();
        if (checkHorizontal() || checkVertical() || checkDiaginal()) {
            var winner = (!green) ? "GREEN" : "RED";
            alert("We have a winner : " + winner + "!");
            clearGrid();
        }
        if (checkDraw()) {
            alert("It's a draw :(");
            clearGrid();
        }
    }
}

function checkDraw() {
    var counter = 0;
    for (var i = 0; i < array.length; i++) {
        for (var j = 0; j < array[0].length; j++) {
            if (array[i][j] === 1 || array[i][j] === 2) {
                counter++;
            }
        }
    }
    return (counter === 9) ? true : false;
}

function checkHorizontal() {
    for (var i = 0; i < 3; i++) {
        if (array[i][0] === array[i][1] && array[i][1] === array[i][2]) {
            return true;
        }
    }
    return false;
}

function checkVertical() {
    for (var i = 0; i < 3; i++) {
        if (array[0][i] === array[1][i] && array[1][i] === array[2][i]) {
            return true;
        }
    }
    return false;
}

function checkDiaginal() {
    if (array[0][0] === array[1][1] && array[1][1] === array[2][2]) {
        return true;
    }
    if (array[0][2] === array[1][1] && array[1][1] === array[2][0]) {
        return true;
    }
    return false;
}

function updateArray(i) {
    i--;
    if (i < 3) {
        array[0][i] = (green) ? 1 : 2;
    } else if (i < 6) {
        array[1][i-3] = (green) ? 1 : 2;
    } else {
        array[2][i-6] = (green) ? 1 : 2;
    }
}

function clearGrid() {
    for (var i = 0; i < 9; i++) {
        var id = i + 1;
        var div = document.getElementById(id.toString());
        if (div.classList.contains("redBlock")) {
            div.classList.remove("redBlock");
            continue;
        }
        if (div.classList.contains("greenBlock")) {
            div.classList.remove("greenBlock");
            continue;
        }
    }
    green = true;
    array = [[8, 7, 6], [6, 7, 8], [8, 0, 0]];
    changeTurn();
    changeColor();
}

function checkColor(x) {
    if (x.classList.contains("greenBlock")) {
        return false;
    }
    if (x.classList.contains("redBlock")) {
        return false;
    }
    return true;
}

function drawGrid() {
    var wrapper = document.getElementById("wrapper");
    for (var i = 0; i < 9; i++) {
        let id = i + 1;
        var div = document.createElement("div");
        div.classList.add("gridBlock");
        div.setAttribute("id", id.toString());
        div.addEventListener("click", function ()
        {
            changeColor(id);
        });
        wrapper.appendChild(div);
    }
}
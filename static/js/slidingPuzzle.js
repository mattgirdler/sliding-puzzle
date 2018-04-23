var checkFlag = false

function tryMove(tileNumber) {
    var tileItems = Array.from(document.getElementsByClassName('tile-item'))
    var currentTile = document.getElementById('tile-item-' + tileNumber)
    var emptyTile = document.getElementById('tile-item-empty')
    var emptyTileIndex = tileItems.indexOf(emptyTile)
    var currentTileIndex = tileItems.indexOf(currentTile)

    if ((emptyTileIndex -1 == currentTileIndex) && (emptyTileIndex%3 != 0) ||
        (emptyTileIndex +1 == currentTileIndex) && (emptyTileIndex%3 != 2) ||
        (emptyTileIndex-3 == currentTileIndex) ||
        (emptyTileIndex+3 == currentTileIndex)) {
        swapTiles(emptyTile, currentTile)
        if (!checkFlag) {
            checkBoard()
        }
    }
}

function swapTiles(a, b) {
    var c = a
    a.parentElement.innerHTML = b.outerHTML
    b.parentElement.innerHTML = c.outerHTML
}

function checkBoard() {
    var correct = 0
    var tileAreas = document.getElementsByClassName('tile-area')
    for (var i = 0; i < tileAreas.length; i++) {        
        var tileElement = tileAreas[i].firstElementChild;
        if (tileElement.id.slice(-1) == i) {
            correct += 1
        }
    }
    if (correct >= 8) {
        setTimeout(function(){ alert("Congratulations! You solved the puzzle!"); }, 250)
    }
}

function shuffleBoard() {
    checkFlag = true
    var moves = 0
    while (moves < 200) {
        var rand = Math.round(Math.random() * 7)
        tryMove(rand)
        moves++
    }
    checkFlag = false
}
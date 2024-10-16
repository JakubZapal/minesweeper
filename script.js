const rows = 10;
const cols = 10;
const bombsNum = 0.16 * rows * cols;
let bombsMarked = 0;

const bombsCoords = []

document.getElementById('info').innerHTML = `bombs: ${bombsNum}`

for (let i = 0; i < cols; i++) {
    // create rows
    let squaresRow = document.createElement("div");
    squaresRow.classList.add('row');
    document.querySelector('.container').append(squaresRow);

    // create squares
    let square = document.createElement('div');
    square.classList.add('square');
    for (let j = 0; j < rows; j++) {
        squaresRow.append(document.createElement('div'));
    }

    // add a class to squares
    squaresRow.querySelectorAll('div').forEach(element => element.classList.add('square'));
}

let row = 1;
let col = 1;
document.querySelectorAll('.square').forEach(square => {
    square.classList.add('row-' + row, 'col-' + col);
    col++;
    if (col % (cols + 1) == 0) {
        row++; 
        col = 1; 
    }

    square.addEventListener('click', () => {
        if (isIncludedInCoords(getNumber(square.classList[1]), getNumber(square.classList[2]))) {
            if (confirm('you lose!')) {
                window.location.reload();
            }
        }
        else {
            let squareRow = getNumber(square.classList[1])
            let squareCol = getNumber(square.classList[2])
            const bombs = checkBombs(squareRow, squareCol)

            if (bombs && !square.hasChildNodes()) {
                const p = document.createElement("p")
                p.textContent = bombs
                square.append(p)
            }
            
            // expose all squares with no bombs around
            else {
                checkNearby(squareRow, squareCol)
            }
        }
        const plainSquares = document.querySelectorAll('.checked');
        plainSquares.forEach(square => {
            if (!square.classList.contains('plain')) {
                const squareRow = getNumber(square.classList[1])
                const squareCol = getNumber(square.classList[2])
                const bombs = checkBombs(squareRow, squareCol)

                if (bombs && !square.hasChildNodes() && !square.classList.contains('bomb') && hasPlainAround(squareRow, squareCol)) {
                    const p = document.createElement("p")
                    p.textContent = bombs
                    square.append(p)
                }
            }
        })
    })
    square.addEventListener('contextmenu', (e) => {
        e.preventDefault();

        if (square.hasChildNodes()) {
            bombsMarked--;
            square.removeChild(square.firstChild)
        }
        
        else {
            bombsMarked++;
            const img = document.createElement('img')
            img.setAttribute('src', 'flag.webp')
            square.append(img)
        }
        
        // TODO: check if that wins the game 

        document.getElementById('info').innerHTML = `bombs: ${bombsNum - bombsMarked}`
    })
})

for (let i = 0; i < bombsNum; i++) {
    let x = Math.floor(Math.random() * rows) + 1;
    let y = Math.floor(Math.random() * cols) + 1;
    if (isIncludedInCoords(x, y)) {
        i--;
        continue;
    }
    bombsCoords.push([x, y])
}


function checkBombs (x, y) {
    let bombs = 0;
    for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
            if (i === 0 && j === 0) {
                continue;
            } 
            const square = document.querySelector('.row-' + (x + i) + '.col-' + (y + j));
            if (square !== null && isIncludedInCoords(x + i, y + j)) {
                bombs++;
            }
        }
    }
    return bombs;
}

function hasPlainAround (x, y) {
    for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
            if (i === 0 && j === 0) {
                continue;
            } 
            const square = document.querySelector('.row-' + (x + i) + '.col-' + (y + j));
            if (square !== null && square.classList.contains('plain')) 
                return true;
        }
    }
    return false;
}

function checkNearby(x, y) {
    for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
            check(x + i, y + j)
        }
    }
}

function check(x, y) {
    const square = document.querySelector('.row-' + x + '.col-' + y);
    if (square == null) 
        return

    if (!square.classList.contains('checked')) {
    square.classList.add('checked');
        if (!isIncludedInCoords(x, y) && !checkBombs(x, y)) {
            square.classList.add('plain')
            checkNearby(x, y);
        }
    }
}

// get the number from a string using regEx
function getNumber (string) {
    return Number(string.match(/(\d+)/)[0])
}

function isIncludedInCoords (x,y) {
    for (i = 0; i < bombsCoords.length; i++) {
        if (bombsCoords[i][0] == x && bombsCoords[i][1] == y)
            return true;
    }
    return false;
}

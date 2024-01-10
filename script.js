const rows = 8;
const cols = 8;

let bombsPlaced = 0

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

    // add class to squares
    squaresRow.querySelectorAll('div').forEach(element => element.classList.add('square'));
}

let row = 1;
let col = 1;
document.querySelectorAll('.square').forEach(square => {
    square.classList.add('row-' + row, 'col-' + col);
    col++;
    if (col % 9 == 0) {
        row++; 
        col = 1; 
    }

    square.addEventListener('click', () => {
        if (square.classList.contains('bomb')) {
            if (confirm('you lose!')) {
                window.location.reload();
            }
        }
        else {
            let squareRow = Number(square.classList[1].charAt(4))
            let squareCol = Number(square.classList[2].charAt(4))
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
                const squareRow = Number(square.classList[1].charAt(4))
                const squareCol = Number(square.classList[2].charAt(4))
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

        switch (square.innerHTML) {
            case 'B':
                square.innerHTML = '';
                bombsPlaced--;
                break;
            case '':
            default:
                if (bombsPlaced < 10) {
                    square.innerHTML = 'B';
                    bombsPlaced++;
                }
                break;
        }
        
        console.log(bombsPlaced)
        let count = 0;
        document.querySelectorAll('.bomb').forEach(bomb => {
            if (bomb.textContent == 'B') {
                count++;
            }
        })
        if (count === 10) {
            if(confirm('wygrales!!!!')) {
                window.location.reload();
            }
        }
    })
})

for (let i = 0; i < 10; i++) {
    let x = Math.floor(Math.random() * 8) + 1;
    let y = Math.floor(Math.random() * 8) + 1;
    if (document.querySelector('.row-' + x + '.col-' + y).classList.contains('bomb')) {
        i--;
        continue;
    }
    let square = document.querySelector('.container').querySelector('.row-' + x + '.col-' + y);
    square.classList.toggle('bomb');
}


function checkBombs (x, y) {
    let bombs = 0;
    for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
            if (i === 0 && j === 0) {
                continue;
            } 
            const square = document.querySelector('.row-' + (x + i) + '.col-' + (y + j));
            if (square !== null && square.classList.contains('bomb')) {
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
    if (square !== null) {
        if (!square.classList.contains('checked')) {
        square.classList.add('checked');
            if (!square.classList.contains('bomb') && !checkBombs(x, y)) {
                square.classList.add('plain')
                checkNearby(x, y);
            }
        }
    }
}

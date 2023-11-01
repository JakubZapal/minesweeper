const rows = 8;
const cols = 8;

for (let i = 0; i < cols; i++) {
    // utworzenie wierszy
    let squaresRow = document.createElement("div");
    squaresRow.classList.add('row');
    document.querySelector('.container').append(squaresRow);

    // utworzenie pól
    let square = document.createElement('div');
    square.classList.add('square');
    for (let j = 0; j < rows; j++) {
        squaresRow.append(document.createElement('div'));
    }

    // nadanie klas polom
    squaresRow.querySelectorAll('div').forEach(element => element.classList.add('square'));
}

let row = 1;
let col = 1;

document.querySelectorAll('.square').forEach(square => {
    square.classList.toggle('row-' + row);
    square.classList.toggle('col-' + col);
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
            let squareRow = '';
            let squareCol = '';
            squareRow = square.classList[1].charAt(4)
            squareCol = square.classList[2].charAt(4)
            let bombs = checkBombs(squareRow, squareCol)
            if (bombs) {
                square.innerHTML = bombs;
            }
            // exposing all squares with no bombs around
            else {
                checkNearby(squareRow, squareCol)
            }
        }
    })
    square.addEventListener('contextmenu', (e) => {
        if (square.innerHTML == '') {
            square.innerHTML = 'B'
        } 
        else {
            square.innerHTML = ''
        } 
        e.preventDefault();
    })
})
for (let i = 0; i < 10; i++) {
    let x = Math.floor(Math.random() * 8) + 1;
    let y = Math.floor(Math.random() * 8) + 1;
    if (document.querySelector('.row-' + x + '.col-' + y).classList.contains('bomb')) {
        i--;
        continue;
    }
    console.log(`${x}, ${y}`) 
    let square = document.querySelector('.container').querySelector('.row-' + x + '.col-' + y);
    square.classList.toggle('bomb');
}


function checkBombs (x, y) {
    let bombs = 0
    if (document.querySelector('.row-' + x + '.col-' + y).nextElementSibling !== null)
        if (document.querySelector('.row-' + x + '.col-' + y).nextElementSibling.classList.contains('bomb'))
            bombs++;
    if (document.querySelector('.row-' + x + '.col-' + y).previousElementSibling !== null)
        if (document.querySelector('.row-' + x + '.col-' + y).previousElementSibling.classList.contains('bomb'))
            bombs++;
    if (document.querySelector('.row-' + (x-1) + '.col-' + y) !== null) {
        if (document.querySelector('.row-' + (x-1) + '.col-' + y).classList.contains('bomb'))
            bombs++;
        if (document.querySelector('.row-' + (x-1) + '.col-' + y).nextElementSibling && document.querySelector('.row-' + (x-1) + '.col-' + y).nextElementSibling.classList.contains('bomb'))
            bombs++;
        if (document.querySelector('.row-' + (x-1) + '.col-' + y).previousElementSibling && document.querySelector('.row-' + (x-1) + '.col-' + y).previousElementSibling.classList.contains('bomb'))
            bombs++
    }
    if (document.querySelector('.row-' + (x+1) + '.col-' + y) !== null) {
        if (document.querySelector('.row-' + (x+1) + '.col-' + y).classList.contains('bomb'))
            bombs++;
        if (document.querySelector('.row-' + (x+1) + '.col-' + y).nextElementSibling && document.querySelector('.row-' + (x+1) + '.col-' + y).nextElementSibling.classList.contains('bomb'))
            bombs++;
        if (document.querySelector('.row-' + (x+1) + '.col-' + y).previousElementSibling && document.querySelector('.row-' + (x+1) + '.col-' + y).previousElementSibling.classList.contains('bomb'))
            bombs++
    }
    return bombs;
}
// not working yet
function checkNearby (x, y, previousX = 0, previousY = 0) {
    if (!checkBombs(x, y)) {
        document.querySelector('.row-' + x + '.col-' + y).style.background = 'grey';
        checkNearby(x+1, y+1);
    }
}
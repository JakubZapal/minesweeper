const container = document.querySelector('container');
for (let i = 0; i < 8; i++) {
    let HTMLRow = document.createElement('div');
    HTMLRow.classList.add('row');
    container.append(document.createElement("div").classList.add('row'));

    // document.createElement('div')
}

container.append()

const squares = document.querySelectorAll('.square');
const numOfSquares = squares.length;
let row = 1;
let col = 1;
let squareRow = 0;
let squareCol = 0;
squares.forEach(square => {
    square.classList.toggle('row-' + row);
    square.classList.toggle('col-' + col);
    col++;
    if (col % 9 == 0) {
        row++; 
        col = 1; 
    }
    if (Math.round(Math.random())) {
        square.classList.toggle('bomb');
    }
    square.addEventListener('click', () => {
        if (square.classList.contains('bomb')) {
            if (confirm('you lose!')) {
                window.location.reload();
            }
        } 
        else {
            squareRow = parseInt(square.classList[1].charAt(4));
            squareCol = parseInt(square.classList[2].charAt(4));

            square.innerHTML = checkBombs(squareRow, squareCol)
        }
    })
    square.addEventListener('contextmenu', (e) => {
        if (square.innerHTML == '')
            square.innerHTML = 'B'
        else 
            square.innerHTML = ''
        e.preventDefault();
    })
})

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
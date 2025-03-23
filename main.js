const BLACK = 'rgb(0, 0, 0)';
const MIN_GRID_SIZE = 15;
const MAX_GRID_SIZE = 40;

const grid = document.getElementById('grid-container');
const colorPicker = document.getElementById('color-selector-container');
const fixedColorsPicker = document.getElementById('fixed-colors-container');
const randomButton = document.getElementById('random-color-button');
const setSizeBtn = document.getElementById('set-size-button');
const resetBtn = document.getElementById('reset-button');
const saveBtn = document.getElementById('save-button');
const loadBtn = document.getElementById('load-button');
const clearBtn = document.getElementById('clear-button');
const inputColor = document.getElementById('manual-color');
const blackCard = document.getElementById('default-black');
const gridSize = document.getElementById('grid-size');

const randomColor = () => {
    const randomColor = '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0');
    return randomColor;
};

const setToDefaultColor = () => {
    blackCard.classList.add('selected');
    sessionStorage.setItem('color', BLACK);
}

const setCurrentColor = (color = BLACK) => {
    inputColor.style.backgroundColor = color;
};

const highlightSelectedColor = (element) => {
    for (let i = 0; i < colorPicker.children.length; i++) {
        colorPicker.children[i].classList.remove('selected');
        fixedColorsPicker.children[i].classList.remove('selected');
    }

    element.classList.add('selected');
};

const generateColors = () => {
    for(let i = 0; i < 6; i++) {
        const colorCard = document.createElement('div');
        colorCard.classList.add('color-card');
        colorCard.style.backgroundColor = randomColor();

        // build lock
        const colorLocker = document.createElement('input');
        colorLocker.type = 'checkbox';
        colorLocker.classList.add('lock-color');
        colorLocker.checked = false;
        
        // append card
        colorCard.appendChild(colorLocker);
        colorPicker.appendChild(colorCard);

        colorCard.addEventListener('click', ({ target }) => {
            sessionStorage.setItem('color', target.style.backgroundColor);
            highlightSelectedColor(target);
        });
        fixedColorsPicker.children[i].addEventListener('click', ({ target }) => {
            sessionStorage.setItem('color', target.style.backgroundColor);
            highlightSelectedColor(target);
        });
    }
};

const removeCurrentColors = () => {
    for(let i = 0; i < 6; i++) {
        colorPicker.removeChild(colorPicker.lastChild);
    }
};

const generateGrid = (size = MIN_GRID_SIZE) => {
    for(let i = 0; i < size; i++) {
        const rowContainer = document.createElement('div');
        rowContainer.classList.add('row-container');
        
        for(let j = 0; j < size; j++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            rowContainer.appendChild(cell);

            cell.addEventListener('click', ({ target }) => {
                if (sessionStorage.getItem('color') != null) {
                    target.style.backgroundColor = sessionStorage.getItem('color');
                }
            });
        }
        grid.appendChild(rowContainer);
    }
    sessionStorage.setItem('currentGridSize', size);
};

const removeCurrentGrid = () => {
    while(grid.children.length > 0) {
        grid.removeChild(grid.lastChild);
    }
};

const loadGrid = () => {
    const gridData = JSON.parse(localStorage.getItem('savedGrid'));
    const gridSize = localStorage.getItem('gridSize');

    if(gridData === null) {
        console.log("No saved grid found");
        window.alert("No saved grid found");
        generateGrid();
        return;
    }

    generateGrid(gridSize);
    const actualGrid = grid.children;

    for(let i = 0; i < actualGrid.length; i++) {
        for(let j = 0; j < actualGrid.length; j++) {
            const cell = actualGrid[i].children[j];
            cell.style.backgroundColor = gridData[i * gridSize + j];
        }
    }
};

randomButton.addEventListener('click', () => {
    for(let i = 0; i < colorPicker.children.length; i++) {
        const currCard = colorPicker.children[i];
        const isChecked = currCard.children[0].checked;
        if(isChecked) {
            continue;
        } else {
            currCard.style.backgroundColor = randomColor();
        }
    }
});

saveBtn.addEventListener('click', () => {
    const actualGrid = grid.children;
    const gridData = [];
    for(let i = 0; i < actualGrid.length; i++) {
        const row = actualGrid[i];
        for(let j = 0; j < row.children.length; j++) {
            const cell = row.children[j];
            if(cell.style.backgroundColor === '') {
                gridData.push('rgb(255, 255, 255)');
            } else {
                gridData.push(cell.style.backgroundColor);
            }
        }
    }
    localStorage.setItem('savedGrid', JSON.stringify(gridData));
    localStorage.setItem('gridSize', sessionStorage.getItem('currentGridSize'));
});

setSizeBtn.addEventListener('click', () => {
    const size = gridSize.value;

    if(size > MAX_GRID_SIZE || size < MIN_GRID_SIZE) {
        console.log("Invalid grid size");
        window.alert("Invalid grid size\nSelect a value between 15 and 40");
    } else {
        removeCurrentGrid();
        generateGrid(size);
    }
});

resetBtn.addEventListener('click', () => {
    removeCurrentGrid();
    generateGrid();
    gridSize.value = MIN_GRID_SIZE;
});

loadBtn.addEventListener('click', () => {
    const gridData = JSON.parse(localStorage.getItem('savedGrid'));
    removeCurrentGrid();
    loadGrid();
});

clearBtn.addEventListener('click', () => {
    localStorage.clear();
});

window.onload = () => {
    generateColors();
    generateGrid();
    setToDefaultColor();
};
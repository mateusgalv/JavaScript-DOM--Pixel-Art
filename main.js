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
};

const removeCurrentGrid = () => {
    while(grid.children.length > 0) {
        grid.removeChild(grid.lastChild);
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

    console.log(actualGrid);
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

window.onload = () => {
    // first load // fresh reload
    if (sessionStorage.getItem('pixelArt') === null) {
        generateColors();
        generateGrid();
        setToDefaultColor();
    } else {

    }
};
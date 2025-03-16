const grid = document.getElementById('grid-container');
const colorPicker = document.getElementById('color-selector-container');
const randomButton = document.getElementById('random-color-button');
const setSizeBtn = document.getElementById('set-size-button');
const resetBtn = document.getElementById('reset-button');

const randomColor = () => {
    const randomColor = '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0');
    return randomColor;
};

const generateInitialColors = () => {
    for(let i = 0; i < 5; i++) {
        const colorSelector = document.createElement('div');
        colorSelector.style.backgroundColor = randomColor();
        colorSelector.classList.add('color-selector');
        colorPicker.appendChild(colorSelector);
    }
};

const removeCurrentColors = () => {
    for(let i = 0; i < 5; i++) {
        colorPicker.removeChild(colorPicker.lastChild);
    }
};

const generateGrid = (size = 5) => {
    for(let i = 0; i < size; i++) {
        const rowContainer = document.createElement('div');
        rowContainer.classList.add('row-container', `row-${i}`);
        
        for(let j = 0; j < size; j++) {
            const cell = document.createElement('div');
            cell.classList.add('cell', `cell-${j}`);
            rowContainer.appendChild(cell);
        }
        grid.appendChild(rowContainer);
    }
};

const removeCurrentGrid = () => {
    while(grid.children.length > 0) {
        grid.removeChild(grid.lastChild);
    }
}

randomButton.addEventListener('click', () => {
    removeCurrentColors();
    generateInitialColors()
});

setSizeBtn.addEventListener('click', () => {
    const gridSize = document.getElementById('grid-size');
    const size = gridSize.value;
    
    removeCurrentGrid();
    generateGrid(size);
});

resetBtn.addEventListener('click',() => {
    removeCurrentGrid();
    generateGrid();
});

window.onload = () => {
    generateInitialColors();
    generateGrid();
};
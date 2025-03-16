const BLACK = 'rgb(0, 0, 0)';

const grid = document.getElementById('grid-container');
const colorPicker = document.getElementById('color-selector-container');
const fixedColorsPicker = document.getElementById('fixed-colors-container');
const randomButton = document.getElementById('random-color-button');
const setSizeBtn = document.getElementById('set-size-button');
const resetBtn = document.getElementById('reset-button');
const inputColor = document.getElementById('manual-color');
const blackCard = document.getElementById('default-black');

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

const generateGrid = (size = 15) => {
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

setSizeBtn.addEventListener('click', () => {
    const gridSize = document.getElementById('grid-size');
    const size = gridSize.value;

    if(size > gridSize.max || size < gridSize.min) {
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